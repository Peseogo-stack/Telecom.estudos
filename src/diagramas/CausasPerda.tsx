import { Diagrama, type PropsDiagrama } from './Diagrama';

// Curva ilustrativa (não é medida). Pontos marcados: médias de campo da ITU-T G.Sup39, Tabela 10-4.
export function CausasPerda({ descricao }: PropsDiagrama) {
  const x = (nm: number) => 40 + ((nm - 1260) / (1650 - 1260)) * 340;
  const y = (db: number) => 190 - (db / 0.6) * 160;
  const pontos: [number, number][] = [];
  for (let nm = 1260; nm <= 1650; nm += 10) {
    const rayleigh = 0.34 * (1310 / nm) ** 4;
    const agua = 0.16 * Math.exp(-(((nm - 1383) / 12) ** 2));
    const curva = nm > 1550 ? 0.0009 * (nm - 1550) ** 1.5 : 0;
    pontos.push([nm, rayleigh + agua + curva]);
  }
  const caminho = pontos.map(([nm, d], i) => `${i ? 'L' : 'M'}${x(nm).toFixed(1)} ${y(d).toFixed(1)}`).join(' ');
  return (
    <Diagrama titulo="Por que a luz se perde: espalhamento, água e curvatura" descricao={descricao} viewBox="0 0 400 240">
      <line x1="40" y1="190" x2="385" y2="190" className="d-eixo" />
      <line x1="40" y1="20" x2="40" y2="190" className="d-eixo" />
      <text x="4" y="16" className="d-texto d-suave">dB/km</text>
      {[1310, 1383, 1550, 1625].map((nm) => (
        <text key={nm} x={x(nm)} y="206" textAnchor="middle" className="d-texto d-suave">
          {nm}
        </text>
      ))}
      <path d={caminho} className="d-traco" />
      <circle cx={x(1310)} cy={y(0.341)} r="5" className="d-marco" />
      <text x={x(1310) + 8} y={y(0.341) - 8} className="d-texto">0,34</text>
      <circle cx={x(1550)} cy={y(0.194)} r="5" className="d-marco" />
      <text x={x(1550) - 8} y={y(0.194) + 20} textAnchor="end" className="d-texto">0,19</text>
      <text x={x(1383)} y={y(0.5) - 6} textAnchor="middle" className="d-texto">água</text>
      <text x={x(1290)} y={y(0.52)} className="d-texto">espalhamento ↘</text>
      <text x={x(1640)} y={y(0.42)} textAnchor="end" className="d-texto d-alerta">curvatura ↗</text>
      <text x="40" y="232" className="d-texto d-suave">Curva ilustrativa. Pontos: médias medidas em redes reais (ITU).</text>
    </Diagrama>
  );
}
