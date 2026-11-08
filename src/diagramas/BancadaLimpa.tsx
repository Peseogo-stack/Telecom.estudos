import { Diagrama, type PropsDiagrama } from './Diagrama';

// Organização da bancada de fusão: pote fechado para fragmentos, IPA longe do arco/forno e limpeza do gel.
export function BancadaLimpa({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Bancada de fusão: fragmentos, álcool isopropílico e gel (fora de escala)"
      descricao={descricao}
      viewBox="0 0 400 244"
    >
      {/* Coluna 1: Fragmentos de vidro */}
      <rect x="10" y="14" width="184" height="122" rx="8" className="d-caixa-destaque" />
      <text x="102" y="34" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>
        1. Fragmentos de clivagem
      </text>
      {/* Pote com tampa */}
      <rect x="26" y="52" width="44" height="48" rx="4" className="d-caixa" />
      <rect x="22" y="46" width="52" height="8" rx="2" className="d-marco" />
      <line x1="34" y1="74" x2="58" y2="88" className="d-linha" />
      <line x1="38" y1="88" x2="62" y2="70" className="d-linha" />
      <text x="80" y="62" className="d-texto" style={{ fontSize: 10.5 }}>
        Pote com tampa
      </text>
      <text x="80" y="76" className="d-texto d-suave" style={{ fontSize: 10 }}>
        (lacrar ao final)
      </text>
      <text x="80" y="94" className="d-texto" style={{ fontSize: 10.5 }}>
        Óculos com lateral
      </text>
      <text x="102" y="120" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 10 }}>
        Sem comida, bebida ou cigarro
      </text>

      {/* Coluna 2: IPA longe do arco */}
      <rect x="206" y="14" width="184" height="122" rx="8" className="d-zona-risco" />
      <text x="298" y="34" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>
        2. IPA ≥ 99% × arco elétrico
      </text>
      {/* Frasco de IPA fechado */}
      <rect x="220" y="56" width="32" height="44" rx="4" className="d-caixa" />
      <rect x="228" y="48" width="16" height="8" rx="2" className="d-marco" />
      <text x="236" y="82" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        IPA
      </text>
      {/* Seta de afastamento */}
      <line x1="258" y1="78" x2="314" y2="78" className="d-cota" />
      <text x="286" y="70" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        afastar!
      </text>
      {/* Máquina de fusão / arco */}
      <rect x="320" y="54" width="56" height="46" rx="5" className="d-caixa" />
      <circle cx="348" cy="72" r="5" className="d-ponto" />
      <text x="348" y="92" textAnchor="middle" className="d-texto" style={{ fontSize: 9 }}>
        Arco / forno
      </text>
      <text x="298" y="118" textAnchor="middle" className="d-texto" style={{ fontSize: 10 }}>
        Fulgor 11,85 °C: vapor inflamável
      </text>
      <text x="298" y="130" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        Frasco fechado e local ventilado
      </text>

      {/* Faixa inferior: Geleia, solvente e ambiente */}
      <rect x="10" y="148" width="380" height="84" rx="8" className="d-caixa" />
      <text x="20" y="168" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        3. Geleia do cabo, solventes e ambiente de trabalho
      </text>
      <text x="20" y="187" className="d-texto" style={{ fontSize: 9.5 }}>
        • Gel (óleo + parafina): escorrega no piso; lavar pele com sabão.
      </text>
      <text x="20" y="204" className="d-texto" style={{ fontSize: 9.5 }}>
        • Removedor D&apos;Gel (fulgor &gt; 60 °C): usar luvas e secar antes do arco.
      </text>
      <text x="20" y="221" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        • Caixa subterrânea (gases): nunca fundir lá; subir o cabo.
      </text>
    </Diagrama>
  );
}
