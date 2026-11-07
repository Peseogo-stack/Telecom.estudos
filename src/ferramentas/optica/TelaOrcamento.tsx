import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEstado } from '../../app/EstadoApp';
import { CampoNumero } from '../../componentes/CampoNumero';
import { Migalhas, SeloConfirmar, useTitulo } from '../../componentes/Comuns';
import { fontesPorId } from '../../conteudo/carregar';
import {
  PRESETS,
  SPLITTERS_BALANCEADOS,
  SPLITTERS_DESBALANCEADOS,
  atenuacaoMaximaG652D,
  calcularOrcamento,
  validarOrcamento,
  type EntradaOrcamento,
  type ItemSplitter,
  type ResultadoOrcamento,
} from './potencia';

const n = (x: number, casas = 2) => (Number.isFinite(x) ? x.toLocaleString('pt-BR', { maximumFractionDigits: casas }) : '—');
const LAMBDAS = [1270, 1310, 1490, 1550, 1577, 1625];

function novoId() {
  return Math.random().toString(36).slice(2, 9);
}

const gpon = PRESETS[0];
export const ENTRADA_PADRAO: EntradaOrcamento = {
  txMin: gpon.txMin,
  txMax: gpon.txMax,
  sensibilidade: gpon.sensibilidade,
  sobrecarga: gpon.sobrecarga,
  penalidade: gpon.penalidade,
  perdaMinimaClasse: gpon.perdaMinimaClasse,
  lambdaNm: gpon.lambdaNm,
  km: 5,
  atenuacaoDbKm: atenuacaoMaximaG652D(gpon.lambdaNm),
  conectores: 4,
  perdaConector: 0.75,
  fusoes: 6,
  perdaFusao: 0.3,
  splitters: [
    { id: 's1', tipo: 'balanceado', n: 4, perda: 7.4 },
    { id: 's2', tipo: 'balanceado', n: 8, perda: 10.7 },
  ],
  margem: 3,
};

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

/** "Escada" de potência: quanto sobra depois de cada perda, comparado com a sensibilidade. */
function Escada({ e, r }: { e: EntradaOrcamento; r: ResultadoOrcamento }) {
  const passos = [{ rotulo: 'Saída do transmissor', valor: e.txMin }];
  let atual = e.txMin;
  for (const item of r.itens) {
    if (item.perda <= 0) continue;
    atual -= item.perda;
    passos.push({ rotulo: item.rotulo, valor: atual });
  }
  const piso = e.sensibilidade + e.penalidade + e.margem;
  const topo = Math.max(e.txMin, 0) + 2;
  const fundo = Math.min(e.sensibilidade, atual) - 4;
  const altura = 200;
  const y = (v: number) => 10 + ((topo - v) / (topo - fundo)) * altura;
  const largura = 360;
  const passo = (largura - 40) / passos.length;
  return (
    <figure className="diagrama">
      <svg viewBox={`0 0 ${largura} 250`} role="img" aria-label={`Potência ao longo do enlace: sai com ${n(e.txMin)} dBm e chega com ${n(r.recebidaMin)} dBm; a sensibilidade do receptor é ${n(e.sensibilidade)} dBm.`}>
        <line x1="30" x2={largura - 4} y1={y(e.sensibilidade)} y2={y(e.sensibilidade)} className="d-cabo-bt" strokeDasharray="6 4" />
        <text x={largura - 6} y={y(e.sensibilidade) - 6} textAnchor="end" className="d-texto d-alerta">
          sensibilidade {n(e.sensibilidade)} dBm
        </text>
        <line x1="30" x2={largura - 4} y1={y(piso)} y2={y(piso)} className="d-cota" />
        <text x={largura - 6} y={y(piso) - 4} textAnchor="end" className="d-texto d-suave">
          {e.penalidade > 0 ? `+ penalidade e margem (${n(e.penalidade + e.margem)} dB)` : `+ margem ${n(e.margem)} dB`}
        </text>
        {passos.map((p, i) => {
          const x = 34 + i * passo;
          return (
            <g key={i}>
              <rect x={x} y={y(p.valor)} width={Math.max(6, passo - 6)} height={Math.max(1, y(fundo) - y(p.valor))} className={p.valor >= piso - 1e-9 ? 'd-barra-ok' : 'd-barra-parada'} />
              <text x={x + (passo - 6) / 2} y={y(p.valor) - 4} textAnchor="middle" className="d-texto" style={{ fontSize: 10 }}>
                {n(p.valor, 1)}
              </text>
            </g>
          );
        })}
        <text x="2" y="245" className="d-texto d-suave" style={{ fontSize: 10 }}>
          dBm em cada ponto (Tx mínima)
        </text>
      </svg>
      <figcaption>A cada perda a potência desce um degrau. No fim, precisa ficar acima da sensibilidade mais a penalidade e a margem.</figcaption>
    </figure>
  );
}

