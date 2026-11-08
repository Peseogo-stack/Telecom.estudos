import { Diagrama, type PropsDiagrama } from './Diagrama';

// Comparativo entre a perda teórica por divisão de potência 10*log10(N)
// e a atenuação máxima de catálogo das fichas técnicas (Intelbras, SENKO e FS).
export function SplittersBalanceados({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Splitters balanceados PLC: divisão teórica 10·log10(N) × valores máximos de catálogo"
      descricao={descricao}
      viewBox="0 0 400 248"
    >
      {/* Topo: Fórmula teórica */}
      <rect x="10" y="8" width="380" height="42" rx="8" className="d-caixa-destaque" />
      <text x="200" y="24" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10 }}>
        Perda = 10 · log₁₀(N) + perda em excesso + conector
      </text>
      <text x="200" y="40" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Cada divisão por 2 adiciona ~3,01 dB de perda teórica de potência
      </text>

      {/* Grade com os 6 splitters principais */}
      {/* 1:2 */}
      <rect x="10" y="56" width="122" height="66" rx="6" className="d-caixa" />
      <text x="71" y="73" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Splitter 1:2
      </text>
      <text x="71" y="88" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Teórico: 3,01 dB
      </text>
      <text x="71" y="104" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        Ficha: ≤ 4,0 dB
      </text>
      <text x="71" y="116" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 7.5 }}>
        (50% potência p/ porta)
      </text>

      {/* 1:4 */}
      <rect x="139" y="56" width="122" height="66" rx="6" className="d-caixa" />
      <text x="200" y="73" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Splitter 1:4
      </text>
      <text x="200" y="88" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Teórico: 6,02 dB
      </text>
      <text x="200" y="104" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        Ficha: ≤ 7,4 dB
      </text>
      <text x="200" y="116" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 7.5 }}>
        (25% potência p/ porta)
      </text>

      {/* 1:8 */}
      <rect x="268" y="56" width="122" height="66" rx="6" className="d-caixa" />
      <text x="329" y="73" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Splitter 1:8
      </text>
      <text x="329" y="88" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Teórico: 9,03 dB
      </text>
      <text x="329" y="104" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        Ficha: ≤ 10,7 dB
      </text>
      <text x="329" y="116" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 7.5 }}>
        (12,5% potência p/ porta)
      </text>

      {/* 1:16 */}
      <rect x="10" y="128" width="122" height="66" rx="6" className="d-caixa" />
      <text x="71" y="145" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Splitter 1:16
      </text>
      <text x="71" y="160" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Teórico: 12,04 dB
      </text>
      <text x="71" y="176" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        Ficha: ≤ 13,7 dB
      </text>
      <text x="71" y="188" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 7.5 }}>
        (6,25% potência p/ porta)
      </text>

      {/* 1:32 */}
      <rect x="139" y="128" width="122" height="66" rx="6" className="d-caixa" />
      <text x="200" y="145" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Splitter 1:32
      </text>
      <text x="200" y="160" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Teórico: 15,05 dB
      </text>
      <text x="200" y="176" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        Ficha: ≤ 17,0 dB
      </text>
      <text x="200" y="188" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 7.5 }}>
        (3,12% potência p/ porta)
      </text>

      {/* 1:64 */}
      <rect x="268" y="128" width="122" height="66" rx="6" className="d-caixa" />
      <text x="329" y="145" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Splitter 1:64
      </text>
      <text x="329" y="160" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Teórico: 18,06 dB
      </text>
      <text x="329" y="176" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        Ficha: ≤ 21,4 dB
      </text>
      <text x="329" y="188" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 7.5 }}>
        (1,56% potência p/ porta)
      </text>

      {/* Faixa inferior: Regra de ouro de projeto */}
      <rect x="10" y="200" width="380" height="40" rx="6" className="d-zona-controlada" />
      <text x="200" y="215" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9 }}>
        Regra de projeto: no orçamento use o MÁXIMO da ficha
      </text>
      <text x="200" y="230" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8 }}>
        Conectores SC/APC: somar 0,2 a 0,3 dB por conector na conta
      </text>
    </Diagrama>
  );
}
