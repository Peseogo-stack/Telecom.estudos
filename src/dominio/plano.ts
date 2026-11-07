// Regras do plano de 90 dias e da tela Hoje.
import { type Dia, diaDaSemana, diferencaEmDias, somarDias } from './datas';
import type { Ajustes, ProgressoLicao } from './estado';

export interface SemanaPlano {
  semana: number;
  licoes: string[];
  foco: string;
}

export const TOTAL_SEMANAS = 13;

/** Semana do plano (1 a 13) a partir da data de início. Antes do início, semana 1. */
export function semanaAtual(inicio: Dia, dia: Dia): number {
  const dias = diferencaEmDias(inicio, dia);
  if (dias < 0) return 1;
  return Math.min(TOTAL_SEMANAS, Math.floor(dias / 7) + 1);
}

/** Dia de início e de fim de uma semana do plano. */
export function datasDaSemana(inicio: Dia, semana: number): { de: Dia; ate: Dia } {
  const de = somarDias(inicio, (semana - 1) * 7);
  return { de, ate: somarDias(de, 6) };
}

/** Hoje é dia só de revisão? (ex.: noites com curso, configurado em Ajustes) */
export function ehDiaSoRevisao(ajustes: Ajustes, dia: Dia): boolean {
  if (!ajustes.diasSoRevisao.includes(diaDaSemana(dia))) return false;
  return ajustes.soRevisaoAte === null || dia <= ajustes.soRevisaoAte;
}

export function aprovada(progresso: Record<string, ProgressoLicao>, id: string): boolean {
  return Boolean(progresso[id]?.aprovadaEm);
}

/**
 * Próxima lição a estudar, na ordem do plano.
 * - `licao`: a primeira ainda não aprovada que já tem conteúdo.
 * - `semConteudo`: a primeira não aprovada do plano que ainda não foi escrita (se vier antes).
 */
export function proximaLicao(
  semanas: SemanaPlano[],
  disponiveis: Set<string>,
  progresso: Record<string, ProgressoLicao>,
): { licao: string | null; semConteudo: string | null } {
  let semConteudo: string | null = null;
  for (const s of semanas) {
    for (const id of s.licoes) {
      if (aprovada(progresso, id)) continue;
      if (disponiveis.has(id)) return { licao: id, semConteudo };
      semConteudo ??= id;
    }
  }
  return { licao: null, semConteudo };
}

/** Dias seguidos de estudo até hoje (se hoje ainda não estudou, conta até ontem). */
export function sequencia(diasEstudo: Dia[], dia: Dia): number {
  const conjunto = new Set(diasEstudo);
  let cursor = conjunto.has(dia) ? dia : somarDias(dia, -1);
  let n = 0;
  while (conjunto.has(cursor)) {
    n++;
    cursor = somarDias(cursor, -1);
  }
  return n;
}
