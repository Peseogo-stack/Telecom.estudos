import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEstado } from '../app/EstadoApp';
import { useTitulo } from '../componentes/Comuns';
import { ImportarExportar } from '../componentes/ImportarExportar';
import { CAMPOS_CADERNO, type Onde, ROTULO_ONDE } from '../dominio/estado';

const ORDEM_ONDE: Onde[] = ['sozinho', 'documentos', 'outras-areas', 'colega'];

function novoId(prefixo: string) {
  return `${prefixo}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function Perguntas() {
  const { estado, despachar } = useEstado();
  const [texto, setTexto] = useState('');
  const [onde, setOnde] = useState<Onde>('documentos');
  const perguntas = estado.caderno.perguntas;
  const abertas = perguntas.filter((p) => !p.resolvida).length;

  return (
    <section className="cartao" aria-labelledby="t-perguntas">
      <h2 id="t-perguntas">Perguntas para a empresa</h2>
      <p className="dica">
        {perguntas.length ? `${abertas} aberta(s) de ${perguntas.length}.` : 'Use o botão "Levar para o caderno" nas lições, ou escreva a sua abaixo.'}
      </p>
      {ORDEM_ONDE.map((o) => {
        const lista = perguntas.filter((p) => p.onde === o);
        if (!lista.length) return null;
        const r = ROTULO_ONDE[o];
        return (
          <div key={o}>
            <h3>
              <span aria-hidden="true">{r.icone}</span> {r.titulo} <span className="dica">— {r.descricao}</span>
            </h3>
            <ul className="lista-limpa">
              {lista.map((p) => (
                <li key={p.id} className="cartao" style={{ background: 'var(--superficie-2)' }}>
                  <p style={{ marginTop: 0 }}>
                    <strong>{p.texto}</strong>
                    {p.licao && (
                      <>
                        {' '}
                        <Link to={`/licao/${p.licao}`} className="dica">
                          (lição {p.licao})
                        </Link>
                      </>
                    )}
                  </p>
                  <label className="campo">
                    <span>Resposta</span>
                    <textarea value={p.resposta} onChange={(e) => despachar({ tipo: 'atualizarPergunta', id: p.id, mudancas: { resposta: e.target.value } })} />
                  </label>
                  <div className="acoes" style={{ alignItems: 'center' }}>
                    <label className="caixa-marcar">
                      <input type="checkbox" checked={p.resolvida} onChange={(e) => despachar({ tipo: 'atualizarPergunta', id: p.id, mudancas: { resolvida: e.target.checked } })} />
                      Respondida
                    </label>
                    <button type="button" className="botao botao-perigo" onClick={() => despachar({ tipo: 'apagarPergunta', id: p.id })}>
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!texto.trim()) return;
          despachar({ tipo: 'adicionarPergunta', pergunta: { id: novoId('p'), texto: texto.trim(), onde, resposta: '', resolvida: false, criadaEm: new Date().toISOString() } });
          setTexto('');
        }}
      >
        <h3>Nova pergunta</h3>
        <label className="campo">
          <span>Pergunta</span>
          <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
        </label>
        <label className="campo">
          <span>Onde achar a resposta</span>
          <select value={onde} onChange={(e) => setOnde(e.target.value as Onde)}>
            {ORDEM_ONDE.map((o) => (
              <option key={o} value={o}>
                {ROTULO_ONDE[o].titulo}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="botao botao-secundario">
          Adicionar pergunta
        </button>
      </form>
    </section>
  );
}

function Campos() {
  const { estado, despachar } = useEstado();
  return (
    <section className="cartao" aria-labelledby="t-campos">
      <h2 id="t-campos">Padrões da empresa</h2>
      <p className="dica">Preencha conforme descobrir. Fica só neste aparelho.</p>
      {CAMPOS_CADERNO.map((c) => (
        <label key={c.id} className="campo">
          <span>{c.rotulo}</span>
          <textarea
            rows={2}
            style={{ minHeight: 64 }}
            placeholder={c.dica}
            value={estado.caderno.campos[c.id] ?? ''}
            onChange={(e) => despachar({ tipo: 'campoCaderno', campo: c.id, valor: e.target.value })}
          />
        </label>
      ))}
    </section>
  );
}

function Notas() {
  const { estado, despachar } = useEstado();
  const [editando, setEditando] = useState<{ id: string; titulo: string; texto: string } | null>(null);

  return (
    <section className="cartao" aria-labelledby="t-notas">
      <h2 id="t-notas">Anotações livres</h2>
      {editando ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            despachar({ tipo: 'salvarNota', nota: { ...editando, atualizadoEm: new Date().toISOString() } });
            setEditando(null);
          }}
        >
          <label className="campo">
            <span>Título</span>
            <input type="text" value={editando.titulo} onChange={(e) => setEditando({ ...editando, titulo: e.target.value })} />
          </label>
          <label className="campo">
            <span>Texto</span>
            <textarea rows={6} value={editando.texto} onChange={(e) => setEditando({ ...editando, texto: e.target.value })} />
          </label>
          <div className="acoes">
            <button type="submit" className="botao">
              Salvar nota
            </button>
            <button type="button" className="botao botao-secundario" onClick={() => setEditando(null)}>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button type="button" className="botao botao-secundario" onClick={() => setEditando({ id: novoId('n'), titulo: '', texto: '' })}>
          + Nova anotação
        </button>
      )}
      <ul className="lista-limpa" style={{ marginTop: 12 }}>
        {estado.caderno.notas.map((n) => (
          <li key={n.id} className="item-lista" style={{ alignItems: 'flex-start' }}>
            <span className="meio">
              <span className="titulo-item">{n.titulo || 'Sem título'}</span>
              <br />
              <span className="suave" style={{ whiteSpace: 'pre-wrap' }}>
                {n.texto}
              </span>
            </span>
            <span className="acoes" style={{ marginTop: 0 }}>
              <button type="button" className="botao botao-secundario" onClick={() => setEditando({ id: n.id, titulo: n.titulo, texto: n.texto })}>
                Editar
              </button>
              <button
                type="button"
                className="botao botao-perigo"
                onClick={() => {
                  if (window.confirm(`Apagar a nota "${n.titulo || 'sem título'}"?`)) despachar({ tipo: 'apagarNota', id: n.id });
                }}
              >
                Apagar
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Caderno() {
  useTitulo('Meu caderno');
  return (
    <>
      <h1>Meu caderno</h1>
      <p className="aviso" role="note">
        🔒 Tudo aqui fica <strong>só neste aparelho</strong>. Nada vai para a internet. Para levar do PC para o celular, exporte e importe o arquivo.
      </p>
      <Perguntas />
      <Campos />
      <Notas />
      <section className="cartao" aria-labelledby="t-arquivo">
        <h2 id="t-arquivo">Levar para outro aparelho</h2>
        <ImportarExportar escopo="caderno" />
      </section>
    </>
  );
}
