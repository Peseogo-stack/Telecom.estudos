import { describe, expect, it } from 'vitest';
import {
  ATENUACAO_TIPICA,
  NIVEIS,
  OPCOES,
  TRACOS_POR_NIVEL,
  alturaDoPico,
  corrigir,
  eventoTerminal,
  gerarCenario,
  letra,
  nivelRetroespalhamento,
  pontosDoTraco,
  type Cenario,
  type TipoEvento,
} from './traco';

const todos: Cenario[] = NIVEIS.flatMap((n) => Array.from({ length: TRACOS_POR_NIVEL }, (_, i) => gerarCenario(n, i + 1)));

describe('cenários do leitor de OTDR', () => {
  it('são pelo menos 30 traços diferentes', () => {
    expect(todos.length).toBeGreaterThanOrEqual(30);
    expect(new Set(todos.map((c) => JSON.stringify(c.eventos))).size).toBe(todos.length);
  });

  it('o mesmo nível e número geram o mesmo traço', () => {
    expect(gerarCenario('medio', 5)).toEqual(gerarCenario('medio', 5));
  });

  it('cada traço tem um fim ou uma quebra, depois de todos os eventos do meio', () => {
    for (const c of todos) {
      const t = eventoTerminal(c);
      const meio = c.eventos.filter((e) => !['fim', 'quebra', 'fantasma'].includes(e.tipo));
      expect(c.eventos.filter((e) => e.tipo === 'fim' || e.tipo === 'quebra')).toHaveLength(1);
      for (const e of meio) expect(e.km).toBeLessThan(t.km);
      expect(t.km).toBeLessThan(c.kmMax);
      // Distâncias em ordem crescente
      for (let i = 1; i < c.eventos.length; i++) expect(c.eventos[i].km).toBeGreaterThan(c.eventos[i - 1].km);
    }
  });

  it('a quebra fica antes do comprimento do projeto; o fim, logo depois (fibra ~1% maior que o cabo)', () => {
    for (const c of todos) {
      const t = eventoTerminal(c);
      if (t.tipo === 'quebra') expect(t.km).toBeLessThan(c.projetoKm * 0.85);
      else expect(t.km).toBeCloseTo(c.projetoKm * 1.01, 1);
    }
  });

  it('valores dentro das faixas típicas (VIAVI)', () => {
    for (const c of todos) {
      for (const e of c.eventos) {
        if (e.tipo === 'conector') {
          expect(e.perda[1310]).toBeGreaterThanOrEqual(0.15);
          expect(e.perda[1310]).toBeLessThanOrEqual(0.5);
          expect(e.refletancia!).toBeGreaterThanOrEqual(-59);
          expect(e.refletancia!).toBeLessThanOrEqual(-50);
        }
        if (e.tipo === 'fusao') {
          expect(e.refletancia).toBeNull();
          expect(Math.abs(e.perda[1550] - e.perda[1310])).toBeLessThanOrEqual(0.02 + 1e-9);
        }
        if (e.tipo === 'curvatura') {
          expect(e.refletancia).toBeNull();
          expect(e.perda[1550] / e.perda[1310]).toBeGreaterThanOrEqual(5);
          expect(e.perda[1550] / e.perda[1310]).toBeLessThanOrEqual(10);
        }
        if (e.tipo === 'ganho') expect(e.perda[1310]).toBeLessThan(0);
        if (e.tipo === 'fim') {
          expect(e.refletancia!).toBeGreaterThanOrEqual(-20);
          expect(e.refletancia!).toBeLessThanOrEqual(-14);
        }
        if (e.tipo === 'quebra' && e.refletancia !== null) {
          expect(e.refletancia).toBeGreaterThanOrEqual(-48);
          expect(e.refletancia).toBeLessThanOrEqual(-30);
        }
      }
    }
  });

  it('cada nível só usa os tipos das suas opções; fácil é só 1310 nm', () => {
    for (const c of todos) {
      for (const e of c.eventos) expect(OPCOES[c.nivel]).toContain(e.tipo);
      expect(c.lambdas).toEqual(c.nivel === 'facil' ? [1310] : [1310, 1550]);
    }
  });

  it('o fantasma, quando aparece, está a 2× a distância do fim, sem perda', () => {
    const comFantasma = todos.filter((c) => c.eventos.some((e) => e.tipo === 'fantasma'));
    expect(comFantasma.length).toBeGreaterThan(0);
    for (const c of comFantasma) {
      const f = c.eventos.find((e) => e.tipo === 'fantasma')!;
      expect(f.km).toBeCloseTo(eventoTerminal(c).km * 2, 1);
      expect(f.perda[1310]).toBe(0);
    }
  });

  it('há pelo menos uma curvatura, um ganho e uma quebra no conjunto', () => {
    const tipos = new Set(todos.flatMap((c) => c.eventos.map((e) => e.tipo)));
    for (const t of ['conector', 'fusao', 'curvatura', 'ganho', 'quebra', 'fim', 'fantasma']) expect(tipos.has(t as never)).toBe(true);
  });
});

describe('desenho do traço', () => {
  const c = gerarCenario('medio', 3);
  it('a rampa cai com a atenuação típica e com as perdas dos eventos', () => {
    const t = eventoTerminal(c);
    const esperado = -ATENUACAO_TIPICA[1310] * t.km - c.eventos.filter((e) => e.km < t.km).reduce((s, e) => s + e.perda[1310], 0);
    expect(nivelRetroespalhamento(c, 1310, t.km)).toBeCloseTo(esperado, 6);
  });
  it('depois do fim, o traço cai para o ruído (pelo menos 10 dB abaixo)', () => {
    const t = eventoTerminal(c);
    const pts = pontosDoTraco(c, 1310);
    const depois = pts.filter((p) => p.km > t.km + c.kmMax / 50);
    expect(depois.length).toBeGreaterThan(0);
    for (const p of depois) expect(p.db).toBeLessThan(nivelRetroespalhamento(c, 1310, t.km) - 10);
  });
  it('conector aberto tem pico mais alto que conector ligado', () => {
    expect(alturaDoPico(-16)).toBeGreaterThan(alturaDoPico(-55));
    expect(alturaDoPico(null)).toBe(0);
  });
});

describe('correção', () => {
  it('confere letra por letra', () => {
    const c = gerarCenario('facil', 1);
    const certas: Record<string, TipoEvento> = Object.fromEntries(c.eventos.map((e, i) => [letra(i), e.tipo]));
    expect(corrigir(c, certas).every((x) => x.certo)).toBe(true);
    const erradas: Record<string, ''> = Object.fromEntries(c.eventos.map((_, i) => [letra(i), '' as const]));
    expect(corrigir(c, erradas).some((x) => x.certo)).toBe(false);
  });
});
