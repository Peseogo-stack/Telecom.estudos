#!/usr/bin/env node
// Gera os dados FICTÍCIOS de exercício de QGIS em public/dados-qgis/ (npm run dados-qgis).
// Determinístico: semente fixa, sem Math.random e sem relógio. Nada aqui vem de rede, poste, cabo ou empresa reais.
//
// Saídas: rede-ficticia.gpkg (EPSG:31980), postes.kml (EPSG:4326), vistoria-utm-sem-src.csv (UTM 20 com falso
// norte 0, sem declarar SRC), LEIA-ME.txt e gabarito.json.
//
// Projeção: Transversa de Mercator pela série de Krüger (4ª ordem), elipsoide GRS80 (a = 6378137 m,
// 1/f = 298,257222101), fator de escala 0,9996, falso leste 500.000 m, meridiano central 63° O, latitude de
// origem 0. EPSG:31980 (SIRGAS 2000 / UTM zona 20S) usa falso norte 10.000.000 m; EPSG:31974 (zona 20N), 0 m.
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SAIDA = join(RAIZ, 'public', 'dados-qgis');

const AVISO = 'DADOS FICTÍCIOS para exercício. Não representam nenhuma rede, poste, cabo ou empresa real.';
const DATA_FIXA = '2026-11-10';
const LOCAL = 'Vila Fictícia';

