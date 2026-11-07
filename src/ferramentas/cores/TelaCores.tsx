import { useEffect, useMemo, useState } from 'react';
import { useEstado } from '../../app/EstadoApp';
import { CampoNumero } from '../../componentes/CampoNumero';
import { LinkLicao, Migalhas, SeloConfirmar, useTitulo } from '../../componentes/Comuns';
import { fontesPorId } from '../../conteudo/carregar';
import { CORES, NOME_PADRAO, corDoTubo, descrever, localizar, numeroDaFibra, totalTubos, type ConfigCabo, type CorTubo, type Identificacao } from './cores';

const CONFIG_PADRAO: ConfigCabo = { padrao: 'abnt', modoTubos: 'colorido', fibrasPorTubo: 12, totalFibras: 48 };

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

/** Amostra de cor sempre acompanhada do nome (não depender só da cor: daltonismo e tela ao sol). */
function Amostra({ hex, nome, marcacao }: { hex: string; nome: string; marcacao?: string }) {
  return (
    <span className="amostra">
      <span className="amostra-cor" style={{ background: hex }} aria-hidden="true">
        {marcacao ? <span className="amostra-marca" /> : null}
      </span>
      <span>
        {nome}
        {marcacao ? ` + ${marcacao}` : ''}
      </span>
    </span>
  );
}

function rotuloTubo(t: CorTubo) {
  return `Tubo ${t.numero}: ${t.nome}${t.marcacao ? ` + ${t.marcacao}` : ''}${t.papel === 'piloto' ? ' (piloto)' : t.papel === 'direcional' ? ' (direcional)' : ''}`;
}

function rotuloFibra(id: Identificacao, n: number) {
  return `Fibra ${n} do tubo: ${id.cor.nome}${id.marcacao ? ` + ${id.marcacao}` : ''}`;
}

function Treino({ cfg }: { cfg: ConfigCabo }) {
  const sortear = () => 1 + Math.floor(Math.random() * cfg.totalFibras);
  const [alvo, setAlvo] = useState(sortear);
  const [tubo, setTubo] = useState(0);
  const [fibra, setFibra] = useState(0);
  const [resultado, setResultado] = useState<null | boolean>(null);
  const [placar, setPlacar] = useState({ certos: 0, total: 0 });
  const certo = localizar(cfg, Math.min(alvo, cfg.totalFibras))!;
  const tubos = Array.from({ length: totalTubos(cfg) }, (_, i) => corDoTubo(cfg, i + 1));
  const fibrasDoTubo = Array.from({ length: cfg.fibrasPorTubo }, (_, i) => i + 1);

  useEffect(() => {
    setAlvo(sortear());
    setResultado(null);
    setTubo(0);
    setFibra(0);
    // Nova rodada quando muda o tipo de cabo.
  }, [cfg.padrao, cfg.modoTubos, cfg.fibrasPorTubo, cfg.totalFibras]);

  function conferir() {
    const ok = tubo === certo.tubo.numero && fibra === certo.fibraNoTubo;
    setResultado(ok);
    setPlacar((p) => ({ certos: p.certos + (ok ? 1 : 0), total: p.total + 1 }));
  }

  return (
    <section className="cartao" aria-labelledby="t-treino">
      <h2 id="t-treino">Modo treino</h2>
      <p className="resultado-grande">Onde está a fibra {certo.fibra}?</p>
      <label className="campo">
        <span>Tubo</span>
        <select value={tubo} onChange={(e) => setTubo(Number(e.target.value))} disabled={resultado !== null}>
          <option value={0}>Escolha o tubo</option>
          {tubos.map((t) => (
            <option key={t.numero} value={t.numero}>
              {rotuloTubo(t)}
            </option>
          ))}
        </select>
      </label>
      <label className="campo">
        <span>Cor da fibra</span>
        <select value={fibra} onChange={(e) => setFibra(Number(e.target.value))} disabled={resultado !== null}>
          <option value={0}>Escolha a cor</option>
          {fibrasDoTubo.map((f) => (
            <option key={f} value={f}>
              {rotuloFibra(localizarCor(cfg, f), f)}
            </option>
          ))}
        </select>
      </label>
      <div aria-live="polite">
        {resultado !== null && (
          <p className={`aviso ${resultado ? 'aviso-ok' : 'aviso-erro'}`}>
            {resultado ? 'Certo! ' : 'Não. '}
            {descrever(certo)}
          </p>
        )}
      </div>
      <div className="acoes">
        {resultado === null ? (
          <button type="button" className="botao" disabled={!tubo || !fibra} onClick={conferir}>
            Conferir
          </button>
        ) : (
          <button
            type="button"
            className="botao"
            onClick={() => {
              setAlvo(sortear());
              setResultado(null);
              setTubo(0);
              setFibra(0);
            }}
          >
            Próxima fibra
          </button>
        )}
      </div>
      <p className="dica">
        Placar: {placar.certos} de {placar.total}.
      </p>
    </section>
  );
}

