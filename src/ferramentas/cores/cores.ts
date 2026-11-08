// Código de cores de fibras e tubos.
// - Padrão brasileiro: ficha Furukawa ET02719 v7 ("padrão de cor de tubos ABNT colorido"), igual na Prysmian e na Transcend.
// - TIA-598 (cabos importados): ordem e marcações segundo a FOA ("Fiber Optic Cable and Connector Color Codes").
//   As faixas acima de 12 são dos TUBOS; tubo com mais de 12 fibras separa as fibras em grupos com fita (binder).
// - Tubo piloto e direcional: fichas Prysmian e Transcend (tubo 1 verde = piloto, tubo 2 amarelo = direcional, demais brancos/naturais).

export type Padrao = 'abnt' | 'tia598';
export type ModoTubos = 'colorido' | 'piloto';

export interface Cor {
  nome: string;
  hex: string;
}

export const CORES: Record<Padrao, Cor[]> = {
  abnt: [
    { nome: 'Verde', hex: '#16a34a' },
    { nome: 'Amarela', hex: '#facc15' },
    { nome: 'Branca', hex: '#ffffff' },
    { nome: 'Azul', hex: '#2563eb' },
    { nome: 'Vermelha', hex: '#dc2626' },
    { nome: 'Violeta', hex: '#7c3aed' },
    { nome: 'Marrom', hex: '#7c4a1e' },
    { nome: 'Rosa', hex: '#f472b6' },
    { nome: 'Preta', hex: '#111111' },
    { nome: 'Cinza', hex: '#9ca3af' },
    { nome: 'Laranja', hex: '#f97316' },
    { nome: 'Azul-claro', hex: '#7dd3fc' },
  ],
  tia598: [
    { nome: 'Azul', hex: '#2563eb' },
    { nome: 'Laranja', hex: '#f97316' },
    { nome: 'Verde', hex: '#16a34a' },
    { nome: 'Marrom', hex: '#7c4a1e' },
    { nome: 'Cinza (slate)', hex: '#64748b' },
    { nome: 'Branca', hex: '#ffffff' },
    { nome: 'Vermelha', hex: '#dc2626' },
    { nome: 'Preta', hex: '#111111' },
    { nome: 'Amarela', hex: '#facc15' },
    { nome: 'Violeta', hex: '#7c3aed' },
    { nome: 'Rosa (rose)', hex: '#f472b6' },
    { nome: 'Água (aqua)', hex: '#2dd4bf' },
  ],
};

export const NOME_PADRAO: Record<Padrao, string> = {
  abnt: 'Brasil (ABNT, ficha Furukawa)',
  tia598: 'TIA-598 (cabos importados)',
};

export interface Identificacao {
  /** Posição 1 a 12 dentro do ciclo de cores. */
  posicao: number;
  cor: Cor;
  /** Marcação extra para posições acima de 12 (traço, faixa ou anel). Vazio = sem marcação. */
  marcacao: string;
  /** Quando o padrão não define a marcação para essa posição. */
  indefinido: boolean;
}

/** Identifica a posição n (1, 2, 3…) de um tubo ou de uma fibra dentro do tubo pelo padrão de cores. */
export function identificar(padrao: Padrao, n: number, elemento: 'tubo' | 'fibra' = 'tubo'): Identificacao {
  const posicao = ((n - 1) % 12) + 1;
  const ciclo = Math.floor((n - 1) / 12); // 0 = 1–12, 1 = 13–24, 2 = 25–36, 3 = 37–48
  const cor = CORES[padrao][posicao - 1];
  if (ciclo === 0) return { posicao, cor, marcacao: '', indefinido: false };
  if (padrao === 'abnt') {
    if (ciclo === 1) return { posicao, cor, marcacao: posicao === 9 ? 'traços brancos' : 'traços pretos', indefinido: false };
    return { posicao, cor, marcacao: 'não definida na ficha consultada', indefinido: true };
  }
  // FOA: as faixas valem para os tubos; acima de 12 fibras no mesmo tubo, os grupos são separados por fita.
  if (elemento === 'fibra') return { posicao, cor, marcacao: 'grupo separado por fita (binder): confira na ficha', indefinido: true };
  const faixas = ['', 'faixa preta', 'faixa laranja', 'faixa verde'];
  if (ciclo <= 3) {
    // Tubo 26 (laranja com faixa laranja) e 39 (verde com faixa verde): a faixa some na cor do tubo; a FOA não trata o caso.
    if ((ciclo === 2 && posicao === 2) || (ciclo === 3 && posicao === 3))
      return { posicao, cor, marcacao: `${faixas[ciclo]}, da mesma cor do tubo: confira na ficha`, indefinido: true };
    const marcacao = ciclo === 1 && posicao === 8 ? 'faixa amarela' : faixas[ciclo];
    return { posicao, cor, marcacao, indefinido: false };
  }
  return { posicao, cor, marcacao: 'não definida na fonte consultada', indefinido: true };
}

