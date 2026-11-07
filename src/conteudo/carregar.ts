// O índice (currículo, glossário, busca) vem junto com o app.
// Lições e questões ficam em um arquivo por módulo, carregado só quando precisa
// (o Vite gera um pedaço separado para cada um; o service worker guarda todos para o modo offline).
import { useEffect, useState } from 'react';
import indiceJson from '../gerado/indice.json';
import type { ConteudoModulo, Indice, Licao, Questao } from './tipos';

export const indice = indiceJson as unknown as Indice;

const arquivosModulos = import.meta.glob<{ default: ConteudoModulo }>('../gerado/modulos/*.json');
const cache = new Map<string, Promise<ConteudoModulo>>();

export function carregarModulo(idModulo: string): Promise<ConteudoModulo> {
  const caminho = `../gerado/modulos/${idModulo}.json`;
  const importar = arquivosModulos[caminho];
  if (!importar) return Promise.resolve({ licoes: {}, questoes: {} });
  if (!cache.has(idModulo)) cache.set(idModulo, importar().then((m) => m.default));
  return cache.get(idModulo)!;
}

export const moduloDaLicao = (idLicao: string) => idLicao.slice(0, 2);
export const licaoDaQuestao = (idQuestao: string) => idQuestao.slice(0, 5);

export type Carga<T> = { estado: 'carregando' } | { estado: 'pronto'; dados: T } | { estado: 'erro' };

export function useLicao(idLicao: string | undefined): Carga<{ licao: Licao; questoes: Questao[] } | null> {
  const [carga, setCarga] = useState<Carga<{ licao: Licao; questoes: Questao[] } | null>>({ estado: 'carregando' });
  useEffect(() => {
    if (!idLicao) return;
    let ativo = true;
    setCarga({ estado: 'carregando' });
    carregarModulo(moduloDaLicao(idLicao))
      .then((m) => {
        if (!ativo) return;
        const licao = m.licoes[idLicao];
        const questoes = Object.values(m.questoes).filter((q) => q.licao === idLicao);
        setCarga({ estado: 'pronto', dados: licao ? { licao, questoes } : null });
      })
      .catch(() => ativo && setCarga({ estado: 'erro' }));
    return () => {
      ativo = false;
    };
  }, [idLicao]);
  return carga;
}

/** Carrega as questões pedidas (de vários módulos, se preciso), na ordem dada. */
export async function carregarQuestoes(ids: string[]): Promise<Questao[]> {
  const modulos = [...new Set(ids.map((id) => moduloDaLicao(licaoDaQuestao(id))))];
  const conteudos = await Promise.all(modulos.map(carregarModulo));
  const todas = new Map<string, Questao>();
  for (const c of conteudos) for (const q of Object.values(c.questoes)) todas.set(q.id, q);
  return ids.map((id) => todas.get(id)).filter((q): q is Questao => Boolean(q));
}

export const licoesDisponiveis = new Set(
  indice.curriculo.modulos.flatMap((m) => m.licoes.filter((l) => l.disponivel).map((l) => l.id)),
);

export function resumoDaLicao(id: string) {
  for (const m of indice.curriculo.modulos) {
    const l = m.licoes.find((x) => x.id === id);
    if (l) return { ...l, modulo: m };
  }
  return null;
}

export const fontesPorId = new Map(indice.fontes.map((f) => [f.id, f]));
