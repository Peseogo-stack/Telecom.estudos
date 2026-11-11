import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  LIMITE_CORRETA,
  LIMITE_LICAO,
  duracaoValida,
  idDoVideo,
  minutosDaDuracao,
  razaoCorreta,
  validar,
  validarEntradaVideos,
  validarVideos,
  viesDaLicao,
} from './validar-conteudo.mjs';
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

describe('vídeos recomendados', () => {
  const hoje = new Date('2026-11-09T12:00:00Z');
  const video = (extra = {}) => ({
    url: 'https://www.youtube.com/watch?v=aaaaaaaaaaa',
    titulo: 'Título',
    canal: 'Canal',
    duracao: '12:34',
    observar: 'Veja o clivador.',
    conferidoEm: '2026-11-09',
    ...extra,
  });
  const entrada = (videos, termosBusca = ['termo']) => ({ licao: '02-01', videos, termosBusca });
  const confere = (e) => validarEntradaVideos(e, { hoje });

  it('url: aceita watch?v= e youtu.be de 11 caracteres, com ou sem &t=', () => {
    expect(idDoVideo('https://www.youtube.com/watch?v=abcDEF_-123')).toBe('abcDEF_-123');
    expect(idDoVideo('https://www.youtube.com/watch?v=abcDEF_-123&t=90s')).toBe('abcDEF_-123');
    expect(idDoVideo('https://youtu.be/abcDEF_-123')).toBe('abcDEF_-123');
    expect(idDoVideo('https://youtu.be/abcDEF_-123?t=90')).toBe('abcDEF_-123');
    expect(idDoVideo('https://www.youtube.com/watch?v=curto')).toBeNull();
    expect(idDoVideo('https://vimeo.com/123456789')).toBeNull();
    expect(idDoVideo('http://www.youtube.com/watch?v=abcDEF_-123')).toBeNull();
  });

  it('duração: m:ss ou h:mm:ss', () => {
    for (const ok of ['0:45', '12:34', '1:02:03']) expect(duracaoValida(ok)).toBe(true);
    for (const ruim of ['12', '12:5', '1:75', '12m', '1:2:3', '']) expect(duracaoValida(ruim)).toBe(false);
    expect(minutosDaDuracao('1:30:00')).toBe(90);
    expect(minutosDaDuracao('abc')).toBeNull();
  });

  it('entrada boa não tem erro nem aviso', () => {
    expect(confere(entrada([video()]))).toEqual({ erros: [], avisos: [] });
  });

  it('só termos (sem vídeo) é válido; sem vídeo e sem termo é erro', () => {
    expect(confere(entrada([])).erros).toEqual([]);
    expect(confere(entrada([], [])).erros).toHaveLength(1);
  });

  it('falta de url, título, canal, conferidoEm ou observar é erro', () => {
    for (const campo of ['url', 'titulo', 'canal', 'conferidoEm', 'observar']) {
      const r = confere(entrada([video({ [campo]: '' })]));
      expect(r.erros.some((e) => e.includes(`"${campo}"`))).toBe(true);
    }
  });

  it('url fora do YouTube é erro', () => {
    expect(confere(entrada([video({ url: 'https://vimeo.com/1' })])).erros).toHaveLength(1);
  });

  it('conferidoEm: formato ruim e futuro são erros; mais de 12 meses é aviso', () => {
    expect(confere(entrada([video({ conferidoEm: '09/11/2026' })])).erros).toHaveLength(1);
    expect(confere(entrada([video({ conferidoEm: '2026-13-40' })])).erros).toHaveLength(1);
    expect(confere(entrada([video({ conferidoEm: '2026-11-10' })])).erros).toHaveLength(1);
    const velho = confere(entrada([video({ conferidoEm: '2025-10-01' })]));
    expect(velho.erros).toEqual([]);
    expect(velho.avisos).toHaveLength(1);
  });

  it('duração: ausente ou mal formada é erro', () => {
    const sem = confere(entrada([video({ duracao: undefined })]));
    expect(sem.erros).toHaveLength(1);
    expect(sem.avisos).toEqual([]);
    expect(confere(entrada([video({ duracao: '12 min' })])).erros).toHaveLength(1);
  });

  it('mais de 25 min sem trecho é aviso; com trecho, não', () => {
    expect(confere(entrada([video({ duracao: '25:01' })])).avisos).toHaveLength(1);
    expect(confere(entrada([video({ duracao: '25:00' })])).avisos).toEqual([]);
    expect(confere(entrada([video({ duracao: '40:00', trecho: '3:10 a 9:45' })])).avisos).toEqual([]);
  });

  it('mais de 2 vídeos e vídeo repetido (mesmo com &t=) são erros', () => {
    const b = video({ url: 'https://www.youtube.com/watch?v=bbbbbbbbbbb' });
    const c = video({ url: 'https://youtu.be/ccccccccccc' });
    expect(confere(entrada([video(), b, c])).erros).toHaveLength(1);
    const repetido = video({ url: 'https://youtu.be/aaaaaaaaaaa?t=30' });
    expect(confere(entrada([video(), repetido])).erros.some((e) => e.includes('duas vezes'))).toBe(true);
  });

  it('arquivo: lição inexistente e repetida são erros; lição com conteúdo sem entrada é aviso', () => {
    const ids = new Set(['02-01', '02-02']);
    const r = validarVideos([entrada([]), entrada([]), { licao: '99-99', videos: [], termosBusca: ['x'] }], ids, { hoje });
    expect(r.erros).toHaveLength(2);
    expect(r.erros.some((e) => e.includes('repetida'))).toBe(true);
    expect(r.erros.some((e) => e.includes('inexistente'))).toBe(true);
    expect(r.avisos).toEqual(['videos.json: a lição 02-02 tem conteúdo mas não tem entrada']);
  });
});
