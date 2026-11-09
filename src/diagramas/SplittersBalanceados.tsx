import { Diagrama, type PropsDiagrama } from './Diagrama';

// Comparativo entre a perda teórica por divisão de potência 10*log10(N)
// e a atenuação máxima de catálogo das fichas técnicas (Intelbras, SENKO e FS).
const SPLITTERS = [
  { n: '1:2', teorico: '3,01', fichas: '4,0–4,4', pot: '50%' },
  { n: '1:4', teorico: '6,02', fichas: '7,3–7,6', pot: '25%' },
  { n: '1:8', teorico: '9,03', fichas: '10,5–10,9', pot: '12,5%' },
  { n: '1:16', teorico: '12,04', fichas: '13,7–13,9', pot: '6,25%' },
  { n: '1:32', teorico: '15,05', fichas: '16,9–17,3', pot: '3,12%' },
  { n: '1:64', teorico: '18,06', fichas: '21,0–21,4', pot: '1,56%' },
];

export function SplittersBalanceados({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Splitters balanceados PLC: divisão teórica 10·log10(N) × valores máximos de catálogo"
      descricao={descricao}
      viewBox="0 0 400 382"
    >
      {/* Topo: Fórmula teórica */}
      <rect x="10" y="8" width="380" height="50" rx="8" className="d-caixa-destaque" />
      <text x="200" y="27" textAnchor="middle" className="d-texto d-forte">
        Perda = 10 · log₁₀(N) + perda em excesso + conector
      </text>
      <text x="200" y="46" textAnchor="middle" className="d-texto d-suave">
        Cada divisão por 2 adiciona ~3,01 dB de perda teórica
      </text>

      {/* Grade com os 6 splitters, 2 colunas */}
      {SPLITTERS.map((s, i) => {
        const x = 10 + (i % 2) * 196;
        const y = 66 + Math.floor(i / 2) * 86;
        const cx = x + 92;
        return (
          <g key={s.n}>
            <rect x={x} y={y} width="184" height="78" rx="6" className="d-caixa" />
            <text x={cx} y={y + 18} textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 13 }}>
              Splitter {s.n}
            </text>
            <text x={cx} y={y + 36} textAnchor="middle" className="d-texto d-suave">
              Teórico: {s.teorico} dB
            </text>
            <text x={cx} y={y + 54} textAnchor="middle" className="d-texto d-alerta">
              Fichas: {s.fichas} dB
            </text>
            <text x={cx} y={y + 70} textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 11 }}>
              ({s.pot} potência p/ porta)
            </text>
          </g>
        );
      })}

      {/* Faixa inferior: Regra de projeto */}
      <rect x="10" y="326" width="380" height="48" rx="6" className="d-zona-controlada" />
      <text x="200" y="345" textAnchor="middle" className="d-texto d-forte">
        Regra de projeto: no orçamento use o MÁXIMO da ficha
      </text>
      <text x="200" y="363" textAnchor="middle" className="d-texto d-suave">
        Fichas sem conectores: some 0,2 a 0,3 dB por conector
      </text>
    </Diagrama>
  );
}
