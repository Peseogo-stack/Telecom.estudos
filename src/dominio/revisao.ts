// Revisão espaçada: cada questão errada volta em 1, 3, 7 e 15 dias.
// - Errou na lição ou na revisão -> volta para a etapa 0 (revisar amanhã).
// - Acertou na revisão -> sobe uma etapa; acertou na última (15 dias) -> "dominada" e sai da fila.
import { type Dia, somarDias } from './datas';

export const INTERVALOS = [1, 3, 7, 15] as const;
export const MAXIMO_POR_SESSAO = 20;

export interface ItemRevisao {
  /** Índice em INTERVALOS: 0 = volta em 1 dia, 3 = volta em 15 dias. */
  etapa: number;
  /** Dia em que a questão volta. */
  vence: Dia;
  /** Quantas vezes já errou esta questão. */
  erros: number;
}

export interface EstadoRevisao {
  itens: Record<string, ItemRevisao>;
  dominadas: string[];
}

export const REVISAO_VAZIA: EstadoRevisao = { itens: {}, dominadas: [] };

/** Registra um erro (na lição ou na revisão): a questão volta amanhã. */
export function registrarErro(estado: EstadoRevisao, questaoId: string, dia: Dia): EstadoRevisao {
  const anterior = estado.itens[questaoId];
  return {
    itens: {
      ...estado.itens,
      [questaoId]: { etapa: 0, vence: somarDias(dia, INTERVALOS[0]), erros: (anterior?.erros ?? 0) + 1 },
    },
    dominadas: estado.dominadas.filter((id) => id !== questaoId),
  };
}

/** Registra a resposta dada numa sessão de revisão. */
export function responderRevisao(estado: EstadoRevisao, questaoId: string, acertou: boolean, dia: Dia): EstadoRevisao {
  const item = estado.itens[questaoId];
  if (!item) return estado;
  if (!acertou) return registrarErro(estado, questaoId, dia);
  const proxima = item.etapa + 1;
  if (proxima >= INTERVALOS.length) {
    const { [questaoId]: _removida, ...resto } = estado.itens;
    return { itens: resto, dominadas: [...estado.dominadas.filter((id) => id !== questaoId), questaoId] };
  }
  return {
    itens: { ...estado.itens, [questaoId]: { ...item, etapa: proxima, vence: somarDias(dia, INTERVALOS[proxima]) } },
    dominadas: estado.dominadas,
  };
}

/** Questões que vencem até `dia`, as mais atrasadas primeiro, no máximo `limite`. */
export function vencidas(estado: EstadoRevisao, dia: Dia, limite = MAXIMO_POR_SESSAO): string[] {
  return Object.entries(estado.itens)
    .filter(([, item]) => item.vence <= dia)
    .sort(([idA, a], [idB, b]) => (a.vence === b.vence ? idA.localeCompare(idB) : a.vence.localeCompare(b.vence)))
    .slice(0, limite)
    .map(([id]) => id);
}

export function totalVencidas(estado: EstadoRevisao, dia: Dia): number {
  return Object.values(estado.itens).filter((item) => item.vence <= dia).length;
}

/** Próximo dia com revisão marcada depois de `dia` (para mostrar "próxima revisão em …"). */
export function proximaRevisao(estado: EstadoRevisao, dia: Dia): Dia | null {
  const futuras = Object.values(estado.itens)
    .map((i) => i.vence)
    .filter((v) => v > dia)
    .sort();
  return futuras[0] ?? null;
}
