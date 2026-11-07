import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEstado } from '../app/EstadoApp';
import { AvisoSeguranca, Html, ListaFontes, Migalhas, SeloConfirmar, embaralhar, useTitulo } from '../componentes/Comuns';
import { QuestaoCard } from '../componentes/QuestaoCard';
import { indice, licoesDisponiveis, resumoDaLicao, useLicao } from '../conteudo/carregar';
import type { Licao as TLicao, Questao } from '../conteudo/tipos';
import { DIAGRAMAS } from '../diagramas';
import { formatarDia } from '../dominio/datas';
import { NOTA_APROVACAO, QUESTOES_POR_QUIZ, ROTULO_ONDE } from '../dominio/estado';
import { NaoEncontrado } from './NaoEncontrado';

function Carregando() {
  return <p aria-live="polite">Carregando…</p>;
}

function ComLicao({ children }: { children: (licao: TLicao, questoes: Questao[]) => ReactNode }) {
  const { id } = useParams();
  const carga = useLicao(id);
  if (carga.estado === 'carregando') return <Carregando />;
  if (carga.estado === 'erro') return <p className="aviso aviso-erro">Não foi possível abrir a lição. Tente recarregar a página.</p>;
  if (!carga.dados) return <NaoEncontrado />;
  return <>{children(carga.dados.licao, carga.dados.questoes)}</>;
}

