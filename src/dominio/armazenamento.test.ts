import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CHAVE, aplicarImportacao, carregar, exportar, lerImportacao, resumirImportacao, salvar } from './armazenamento';
import { ESTADO_INICIAL, type Estado } from './estado';

const comCaderno = (campos: Record<string, string>): Estado => ({
  ...ESTADO_INICIAL,
  caderno: { campos, notas: [], perguntas: [] },
});

describe('armazenamento local', () => {
  beforeEach(() => window.localStorage.clear());

  it('salva e carrega o estado', () => {
    const e = comCaderno({ otdr: 'Modelo X' });
    expect(salvar(e)).toBe(true);
    expect(carregar().estado.caderno.campos.otdr).toBe('Modelo X');
  });

  it('JSON corrompido no aparelho não quebra o app', () => {
    window.localStorage.setItem(CHAVE, '{isto não é json');
    const r = carregar();
    expect(r.estado).toEqual(ESTADO_INICIAL);
    expect(r.corrompido).toBe(true);
  });

  it('se o navegador bloquear a leitura, avisa que não vai salvar', () => {
    const espiao = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('bloqueado');
    });
    expect(carregar().disponivel).toBe(false);
    espiao.mockRestore();
  });

  it('se o localStorage lançar erro, salvar devolve false sem quebrar', () => {
    const espiao = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('cota cheia');
    });
    expect(salvar(ESTADO_INICIAL)).toBe(false);
    espiao.mockRestore();
  });

  it('dados antigos ou incompletos são normalizados', () => {
    window.localStorage.setItem(
      CHAVE,
      JSON.stringify({ progresso: { licoes: { '09-01': { melhor: 9, tentativas: 'x' } } }, revisao: { itens: { q: { vence: 'ontem' } } } }),
    );
    const { estado } = carregar();
    expect(estado.progresso.licoes['09-01']).toEqual({ melhor: 5, tentativas: 0 });
    expect(estado.revisao.itens).toEqual({});
    expect(estado.ajustes.tema).toBe('sistema');
  });
});

describe('exportar e importar', () => {
  it('ida e volta do caderno', () => {
    const arquivo = exportar(comCaderno({ cores: 'ABNT' }), 'caderno');
    const leitura = lerImportacao(arquivo);
    expect(leitura.ok).toBe(true);
    if (!leitura.ok) return;
    const resultado = aplicarImportacao(comCaderno({ otdr: 'Y' }), leitura);
    expect(resultado.caderno.campos).toEqual({ otdr: 'Y', cores: 'ABNT' });
  });

  it('arquivo inválido é recusado e nada muda', () => {
    expect(lerImportacao('lixo').ok).toBe(false);
    expect(lerImportacao(JSON.stringify({ app: 'outro' })).ok).toBe(false);
    expect(lerImportacao(JSON.stringify({ app: 'fibra-em-campo', versao: 2, dados: {} })).ok).toBe(false);
  });

  it('campo vazio no arquivo não apaga o que existe', () => {
    const leitura = lerImportacao(exportar(comCaderno({ otdr: '' }), 'caderno'));
    if (!leitura.ok) throw new Error('falhou');
    expect(aplicarImportacao(comCaderno({ otdr: 'Modelo X' }), leitura).caderno.campos.otdr).toBe('Modelo X');
  });

  it('o resumo diz o que vai mudar antes de aplicar', () => {
    const leitura = lerImportacao(exportar(comCaderno({ cores: 'TIA' }), 'caderno'));
    if (!leitura.ok) throw new Error('falhou');
    const linhas = resumirImportacao(ESTADO_INICIAL, leitura);
    expect(linhas[0]).toContain('1 campo(s) alterado(s)');
    expect(linhas.at(-1)).toContain('Nada do que você já tem é apagado');
  });

  it('importar "tudo" mantém a melhor nota e soma a fila de revisão', () => {
    const atual: Estado = {
      ...ESTADO_INICIAL,
      progresso: { licoes: { '09-01': { melhor: 3, tentativas: 1 } }, diasEstudo: ['2026-11-09'] },
      revisao: { itens: { a: { etapa: 0, vence: '2026-11-10', erros: 1 } }, dominadas: [] },
    };
    const outro: Estado = {
      ...ESTADO_INICIAL,
      progresso: { licoes: { '09-01': { melhor: 5, tentativas: 2, aprovadaEm: '2026-11-11' } }, diasEstudo: ['2026-11-11'] },
      revisao: { itens: { b: { etapa: 1, vence: '2026-11-14', erros: 1 } }, dominadas: [] },
    };
    const leitura = lerImportacao(exportar(outro, 'tudo'));
    if (!leitura.ok) throw new Error('falhou');
    const r = aplicarImportacao(atual, leitura);
    expect(r.progresso.licoes['09-01']).toEqual({ melhor: 5, tentativas: 2, aprovadaEm: '2026-11-11' });
    expect(Object.keys(r.revisao.itens).sort()).toEqual(['a', 'b']);
    expect(r.progresso.diasEstudo).toEqual(['2026-11-09', '2026-11-11']);
  });
});