/** Cor da posição f dentro de qualquer tubo (independe do número do tubo). */
function localizarCor(cfg: ConfigCabo, f: number): Identificacao {
  // A cor da fibra depende só da posição dentro do tubo; usamos um cabo "grande" só para consultar.
  return localizar({ ...cfg, totalFibras: Math.max(cfg.totalFibras, cfg.fibrasPorTubo) }, f)!.corFibra;
}

export function TelaCores() {
  useTitulo('Código de cores');
  const { estado, despachar } = useEstado();
  const salvo = estado.ferramentas.cores as Partial<ConfigCabo> | undefined;
  const [cfg, setCfg] = useState<ConfigCabo>({ ...CONFIG_PADRAO, ...salvo });
  const [fibra, setFibra] = useState(30);
  const [tuboEscolhido, setTuboEscolhido] = useState(1);
  const [fibraEscolhida, setFibraEscolhida] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => despachar({ tipo: 'ferramenta', id: 'cores', valores: cfg }), 400);
    return () => clearTimeout(t);
  }, [cfg, despachar]);

  const mudar = (p: Partial<ConfigCabo>) => setCfg((c) => ({ ...c, ...p }));
  const valido = Number.isInteger(cfg.totalFibras) && cfg.totalFibras >= 1 && cfg.totalFibras <= 288 && [2, 4, 6, 8, 12, 24].includes(cfg.fibrasPorTubo);
  const local = useMemo(() => (valido ? localizar(cfg, fibra) : null), [cfg, fibra, valido]);
  const tubos = valido ? Array.from({ length: totalTubos(cfg) }, (_, i) => corDoTubo(cfg, i + 1)) : [];
  const numero = valido ? numeroDaFibra(cfg, tuboEscolhido, fibraEscolhida) : null;

  return (
    <>
      <Migalhas itens={[{ para: '/ferramentas', rotulo: 'Ferramentas' }, { rotulo: 'Código de cores' }]} />
      <h1>Código de cores</h1>
      <p className="suave">
        Número da fibra → tubo e cor, e o contrário. Explicação nas lições <LinkLicao id="03-03" /> e <LinkLicao id="03-04" />.
      </p>
      <p className="aviso" role="note">
        Antes de cortar ou emendar: confira na ficha ou na capa do cabo se os <strong>tubos são coloridos</strong> ou se o cabo usa <strong>tubo piloto (verde) e direcional (amarelo)</strong> com os demais brancos. A contagem muda. <SeloConfirmar />
      </p>

      <section className="cartao" aria-labelledby="t-cabo">
        <h2 id="t-cabo">O cabo</h2>
        <label className="campo">
          <span>Padrão de cores</span>
          <select value={cfg.padrao} onChange={(e) => mudar({ padrao: e.target.value as ConfigCabo['padrao'] })}>
            <option value="abnt">{NOME_PADRAO.abnt}</option>
            <option value="tia598">{NOME_PADRAO.tia598}</option>
          </select>
        </label>
        <label className="campo">
          <span>Tubos</span>
          <select value={cfg.modoTubos} onChange={(e) => mudar({ modoTubos: e.target.value as ConfigCabo['modoTubos'] })}>
            <option value="colorido">Coloridos (seguem o código de cores)</option>
            <option value="piloto">Piloto verde + direcional amarelo + demais brancos</option>
          </select>
        </label>
        <div className="linha-campos">
          <label className="campo">
            <span>Fibras por tubo</span>
            <select value={cfg.fibrasPorTubo} onChange={(e) => mudar({ fibrasPorTubo: Number(e.target.value) })}>
              {[2, 4, 6, 8, 12, 24].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>
          <CampoNumero rotulo="Fibras no cabo" valor={cfg.totalFibras} onMudar={(v) => mudar({ totalFibras: v })} dica="De 1 a 288." />
        </div>
        <div className="paleta" aria-label={`As 12 cores do padrão ${NOME_PADRAO[cfg.padrao]}`}>
          {CORES[cfg.padrao].map((c, i) => (
            <span key={c.nome} className="paleta-item">
              <span className="dica">{i + 1}</span>
              <Amostra hex={c.hex} nome={c.nome} />
            </span>
          ))}
        </div>
        <p className="dica">
          Brasil: ficha <Fonte id="furukawa-et02719" /> (igual em <Fonte id="prysmian-cfoa-as" /> e <Fonte id="transcend-as" />). TIA-598: <Fonte id="foa-cores" />.
          Acima de 12: na Furukawa, do 13 ao 24 as cores se repetem com traços pretos (branco no preto). No TIA-598, os tubos 13 a 24 levam faixa preta
          (amarela no preto), depois laranja e verde; num tubo com mais de 12 fibras, a FOA cita grupos separados por fita. Confira na ficha do cabo.
        </p>
      </section>

      {!valido ? (
        <p className="aviso aviso-erro">Informe um cabo de 1 a 288 fibras.</p>
      ) : (
        <>
          <section className="cartao cartao-destaque" aria-labelledby="t-num">
            <h2 id="t-num">Número → tubo e cor</h2>
            <CampoNumero rotulo="Número da fibra" valor={fibra} onMudar={(v) => setFibra(v)} />
            <div aria-live="polite">
              {local ? (
                <>
                  <p className="resultado-grande">
                    Tubo {local.tubo.numero} · fibra {local.fibraNoTubo}
                  </p>
                  <p>
                    Tubo: <Amostra hex={local.tubo.hex} nome={local.tubo.nome + (local.tubo.papel === 'piloto' ? ' (piloto)' : local.tubo.papel === 'direcional' ? ' (direcional)' : '')} marcacao={local.tubo.marcacao} />
                  </p>
                  <p>
                    Fibra: <Amostra hex={local.corFibra.cor.hex} nome={local.corFibra.cor.nome} marcacao={local.corFibra.marcacao} />
                  </p>
                  {(local.tubo.indefinido || local.corFibra.indefinido) && (
                    <p className="aviso">A fonte consultada não define a marcação dessa posição. Confira na ficha do cabo.</p>
                  )}
                  {cfg.modoTubos === 'piloto' && local.tubo.papel === 'normal' && (
                    <p className="dica">Conte a partir do piloto (verde, tubo 1), no sentido do direcional (amarelo, tubo 2).</p>
                  )}
                </>
              ) : (
                <p className="aviso aviso-erro">Fibra fora do cabo (1 a {cfg.totalFibras}).</p>
              )}
            </div>
          </section>

          <section className="cartao" aria-labelledby="t-cor">
            <h2 id="t-cor">Tubo e cor → número</h2>
            <label className="campo">
              <span>Tubo</span>
              <select value={tuboEscolhido} onChange={(e) => setTuboEscolhido(Number(e.target.value))}>
                {tubos.map((t) => (
                  <option key={t.numero} value={t.numero}>
                    {rotuloTubo(t)}
                  </option>
                ))}
              </select>
            </label>
            <label className="campo">
              <span>Cor da fibra</span>
              <select value={fibraEscolhida} onChange={(e) => setFibraEscolhida(Number(e.target.value))}>
                {Array.from({ length: cfg.fibrasPorTubo }, (_, i) => i + 1).map((f) => (
                  <option key={f} value={f}>
                    {rotuloFibra(localizarCor(cfg, f), f)}
                  </option>
                ))}
              </select>
            </label>
            <p className="resultado-grande" aria-live="polite">
              {numero ? `Fibra ${numero} do cabo` : 'Essa combinação não existe neste cabo.'}
            </p>
          </section>

          <Treino cfg={cfg} />
        </>
      )}
    </>
  );
}
