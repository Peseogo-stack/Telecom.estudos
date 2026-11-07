import { Diagrama, type PropsDiagrama } from './Diagrama';

// Curva ilustrativa (não é medida). Pontos marcados: médias da ITU-T G.Sup39, Tabela 10-4
// (núcleo de rede de uma operadora). A curva reta é ajustada para passar por eles
// (A/λ⁴ + B), e o pico d'água fica abaixo do teto de 0,40 dB/km da G.652.D.
export function CausasPerda({ descricao }: PropsDiagrama) {
  const x = (nm: number) => 40 + ((nm - 1260) / (1650 - 1260)) * 340;
  const y = (db: number) => 190 - (db / 0.6) * 160;
  const reta = (nm: number) => 0.2993 * (1310 / nm) ** 4 + 0.042 + 0.08 * Math.exp(-(((nm - 1383) / 12) ** 2));
  const curvatura = (nm: number) => (nm > 1550 ? 0.000025 * (nm - 1550) ** 2 : 0);
  const caminho = (f: (nm: number) => number, de: number) => {
    const p: string[] = [];
    for (let nm = de; nm <= 1650; nm += 10) p.push(`${p.length ? 'L' : 'M'}${x(nm).toFixed(1)} ${y(f(nm)).toFixed(1)}`);
    return p.join(' ');
  };
  return (
    <Diagrama titulo="Por que a luz se perde: espalhamento, água e curvatura" descricao={descricao} viewBox="0 0 400 256">
      <line x1="40" y1="190" x2="385" y2="190" className="d-eixo" />
      <line x1="40" y1="20" x2="40" y2="190" className="d-eixo" />
      <text x="4" y="16" className="d-texto d-suave">dB/km</text>
      {[1310, 1383, 1550, 1625].map((nm) => (
        <text key={nm} x={x(nm)} y="206" textAnchor="middle" className="d-texto d-suave">
          {nm}
        </text>
      ))}
      <path d={caminho(reta, 1260)} className="d-traco" />
      <path d={caminho((nm) => reta(nm) + curvatura(nm), 1550)} className="d-traco d-traco-curva" />
      <circle cx={x(1310)} cy={y(0.341)} r="5" className="d-marco" />
      <text x={x(1310) + 8} y={y(0.341) - 8} className="d-texto">0,34</text>
      <circle cx={x(1550)} cy={y(0.194)} r="5" className="d-marco" />
      <text x={x(1550) - 8} y={y(0.194) + 20} textAnchor="end" className="d-texto">0,19</text>
      <text x={x(1383)} y={y(0.42)} textAnchor="middle" className="d-texto">água</text>
      <text x={x(1290)} y={y(0.52)} className="d-texto">espalhamento ↘</text>
      <text x={x(1648)} y={y(0.47)} textAnchor="end" className="d-texto d-alerta">com curvatura ↗</text>
      <text x="40" y="232" className="d-texto d-suave">Curva ilustrativa. Pontos: médias medidas no núcleo</text>
      <text x="40" y="248" className="d-texto d-suave">de rede de uma operadora (ITU-T G.Sup39).</text>
    </Diagrama>
  );
}
