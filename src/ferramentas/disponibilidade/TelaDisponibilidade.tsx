import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEstado } from '../../app/EstadoApp';
import { Migalhas, SeloConfirmar, useTitulo } from '../../componentes/Comuns';
import { fontesPorId } from '../../conteudo/carregar';
import {
  ENTRADA_PADRAO,
  FAIXAS_EXEMPLO,
  type Entrada,
  type Parada,
  type Periodo,
  type Regra,
  calcular,
  formatarMinutos,
  minutosDoPeriodo,
  permitido,
  validar,
} from './calculo';
import { lerNumero, mostrarNumero } from '../../dominio/numeros';

const reais = (x: number) => x.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const pct = (x: number, casas = 3) => `${x.toLocaleString('pt-BR', { maximumFractionDigits: casas })}%`;


function CampoNumero({ rotulo, valor, onMudar, dica, sufixo }: { rotulo: string; valor: number; onMudar: (n: number) => void; dica?: string; sufixo?: string }) {
  const [texto, setTexto] = useState(mostrarNumero(valor));
  useEffect(() => {
    if (lerNumero(texto) !== valor && !(Number.isNaN(valor) && texto === '')) setTexto(mostrarNumero(valor));
  }, [valor]);
  return (
    <label className="campo">
      <span>
        {rotulo}
        {sufixo ? ` (${sufixo})` : ''}
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={texto}
        onChange={(e) => {
          setTexto(e.target.value);
          onMudar(lerNumero(e.target.value));
        }}
      />
      {dica && <span className="dica">{dica}</span>}
    </label>
  );
}

const ROTULO_REGRA: Record<Regra, string> = {
  proporcional: 'Proporcional ao tempo parado (Dc = Cm × Ti ÷ To)',
  taxaPorMinuto: 'Taxa fixa por minuto parado (ex.: 0,015% do valor por minuto)',
  faixas: 'Por faixas de disponibilidade',
  excesso: 'Só o que passou do permitido',
};

function novoId() {
  return Math.random().toString(36).slice(2, 9);
}

