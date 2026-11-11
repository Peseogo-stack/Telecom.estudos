import { Diagrama, type PropsDiagrama } from './Diagrama';

// Corte de um cabo autossustentado de tubos loose (fora de escala), com as partes numeradas.
// Embaixo, as camadas do cabo de duto com proteção contra roedores (ficha Furukawa).
const CX = 200;
const CY = 140;
const R_TUBO = 22;
const R_ANEL = 50;

function Numero({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" className="d-marco" />
      <text x={x} y={y + 4} textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11, fill: 'var(--sobre-royal)' }}>
        {n}
      </text>
    </g>
  );
}

export function CorteCabo({ descricao }: PropsDiagrama) {
  const tubos = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3;
    return { x: CX + R_ANEL * Math.cos(a), y: CY + R_ANEL * Math.sin(a) };
  });
  // fios hidroexpansíveis: nos vãos entre os tubos
  const hidro = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = -Math.PI / 2 + Math.PI / 6 + (i * Math.PI) / 3;
    return { x: CX + 62 * Math.cos(a), y: CY + 62 * Math.sin(a) };
  });
  const fibras = [
    [-8, -7],
    [0, -9],
    [8, -7],
    [-9, 1],
    [0, 0],
    [9, 1],
    [-6, 8],
    [6, 8],
  ];
  const legenda = [
    'Capa externa: preta, resistente a UV',
    'Fio de rasgamento (ripcord): abre a capa',
    'Aramida: o elemento de tração',
    'Fios hidroexpansíveis: barram a água',
    'Tubo loose: 2 a 12 fibras soltas (gel ou seco)',
    'Elemento central (FRP): evita a contração',
  ];
  return (
    <Diagrama titulo="Por dentro de um cabo de tubos loose" descricao={descricao} viewBox="0 0 400 476">
      {/* capa e aramida */}
      <circle cx={CX} cy={CY} r="112" className="d-capa-cabo" />
      <circle cx={CX} cy={CY} r="100" className="d-caixa" style={{ strokeDasharray: '3 3', strokeWidth: 4 }} />
      <circle cx={CX} cy={CY} r="88" className="d-caixa" />
      {/* fio de rasgamento */}
      <circle cx={CX + 100 * Math.cos(-0.5)} cy={CY + 100 * Math.sin(-0.5)} r="6" className="d-ponto" />
      {/* hidroexpansíveis */}
      {hidro.map((h, i) => (
        <circle key={i} cx={h.x} cy={h.y} r="6" className="d-faixa-vigente" style={{ stroke: 'var(--royal)', strokeWidth: 1 }} />
      ))}
      {/* tubos com fibras */}
      {tubos.map((t, i) => (
        <g key={i}>
          <circle cx={t.x} cy={t.y} r={R_TUBO} className="d-caixa-destaque" />
          {fibras.map(([dx, dy], k) => (
            <circle key={k} cx={t.x + dx} cy={t.y + dy} r="2.6" className="d-seta" />
          ))}
        </g>
      ))}
      {/* elemento central */}
      <circle cx={CX} cy={CY} r="18" className="d-poste" />
      {/* números sobre as partes */}
      <Numero x={CX - 106} y={CY - 30} n={1} />
      <Numero x={CX + 100 * Math.cos(-0.5) + 16} y={CY + 100 * Math.sin(-0.5) - 12} n={2} />
      <Numero x={CX - 94} y={CY + 52} n={3} />
      <Numero x={hidro[2].x + 4} y={hidro[2].y + 16} n={4} />
      <Numero x={tubos[0].x + 30} y={tubos[0].y - 6} n={5} />
      <Numero x={CX} y={CY} n={6} />
      {legenda.map((t, i) => (
        <g key={t}>
          <Numero x={16} y={276 + i * 22} n={i + 1} />
          <text x={32} y={280 + i * 22} className="d-texto">
            {t}
          </text>
        </g>
      ))}
      {/* cabo de duto anti-roedor */}
      <text x="4" y="418" className="d-texto d-forte">
        Duto com proteção contra roedores (Furukawa)
      </text>
      <rect x="4" y="428" width="392" height="40" rx="6" className="d-capa-cabo" />
      <rect x="18" y="434" width="364" height="28" rx="4" className="d-faixa-vigente" style={{ stroke: 'var(--royal)' }} />
      <rect x="40" y="440" width="320" height="16" rx="3" className="d-caixa" />
      <text x="200" y="452" textAnchor="middle" className="d-texto" style={{ fontSize: 11 }}>
        capa interna → fibra de vidro 1,3 mm → capa externa
      </text>
    </Diagrama>
  );
}
