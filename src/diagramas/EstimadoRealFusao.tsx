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
        Estimativa (imagem da emenda)
      </text>
      <text x="102" y="90" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        É estimativa, não medição
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
        Elimina o ganho aparente
      </text>
      <text x="298" y="106" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9 }}>
        Perda real da emenda
      </text>

      {/* Faixa inferior: Régua de valores de emenda */}
      <rect x="10" y="130" width="380" height="106" rx="8" className="d-zona-controlada" />
      <text x="20" y="148" className="d-texto d-forte" style={{ fontSize: 10 }}>
        3. Perda por fusão: quatro números diferentes
      </text>
      {/* Eixo horizontal, em escala de 0 a 0,35 dB */}
      <line x1="36" y1="180" x2="364" y2="180" className="d-cota" />
      {/* Faixa típica da VIAVI: 0,10 a 0,30 dB */}
      <rect x="130" y="157" width="187" height="8" rx="3" className="d-faixa-vigente" />
      <text x="223" y="153" textAnchor="middle" className="d-texto" style={{ fontSize: 9 }}>
        0,10–0,30 dB: típica (VIAVI)
      </text>
      {/* Marcadores */}
      <circle cx="64" cy="180" r="5" className="d-ponto" />
      <text x="64" y="198" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        0,03 dB
      </text>
      <text x="64" y="211" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        catálogo (lab)
      </text>
      <circle cx="177" cy="180" r="5" className="d-ponto" />
      <text x="177" y="198" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        0,15 dB
      </text>
      <text x="177" y="211" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        FOA: planejar
      </text>
      <circle cx="317" cy="180" r="5" className="d-ponto" />
      <text x="317" y="198" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        0,3 dB
      </text>
      <text x="317" y="211" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        máx. TIA-568
      </text>
      <text x="200" y="229" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9 }}>
        Na obra, vale o critério do contrato. No app, o orçamento usa 0,3 dB.
      </text>
    </Diagrama>
  );
}
