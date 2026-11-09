import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LIMITE_CORRETA, LIMITE_LICAO, razaoCorreta, validar, viesDaLicao } from './validar-conteudo.mjs';
import { FERRAMENTAS, RAIZ, markdownParaHtml } from './lib/conteudo.mjs';

describe('validador de conteúdo', () => {
  it('o conteúdo do repositório passa sem erros', () => {
    const { erros } = validar();
    expect(erros).toEqual([]);
  });
});

describe('viés de comprimento das alternativas', () => {
  const questao = (correta, ...erradas) => ({
    alternativas: [{ texto: correta, correta: true }, ...erradas.map((texto) => ({ texto, correta: false }))],
  });

  it('compara a correta com a maior errada, sem contar espaços nas pontas', () => {
    expect(razaoCorreta(questao('  0,35 dB  ', '0,2 dB', '1 dB', '0,7 dB'))).toBeCloseTo(7 / 6);
  });

  it('o limite é 15% acima da maior errada', () => {
    expect(LIMITE_CORRETA).toBe(1.15);
    expect(razaoCorreta(questao('x'.repeat(23), 'x'.repeat(20), 'x', 'x'))).toBeLessThanOrEqual(LIMITE_CORRETA);
    expect(razaoCorreta(questao('x'.repeat(24), 'x'.repeat(20), 'x', 'x'))).toBeGreaterThan(LIMITE_CORRETA);
  });

  it('sem alternativa correta não há razão', () => {
    expect(razaoCorreta({ alternativas: [{ texto: 'a', correta: false }] })).toBeNull();
  });

  it('a lição reprova quando mais de 30% das questões passam do limite', () => {
    expect(LIMITE_LICAO).toBe(0.3);
    const longa = questao('x'.repeat(30), 'x'.repeat(20), 'x', 'x');
    const boa = questao('x'.repeat(20), 'x'.repeat(20), 'x', 'x');
    expect(viesDaLicao([longa, longa, boa, boa, boa, boa, boa, boa, boa, boa])).toEqual({ comAviso: 2, total: 10, reprova: false });
    expect(viesDaLicao([longa, longa, longa, boa, boa, boa, boa, boa, boa, boa])).toEqual({ comAviso: 3, total: 10, reprova: false });
    expect(viesDaLicao([longa, longa, longa, longa, boa, boa, boa, boa, boa, boa]).reprova).toBe(true);
  });
});

describe('marcação {{ferramenta:id|texto}}', () => {
  it('vira link para a rota da ferramenta', () => {
    const html = markdownParaHtml('Use o {{ferramenta:cores|Código de cores}}.', [], new Map());
    expect(html).toContain('<a class="link-ferramenta" href="#/ferramentas/cores">Código de cores</a>');
  });

  it('toda ferramenta citável tem rota no app', () => {
    const app = readFileSync(join(RAIZ, 'src/app/App.tsx'), 'utf-8');
    for (const id of FERRAMENTAS) expect(app, `rota /ferramentas/${id}`).toContain(`path="/ferramentas/${id}"`);
  });
});
