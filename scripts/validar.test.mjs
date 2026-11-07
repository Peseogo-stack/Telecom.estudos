import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validar } from './validar-conteudo.mjs';
import { FERRAMENTAS, RAIZ, markdownParaHtml } from './lib/conteudo.mjs';

describe('validador de conteúdo', () => {
  it('o conteúdo do repositório passa sem erros', () => {
    const { erros } = validar();
    expect(erros).toEqual([]);
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
