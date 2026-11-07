// Estado global do app (progresso, revisão, caderno e ajustes), salvo no aparelho.
// Usa useReducer: cada mudança é uma "ação" com nome, o que facilita entender e testar.
import { createContext, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from 'react';
import { carregar, salvar } from '../dominio/armazenamento';
import { type Dia, hoje } from '../dominio/datas';
import { type Ajustes, type Estado, type Nota, type PerguntaCaderno, NOTA_APROVACAO } from '../dominio/estado';
import { registrarErro, responderRevisao } from '../dominio/revisao';

export type Acao =
  | { tipo: 'substituir'; estado: Estado }
  | { tipo: 'licaoLida'; licao: string; dia: Dia }
  | { tipo: 'quizConcluido'; licao: string; acertos: number; erradas: string[]; dia: Dia }
  | { tipo: 'respostaRevisao'; questao: string; acertou: boolean; dia: Dia }
  | { tipo: 'ajustes'; ajustes: Partial<Ajustes> }
  | { tipo: 'campoCaderno'; campo: string; valor: string }
  | { tipo: 'salvarNota'; nota: Nota }
  | { tipo: 'apagarNota'; id: string }
  | { tipo: 'adicionarPergunta'; pergunta: PerguntaCaderno }
  | { tipo: 'atualizarPergunta'; id: string; mudancas: Partial<Pick<PerguntaCaderno, 'resposta' | 'resolvida'>> }
  | { tipo: 'apagarPergunta'; id: string }
  | { tipo: 'ferramenta'; id: string; valores: unknown };

function marcarEstudo(estado: Estado, dia: Dia): Estado['progresso'] {
  const dias = estado.progresso.diasEstudo.includes(dia) ? estado.progresso.diasEstudo : [...estado.progresso.diasEstudo, dia].sort();
  return { ...estado.progresso, diasEstudo: dias };
}

export function reduzir(estado: Estado, acao: Acao): Estado {
  switch (acao.tipo) {
    case 'substituir':
      return acao.estado;
    case 'licaoLida': {
      const p = estado.progresso.licoes[acao.licao] ?? { melhor: 0, tentativas: 0 };
      if (p.lidaEm) return estado;
      return {
        ...estado,
        progresso: { ...estado.progresso, licoes: { ...estado.progresso.licoes, [acao.licao]: { ...p, lidaEm: acao.dia } } },
      };
    }
    case 'quizConcluido': {
      const p = estado.progresso.licoes[acao.licao] ?? { melhor: 0, tentativas: 0 };
      const aprovou = acao.acertos >= NOTA_APROVACAO;
      let revisao = estado.revisao;
      for (const q of acao.erradas) revisao = registrarErro(revisao, q, acao.dia);
      const progresso = marcarEstudo(estado, acao.dia);
      return {
        ...estado,
        revisao,
        progresso: {
          ...progresso,
          licoes: {
            ...progresso.licoes,
            [acao.licao]: {
              ...p,
              melhor: Math.max(p.melhor, acao.acertos),
              tentativas: p.tentativas + 1,
              ...(aprovou && !p.aprovadaEm ? { aprovadaEm: acao.dia } : {}),
            },
          },
        },
      };
    }
    case 'respostaRevisao':
      return {
        ...estado,
        revisao: responderRevisao(estado.revisao, acao.questao, acao.acertou, acao.dia),
        progresso: marcarEstudo(estado, acao.dia),
      };
    case 'ajustes':
      return { ...estado, ajustes: { ...estado.ajustes, ...acao.ajustes } };
    case 'campoCaderno':
      return { ...estado, caderno: { ...estado.caderno, campos: { ...estado.caderno.campos, [acao.campo]: acao.valor } } };
    case 'salvarNota': {
      const outras = estado.caderno.notas.filter((n) => n.id !== acao.nota.id);
      return { ...estado, caderno: { ...estado.caderno, notas: [acao.nota, ...outras] } };
    }
    case 'apagarNota':
      return { ...estado, caderno: { ...estado.caderno, notas: estado.caderno.notas.filter((n) => n.id !== acao.id) } };
    case 'adicionarPergunta':
      if (estado.caderno.perguntas.some((p) => p.id === acao.pergunta.id)) return estado;
      return { ...estado, caderno: { ...estado.caderno, perguntas: [...estado.caderno.perguntas, acao.pergunta] } };
    case 'atualizarPergunta':
      return {
        ...estado,
        caderno: {
          ...estado.caderno,
          perguntas: estado.caderno.perguntas.map((p) => (p.id === acao.id ? { ...p, ...acao.mudancas } : p)),
        },
      };
    case 'apagarPergunta':
      return { ...estado, caderno: { ...estado.caderno, perguntas: estado.caderno.perguntas.filter((p) => p.id !== acao.id) } };
    case 'ferramenta':
      return { ...estado, ferramentas: { ...estado.ferramentas, [acao.id]: acao.valores } };
  }
}

interface ValorContexto {
  estado: Estado;
  despachar: (acao: Acao) => void;
  armazenamentoDisponivel: boolean;
  dadosCorrompidos: boolean;
  hoje: Dia;
}

const Contexto = createContext<ValorContexto | null>(null);

export function ProvedorEstado({ children }: { children: ReactNode }) {
  const inicial = useRef(carregar());
  const [estado, despachar] = useReducer(reduzir, inicial.current.estado, (e) =>
    // Primeiro uso: a data de início do plano é hoje (pode ser mudada em Ajustes).
    e.ajustes.inicioPlano ? e : { ...e, ajustes: { ...e.ajustes, inicioPlano: hoje() } },
  );
  // Toda mudança de estado é gravada no aparelho.
  useEffect(() => {
    salvar(estado);
  }, [estado]);

  const valor = useMemo<ValorContexto>(
    () => ({
      estado,
      despachar,
      armazenamentoDisponivel: inicial.current.disponivel,
      dadosCorrompidos: inicial.current.corrompido,
      hoje: hoje(),
    }),
    [estado],
  );
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useEstado(): ValorContexto {
  const v = useContext(Contexto);
  if (!v) throw new Error('useEstado precisa estar dentro de <ProvedorEstado>');
  return v;
}
