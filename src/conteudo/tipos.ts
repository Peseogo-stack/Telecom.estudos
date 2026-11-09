// Formato do conteúdo gerado por scripts/compilar-conteudo.mjs.
import type { ItemBusca } from '../dominio/busca';
import type { Onde } from '../dominio/estado';
import type { SemanaPlano } from '../dominio/plano';

export interface Fonte {
  id: string;
  titulo: string;
  organizacao: string;
  tipo: string;
  url: string;
  acessadoEm: string;
  observacao?: string;
}

export interface Termo {
  id: string;
  sigla?: string;
  pt: string;
  en?: string;
  definicao: string;
  fontes: string[];
  licoes?: string[];
}

export interface LicaoResumo {
  id: string;
  titulo: string;
  objetivo: string;
  prioridade: 'P1' | 'P2';
  confirmarNaEmpresa: boolean;
  disponivel: boolean;
}

export interface Modulo {
  id: string;
  titulo: string;
  descricao: string;
  licoes: LicaoResumo[];
}

export interface PerguntaEmpresa {
  id: string;
  onde: Onde;
  texto: string;
  dica: string;
  licoes: string[];
}

export interface ItemChecklist {
  id: string;
  texto: string;
  porque: string;
  fontes: string[];
  /** Prática que varia de empresa para empresa: mostra o selo "Confirmar na empresa". */
  confirmar?: boolean;
}

export interface Checklist {
  id: string;
  titulo: string;
  aviso: string;
  descricao?: string;
  itens: ItemChecklist[];
}

export interface Indice {
  geradoEm: string;
  curriculo: { modulos: Modulo[] };
  plano: {
    semanas: SemanaPlano[];
    marcos: { dia: number; texto: string }[];
    /** Lição opcional de abertura: fora das semanas, não conta no progresso nem na próxima lição. */
    comecePorAqui?: { licao: string; texto: string };
  };
  glossario: Termo[];
  fontes: Fonte[];
  checklists: Checklist[];
  perguntasEmpresa: PerguntaEmpresa[];
  busca: ItemBusca[];
}

export interface Licao {
  id: string;
  modulo: string;
  titulo: string;
  prioridade: string;
  duracaoMin: number;
  objetivo: string;
  diagrama: string | null;
  diagramaDescricao: string;
  seguranca: boolean;
  confirmarNaEmpresa: boolean;
  revisadoEm: string | null;
  explicacaoAntes: string;
  explicacaoDepois: string;
  naPratica: string;
  errosComuns: string;
  perguntas: PerguntaEmpresa[];
  fontes: Fonte[];
}

export interface Alternativa {
  texto: string;
  correta: boolean;
  explicacao: string;
}

export interface Questao {
  id: string;
  licao: string;
  enunciado: string;
  alternativas: Alternativa[];
  fontes: string[];
  dificuldade: 1 | 2 | 3;
}

export interface ConteudoModulo {
  licoes: Record<string, Licao>;
  questoes: Record<string, Questao>;
}
