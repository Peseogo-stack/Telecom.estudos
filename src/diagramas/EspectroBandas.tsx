import { Diagrama, type PropsDiagrama } from './Diagrama';

export function EspectroBandas({ descricao }: PropsDiagrama) {
  const x = (nm: number) => 20 + ((nm - 1250) / (1680 - 1250)) * 370;
  const bandas = [
    ['O', 1260, 1360],
    ['E', 1360, 1460],
    ['S', 1460, 1530],
    ['C', 1530, 1565],
    ['L', 1565, 1625],
    ['U', 1625, 1675],
  ] as const;
  const marcas = [
    [1270, 'XGS ↑', 0],
    [1310, 'GPON ↑', 1],
    [1490, 'GPON ↓', 0],
    [1550, 'longa dist.', 1],
    [1577, 'XGS ↓', 0],
    [1625, 'teste', 1],
    [1650, 'manutenção', 0],
  ] as const;
  return (
    <Diagrama titulo="Bandas da fibra monomodo e quem usa cada comprimento de onda" descricao={descricao} viewBox="0 0 400 220">
      {bandas.map(([b, a, z], i) => (
        <g key={b}>
          <rect x={x(a)} y="90" width={x(z) - x(a)} height="40" className={i % 2 ? 'd-caixa' : 'd-caixa-destaque'} />
          <text x={(x(a) + x(z)) / 2} y="115" textAnchor="middle" className="d-texto d-forte">
            {b}
          </text>
        </g>
      ))}
      {marcas.map(([nm, rot, alto]) => (
        <g key={nm}>
          {/* A linha para na borda de cima da faixa, para não cobrir a letra da banda. */}
          <line x1={x(nm)} y1={alto ? 60 : 70} x2={x(nm)} y2="90" className="d-cabo-telecom" />
          <circle cx={x(nm)} cy="90" r="3" className="d-marco" />
          <text x={x(nm)} y={alto ? 52 : 26} textAnchor="middle" className="d-texto">
            {rot}
          </text>
          <text x={x(nm)} y={alto ? 40 : 14} textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 10 }}>
            {nm}
          </text>
        </g>
      ))}
      <line x1="20" y1="150" x2="390" y2="150" className="d-eixo" />
      {[1300, 1400, 1500, 1600].map((nm) => (
        <text key={nm} x={x(nm)} y="166" textAnchor="middle" className="d-texto d-suave">
          {nm}
        </text>
      ))}
      <text x="390" y="184" textAnchor="end" className="d-texto d-suave">nm</text>
      <text x="20" y="208" className="d-texto">← 850 nm (multimodo) fica fora deste eixo</text>
    </Diagrama>
  );
}
