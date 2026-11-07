import { describe, expect, it } from 'vitest';
import { validar } from './validar-conteudo.mjs';

describe('validador de conteúdo', () => {
  it('o conteúdo do repositório passa sem erros', () => {
    const { erros } = validar();
    expect(erros).toEqual([]);
  });
});
