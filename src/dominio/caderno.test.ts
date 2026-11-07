import { describe, expect, it } from 'vitest';
import { agruparPorOnde, semearPerguntas, type PerguntaBanco } from './caderno';
import { ESTADO_INICIAL } from './estado';

const banco: PerguntaBanco[] = [
  { id: 'b01', onde: 'documentos', texto: 'Qual a norma?', dica: 'Intranet', licoes: ['07-01'] },
  { id: 'a01', onde: 'sozinho', texto: 'Que cabo é este?', dica: 'Gravação', licoes: ['03-01'] },
  { id: 'd01', onde: 'colega', texto: 'Como é na prática?', dica: '', licoes: ['09-05'] },
];

describe('caderno pronto para segunda-feira', () => {
  it('primeiro uso: todas as perguntas do banco entram no caderno', () => {
    const c = semearPerguntas(ESTADO_INICIAL.caderno, banco);
    expect(c.perguntas.map((p) => p.id)).toEqual(['b01', 'a01', 'd01']);
    expect(c.semeadas).toEqual(['b01', 'a01', 'd01']);
    expect(c.perguntas[1]).toMatchObject({ dica: 'Gravação', resposta: '', resolvida: false });
  });

  it('agrupa começando pelas que eu vejo sozinho', () => {
    const c = semearPerguntas(ESTADO_INICIAL.caderno, banco);
    expect(agruparPorOnde(c.perguntas).map((g) => g.onde)).toEqual(['sozinho', 'documentos', 'colega']);
  });

  it('pergunta removida não volta; pergunta nova do banco entra', () => {
    let c = semearPerguntas(ESTADO_INICIAL.caderno, banco);
    c = { ...c, perguntas: c.perguntas.filter((p) => p.id !== 'a01') };
    c = semearPerguntas(c, [...banco, { id: 'c01', onde: 'outras-areas', texto: 'Nova?', dica: 'SESMT', licoes: ['10-01'] }]);
    expect(c.perguntas.map((p) => p.id)).toEqual(['b01', 'd01', 'c01']);
  });

  it('não duplica nem reescreve resposta já dada', () => {
    let c = semearPerguntas(ESTADO_INICIAL.caderno, banco);
    c = { ...c, perguntas: c.perguntas.map((p) => (p.id === 'b01' ? { ...p, resposta: 'NT-002' } : p)) };
    const de_novo = semearPerguntas(c, banco);
    expect(de_novo).toBe(c);
  });
});
