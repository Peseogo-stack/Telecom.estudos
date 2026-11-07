// Calculadora de disponibilidade e glosa de SLA.
// Fórmulas (ver content/fontes.json):
//  - Disponibilidade: D = (To − Ti) / To × 100 (TR do TRT-7)
//  - Glosa proporcional: Dc = Cm × Ti / To (ANS do IF Sul de Minas; a SUDAM limita a 20%)
//  - Glosa por faixas: abaixo de X% de disponibilidade, Y% do valor (IF Sul de Minas: <90% → 50%, <80% → 100%)
//  - "Só o excesso": Cm × (Ti − permitido) / To — sem fonte pública; só se o contrato disser.

export type Periodo = 'mes30' | 'mesCalendario' | 'ano';
export type Regra = 'proporcional' | 'excesso' | 'faixas';

export interface Parada {
  id: string;
  descricao: string;
  minutos: number;
  /** true = exclusão prevista no contrato (manutenção avisada, falta de energia no local…): não conta. */
  exclusao: boolean;
}

export interface Faixa {
  /** Disponibilidade abaixo deste valor (%)… */
  abaixoDe: number;
  /** …gera glosa deste percentual do valor. */
  glosaPercent: number;
}

export interface Entrada {
  slaPercent: number;
  periodo: Periodo;
  /** Dias do mês quando periodo = 'mesCalendario' (28 a 31). */
  diasNoMes: number;
  paradas: Parada[];
  /** Valor do serviço no período (R$). */
  valor: number;
  regra: Regra;
  faixas: Faixa[];
  /** Na regra proporcional: só há desconto se a disponibilidade ficar abaixo do SLA. */
  descontoSoSeDescumprir: boolean;
  /** Teto do desconto em % do valor (null = sem teto). */
  tetoPercent: number | null;
}

export interface Resultado {
  to: number;
  permitido: number;
  tiContado: number;
  tiExcluido: number;
  disponibilidade: number;
  cumpriu: boolean;
  desconto: number;
  descontoAntesDoTeto: number;
  tetoAplicado: boolean;
  passos: string[];
}

export const FAIXAS_EXEMPLO: Faixa[] = [
  { abaixoDe: 90, glosaPercent: 50 },
  { abaixoDe: 80, glosaPercent: 100 },
];

export const ENTRADA_PADRAO: Entrada = {
  slaPercent: 99.7,
  periodo: 'mes30',
  diasNoMes: 30,
  paradas: [],
  valor: 0,
  regra: 'proporcional',
  faixas: FAIXAS_EXEMPLO,
  descontoSoSeDescumprir: true,
  tetoPercent: null,
};

export function minutosDoPeriodo(periodo: Periodo, diasNoMes = 30): number {
  if (periodo === 'ano') return 365 * 24 * 60; // 525.600
  if (periodo === 'mesCalendario') return Math.min(31, Math.max(28, Math.round(diasNoMes))) * 24 * 60;
  return 30 * 24 * 60; // 43.200
}

export function permitido(slaPercent: number, to: number): number {
  return (to * (100 - slaPercent)) / 100;
}

export function validar(e: Entrada): string[] {
  const erros: string[] = [];
  if (!(e.slaPercent > 0 && e.slaPercent < 100)) erros.push('O SLA deve ficar entre 0% e 100% (ex.: 99,7).');
  if (!(e.valor >= 0)) erros.push('O valor não pode ser negativo.');
  for (const p of e.paradas) if (!(p.minutos >= 0)) erros.push(`Parada "${p.descricao || p.id}" com minutos inválidos.`);
  if (e.tetoPercent !== null && !(e.tetoPercent >= 0 && e.tetoPercent <= 100)) erros.push('O teto deve ficar entre 0% e 100%.');
  for (const f of e.faixas) {
    if (!(f.abaixoDe > 0 && f.abaixoDe <= 100) || !(f.glosaPercent >= 0 && f.glosaPercent <= 100)) {
      erros.push('Faixas devem ter porcentagens entre 0 e 100.');
      break;
    }
  }
  return erros;
}

