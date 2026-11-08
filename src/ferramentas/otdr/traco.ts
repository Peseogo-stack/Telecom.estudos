// Simulador de traço de OTDR para estudo. É um desenho didático, não uma medida.
// - Valores típicos de perda e refletância: VIAVI, "OTDR Testing Tech Tip" (2023) — fonte viavi-otdr-dicas.
// - Forma dos eventos (rampa = retroespalhamento; pico = Fresnel; degrau = evento sem reflexão):
//   EXFO, AN 194 (2017) — exfo-otdr-an194; FOA, OTDR — foa-otdr (fantasma, ganho aparente, ~1% de fibra a mais).

export type Lambda = 1310 | 1550;
export type Nivel = 'facil' | 'medio' | 'dificil';
export type TipoEvento = 'conector' | 'fusao' | 'curvatura' | 'ganho' | 'quebra' | 'fim' | 'fantasma';

export interface EventoOtdr {
  tipo: TipoEvento;
  km: number;
  /** Perda do evento em cada λ, em dB. Negativa = ganho aparente. Fim, quebra e fantasma: 0. */
  perda: Record<Lambda, number>;
  /** Refletância em dB (número negativo); null = sem reflexão. */
  refletancia: number | null;
}

export interface Cenario {
  nivel: Nivel;
  indice: number;
  /** Comprimento do enlace no projeto (cabo), em km. */
  projetoKm: number;
  lambdas: Lambda[];
  /** Eventos em ordem de distância. O último "de verdade" é o fim ou a quebra; o fantasma vem depois. */
  eventos: EventoOtdr[];
  /** Até onde o gráfico vai, em km. */
  kmMax: number;
}

export const NIVEIS: Nivel[] = ['facil', 'medio', 'dificil'];
export const NOME_NIVEL: Record<Nivel, string> = { facil: 'Fácil (1310 nm)', medio: 'Médio (1310 e 1550 nm)', dificil: 'Difícil (ganho aparente e fantasma)' };
export const TRACOS_POR_NIVEL = 12;

/** Atenuação típica da fibra monomodo (VIAVI): 0,35 dB/km em 1310 nm e 0,2 dB/km em 1550 nm. */
export const ATENUACAO_TIPICA: Record<Lambda, number> = { 1310: 0.35, 1550: 0.2 };

export const NOME_TIPO: Record<TipoEvento, string> = {
  conector: 'Par de conectores',
  fusao: 'Fusão',
  curvatura: 'Curvatura',
  ganho: 'Ganho aparente',
  quebra: 'Quebra',
  fim: 'Fim da fibra',
  fantasma: 'Fantasma (eco)',
};

/** Opções que aparecem para responder em cada nível. */
export const OPCOES: Record<Nivel, TipoEvento[]> = {
  facil: ['conector', 'fusao', 'quebra', 'fim'],
  medio: ['conector', 'fusao', 'curvatura', 'quebra', 'fim'],
  dificil: ['conector', 'fusao', 'curvatura', 'ganho', 'quebra', 'fim', 'fantasma'],
};

/** Por que cada evento tem essa cara (texto da correção). */
export const EXPLICACAO: Record<TipoEvento, string> = {
  conector: 'Pico (reflexão) seguido de degrau: um par de conectores UPC limpo perde de 0,15 a 0,5 dB e reflete de −50 a −59 dB.',
  fusao: 'Degrau para baixo sem pico, quase igual em 1310 e em 1550 nm: fusão não reflete e perde tipicamente de 0,10 a 0,30 dB.',
  curvatura: 'Degrau sem pico, bem maior em 1550 nm do que em 1310 nm: a curvatura costuma ser de 5 a 10 vezes pior em 1550 nm.',
  ganho: 'Degrau para cima: ganho aparente, efeito de fibras diferentes na emenda. A perda real sai da média dos dois sentidos.',
  quebra: 'O traço cai para o ruído antes do comprimento do projeto, com pico menor que o de um conector aberto (−30 a −48 dB) ou sem pico.',
  fim: 'O traço cai para o ruído no comprimento do projeto (a fibra tem cerca de 1% a mais que o cabo), com pico alto: conector UPC aberto reflete de −14 a −20 dB.',
  fantasma: 'Pico sem perda, depois do fim, a um múltiplo da distância de uma reflexão forte: é eco, não evento.',
};

