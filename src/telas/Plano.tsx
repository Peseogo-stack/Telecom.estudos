import { Link } from 'react-router-dom';
import { useEstado } from '../app/EstadoApp';
import { BarraProgresso, useTitulo } from '../componentes/Comuns';
import { indice, resumoDaLicao } from '../conteudo/carregar';
import { formatarDia } from '../dominio/datas';
import { aprovada, datasDaSemana, semanaAtual } from '../dominio/plano';

export function Plano() {
  useTitulo('Plano de 90 dias');
  const { estado, hoje } = useEstado();
  const inicio = estado.ajustes.inicioPlano ?? hoje;
  const atual = semanaAtual(inicio, hoje);
  const total = indice.plano.semanas.reduce((s, x) => s + x.licoes.length, 0);
  const feitas = indice.plano.semanas.reduce((s, x) => s + x.licoes.filter((id) => aprovada(estado.progresso.licoes, id)).length, 0);
  const comece = indice.plano.comecePorAqui;
  const resumoComece = comece ? resumoDaLicao(comece.licao) : null;

  return (
    <>
      <h1>Plano de 90 dias</h1>
      <p className="suave">
        Começou em {formatarDia(inicio)} (mude em <Link to="/ajustes">Ajustes</Link>). Um módulo por semana, na ordem das etapas da Trilha (5 a 7 pílulas); as semanas 11 a 13 têm folga para a revisão.
      </p>
      <BarraProgresso valor={feitas} total={total} rotulo="Lições aprovadas no plano" />
      <p className="dica">
        {feitas} de {total} lições aprovadas.
      </p>

      <section className="cartao" aria-labelledby="t-marcos">
        <h2 id="t-marcos">Marcos</h2>
        <ul>
          {indice.plano.marcos.map((m) => (
            <li key={m.dia}>
              <strong>Dia {m.dia}:</strong> {m.texto}
            </li>
          ))}
        </ul>
      </section>

      {comece && resumoComece && (
        <section className="cartao" aria-labelledby="t-comece">
          <p className="rotulo">Comece por aqui · opcional</p>
          <h2 id="t-comece">
            {comece.licao} · {resumoComece.titulo}
          </h2>
          <p className="suave">{comece.texto}</p>
          {resumoComece.disponivel ? (
            <Link to={`/licao/${comece.licao}`} className="botao botao-secundario">
              {aprovada(estado.progresso.licoes, comece.licao) ? 'Rever a lição' : 'Abrir a lição'}
            </Link>
          ) : (
            <span className="selo">Em breve</span>
          )}
        </section>
      )}

      <ol className="lista-limpa">
        {indice.plano.semanas.map((s) => {
          const { de, ate } = datasDaSemana(inicio, s.semana);
          const ok = s.licoes.filter((id) => aprovada(estado.progresso.licoes, id)).length;
          return (
            <li key={s.semana} className={`cartao${s.semana === atual ? ' cartao-destaque' : ''}`} aria-current={s.semana === atual ? 'step' : undefined}>
              <p className="rotulo">
                Semana {s.semana} · {formatarDia(de)} a {formatarDia(ate)} {s.semana === atual ? '· atual' : ''}
              </p>
              <h2 style={{ marginTop: 0 }}>{s.foco}</h2>
              <p className="dica">
                {ok} de {s.licoes.length} aprovadas
              </p>
              <ul className="lista-limpa">
                {s.licoes.map((id) => {
                  const r = resumoDaLicao(id);
                  const feita = aprovada(estado.progresso.licoes, id);
                  const texto = (
                    <>
                      <span aria-hidden="true">{feita ? '✓' : '○'}</span>
                      <span className="meio">
                        {id} · {r?.titulo}
                      </span>
                      {!r?.disponivel && <span className="selo">Em breve</span>}
                    </>
                  );
                  return (
                    <li key={id}>
                      {r?.disponivel ? (
                        <Link to={`/licao/${id}`} className="item-lista">
                          {texto}
                          <span className="so-leitor">{feita ? '(aprovada)' : '(pendente)'}</span>
                        </Link>
                      ) : (
                        <div className="item-lista item-desabilitado">{texto}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </>
  );
}
