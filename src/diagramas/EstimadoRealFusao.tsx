import { Diagrama, type PropsDiagrama } from './Diagrama';

// Comparação entre perda estimada na tela da máquina e medição real bidirecional no OTDR,
// mais régua de referência de perdas de emenda (0,03 a 0,30 dB).
export function EstimadoRealFusao({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Perda estimada na máquina × média bidirecional no OTDR e régua de limites"
      descricao={descricao}
      viewBox="0 0 400 248"
    >
      {/* Topo esquerdo: Tela da máquina */}
      <rect x="10" y="12" width="184" height="106" rx="8" className="d-caixa" />
      <text x="102" y="30" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        1. Tela da máquina (imagem)
      </text>
      <text x="102" y="54" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 16 }}>
        0,02 dB
      </text>
      <text x="102" y="72" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        Estimativa visual (clivagem)
      </text>
      <text x="102" y="90" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        Não mede luz nem vê MFD
      </text>
      <text x="102" y="106" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9 }}>
        Não vale como laudo de aceite
      </text>

      {/* Topo direito: OTDR bidirecional */}
      <rect x="206" y="12" width="184" height="106" rx="8" className="d-caixa-destaque" />
      <text x="298" y="30" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        2. OTDR nos dois sentidos
      </text>
      <text x="298" y="50" textAnchor="middle" className="d-texto" style={{ fontSize: 9.5 }}>
        A→B: +0,28 dB · B→A: −0,12 dB
      </text>
      <text x="298" y="70" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 13 }}>
        Média: 0,08 dB
      </text>
      <text x="298" y="90" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        Cancela diferença de MFD
      </text>
      <text x="298" y="106" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9 }}>
        Medição oficial de cada emenda
      </text>

      {/* Faixa inferior: Régua de valores de emenda */}
      <rect x="10" y="130" width="380" height="106" rx="8" className="d-zona-controlada" />
      <text x="20" y="148" className="d-texto d-forte" style={{ fontSize: 10 }}>
        3. O que cada número significa (ficha × projeto × norma)
      </text>
      {/* Eixo horizontal */}
      <line x1="36" y1="176" x2="364" y2="176" className="d-cota" />
      {/* Marcador 1: 0,03 dB */}
      <circle cx="52" cy="176" r="5" className="d-ponto" />
      <text x="52" y="166" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        0,03 dB
      </text>
      <text x="52" y="194" textAnchor="middle" className="d-texto" style={{ fontSize: 8.5 }}>
        Média cat.
      </text>
      <text x="52" y="206" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        (lab cut-back)
      </text>

      {/* Marcador 2: 0,08 dB */}
      <circle cx="144" cy="176" r="5" className="d-ponto" />
      <text x="144" y="166" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        0,08 dB
      </text>
      <text x="144" y="194" textAnchor="middle" className="d-texto" style={{ fontSize: 8.5 }}>
        Típica campo
      </text>
      <text x="144" y="206" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        (VIAVI OTDR)
      </text>

      {/* Marcador 3: 0,10 a 0,15 dB */}
      <circle cx="246" cy="176" r="5" className="d-ponto" />
      <text x="246" y="166" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        0,10–0,15 dB
      </text>
      <text x="246" y="194" textAnchor="middle" className="d-texto" style={{ fontSize: 8.5 }}>
        Contrato / FOA
      </text>
      <text x="246" y="206" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        (confirmar!)
      </text>

      {/* Marcador 4: 0,30 dB */}
      <circle cx="348" cy="176" r="5" className="d-ponto" />
      <text x="348" y="166" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        0,30 dB
      </text>
      <text x="348" y="194" textAnchor="middle" className="d-texto" style={{ fontSize: 8.5 }}>
        Máx. TIA-568
      </text>
      <text x="348" y="206" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        (teto norma)
      </text>

      <text x="200" y="226" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9 }}>
        No app: 0,30 dB (máx. TIA-568) padrão; 0,10 dB típico.
      </text>
    </Diagrama>
  );
}
