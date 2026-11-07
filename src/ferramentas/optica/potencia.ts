// Contas de potência óptica: dBm ↔ mW, perdas de splitter e orçamento de potência.
// Fontes de cada valor padrão: content/fontes.json (ids citados nos comentários e na tela).

/** dBm = 10·log10(P / 1 mW)  (FOA, "dB and dBm") */
export function mwParaDbm(mw: number): number {
  if (!(mw > 0)) return NaN;
  return 10 * Math.log10(mw);
}

/** P(mW) = 10^(dBm/10) */
export function dbmParaMw(dbm: number): number {
  return 10 ** (dbm / 10);
}

/** Perda ideal de um splitter balanceado 1:N, sem excesso: 10·log10(N). */
export function perdaIdealBalanceado(n: number): number {
  return 10 * Math.log10(n);
}

/** Perda ideal da perna que leva a fração p (0 < p < 1) num splitter desbalanceado: −10·log10(p). */
export function perdaIdealPerna(fracao: number): number {
  return -10 * Math.log10(fracao);
}

export interface LinhaSplitter {
  rotulo: string;
  ideal: number;
  maximo: number;
  fonte: string;
  confirmar?: boolean;
}

/**
 * Máximos de perda de inserção de splitter PLC balanceado, sem conector, em três fichas
 * (conferidas em 07/11/2026). Mostra que o valor muda de fabricante para fabricante.
 */
export const FICHAS_SPLITTER: Record<string, Partial<Record<number, number>>> = {
  'intelbras-splitter-plc': { 2: 4.0, 4: 7.3, 8: 10.5, 16: 13.7, 32: 16.9 },
  'senko-plc': { 2: 4, 4: 7.4, 8: 10.7, 16: 13.7, 32: 16.9, 64: 21 },
  'fs-plc': { 2: 4.4, 4: 7.6, 8: 10.9, 16: 13.9, 32: 17.3, 64: 21.4 },
};

/** Menor e maior máximo entre as fichas para um splitter 1:N. */
export function faixaEntreFichas(n: number): { menor: number; maior: number; fichas: number } | null {
  const valores = Object.values(FICHAS_SPLITTER)
    .map((f) => f[n])
    .filter((v): v is number => typeof v === 'number');
  if (!valores.length) return null;
  return { menor: Math.min(...valores), maior: Math.max(...valores), fichas: valores.length };
}

/** Splitter PLC balanceado: valor máximo de ficha (sem conector) usado como padrão no orçamento. */
export const SPLITTERS_BALANCEADOS: (LinhaSplitter & { n: number })[] = [
  { n: 2, rotulo: '1:2', ideal: perdaIdealBalanceado(2), maximo: 4.0, fonte: 'intelbras-splitter-plc' },
  { n: 4, rotulo: '1:4', ideal: perdaIdealBalanceado(4), maximo: 7.4, fonte: 'senko-plc' },
  { n: 8, rotulo: '1:8', ideal: perdaIdealBalanceado(8), maximo: 10.7, fonte: 'senko-plc' },
  { n: 16, rotulo: '1:16', ideal: perdaIdealBalanceado(16), maximo: 13.7, fonte: 'senko-plc' },
  { n: 32, rotulo: '1:32', ideal: perdaIdealBalanceado(32), maximo: 16.9, fonte: 'senko-plc' },
  { n: 64, rotulo: '1:64', ideal: perdaIdealBalanceado(64), maximo: 21.4, fonte: 'fs-plc' },
];

/** A ficha Intelbras XFSD vale de 1310 a 1550 nm. */
export const FAIXA_XFSD_NM = { de: 1310, ate: 1550 };

