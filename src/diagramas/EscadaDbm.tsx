import { Diagrama, type PropsDiagrama } from './Diagrama';

export function EscadaDbm({ descricao }: PropsDiagrama) {
  const passos = [
    { rotulo: 'sai', perda: 0, valor: 3 },
    { rotulo: 'conector −0,5', perda: 0.5, valor: 2.5 },
    { rotulo: '20 km −7', perda: 7, valor: -4.5 },
    { rotulo: 'emendas −0,4', perda: 0.4, valor: -4.9 },
    { rotulo: 'conector −0,5', perda: 0.5, valor: -5.4 },
  ];
  const y = (v: number) => 40 + ((4 - v) / 11) * 150;
  return (
    <Diagrama titulo="Potência descendo a cada perda (dB se somam)" descricao={descricao} viewBox="0 0 400 240">
      {passos.map((p, i) => {
        const x = 20 + i * 74;
        return (
          <g key={i}>
            <rect x={x} y={y(p.valor)} width="66" height={200 - y(p.valor)} className="d-barra-ok" opacity={0.85} />
            <text x={x + 33} y={y(p.valor) - 6} textAnchor="middle" className="d-texto d-forte">
              {p.valor > 0 ? `+${p.valor}` : String(p.valor).replace('.', ',').replace('-', '−')} dBm
            </text>
            <text x={x + 33} y="218" textAnchor="middle" className="d-texto" style={{ fontSize: 10 }}>
              {p.rotulo.replace('.', ',')}
            </text>
          </g>
        );
      })}
      <line x1="10" y1="200" x2="390" y2="200" className="d-eixo" />
      <text x="390" y="236" textAnchor="end" className="d-texto d-suave">perda total 8,4 dB → chega −5,4 dBm</text>
    </Diagrama>
  );
}
