import { useEffect, useMemo, useState } from 'react';
import { useEstado } from '../../app/EstadoApp';
import { LinkLicao, Migalhas, useTitulo } from '../../componentes/Comuns';
import { fontesPorId } from '../../conteudo/carregar';
import { TracoSvg } from './TracoSvg';
import {
  EXPLICACAO,
  FONTES_TIPO,
  NIVEIS,
  NOME_NIVEL,
  NOME_TIPO,
  OPCOES,
  TRACOS_POR_NIVEL,
  corrigir,
  gerarCenario,
  letra,
  type Correcao,
  type Nivel,
  type TipoEvento,
} from './traco';

function Fonte({ id }: { id: string }) {
  const f = fontesPorId.get(id);
  return f ? (
    <a href={f.url} target="_blank" rel="noopener noreferrer">
      {f.organizacao.split(' (')[0]}
    </a>
  ) : (
    <>{id}</>
  );
}

const num = (x: number, casas = 2) => x.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }).replace('-', '−');

interface Salvo {
  nivel: Nivel;
  indice: number;
}

export function TelaLeitorOtdr() {
  useTitulo('Leitor de OTDR');
  const { estado, despachar } = useEstado();
  const salvo = estado.ferramentas.otdr as Partial<Salvo> | undefined;
  const [nivel, setNivel] = useState<Nivel>(salvo?.nivel && NIVEIS.includes(salvo.nivel) ? salvo.nivel : 'facil');
  const [indice, setIndice] = useState<number>(salvo?.indice && salvo.indice >= 1 && salvo.indice <= TRACOS_POR_NIVEL ? salvo.indice : 1);
  const [respostas, setRespostas] = useState<Record<string, TipoEvento | ''>>({});
  const [correcao, setCorrecao] = useState<Correcao[] | null>(null);
  const [placar, setPlacar] = useState({ certos: 0, total: 0 });

  const cenario = useMemo(() => gerarCenario(nivel, indice), [nivel, indice]);

  useEffect(() => {
    const t = setTimeout(() => despachar({ tipo: 'ferramenta', id: 'otdr', valores: { nivel, indice } }), 300);
    return () => clearTimeout(t);
  }, [nivel, indice, despachar]);

  function irPara(n: Nivel, i: number) {
    setNivel(n);
    setIndice(((i - 1 + TRACOS_POR_NIVEL) % TRACOS_POR_NIVEL) + 1);
    setRespostas({});
    setCorrecao(null);
  }

  function conferir() {
    const c = corrigir(cenario, respostas);
    setCorrecao(c);
    setPlacar((p) => ({ certos: p.certos + c.filter((x) => x.certo).length, total: p.total + c.length }));
  }

  const todasRespondidas = cenario.eventos.every((_, i) => respostas[letra(i)]);
  const acertos = correcao?.filter((x) => x.certo).length ?? 0;
  const lambdasTexto = cenario.lambdas.length > 1 ? '1310 nm (linha cheia) e 1550 nm (tracejada)' : '1310 nm';

  return (
    <>
      <Migalhas itens={[{ para: '/ferramentas', rotulo: 'Ferramentas' }, { rotulo: 'Leitor de OTDR' }]} />
      <h1>Leitor de OTDR</h1>
      <p className="suave">
        Treino com traços simulados: diga o que é cada evento marcado. Base nas lições <LinkLicao id="06-02" /> e <LinkLicao id="06-03" />. Os traços são
        desenhos de estudo, com valores típicos de fabricante; o traço real do seu OTDR pode ter outra cara.
      </p>

      <section className="cartao" aria-labelledby="t-escolha">
        <h2 id="t-escolha" className="so-leitor">
          Escolha do traço
        </h2>
        <div className="linha-campos">
          <label className="campo">
            <span>Nível</span>
            <select value={nivel} onChange={(e) => irPara(e.target.value as Nivel, 1)}>
              {NIVEIS.map((n) => (
                <option key={n} value={n}>
                  {NOME_NIVEL[n]}
                </option>
              ))}
            </select>
          </label>
          <div className="campo">
            <span>
              Traço {indice} de {TRACOS_POR_NIVEL}
            </span>
            <div className="acoes" style={{ marginTop: 0 }}>
              <button type="button" className="botao botao-secundario" onClick={() => irPara(nivel, indice - 1)} aria-label="Traço anterior">
                ←
              </button>
              <button type="button" className="botao botao-secundario" onClick={() => irPara(nivel, indice + 1)} aria-label="Traço seguinte">
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="cartao cartao-destaque" aria-labelledby="t-traco">
        <h2 id="t-traco">
          Traço {indice}: enlace de {num(cenario.projetoKm, 1)} km no projeto
        </h2>
        <p className="dica">
          Comprimento de onda: {lambdasTexto}. Eixo de baixo em km; eixo da esquerda em dB, relativo ao início. Para aparecer na tela, os degraus estão
          ampliados 3× e os picos altos saem cortados no topo; os números reais estão na tabela de eventos.
        </p>
        <figure className="diagrama">
          <TracoSvg
            cenario={cenario}
            letras
            rotuloAria={`Traço de OTDR de um enlace de ${num(cenario.projetoKm, 1)} km, em ${lambdasTexto}, com ${cenario.eventos.length} eventos marcados com as letras A a ${letra(cenario.eventos.length - 1)}. A tabela de eventos, logo abaixo, traz os números de cada um.`}
          />
        </figure>

        <details className="detalhes">
          <summary>Tabela de eventos (como o OTDR mostra)</summary>
          <p className="dica">Tente primeiro só pelo desenho. A tabela também serve para quem não enxerga bem o traço.</p>
          <div className="tabela" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Evento</th>
                  <th scope="col">km</th>
                  {cenario.lambdas.map((l) => (
                    <th key={l} scope="col">
                      Perda {l} (dB)
                    </th>
                  ))}
                  <th scope="col">Refletância (dB)</th>
                </tr>
              </thead>
              <tbody>
                {cenario.eventos.map((e, i) => {
                  const terminal = e.tipo === 'fim' || e.tipo === 'quebra';
                  return (
                    <tr key={i}>
                      <th scope="row">{letra(i)}</th>
                      <td>{num(e.km)}</td>
                      {cenario.lambdas.map((l) => (
                        <td key={l}>{terminal ? 'fim do traço' : num(e.perda[l])}</td>
                      ))}
                      <td>{e.refletancia === null ? '—' : num(e.refletancia, 0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </details>

        <fieldset className="respostas-otdr">
          <legend>O que é cada evento?</legend>
          {cenario.eventos.map((e, i) => {
            const l = letra(i);
            return (
              <label key={l} className="campo">
                <span>
                  Evento {l} ({num(e.km)} km)
                </span>
                <select
                  value={respostas[l] ?? ''}
                  disabled={correcao !== null}
                  onChange={(ev) => setRespostas((r) => ({ ...r, [l]: ev.target.value as TipoEvento }))}
                >
                  <option value="">Escolha</option>
                  {OPCOES[nivel].map((t) => (
                    <option key={t} value={t}>
                      {NOME_TIPO[t]}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}
        </fieldset>

        <div aria-live="polite">
          {correcao && (
            <div className={`aviso ${acertos === correcao.length ? 'aviso-ok' : ''}`}>
              <p>
                <strong>
                  {acertos} de {correcao.length}
                </strong>{' '}
                {acertos === correcao.length ? 'certos. Leitura completa!' : 'certos. Veja a explicação de cada evento:'}
              </p>
              <ul className="lista-correcao">
                {correcao.map((c) => (
                  <li key={c.letra}>
                    <strong>
                      {c.certo ? '✓' : '✗'} {c.letra}: {NOME_TIPO[c.esperado]}
                    </strong>
                    {!c.certo && c.resposta && <span className="suave"> (você marcou {NOME_TIPO[c.resposta].toLowerCase()})</span>}
                    <br />
                    {EXPLICACAO[c.esperado]}{' '}
                    <span className="dica">
                      Fonte:{' '}
                      {FONTES_TIPO[c.esperado].map((id, k) => (
                        <span key={id}>
                          {k > 0 && ', '}
                          <Fonte id={id} />
                        </span>
                      ))}
                      .
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="acoes">
          {correcao === null ? (
            <button type="button" className="botao" disabled={!todasRespondidas} onClick={conferir}>
              Conferir
            </button>
          ) : (
            <button type="button" className="botao" onClick={() => irPara(nivel, indice + 1)}>
              Próximo traço
            </button>
          )}
        </div>
        <p className="dica">
          Placar desta visita: {placar.certos} de {placar.total} eventos.
        </p>
      </section>

      <section className="cartao" aria-labelledby="t-como">
        <h2 id="t-como">Como ler, em 4 perguntas</h2>
        <ol className="prosa">
          <li>Tem pico? Pico é reflexão: conector, quebra, fim de fibra (ou fantasma).</li>
          <li>Tem degrau para baixo sem pico? Fusão ou curvatura: compare 1310 e 1550 nm.</li>
          <li>Degrau para cima? Ganho aparente: peça o traço do outro sentido e faça a média.</li>
          <li>Depois do fim, ainda aparece pico? Fantasma: é eco, não tem perda.</li>
        </ol>
        <p className="dica">
          Valores típicos: <Fonte id="viavi-otdr-dicas" />. Forma do traço: <Fonte id="exfo-otdr-an194" /> e <Fonte id="foa-otdr" />.
        </p>
      </section>
    </>
  );
}
