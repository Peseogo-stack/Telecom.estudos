import { Diagrama, type PropsDiagrama } from './Diagrama';

// Escala: 1 mm = 3,6 unidades. Círculos centrados à esquerda.
// G.657 (08/2024): a antiga B2 foi fundida na A2, por isso não aparece.
export function RaiosCurvatura({ descricao }: PropsDiagrama) {
  const e = 3.6;
  const cx = 130;
  const cy = 130;
  const raios = [
    { r: 30, rotulo: 'G.652.D: teste a 30 mm' },
    { r: 10, rotulo: 'G.657.A1: 10 mm' },
    { r: 7.5, rotulo: 'G.657.A2: 7,5 mm' },
    { r: 5, rotulo: 'G.657.B3: 5 mm' },
  ];
  return (
    <Diagrama titulo="Raio mínimo de curvatura (em escala)" descricao={descricao} viewBox="0 0 400 260">
      {raios.map((x, i) => (
        <g key={x.r}>
          <circle cx={cx} cy={cy} r={x.r * e} className={i === 0 ? 'd-caixa' : 'd-caixa-destaque'} fill="none" />
          <line x1={cx + x.r * e} y1={cy} x2="262" y2={40 + i * 50} className="d-linha" />
          <text x="266" y={44 + i * 50} className="d-texto">
            {x.rotulo}
          </text>
        </g>
      ))}
      <text x="10" y="252" className="d-texto d-suave">Quanto menor o círculo, mais a fibra tolera curva.</text>
    </Diagrama>
  );
}