/** Splitter FBT desbalanceado 1x2: perda máxima da perna menor e da perna maior (ficha Intelbras XFSD). */
export const SPLITTERS_DESBALANCEADOS: { razao: string; menor: number; maior: number; idealMenor: number; idealMaior: number; fonte: string }[] = [
  { razao: '5/95', menor: 14.3, maior: 0.8, idealMenor: perdaIdealPerna(0.05), idealMaior: perdaIdealPerna(0.95), fonte: 'intelbras-xfsd' },
  { razao: '10/90', menor: 11.0, maior: 1.1, idealMenor: perdaIdealPerna(0.1), idealMaior: perdaIdealPerna(0.9), fonte: 'intelbras-xfsd' },
  { razao: '20/80', menor: 7.9, maior: 1.6, idealMenor: perdaIdealPerna(0.2), idealMaior: perdaIdealPerna(0.8), fonte: 'intelbras-xfsd' },
  { razao: '30/70', menor: 6.1, maior: 2.2, idealMenor: perdaIdealPerna(0.3), idealMaior: perdaIdealPerna(0.7), fonte: 'intelbras-xfsd' },
  { razao: '40/60', menor: 4.8, maior: 2.9, idealMenor: perdaIdealPerna(0.4), idealMaior: perdaIdealPerna(0.6), fonte: 'intelbras-xfsd' },
  { razao: '50/50', menor: 3.7, maior: 3.7, idealMenor: perdaIdealPerna(0.5), idealMaior: perdaIdealPerna(0.5), fonte: 'intelbras-xfsd' },
];

/**
 * Atenuação máxima do cabo G.652.D por comprimento de onda (ITU-T G.652, 08/2024, Tabela 2):
 * até 0,40 dB/km de 1310 a 1625 nm; até 0,30 dB/km de 1530 a 1565 nm;
 * abaixo de 1310 nm (até 1260 nm), soma-se 0,07 dB/km ao valor de 1310 (Nota 2).
 */
export function atenuacaoMaximaG652D(lambdaNm: number): number {
  if (lambdaNm >= 1530 && lambdaNm <= 1565) return 0.3;
  if (lambdaNm >= 1310 && lambdaNm <= 1625) return 0.4;
  if (lambdaNm >= 1260 && lambdaNm < 1310) return 0.47;
  return NaN; // fora da faixa coberta pela norma
}

export type ItemSplitter =
  | { id: string; tipo: 'balanceado'; n: number; perda: number }
  | { id: string; tipo: 'desbalanceado'; razao: string; perna: 'menor' | 'maior'; perda: number };

/** Perda ideal (sem excesso) de um item de splitter: o mínimo físico possível. */
export function perdaIdealDoSplitter(s: ItemSplitter): number {
  if (s.tipo === 'balanceado') return perdaIdealBalanceado(s.n);
  const [a, b] = s.razao.split('/').map(Number);
  const menor = Math.min(a, b) / 100;
  const maior = Math.max(a, b) / 100;
  return perdaIdealPerna(s.perna === 'menor' ? menor : maior);
}

export interface EntradaOrcamento {
  /** Potência de saída do transmissor, pior caso (mínima), em dBm. */
  txMin: number;
  /** Potência máxima do transmissor (para conferir saturação), em dBm. */
  txMax: number;
  /** Sensibilidade do receptor (mínima potência que ele aceita), em dBm. */
  sensibilidade: number;
  /** Sobrecarga do receptor (máxima potência que ele aceita), em dBm. null = não informado. */
  sobrecarga: number | null;
  /** Penalidade óptica (dispersão, transmissor…), descontada do orçamento, em dB. */
  penalidade: number;
  /** Perda mínima exigida pela classe (GPON B+: 13 dB). null = sem exigência. */
  perdaMinimaClasse: number | null;
  lambdaNm: number;
  km: number;
  atenuacaoDbKm: number;
  conectores: number;
  perdaConector: number;
  fusoes: number;
  perdaFusao: number;
  splitters: ItemSplitter[];
  /** Margem de segurança (envelhecimento, reparos futuros), em dB. */
  margem: number;
}

export interface ItemPerda {
  rotulo: string;
  perda: number;
}

export interface ResultadoOrcamento {
  itens: ItemPerda[];
  perdaTotal: number;
  /** Menor perda possível: splitters ideais e o resto zero (pior caso para saturação). */
  perdaMinima: number;
  orcamentoDisponivel: number;
  /** Potência que chega no receptor no pior caso (Tx mínima, perdas máximas). */
  recebidaMin: number;
  /** Potência que chega no receptor com Tx máxima e perda mínima, para conferir saturação. */
  recebidaMax: number;
  /** O que sobra depois de tirar perdas e margem do orçamento. */
  folga: number;
  passaSensibilidade: boolean;
  passaSobrecarga: boolean;
  passa: boolean;
  maiorItem: ItemPerda | null;
  avisos: string[];
}

