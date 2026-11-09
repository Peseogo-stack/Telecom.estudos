// Tipos do estado do app (tudo o que fica salvo no aparelho).
import type { Dia } from './datas';
import { type EstadoRevisao, REVISAO_VAZIA } from './revisao';

export type Onde = 'sozinho' | 'documentos' | 'outras-areas' | 'colega';

export interface ProgressoLicao {
  /** Melhor nota no quiz (acertos de 5). */
  melhor: number;
  tentativas: number;
  aprovadaEm?: Dia;
  lidaEm?: Dia;
}

export interface Nota {
  id: string;
  titulo: string;
  texto: string;
  atualizadoEm: string; // ISO
}

export interface PerguntaCaderno {
  id: string;
  texto: string;
  onde: Onde;
  /** Onde olhar, documento provável ou para quem perguntar. */
  dica?: string;
  licoes?: string[];
  resposta: string;
  resolvida: boolean;
  criadaEm: string; // ISO
}

export interface Caderno {
  /** Campos rápidos (máquina de fusão, OTDR, código de cores…), por id. */
  campos: Record<string, string>;
  notas: Nota[];
  perguntas: PerguntaCaderno[];
  /** Ids das perguntas do banco já colocadas no caderno (se você remover, não voltam sozinhas). */
  semeadas: string[];
}

export type Tema = 'sistema' | 'claro' | 'escuro';

export interface Ajustes {
  tema: Tema;
  sol: boolean;
  inicioPlano: Dia | null;
  /** Dias da semana só de revisão (0 = domingo … 6 = sábado). */
  diasSoRevisao: number[];
  /** Até quando vale a regra de dias só de revisão (inclusive). null = sem fim. */
  soRevisaoAte: Dia | null;
}

export type AvaliacaoVideo = 'util' | 'fora';

export interface Estado {
  versao: 1;
  progresso: {
    licoes: Record<string, ProgressoLicao>;
    diasEstudo: Dia[];
  };
  revisao: EstadoRevisao;
  caderno: Caderno;
  ajustes: Ajustes;
  /** Avaliação de cada vídeo recomendado, pela URL. Fica só no aparelho. */
  videos: Record<string, AvaliacaoVideo>;
  /** Últimos valores usados em cada ferramenta (conveniência). */
  ferramentas: Record<string, unknown>;
}

export const ESTADO_INICIAL: Estado = {
  versao: 1,
  progresso: { licoes: {}, diasEstudo: [] },
  revisao: REVISAO_VAZIA,
  caderno: { campos: {}, notas: [], perguntas: [], semeadas: [] },
  ajustes: { tema: 'sistema', sol: false, inicioPlano: null, diasSoRevisao: [], soRevisaoAte: null },
  videos: {},
  ferramentas: {},
};

/** Nota mínima para aprovar numa lição: 4 de 5 (80%). */
export const NOTA_APROVACAO = 4;
export const QUESTOES_POR_QUIZ = 5;

/** Campos rápidos sugeridos no Meu caderno (padrões da empresa). */
export const CAMPOS_CADERNO: { id: string; rotulo: string; dica: string }[] = [
  { id: 'norma-postes', rotulo: 'Norma de compartilhamento de postes', dica: 'Número, versão e onde achar' },
  { id: 'sla-links', rotulo: 'SLA dos links', dica: 'Porcentagem, período, regra de glosa' },
  { id: 'chamados', rotulo: 'Sistema de chamados e escalonamento', dica: 'Onde abrir, quem pode abrir, matriz' },
  { id: 'papeis-contrato', rotulo: 'Gestor e fiscais dos contratos', dica: 'Só a função, se preferir não anotar nomes' },
  { id: 'aceite', rotulo: 'Critérios de aceite de obra', dica: 'Perda por fusão e conector, dB/km, formatos de entrega' },
  { id: 'maquina-fusao', rotulo: 'Máquina de fusão e clivador', dica: 'Marca, modelo, alinhamento' },
  { id: 'otdr', rotulo: 'OTDR', dica: 'Modelo, comprimentos de onda, IOR, bobinas' },
  { id: 'cores', rotulo: 'Código de cores usado', dica: 'Fabricantes dos cabos, tubos coloridos ou piloto/direcional' },
  { id: 'conectores', rotulo: 'Conectores do DIO', dica: 'UPC ou APC, SC ou LC' },
  { id: 'identificacao', rotulo: 'Padrão de identificação', dica: 'Plaquetas, etiquetas, nomes' },
  { id: 'qgis', rotulo: 'QGIS', dica: 'Versão e SRC (EPSG) do projeto' },
  { id: 'seguranca', rotulo: 'Segurança no poste', dica: 'Autorização, APR, permissão de trabalho, EPIs' },
];

export const ROTULO_ONDE: Record<Onde, { titulo: string; icone: string; descricao: string }> = {
  sozinho: { titulo: 'Vejo sozinho', icone: '👁', descricao: 'Está no cabo, no equipamento, na etiqueta ou no software' },
  documentos: { titulo: 'Documentos', icone: '📄', descricao: 'Contrato, anexo técnico, norma no site ou na intranet' },
  'outras-areas': { titulo: 'Outras áreas', icone: '👥', descricao: 'Líder de TI, segurança do trabalho, engenharia, almoxarifado' },
  colega: { titulo: 'Colega de telecom', icone: '🛠', descricao: 'Só quem já trabalha na telecom da empresa sabe' },
};