export interface ConfigCabo {
  padrao: Padrao;
  modoTubos: ModoTubos;
  fibrasPorTubo: number;
  totalFibras: number;
}

export interface CorTubo {
  numero: number;
  nome: string;
  hex: string;
  marcacao: string;
  papel: 'piloto' | 'direcional' | 'normal' | null;
  indefinido: boolean;
}

export function corDoTubo(cfg: ConfigCabo, tubo: number): CorTubo {
  if (cfg.modoTubos === 'piloto') {
    if (tubo === 1) return { numero: 1, nome: 'Verde', hex: '#16a34a', marcacao: '', papel: 'piloto', indefinido: false };
    if (tubo === 2) return { numero: 2, nome: 'Amarela', hex: '#facc15', marcacao: '', papel: 'direcional', indefinido: false };
    const marcacao = tubo >= 13 ? 'anéis' : '';
    return { numero: tubo, nome: 'Branca ou natural', hex: '#f8fafc', marcacao, papel: 'normal', indefinido: false };
  }
  const id = identificar(cfg.padrao, tubo, 'tubo');
  return { numero: tubo, nome: id.cor.nome, hex: id.cor.hex, marcacao: id.marcacao, papel: null, indefinido: id.indefinido };
}

export interface Localizacao {
  fibra: number;
  tubo: CorTubo;
  fibraNoTubo: number;
  corFibra: Identificacao;
}

export function totalTubos(cfg: ConfigCabo): number {
  return Math.ceil(cfg.totalFibras / cfg.fibrasPorTubo);
}

/** Número da fibra no cabo → tubo e cor. */
export function localizar(cfg: ConfigCabo, fibra: number): Localizacao | null {
  if (!Number.isInteger(fibra) || fibra < 1 || fibra > cfg.totalFibras) return null;
  const tubo = Math.ceil(fibra / cfg.fibrasPorTubo);
  const fibraNoTubo = fibra - (tubo - 1) * cfg.fibrasPorTubo;
  return { fibra, tubo: corDoTubo(cfg, tubo), fibraNoTubo, corFibra: identificar(cfg.padrao, fibraNoTubo, 'fibra') };
}

/** Tubo e posição da fibra dentro do tubo → número da fibra no cabo. */
export function numeroDaFibra(cfg: ConfigCabo, tubo: number, fibraNoTubo: number): number | null {
  if (!Number.isInteger(tubo) || !Number.isInteger(fibraNoTubo)) return null;
  if (tubo < 1 || tubo > totalTubos(cfg) || fibraNoTubo < 1 || fibraNoTubo > cfg.fibrasPorTubo) return null;
  const n = (tubo - 1) * cfg.fibrasPorTubo + fibraNoTubo;
  return n <= cfg.totalFibras ? n : null;
}

/** Descrição curta para mostrar e para o leitor de tela. */
export function descrever(l: Localizacao): string {
  const tubo = `${l.tubo.nome}${l.tubo.marcacao ? ` com ${l.tubo.marcacao}` : ''}${l.tubo.papel === 'piloto' ? ' (piloto)' : l.tubo.papel === 'direcional' ? ' (direcional)' : ''}`;
  const fibra = `${l.corFibra.cor.nome}${l.corFibra.marcacao ? ` com ${l.corFibra.marcacao}` : ''}`;
  return `Fibra ${l.fibra}: tubo ${l.tubo.numero} (${tubo}), fibra ${l.fibraNoTubo} do tubo (${fibra}).`;
}
