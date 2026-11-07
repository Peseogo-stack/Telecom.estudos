import { describe, expect, it } from 'vitest';
import {
  PRESETS,
  atenuacaoMaximaG652D,
  calcularOrcamento,
  dbmParaMw,
  mwParaDbm,
  perdaIdealBalanceado,
  perdaIdealPerna,
  validarOrcamento,
  type EntradaOrcamento,
} from './potencia';

describe('dBm e mW (FOA: dBm = 10·log10(P/1 mW))', () => {
  it.each([
    [0, 1],
    [3, 1.995],
    [-3, 0.501],
    [10, 10],
    [-10, 0.1],
    [-20, 0.01],
    [-30, 0.001],
  ])('%s dBm ≈ %s mW', (dbm, mw) => {
    expect(dbmParaMw(dbm)).toBeCloseTo(mw, 3);
  });
  it('ida e volta', () => {
    expect(mwParaDbm(dbmParaMw(-27))).toBeCloseTo(-27, 9);
    expect(mwParaDbm(0.025)).toBeCloseTo(-16.02, 2); // 25 µW ≈ −16 dBm (exemplo da FOA)
    expect(mwParaDbm(0)).toBeNaN();
  });
});

describe('splitters', () => {
  it('perda ideal 10·log10(N)', () => {
    expect(perdaIdealBalanceado(2)).toBeCloseTo(3.01, 2);
    expect(perdaIdealBalanceado(16)).toBeCloseTo(12.04, 2);
    expect(perdaIdealBalanceado(32)).toBeCloseTo(15.05, 2);
  });
  it('perna desbalanceada ideal', () => {
    expect(perdaIdealPerna(0.1)).toBeCloseTo(10, 6);
    expect(perdaIdealPerna(0.9)).toBeCloseTo(0.46, 2);
  });
});

describe('atenuação máxima G.652.D (ITU-T G.652, 08/2024, Tabela 2)', () => {
  it.each([
    [1270, 0.47],
    [1310, 0.4],
    [1490, 0.4],
    [1550, 0.3],
    [1577, 0.4],
    [1625, 0.4],
  ])('%s nm → %s dB/km', (l, v) => {
    expect(atenuacaoMaximaG652D(l)).toBe(v);
  });
  it('fora da faixa', () => {
    expect(atenuacaoMaximaG652D(850)).toBeNaN();
  });
});

const base = (p: Partial<EntradaOrcamento> = {}): EntradaOrcamento => ({
  txMin: 1.5,
  txMax: 5,
  sensibilidade: -27,
  sobrecarga: -8,
  lambdaNm: 1490,
  km: 10,
  atenuacaoDbKm: 0.4,
  conectores: 4,
  perdaConector: 0.5,
  fusoes: 6,
  perdaFusao: 0.1,
  splitters: [
    { id: 'a', tipo: 'balanceado', n: 8, perda: 10.7 },
    { id: 'b', tipo: 'balanceado', n: 8, perda: 10.7 },
  ],
  margem: 3,
  ...p,
});

describe('orçamento de potência', () => {
  it('GPON B+ com dois 1:8 e 10 km: soma, potência na ONU e folga', () => {
    const r = calcularOrcamento(base());
    // 10×0,4 + 4×0,5 + 6×0,1 + 10,7 + 10,7 = 4 + 2 + 0,6 + 21,4 = 28,0 dB
    expect(r.perdaTotal).toBeCloseTo(28.0, 6);
    expect(r.orcamentoDisponivel).toBeCloseTo(28.5, 6);
    expect(r.recebidaMin).toBeCloseTo(-26.5, 6);
    expect(r.folga).toBeCloseTo(-2.5, 6); // 28,5 − 28,0 − 3
    expect(r.passa).toBe(false);
    expect(r.maiorItem?.rotulo).toContain('1:8');
  });

  it('com um 1:8 e um 1:4 passa com folga', () => {
    const r = calcularOrcamento(base({ splitters: [{ id: 'a', tipo: 'balanceado', n: 8, perda: 10.7 }, { id: 'b', tipo: 'balanceado', n: 4, perda: 7.4 }] }));
    expect(r.perdaTotal).toBeCloseTo(24.7, 6);
    expect(r.folga).toBeCloseTo(0.8, 6);
    expect(r.passa).toBe(true);
    expect(r.avisos.join(' ')).toContain('menos de 1 dB');
  });

  it('margem exatamente zerada passa', () => {
    const r = calcularOrcamento(base({ splitters: [], km: 0, conectores: 0, fusoes: 0, margem: 28.5 }));
    expect(r.folga).toBeCloseTo(0, 9);
    expect(r.passaSensibilidade).toBe(true);
  });

  it('enlace curto com transceptor forte satura o receptor', () => {
    const r = calcularOrcamento(
      base({ txMin: -2, txMax: 5, sensibilidade: -25, sobrecarga: -3, lambdaNm: 1550, km: 2, atenuacaoDbKm: 0.3, conectores: 2, fusoes: 0, splitters: [] }),
    );
    // recebida máx = 5 − (0,6 + 1,0) = 3,4 dBm > −3 dBm
    expect(r.recebidaMax).toBeCloseTo(3.4, 6);
    expect(r.passaSobrecarga).toBe(false);
    expect(r.passa).toBe(false);
    expect(r.avisos[0]).toContain('saturação');
  });

  it('1000BASE-LX em 10 km passa', () => {
    const lx = PRESETS.find((p) => p.id === 'lx')!;
    const r = calcularOrcamento(
      base({ ...lx, km: 10, atenuacaoDbKm: 0.4, conectores: 2, perdaConector: 0.75, fusoes: 2, perdaFusao: 0.3, splitters: [], margem: 3 }),
    );
    // perda = 4 + 1,5 + 0,6 = 6,1; orçamento 9,5; folga = 9,5 − 6,1 − 3 = 0,4
    expect(r.perdaTotal).toBeCloseTo(6.1, 6);
    expect(r.folga).toBeCloseTo(0.4, 6);
    expect(r.passa).toBe(true);
  });

  it('valida entradas', () => {
    expect(validarOrcamento(base())).toEqual([]);
    expect(validarOrcamento(base({ txMax: 0, txMin: 2 }))).not.toEqual([]);
    expect(validarOrcamento(base({ km: -1 }))).not.toEqual([]);
    expect(validarOrcamento(base({ sobrecarga: -30 }))).not.toEqual([]);
  });
});