const arred = (x: number, casas = 2) => Math.round(x * 10 ** casas) / 10 ** casas;

export function validarOrcamento(e: EntradaOrcamento): string[] {
  const erros: string[] = [];
  const num = (v: number) => Number.isFinite(v);
  if (!num(e.txMin) || !num(e.txMax)) erros.push('Informe a potência do transmissor (mínima e máxima).');
  else if (e.txMax < e.txMin) erros.push('A potência máxima do transmissor não pode ser menor que a mínima.');
  if (!num(e.sensibilidade)) erros.push('Informe a sensibilidade do receptor.');
  if (e.sobrecarga !== null && !num(e.sobrecarga)) erros.push('Sobrecarga inválida.');
  if (e.sobrecarga !== null && num(e.sobrecarga) && num(e.sensibilidade) && e.sobrecarga <= e.sensibilidade)
    erros.push('A sobrecarga deve ser maior (menos negativa) que a sensibilidade.');
  if (!(e.penalidade >= 0)) erros.push('Valor inválido em penalidade óptica (use zero ou mais).');
  for (const [v, nome] of [
    [e.km, 'distância'],
    [e.atenuacaoDbKm, 'atenuação da fibra'],
    [e.conectores, 'número de conectores'],
    [e.perdaConector, 'perda por conector'],
    [e.fusoes, 'número de fusões'],
    [e.perdaFusao, 'perda por fusão'],
    [e.margem, 'margem'],
  ] as const) {
    if (!(v >= 0)) erros.push(`Valor inválido em ${nome} (use zero ou mais).`);
  }
  for (const s of e.splitters) if (!(s.perda >= 0)) erros.push('Perda de splitter inválida.');
  return erros;
}

export function calcularOrcamento(e: EntradaOrcamento): ResultadoOrcamento {
  const itens: ItemPerda[] = [
    { rotulo: `Fibra: ${arred(e.km, 3)} km × ${arred(e.atenuacaoDbKm, 3)} dB/km (${e.lambdaNm} nm)`, perda: e.km * e.atenuacaoDbKm },
    { rotulo: `Conectores: ${e.conectores} × ${arred(e.perdaConector)} dB`, perda: e.conectores * e.perdaConector },
    { rotulo: `Fusões: ${e.fusoes} × ${arred(e.perdaFusao)} dB`, perda: e.fusoes * e.perdaFusao },
    ...e.splitters.map((s) => ({
      rotulo: s.tipo === 'balanceado' ? `Splitter 1:${s.n}` : `Splitter ${s.razao}, perna ${s.perna === 'menor' ? 'menor (derivação)' : 'maior (passagem)'}`,
      perda: s.perda,
    })),
  ];
  const perdaTotal = itens.reduce((t, i) => t + i.perda, 0);
  // Saturação: o pior caso é Tx máxima com a MENOR perda possível (G.984.2, Tabela A.2: a classe B+
  // exige perda mínima de 13 dB por causa da sobrecarga). Splitter ideal; fibra, conector e fusão em zero.
  const perdaMinima = e.splitters.reduce((t, s) => t + perdaIdealDoSplitter(s), 0);
  const orcamentoDisponivel = e.txMin - e.sensibilidade - e.penalidade;
  const recebidaMin = e.txMin - perdaTotal;
  const recebidaMax = e.txMax - perdaMinima;
  const folga = orcamentoDisponivel - perdaTotal - e.margem;
  const passaSensibilidade = folga >= -1e-9;
  const passaSobrecarga = e.sobrecarga === null || recebidaMax <= e.sobrecarga + 1e-9;
  const maiorItem = itens.filter((i) => i.perda > 0).sort((a, b) => b.perda - a.perda)[0] ?? null;
  const avisos: string[] = [];
  if (!passaSobrecarga)
    avisos.push('Com Tx máxima e a menor perda possível, a potência passa da sobrecarga do receptor (saturação): use atenuador ou um transceptor de menor alcance.');
  if (e.perdaMinimaClasse !== null && perdaMinima < e.perdaMinimaClasse - 1e-9)
    avisos.push(`A perda mínima possível (${arred(perdaMinima, 1).toLocaleString('pt-BR')} dB) fica abaixo dos ${e.perdaMinimaClasse.toLocaleString('pt-BR')} dB que a classe exige: a ONU pode saturar.`);
  if (
    e.splitters.some((s) => s.tipo === 'desbalanceado') &&
    (e.lambdaNm < FAIXA_XFSD_NM.de || e.lambdaNm > FAIXA_XFSD_NM.ate)
  )
    avisos.push(`A ficha do splitter desbalanceado (XFSD) vale de 1310 a 1550 nm; em ${e.lambdaNm} nm, confirme a perda com o fabricante.`);
  if (passaSensibilidade && folga < 1) avisos.push('Passa, mas com menos de 1 dB de folga além da margem.');
  if (Number.isNaN(atenuacaoMaximaG652D(e.lambdaNm))) avisos.push('Comprimento de onda fora da faixa coberta pela G.652.D (1260 a 1625 nm).');
  return {
    itens,
    perdaTotal,
    perdaMinima,
    orcamentoDisponivel,
    recebidaMin,
    recebidaMax,
    folga,
    passaSensibilidade,
    passaSobrecarga,
    passa: passaSensibilidade && passaSobrecarga,
    maiorItem,
    avisos,
  };
}

