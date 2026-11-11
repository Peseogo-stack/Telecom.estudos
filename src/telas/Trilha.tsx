import { Link, useParams } from 'react-router-dom';
import { useEstado } from '../app/EstadoApp';
import { BarraProgresso, Migalhas, useTitulo } from '../componentes/Comuns';
import { etapaDoModulo, indice, modulosNaOrdem } from '../conteudo/carregar';
import type { LicaoResumo, Modulo as TModulo } from '../conteudo/tipos';
import type { ProgressoLicao } from '../dominio/estado';
import { NaoEncontrado } from './NaoEncontrado';
import { plural } from '../dominio/texto';

function aprovadas(m: TModulo, progresso: Record<string, ProgressoLicao>) {
  return m.licoes.filter((l) => progresso[l.id]?.aprovadaEm).length;
}

export function Trilha() {
  useTitulo('Trilha');
  const { estado } = useEstado();
  const total = indice.curriculo.modulos.reduce((n, m) => n + m.licoes.length, 0);
  const prontasTotal = indice.curriculo.modulos.reduce((n, m) => n + m.licoes.filter((l) => l.disponivel).length, 0);
  return (
    <>
      <h1>Trilha</h1>
      <p className="suave">
        {modulosNaOrdem.length} etapas, {indice.curriculo.modulos.length} módulos e {total} lições de 10 a 15 minutos ({prontasTotal} prontas). Siga as etapas na ordem; o número do módulo não muda.
      </p>
      {modulosNaOrdem.map(({ etapa, modulos }) => (
        <section key={etapa.id} className="etapa" aria-labelledby={`etapa-${etapa.id}`}>
          <h2 id={`etapa-${etapa.id}`} className="etapa-titulo">
            Etapa {etapa.id} · {etapa.titulo}
            {etapa.rotulo && <span className="selo selo-p1">{etapa.rotulo}</span>}
          </h2>
          <p className="suave">{etapa.descricao}</p>
          <ul className="lista-limpa">
            {modulos.map((m) => {
              const feitas = aprovadas(m, estado.progresso.licoes);
              const prontas = m.licoes.filter((l) => l.disponivel).length;
              return (
                <li key={m.id} className="cartao">
                  <Link to={`/trilha/${m.id}`} className="item-lista" style={{ borderBottom: 0, padding: 0 }}>
                    <span className="numero-grande" aria-hidden="true">
                      {Number(m.id)}
                    </span>
                    <span className="meio">
                      <span className="titulo-item">
                        Módulo {Number(m.id)} · {m.titulo}
                      </span>
                      <br />
                      <span className="suave">{m.descricao}</span>
                      <br />
                      <span className="dica">
                        {prontasDoModulo(prontas, m.licoes.length)}
                        {prontas ? ` · ${plural(feitas, 'aprovada', 'aprovadas')}` : ''}
                      </span>
                    </span>
                  </Link>
                  {prontas > 0 && (
                    <div style={{ marginTop: 10 }}>
                      <BarraProgresso valor={feitas} total={prontas} rotulo={`Lições prontas aprovadas no módulo ${Number(m.id)}`} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}

/** "4 de 7 prontas"; sem nenhuma pronta, avisa que o módulo está em construção. */
export function prontasDoModulo(prontas: number, total: number) {
  if (!prontas) return `0 de ${total} prontas · em construção`;
  return `${prontas} de ${total} prontas`;
}

export function Modulo() {
  const { id } = useParams();
  const { estado } = useEstado();
  const m = indice.curriculo.modulos.find((x) => x.id === id);
  useTitulo(m ? `Módulo ${Number(m.id)}` : 'Módulo');
  if (!m) return <NaoEncontrado />;
  const etapa = etapaDoModulo(m.id);
  const prontas = m.licoes.filter((l) => l.disponivel);
  const emConstrucao = m.licoes.filter((l) => !l.disponivel);

  const item = (l: LicaoResumo) => {
    const p = estado.progresso.licoes[l.id];
    const conteudo = (
      <>
        <span className="meio">
          <span className="titulo-item">
            {l.id} · {l.titulo}
          </span>
          <br />
          <span className="suave">{l.objetivo}</span>
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
          <span className={`selo${l.prioridade === 'P1' ? ' selo-p1' : ''}`}>{l.prioridade}</span>
          {p?.aprovadaEm ? (
            <span className="selo selo-ok">Aprovada {p.melhor}/5</span>
          ) : p?.tentativas ? (
            <span className="selo">Melhor {p.melhor}/5</span>
          ) : null}
        </span>
      </>
    );
    return (
      <li key={l.id}>
        {l.disponivel ? (
          <Link to={`/licao/${l.id}`} className="item-lista">
            {conteudo}
          </Link>
        ) : (
          <div className="item-lista item-desabilitado" aria-disabled="true">
            {conteudo}
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      <Migalhas itens={[{ para: '/trilha', rotulo: 'Trilha' }, { rotulo: `Módulo ${Number(m.id)}` }]} />
      {etapa && (
        <p className="rotulo">
          Etapa {etapa.id} · {etapa.titulo}
        </p>
      )}
      <h1>
        Módulo {Number(m.id)} · {m.titulo}
      </h1>
      <p className="suave">{m.descricao}</p>
      <p className="dica">{prontasDoModulo(prontas.length, m.licoes.length)}</p>
      {prontas.length > 0 && <ol className="lista-limpa cartao">{prontas.map(item)}</ol>}
      {emConstrucao.length > 0 && (
        <section className="cartao em-construcao" aria-labelledby="t-em-construcao">
          <h2 id="t-em-construcao">Em construção</h2>
          <p className="suave">
            {emConstrucao.length === 1 ? 'Esta lição ainda não foi escrita. Ela abre quando ficar pronta.' : `Estas ${emConstrucao.length} lições ainda não foram escritas. Elas abrem quando ficarem prontas.`}
          </p>
          <ul className="lista-limpa">{emConstrucao.map(item)}</ul>
        </section>
      )}
    </>
  );
}
