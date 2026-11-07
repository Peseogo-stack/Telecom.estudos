// Perguntas para a empresa que já vêm no caderno.
import type { Caderno, Onde, PerguntaCaderno } from './estado';

export interface PerguntaBanco {
  id: string;
  onde: Onde;
  texto: string;
  dica: string;
  licoes: string[];
}

export const ORDEM_ONDE: Onde[] = ['sozinho', 'documentos', 'outras-areas', 'colega'];

/**
 * Coloca no caderno as perguntas do banco que ainda não foram oferecidas.
 * Uma pergunta removida pelo usuário continua em `semeadas` e não volta sozinha;
 * perguntas novas do banco (versões futuras do app) entram automaticamente.
 */
export function semearPerguntas(caderno: Caderno, banco: PerguntaBanco[], agora = new Date()): Caderno {
  const jaOferecidas = new Set(caderno.semeadas);
  const existentes = new Set(caderno.perguntas.map((p) => p.id));
  const novas: PerguntaCaderno[] = banco
    .filter((p) => !jaOferecidas.has(p.id) && !existentes.has(p.id))
    .map((p) => ({
      id: p.id,
      texto: p.texto,
      onde: p.onde,
      dica: p.dica,
      licoes: p.licoes,
      resposta: '',
      resolvida: false,
      criadaEm: agora.toISOString(),
    }));
  const faltantes = banco.filter((p) => !jaOferecidas.has(p.id)).map((p) => p.id);
  if (novas.length === 0 && faltantes.length === 0) return caderno;
  return { ...caderno, perguntas: [...caderno.perguntas, ...novas], semeadas: [...caderno.semeadas, ...faltantes] };
}

/** Perguntas agrupadas por onde achar, na ordem: vejo sozinho, documentos, outras áreas, colega. */
export function agruparPorOnde(perguntas: PerguntaCaderno[]): { onde: Onde; itens: PerguntaCaderno[] }[] {
  return ORDEM_ONDE.map((onde) => ({ onde, itens: perguntas.filter((p) => p.onde === onde) })).filter((g) => g.itens.length > 0);
}
