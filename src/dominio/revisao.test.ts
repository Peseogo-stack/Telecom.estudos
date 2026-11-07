import { describe, expect, it } from 'vitest';
import { REVISAO_VAZIA, registrarErro, responderRevisao, vencidas, totalVencidas, proximaRevisao } from './revisao';

const DIA = '2026-11-09';

describe('revisão espaçada (1, 3, 7 e 15 dias)', () => {
  it('erro na lição: a questão volta no dia seguinte', () => {
    const e = registrarErro(REVISAO_VAZIA, 'q1', DIA);
    expect(e.itens.q1).toEqual({ etapa: 0, vence: '2026-11-10', erros: 1 });
    expect(vencidas(e, DIA)).toEqual([]);
    expect(vencidas(e, '2026-11-10')).toEqual(['q1']);
  });

  it('acertos seguidos levam aos intervalos 3, 7 e 15 e depois a questão é dominada', () => {
    let e = registrarErro(REVISAO_VAZIA, 'q1', DIA); // vence 10/11
    e = responderRevisao(e, 'q1', true, '2026-11-10');
    expect(e.itens.q1).toMatchObject({ etapa: 1, vence: '2026-11-13' }); // +3
    e = responderRevisao(e, 'q1', true, '2026-11-13');
    expect(e.itens.q1).toMatchObject({ etapa: 2, vence: '2026-11-20' }); // +7
    e = responderRevisao(e, 'q1', true, '2026-11-20');
    expect(e.itens.q1).toMatchObject({ etapa: 3, vence: '2026-12-05' }); // +15
    e = responderRevisao(e, 'q1', true, '2026-12-05');
    expect(e.itens.q1).toBeUndefined();
    expect(e.dominadas).toEqual(['q1']);
  });

  it('erro na revisão volta para 1 dia e conta mais um erro', () => {
    let e = registrarErro(REVISAO_VAZIA, 'q1', DIA);
    e = responderRevisao(e, 'q1', true, '2026-11-10');
    e = responderRevisao(e, 'q1', false, '2026-11-13');
    expect(e.itens.q1).toEqual({ etapa: 0, vence: '2026-11-14', erros: 2 });
  });

  it('revisões atrasadas acumulam e as mais antigas vêm primeiro', () => {
    let e = registrarErro(REVISAO_VAZIA, 'b', '2026-11-01');
    e = registrarErro(e, 'a', '2026-11-05');
    e = registrarErro(e, 'c', '2026-11-03');
    expect(vencidas(e, '2026-11-20')).toEqual(['b', 'c', 'a']);
    expect(totalVencidas(e, '2026-11-20')).toBe(3);
  });

  it('limita a sessão a 20 questões', () => {
    let e = REVISAO_VAZIA;
    for (let i = 0; i < 30; i++) e = registrarErro(e, `q${String(i).padStart(2, '0')}`, DIA);
    expect(vencidas(e, '2026-11-10')).toHaveLength(20);
    expect(totalVencidas(e, '2026-11-10')).toBe(30);
  });

  it('errar de novo uma questão dominada a coloca de volta na fila', () => {
    let e = registrarErro(REVISAO_VAZIA, 'q1', DIA);
    for (const d of ['2026-11-10', '2026-11-13', '2026-11-20', '2026-12-05']) e = responderRevisao(e, 'q1', true, d);
    expect(e.dominadas).toContain('q1');
    e = registrarErro(e, 'q1', '2026-12-10');
    expect(e.dominadas).not.toContain('q1');
    expect(e.itens.q1.vence).toBe('2026-12-11');
  });

  it('atravessa a virada de mês e de ano', () => {
    const e = registrarErro(REVISAO_VAZIA, 'q1', '2026-12-31');
    expect(e.itens.q1.vence).toBe('2027-01-01');
  });

  it('responder questão que não está na fila não muda nada', () => {
    expect(responderRevisao(REVISAO_VAZIA, 'x', true, DIA)).toBe(REVISAO_VAZIA);
  });

  it('informa a próxima data com revisão', () => {
    let e = registrarErro(REVISAO_VAZIA, 'q1', DIA);
    e = registrarErro(e, 'q2', '2026-11-12');
    expect(proximaRevisao(e, DIA)).toBe('2026-11-10');
    expect(proximaRevisao(e, '2026-11-10')).toBe('2026-11-13');
  });
});
