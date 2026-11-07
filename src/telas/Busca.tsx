import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useEstado } from '../app/EstadoApp';
import { useTitulo } from '../componentes/Comuns';
import { indice } from '../conteudo/carregar';
import { type ItemBusca, buscar, normalizar } from '../dominio/busca';
import { plural } from '../dominio/texto';

const ROTULOS: Record<ItemBusca['tipo'], string> = {
  licao: 'Lições',
  termo: 'Glossário',
  ferramenta: 'Ferramentas',
  checklist: 'Checklists',
  caderno: 'Meu caderno',
};

function Destacar({ texto, consulta }: { texto: string; consulta: string }) {
  const termo = normalizar(consulta.trim().split(/\s+/)[0] ?? '');
  if (termo.length < 2) return <>{texto}</>;
  const i = normalizar(texto).indexOf(termo);
  if (i < 0) return <>{texto}</>;
  return (
    <>
      {texto.slice(0, i)}
      <mark>{texto.slice(i, i + termo.length)}</mark>
      {texto.slice(i + termo.length)}
    </>
  );
}

export function Busca() {
  useTitulo('Buscar');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const { estado } = useEstado();

  const resultados = useMemo(() => {
    const doCaderno: ItemBusca[] = [
      ...estado.caderno.notas.map((n) => ({ tipo: 'caderno' as const, id: n.id, titulo: n.titulo || 'Nota sem título', texto: n.texto, rota: '/caderno' })),
      ...Object.entries(estado.caderno.campos)
        .filter(([, v]) => v.trim())
        .map(([k, v]) => ({ tipo: 'caderno' as const, id: k, titulo: `Campo: ${k}`, texto: v, rota: '/caderno' })),
      ...estado.caderno.perguntas.map((p) => ({ tipo: 'caderno' as const, id: p.id, titulo: p.texto, texto: p.resposta, rota: '/caderno' })),
    ];
    return buscar([...indice.busca, ...doCaderno], q);
  }, [q, estado.caderno]);

  const grupos = (Object.keys(ROTULOS) as ItemBusca['tipo'][])
    .map((tipo) => ({ tipo, itens: resultados.filter((r) => r.tipo === tipo) }))
    .filter((g) => g.itens.length);

  return (
    <>
      <h1>Buscar</h1>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label className="campo">
          <span>Procurar em lições, glossário, ferramentas e no seu caderno</span>
          <input
            type="search"
            autoFocus
            value={q}
            placeholder="ex.: glosa, zona controlada, OTDR"
            onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
          />
        </label>
      </form>
      <p className="dica" aria-live="polite">
        {q.trim().length >= 2 ? `${plural(resultados.length, 'resultado', 'resultados')}.` : 'Digite pelo menos 2 letras. Acentos não importam.'}
      </p>
      {grupos.map((g) => (
        <section key={g.tipo} className="cartao" aria-labelledby={`g-${g.tipo}`}>
          <h2 id={`g-${g.tipo}`}>{ROTULOS[g.tipo]}</h2>
          <ul className="lista-limpa">
            {g.itens.map((r) => (
              <li key={`${r.tipo}-${r.id}`}>
                <Link to={r.rota} className="item-lista">
                  <span className="meio">
                    <span className="titulo-item">
                      <Destacar texto={r.titulo} consulta={q} />
                    </span>
                    <br />
                    <span className="suave">
                      <Destacar texto={r.trecho} consulta={q} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
