import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEstado } from '../app/EstadoApp';
import { useTitulo } from '../componentes/Comuns';
import { ImportarExportar } from '../componentes/ImportarExportar';
import { ORDEM_ONDE, agruparPorOnde } from '../dominio/caderno';
import { CAMPOS_CADERNO, type Nota, type Onde, type PerguntaCaderno, ROTULO_ONDE } from '../dominio/estado';
import { plural } from '../dominio/texto';

function novoId(prefixo: string) {
  return `${prefixo}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/** O que foi removido por último, para poder desfazer. */
type Removido = { tipo: 'pergunta'; item: PerguntaCaderno; posicao: number } | { tipo: 'nota'; item: Nota; posicao: number };

/** Aviso "Removida. Desfazer" que some sozinho em 8 s. */
function AvisoDesfazer({ removido, onDesfazer, onFechar }: { removido: Removido | null; onDesfazer: () => void; onFechar: () => void }) {
  useEffect(() => {
    if (!removido) return;
    const t = setTimeout(onFechar, 8000);
    return () => clearTimeout(t);
  }, [removido, onFechar]);
  if (!removido) return null;
  return (
    <div className="toast" role="status">
      <span>{removido.tipo === 'pergunta' ? 'Pergunta removida.' : 'Anotação apagada.'}</span>
      <button type="button" className="botao" onClick={onDesfazer}>
        Desfazer
      </button>
      <button type="button" className="botao-icone" aria-label="Fechar aviso" onClick={onFechar}>
        ✕
      </button>
    </div>
  );
}

function ItemPergunta({ p, onRemover }: { p: PerguntaCaderno; onRemover: () => void }) {
  const { despachar } = useEstado();
  const idTexto = `perg-${p.id}`;
  const prefixoDica = p.onde === 'outras-areas' ? 'Para quem: ' : 'Onde olhar: ';
  return (
    <li className={`pergunta-caderno${p.resolvida ? ' resolvida' : ''}`}>
      <p id={idTexto} className="titulo-item" style={{ margin: 0 }}>
        {p.texto}
      </p>
      {(p.dica || p.licoes?.length) && (
        <p className="dica" style={{ margin: '4px 0 0' }}>
          {p.dica && (
            <>
              {prefixoDica}
              {p.dica}.{' '}
            </>
          )}
          {p.licoes?.length ? (
            <>
              {p.licoes.length === 1 ? 'Lição ' : 'Lições '}
              {p.licoes.map((l, i) => (
                <span key={l}>
                  {i > 0 && ', '}
                  <Link to={`/licao/${l}`}>{l}</Link>
                </span>
              ))}
              .
            </>
          ) : null}
        </p>
      )}
      <label className="campo" style={{ margin: '8px 0' }}>
        <span className="so-leitor">Resposta para: {p.texto}</span>
        <textarea
          rows={2}
          style={{ minHeight: 64 }}
          placeholder="Resposta (fica só neste aparelho)"
          value={p.resposta}
          onChange={(e) => despachar({ tipo: 'atualizarPergunta', id: p.id, mudancas: { resposta: e.target.value } })}
        />
      </label>
      <div className="linha-acoes">
        <label className="caixa-marcar">
          <input
            type="checkbox"
            checked={p.resolvida}
            onChange={(e) => despachar({ tipo: 'atualizarPergunta', id: p.id, mudancas: { resolvida: e.target.checked } })}
          />
          Respondida
        </label>
        <button type="button" className="botao-discreto" onClick={onRemover} aria-label={`Remover a pergunta: ${p.texto}`}>
          Remover
        </button>
      </div>
    </li>
  );
}

function Perguntas({ onRemover }: { onRemover: (r: Removido) => void }) {
  const { estado, despachar } = useEstado();
  const [texto, setTexto] = useState('');
  const [onde, setOnde] = useState<Onde>('sozinho');
  const perguntas = estado.caderno.perguntas;
  const abertas = perguntas.filter((p) => !p.resolvida).length;

  return (
    <section className="cartao" aria-labelledby="t-perguntas">
      <h2 id="t-perguntas">Perguntas para a empresa</h2>
      <p className="dica">
        {perguntas.length
          ? `${plural(abertas, 'aberta', 'abertas')} de ${perguntas.length}. Comece pelas que você vê sozinho; depois documentos, outras áreas e, por último, o colega de telecom.`
          : 'Nenhuma pergunta. Escreva a sua abaixo.'}
      </p>
      {agruparPorOnde(perguntas).map(({ onde: o, itens }, indiceGrupo) => {
        const r = ROTULO_ONDE[o];
        const feitas = itens.filter((p) => p.resolvida).length;
        return (
          <details key={o} className="grupo-perguntas" open={indiceGrupo === 0}>
            <summary>
              <span aria-hidden="true">{r.icone}</span> <strong>{r.titulo}</strong>{' '}
              <span className="dica">
                · {feitas} de {itens.length} {itens.length === 1 ? 'respondida' : 'respondidas'}
              </span>
              <span className="dica bloco">{r.descricao}</span>
            </summary>
            <ul className="lista-limpa">
              {itens.map((p) => (
                <ItemPergunta
                  key={p.id}
                  p={p}
                  onRemover={() => {
                    onRemover({ tipo: 'pergunta', item: p, posicao: perguntas.findIndex((x) => x.id === p.id) });
                    despachar({ tipo: 'apagarPergunta', id: p.id });
                  }}
                />
              ))}
            </ul>
          </details>
        );
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!texto.trim()) return;
          despachar({
            tipo: 'adicionarPergunta',
            pergunta: { id: novoId('p'), texto: texto.trim(), onde, resposta: '', resolvida: false, criadaEm: new Date().toISOString() },
          });
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

function Notas({ onRemover }: { onRemover: (r: Removido) => void }) {
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
        {estado.caderno.notas.map((n, i) => (
          <li key={n.id} className="pergunta-caderno">
            <p className="titulo-item" style={{ margin: 0 }}>
              {n.titulo || 'Sem título'}
            </p>
            <p className="suave" style={{ whiteSpace: 'pre-wrap', margin: '4px 0' }}>
              {n.texto}
            </p>
            <div className="linha-acoes">
              <button type="button" className="botao botao-secundario" onClick={() => setEditando({ id: n.id, titulo: n.titulo, texto: n.texto })}>
                Editar
              </button>
              <button
                type="button"
                className="botao-discreto"
                aria-label={`Apagar a anotação ${n.titulo || 'sem título'}`}
                onClick={() => {
                  onRemover({ tipo: 'nota', item: n, posicao: i });
                  despachar({ tipo: 'apagarNota', id: n.id });
                }}
              >
                Apagar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Caderno() {
  useTitulo('Meu caderno');
  const { despachar } = useEstado();
  const [removido, setRemovido] = useState<Removido | null>(null);
  const fechar = useCallback(() => setRemovido(null), []);

  function desfazer() {
    if (!removido) return;
    if (removido.tipo === 'pergunta') despachar({ tipo: 'restaurarPergunta', pergunta: removido.item, posicao: removido.posicao });
    else despachar({ tipo: 'restaurarNota', nota: removido.item, posicao: removido.posicao });
    setRemovido(null);
  }

  return (
    <>
      <h1>Meu caderno</h1>
      <p className="aviso" role="note">
        🔒 Tudo aqui fica <strong>só neste aparelho</strong>. Nada vai para a internet. Para levar do PC para o celular, exporte e importe o arquivo.
      </p>
      <Perguntas onRemover={setRemovido} />
      <Campos />
      <Notas onRemover={setRemovido} />
      <section className="cartao" aria-labelledby="t-arquivo">
        <h2 id="t-arquivo">Levar para outro aparelho</h2>
        <ImportarExportar escopo="caderno" />
      </section>
      <AvisoDesfazer removido={removido} onDesfazer={desfazer} onFechar={fechar} />
    </>
  );
}
