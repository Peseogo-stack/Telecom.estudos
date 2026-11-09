import { Diagrama, type PropsDiagrama } from './Diagrama';

// Comparação entre perda estimada na tela da máquina e medição real bidirecional no OTDR,
// mais régua de referência de perdas de emenda (0,03 a 0,30 dB).
export function EstimadoRealFusao({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Perda estimada na máquina × média bidirecional no OTDR e régua de limites"
      descricao={descricao}
      viewBox="0 0 400 412"
    >
      {/* Bloco 1: Tela da máquina */}
      <rect x="10" y="10" width="380" height="114" rx="8" className="d-caixa" />
      <text x="200" y="30" textAnchor="middle" className="d-texto d-forte">
        1. Tela da máquina (imagem)
      </text>
      <text x="200" y="58" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 18 }}>
        0,02 dB
      </text>
      <text x="200" y="78" textAnchor="middle" className="d-texto d-suave">
        Estimativa (imagem da emenda)
      </text>
      <text x="200" y="98" textAnchor="middle" className="d-texto d-alerta">
        É estimativa, não medição
      </text>
      <text x="200" y="115" textAnchor="middle" className="d-texto d-suave">
        Não vale como laudo de aceite
      </text>

      {/* Bloco 2: OTDR bidirecional */}
      <rect x="10" y="134" width="380" height="114" rx="8" className="d-caixa-destaque" />
      <text x="200" y="154" textAnchor="middle" className="d-texto d-forte">
        2. OTDR nos dois sentidos
      </text>
      <text x="200" y="176" textAnchor="middle" className="d-texto">
        A→B: +0,28 dB · B→A: −0,12 dB
      </text>
      <text x="200" y="198" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 14 }}>
        Média: 0,08 dB
      </text>
      <text x="200" y="219" textAnchor="middle" className="d-texto d-suave">
        Elimina o ganho aparente
      </text>
      <text x="200" y="237" textAnchor="middle" className="d-texto d-forte">
        Perda real da emenda
      </text>

      {/* Bloco 3: Régua de valores de emenda */}
      <rect x="10" y="258" width="380" height="146" rx="8" className="d-zona-controlada" />
      <text x="20" y="278" className="d-texto d-forte">
        3. Perda por fusão: quatro números diferentes
      </text>
      {/* Eixo horizontal, em escala de 0 a 0,35 dB (mesma escala da versão anterior) */}
      <line x1="36" y1="326" x2="364" y2="326" className="d-cota" />
      {/* Faixa típica da VIAVI: 0,10 a 0,30 dB */}
      <rect x="130" y="303" width="187" height="8" rx="3" className="d-faixa-vigente" />
      <text x="223" y="297" textAnchor="middle" className="d-texto">
        0,10–0,30 dB: típica (VIAVI)
      </text>
      {/* Marcadores */}
      <circle cx="64" cy="326" r="5" className="d-ponto" />
      <text x="64" y="345" textAnchor="middle" className="d-texto d-forte">
        0,03 dB
      </text>
      <text x="64" y="359" textAnchor="middle" className="d-texto d-suave">
        catálogo (lab)
      </text>
      <circle cx="177" cy="326" r="5" className="d-ponto" />
      <text x="177" y="345" textAnchor="middle" className="d-texto d-forte">
        0,15 dB
      </text>
      <text x="177" y="359" textAnchor="middle" className="d-texto d-suave">
        FOA: planejar
      </text>
      <circle cx="317" cy="326" r="5" className="d-ponto" />
      <text x="317" y="345" textAnchor="middle" className="d-texto d-alerta">
        0,3 dB
      </text>
      <text x="317" y="359" textAnchor="middle" className="d-texto d-suave">
        máx. TIA-568
      </text>
      <text x="200" y="379" textAnchor="middle" className="d-texto d-suave">
        Na obra, vale o critério do contrato.
      </text>
      <text x="200" y="395" textAnchor="middle" className="d-texto d-suave">
        No app, o orçamento usa 0,3 dB.
      </text>
    </Diagrama>
  );
}
