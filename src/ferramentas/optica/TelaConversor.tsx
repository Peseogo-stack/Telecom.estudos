import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CampoNumero } from '../../componentes/CampoNumero';
import { Migalhas, useTitulo } from '../../componentes/Comuns';
import { fontesPorId } from '../../conteudo/carregar';
import { SPLITTERS_BALANCEADOS, SPLITTERS_DESBALANCEADOS, dbmParaMw, faixaEntreFichas, mwParaDbm } from './potencia';

const n = (x: number, casas = 2) => (Number.isFinite(x) ? x.toLocaleString('pt-BR', { maximumFractionDigits: casas, minimumFractionDigits: 0 }) : '—');

/** Mostra a potência em mW ou µW, o que for mais fácil de ler. */
function potenciaLegivel(mw: number): string {
  if (!Number.isFinite(mw)) return '—';
  if (mw >= 0.1) return `${n(mw, 3)} mW`;
  return `${n(mw * 1000, 2)} µW (${n(mw, 5)} mW)`;
}

function Fonte({ id }: { id: string }) {
  const f = fontesPorId.get(id);
  if (!f) return <>{id}</>;
  return (
    <a href={f.url} target="_blank" rel="noopener noreferrer">
      {f.organizacao.split(' (')[0]}
    </a>
  );
}

export function TelaConversor() {
  useTitulo('dBm ↔ mW e splitters');
  const [dbm, setDbm] = useState(-27);
  const [mw, setMw] = useState(1);

  return (
    <>
      <Migalhas itens={[{ para: '/ferramentas', rotulo: 'Ferramentas' }, { rotulo: 'dBm ↔ mW e splitters' }]} />
      <h1>dBm ↔ mW e splitters</h1>
      <p className="suave">
        Explicação na lição <Link to="/licao/02-07">02-07</Link>. dBm é potência (referida a 1 mW); dB é perda ou ganho. Em dB, as perdas se somam.
      </p>

      <section className="cartao" aria-labelledby="t-dbm">
        <h2 id="t-dbm">dBm → mW</h2>
        <CampoNumero rotulo="Potência" sufixo="dBm" valor={dbm} onMudar={setDbm} permitirNegativo />
        <p className="resultado-grande" aria-live="polite">
          {n(dbm)} dBm = {potenciaLegivel(dbmParaMw(dbm))}
        </p>
      </section>

      <section className="cartao" aria-labelledby="t-mw">
        <h2 id="t-mw">mW → dBm</h2>
        <CampoNumero rotulo="Potência" sufixo="mW" valor={mw} onMudar={setMw} dica="Para µW, divida por 1.000 (ex.: 2 µW = 0,002 mW)." />
        <p className="resultado-grande" aria-live="polite">
          {potenciaLegivel(mw)} = {mw > 0 ? `${n(mwParaDbm(mw))} dBm` : 'digite um valor maior que zero'}
        </p>
      </section>

      <section className="cartao" aria-labelledby="t-tab">
        <h2 id="t-tab">Para decorar</h2>
        <div className="tabela" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">dBm</th>
                <th scope="col">Potência</th>
                <th scope="col">Regra</th>
              </tr>
            </thead>
            <tbody>
              {[
                [10, '10× 1 mW'],
                [3, 'o dobro de 1 mW'],
                [0, 'referência'],
                [-3, 'metade'],
                [-10, '1/10'],
                [-20, '1/100'],
                [-27, 'sensibilidade especificada (pior caso) de ONU GPON B+'],
                [-30, '1/1.000'],
              ].map(([d, r]) => (
                <tr key={d}>
                  <td>{n(d as number)}</td>
                  <td>{potenciaLegivel(dbmParaMw(d as number))}</td>
                  <td>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="dica">
          Fórmula: dBm = 10 · log₁₀(P ÷ 1 mW). Fonte: <Fonte id="foa-db" />. Sensibilidade de ONU B+: <Fonte id="itu-g9842-2019" /> (G.984.2, Tabela A.1) e{' '}
          <Fonte id="fs-gpon-onu-bplus" />.
        </p>
      </section>

      <section className="cartao" aria-labelledby="t-bal">
        <h2 id="t-bal">Splitter balanceado (PLC)</h2>
        <p className="dica">Ideal = 10 · log₁₀(N). Use o máximo da ficha no orçamento; a ficha do splitter instalado manda.</p>
        <div className="tabela" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Razão</th>
                <th scope="col">Ideal (dB)</th>
                <th scope="col">Máximo usado no orçamento (dB)</th>
                <th scope="col">Faixa entre 3 fichas (dB)</th>
                <th scope="col">Fonte</th>
              </tr>
            </thead>
            <tbody>
              {SPLITTERS_BALANCEADOS.map((s) => (
                <tr key={s.rotulo}>
                  <td>{s.rotulo}</td>
                  <td>{n(s.ideal)}</td>
                  <td>
                    <strong>{n(s.maximo, 1)}</strong>
                  </td>
                  <td>
                    {(() => {
                      const f = faixaEntreFichas(s.n);
                      return f ? (f.menor === f.maior ? n(f.menor, 1) : `${n(f.menor, 1)} a ${n(f.maior, 1)}`) : '—';
                    })()}
                  </td>
                  <td>
                    <Fonte id={s.fonte} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="dica">
          Fichas comparadas: <Fonte id="intelbras-splitter-plc" />, <Fonte id="senko-plc" /> e <Fonte id="fs-plc" />, todas sem conector. Splitter com
          conector: some a perda de cada conector (a FS orienta 0,2 dB por conector; a Intelbras traz até 0,3 dB, classe III).
        </p>
      </section>

      <section className="cartao" aria-labelledby="t-desb">
        <h2 id="t-desb">Splitter desbalanceado 1x2 (FBT)</h2>
        <p className="dica">
          A perna menor desce para a caixa (derivação); a maior segue para a próxima (passagem). Ideal = −10 · log₁₀(fração).
        </p>
        <div className="tabela" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Razão</th>
                <th scope="col">Perna menor: ideal / máx. (dB)</th>
                <th scope="col">Perna maior: ideal / máx. (dB)</th>
              </tr>
            </thead>
            <tbody>
              {SPLITTERS_DESBALANCEADOS.map((s) => (
                <tr key={s.razao}>
                  <td>{s.razao}</td>
                  <td>
                    {n(s.idealMenor)} / <strong>{n(s.menor, 1)}</strong>
                  </td>
                  <td>
                    {n(s.idealMaior)} / <strong>{n(s.maior, 1)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="dica">
          Máximos da ficha <Fonte id="intelbras-xfsd" /> (XFSD), que vale de 1310 a 1550 nm. Outros fabricantes podem ter valores diferentes.{' '}
          <span className="selo-confirmar">Confirmar na empresa</span>
        </p>
      </section>
    </>
  );
}