const arred = (x: number, casas = 2) => Math.round(x * 10 ** casas) / 10 ** casas;
const num = (x: number, casas = 1) => x.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: casas });
const reais = (x: number) => x.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatarMinutos(min: number): string {
  const total = Math.round(min * 10) / 10;
  const h = Math.floor(total / 60);
  const m = total - h * 60;
  if (h === 0) return `${num(m)} min`;
  return `${h} h ${num(m, 0).padStart(2, '0')} min`;
}

export function calcular(e: Entrada): Resultado {
  const to = minutosDoPeriodo(e.periodo, e.diasNoMes);
  const perm = permitido(e.slaPercent, to);
  const tiContado = e.paradas.filter((p) => !p.exclusao).reduce((s, p) => s + p.minutos, 0);
  const tiExcluido = e.paradas.filter((p) => p.exclusao).reduce((s, p) => s + p.minutos, 0);
  const ti = Math.min(tiContado, to);
  const disponibilidade = ((to - ti) / to) * 100;
  // Compara com tolerância de arredondamento: 99,7% exatos cumpre um SLA de 99,7%.
  const cumpriu = disponibilidade + 1e-9 >= e.slaPercent;

  let bruto = 0;
  let explicacao = '';
  if (e.regra === 'proporcional') {
    if (e.descontoSoSeDescumprir && cumpriu) {
      explicacao = 'Regra proporcional: o SLA foi cumprido, então não há desconto.';
    } else {
      bruto = (e.valor * ti) / to;
      explicacao = `Regra proporcional: ${reais(e.valor)} × ${num(ti)} ÷ ${num(to, 0)} = ${reais(arred(bruto))}`;
    }
  } else if (e.regra === 'excesso') {
    const excesso = Math.max(0, ti - perm);
    bruto = (e.valor * excesso) / to;
    explicacao = `Só o excesso: ${reais(e.valor)} × (${num(ti)} − ${num(perm)}) ÷ ${num(to, 0)} = ${reais(arred(bruto))}`;
  } else {
    const aplicaveis = e.faixas.filter((f) => disponibilidade < f.abaixoDe);
    const pior = aplicaveis.reduce((max, f) => Math.max(max, f.glosaPercent), 0);
    bruto = (e.valor * pior) / 100;
    explicacao = aplicaveis.length
      ? `Por faixas: disponibilidade ${num(disponibilidade, 3)}% → glosa de ${num(pior)}% do valor = ${reais(arred(bruto))}`
      : `Por faixas: disponibilidade ${num(disponibilidade, 3)}% não cai em nenhuma faixa → sem glosa.`;
  }

  const teto = e.tetoPercent === null ? Infinity : (e.valor * e.tetoPercent) / 100;
  const tetoAplicado = bruto > teto;
  const desconto = arred(Math.min(bruto, teto));

  const passos = [
    `Período: ${num(to, 0)} min (${e.periodo === 'ano' ? 'ano de 365 dias' : e.periodo === 'mes30' ? 'mês de 30 dias' : `mês de ${Math.round(e.diasNoMes)} dias`}).`,
    `SLA ${num(e.slaPercent, 3)}% → parada permitida: ${num(perm)} min (${formatarMinutos(perm)}).`,
    `Paradas que contam (Ti): ${num(tiContado)} min${tiExcluido ? `; excluídas pelo contrato: ${num(tiExcluido)} min` : ''}.`,
    `Disponibilidade: (${num(to, 0)} − ${num(ti)}) ÷ ${num(to, 0)} × 100 = ${num(disponibilidade, 3)}% → ${cumpriu ? 'CUMPRIU' : 'NÃO CUMPRIU'} o SLA.`,
    explicacao,
    ...(tetoAplicado ? [`Teto de ${num(e.tetoPercent ?? 0)}% aplicado: desconto limitado a ${reais(arred(teto))}.`] : []),
    `Desconto final: ${reais(desconto)}.`,
  ];

  return {
    to,
    permitido: perm,
    tiContado,
    tiExcluido,
    disponibilidade,
    cumpriu,
    desconto,
    descontoAntesDoTeto: arred(bruto),
    tetoAplicado,
    passos,
  };
}
