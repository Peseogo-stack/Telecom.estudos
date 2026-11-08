import { Diagrama, type PropsDiagrama } from './Diagrama';

// Anatomia completa de uma rede FTTH/PON da OLT até a ONU,
// comparando divisão centralizada e distribuída (cascateada).
export function AnatomiaFtth({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Anatomia da rede FTTH: caminho óptico da OLT até a ONU e topologias"
      descricao={descricao}
      viewBox="0 0 400 248"
    >
      {/* Bloco 1: Central / OLT / DIO */}
      <rect x="10" y="10" width="118" height="92" rx="8" className="d-caixa-destaque" />
      <text x="69" y="27" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        1. Subestação
      </text>
      <text x="69" y="44" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>
        OLT + DIO
      </text>
      <text x="69" y="60" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Down: 1490 nm
      </text>
      <text x="69" y="74" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Up: 1310 nm
      </text>
      <text x="69" y="89" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 8.5 }}>
        Alimentador
      </text>

      {/* Seta 1 para 2 */}
      <line x1="128" y1="56" x2="140" y2="56" className="d-cota" markerEnd="url(#d-seta)" />

      {/* Bloco 2: Rede externa / CEO / CTO */}
      <rect x="141" y="10" width="118" height="92" rx="8" className="d-caixa" />
      <text x="200" y="27" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        2. Planta externa
      </text>
      <text x="200" y="44" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>
        CEO → CTO
      </text>
      <text x="200" y="60" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        CEO: 1º splitter
      </text>
      <text x="200" y="74" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        CTO: no poste
      </text>
      <text x="200" y="89" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 8.5 }}>
        Cabo drop
      </text>

      {/* Seta 2 para 3 */}
      <line x1="259" y1="56" x2="271" y2="56" className="d-cota" markerEnd="url(#d-seta)" />

      {/* Bloco 3: Cliente / PTO / ONU */}
      <rect x="272" y="10" width="118" height="92" rx="8" className="d-caixa-destaque" />
      <text x="331" y="27" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        3. Cliente
      </text>
      <text x="331" y="44" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>
        PTO → ONU
      </text>
      <text x="331" y="60" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        PTO: roseta
      </text>
      <text x="331" y="74" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Cordão SC/APC
      </text>
      <text x="331" y="89" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 8.5 }}>
        Porta Ethernet
      </text>

      {/* Faixa inferior: Divisão centralizada × distribuída */}
      <rect x="10" y="112" width="380" height="126" rx="8" className="d-zona-controlada" />
      <text x="200" y="128" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10 }}>
        Topologias de divisão óptica na ODN
      </text>

      {/* Caixa esquerda: Centralizada */}
      <rect x="18" y="136" width="178" height="94" rx="6" className="d-caixa" />
      <text x="107" y="152" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        Divisão centralizada (1 nível)
      </text>
      <text x="26" y="170" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        • 1 splitter 1:32 / 1:64 na CEO
      </text>
      <text x="26" y="186" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        • CTO só conectoriza os drops
      </text>
      <text x="26" y="202" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        • OTDR acha falhas com facilidade
      </text>
      <text x="26" y="218" className="d-texto d-forte" style={{ fontSize: 8.5 }}>
        • Mais fibras nos cabos aéreos
      </text>

      {/* Caixa direita: Distribuída / Cascata */}
      <rect x="204" y="136" width="178" height="94" rx="6" className="d-caixa" />
      <text x="293" y="152" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        Divisão distribuída (2 níveis)
      </text>
      <text x="212" y="170" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        • 1º nível (CEO) + 2º nível (CTO)
      </text>
      <text x="212" y="186" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        • 1:8 + 1:8 atende até 64 ONUs
      </text>
      <text x="212" y="202" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        • Economiza cabos na rota troncal
      </text>
      <text x="212" y="218" className="d-texto d-forte" style={{ fontSize: 8.5 }}>
        • OTDR cego após 2º nível
      </text>
    </Diagrama>
  );
}
