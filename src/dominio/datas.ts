// Datas no formato "AAAA-MM-DD", sempre no fuso do aparelho.
// Usar texto (e não Date) evita erros de fuso: "hoje" é o dia do calendário de quem usa o app.

export type Dia = string;

export function diaDe(data: Date): Dia {
  const a = data.getFullYear();
  const m = String(data.getMonth() + 1).padStart(2, '0');
  const d = String(data.getDate()).padStart(2, '0');
  return `${a}-${m}-${d}`;
}

export function hoje(): Dia {
  return diaDe(new Date());
}

/** Converte "AAAA-MM-DD" em Date ao meio-dia local (meio-dia evita problemas de horário de verão). */
export function paraData(dia: Dia): Date {
  const [a, m, d] = dia.split('-').map(Number);
  return new Date(a, m - 1, d, 12, 0, 0);
}

export function somarDias(dia: Dia, n: number): Dia {
  const data = paraData(dia);
  data.setDate(data.getDate() + n);
  return diaDe(data);
}

/** Quantos dias de `de` até `ate` (positivo se `ate` for depois). */
export function diferencaEmDias(de: Dia, ate: Dia): number {
  return Math.round((paraData(ate).getTime() - paraData(de).getTime()) / 86_400_000);
}

export function ehDiaValido(texto: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
  return diaDe(paraData(texto)) === texto;
}

/** 0 = domingo … 6 = sábado */
export function diaDaSemana(dia: Dia): number {
  return paraData(dia).getDay();
}

const FORMATO = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
export function formatarDia(dia: Dia): string {
  return FORMATO.format(paraData(dia));
}

export const NOMES_DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