// ---------------------------------------------------------------- pseudoaleatório (mulberry32)
let estado = 0x51c0ffee >>> 0;
function rng() {
  estado = (estado + 0x6d2b79f5) >>> 0;
  let t = estado;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const rand = (a, b) => a + rng() * (b - a);
const randInt = (a, b) => a + Math.floor(rng() * (b - a + 1));
const pesado = (pares) => {
  const total = pares.reduce((s, [, w]) => s + w, 0);
  let x = rng() * total;
  for (const [v, w] of pares) {
    if ((x -= w) < 0) return v;
  }
  return pares[pares.length - 1][0];
};
function embaralhar(lista) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const r = (v, n = 2) => Math.round(v * 10 ** n) / 10 ** n;

// ---------------------------------------------------------------- projeção
const A_GRS80 = 6378137;
const F_GRS80 = 1 / 298.257222101;
function criarTM({ lon0, k0, fe, fn }) {
  const n = F_GRS80 / (2 - F_GRS80);
  const n2 = n * n, n3 = n2 * n, n4 = n3 * n;
  const A = (A_GRS80 / (1 + n)) * (1 + n2 / 4 + n4 / 64);
  const alfa = [
    n / 2 - (2 * n2) / 3 + (5 * n3) / 16 + (41 * n4) / 180,
    (13 * n2) / 48 - (3 * n3) / 5 + (557 * n4) / 1440,
    (61 * n3) / 240 - (103 * n4) / 140,
    (49561 * n4) / 161280,
  ];
  const beta = [
    n / 2 - (2 * n2) / 3 + (37 * n3) / 96 - n4 / 360,
    n2 / 48 + n3 / 15 - (437 * n4) / 1440,
    (17 * n3) / 480 - (37 * n4) / 840,
    (4397 * n4) / 161280,
  ];
  const delta = [
    2 * n - (2 * n2) / 3 - 2 * n3 + (116 * n4) / 45,
    (7 * n2) / 3 - (8 * n3) / 5 - (227 * n4) / 45,
    (56 * n3) / 15 - (136 * n4) / 35,
    (4279 * n4) / 630,
  ];
  const rad = Math.PI / 180;
  const e = (2 * Math.sqrt(n)) / (1 + n);
  return {
    /** graus (lat, lon) -> metros {e, n} */
    direto(latGraus, lonGraus) {
      const fi = latGraus * rad;
      const dl = (lonGraus - lon0) * rad;
      const t = Math.sinh(Math.atanh(Math.sin(fi)) - e * Math.atanh(e * Math.sin(fi)));
      const xi1 = Math.atan2(t, Math.cos(dl));
      const eta1 = Math.atanh(Math.sin(dl) / Math.sqrt(1 + t * t));
      let xi = xi1;
      let eta = eta1;
      for (let j = 1; j <= 4; j++) {
        xi += alfa[j - 1] * Math.sin(2 * j * xi1) * Math.cosh(2 * j * eta1);
        eta += alfa[j - 1] * Math.cos(2 * j * xi1) * Math.sinh(2 * j * eta1);
      }
      return { e: fe + k0 * A * eta, n: fn + k0 * A * xi };
    },
    /** metros (e, n) -> graus {lat, lon} */
    inverso(E, N) {
      const xi1 = (N - fn) / (k0 * A);
      const eta1 = (E - fe) / (k0 * A);
      let xi0 = xi1;
      let eta0 = eta1;
      for (let j = 1; j <= 4; j++) {
        xi0 -= beta[j - 1] * Math.sin(2 * j * xi1) * Math.cosh(2 * j * eta1);
        eta0 -= beta[j - 1] * Math.cos(2 * j * xi1) * Math.sinh(2 * j * eta1);
      }
      const chi = Math.asin(Math.sin(xi0) / Math.cosh(eta0));
      let fi = chi;
      for (let j = 1; j <= 4; j++) fi += delta[j - 1] * Math.sin(2 * j * chi);
      const lon = lon0 + Math.atan2(Math.sinh(eta0), Math.cos(xi0)) / rad;
      return { lat: fi / rad, lon };
    },
  };
}
const UTM20S = criarTM({ lon0: -63, k0: 0.9996, fe: 500000, fn: 10000000 }); // EPSG:31980
const UTM20N = criarTM({ lon0: -63, k0: 0.9996, fe: 500000, fn: 0 }); // EPSG:31974

// ---------------------------------------------------------------- a área
const CENTRO_LAT = 3.4;
const CENTRO_LON = -61.65;
const c31980 = UTM20S.direto(CENTRO_LAT, CENTRO_LON);
const c31974 = UTM20N.direto(CENTRO_LAT, CENTRO_LON);
const E0 = r(c31980.e, 2);
const N0 = r(c31980.n, 2);
const MEIA_L = 600; // 1,2 km leste-oeste
const MEIA_N = 500; // 1,0 km norte-sul
const CAIXA = { min_e: E0 - MEIA_L, max_e: E0 + MEIA_L, min_n: N0 - MEIA_N, max_n: N0 + MEIA_N };
const pt = (x, y) => [r(E0 + x, 2), r(N0 + y, 2)];
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

// ---------------------------------------------------------------- ocupantes
const OCUPANTES = [
  { ocupante_id: 1, nome_ficticio: 'Operadora Alfa', cnpj_ficticio: '00.000.000/0001-00', contrato: 'vigente' },
  { ocupante_id: 2, nome_ficticio: 'Operadora Beta', cnpj_ficticio: '00.000.000/0002-81', contrato: 'vigente' },
  { ocupante_id: 3, nome_ficticio: 'Provedor Gama', cnpj_ficticio: '00.000.000/0003-62', contrato: 'vigente' },
  { ocupante_id: 4, nome_ficticio: 'Provedor Delta', cnpj_ficticio: '00.000.000/0004-43', contrato: 'vencido' },
  { ocupante_id: 5, nome_ficticio: 'Provedor Épsilon', cnpj_ficticio: '00.000.000/0005-24', contrato: 'vigente' },
  { ocupante_id: 6, nome_ficticio: 'Sem identificação', cnpj_ficticio: '00.000.000/0000-00', contrato: 'sem contrato' },
];
const REAIS = [1, 2, 3, 5];
const ID_DELTA = 4;
const ID_SEM_ID = 6;
const nomeOcup = (id) => OCUPANTES.find((o) => o.ocupante_id === id).nome_ficticio;

// ---------------------------------------------------------------- ruas e postes
// Cinco "ruas" retas (alinhamentos): três leste-oeste (y fixo) e duas norte-sul (x fixo). Os postes ficam 5 m ao lado do eixo.
const RUAS = [
  { id: 'EW1', eixo: 'EW', c: -160 },
  { id: 'EW2', eixo: 'EW', c: 0 },
  { id: 'EW3', eixo: 'EW', c: 160 },
  { id: 'NS1', eixo: 'NS', c: -90 },
  { id: 'NS2', eixo: 'NS', c: 90 },
];
const EIXOS = RUAS.map((rua) =>
  rua.eixo === 'EW' ? [pt(-220, rua.c), pt(220, rua.c)] : [pt(rua.c, -190), pt(rua.c, 190)],
);

const postes = [];
const cadeia = {};
let seq = 0;
for (const rua of RUAS) {
  cadeia[rua.id] = [];
  const n = rua.eixo === 'EW' ? 13 : 12;
  for (let k = 0; k < n; k++) {
    const jitter = rand(-1.5, 1.5);
    const [e, nn] =
      rua.eixo === 'EW' ? pt(36 * (k - 6) + jitter, rua.c + 5) : pt(rua.c + 5, -187 + 34 * k + jitter);
    seq++;
    const material = pesado([['concreto', 55], ['madeira', 30], ['aco', 15]]);
    const p = {
      cod: `PF-${String(seq).padStart(4, '0')}`,
      e,
      n: nn,
      rua: rua.id,
      material,
      altura_m: pesado([[9, 30], [10, 35], [11, 25], [12, 10]]),
      esforco_dan: pesado([[150, 25], [300, 40], [600, 25], [1000, 10]]),
      tem_trafo: 0,
      tem_ip: rng() < 0.35 ? 1 : 0,
      data_vistoria: dataFixa(randInt(0, 270)),
      situacao: pesado([['ok', 90], ['inclinado', 6], ['base danificada', 4]]),
    };
    postes.push(p);
    cadeia[rua.id].push(p);
  }
}
function dataFixa(dias) {
  return new Date(Date.UTC(2026, 1, 2) + dias * 86400000).toISOString().slice(0, 10);
}
const baseCods = postes.map((p) => p.cod);
const poste = (cod) => postes.find((p) => p.cod === cod);

// ---------------------------------------------------------------- vãos
function segCruza(a, b, c, d) {
  const o = (p, q, s) => Math.sign((q[0] - p[0]) * (s[1] - p[1]) - (q[1] - p[1]) * (s[0] - p[0]));
  return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
}
const vaos = [];
for (const rua of RUAS) {
  const ch = cadeia[rua.id];
  for (let i = 0; i + 1 < ch.length; i++) {
    const a = [ch[i].e, ch[i].n];
    const b = [ch[i + 1].e, ch[i + 1].n];
    vaos.push({
      cod_vao: `VA-${String(vaos.length + 1).padStart(3, '0')}`,
      poste_ini: ch[i].cod,
      poste_fim: ch[i + 1].cod,
      a,
      b,
      compr_m: r(dist(a, b), 1),
      travessia: EIXOS.some(([c, d]) => segCruza(a, b, c, d)) ? 1 : 0,
    });
  }
}
const postesDeTravessia = new Set(vaos.filter((v) => v.travessia).flatMap((v) => [v.poste_ini, v.poste_fim]));

// ---------------------------------------------------------------- cabos
const PLANO_CABOS = [
  ['EW1', 0, 12, 'optico', 48, 1],
  ['EW1', 0, 8, 'optico', 24, 2],
  ['EW1', 4, 12, 'metalico', null, 3],
  ['EW2', 0, 12, 'optico', 36, 1],
  ['EW2', 2, 10, 'optico', 12, 5],
  ['EW2', 6, 9, 'drop', 12, 3],
  ['EW3', 0, 12, 'optico', 24, 2],
  ['EW3', 3, 11, 'metalico', null, 1],
  ['NS1', 0, 11, 'optico', 48, 3],
  ['NS1', 2, 9, 'optico', 24, 5],
  ['NS2', 0, 11, 'optico', 36, 1],
  ['NS2', 4, 8, 'drop', 12, 2],
];
const DESVIO_PROJETO = { 'CB-05': 1.09, 'CB-10': 0.91 }; // os dois cabos com comprimento de projeto fora de 5%
const cabos = PLANO_CABOS.map(([rua, i0, i1, tipo, fibras, ocup], i) => {
  const postesDoCabo = cadeia[rua].slice(i0, i1 + 1);
  const coords = postesDoCabo.map((p) => [p.e, p.n]);
  let geom = 0;
  for (let k = 0; k + 1 < coords.length; k++) geom += dist(coords[k], coords[k + 1]);
  const cod = `CB-${String(i + 1).padStart(2, '0')}`;
  const ruido = 1 + rand(-0.02, 0.02);
  return {
    cod_cabo: cod,
    tipo,
    fibras,
    ocupante_id: ocup,
    poste_ini: postesDoCabo[0].cod,
    poste_fim: postesDoCabo[postesDoCabo.length - 1].cod,
    compr_proj_m: r(geom * (DESVIO_PROJETO[cod] ?? ruido), 1),
    plaqueta: 'sim',
    coords,
    geom_m: geom,
    postes: postesDoCabo.map((p) => p.cod),
  };
});

// ---------------------------------------------------------------- ocupações (a partir dos cabos)
const ocupacoes = [];
const achar = (cod, ocup) => ocupacoes.find((o) => o.cod_poste === cod && o.ocupante_id === ocup);
for (const cabo of cabos) {
  for (const cod of cabo.postes) {
    const ja = achar(cod, cabo.ocupante_id);
    if (ja) ja.cabos_no_ponto = Math.min(3, ja.cabos_no_ponto + 1);
    else
      ocupacoes.push({
        cod_poste: cod, ocupante_id: cabo.ocupante_id, altura_fixacao_m: 0, dist_bt_m: 0,
        plaqueta: 'sim', reserva_no_poste: 0, cabos_no_ponto: 1, viaCabo: true,
      });
  }
}
const linhasDo = (cod) => ocupacoes.filter((o) => o.cod_poste === cod);
const reaisDo = (cod) => linhasDo(cod).filter((o) => REAIS.includes(o.ocupante_id));

// ---------------------------------------------------------------- irregularidades: escolhas
const usado = new Set();
function escolherPostes(candidatos, n) {
  const sel = [];
  for (const cod of embaralhar(candidatos)) {
    if (sel.length === n) break;
    if (usado.has(cod)) continue;
    usado.add(cod);
    sel.push(cod);
  }
  if (sel.length !== n) throw new Error('candidatos insuficientes');
  return sel;
}
function escolherLinhas(filtro, n) {
  const sel = [];
  for (const o of embaralhar(ocupacoes.filter(filtro))) {
    if (sel.length === n) break;
    if (usado.has(o.cod_poste)) continue;
    usado.add(o.cod_poste);
    sel.push(o);
  }
  if (sel.length !== n) throw new Error('linhas insuficientes');
  return sel;
}
const novaLinha = (cod, ocup) => {
  ocupacoes.push({
    cod_poste: cod, ocupante_id: ocup, altura_fixacao_m: 0, dist_bt_m: 0, plaqueta: 'sim',
    reserva_no_poste: 0, cabos_no_ponto: 1, viaCabo: false,
  });
};

// (a) três postes com 6 ocupantes: os 4 reais + Provedor Delta (contrato vencido) + Sem identificação
const postes6 = escolherPostes(baseCods.filter((c) => reaisDo(c).length === 3), 3);
for (const cod of postes6) {
  for (const id of REAIS) if (!achar(cod, id)) novaLinha(cod, id);
  novaLinha(cod, ID_DELTA);
  novaLinha(cod, ID_SEM_ID);
  poste(cod).altura_m = 12;
}
// (b) o quarto poste do ocupante sem identificação
const [posteSemId4] = escolherPostes(baseCods, 1);
novaLinha(posteSemId4, ID_SEM_ID);
// (c) pontos sem plaqueta, (d) distância à BT, (e) altura em travessia, (f) reserva
const ehReal = (o) => REAIS.includes(o.ocupante_id) && o.viaCabo;
const linhasSemPlaqueta = escolherLinhas(ehReal, 5);
const linhasBt = escolherLinhas(ehReal, 4);
const linhasAltura = escolherLinhas((o) => ehReal(o) && postesDeTravessia.has(o.cod_poste), 3);
const linhasReserva = escolherLinhas(ehReal, 4);
// (g) transformadores: 7 postes, dois deles com CTO
const postesTrafo = escolherPostes(baseCods, 7);
for (const cod of postesTrafo) {
  const p = poste(cod);
  p.tem_trafo = 1;
  p.material = 'concreto';
  p.altura_m = pesado([[11, 60], [12, 40]]);
  p.esforco_dan = pesado([[600, 60], [1000, 40]]);
}
// (h) duplicados, código repetido, caixa com erro de cadastro
const origemDup = escolherPostes(baseCods, 2);
const [origemRepetido] = escolherPostes(baseCods, 1);
const [posteCaixaErro] = escolherPostes(baseCods, 1);
const postesCaixaOk = escolherPostes(baseCods, 11);

// ---------------------------------------------------------------- alturas e distâncias "limpas"
for (const p of postes) {
  const linhas = linhasDo(p.cod).sort((a, b) => a.ocupante_id - b.ocupante_id);
  const topo = 6.6 + 0.3 * (p.altura_m - 9);
  linhas.forEach((o, k) => {
    o.altura_fixacao_m = r(topo - 0.3 * k - rand(0, 0.08), 2);
    o.dist_bt_m = r(rand(0.8, 1.6), 2);
  });
}
// ---------------------------------------------------------------- aplicação das irregularidades
for (const o of linhasSemPlaqueta) o.plaqueta = 'nao';
for (const o of linhasBt) o.dist_bt_m = r(rand(0.35, 0.55), 2);
for (const o of linhasAltura) o.altura_fixacao_m = r(rand(4.4, 4.9), 2);
for (const o of linhasReserva) o.reserva_no_poste = 1;
for (const cabo of cabos) {
  if (cabo.postes.some((cod) => achar(cod, cabo.ocupante_id).plaqueta === 'nao')) cabo.plaqueta = 'nao';
}

// postes extras: 2 duplicados no mesmo lugar e 1 com código repetido em outro lugar
const extras = [];
origemDup.forEach((cod, i) => {
  const o = poste(cod);
  extras.push({ ...o, cod: `PF-${String(baseCods.length + 1 + i).padStart(4, '0')}`, dupDe: cod, rua: null });
});
{
  const o = poste(origemRepetido);
  const [e, n] = pt(-150, 80);
  extras.push({ ...o, cod: o.cod, e, n, rua: null, repetidoDe: o.cod });
}
const todosPostes = [...postes, ...extras];
for (const p of todosPostes) p.ocupantes_qtd = new Set(linhasDo(p.cod).map((o) => o.ocupante_id)).size;

// ---------------------------------------------------------------- caixas
const caixasPlano = [];
postesTrafo.slice(0, 2).forEach((cod) => caixasPlano.push({ cod, tipo: 'CTO', poste_cod: cod }));
caixasPlano.push({ cod: posteCaixaErro, tipo: rng() < 0.5 ? 'CEO' : 'CTO', poste_cod: 'PF-0099' });
for (const cod of postesCaixaOk) caixasPlano.push({ cod, tipo: rng() < 0.4 ? 'CEO' : 'CTO', poste_cod: cod });
caixasPlano.sort((a, b) => baseCods.indexOf(a.cod) - baseCods.indexOf(b.cod));
const caixas = caixasPlano.map((c, i) => {
  const p = poste(c.cod);
  const ocup = embaralhar(reaisDo(c.cod))[0].ocupante_id;
  return {
    cod_caixa: `CX-${String(i + 1).padStart(2, '0')}`,
    tipo: c.tipo,
    capacidade: c.tipo === 'CEO' ? pesado([[12, 3], [24, 2], [48, 1]]) : pesado([[8, 1], [16, 1]]),
    poste_cod: c.poste_cod,
    ocupante_id: ocup,
    e: p.e,
    n: p.n,
  };
});

// ---------------------------------------------------------------- quadras
// 3 colunas x 2 linhas, entre os eixos das ruas, com 2 m de recuo.
const COLS = [[-218, -92], [-88, 88], [92, 218]];
const LINS = [[-158, -2], [2, 158]];
const quadras = [];
LINS.forEach((lin, i) =>
  COLS.forEach((col, j) => {
    const [x0, x1] = col;
    const [y0, y1] = lin;
    const anel = [pt(x0, y0), pt(x1, y0), pt(x1, y1), pt(x0, y1), pt(x0, y0)];
    quadras.push({
      quadra: `Q${i * 3 + j + 1}`,
      anel,
      min_e: anel[0][0], max_e: anel[1][0], min_n: anel[0][1], max_n: anel[2][1],
      area_m2: r((anel[1][0] - anel[0][0]) * (anel[2][1] - anel[0][1]), 1),
    });
  }),
);
const dentro = (p, q) => p.e > q.min_e && p.e < q.max_e && p.n > q.min_n && p.n < q.max_n;

// ---------------------------------------------------------------- conferência interna (critérios x plantados)
function conferirIrregularidades() {
  const falha = (msg) => {
    throw new Error(`Conferência interna falhou: ${msg}`);
  };
  const eq = (nome, obtido, esperado) => {
    const a = JSON.stringify([...obtido].sort());
    const b = JSON.stringify([...esperado].sort());
    if (a !== b) falha(`${nome}: obtido ${a}, esperado ${b}`);
  };
  eq('sem plaqueta', ocupacoes.filter((o) => o.plaqueta === 'nao').map((o) => o.cod_poste), linhasSemPlaqueta.map((o) => o.cod_poste));
  eq('sem identificação', [...new Set(ocupacoes.filter((o) => o.ocupante_id === ID_SEM_ID).map((o) => o.cod_poste))], [...postes6, posteSemId4]);
  eq('contrato vencido', [...new Set(ocupacoes.filter((o) => o.ocupante_id === ID_DELTA).map((o) => o.cod_poste))], postes6);
  eq('mais de 5 ocupantes', todosPostes.filter((p) => p.ocupantes_qtd > 5).map((p) => p.cod), postes6);
  eq('distância à BT', ocupacoes.filter((o) => o.dist_bt_m < 0.6).map((o) => o.cod_poste), linhasBt.map((o) => o.cod_poste));
  eq('altura < 5,0', ocupacoes.filter((o) => o.altura_fixacao_m < 5).map((o) => o.cod_poste), linhasAltura.map((o) => o.cod_poste));
  eq('altura < 5,0 em travessia', ocupacoes.filter((o) => o.altura_fixacao_m < 5 && postesDeTravessia.has(o.cod_poste)).map((o) => o.cod_poste), linhasAltura.map((o) => o.cod_poste));
  eq('reserva', ocupacoes.filter((o) => o.reserva_no_poste === 1).map((o) => o.cod_poste), linhasReserva.map((o) => o.cod_poste));
  eq('CTO em poste com trafo', caixas.filter((c) => c.tipo === 'CTO' && poste(c.poste_cod)?.tem_trafo === 1).map((c) => c.cod_caixa), caixas.filter((c) => postesTrafo.slice(0, 2).includes(c.poste_cod)).map((c) => c.cod_caixa));
  if (caixas.filter((c) => poste(c.poste_cod)?.tem_trafo === 1).length !== 2) falha('caixas em poste com trafo');
  eq('comprimento de projeto', cabos.filter((c) => Math.abs(c.compr_proj_m - c.geom_m) / c.geom_m > 0.05).map((c) => c.cod_cabo), Object.keys(DESVIO_PROJETO));
  eq('caixa sem poste', caixas.filter((c) => !poste(c.poste_cod)).map((c) => c.cod_caixa), caixas.filter((c) => c.poste_cod === 'PF-0099').map((c) => c.cod_caixa));
  const porLugar = new Map();
  for (const p of todosPostes) porLugar.set(`${p.e}|${p.n}`, [...(porLugar.get(`${p.e}|${p.n}`) ?? []), p.cod]);
  const duplicados = [...porLugar.values()].filter((l) => l.length > 1);
  if (duplicados.length !== 2) falha('postes duplicados');
  const porCod = new Map();
  for (const p of todosPostes) porCod.set(p.cod, (porCod.get(p.cod) ?? 0) + 1);
  eq('código repetido', [...porCod].filter(([, n]) => n > 1).map(([c]) => c), [origemRepetido]);
  for (const v of vaos) if (v.compr_m < 30 || v.compr_m > 40) falha(`vão ${v.cod_vao} fora de 30 a 40 m`);
  for (const p of todosPostes)
    if (p.e < CAIXA.min_e || p.e > CAIXA.max_e || p.n < CAIXA.min_n || p.n > CAIXA.max_n) falha('poste fora da caixa');
}
conferirIrregularidades();

// ---------------------------------------------------------------- GeoPackage
function blobGeom(tipoWkb, partes, env) {
  // Cabeçalho GP: magic, versão 0, flags (little-endian + envelope XY), srs_id, envelope (minx, maxx, miny, maxy).
  const cab = Buffer.alloc(8 + 32);
  cab.write('GP', 0, 'latin1');
  cab.writeUInt8(0, 2);
  cab.writeUInt8(0b00000011, 3);
  cab.writeInt32LE(31980, 4);
  [env.minx, env.maxx, env.miny, env.maxy].forEach((v, i) => cab.writeDoubleLE(v, 8 + 8 * i));
  const wkbCab = Buffer.alloc(5);
  wkbCab.writeUInt8(1, 0);
  wkbCab.writeUInt32LE(tipoWkb, 1);
  const corpo = [];
  const coord = (c) => {
    const b = Buffer.alloc(16);
    b.writeDoubleLE(c[0], 0);
    b.writeDoubleLE(c[1], 8);
    return b;
  };
  const n = (v) => {
    const b = Buffer.alloc(4);
    b.writeUInt32LE(v, 0);
    return b;
  };
  if (tipoWkb === 1) corpo.push(coord(partes));
  else if (tipoWkb === 2) corpo.push(n(partes.length), ...partes.map(coord));
  else corpo.push(n(1), n(partes.length), ...partes.map(coord));
  return Buffer.concat([cab, wkbCab, ...corpo]);
}
const envDe = (cs) => ({
  minx: Math.min(...cs.map((c) => c[0])), maxx: Math.max(...cs.map((c) => c[0])),
  miny: Math.min(...cs.map((c) => c[1])), maxy: Math.max(...cs.map((c) => c[1])),
});
const geomPonto = (e, n) => blobGeom(1, [e, n], { minx: e, maxx: e, miny: n, maxy: n });
const geomLinha = (cs) => blobGeom(2, cs, envDe(cs));
const geomPoligono = (cs) => blobGeom(3, cs, envDe(cs));

const WKT_4326 =
  'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AXIS["Latitude",NORTH],AXIS["Longitude",EAST],AUTHORITY["EPSG","4326"]]';
const WKT_31980 =
  'PROJCS["SIRGAS 2000 / UTM zone 20S",GEOGCS["SIRGAS 2000",DATUM["Sistema_de_Referencia_Geocentrico_para_las_AmericaS_2000",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6674"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4674"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",-63],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",10000000],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AXIS["Easting",EAST],AXIS["Northing",NORTH],AUTHORITY["EPSG","31980"]]';

function gravarGpkg(caminho) {
  rmSync(caminho, { force: true });
  const db = new DatabaseSync(caminho);
  db.exec('PRAGMA application_id = 1196444487;'); // 0x47504B47 = "GPKG"
  db.exec('PRAGMA user_version = 10300;'); // GeoPackage 1.3.0
  db.exec('PRAGMA journal_mode = DELETE;');
  db.exec('BEGIN');
  db.exec(`
CREATE TABLE gpkg_spatial_ref_sys (srs_name TEXT NOT NULL, srs_id INTEGER PRIMARY KEY, organization TEXT NOT NULL, organization_coordsys_id INTEGER NOT NULL, definition TEXT NOT NULL, description TEXT);
CREATE TABLE gpkg_contents (table_name TEXT NOT NULL PRIMARY KEY, data_type TEXT NOT NULL, identifier TEXT UNIQUE, description TEXT DEFAULT '', last_change DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')), min_x DOUBLE, min_y DOUBLE, max_x DOUBLE, max_y DOUBLE, srs_id INTEGER, CONSTRAINT fk_gc_r_srs_id FOREIGN KEY (srs_id) REFERENCES gpkg_spatial_ref_sys(srs_id));
CREATE TABLE gpkg_geometry_columns (table_name TEXT NOT NULL, column_name TEXT NOT NULL, geometry_type_name TEXT NOT NULL, srs_id INTEGER NOT NULL, z TINYINT NOT NULL, m TINYINT NOT NULL, CONSTRAINT pk_geom_cols PRIMARY KEY (table_name, column_name), CONSTRAINT uk_gc_table_name UNIQUE (table_name), CONSTRAINT fk_gc_tn FOREIGN KEY (table_name) REFERENCES gpkg_contents(table_name), CONSTRAINT fk_gc_srs FOREIGN KEY (srs_id) REFERENCES gpkg_spatial_ref_sys (srs_id));
CREATE TABLE gpkg_extensions (table_name TEXT, column_name TEXT, extension_name TEXT NOT NULL, definition TEXT NOT NULL, scope TEXT NOT NULL, CONSTRAINT ge_tce UNIQUE (table_name, column_name, extension_name));
CREATE TABLE gpkg_metadata (id INTEGER CONSTRAINT m_pk PRIMARY KEY ASC NOT NULL, md_scope TEXT NOT NULL DEFAULT 'dataset', md_standard_uri TEXT NOT NULL, mime_type TEXT NOT NULL DEFAULT 'text/xml', metadata TEXT NOT NULL DEFAULT '');
CREATE TABLE gpkg_metadata_reference (reference_scope TEXT NOT NULL, table_name TEXT, column_name TEXT, row_id_value INTEGER, timestamp DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')), md_file_id INTEGER NOT NULL, md_parent_id INTEGER, CONSTRAINT crmr_mfi_fk FOREIGN KEY (md_file_id) REFERENCES gpkg_metadata(id), CONSTRAINT crmr_mpi_fk FOREIGN KEY (md_parent_id) REFERENCES gpkg_metadata(id));
`);
  const srs = db.prepare('INSERT INTO gpkg_spatial_ref_sys VALUES (?,?,?,?,?,?)');
  srs.run('Undefined Cartesian SRS', -1, 'NONE', -1, 'undefined', 'undefined Cartesian coordinate reference system');
  srs.run('Undefined geographic SRS', 0, 'NONE', 0, 'undefined', 'undefined geographic coordinate reference system');
  srs.run('WGS 84 geodetic', 4326, 'EPSG', 4326, WKT_4326, 'longitude/latitude coordinates in decimal degrees on the WGS 84 spheroid');
  srs.run('SIRGAS 2000 / UTM zone 20S', 31980, 'EPSG', 31980, WKT_31980, 'SIRGAS 2000 / UTM zona 20S (EPSG:31980)');

  const contents = db.prepare('INSERT INTO gpkg_contents (table_name,data_type,identifier,description,last_change,min_x,min_y,max_x,max_y,srs_id) VALUES (?,?,?,?,?,?,?,?,?,?)');
  const geomCols = db.prepare('INSERT INTO gpkg_geometry_columns VALUES (?,?,?,?,?,?)');
  const tabela = (nome, tipoGeom, colunas, linhas, geomDe, desc) => {
    const cols = colunas.map(([n, t]) => `${n} ${t}`).join(', ');
    const geomDdl = tipoGeom ? `geom ${tipoGeom}, ` : '';
    db.exec(`CREATE TABLE ${nome} (fid INTEGER PRIMARY KEY AUTOINCREMENT, ${geomDdl}${cols}, ficticio INTEGER NOT NULL DEFAULT 1)`);
    const nomes = colunas.map(([n]) => n);
    const ins = db.prepare(`INSERT INTO ${nome} (${tipoGeom ? 'geom, ' : ''}${nomes.join(', ')}, ficticio) VALUES (${tipoGeom ? '?, ' : ''}${nomes.map(() => '?').join(', ')}, 1)`);
    let env = null;
    for (const l of linhas) {
      const vals = nomes.map((n) => (l[n] === undefined ? null : l[n]));
      if (tipoGeom) {
        const g = geomDe(l);
        const ex = { minx: g.readDoubleLE(8), maxx: g.readDoubleLE(16), miny: g.readDoubleLE(24), maxy: g.readDoubleLE(32) };
        env = env
          ? { minx: Math.min(env.minx, ex.minx), maxx: Math.max(env.maxx, ex.maxx), miny: Math.min(env.miny, ex.miny), maxy: Math.max(env.maxy, ex.maxy) }
          : ex;
        ins.run(g, ...vals);
      } else ins.run(...vals);
    }
    const descricao = `${desc} ${AVISO}`;
    if (tipoGeom) {
      contents.run(nome, 'features', nome, descricao, `${DATA_FIXA}T00:00:00.000Z`, env.minx, env.miny, env.maxx, env.maxy, 31980);
      geomCols.run(nome, 'geom', tipoGeom, 31980, 0, 0);
    } else contents.run(nome, 'attributes', nome, descricao, `${DATA_FIXA}T00:00:00.000Z`, null, null, null, null, null);
  };

  tabela('postes', 'POINT', [
    ['cod_poste', 'TEXT'], ['material', 'TEXT'], ['altura_m', 'INTEGER'], ['esforco_dan', 'INTEGER'],
    ['tem_trafo', 'INTEGER'], ['tem_ip', 'INTEGER'], ['ocupantes_qtd', 'INTEGER'], ['data_vistoria', 'TEXT'], ['situacao', 'TEXT'],
  ], todosPostes.map((p) => ({ ...p, cod_poste: p.cod })), (l) => geomPonto(l.e, l.n), 'Postes (pontos).');
  tabela('vaos', 'LINESTRING', [
    ['cod_vao', 'TEXT'], ['poste_ini', 'TEXT'], ['poste_fim', 'TEXT'], ['compr_m', 'REAL'], ['travessia', 'INTEGER'],
  ], vaos, (l) => geomLinha([l.a, l.b]), 'Vãos de poste a poste (linhas).');
  tabela('cabos', 'LINESTRING', [
    ['cod_cabo', 'TEXT'], ['tipo', 'TEXT'], ['fibras', 'INTEGER'], ['ocupante_id', 'INTEGER'], ['poste_ini', 'TEXT'],
    ['poste_fim', 'TEXT'], ['compr_proj_m', 'REAL'], ['plaqueta', 'TEXT'],
  ], cabos, (l) => geomLinha(l.coords), 'Cabos (linhas por vários postes).');
  tabela('caixas', 'POINT', [
    ['cod_caixa', 'TEXT'], ['tipo', 'TEXT'], ['capacidade', 'INTEGER'], ['poste_cod', 'TEXT'], ['ocupante_id', 'INTEGER'],
  ], caixas, (l) => geomPonto(l.e, l.n), 'Caixas de emenda e de atendimento (pontos).');
  tabela('quadras', 'POLYGON', [['quadra', 'TEXT'], ['area_m2', 'REAL']], quadras, (l) => geomPoligono(l.anel), 'Quadras (polígonos).');
  tabela('ocupantes', null, [
    ['ocupante_id', 'INTEGER'], ['nome_ficticio', 'TEXT'], ['cnpj_ficticio', 'TEXT'], ['contrato', 'TEXT'],
  ], OCUPANTES, null, 'Ocupantes (tabela sem geometria).');
  const linhasOcup = [...ocupacoes].sort(
    (a, b) => baseCods.indexOf(a.cod_poste) - baseCods.indexOf(b.cod_poste) || a.ocupante_id - b.ocupante_id,
  );
  tabela('ocupacoes', null, [
    ['cod_poste', 'TEXT'], ['ocupante_id', 'INTEGER'], ['altura_fixacao_m', 'REAL'], ['dist_bt_m', 'REAL'],
    ['plaqueta', 'TEXT'], ['reserva_no_poste', 'INTEGER'], ['cabos_no_ponto', 'INTEGER'],
  ], linhasOcup, null, 'Pontos de fixação de cada ocupante em cada poste (tabela sem geometria).');

  // Metadados (extensão gpkg_metadata)
  const xml = `<?xml version="1.0" encoding="UTF-8"?><gmd:MD_Metadata xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gco="http://www.isotc211.org/2005/gco"><gmd:identificationInfo><gmd:MD_DataIdentification><gmd:citation><gmd:CI_Citation><gmd:title><gco:CharacterString>Rede fictícia - ${LOCAL}</gco:CharacterString></gmd:title></gmd:CI_Citation></gmd:citation><gmd:abstract><gco:CharacterString>${AVISO} Uso livre para estudo. SRC: EPSG:31980.</gco:CharacterString></gmd:abstract></gmd:MD_DataIdentification></gmd:identificationInfo></gmd:MD_Metadata>`;
  db.prepare('INSERT INTO gpkg_metadata (id, md_scope, md_standard_uri, mime_type, metadata) VALUES (1, ?, ?, ?, ?)').run(
    'dataset', 'http://www.isotc211.org/2005/gmd', 'text/xml', xml,
  );
  const ref = db.prepare('INSERT INTO gpkg_metadata_reference (reference_scope, table_name, column_name, row_id_value, timestamp, md_file_id, md_parent_id) VALUES (?,?,?,?,?,1,NULL)');
  ref.run('geopackage', null, null, null, `${DATA_FIXA}T00:00:00.000Z`);
  for (const t of ['postes', 'vaos', 'cabos', 'caixas', 'quadras', 'ocupantes', 'ocupacoes'])
    ref.run('table', t, null, null, `${DATA_FIXA}T00:00:00.000Z`);
  const ext = db.prepare('INSERT INTO gpkg_extensions VALUES (?,?,?,?,?)');
  ext.run('gpkg_metadata', null, 'gpkg_metadata', 'http://www.geopackage.org/spec121/#extension_metadata', 'read-write');
  ext.run('gpkg_metadata_reference', null, 'gpkg_metadata', 'http://www.geopackage.org/spec121/#extension_metadata', 'read-write');
  db.exec('COMMIT');
  db.exec('VACUUM');
  db.close();
}

// ---------------------------------------------------------------- KML, CSV, LEIA-ME, gabarito
const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function gerarKml() {
  const marcas = todosPostes
    .map((p) => {
      const g = UTM20S.inverso(p.e, p.n);
      return `    <Placemark>\n      <name>${xmlEsc(p.cod)}</name>\n      <Point><coordinates>${g.lon.toFixed(8)},${g.lat.toFixed(8)},0</coordinates></Point>\n    </Placemark>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2">\n  <Document>\n    <name>Postes - ${LOCAL} (fictício)</name>\n    <description>${xmlEsc(AVISO)} SRC: EPSG:4326.</description>\n${marcas}\n  </Document>\n</kml>\n`;
}
function gerarCsv() {
  const obsOk = ['', '', 'vistoria de rotina', 'acesso difícil'];
  const linhas = ['cod_poste;x;y;data;obs'];
  for (const p of postes) {
    const ang = rand(0, 2 * Math.PI);
    const mag = rand(1, 4);
    const x = r(p.e + mag * Math.cos(ang), 2);
    const y = r(p.n - 10000000 + mag * Math.sin(ang), 2);
    const obs = p.situacao === 'ok' ? obsOk[randInt(0, 3)] : p.situacao === 'inclinado' ? 'poste inclinado' : 'base danificada';
    linhas.push(`${p.cod};${x.toFixed(2)};${y.toFixed(2)};${p.data_vistoria};${obs}`);
  }
  return `${linhas.join('\n')}\n`;
}
function gerarLeiaMe() {
  return `DADOS FICTÍCIOS DE QGIS - ${LOCAL}
=====================================

${AVISO}
Os códigos (PF-0001, CB-01, CX-01...), os nomes de ocupantes e os CNPJs são inventados.

Arquivos
- rede-ficticia.gpkg: GeoPackage com as camadas postes, vaos, cabos, caixas e quadras e as tabelas sem geometria
  ocupantes e ocupacoes. SRC de todas as camadas: EPSG:31980 (SIRGAS 2000 / UTM zona 20S).
- postes.kml: os mesmos postes em EPSG:4326 (longitude, latitude).
- vistoria-utm-sem-src.csv: pontos de uma vistoria fictícia, separador ";", ponto decimal, colunas
  cod_poste;x;y;data;obs. As coordenadas estão em UTM zona 20 com falso norte 0 (zona 20N, EPSG:31974), mas o
  arquivo NÃO declara o SRC, de propósito: se você abrir como EPSG:31980, os pontos caem 10.000 km ao sul.
  Descobrir o SRC certo faz parte do exercício.
- gabarito.json: totais, irregularidades plantadas e respostas de exercício. Só abra depois de tentar.

Onde fica
A área fica na Estação Ecológica de Maracá (Roraima), perto de 3,40 N e 61,65 O, num retângulo de cerca de 1,2 km
(leste-oeste) por 1,0 km (norte-sul). Foi escolhida por não ter estradas nem linhas de energia mapeadas (conferido
no OpenStreetMap em 10/11/2026). Nada aqui descreve infraestrutura real.

Licença
Uso livre para estudo.

Como regerar
npm run dados-qgis (scripts/gerar-dados-qgis.mjs). O resultado é sempre o mesmo.
`;
}

function gerarGabarito() {
  const cont = (lista, f) => lista.reduce((m, x) => ((m[f(x)] = (m[f(x)] ?? 0) + 1), m), {});
  const irreg = [];
  const add = (tipo, onde, detalhe) => irreg.push({ tipo, onde, detalhe });
  for (const o of linhasSemPlaqueta) add('ponto_sem_plaqueta', o.cod_poste, `${nomeOcup(o.ocupante_id)} sem plaqueta (plaqueta = 'nao')`);
  for (const cod of [...postes6, posteSemId4]) add('ocupante_sem_identificacao', cod, "'Sem identificação' (sem contrato) presente neste poste");
  for (const cod of postes6) add('ocupante_contrato_vencido', cod, `${nomeOcup(ID_DELTA)} (contrato vencido) presente neste poste`);
  for (const cod of postes6) add('poste_com_mais_de_5_ocupantes', cod, `${poste(cod).ocupantes_qtd} ocupantes`);
  for (const o of linhasBt) add('dist_bt_abaixo_do_limite', o.cod_poste, `${nomeOcup(o.ocupante_id)}: dist_bt_m = ${o.dist_bt_m.toFixed(2)} (limite do exercício 0,60)`);
  for (const o of linhasAltura) add('altura_baixa_em_travessia', o.cod_poste, `${nomeOcup(o.ocupante_id)}: altura_fixacao_m = ${o.altura_fixacao_m.toFixed(2)} (limite do exercício 5,0), poste de vão com travessia`);
  for (const o of linhasReserva) add('reserva_no_poste', o.cod_poste, `${nomeOcup(o.ocupante_id)}: sobra de cabo enrolada no poste`);
  for (const c of caixas.filter((c) => c.tipo === 'CTO' && poste(c.poste_cod)?.tem_trafo === 1)) add('cto_em_poste_com_trafo', c.cod_caixa, `CTO no poste ${c.poste_cod}, que tem transformador`);
  for (const c of cabos.filter((c) => c.cod_cabo in DESVIO_PROJETO))
    add('comprimento_de_projeto_divergente', c.cod_cabo, `compr_proj_m = ${c.compr_proj_m.toFixed(1)}; geometria = ${r(c.geom_m, 1).toFixed(1)} m (${(((c.compr_proj_m - c.geom_m) / c.geom_m) * 100).toFixed(1)}%)`);
  for (const c of caixas.filter((c) => !poste(c.poste_cod))) add('caixa_com_poste_inexistente', c.cod_caixa, `poste_cod = ${c.poste_cod}, que não existe na camada postes`);
  for (const p of extras.filter((p) => p.dupDe)) add('poste_duplicado_mesmo_local', p.cod, `mesmo lugar de ${p.dupDe}, código diferente`);
  for (const p of extras.filter((p) => p.repetidoDe)) add('cod_poste_repetido', p.cod, 'duas feições com este cod_poste, em lugares diferentes');

  const comprCabo = Object.fromEntries(cabos.map((c) => [c.cod_cabo, r(c.geom_m, 1)]));
  const porQuadra = Object.fromEntries(quadras.map((q) => [q.quadra, todosPostes.filter((p) => dentro(p, q)).length]));
  porQuadra.fora_de_quadra = todosPostes.filter((p) => !quadras.some((q) => dentro(p, q))).length;
  const cantos = [[CAIXA.min_e, CAIXA.min_n], [CAIXA.min_e, CAIXA.max_n], [CAIXA.max_e, CAIXA.min_n], [CAIXA.max_e, CAIXA.max_n]].map(([e, n]) => UTM20S.inverso(e, n));
  const maior = vaos.reduce((a, b) => (b.compr_m > a.compr_m ? b : a));
  const postesPorOcupante = Object.fromEntries(OCUPANTES.map((o) => [o.nome_ficticio, new Set(ocupacoes.filter((x) => x.ocupante_id === o.ocupante_id).map((x) => x.cod_poste)).size]));
  return {
    aviso: AVISO,
    nota: 'Os achados abaixo são plantados de propósito para exercício. Não são regra de norma. Alguns se sobrepõem: os 3 postes com 6 ocupantes são os mesmos 3 onde aparece o ocupante de contrato vencido.',
    local: {
      nome: LOCAL,
      referencia: 'Estação Ecológica de Maracá (Roraima), área sem estradas nem linhas de energia mapeadas (OpenStreetMap, 10/11/2026)',
      centro_wgs84: { lat: CENTRO_LAT, lon: CENTRO_LON },
      centro_epsg31980: { e: E0, n: N0 },
      centro_epsg31974: { e: r(c31974.e, 2), n: r(c31974.n, 2) },
      caixa_epsg31980: CAIXA,
      caixa_wgs84: {
        lon_min: Math.min(...cantos.map((c) => c.lon)), lon_max: Math.max(...cantos.map((c) => c.lon)),
        lat_min: Math.min(...cantos.map((c) => c.lat)), lat_max: Math.max(...cantos.map((c) => c.lat)),
      },
      src_geopackage: 'EPSG:31980',
      src_kml: 'EPSG:4326',
      src_csv: 'EPSG:31974 (não declarado no arquivo, de propósito); y do CSV = N do poste - 10.000.000 m, com desvio de 1 a 4 m',
    },
    parametros_do_exercicio: {
      dist_bt_minima_m: 0.6,
      altura_minima_travessia_m: 5.0,
      ocupantes_maximo_por_poste: 5,
      tolerancia_comprimento_projeto_pct: 5,
      nota: 'valores do exercício; a regra real é a da norma da distribuidora',
    },
    totais: {
      postes: todosPostes.length, vaos: vaos.length, cabos: cabos.length, caixas: caixas.length,
      quadras: quadras.length, ocupantes: OCUPANTES.length, ocupacoes: ocupacoes.length,
      pontos_no_csv: postes.length,
    },
    irregularidades: irreg,
    contagem_irregularidades_por_tipo: cont(irreg, (i) => i.tipo),
    respostas: {
      postes_com_mais_de_5_ocupantes: todosPostes.filter((p) => p.ocupantes_qtd > 5).map((p) => p.cod),
      postes_com_mais_de_3_ocupantes: todosPostes.filter((p) => p.ocupantes_qtd > 3).length,
      postes_com_mais_de_2_ocupantes: todosPostes.filter((p) => p.ocupantes_qtd > 2).length,
      comprimento_planimetrico_cabos_m: comprCabo,
      comprimento_planimetrico_total_cabos_m: r(cabos.reduce((s, c) => s + c.geom_m, 0), 1),
      comprimento_total_vaos_m: r(vaos.reduce((s, v) => s + v.compr_m, 0), 1),
      vao_mais_longo: { cod_vao: maior.cod_vao, compr_m: maior.compr_m },
      vaos_com_travessia: vaos.filter((v) => v.travessia).length,
      postes_por_quadra: porQuadra,
      postes_por_material: cont(postes, (p) => p.material),
      postes_com_trafo: todosPostes.filter((p) => p.tem_trafo).length,
      postes_com_iluminacao_publica: todosPostes.filter((p) => p.tem_ip).length,
      caixas_por_tipo: cont(caixas, (c) => c.tipo),
      cabos_por_tipo: cont(cabos, (c) => c.tipo),
      postes_por_ocupante: postesPorOcupante,
      cabos_com_plaqueta_nao: cabos.filter((c) => c.plaqueta === 'nao').map((c) => c.cod_cabo),
      deslocamento_n_csv_para_gpkg_m: 10000000,
    },
  };
}

// ---------------------------------------------------------------- gravação
mkdirSync(SAIDA, { recursive: true });
gravarGpkg(join(SAIDA, 'rede-ficticia.gpkg'));
writeFileSync(join(SAIDA, 'postes.kml'), gerarKml());
writeFileSync(join(SAIDA, 'vistoria-utm-sem-src.csv'), gerarCsv());
writeFileSync(join(SAIDA, 'LEIA-ME.txt'), gerarLeiaMe());
writeFileSync(join(SAIDA, 'gabarito.json'), `${JSON.stringify(gerarGabarito(), null, 2)}\n`);
console.log(
  `dados-qgis: ${todosPostes.length} postes, ${vaos.length} vãos, ${cabos.length} cabos, ${caixas.length} caixas, ` +
    `${quadras.length} quadras, ${ocupacoes.length} ocupações. Centro EPSG:31980 = ${E0} E, ${N0} N.`,
);
