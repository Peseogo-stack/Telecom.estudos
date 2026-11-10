import { Diagrama, type PropsDiagrama } from './Diagrama';

// Noves de disponibilidade (barras em escala linear) e anel com um enlace rompido.
export function AnelNoves({ descricao }: PropsDiagrama) {
  // 8,76 h = barra inteira (380 unidades); as outras seguem a mesma escala.
  const barras: [string, string, number][] = [
    ['99,9%', '8,76 h', 380],
    ['99,99%', '52,6 min', 380 / 10],
    ['99,999%', '5,26 min', 380 / 100],
  ];
  const cx = 200;
  const cy = 318;
  const r = 80;
  const ang = (k: number) => ((-90 + 60 * k) * Math.PI) / 180;
  const nos = [0, 1, 2, 3, 4, 5].map((k) => ({ x: cx + r * Math.cos(ang(k)), y: cy + r * Math.sin(ang(k)) }));
  const meio = { x: (nos[0].x + nos[1].x) / 2, y: (nos[0].y + nos[1].y) / 2 };
  // caminho de volta: do nó 0 pelo lado esquerdo até o nó 1
  const volta = [0, 5, 4, 3, 2, 1].map((k) => `${nos[k].x},${nos[k].y}`).join(' ');
  // ponta de seta no último trecho (nó 2 para nó 1), a 60% do caminho
  const [a, b] = [nos[2], nos[1]];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const px = a.x + dx * 0.6;
  const py = a.y + dy * 0.6;
  const seta = `${px + ux * 9},${py + uy * 9} ${px - ux * 5 - uy * 8},${py - uy * 5 + ux * 8} ${px - ux * 5 + uy * 8},${py - uy * 5 - ux * 8}`;
  return (
    <Diagrama titulo="Noves de disponibilidade e anel com falha" descricao={descricao} viewBox="0 0 400 440">
      <text x="4" y="18" className="d-texto d-forte">Parada máxima por ano</text>
      <text x="396" y="18" textAnchor="end" className="d-texto d-suave">escala linear</text>
      {barras.map(([nome, valor, w], i) => {
        const y = 36 + i * 44;
        return (
          <g key={nome}>
            <text x="4" y={y + 10} className="d-texto">
              {nome}: <tspan className="d-forte">{valor}</tspan>
            </text>
            <rect x="4" y={y + 18} width={Math.max(w, 3)} height="12" className="d-barra-parada" />
          </g>
        );
      })}
      <text x="4" y="176" className="d-texto d-suave">Cada nove a mais: parada dividida por 10.</text>

      {/* anel */}
      <text x="4" y="212" className="d-texto d-forte">Anel com um enlace rompido</text>
      {nos.map((n, i) => (
        <line key={i} x1={n.x} y1={n.y} x2={nos[(i + 1) % 6].x} y2={nos[(i + 1) % 6].y} className="d-linha" opacity={i === 0 ? 0 : 1} />
      ))}
      <polyline points={volta} className="d-cabo-telecom" fill="none" strokeLinejoin="round" />
      <polygon points={seta} className="d-marco" />
      {nos.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="15" className="d-caixa d-caixa-destaque" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>SW</text>
        </g>
      ))}
      <line x1={meio.x - 7} y1={meio.y - 7} x2={meio.x + 7} y2={meio.y + 7} className="d-cabo-bt" />
      <line x1={meio.x - 7} y1={meio.y + 7} x2={meio.x + 7} y2={meio.y - 7} className="d-cabo-bt" />
      <text x="262" y="232" className="d-texto d-alerta">enlace rompido</text>
      <text x="4" y="300" className="d-texto">tráfego dá a</text>
      <text x="4" y="316" className="d-texto">volta pelo</text>
      <text x="4" y="332" className="d-texto">outro lado</text>
      <text x="4" y="432" className="d-texto d-alerta">Os dois caminhos só protegem se não caírem juntos.</text>
    </Diagrama>
  );
}
