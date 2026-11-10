import { Diagrama, type PropsDiagrama } from './Diagrama';

// Esquema (não é mapa): duas zonas UTM lado a lado, o Equador e um ponto fictício ao norte dele,
// lido com falso norte 10.000.000 m (20S, 31980) ou 0 m (20N, 31974).
export function ZonasUtmRoraima({ descricao }: PropsDiagrama) {
  const zona = (x: number, nome: string, faixa: string, meridiano: string) => (
    <g>
      <rect x={x} y="8" width="190" height="262" rx="6" className="d-caixa" />
      <text x={x + 10} y="28" className="d-texto d-forte" style={{ fontSize: 13 }}>{nome}</text>
      <text x={x + 10} y="44" className="d-texto">{faixa}</text>
      <text x={x + 10} y="60" className="d-texto">{meridiano}</text>
    </g>
  );
  return (
    <Diagrama titulo="Zonas UTM 20 e 21 e o falso norte" descricao={descricao} viewBox="0 0 400 352">
      {zona(6, 'Zona 20', 'de 66°O a 60°O', 'meridiano central 63°O')}
      {zona(204, 'Zona 21', 'de 60°O a 54°O', 'meridiano central 57°O')}

      {/* Equador */}
      <line x1="6" y1="190" x2="394" y2="190" className="d-linha-grossa" />
      <text x="388" y="184" textAnchor="end" className="d-texto d-forte">Equador</text>

      {/* ponto fictício e os dois rótulos de N */}
      <circle cx="24" cy="84" r="6" className="d-ponto" />
      <text x="36" y="88" className="d-texto d-forte">ponto fictício, 3,40° N</text>
      <text x="36" y="108" className="d-texto">20S (31980):</text>
      <text x="36" y="124" className="d-texto d-forte">N = 10.375.911 m</text>
      <text x="36" y="144" className="d-texto">20N (31974):</text>
      <text x="36" y="160" className="d-texto d-forte">N = 375.911 m</text>

      {/* cidades (marcas, sem coordenadas exatas) */}
      <circle cx="172" cy="172" r="5" className="d-marco" />
      <text x="162" y="176" textAnchor="end" className="d-texto">Boa Vista</text>
      <circle cx="250" cy="172" r="5" className="d-marco" />
      <text x="260" y="176" className="d-texto">Bonfim</text>

      {/* seta longa para baixo */}
      <line x1="24" y1="92" x2="24" y2="254" className="d-linha" />
      <path d="M24 264 L18 252 L30 252 Z" className="d-seta" />
      <text x="36" y="218" className="d-texto d-alerta">lido com o falso</text>
      <text x="36" y="234" className="d-texto d-alerta">norte errado:</text>
      <text x="36" y="250" className="d-texto d-alerta">10.000 km ao sul</text>

      {/* nota */}
      <rect x="6" y="282" width="388" height="62" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="200" y="304" textAnchor="middle" className="d-texto d-forte">No Brasil, a 20S vale ao norte</text>
      <text x="200" y="322" textAnchor="middle" className="d-texto d-forte">e ao sul do Equador (EPSG).</text>
      <text x="200" y="338" textAnchor="middle" className="d-texto d-suave">Esquema, não é um mapa.</text>
    </Diagrama>
  );
}
