import { describe, expect, it } from 'vitest';
import { CORES, descrever, identificar, localizar, numeroDaFibra, totalTubos, type ConfigCabo } from './cores';

describe('ordem das cores', () => {
  it('padrão brasileiro (ficha Furukawa ET02719)', () => {
    expect(CORES.abnt.map((c) => c.nome)).toEqual([
      'Verde', 'Amarela', 'Branca', 'Azul', 'Vermelha', 'Violeta', 'Marrom', 'Rosa', 'Preta', 'Cinza', 'Laranja', 'Azul-claro',
    ]);
  });
  it('TIA-598 (FOA)', () => {
    expect(CORES.tia598.map((c) => c.nome.split(' ')[0])).toEqual([
      'Azul', 'Laranja', 'Verde', 'Marrom', 'Cinza', 'Branca', 'Vermelha', 'Preta', 'Amarela', 'Violeta', 'Rosa', 'Água',
    ]);
  });
});

describe('posições acima de 12', () => {
  it('Furukawa: 13–24 repetem com traços pretos; o 21 (preto) leva traço branco', () => {
    expect(identificar('abnt', 13)).toMatchObject({ posicao: 1, marcacao: 'traços pretos' });
    expect(identificar('abnt', 21)).toMatchObject({ posicao: 9, marcacao: 'traços brancos' });
    expect(identificar('abnt', 25).indefinido).toBe(true);
  });
  it('TIA-598: faixa preta (13–24, amarela no preto), laranja (25–36), verde (37–48)', () => {
    expect(identificar('tia598', 14).marcacao).toBe('faixa preta');
    expect(identificar('tia598', 20).marcacao).toBe('faixa amarela'); // 20 = posição 8 (preta)
    expect(identificar('tia598', 30).marcacao).toBe('faixa laranja');
    expect(identificar('tia598', 48).marcacao).toBe('faixa verde');
    expect(identificar('tia598', 49).indefinido).toBe(true);
  });
  it('TIA-598: as faixas são dos tubos; fibra 13+ no mesmo tubo vira "confira na ficha" (revisão do módulo 2, A2)', () => {
    expect(identificar('tia598', 14, 'fibra')).toMatchObject({ posicao: 2, indefinido: true });
    expect(identificar('tia598', 14, 'fibra').marcacao).toContain('fita');
    expect(identificar('tia598', 5, 'fibra')).toMatchObject({ marcacao: '', indefinido: false });
  });
  it('TIA-598: tubos 26 e 39 têm faixa da mesma cor do tubo e pedem confirmação', () => {
    expect(identificar('tia598', 26)).toMatchObject({ posicao: 2, indefinido: true });
    expect(identificar('tia598', 39)).toMatchObject({ posicao: 3, indefinido: true });
    expect(identificar('tia598', 27).indefinido).toBe(false);
  });
});

describe('fibra ↔ tubo e cor', () => {
  const cabo48: ConfigCabo = { padrao: 'abnt', modoTubos: 'colorido', fibrasPorTubo: 12, totalFibras: 48 };
  it('fibra 30 de um cabo de 48 (12 por tubo) fica no tubo 3, posição 6', () => {
    const l = localizar(cabo48, 30)!;
    expect(l.tubo).toMatchObject({ numero: 3, nome: 'Branca' });
    expect(l.fibraNoTubo).toBe(6);
    expect(l.corFibra.cor.nome).toBe('Violeta');
    expect(descrever(l)).toBe('Fibra 30: tubo 3 (Branca), fibra 6 do tubo (Violeta).');
  });
  it('ida e volta para 1…288 fibras nos dois padrões e nos dois modos', () => {
    for (const padrao of ['abnt', 'tia598'] as const) {
      for (const modoTubos of ['colorido', 'piloto'] as const) {
        for (const fibrasPorTubo of [6, 12]) {
          const cfg: ConfigCabo = { padrao, modoTubos, fibrasPorTubo, totalFibras: 288 };
          for (let n = 1; n <= 288; n++) {
            const l = localizar(cfg, n)!;
            expect(numeroDaFibra(cfg, l.tubo.numero, l.fibraNoTubo)).toBe(n);
          }
        }
      }
    }
  });
  it('tubo piloto e direcional', () => {
    const cfg: ConfigCabo = { padrao: 'abnt', modoTubos: 'piloto', fibrasPorTubo: 12, totalFibras: 144 };
    expect(localizar(cfg, 1)!.tubo).toMatchObject({ papel: 'piloto', nome: 'Verde' });
    expect(localizar(cfg, 13)!.tubo).toMatchObject({ papel: 'direcional', nome: 'Amarela' });
    expect(localizar(cfg, 25)!.tubo).toMatchObject({ papel: 'normal', numero: 3 });
    expect(totalTubos(cfg)).toBe(12);
  });
  it('fora do cabo devolve null', () => {
    expect(localizar(cabo48, 0)).toBeNull();
    expect(localizar(cabo48, 49)).toBeNull();
    expect(numeroDaFibra(cabo48, 5, 1)).toBeNull();
    expect(numeroDaFibra(cabo48, 1, 13)).toBeNull();
  });
});
