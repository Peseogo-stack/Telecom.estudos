import { describe, expect, it } from 'vitest';
import { lerNumero, mostrarNumero } from './numeros';

describe('lerNumero', () => {
  it.each([
    ['99,7', 99.7],
    ['99.7', 99.7],
    ['3.000', 3000],
    ['3.000,50', 3000.5],
    ['1.234.567', 1234567],
    ['R$ 4.320', 4320],
    ['  216 ', 216],
    ['0,5', 0.5],
    ['-27', -27],
    ['−19,5', -19.5],
    ['+1,5', 1.5],
  ])('"%s" → %s', (texto, esperado) => {
    expect(lerNumero(texto)).toBe(esperado);
  });
  it('vazio ou texto vira NaN', () => {
    expect(lerNumero('')).toBeNaN();
    expect(lerNumero('abc')).toBeNaN();
  });
  it('mostra com vírgula', () => {
    expect(mostrarNumero(99.7)).toBe('99,7');
    expect(mostrarNumero(NaN)).toBe('');
  });
});
