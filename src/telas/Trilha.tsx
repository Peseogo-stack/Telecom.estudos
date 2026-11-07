import { Link, useParams } from 'react-router-dom';
import { useEstado } from '../app/EstadoApp';
import { BarraProgresso, Migalhas, useTitulo } from '../componentes/Comuns';
import { indice } from '../conteudo/carregar';
import type { Modulo as TModulo } from '../conteudo/tipos';
import type { ProgressoLicao } from '../dominio/estado';
import { NaoEncontrado } from './NaoEncontrado';
import { plural } from '../dominio/texto';

function aprovadas(m: TModulo, progresso: Record<string, ProgressoLicao>) {
  return m.licoes.filter((l) => progresso[l.id]?.aprovadaEm).length;
}

export function Trilha() {
  useTitulo('Trilha');
  const { estado } = useEstado();
  const modulos = indice.curriculo.modulos;
  return (
    <>
      <h1>Trilha</h1>
      <p className="suave">
        12 módulos, 73 lições de 10 a 15 minutos. As lições com conteúdo pronto abrem; as outras chegam nas próximas fases.
      </p>
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
                    {prontas ? `${prontas} de ${m.licoes.length} lições prontas · ${plural(feitas, 'aprovada', 'aprovadas')}` : `${m.licoes.length} lições · em breve`}
                  </span>
                </span>
              </Link>
              <div style={{ marginTop: 10 }}>
                <BarraProgresso valor={feitas} total={m.licoes.length} rotulo={`Progresso do módulo ${Number(m.id)}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function Modulo() {
  const { id } = useParams();
  const { estado } = useEstado();
  const m = indice.curriculo.modulos.find((x) => x.id === id);
  useTitulo(m ? `Módulo ${Number(m.id)}` : 'Módulo');
  if (!m) return <NaoEncontrado />;
  return (
    <>
      <Migalhas itens={[{ para: '/trilha', rotulo: 'Trilha' }, { rotulo: `Módulo ${Number(m.id)}` }]} />
      <h1>
        Módulo {Number(m.id)} · {m.titulo}
      </h1>
      <p className="suave">{m.descricao}</p>
      <ol className="lista-limpa cartao">
        {m.licoes.map((l) => {
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
                ) : !l.disponivel ? (
                  <span className="selo">Em breve</span>
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
        })}
      </ol>
    </>
  );
}
