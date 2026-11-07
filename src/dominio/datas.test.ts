import { describe, expect, it } from 'vitest';
import { diaDe, diferencaEmDias, formatarDia, somarDias, diaDaSemana } from './datas';
import { REVISAO_VAZIA, registrarErro } from './revisao';
import { sequencia } from './plano';

// O vite.config.ts roda os testes com TZ=America/Boa_Vista (UTC−4, sem horário de verão).
describe('datas no fuso do aparelho (Boa Vista)', () => {
  it('o ambiente de teste está mesmo em UTC−4', () => {
    expect(new Date('2026-11-10T01:00:00Z').getTimezoneOffset()).toBe(240);
  });

  it('21h de segunda (09/11) em Boa Vista ainda é dia 09, mesmo sendo 01h de 10/11 em UTC', () => {
    const noite = new Date('2026-11-10T01:00:00Z');
    expect(noite.toISOString().slice(0, 10)).toBe('2026-11-10'); // o jeito errado
    expect(diaDe(noite)).toBe('2026-11-09'); // o jeito certo
    expect(diaDaSemana(diaDe(noite))).toBe(1); // segunda
  });

  it('23h59 ainda é o mesmo dia; 00h00 já é o seguinte', () => {
    expect(diaDe(new Date('2026-11-10T03:59:00Z'))).toBe('2026-11-09');
    expect(diaDe(new Date('2026-11-10T04:00:00Z'))).toBe('2026-11-10');
  });

  it('erro respondido às 21h volta na revisão do dia seguinte local, não dois dias depois', () => {
    const dia = diaDe(new Date('2026-11-10T01:00:00Z'));
    const e = registrarErro(REVISAO_VAZIA, 'q1', dia);
    expect(e.itens.q1.vence).toBe('2026-11-10');
  });

  it('estudar às 21h de dois dias seguidos conta 2 dias de sequência', () => {
    const d1 = diaDe(new Date('2026-11-09T01:00:00Z')); // 08/11, 21h local
    const d2 = diaDe(new Date('2026-11-10T01:00:00Z')); // 09/11, 21h local
    expect(sequencia([d1, d2], d2)).toBe(2);
  });

  it('somar dias e formatar em pt-BR', () => {
    expect(somarDias('2026-11-30', 1)).toBe('2026-12-01');
    expect(diferencaEmDias('2026-11-09', '2026-11-23')).toBe(14);
    expect(formatarDia('2026-11-09')).toBe('09/11/2026');
  });
});