export function TelaOrcamento() {
  useTitulo('Orçamento de potência');
  const { estado, despachar } = useEstado();
  const salvo = estado.ferramentas.orcamento as Partial<EntradaOrcamento> | undefined;
  const [e, setE] = useState<EntradaOrcamento>({ ...ENTRADA_PADRAO, ...salvo });
  const [preset, setPreset] = useState<string>('');
  const [novoSplit, setNovoSplit] = useState<string>('b8');

  useEffect(() => {
    const t = setTimeout(() => despachar({ tipo: 'ferramenta', id: 'orcamento', valores: e }), 400);
    return () => clearTimeout(t);
  }, [e, despachar]);

  const mudar = (p: Partial<EntradaOrcamento>) => setE((x) => ({ ...x, ...p }));
  const erros = validarOrcamento(e);
  const r = useMemo(() => (erros.length ? null : calcularOrcamento(e)), [e, erros.length]);
  const maxNorma = atenuacaoMaximaG652D(e.lambdaNm);

  function aplicarPreset(id: string) {
    setPreset(id);
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    mudar({
      txMin: p.txMin,
      txMax: p.txMax,
      sensibilidade: p.sensibilidade,
      sobrecarga: p.sobrecarga,
      penalidade: p.penalidade,
      perdaMinimaClasse: p.perdaMinimaClasse,
      lambdaNm: p.lambdaNm,
      atenuacaoDbKm: atenuacaoMaximaG652D(p.lambdaNm),
    });
  }

  function adicionarSplitter() {
    let s: ItemSplitter;
    if (novoSplit.startsWith('b')) {
      const nn = Number(novoSplit.slice(1));
      const linha = SPLITTERS_BALANCEADOS.find((x) => x.n === nn)!;
      s = { id: novoId(), tipo: 'balanceado', n: nn, perda: linha.maximo };
    } else {
      const [razao, perna] = novoSplit.slice(1).split('|') as [string, 'menor' | 'maior'];
      const linha = SPLITTERS_DESBALANCEADOS.find((x) => x.razao === razao)!;
      s = { id: novoId(), tipo: 'desbalanceado', razao, perna, perda: perna === 'menor' ? linha.menor : linha.maior };
    }
    mudar({ splitters: [...e.splitters, s] });
  }

  const presetAtual = PRESETS.find((p) => p.id === preset);

  return (
    <>
      <Migalhas itens={[{ para: '/ferramentas', rotulo: 'Ferramentas' }, { rotulo: 'Orçamento de potência' }]} />
      <h1>Orçamento de potência</h1>
      <p className="suave">
        Confere se a luz que sai do transmissor chega ao receptor com folga, depois de fibra, conectores, fusões e splitters. Base na lição{' '}
        <Link to="/licao/02-07">02-07</Link>. Os valores do equipamento e o critério do contrato mandam <SeloConfirmar />.
      </p>

      <section className="cartao" aria-labelledby="t-eq">
        <h2 id="t-eq">1. Transmissor e receptor</h2>
        <label className="campo">
          <span>Ponto de partida</span>
          <select value={preset} onChange={(ev) => aplicarPreset(ev.target.value)}>
            <option value="">Escolha um exemplo (ou preencha à mão)</option>
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </label>
        {presetAtual && (
          <p className="dica">
            {presetAtual.nota} Fontes:{' '}
            {presetAtual.fontes.map((id, i) => (
              <span key={id}>
                {i > 0 && '; '}
                <Fonte id={id} />
              </span>
            ))}
            . Use a ficha do equipamento instalado.
          </p>
        )}
        <div className="linha-campos">
          <CampoNumero rotulo="Tx mínima" sufixo="dBm" valor={e.txMin} onMudar={(v) => mudar({ txMin: v })} permitirNegativo />
          <CampoNumero rotulo="Tx máxima" sufixo="dBm" valor={e.txMax} onMudar={(v) => mudar({ txMax: v })} permitirNegativo />
        </div>
        <div className="linha-campos">
          <CampoNumero rotulo="Sensibilidade" sufixo="dBm" valor={e.sensibilidade} onMudar={(v) => mudar({ sensibilidade: v })} permitirNegativo />
          <CampoNumero
            rotulo="Sobrecarga"
            sufixo="dBm"
            valor={e.sobrecarga ?? NaN}
            onMudar={(v) => mudar({ sobrecarga: Number.isFinite(v) ? v : null })}
            permitirNegativo
            dica="Deixe vazio se não souber."
          />
        </div>
        <div className="linha-campos">
          <CampoNumero
            rotulo="Penalidade óptica"
            sufixo="dB"
            valor={e.penalidade}
            onMudar={(v) => mudar({ penalidade: v })}
            dica="Sai do orçamento antes das perdas. GPON B+: 0,5 dB."
          />
          <CampoNumero
            rotulo="Perda mínima da classe"
            sufixo="dB"
            valor={e.perdaMinimaClasse ?? NaN}
            onMudar={(v) => mudar({ perdaMinimaClasse: Number.isFinite(v) ? v : null })}
            dica="GPON B+: 13 dB. Deixe vazio se não houver."
          />
        </div>
        <p className="dica">
          Penalidade e perda mínima da classe B+: <Fonte id="itu-g9842-2019" /> (G.984.2, Tabelas A.1 e A.2).
        </p>
      </section>

      <section className="cartao" aria-labelledby="t-fibra">
        <h2 id="t-fibra">2. Fibra, conectores e fusões</h2>
        <label className="campo">
          <span>Comprimento de onda</span>
          <select value={e.lambdaNm} onChange={(ev) => mudar({ lambdaNm: Number(ev.target.value) })}>
            {LAMBDAS.map((l) => (
              <option key={l} value={l}>
                {l} nm
              </option>
            ))}
          </select>
        </label>
        <CampoNumero rotulo="Atenuação da fibra" sufixo="dB/km" valor={e.atenuacaoDbKm} onMudar={(v) => mudar({ atenuacaoDbKm: v })} />
        <p className="dica">
          Máximo da G.652.D em {e.lambdaNm} nm: <strong>{n(maxNorma)} dB/km</strong> (<Fonte id="itu-g652-2024" />, Tabela 2).{' '}
          {e.atenuacaoDbKm !== maxNorma && Number.isFinite(maxNorma) && (
            <button type="button" className="botao-discreto" onClick={() => mudar({ atenuacaoDbKm: maxNorma })}>
              Usar o máximo da norma
            </button>
          )}{' '}
          A ficha do cabo costuma ser melhor que o máximo.
        </p>
        <CampoNumero rotulo="Distância" sufixo="km" valor={e.km} onMudar={(v) => mudar({ km: v })} />
        <div className="linha-campos">
          <CampoNumero rotulo="Pares de conectores" valor={e.conectores} onMudar={(v) => mudar({ conectores: v })} />
          <CampoNumero rotulo="Perda por par" sufixo="dB" valor={e.perdaConector} onMudar={(v) => mudar({ perdaConector: v })} />
        </div>
        <div className="linha-campos">
          <CampoNumero rotulo="Fusões" valor={e.fusoes} onMudar={(v) => mudar({ fusoes: v })} />
          <CampoNumero rotulo="Perda por fusão" sufixo="dB" valor={e.perdaFusao} onMudar={(v) => mudar({ perdaFusao: v })} />
        </div>
        <p className="dica">
          Padrão conservador: limites da TIA, 0,75 dB por par de conectores (<Fonte id="fluke-tia5683d" />) e 0,3 dB por fusão (<Fonte id="foa-loss-budget" />
          ). Para planejar, a FOA usa 0,15 dB por fusão monomodo. O contrato pode ser mais rígido.
        </p>
      </section>

      <section className="cartao" aria-labelledby="t-split">
        <h2 id="t-split">3. Splitters</h2>
        {e.splitters.length === 0 && <p className="suave">Nenhum splitter (enlace ponto a ponto).</p>}
        <ul className="lista-limpa">
          {e.splitters.map((s, i) => (
            <li key={s.id} className="pergunta-caderno">
              <div className="linha-acoes">
                <strong>{s.tipo === 'balanceado' ? `1:${s.n} balanceado` : `${s.razao}, perna ${s.perna}`}</strong>
                <button type="button" className="botao-discreto" onClick={() => mudar({ splitters: e.splitters.filter((x) => x.id !== s.id) })} aria-label={`Remover splitter ${i + 1}`}>
                  Remover
                </button>
              </div>
              <CampoNumero
                rotulo={`Perda do splitter ${i + 1}`}
                sufixo="dB"
                valor={s.perda}
                onMudar={(v) => mudar({ splitters: e.splitters.map((x) => (x.id === s.id ? { ...x, perda: v } : x)) })}
              />
            </li>
          ))}
        </ul>
        <div className="linha-acoes" style={{ justifyContent: 'flex-start' }}>
          <label className="campo" style={{ flex: 1, minWidth: 180, margin: 0 }}>
            <span className="so-leitor">Tipo de splitter</span>
            <select value={novoSplit} onChange={(ev) => setNovoSplit(ev.target.value)}>
              {SPLITTERS_BALANCEADOS.map((s) => (
                <option key={s.n} value={`b${s.n}`}>
                  Balanceado {s.rotulo} ({n(s.maximo, 1)} dB)
                </option>
              ))}
              {SPLITTERS_DESBALANCEADOS.filter((s) => s.razao !== '50/50').flatMap((s) => [
                <option key={`${s.razao}m`} value={`d${s.razao}|menor`}>
                  {s.razao}, perna menor ({n(s.menor, 1)} dB)
                </option>,
                <option key={`${s.razao}M`} value={`d${s.razao}|maior`}>
                  {s.razao}, perna maior ({n(s.maior, 1)} dB)
                </option>,
              ])}
            </select>
          </label>
          <button type="button" className="botao botao-secundario" onClick={adicionarSplitter}>
            + Adicionar
          </button>
        </div>
        <p className="dica">
          Valores máximos de ficha; tabela completa em <Link to="/ferramentas/conversor">dBm ↔ mW e splitters</Link>.
        </p>
      </section>

      <section className="cartao" aria-labelledby="t-margem">
        <h2 id="t-margem">4. Margem de segurança</h2>
        <CampoNumero
          rotulo="Margem"
          sufixo="dB"
          valor={e.margem}
          onMudar={(v) => mudar({ margem: v })}
          dica="Reserva para envelhecimento e reparos futuros. Um guia de fabricante usa 3 dB e recomenda de 3 a 5 dB."
        />
        <p className="dica">
          Fonte da margem: <Fonte id="omada-link-budget" />. <SeloConfirmar />
        </p>
      </section>

      <section className="cartao cartao-destaque" aria-labelledby="t-res" aria-live="polite">
        <h2 id="t-res">Resultado</h2>
        {erros.length > 0 ? (
          <ul className="aviso aviso-erro">
            {erros.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        ) : r ? (
          <>
            <p className={`resultado-grande ${r.passa ? 'ok' : 'nao-ok'}`}>{r.passa ? 'PASSA' : 'NÃO PASSA'}</p>
            {r.avisos.map((a) => (
              <p key={a} className="aviso">
                {a}
              </p>
            ))}
            <div className="tabela" tabIndex={0}>
              <table>
                <tbody>
                  <tr>
                    <th scope="row">Perda total</th>
                    <td>{n(r.perdaTotal)} dB</td>
                  </tr>
                  <tr>
                    <th scope="row">Orçamento (Tx mín. − sensibilidade − penalidade)</th>
                    <td>{n(r.orcamentoDisponivel)} dB</td>
                  </tr>
                  <tr>
                    <th scope="row">Folga depois da margem</th>
                    <td className={r.folga >= 0 ? 'ok' : 'nao-ok'}>{n(r.folga)} dB</td>
                  </tr>
                  <tr>
                    <th scope="row">Chega no receptor (pior caso)</th>
                    <td>{n(r.recebidaMin)} dBm</td>
                  </tr>
                  <tr>
                    <th scope="row">Chega no receptor (Tx máxima, perda mínima de {n(r.perdaMinima, 1)} dB)</th>
                    <td>
                      {n(r.recebidaMax)} dBm {e.sobrecarga !== null && <span className="suave">(sobrecarga {n(e.sobrecarga)} dBm)</span>}
                    </td>
                  </tr>
                  {r.maiorItem && (
                    <tr>
                      <th scope="row">O que mais pesa</th>
                      <td>
                        {r.maiorItem.rotulo}: {n(r.maiorItem.perda)} dB
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Escada e={e} r={r} />
            <h3>Memória de cálculo</h3>
            <pre className="memoria">
              {[
                ...r.itens.map((i) => `${i.rotulo} = ${n(i.perda)} dB`),
                `Perda total = ${n(r.perdaTotal)} dB`,
                `Orçamento = ${n(e.txMin)} − (${n(e.sensibilidade)})${e.penalidade > 0 ? ` − ${n(e.penalidade)} (penalidade)` : ''} = ${n(r.orcamentoDisponivel)} dB`,
                `Folga = ${n(r.orcamentoDisponivel)} − ${n(r.perdaTotal)} − ${n(e.margem)} (margem) = ${n(r.folga)} dB`,
                `Potência no receptor (pior caso) = ${n(e.txMin)} − ${n(r.perdaTotal)} = ${n(r.recebidaMin)} dBm`,
                `Saturação: ${n(e.txMax)} − ${n(r.perdaMinima)} (perda mínima: splitters ideais, resto zero) = ${n(r.recebidaMax)} dBm${e.sobrecarga !== null ? ` (sobrecarga ${n(e.sobrecarga)} dBm)` : ''}`,
                r.passa ? 'Resultado: PASSA' : 'Resultado: NÃO PASSA',
              ].join('\n')}
            </pre>
            <div className="acoes">
              <button type="button" className="botao botao-secundario" onClick={() => setE(ENTRADA_PADRAO)}>
                Voltar ao exemplo
              </button>
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}
