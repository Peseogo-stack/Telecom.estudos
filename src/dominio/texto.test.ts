import { describe, expect, it } from 'vitest';
import { palavra, plural } from './texto';

describe('plural', () => {
  it('usa singular só para 1', () => {
    expect(plural(1, 'questão', 'questões')).toBe('1 questão');
    expect(plural(0, 'questão', 'questões')).toBe('0 questões');
    expect(plural(2, 'resultado', 'resultados')).toBe('2 resultados');
    expect(plural(1200, 'termo', 'termos')).toBe('1.200 termos');
    expect(palavra(3, 'aberta', 'abertas')).toBe('abertas');
  });
});
