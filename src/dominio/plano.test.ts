import { describe, expect, it } from 'vitest';
import { datasDaSemana, ehDiaSoRevisao, proximaLicao, semanaAtual, sequencia } from './plano';
import { ESTADO_INICIAL } from './estado';
import { buscar, normalizar } from './busca';

describe('plano', () => {
  it('calcula a semana do plano', () => {
    expect(semanaAtual('2026-11-09', '2026-11-09')).toBe(1);
    expect(semanaAtual('2026-11-09', '2026-11-15')).toBe(1);
    expect(semanaAtual('2026-11-09', '2026-11-16')).toBe(2);
    expect(semanaAtual('2026-11-09', '2026-11-01')).toBe(1);
    expect(semanaAtual('2026-11-09', '2027-06-01')).toBe(13);
    expect(datasDaSemana('2026-11-09', 2)).toEqual({ de: '2026-11-16', ate: '2026-11-22' });
  });

  it('respeita dias só de revisão com data de término', () => {
    const ajustes = { ...ESTADO_INICIAL.ajustes, diasSoRevisao: [3, 4], soRevisaoAte: '2026-11-27' };
    expect(ehDiaSoRevisao(ajustes, '2026-11-11')).toBe(true); // quarta
    expect(ehDiaSoRevisao(ajustes, '2026-11-12')).toBe(true); // quinta
    expect(ehDiaSoRevisao(ajustes, '2026-11-13')).toBe(false); // sexta
    expect(ehDiaSoRevisao(ajustes, '2026-12-02')).toBe(false); // quarta, depois do fim
    expect(ehDiaSoRevisao({ ...ajustes, soRevisaoAte: null }, '2026-12-02')).toBe(true);
  });

  it('próxima lição segue a ordem do plano e pula as aprovadas', () => {
    const semanas = [
      { semana: 1, licoes: ['10-01', '09-01'], foco: '' },
      { semana: 2, licoes: ['02-07'], foco: '' },
    ];
    const disp = new Set(['10-01', '09-01']);
    expect(proximaLicao(semanas, disp, {})).toEqual({ licao: '10-01', semConteudo: null });
    expect(proximaLicao(semanas, disp, { '10-01': { melhor: 5, tentativas: 1, aprovadaEm: '2026-11-09' } }).licao).toBe('09-01');
    const tudo = {
      '10-01': { melhor: 5, tentativas: 1, aprovadaEm: '2026-11-09' },
      '09-01': { melhor: 4, tentativas: 1, aprovadaEm: '2026-11-10' },
    };
    expect(proximaLicao(semanas, disp, tudo)).toEqual({ licao: null, semConteudo: '02-07' });
  });

  it('conta a sequência de dias seguidos', () => {
    expect(sequencia(['2026-11-09', '2026-11-10', '2026-11-11'], '2026-11-11')).toBe(3);
    expect(sequencia(['2026-11-09', '2026-11-10'], '2026-11-11')).toBe(2);
    expect(sequencia(['2026-11-08', '2026-11-10'], '2026-11-11')).toBe(1);
    expect(sequencia([], '2026-11-11')).toBe(0);
  });
});

describe('busca', () => {
  const itens = [
    { tipo: 'licao' as const, id: '09-01', titulo: '09-01 · Quanto é 99,7%?', texto: 'Disponibilidade do SLA em minutos', rota: '/licao/09-01' },
    { tipo: 'termo' as const, id: 'zona-controlada', titulo: 'ZC — Zona controlada', texto: 'Controlled zone. Área entre Rr e Rc', rota: '/glossario' },
  ];
  it('ignora acento e maiúsculas', () => {
    expect(normalizar('Ação ÉÇ')).toBe('acao ec');
    expect(buscar(itens, 'disponibilidade')[0].id).toBe('09-01');
    expect(buscar(itens, 'ZONA controlada')[0].id).toBe('zona-controlada');
  });
  it('acha pelo termo em inglês e exige todas as palavras', () => {
    expect(buscar(itens, 'controlled')[0].id).toBe('zona-controlada');
    expect(buscar(itens, 'zona sla')).toHaveLength(0);
    expect(buscar(itens, 'a')).toHaveLength(0);
  });
});
