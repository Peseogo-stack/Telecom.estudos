import { useState } from 'react';
import { useEstado } from '../app/EstadoApp';
import { NOME_APP } from '../app/config';
import { useTitulo } from '../componentes/Comuns';
import { ImportarExportar } from '../componentes/ImportarExportar';
import { InstalarApp } from '../componentes/InstalarApp';
import { apagarTudo } from '../dominio/armazenamento';
import { NOMES_DIAS, diaDaSemana, diaDe, ehDiaValido, formatarDia } from '../dominio/datas';
import { ESTADO_INICIAL, type Tema } from '../dominio/estado';
import { indice } from '../conteudo/carregar';

export function Ajustes() {
  useTitulo('Ajustes');
  const { estado, despachar, hoje } = useEstado();
  const a = estado.ajustes;
  const [confirmarApagar, setConfirmarApagar] = useState(false);

  const alternarDia = (d: number) =>
    despachar({
      tipo: 'ajustes',
      ajustes: { diasSoRevisao: a.diasSoRevisao.includes(d) ? a.diasSoRevisao.filter((x) => x !== d) : [...a.diasSoRevisao, d].sort() },
    });

  return (
    <>
      <h1>Ajustes</h1>

      <section className="cartao" aria-labelledby="t-aparencia">
        <h2 id="t-aparencia">Aparência</h2>
        <label className="campo">
          <span>Tema</span>
          <select value={a.tema} onChange={(e) => despachar({ tipo: 'ajustes', ajustes: { tema: e.target.value as Tema } })}>
            <option value="sistema">Igual ao aparelho</option>
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
          </select>
        </label>
        <label className="caixa-marcar">
          <input type="checkbox" checked={a.sol} onChange={(e) => despachar({ tipo: 'ajustes', ajustes: { sol: e.target.checked } })} />
          Modo sol: alto contraste e letra grande (também no botão ☀ do topo)
        </label>
      </section>

      <section className="cartao" aria-labelledby="t-plano">
        <h2 id="t-plano">Plano e rotina</h2>
        <label className="campo">
          <span>Início do plano de 90 dias</span>
          <input
            type="date"
            value={a.inicioPlano ?? hoje}
            onChange={(e) => ehDiaValido(e.target.value) && despachar({ tipo: 'ajustes', ajustes: { inicioPlano: e.target.value } })}
          />
          <span className="dica" data-testid="inicio-por-extenso">
            Início: {NOMES_DIAS[diaDaSemana(a.inicioPlano ?? hoje)]}, {formatarDia(a.inicioPlano ?? hoje)}. O formato do campo segue o idioma do aparelho.
          </span>
        </label>
        <fieldset style={{ border: 0, padding: 0, margin: '12px 0' }}>
          <legend style={{ fontWeight: 600 }}>Dias só de revisão (ex.: noites com curso)</legend>
          <div className="grade grade-2" style={{ gap: 0 }}>
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <label key={d} className="caixa-marcar">
                <input type="checkbox" checked={a.diasSoRevisao.includes(d)} onChange={() => alternarDia(d)} />
                {NOMES_DIAS[d]}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="campo">
          <span>Até quando (opcional)</span>
          <input
            type="date"
            value={a.soRevisaoAte ?? ''}
            onChange={(e) => despachar({ tipo: 'ajustes', ajustes: { soRevisaoAte: ehDiaValido(e.target.value) ? e.target.value : null } })}
          />
          <span className="dica">{a.soRevisaoAte ? `Depois de ${formatarDia(a.soRevisaoAte)}, esses dias voltam a ter lição.` : 'Sem data: vale sempre.'}</span>
        </label>
        <p className="dica">Essas preferências ficam só neste aparelho.</p>
      </section>

      <section className="cartao" aria-labelledby="t-backup">
        <h2 id="t-backup">Cópia de segurança</h2>
        <p className="dica">Exporta progresso, revisão, caderno e ajustes. Para levar só as anotações, use o Meu caderno.</p>
        <ImportarExportar escopo="tudo" />
      </section>

      <section className="cartao" aria-labelledby="t-apagar">
        <h2 id="t-apagar">Apagar dados deste aparelho</h2>
        {!confirmarApagar ? (
          <button type="button" className="botao botao-perigo" onClick={() => setConfirmarApagar(true)}>
            Apagar tudo…
          </button>
        ) : (
          <div className="aviso aviso-erro" role="alertdialog" aria-labelledby="t-confirmar-apagar">
            <p id="t-confirmar-apagar">Isto apaga progresso, revisão e caderno deste aparelho. Exporte antes se quiser guardar. Continuar?</p>
            <div className="acoes">
              <button
                type="button"
                className="botao botao-perigo"
                onClick={() => {
                  apagarTudo();
                  despachar({ tipo: 'substituir', estado: { ...ESTADO_INICIAL, ajustes: { ...ESTADO_INICIAL.ajustes, inicioPlano: hoje } } });
                  setConfirmarApagar(false);
                }}
              >
                Sim, apagar
              </button>
              <button type="button" className="botao botao-secundario" onClick={() => setConfirmarApagar(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="cartao" aria-labelledby="t-instalar">
        <h2 id="t-instalar">Instalar e usar sem internet</h2>
        <InstalarApp />
      </section>

      <section className="cartao" aria-labelledby="t-sobre">
        <h2 id="t-sobre">Sobre</h2>
        <p>
          {NOME_APP}: estudo e consulta em campo sobre telecom numa distribuidora de energia. Funciona sem internet depois da primeira visita. Código aberto
          no{' '}
          <a href="https://github.com/Peseogo-stack/Telecom.estudos" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
        <p className="dica">
          Conteúdo gerado em {formatarDia(diaDe(new Date(indice.geradoEm)))}. {indice.fontes.length} fontes, {indice.glossario.length} termos.
        </p>
      </section>
    </>
  );
}
