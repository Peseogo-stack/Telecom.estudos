import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEstado } from '../app/EstadoApp';
import { useTitulo } from '../componentes/Comuns';
import { QuestaoCard } from '../componentes/QuestaoCard';
import { carregarQuestoes, licaoDaQuestao } from '../conteudo/carregar';
import type { Questao } from '../conteudo/tipos';
import { vencidas } from '../dominio/revisao';

export function Revisao() {
  useTitulo('Revisão');
  const { estado, despachar, hoje } = useEstado();
  // A lista da sessão é fixada ao abrir a tela (não muda enquanto você responde).
  const [ids] = useState(() => vencidas(estado.revisao, hoje));
  const [questoes, setQuestoes] = useState<Questao[] | null>(null);
  const [i, setI] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);

  useEffect(() => {
    carregarQuestoes(ids).then(setQuestoes).catch(() => setQuestoes([]));
  }, [ids]);

  if (!questoes) return <p aria-live="polite">Carregando…</p>;

  if (questoes.length === 0) {
    return (
      <>
        <h1>Revisão</h1>
        <p className="aviso aviso-ok">Nada para revisar hoje.</p>
        <Link to="/" className="botao">
          Voltar para Hoje
        </Link>
      </>
    );
  }

  if (fim) {
    return (
      <>
        <h1>Revisão concluída</h1>
        <p className="aviso aviso-ok" role="status">
          <span className="resultado-grande">
            {acertos} de {questoes.length}
          </span>{' '}
          certas. As que acertou voltam mais tarde (3, 7 ou 15 dias); as que errou voltam amanhã.
        </p>
        <Link to="/" className="botao">
          Voltar para Hoje
        </Link>
      </>
    );
  }

  const q = questoes[i];
  return (
    <>
      <h1>Revisão</h1>
      <p className="suave">
        Questão da lição{' '}
        <Link to={`/licao/${licaoDaQuestao(q.id)}`}>{licaoDaQuestao(q.id)}</Link>.
      </p>
      <QuestaoCard
        key={q.id}
        questao={q}
        numero={i + 1}
        total={questoes.length}
        onResponder={(acertou) => {
          if (acertou) setAcertos((a) => a + 1);
          despachar({ tipo: 'respostaRevisao', questao: q.id, acertou, dia: hoje });
        }}
        onProxima={() => (i + 1 < questoes.length ? setI(i + 1) : setFim(true))}
        rotuloProxima={i + 1 < questoes.length ? 'Próxima' : 'Terminar'}
      />
    </>
  );
}
