import { Link } from 'react-router-dom';
import { AvisoSeguranca, useTitulo } from '../componentes/Comuns';
import { IconeChecklist } from '../componentes/Icones';
import { indice } from '../conteudo/carregar';
import { plural } from '../dominio/texto';

const ORDEM = ['antes-de-subir-no-poste', 'antes-da-fusao', 'inspecao-ceo-cto', 'aceite-de-obra'];

export function Campo() {
  useTitulo('Campo e Checklists');
  const checklists = [...(indice.checklists ?? [])].sort((a, b) => {
    const ia = ORDEM.indexOf(a.id);
    const ib = ORDEM.indexOf(b.id);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  return (
    <>
      <div className="migalhas">
        <Link to="/">Hoje</Link> <span>/</span> <span>Campo</span>
      </div>
      <h1>Checklists de campo</h1>
      <p className="suave">
        Roteiros práticos e conferências offline para postes, caixas de emenda, fusão e fiscalização de obras.
      </p>

      <AvisoSeguranca />

      <ul className="lista-limpa">
        {checklists.map((c) => (
          <li key={c.id} className="cartao cartao-destaque">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ color: 'var(--cor-destaque)', display: 'flex' }}>
                <IconeChecklist />
              </div>
              <h2 style={{ margin: 0 }}>
                <Link to={`/campo/${c.id}`}>{c.titulo}</Link>
              </h2>
            </div>
            {c.descricao && <p className="suave">{c.descricao}</p>}
            <p className="suave" style={{ fontSize: '0.85rem' }}>
              {plural(c.itens.length, 'item de verificação', 'itens de verificação')}
            </p>
            <Link to={`/campo/${c.id}`} className="botao">
              Abrir checklist
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