/** Pontos de partida de transceptores. Todos editáveis; a ficha do equipamento instalado manda. */
export interface PresetTransceptor {
  id: string;
  nome: string;
  lambdaNm: number;
  txMin: number;
  txMax: number;
  sensibilidade: number;
  sobrecarga: number | null;
  penalidade: number;
  perdaMinimaClasse: number | null;
  fontes: string[];
  nota: string;
}

export const PRESETS: PresetTransceptor[] = [
  {
    id: 'gpon-bplus',
    nome: 'GPON classe B+ (descida, OLT → ONU)',
    lambdaNm: 1490,
    txMin: 1.5,
    txMax: 5,
    sensibilidade: -27,
    sobrecarga: -8,
    penalidade: 0.5,
    perdaMinimaClasse: 13,
    fontes: ['itu-g9842-2019', 'fs-gpon-olt-sfp', 'fs-gpon-onu-bplus'],
    nota: 'OLT de +1,5 a +5 dBm; ONU com sensibilidade de −27 dBm e sobrecarga de −8 dBm; penalidade de 0,5 dB na descida. Orçamento da classe: 1,5 − (−27) − 0,5 = 28 dB, com perda mínima de 13 dB (G.984.2, Tabelas A.1 e A.2).',
  },
  {
    id: 'lx',
    nome: '1000BASE-LX (ponto a ponto, 1310 nm)',
    lambdaNm: 1310,
    txMin: -9.5,
    txMax: -3,
    sensibilidade: -19,
    sobrecarga: -3,
    penalidade: 0,
    perdaMinimaClasse: null,
    fontes: ['juniper-sfp-lx'],
    nota: 'Tx de −9,5 a −3 dBm; recepção de −19 a −3 dBm (ficha de fabricante). A ficha não informa a penalidade: o campo começa em zero; confirme com o fabricante.',
  },
  {
    id: 'bx10',
    nome: '1000BASE-BX10 (ponto a ponto, uma fibra)',
    lambdaNm: 1310,
    txMin: -9,
    txMax: -3,
    sensibilidade: -19.5,
    sobrecarga: -3,
    penalidade: 3.3,
    perdaMinimaClasse: null,
    fontes: ['extreme-sfp-bx10'],
    nota: 'Tx de −9 a −3 dBm; sensibilidade de −19,5 dBm; penalidade máxima de transmissor e dispersão de 3,3 dB (ficha de fabricante). O par usa 1310 nm num sentido e 1490 nm no outro.',
  },
];
