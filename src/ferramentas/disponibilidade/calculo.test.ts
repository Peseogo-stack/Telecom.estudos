import { describe, expect, it } from 'vitest';
import { ENTRADA_PADRAO, type Entrada, calcular, minutosDoPeriodo, permitido, validar, formatarMinutos } from './calculo';

const com = (parcial: Partial<Entrada>): Entrada => ({ ...ENTRADA_PADRAO, ...parcial });
const parada = (minutos: number, exclusao = false) => ({ id: String(minutos), descricao: '', minutos, exclusao });

describe('parada permitida (tabela da lição 09-01)', () => {
  it.each([
    [99.0, 432],
    [99.3, 302.4],
    [99.5, 216],
    [99.7, 129.6],
    [99.9, 43.2],
  ])('SLA %s%% em mês de 30 dias → %s min', (sla, esperado) => {
    expect(permitido(sla, minutosDoPeriodo('mes30'))).toBeCloseTo(esperado, 6);
  });

  it('ano de 365 dias com 99,9% → 525,6 min (8,76 h)', () => {
    expect(permitido(99.9, minutosDoPeriodo('ano'))).toBeCloseTo(525.6, 6);
  });

  it('mês do calendário com 31 dias → 44.640 min', () => {
    expect(minutosDoPeriodo('mesCalendario', 31)).toBe(44_640);
  });

  it('formata minutos em horas', () => {
    expect(formatarMinutos(216)).toBe('3 h 36 min');
    expect(formatarMinutos(43.2)).toBe('43,2 min');
  });
});

describe('glosa (exemplos da lição 09-02)', () => {
  it('proporcional: R$ 3.000, 300 min → 99,31% e R$ 20,83', () => {
    const r = calcular(com({ valor: 3000, paradas: [parada(300)] }));
    expect(r.disponibilidade).toBeCloseTo(99.3056, 3);
    expect(r.cumpriu).toBe(false);
    expect(r.desconto).toBe(20.83);
  });

  it('só o excesso: mesmo caso → R$ 11,83', () => {
    expect(calcular(com({ valor: 3000, paradas: [parada(300)], regra: 'excesso' })).desconto).toBe(11.83);
  });

  it('proporcional: R$ 4.320, 100 min → R$ 10,00 (quando aplica sempre)', () => {
    const r = calcular(com({ valor: 4320, paradas: [parada(100)], descontoSoSeDescumprir: false }));
    expect(r.desconto).toBe(10);
    expect(r.cumpriu).toBe(true);
  });

  it('proporcional "só se descumprir": SLA cumprido → sem desconto', () => {
    expect(calcular(com({ valor: 4320, paradas: [parada(100)] })).desconto).toBe(0);
  });

  it('exclusões não contam no tempo parado', () => {
    const r = calcular(com({ valor: 3000, paradas: [parada(100), parada(240, true)] }));
    expect(r.tiContado).toBe(100);
    expect(r.tiExcluido).toBe(240);
    expect(r.cumpriu).toBe(true);
  });

  it('exatamente no limite cumpre o SLA', () => {
    const r = calcular(com({ valor: 1000, paradas: [parada(129.6)] }));
    expect(r.cumpriu).toBe(true);
    expect(r.desconto).toBe(0);
  });

  it('faixas: 85% → 50%; 75% → 100%; 95% → nada', () => {
    const to = 43_200;
    const ti = (d: number) => (to * (100 - d)) / 100;
    expect(calcular(com({ valor: 2000, regra: 'faixas', paradas: [parada(ti(85))] })).desconto).toBe(1000);
    expect(calcular(com({ valor: 2000, regra: 'faixas', paradas: [parada(ti(75))] })).desconto).toBe(2000);
    expect(calcular(com({ valor: 2000, regra: 'faixas', paradas: [parada(ti(95))] })).desconto).toBe(0);
  });

  it('teto de 20% (como na SUDAM) limita o desconto', () => {
    const r = calcular(com({ valor: 1000, paradas: [parada(43_200 * 0.5)], tetoPercent: 20 }));
    expect(r.descontoAntesDoTeto).toBe(500);
    expect(r.desconto).toBe(200);
    expect(r.tetoAplicado).toBe(true);
  });

  it('a memória de cálculo traz os passos', () => {
    const r = calcular(com({ valor: 3000, paradas: [parada(300)] }));
    expect(r.passos.join('\n')).toContain('NÃO CUMPRIU');
    expect(r.passos.at(-1)).toContain('20,83');
  });

  it('valida entradas absurdas', () => {
    expect(validar(com({ slaPercent: 120 }))).not.toHaveLength(0);
    expect(validar(com({ valor: -1 }))).not.toHaveLength(0);
    expect(validar(com({}))).toHaveLength(0);
  });
});
