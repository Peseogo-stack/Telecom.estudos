import { Link } from 'react-router-dom';
import { useEstado } from '../app/EstadoApp';
import { BarraProgresso, useTitulo } from '../componentes/Comuns';
import { IconeChecklist, IconeFerramentas, IconePlano, IconeRevisao } from '../componentes/Icones';
import { indice, licoesDisponiveis, resumoDaLicao } from '../conteudo/carregar';
import { formatarDia, NOMES_DIAS, diaDaSemana } from '../dominio/datas';
import { aprovada, ehDiaSoRevisao, proximaLicao, semanaAtual, sequencia, datasDaSemana } from '../dominio/plano';
import { proximaRevisao, totalVencidas } from '../dominio/revisao';
import { plural } from '../dominio/texto';

export function Hoje() {
  useTitulo('Hoje');
  const { estado, hoje } = useEstado();
  const { progresso, revisao, ajustes } = estado;
  const inicio = ajustes.inicioPlano ?? hoje;
  const semana = semanaAtual(inicio, hoje);
  const dadosSemana = indice.plano.semanas.find((s) => s.semana === semana);
  const feitasSemana = dadosSemana?.licoes.filter((id) => aprovada(progresso.licoes, id)).length ?? 0;
  const { de, ate } = datasDaSemana(inicio, semana);
  const vencidas = totalVencidas(revisao, hoje);
  const proxRevisao = proximaRevisao(revisao, hoje);
  const { licao: proxima, semConteudo } = proximaLicao(indice.plano.semanas, licoesDisponiveis, progresso.licoes);
  const resumo = proxima ? resumoDaLicao(proxima) : null;
  const soRevisao = ehDiaSoRevisao(ajustes, hoje);
  const dias = sequencia(progresso.diasEstudo, hoje);

  return (
    <>
      <p className="rotulo">
        {NOMES_DIAS[diaDaSemana(hoje)]}, {formatarDia(hoje)}
      </p>
      <h1>Hoje</h1>
      <p className="suave">
        {dias > 0 ? `${plural(dias, 'dia seguido', 'dias seguidos')} estudando. ` : ''}
        Semana {semana} de 13 do plano.
      </p>

      <section className={`cartao${vencidas ? ' cartao-destaque' : ''}`} aria-labelledby="t-revisao">
        <p className="rotulo">Revisão de hoje</p>
        <h2 id="t-revisao">{vencidas ? `${plural(vencidas, 'questão', 'questões')} para revisar` : 'Nada para revisar hoje'}</h2>
        {vencidas ? (
          <>
            <p className="suave">Cerca de {Math.max(2, Math.ceil(Math.min(vencidas, 20) * 0.6))} min. São as questões que você errou, de volta no dia certo.</p>
            <Link to="/revisao" className="botao">
              <IconeRevisao /> Revisar agora
            </Link>
          </>
        ) : (
          <p className="suave">
            {proxRevisao ? `Próxima revisão em ${formatarDia(proxRevisao)}.` : 'O que você errar nas questões volta aqui em 1, 3, 7 e 15 dias.'}
          </p>
        )}
      </section>

      <section className={`cartao${!vencidas ? ' cartao-destaque' : ''}`} aria-labelledby="t-proxima">
        <p className="rotulo">Próxima lição</p>
        {soRevisao && (
          <p className="aviso">Hoje está marcado como dia só de revisão (Ajustes). Se sobrar fôlego, a próxima lição está aqui.</p>
        )}
        {resumo ? (
          <>
            <h2 id="t-proxima">
              {resumo.id} · {resumo.titulo}
            </h2>
            <p className="suave">
              Módulo {Number(resumo.modulo.id)} — {resumo.modulo.titulo}
            </p>
            <p>{resumo.objetivo}</p>
            <Link to={`/licao/${resumo.id}`} className="botao">
              Começar (10–15 min)
            </Link>
          </>
        ) : (
          <>
            <h2 id="t-proxima">Você terminou as lições disponíveis</h2>
            <p className="suave">
              {semConteudo
                ? `A próxima do plano (${semConteudo}) entra na próxima fase do app. Enquanto isso, revise e use as ferramentas.`
                : 'Parabéns: o plano está completo.'}
            </p>
          </>
        )}
      </section>

      <section className="cartao" aria-labelledby="t-semana">
        <p className="rotulo">
          Semana {semana} · {formatarDia(de)} a {formatarDia(ate)}
        </p>
        <h2 id="t-semana">{dadosSemana?.foco}</h2>
        <BarraProgresso valor={feitasSemana} total={dadosSemana?.licoes.length ?? 0} rotulo="Lições aprovadas na semana" />
        <p className="suave">
          {feitasSemana} de {dadosSemana?.licoes.length ?? 0} lições aprovadas nesta semana.
        </p>
        <Link to="/plano" className="botao botao-secundario">
          <IconePlano /> Ver o plano de 90 dias
        </Link>
      </section>

      <div className="grade grade-2">
        <Link to="/campo" className="cartao atalho">
          <IconeChecklist />
          <span className="meio">
            <span className="titulo-item">Campo</span>
            <br />
            <span className="suave">Checklists offline</span>
          </span>
        </Link>
        <Link to="/ferramentas/disponibilidade" className="cartao atalho">
          <IconeFerramentas />
          <span className="meio">
            <span className="titulo-item">Disponibilidade e glosa</span>
            <br />
            <span className="suave">Calcular SLA e desconto</span>
          </span>
        </Link>
      </div>
    </>
  );
}
