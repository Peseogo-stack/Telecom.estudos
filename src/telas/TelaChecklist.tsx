import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BarraProgresso, useTitulo } from '../componentes/Comuns';
import { indice } from '../conteudo/carregar';
import { NaoEncontrado } from './NaoEncontrado';

export function TelaChecklist() {
  const { id } = useParams<{ id: string }>();
  const checklist = (indice.checklists ?? []).find((c) => c.id === id);

  useTitulo(checklist ? checklist.titulo : 'Checklist');

  const chaveArmazenamento = `fibra_checklist_${id}`;
  const [marcados, setMarcados] = useState<Set<string>>(() => {
    try {
      const salvo = localStorage.getItem(`${chaveArmazenamento}_itens`);
      return salvo ? new Set(JSON.parse(salvo)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [observacoes, setObservacoes] = useState<string>(() => {
    try {
      return localStorage.getItem(`${chaveArmazenamento}_obs`) ?? '';
    } catch {
      return '';
    }
  });

  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(`${chaveArmazenamento}_itens`, JSON.stringify([...marcados]));
    } catch {
      // Ignora erro de cota ou bloqueio
    }
  }, [chaveArmazenamento, marcados]);

  useEffect(() => {
    try {
      localStorage.setItem(`${chaveArmazenamento}_obs`, observacoes);
    } catch {
      // Ignora erro
    }
  }, [chaveArmazenamento, observacoes]);

  if (!checklist) {
    return <NaoEncontrado />;
  }

  const alternar = (itemId: string) => {
    setMarcados((anterior) => {
      const proximo = new Set(anterior);
      if (proximo.has(itemId)) proximo.delete(itemId);
      else proximo.add(itemId);
      return proximo;
    });
  };

  const limpar = () => {
    if (window.confirm('Deseja limpar todas as marcações e observações deste checklist?')) {
      setMarcados(new Set());
      setObservacoes('');
    }
  };

  const copiarTexto = async () => {
    const agora = new Date().toLocaleString('pt-BR');
    const linhas = [
      `CHECKLIST DE CAMPO: ${checklist.titulo.toUpperCase()}`,
      `Data/Hora: ${agora}`,
      `Progresso: ${marcados.size} de ${checklist.itens.length} itens checados`,
      checklist.aviso ? `Aviso: ${checklist.aviso}` : '',
      '',
      'ITENS DE VERIFICAÇÃO:',
      ...checklist.itens.map((item) => {
        const check = marcados.has(item.id) ? '[X]' : '[ ]';
        return `${check} ${item.texto}`;
      }),
      '',
      observacoes.trim() ? `OBSERVAÇÕES DO LOCAL:\n${observacoes.trim()}` : 'OBSERVAÇÕES: Nenhuma observação registrada.',
      '',
      'Gerado pelo app Fibra em Campo.',
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(linhas.join('\n'));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    } catch {
      alert('Não foi possível copiar automaticamente para a área de transferência.');
    }
  };

  const total = checklist.itens.length;
  const concluido = total > 0 && marcados.size === total;

  return (
    <>
      <div className="migalhas">
        <Link to="/">Hoje</Link> <span>/</span> <Link to="/campo">Campo</Link> <span>/</span> <span>{checklist.titulo}</span>
      </div>

      <h1>{checklist.titulo}</h1>

      {checklist.aviso && (
        <p className="aviso aviso-seguranca" role="note">
          ⚠ {checklist.aviso}
        </p>
      )}

      {checklist.descricao && <p className="suave">{checklist.descricao}</p>}

      <section className="cartao" aria-labelledby="t-progresso">
        <h2 id="t-progresso" style={{ margin: 0, fontSize: '1.05rem' }}>
          {marcados.size} de {total} itens verificados
        </h2>
        <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <BarraProgresso valor={marcados.size} total={total} rotulo="Progresso do checklist" />
        </div>
        {concluido ? (
          <p className="suave" style={{ color: 'var(--cor-sucesso)', fontWeight: 'bold', margin: 0 }}>
            ✓ Todos os itens foram checados!
          </p>
        ) : (
          <p className="suave" style={{ margin: 0 }}>
            Marque cada item à medida que conferir em campo. Suas respostas ficam salvas no aparelho.
          </p>
        )}
      </section>

      <fieldset style={{ border: 'none', padding: 0, margin: '1rem 0' }}>
        <legend className="invisivel">Itens do checklist</legend>
        <ul className="lista-limpa">
          {checklist.itens.map((item, idx) => {
            const marcado = marcados.has(item.id);
            return (
              <li
                key={item.id}
                className={`cartao${marcado ? ' item-marcado' : ''}`}
                style={{
                  marginBottom: '0.75rem',
                  borderLeft: marcado ? '4px solid var(--cor-sucesso, #16a34a)' : undefined,
                  transition: 'background-color 0.2s',
                }}
              >
                <label
                  htmlFor={`chk-${item.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    fontSize: '0.98rem',
                  }}
                >
                  <input
                    type="checkbox"
                    id={`chk-${item.id}`}
                    checked={marcado}
                    onChange={() => alternar(item.id)}
                    style={{ marginTop: '0.2rem', width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                  />
                  <span>
                    <span className="suave" style={{ fontSize: '0.85rem' }}>
                      #{idx + 1}{' '}
                    </span>
                    <strong>{item.texto}</strong>
                  </span>
                </label>

                <details style={{ marginTop: '0.5rem', marginLeft: '2rem', fontSize: '0.88rem' }}>
                  <summary style={{ cursor: 'pointer', color: 'var(--cor-destaque)' }}>Por quê?</summary>
                  <p className="suave" style={{ marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                    {item.porque}
                  </p>
                  {item.fontes && item.fontes.length > 0 && (
                    <p className="suave" style={{ fontSize: '0.8rem', margin: 0 }}>
                      Fontes:{' '}
                      {item.fontes.map((fId, fIdx) => {
                        const fonteObj = (indice.fontes ?? []).find((f) => f.id === fId);
                        return (
                          <span key={fId}>
                            {fIdx > 0 ? ', ' : ''}
                            <span title={fonteObj?.titulo ?? fId}>
                              {fonteObj ? `${fonteObj.organizacao} (${fonteObj.titulo})` : fId}
                            </span>
                          </span>
                        );
                      })}
                    </p>
                  )}
                </details>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <section className="cartao" aria-labelledby="t-obs" style={{ marginTop: '1.5rem' }}>
        <h2 id="t-obs" style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
          Observações de campo / ocorrências
        </h2>
        <label htmlFor="campo-observacoes" className="invisivel">
          Anotações do local
        </label>
        <textarea
          id="campo-observacoes"
          rows={4}
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Ex.: Poste com traçado desviado no vão 12, caixa CTO-04 com borracha de vedação ressecada substituída..."
          style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem', borderRadius: '4px' }}
        />
      </section>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button type="button" className="botao" onClick={copiarTexto}>
          {copiado ? '✓ Copiado!' : 'Copiar como texto'}
        </button>
        <button type="button" className="botao botao-secundario" onClick={limpar}>
          Limpar marcações
        </button>
      </div>
    </>
  );
}
