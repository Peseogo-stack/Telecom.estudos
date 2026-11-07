// Plural de verdade em português (nada de "questão(ões)").

/** plural(1, 'questão', 'questões') -> "1 questão"; plural(3, …) -> "3 questões". */
export function plural(n: number, singular: string, pluralForma: string): string {
  return `${n.toLocaleString('pt-BR')} ${n === 1 ? singular : pluralForma}`;
}

/** Só a palavra, sem o número: palavra(2, 'aberta', 'abertas') -> "abertas". */
export function palavra(n: number, singular: string, pluralForma: string): string {
  return n === 1 ? singular : pluralForma;
}