function PerguntasEmpresa({ licao }: { licao: TLicao }) {
  const { estado, despachar } = useEstado();
  const salvas = new Map(estado.caderno.perguntas.map((p) => [p.id, p]));
  return (
    <ul className="lista-limpa">
      {licao.perguntas.map((p) => {
        const r = ROTULO_ONDE[p.onde];
        const noCaderno = salvas.get(p.id);
        return (
          <li key={p.id} className="pergunta-item">
            <span className="selo" title={r.descricao}>
              <span aria-hidden="true">{r.icone}</span> {r.titulo}
            </span>
            <span>{p.texto}</span>
            {p.dica && <span className="dica">{p.onde === 'outras-areas' ? 'Para quem: ' : 'Onde olhar: '}{p.dica}</span>}
            {noCaderno ? (
              <Link to="/caderno" className="dica">
                {noCaderno.resolvida ? 'Respondida no caderno ✓' : 'Já está no seu caderno'}
              </Link>
            ) : (
              <button
                type="button"
                className="botao botao-secundario"
                onClick={() =>
                  despachar({
                    tipo: 'adicionarPergunta',
                    pergunta: { id: p.id, texto: p.texto, onde: p.onde, dica: p.dica, licoes: p.licoes, resposta: '', resolvida: false, criadaEm: new Date().toISOString() },
                  })
                }
              >
                Levar de volta para o caderno
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Licao() {
  return <ComLicao>{(licao, questoes) => <ConteudoLicao licao={licao} total={questoes.length} />}</ComLicao>;
}

function ConteudoLicao({ licao, total }: { licao: TLicao; total: number }) {
  useTitulo(`${licao.id} ${licao.titulo}`);
  const { estado, despachar, hoje } = useEstado();
  const resumo = resumoDaLicao(licao.id);
  const p = estado.progresso.licoes[licao.id];
  const Diagrama = licao.diagrama ? DIAGRAMAS[licao.diagrama] : null;

  useEffect(() => {
    despachar({ tipo: 'licaoLida', licao: licao.id, dia: hoje });
  }, [licao.id, despachar, hoje]);

  return (
    <article>
      <Migalhas
        itens={[
          { para: '/trilha', rotulo: 'Trilha' },
          { para: `/trilha/${licao.modulo}`, rotulo: `Módulo ${Number(licao.modulo)}` },
          { rotulo: licao.id },
        ]}
      />
      <p className="rotulo">
        {licao.id} · {licao.duracaoMin} min · {licao.prioridade}
        {resumo ? ` · ${resumo.modulo.titulo}` : ''}
      </p>
      <h1>{licao.titulo}</h1>
      <p className="cartao cartao-destaque" style={{ margin: '12px 0' }}>
        <strong>Objetivo:</strong> {licao.objetivo}
        {licao.confirmarNaEmpresa && (
          <>
            {' '}
            <SeloConfirmar />
          </>
        )}
      </p>
      {licao.seguranca && <AvisoSeguranca />}
      {p?.aprovadaEm && (
        <p className="aviso aviso-ok">
          Você já foi aprovado nesta lição ({p.melhor}/5, em {formatarDia(p.aprovadaEm)}).
        </p>
      )}

      <section className="secao-licao" aria-labelledby="s-explicacao">
        <h2 id="s-explicacao">Explicação</h2>
        <Html html={licao.explicacaoAntes} />
        {Diagrama && <Diagrama descricao={licao.diagramaDescricao} />}
        <Html html={licao.explicacaoDepois} />
      </section>
      <section className="secao-licao" aria-labelledby="s-pratica">
        <h2 id="s-pratica">Na prática</h2>
        <Html html={licao.naPratica} />
      </section>
      <section className="secao-licao" aria-labelledby="s-erros">
        <h2 id="s-erros">Erros comuns</h2>
        <Html html={licao.errosComuns} />
      </section>
      <section className="secao-licao" aria-labelledby="s-pergunte">
        <h2 id="s-pergunte">Pergunte na empresa</h2>
        <p className="dica">Classificadas por onde achar a resposta. As respostas ficam só no seu aparelho, no Meu caderno.</p>
        <PerguntasEmpresa licao={licao} />
      </section>
      <section className="secao-licao" aria-labelledby="s-fontes">
        <h2 id="s-fontes">Fontes</h2>
        <ListaFontes fontes={licao.fontes} />
        {licao.revisadoEm && <p className="dica">Conteúdo escrito em {formatarDia(licao.revisadoEm)}.</p>}
      </section>

      <div className="cartao" style={{ marginTop: 24 }}>
        <h2 style={{ marginTop: 0 }}>Hora das questões</h2>
        <p className="suave">
          {QUESTOES_POR_QUIZ} questões sorteadas de {total}. Passa com {NOTA_APROVACAO} de {QUESTOES_POR_QUIZ}. O que errar volta na revisão.
        </p>
        <Link to={`/licao/${licao.id}/questoes`} className="botao botao-largo">
          Fazer as {QUESTOES_POR_QUIZ} questões
        </Link>
      </div>
    </article>
  );
}

export function Quiz() {
  return <ComLicao>{(licao, questoes) => <QuizLicao key={licao.id} licao={licao} banco={questoes} />}</ComLicao>;
}

function proximaDoPlano(atual: string): string | null {
  const ordem = indice.plano.semanas.flatMap((s) => s.licoes);
  const i = ordem.indexOf(atual);
  return ordem.slice(i + 1).find((id) => licoesDisponiveis.has(id)) ?? null;
}

function QuizLicao({ licao, banco }: { licao: TLicao; banco: Questao[] }) {
  useTitulo(`Questões ${licao.id}`);
  const { despachar, hoje } = useEstado();
  const navegar = useNavigate();
  const [rodada, setRodada] = useState(0);
  const questoes = useMemo(() => embaralhar(banco).slice(0, QUESTOES_POR_QUIZ), [banco, rodada]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erradas, setErradas] = useState<string[]>([]);
  const [fim, setFim] = useState(false);

  function responder(q: Questao, acertou: boolean) {
    if (acertou) setAcertos((a) => a + 1);
    else setErradas((e) => [...e, q.id]);
  }

  function avancar() {
    if (indiceAtual + 1 < questoes.length) {
      setIndiceAtual((i) => i + 1);
      return;
    }
    despachar({ tipo: 'quizConcluido', licao: licao.id, acertos, erradas, dia: hoje });
    setFim(true);
  }

  function refazer() {
    setRodada((r) => r + 1);
    setIndiceAtual(0);
    setAcertos(0);
    setErradas([]);
    setFim(false);
  }

  const migalhas = (
    <Migalhas
      itens={[
        { para: '/trilha', rotulo: 'Trilha' },
        { para: `/licao/${licao.id}`, rotulo: licao.id },
        { rotulo: 'Questões' },
      ]}
    />
  );

  if (fim) {
    const aprovado = acertos >= NOTA_APROVACAO;
    const proxima = proximaDoPlano(licao.id);
    return (
      <>
        {migalhas}
        <h1>{aprovado ? 'Aprovado!' : 'Quase lá'}</h1>
        <div className={`aviso ${aprovado ? 'aviso-ok' : 'aviso-erro'}`} role="status">
          <span className="resultado-grande">
            {acertos} de {questoes.length}
          </span>{' '}
          {aprovado ? '— você passou nesta lição.' : `— precisa de ${NOTA_APROVACAO} para passar.`}
        </div>
        {erradas.length > 0 && (
          <p>
            {erradas.length === 1 ? 'A questão errada volta' : `As ${erradas.length} questões erradas voltam`} na sua revisão amanhã, e depois em
            3, 7 e 15 dias.
          </p>
        )}
        <div className="acoes">
          {aprovado && proxima && (
            <button type="button" className="botao" onClick={() => navegar(`/licao/${proxima}`)}>
              Próxima lição ({proxima})
            </button>
          )}
          {!aprovado && (
            <Link to={`/licao/${licao.id}`} className="botao">
              Reler a lição
            </Link>
          )}
          <button type="button" className="botao botao-secundario" onClick={refazer}>
            Refazer com outras questões
          </button>
          <Link to="/" className="botao botao-secundario">
            Voltar para Hoje
          </Link>
        </div>
      </>
    );
  }

  const q = questoes[indiceAtual];
  return (
    <>
      {migalhas}
      <h1>
        Questões · {licao.id} {licao.titulo}
      </h1>
      <QuestaoCard
        key={q.id}
        questao={q}
        numero={indiceAtual + 1}
        total={questoes.length}
        onResponder={(acertou) => responder(q, acertou)}
        onProxima={avancar}
        rotuloProxima={indiceAtual + 1 < questoes.length ? 'Próxima questão' : 'Ver resultado'}
      />
    </>
  );
}
