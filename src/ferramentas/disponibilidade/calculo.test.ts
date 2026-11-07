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
    expect(formatarMinutos(302.4)).toBe('5 h 02 min');
    expect(formatarMinutos(129.6)).toBe('2 h 10 min');
  });

  it('não mostra "60 min" depois das horas (revisão A26)', () => {
    // SLA de 99,723% num mês de 30 dias → 119,664 min
    expect(formatarMinutos(119.6)).toBe('2 h 00 min');
    expect(formatarMinutos(119.664)).toBe('2 h 00 min');
    expect(formatarMinutos(179.5)).toBe('3 h 00 min');
    expect(formatarMinutos(239.7)).toBe('4 h 00 min');
    expect(formatarMinutos(59.96)).toBe('1 h 00 min');
    expect(formatarMinutos(59.94)).toBe('59,9 min');
  });

  it('ano bissexto tem 527.040 min', () => {
    expect(minutosDoPeriodo('anoBissexto')).toBe(527_040);
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

  it('taxa por minuto (como no TRT-7): R$ 3.000, 300 min, SLA 99,7% → R$ 135,00', () => {
    const r = calcular(com({ valor: 3000, paradas: [parada(300)], regra: 'taxaPorMinuto' }));
    expect(r.desconto).toBe(135);
  });

  it('taxa por minuto: SLA cumprido → sem desconto; nunca passa do valor', () => {
    expect(calcular(com({ valor: 3000, paradas: [parada(100)], regra: 'taxaPorMinuto' })).desconto).toBe(0);
    expect(calcular(com({ valor: 1000, paradas: [parada(20_000)], regra: 'taxaPorMinuto' })).desconto).toBe(1000);
  });

  it('proporcional + faixas (como no IF Sul de Minas): soma, limitada ao valor', () => {
    const to = 43_200;
    const ti85 = (to * 15) / 100; // 85% de disponibilidade
    const r = calcular(com({ valor: 2000, slaPercent: 98, paradas: [parada(ti85)], somarFaixas: true }));
    // proporcional: 2000 × 0,15 = 300; faixa (<90%) = 1000; total 1300
    expect(r.desconto).toBe(1300);
    const r75 = calcular(com({ valor: 2000, slaPercent: 98, paradas: [parada((to * 25) / 100)], somarFaixas: true }));
    expect(r75.desconto).toBe(2000);
  });

  it('Ti acima do período aparece limitado na memória de cálculo', () => {
    const r = calcular(com({ valor: 1000, paradas: [parada(50_000)] }));
    expect(r.passos.join('\n')).toContain('limitado ao período');
    expect(r.disponibilidade).toBe(0);
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
