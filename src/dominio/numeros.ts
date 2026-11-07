/**
 * Lê número digitado no jeito brasileiro ("99,7", "3.000", "3.000,50") ou com ponto decimal ("99.7").
 * Vazio vira NaN (a validação de cada tela avisa).
 */
export function lerNumero(texto: string): number {
  let t = texto.trim().replace(/\s/g, '').replace(/^R\$/i, '');
  if (t === '') return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return Number(t);
}

export const mostrarNumero = (n: number) => (Number.isFinite(n) ? String(n).replace('.', ',') : '');
