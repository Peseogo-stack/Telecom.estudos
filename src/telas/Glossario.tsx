import { useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTitulo } from '../componentes/Comuns';
import { fontesPorId, indice } from '../conteudo/carregar';
import { normalizar } from '../dominio/busca';

export function Glossario() {
  useTitulo('Glossário');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const alvo = params.get('t');
  const destaque = useRef<HTMLLIElement>(null);

  const termos = useMemo(() => {
    const n = normalizar(q.trim());
    const ordenados = [...indice.glossario].sort((a, b) => (a.sigla ?? a.pt).localeCompare(b.sigla ?? b.pt, 'pt-BR'));
    if (!n) return ordenados;
    return ordenados.filter((t) => normalizar([t.sigla, t.pt, t.en, t.definicao].filter(Boolean).join(' ')).includes(n));
  }, [q]);

  useEffect(() => {
    destaque.current?.scrollIntoView({ block: 'center' });
    destaque.current?.focus();
  }, [alvo]);

  return (
    <>
      <h1>Glossário</h1>
      <label className="campo">
        <span>Buscar por sigla, português ou inglês</span>
        <input
          type="search"
          value={q}
          placeholder="ex.: SLA, zona controlada, workaround"
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        />
      </label>
      <p className="dica" aria-live="polite">
        {termos.length} termo(s).
      </p>
      <ul className="lista-limpa">
        {termos.map((t) => (
          <li
            key={t.id}
            id={`termo-${t.id}`}
            ref={t.id === alvo ? destaque : undefined}
            tabIndex={t.id === alvo ? -1 : undefined}
            className={`cartao${t.id === alvo ? ' cartao-destaque' : ''}`}
          >
            <h2 style={{ marginTop: 0 }}>
              {t.sigla ? `${t.sigla} — ` : ''}
              {t.pt}
            </h2>
            {t.en && (
              <p className="suave" lang="en">
                Em inglês: <em>{t.en}</em>
              </p>
            )}
            <p>{t.definicao}</p>
            <p className="dica">
              {t.licoes?.length ? (
                <>
                  Aparece em:{' '}
                  {t.licoes.map((l, i) => (
                    <span key={l}>
                      {i > 0 && ', '}
                      <Link to={`/licao/${l}`}>{l}</Link>
                    </span>
                  ))}
                  .{' '}
                </>
              ) : null}
              Fonte:{' '}
              {t.fontes.map((id, i) => {
                const f = fontesPorId.get(id);
                return (
                  <span key={id}>
                    {i > 0 && '; '}
                    {f ? (
                      <a href={f.url} target="_blank" rel="noopener noreferrer">
                        {f.organizacao.split(' (')[0]}
                      </a>
                    ) : (
                      id
                    )}
                  </span>
                );
              })}
              .
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
