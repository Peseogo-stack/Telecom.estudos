import { Diagrama, type PropsDiagrama } from './Diagrama';

// Organização da bancada de fusão: pote fechado para fragmentos, IPA longe do arco/forno e limpeza do gel.
export function BancadaLimpa({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Bancada de fusão: fragmentos, álcool isopropílico e gel (fora de escala)"
      descricao={descricao}
      viewBox="0 0 400 472"
    >
      {/* Bloco 1: Fragmentos de vidro */}
      <rect x="10" y="10" width="380" height="124" rx="8" className="d-caixa-destaque" />
      <text x="200" y="30" textAnchor="middle" className="d-texto d-forte">
        1. Fragmentos de clivagem
      </text>
      {/* Pote com tampa */}
      <rect x="40" y="56" width="44" height="48" rx="4" className="d-caixa" />
      <rect x="36" y="50" width="52" height="8" rx="2" className="d-marco" />
      <line x1="48" y1="78" x2="72" y2="92" className="d-linha" />
      <line x1="52" y1="92" x2="76" y2="74" className="d-linha" />
      <text x="100" y="66" className="d-texto">
        Pote com tampa
      </text>
      <text x="100" y="82" className="d-texto d-suave">
        (lacrar ao final)
      </text>
      <text x="100" y="100" className="d-texto">
        Óculos com lateral
      </text>
      <text x="200" y="124" textAnchor="middle" className="d-texto d-alerta">
        Sem comida, bebida ou cigarro
      </text>

      {/* Bloco 2: IPA longe do arco */}
      <rect x="10" y="144" width="380" height="146" rx="8" className="d-zona-risco" />
      <text x="200" y="164" textAnchor="middle" className="d-texto d-forte">
        2. IPA ≥ 99% × arco elétrico
      </text>
      {/* Frasco de IPA fechado */}
      <rect x="30" y="196" width="32" height="44" rx="4" className="d-caixa" />
      <rect x="38" y="188" width="16" height="8" rx="2" className="d-marco" />
      <text x="46" y="222" textAnchor="middle" className="d-texto d-forte">
        IPA
      </text>
      {/* Seta de afastamento */}
      <line x1="72" y1="218" x2="256" y2="218" className="d-cota" />
      <text x="164" y="208" textAnchor="middle" className="d-texto d-alerta">
        afastar!
      </text>
      {/* Máquina de fusão / arco */}
      <rect x="262" y="192" width="100" height="56" rx="5" className="d-caixa" />
      <circle cx="312" cy="208" r="5" className="d-ponto" />
      <text x="312" y="236" textAnchor="middle" className="d-texto">
        Arco / forno
      </text>
      <text x="200" y="262" textAnchor="middle" className="d-texto">
        Fulgor 11,85 °C: vapor inflamável
      </text>
      <text x="200" y="280" textAnchor="middle" className="d-texto d-suave">
        Frasco fechado e local ventilado
      </text>

      {/* Bloco 3: Geleia, solvente e ambiente */}
      <rect x="10" y="300" width="380" height="162" rx="8" className="d-caixa" />
      <text x="20" y="320" className="d-texto d-forte">
        3. Geleia do cabo, solventes e ambiente de trabalho
      </text>
      <text x="20" y="342" className="d-texto">
        • Gel: limpar com o produto apropriado;
      </text>
      <text x="32" y="358" className="d-texto">
        pedir a ficha de segurança.
      </text>
      <text x="20" y="380" className="d-texto">
        • Removedor de gel: luvas, longe de faísca;
      </text>
      <text x="32" y="396" className="d-texto">
        secar antes do arco.
      </text>
      <text x="20" y="418" className="d-texto d-alerta">
        • Caixa subterrânea (gases): nunca fundir lá;
      </text>
      <text x="32" y="434" className="d-texto d-alerta">
        o cabo sobe.
      </text>
    </Diagrama>
  );
}
