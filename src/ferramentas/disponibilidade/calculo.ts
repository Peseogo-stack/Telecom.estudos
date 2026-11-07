// Calculadora de disponibilidade e glosa de SLA.
// Fórmulas (ver content/fontes.json):
//  - Disponibilidade: D = (To − Ti) / To × 100 (TR do TRT-7)
//  - Glosa proporcional: Dc = Cm × Ti / To (ANS do IF Sul de Minas; a SUDAM limita a 20%)
//  - Glosa por faixas: abaixo de X% de disponibilidade, Y% do valor (IF Sul de Minas: <90% → 50%, <80% → 100%).
//    No IF Sul de Minas as faixas vêm "também", além do proporcional: opção somarFaixas.
//  - Taxa fixa por minuto: valor × taxa% × Ti, abaixo do SLA (TRT-7, TR 14.1: 0,015% por minuto)
//  - "Só o excesso": Cm × (Ti − permitido) / To — sem fonte pública; só se o contrato disser.

export type Periodo = 'mes30' | 'mesCalendario' | 'ano' | 'anoBissexto';
export type Regra = 'proporcional' | 'taxaPorMinuto' | 'excesso' | 'faixas';

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
  /** Na regra proporcional: soma também a glosa das faixas (como no IF Sul de Minas), limitada ao valor. */
  somarFaixas: boolean;
  /** Na regra de taxa por minuto: % do valor descontado por minuto parado (TRT-7: 0,015). */
  taxaPorMinutoPercent: number;
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
  somarFaixas: false,
  taxaPorMinutoPercent: 0.015,
  tetoPercent: null,
};

export function minutosDoPeriodo(periodo: Periodo, diasNoMes = 30): number {
  if (periodo === 'ano') return 365 * 24 * 60; // 525.600
  if (periodo === 'anoBissexto') return 366 * 24 * 60; // 527.040
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
  if (e.regra === 'taxaPorMinuto' && !(e.taxaPorMinutoPercent >= 0 && e.taxaPorMinutoPercent <= 100)) erros.push('A taxa por minuto deve ficar entre 0% e 100%.');
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
  const decimos = Math.round(min * 10) / 10;
  if (decimos < 60) return `${num(decimos)} min`;
  // Arredonda o total para minutos inteiros ANTES de separar as horas (evita "1 h 60 min").
  const inteiros = Math.round(min);
  const h = Math.floor(inteiros / 60);
  const m = inteiros - h * 60;
  return `${h} h ${String(m).padStart(2, '0')} min`;
}

function glosaPorFaixas(e: Entrada, disponibilidade: number) {
  const aplicaveis = e.faixas.filter((f) => disponibilidade < f.abaixoDe);
  const pior = aplicaveis.reduce((max, f) => Math.max(max, f.glosaPercent), 0);
  return { aplicaveis, pior, valor: (e.valor * pior) / 100 };
}

const NOME_PERIODO: Record<Periodo, string> = {
  mes30: 'mês de 30 dias',
  mesCalendario: 'mês do calendário',
  ano: 'ano de 365 dias',
  anoBissexto: 'ano bissexto, 366 dias',
};

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
  const extras: string[] = [];
  if (e.regra === 'proporcional') {
    if (e.descontoSoSeDescumprir && cumpriu) {
      explicacao = 'Regra proporcional: o SLA foi cumprido, então não há desconto.';
    } else {
      bruto = (e.valor * ti) / to;
      explicacao = `Regra proporcional: ${reais(e.valor)} × ${num(ti)} ÷ ${num(to, 0)} = ${reais(arred(bruto))}`;
    }
    if (e.somarFaixas) {
      const fx = glosaPorFaixas(e, disponibilidade);
      if (fx.aplicaveis.length) {
        const soma = Math.min(e.valor, bruto + fx.valor);
        extras.push(
          `Mais a faixa: disponibilidade ${num(disponibilidade, 3)}% → glosa de ${num(fx.pior)}% do valor = ${reais(arred(fx.valor))}. Soma limitada ao valor do período: ${reais(arred(soma))}.`,
        );
        bruto = soma;
      } else {
        extras.push(`Faixas: disponibilidade ${num(disponibilidade, 3)}% não cai em nenhuma faixa → nada a somar.`);
      }
    }
  } else if (e.regra === 'taxaPorMinuto') {
    if (cumpriu) {
      explicacao = 'Taxa por minuto: o SLA foi cumprido, então não há desconto.';
    } else {
      bruto = Math.min(e.valor, ((e.valor * e.taxaPorMinutoPercent) / 100) * ti);
      explicacao = `Taxa por minuto: ${reais(e.valor)} × ${num(e.taxaPorMinutoPercent, 4)}% × ${num(ti)} min = ${reais(arred(bruto))}`;
    }
  } else if (e.regra === 'excesso') {
    const excesso = Math.max(0, ti - perm);
    bruto = (e.valor * excesso) / to;
    explicacao = `Só o excesso: ${reais(e.valor)} × (${num(ti)} − ${num(perm)}) ÷ ${num(to, 0)} = ${reais(arred(bruto))}`;
  } else {
    const fx = glosaPorFaixas(e, disponibilidade);
    bruto = fx.valor;
    explicacao = fx.aplicaveis.length
      ? `Por faixas: disponibilidade ${num(disponibilidade, 3)}% → glosa de ${num(fx.pior)}% do valor = ${reais(arred(bruto))}`
      : `Por faixas: disponibilidade ${num(disponibilidade, 3)}% não cai em nenhuma faixa → sem glosa.`;
  }

  const teto = e.tetoPercent === null ? Infinity : (e.valor * e.tetoPercent) / 100;
  const tetoAplicado = bruto > teto;
  const desconto = arred(Math.min(bruto, teto));

  const passos = [
    `Período: ${num(to, 0)} min (${e.periodo === 'mesCalendario' ? `mês de ${Math.round(e.diasNoMes)} dias` : NOME_PERIODO[e.periodo]}).`,
    `SLA ${num(e.slaPercent, 3)}% → parada permitida: ${num(perm)} min (${formatarMinutos(perm)}).`,
    `Paradas que contam (Ti): ${num(tiContado)} min${tiExcluido ? `; excluídas pelo contrato: ${num(tiExcluido)} min` : ''}${tiContado > to ? `; limitado ao período: ${num(to, 0)} min` : ''}.`,
    `Disponibilidade: (${num(to, 0)} − ${num(ti)}) ÷ ${num(to, 0)} × 100 = ${num(disponibilidade, 3)}% → ${cumpriu ? 'CUMPRIU' : 'NÃO CUMPRIU'} o SLA.`,
    explicacao,
    ...extras,
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