/** Fontes (ids de content/fontes.json) da explicação de cada tipo. */
export const FONTES_TIPO: Record<TipoEvento, string[]> = {
  conector: ['viavi-otdr-dicas'],
  fusao: ['viavi-otdr-dicas', 'exfo-otdr-an194'],
  curvatura: ['viavi-otdr-dicas'],
  ganho: ['foa-otdr', 'yokogawa-otdr-bidirecional'],
  quebra: ['viavi-otdr-dicas'],
  fim: ['viavi-otdr-dicas', 'foa-otdr'],
  fantasma: ['foa-otdr'],
};

// ---- Sorteio com semente (mesmo traço para o mesmo nível e número) ----
export function criarSorteio(semente: number): () => number {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const entre = (r: () => number, a: number, b: number) => a + (b - a) * r();
const arred = (x: number, casas = 2) => Math.round(x * 10 ** casas) / 10 ** casas;

function embaralhar<T>(lista: T[], r: () => number): T[] {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function eventoDoMeio(tipo: TipoEvento, km: number, r: () => number): EventoOtdr {
  switch (tipo) {
    case 'conector': {
      const p = arred(entre(r, 0.2, 0.5));
      return { tipo, km, perda: { 1310: p, 1550: arred(p + entre(r, -0.03, 0.03)) }, refletancia: Math.round(entre(r, -59, -50)) };
    }
    case 'fusao': {
      // VIAVI: fusão de 0,10 a 0,30 dB
      const p = arred(entre(r, 0.1, 0.3));
      return { tipo, km, perda: { 1310: p, 1550: arred(Math.max(0.03, p + entre(r, -0.02, 0.02))) }, refletancia: null };
    }
    case 'curvatura': {
      const p = arred(entre(r, 0.06, 0.25));
      return { tipo, km, perda: { 1310: p, 1550: arred(p * entre(r, 5.5, 9.5)) }, refletancia: null };
    }
    case 'ganho': {
      const p = arred(-entre(r, 0.08, 0.25));
      return { tipo, km, perda: { 1310: p, 1550: arred(p + entre(r, -0.02, 0.02)) }, refletancia: null };
    }
    default:
      throw new Error(`tipo inesperado no meio do enlace: ${tipo}`);
  }
}

/** Gera o traço número `indice` (1 a TRACOS_POR_NIVEL) de um nível. Mesmo nível e número = mesmo traço. */
export function gerarCenario(nivel: Nivel, indice: number): Cenario {
  const r = criarSorteio(7919 * (NIVEIS.indexOf(nivel) + 1) + 104729 * indice);
  const projetoKm = arred(entre(r, 4, 12), 1);
  const lambdas: Lambda[] = nivel === 'facil' ? [1310] : [1310, 1550];
  const tiposMeio: TipoEvento[] =
    nivel === 'facil' ? ['conector', 'fusao'] : nivel === 'medio' ? ['conector', 'fusao', 'curvatura'] : ['conector', 'fusao', 'curvatura', 'ganho'];
  const quantos = nivel === 'facil' ? 2 : 3;
  const tipos = embaralhar(tiposMeio, r).slice(0, quantos);

  // Quebra em cerca de 1 a cada 3 traços; senão, fim normal (no comprimento do projeto + ~1% de fibra a mais).
  const quebra = r() < 0.34;
  const kmTerminal = quebra ? arred(projetoKm * entre(r, 0.6, 0.82)) : arred(projetoKm * 1.01);

  // Eventos do meio, espaçados entre 12% e 90% do trecho até o fim (ou a quebra).
  const fatias = quantos + 1;
  const eventos: EventoOtdr[] = tipos.map((tipo, i) => {
    const base = (i + 1) / fatias;
    const km = arred(kmTerminal * Math.min(0.9, Math.max(0.12, base + entre(r, -0.08, 0.08))));
    return eventoDoMeio(tipo, km, r);
  });
  eventos.sort((a, b) => a.km - b.km);

  if (quebra) {
    const semPico = r() < 0.3;
    eventos.push({ tipo: 'quebra', km: kmTerminal, perda: { 1310: 0, 1550: 0 }, refletancia: semPico ? null : Math.round(entre(r, -48, -30)) });
  } else {
    eventos.push({ tipo: 'fim', km: kmTerminal, perda: { 1310: 0, 1550: 0 }, refletancia: Math.round(entre(r, -20, -14)) });
  }

  // Fantasma (só no difícil, com fim de fibra muito reflexivo): eco a 2× a distância do fim.
  const temFantasma = nivel === 'dificil' && !quebra && r() < 0.6;
  if (temFantasma) eventos.push({ tipo: 'fantasma', km: arred(kmTerminal * 2), perda: { 1310: 0, 1550: 0 }, refletancia: -30 });

  const kmMax = arred(temFantasma ? kmTerminal * 2.25 : Math.max(projetoKm, kmTerminal) * 1.3, 1);
  return { nivel, indice, projetoKm, lambdas, eventos, kmMax };
}

/** Letra de cada evento marcado no traço (A, B, C…), na ordem da distância. */
export function letra(i: number): string {
  return String.fromCharCode(65 + i);
}

/** Altura visual do pico acima do retroespalhamento, em dB, a partir da refletância (didático). */
export function alturaDoPico(refletancia: number | null): number {
  if (refletancia === null) return 0;
  return Math.min(13, Math.max(0.3, (refletancia + 75) / 5));
}

export interface Ponto {
  km: number;
  db: number;
}

/**
 * Nível do retroespalhamento (sem picos nem ruído) em `km`, para a λ dada.
 * `exagero` multiplica só a perda dos eventos, para o degrau aparecer no desenho (didático).
 */
export function nivelRetroespalhamento(c: Cenario, lambda: Lambda, km: number, exagero = 1): number {
  let nivel = -ATENUACAO_TIPICA[lambda] * km;
  for (const e of c.eventos) {
    if (e.km >= km) break;
    if (e.tipo === 'fim' || e.tipo === 'quebra' || e.tipo === 'fantasma') break;
    nivel -= e.perda[lambda] * exagero;
  }
  return nivel;
}

/** Fim (ou quebra) do traço: depois dele só há ruído. */
export function eventoTerminal(c: Cenario): EventoOtdr {
  const t = c.eventos.find((e) => e.tipo === 'fim' || e.tipo === 'quebra');
  if (!t) throw new Error('cenário sem fim de fibra');
  return t;
}

/** Nível do ruído depois do fim (dB), usado também para enquadrar o gráfico. */
export function nivelDoRuido(c: Cenario, lambda: Lambda, exagero = 1): number {
  return nivelRetroespalhamento(c, lambda, eventoTerminal(c).km, exagero) - 14;
}

/** Pontos do traço para desenhar (dB relativos ao início). */
export function pontosDoTraco(c: Cenario, lambda: Lambda, n = 480, exagero = 1): Ponto[] {
  const r = criarSorteio(31 * c.indice + lambda + NIVEIS.indexOf(c.nivel) * 977);
  const terminal = eventoTerminal(c);
  const nivelNoFim = nivelRetroespalhamento(c, lambda, terminal.km, exagero);
  const piso = nivelNoFim - 14;
  const largura = c.kmMax / 110;
  const zonaMortaInicial = c.kmMax / 70;
  const pontos: Ponto[] = [];
  for (let i = 0; i <= n; i++) {
    const km = (c.kmMax * i) / n;
    let db: number;
    if (km > terminal.km + largura * 0.5) {
      db = piso + entre(r, -0.8, 0.8);
    } else {
      db = nivelRetroespalhamento(c, lambda, km, exagero) + entre(r, -0.04, 0.04);
    }
    // Pulso inicial: satura o receptor e cria a zona morta do começo.
    if (km < zonaMortaInicial) db = Math.max(db, 12 * (1 - km / zonaMortaInicial));
    // Picos de reflexão (triângulo da largura do pulso).
    for (const e of c.eventos) {
      const h = alturaDoPico(e.refletancia);
      if (!h) continue;
      const d = Math.abs(km - e.km);
      if (d < largura) {
        const base = e.tipo === 'fantasma' ? piso : nivelRetroespalhamento(c, lambda, e.km, exagero);
        db = Math.max(db, base + h * (1 - d / largura));
      }
    }
    pontos.push({ km: arred(km, 4), db: arred(db, 3) });
  }
  return pontos;
}

export interface Correcao {
  letra: string;
  certo: boolean;
  resposta: TipoEvento | '';
  esperado: TipoEvento;
}

/** Confere as respostas (letra → tipo escolhido). */
export function corrigir(c: Cenario, respostas: Record<string, TipoEvento | ''>): Correcao[] {
  return c.eventos.map((e, i) => {
    const l = letra(i);
    const resposta = respostas[l] ?? '';
    return { letra: l, certo: resposta === e.tipo, resposta, esperado: e.tipo };
  });
}