export function TelaDisponibilidade() {
  useTitulo('Disponibilidade e glosa');
  const { estado, despachar } = useEstado();
  const salvo = estado.ferramentas.disponibilidade as Partial<Entrada> | undefined;
  const [e, setE] = useState<Entrada>({ ...ENTRADA_PADRAO, ...salvo });
  const [copiado, setCopiado] = useState(false);

  // Guarda os últimos valores no aparelho (conveniência).
  useEffect(() => {
    const t = setTimeout(() => despachar({ tipo: 'ferramenta', id: 'disponibilidade', valores: e }), 400);
    return () => clearTimeout(t);
  }, [e, despachar]);

  const erros = validar(e);
  const r = useMemo(() => (erros.length ? null : calcular(e)), [e, erros.length]);
  const mudar = (parcial: Partial<Entrada>) => setE((x) => ({ ...x, ...parcial }));
  const mudarParada = (id: string, parcial: Partial<Parada>) =>
    setE((x) => ({ ...x, paradas: x.paradas.map((p) => (p.id === id ? { ...p, ...parcial } : p)) }));

  const to = minutosDoPeriodo(e.periodo, e.diasNoMes);
  const fontes = ['trt7-tr-internet', 'trt7-tr-principal', 'ifsuldeminas-ans', 'sudam-impugnacao-2026', 'tjal-tr-link', 'anatel-rgc-manual']
    .map((id) => fontesPorId.get(id))
    .filter(Boolean);

  const editorFaixas = (
    <div>
      <p className="dica">Exemplo do IF Sul de Minas: abaixo de 90% → 50%; abaixo de 80% → 100%. Edite conforme o contrato.</p>
      {e.faixas.map((f, n) => (
        <div key={n} className="linha-campos">
          <CampoNumero rotulo={`Faixa ${n + 1}: abaixo de`} sufixo="%" valor={f.abaixoDe} onMudar={(v) => mudar({ faixas: e.faixas.map((x, k) => (k === n ? { ...x, abaixoDe: v } : x)) })} />
          <CampoNumero rotulo="glosa de" sufixo="% do valor" valor={f.glosaPercent} onMudar={(v) => mudar({ faixas: e.faixas.map((x, k) => (k === n ? { ...x, glosaPercent: v } : x)) })} />
        </div>
      ))}
      <div className="acoes">
        <button type="button" className="botao botao-secundario" onClick={() => mudar({ faixas: [...e.faixas, { abaixoDe: 99, glosaPercent: 10 }] })}>
          + Faixa
        </button>
        <button type="button" className="botao botao-secundario" onClick={() => mudar({ faixas: FAIXAS_EXEMPLO })}>
          Restaurar exemplo
        </button>
      </div>
    </div>
  );

  async function copiar() {
    if (!r) return;
    const texto = ['Memória de cálculo — disponibilidade e glosa', ...e.paradas.map((p) => `- ${p.descricao || 'parada'}: ${mostrarNumero(p.minutos)} min${p.exclusao ? ' (exclusão do contrato)' : ''}`), ...r.passos].join('\n');
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
      window.prompt('Copie o texto:', texto);
    }
  }

  return (
    <>
      <Migalhas itens={[{ para: '/ferramentas', rotulo: 'Ferramentas' }, { rotulo: 'Disponibilidade e glosa' }]} />
      <h1>Disponibilidade e glosa</h1>
      <p className="suave">
        Para conferir o SLA de um link no fim do período. Explicação nas lições <Link to="/licao/09-01">09-01</Link> e{' '}
        <Link to="/licao/09-02">09-02</Link>. A regra que vale é a do contrato <SeloConfirmar />.
      </p>

      <section className="cartao" aria-labelledby="t-sla">
        <h2 id="t-sla">1. SLA e período</h2>
        <div className="acoes" role="group" aria-label="Atalhos de SLA">
          {[99.5, 99.7, 99.9].map((v) => (
            <button key={v} type="button" className={`botao ${e.slaPercent === v ? '' : 'botao-secundario'}`} aria-pressed={e.slaPercent === v} onClick={() => mudar({ slaPercent: v })}>
              {pct(v)}
            </button>
          ))}
        </div>
        <CampoNumero rotulo="SLA" sufixo="%" valor={e.slaPercent} onMudar={(n) => mudar({ slaPercent: n })} dica="Use o número do contrato. 99,7 é só um exemplo." />
        <label className="campo">
          <span>Período</span>
          <select value={e.periodo} onChange={(ev) => mudar({ periodo: ev.target.value as Periodo })}>
            <option value="mes30">Mês de 30 dias (43.200 min)</option>
            <option value="mesCalendario">Mês do calendário</option>
            <option value="ano">Ano de 365 dias (525.600 min)</option>
            <option value="anoBissexto">Ano bissexto, 366 dias (527.040 min)</option>
          </select>
        </label>
        {e.periodo === 'mesCalendario' && (
          <CampoNumero rotulo="Dias no mês" valor={e.diasNoMes} onMudar={(n) => mudar({ diasNoMes: n })} dica="28 a 31" />
        )}
        {Number.isFinite(e.slaPercent) && e.slaPercent > 0 && e.slaPercent < 100 && (
          <p className="aviso">
            Parada permitida: <strong>{formatarMinutos(permitido(e.slaPercent, to))}</strong> ({mostrarNumero(Math.round(permitido(e.slaPercent, to) * 10) / 10)} min de{' '}
            {to.toLocaleString('pt-BR')}).
          </p>
        )}
      </section>

      <section className="cartao" aria-labelledby="t-paradas">
        <h2 id="t-paradas">2. Paradas no período</h2>
        <p className="dica">Marque "exclusão" quando o contrato manda não contar (manutenção programada avisada, falta de energia no local…).</p>
        {e.paradas.length === 0 && <p className="suave">Nenhuma parada lançada.</p>}
        <ol className="lista-limpa">
          {e.paradas.map((p, n) => (
            <li key={p.id} className="cartao" style={{ background: 'var(--superficie-2)' }}>
              <p className="rotulo">Parada {n + 1}</p>
              <label className="campo">
                <span>Descrição ou protocolo</span>
                <input type="text" value={p.descricao} onChange={(ev) => mudarParada(p.id, { descricao: ev.target.value })} />
              </label>
              <CampoNumero rotulo="Duração" sufixo="minutos" valor={p.minutos} onMudar={(m) => mudarParada(p.id, { minutos: m })} />
              <label className="caixa-marcar">
                <input type="checkbox" checked={p.exclusao} onChange={(ev) => mudarParada(p.id, { exclusao: ev.target.checked })} />
                Exclusão prevista no contrato (não conta)
              </label>
              <button type="button" className="botao botao-perigo" onClick={() => setE((x) => ({ ...x, paradas: x.paradas.filter((y) => y.id !== p.id) }))}>
                Remover parada {n + 1}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="botao botao-secundario" onClick={() => mudar({ paradas: [...e.paradas, { id: novoId(), descricao: '', minutos: 0, exclusao: false }] })}>
          + Adicionar parada
        </button>
      </section>

      <section className="cartao" aria-labelledby="t-regra">
        <h2 id="t-regra">3. Valor e regra de glosa</h2>
        <CampoNumero rotulo="Valor do serviço no período" sufixo="R$" valor={e.valor} onMudar={(n) => mudar({ valor: n })} dica="Mensal para SLA mensal." />
        <fieldset style={{ border: 0, padding: 0, margin: '12px 0' }}>
          <legend style={{ fontWeight: 600 }}>Regra do contrato</legend>
          {(Object.keys(ROTULO_REGRA) as Regra[]).map((rg) => (
            <label key={rg} className="caixa-marcar">
              <input type="radio" name="regra" checked={e.regra === rg} onChange={() => mudar({ regra: rg })} />
              {ROTULO_REGRA[rg]}
            </label>
          ))}
        </fieldset>
        {e.regra === 'proporcional' && (
          <>
            <label className="caixa-marcar">
              <input type="checkbox" checked={e.descontoSoSeDescumprir} onChange={(ev) => mudar({ descontoSoSeDescumprir: ev.target.checked })} />
              Só há desconto se a disponibilidade ficar abaixo do SLA
            </label>
            <label className="caixa-marcar">
              <input type="checkbox" checked={e.somarFaixas} onChange={(ev) => mudar({ somarFaixas: ev.target.checked })} />
              Somar também a glosa por faixas (como no IF Sul de Minas)
            </label>
            {e.somarFaixas && (
              <>
                <p className="dica">
                  A soma fica limitada ao valor do período. Confirme no contrato se as duas regras se somam <SeloConfirmar />.
                </p>
                {editorFaixas}
              </>
            )}
          </>
        )}
        {e.regra === 'taxaPorMinuto' && (
          <CampoNumero
            rotulo="Desconto por minuto parado"
            sufixo="% do valor"
            valor={e.taxaPorMinutoPercent}
            onMudar={(n) => mudar({ taxaPorMinutoPercent: n })}
            dica="O TRT-7 usa 0,015% por minuto, só abaixo do SLA. Use o número do contrato."
          />
        )}
        {e.regra === 'excesso' && (
          <p className="aviso">Não achamos essa regra em documento público. Use só se o contrato disser.</p>
        )}
        {e.regra === 'faixas' && editorFaixas}
        <label className="caixa-marcar">
          <input type="checkbox" checked={e.tetoPercent !== null} onChange={(ev) => mudar({ tetoPercent: ev.target.checked ? 20 : null })} />
          O contrato tem teto de desconto
        </label>
        {e.tetoPercent !== null && (
          <CampoNumero rotulo="Teto" sufixo="% do valor" valor={e.tetoPercent} onMudar={(n) => mudar({ tetoPercent: n })} dica="A SUDAM usa 20%." />
        )}
      </section>

      <section className="cartao cartao-destaque" aria-labelledby="t-resultado" aria-live="polite">
        <h2 id="t-resultado">Resultado</h2>
        {erros.length > 0 ? (
          <ul className="aviso aviso-erro">
            {erros.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        ) : r ? (
          <>
            <p className={`resultado-grande ${r.cumpriu ? 'ok' : 'nao-ok'}`}>{r.cumpriu ? 'CUMPRIU o SLA' : 'NÃO CUMPRIU o SLA'}</p>
            <div className="tabela">
              <table>
                <tbody>
                  <tr>
                    <th scope="row">Disponibilidade</th>
                    <td>{pct(r.disponibilidade)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Parada que conta (Ti)</th>
                    <td>
                      {formatarMinutos(r.tiContado)} {r.tiExcluido > 0 && <span className="suave">(+ {formatarMinutos(r.tiExcluido)} excluídos)</span>}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Parada permitida</th>
                    <td>{formatarMinutos(r.permitido)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Desconto (glosa)</th>
                    <td>
                      <strong>{reais(r.desconto)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>Memória de cálculo</h3>
            <pre className="memoria">{r.passos.join('\n')}</pre>
            <div className="acoes">
              <button type="button" className="botao" onClick={copiar}>
                {copiado ? 'Copiado ✓' : 'Copiar memória de cálculo'}
              </button>
              <button type="button" className="botao botao-secundario" onClick={() => setE(ENTRADA_PADRAO)}>
                Limpar tudo
              </button>
            </div>
          </>
        ) : null}
      </section>

      <section className="cartao" aria-labelledby="t-fontes">
        <h2 id="t-fontes">De onde vêm as fórmulas</h2>
        <ul className="prosa">
          <li>Disponibilidade D = (To − Ti) ÷ To × 100 e mês de 43.200 min: TR do TRT-7 e manual do RGC (Anatel).</li>
          <li>Glosa proporcional e por faixas: ANS do IF Sul de Minas (lá, as faixas vêm além do proporcional). Teto de 20%: SUDAM.</li>
          <li>Taxa fixa por minuto (0,015% do valor por minuto, abaixo de 99,3%): TR do TRT-7, item 14.1.</li>
          <li>Exclusões (manutenção avisada, falta de energia no local, falhas em menos de 3 h juntas): TR do TJAL.</li>
          <li>"Só o excesso": sem fonte pública; use só se o contrato disser.</li>
        </ul>
        <ol className="prosa">
          {fontes.map((f) => (
            <li key={f!.id}>
              <a href={f!.url} target="_blank" rel="noopener noreferrer">
                {f!.titulo}
              </a>{' '}
              — {f!.organizacao}.
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
