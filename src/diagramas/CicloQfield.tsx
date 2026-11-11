import { Diagrama, type PropsDiagrama } from './Diagrama';

// Esquema (não é mapa): o ciclo QGIS ► aparelho ► campo ► QGIS, com a volta "nova coleta = novo pacote"
// e a faixa que lembra de preparar o mapa de fundo e as camadas offline antes, no computador.
const seta = (x: number, y: number) => <path d={`M${x - 6} ${y - 9} L${x + 6} ${y - 9} L${x} ${y} Z`} className="d-seta" />;

const passos: { y: number; titulo: string; sub: string; destaque?: boolean }[] = [
  { y: 6, titulo: '1. QGIS: preparar e empacotar', sub: 'QFieldSync ► Package for QField', destaque: true },
  { y: 68, titulo: '2. Copiar a pasta para o aparelho', sub: 'cabo ou cópia local, ou QFieldCloud' },
  { y: 130, titulo: '3. Campo: coletar com o QField', sub: 'sem internet', destaque: true },
  { y: 192, titulo: '4. Copiar a pasta de volta', sub: 'para o computador' },
  { y: 254, titulo: '5. QGIS: Synchronize from QField', sub: 'uma vez por pacote', destaque: true },
];

export function CicloQfield({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="O ciclo do QField" descricao={descricao} viewBox="0 0 400 392">
      {passos.map((p, i) => (
        <g key={p.y}>
          <rect x="6" y={p.y} width="338" height="46" rx="6" className={p.destaque ? 'd-caixa d-caixa-destaque' : 'd-caixa'} />
          <text x="175" y={p.y + 20} textAnchor="middle" className="d-texto d-forte">{p.titulo}</text>
          <text x="175" y={p.y + 37} textAnchor="middle" className="d-texto">{p.sub}</text>
          {i < passos.length - 1 && (
            <>
              <line x1="175" y1={p.y + 46} x2="175" y2={p.y + 54} className="d-linha-grossa" />
              {seta(175, p.y + 62)}
            </>
          )}
        </g>
      ))}

      {/* volta: do 5 ao 1 */}
      <line x1="344" y1="277" x2="376" y2="277" className="d-linha-grossa" />
      <line x1="376" y1="277" x2="376" y2="29" className="d-linha-grossa" />
      <line x1="376" y1="29" x2="352" y2="29" className="d-linha-grossa" />
      <path d="M354 23 L354 35 L344 29 Z" className="d-seta" />
      <text x="6" y="322" className="d-texto d-forte">Do 5 volta ao 1: nova coleta = novo pacote.</text>

      {/* faixa */}
      <rect x="6" y="334" width="388" height="52" rx="6" className="d-caixa d-caixa-tracejada" />
      <text x="200" y="356" textAnchor="middle" className="d-texto d-alerta">Mapa de fundo e camadas offline são</text>
      <text x="200" y="374" textAnchor="middle" className="d-texto d-alerta">preparados antes, no computador.</text>
    </Diagrama>
  );
}
