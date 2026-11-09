import { Diagrama, type PropsDiagrama } from './Diagrama';

// Espectro visível (VFL 650 nm) × infravermelho invisível de telecom (850–1625 nm)
// e a regra de inspeção: power meter antes + vídeo ou filtro IR (fora de escala).
export function LuzInvisivel({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Luz visível (VFL) × infravermelho invisível na fibra (fora de escala)"
      descricao={descricao}
      viewBox="0 0 400 484"
    >
      {/* Faixa superior: espectro */}
      <text x="10" y="18" className="d-texto d-forte">
        1. O que passa na fibra
      </text>

      {/* Bloco visível 400-700 nm */}
      <rect x="10" y="28" width="380" height="76" rx="8" className="d-caixa-destaque" />
      <text x="200" y="48" textAnchor="middle" className="d-texto d-forte">
        Visível (400–700 nm)
      </text>
      <circle cx="104" cy="66" r="5" className="d-ponto" />
      <text x="116" y="70" className="d-texto">
        VFL: 650 nm (vermelho)
      </text>
      <text x="200" y="92" textAnchor="middle" className="d-texto d-suave">
        ≤ 1 mW: Cl. 2 · 10–50 mW: 3B
      </text>

      {/* Bloco infravermelho 850-1625 nm */}
      <rect x="10" y="114" width="380" height="76" rx="8" className="d-caixa d-caixa-tracejada" />
      <text x="200" y="134" textAnchor="middle" className="d-texto d-forte">
        Infravermelho — INVISÍVEL
      </text>
      <text x="200" y="154" textAnchor="middle" className="d-texto">
        850 · 1310 · 1490 · 1550 · 1577 nm
      </text>
      <text x="200" y="178" textAnchor="middle" className="d-texto d-alerta">
        Fibra ativa parece apagada a olho nu
      </text>

      {/* Faixa inferior: errado × certo na inspeção */}
      <text x="10" y="216" className="d-texto d-forte">
        2. Como inspecionar a ponta ou o conector
      </text>

      {/* Caixa de cima: proibido */}
      <rect x="10" y="226" width="380" height="116" rx="8" className="d-zona-risco" />
      <text x="200" y="246" textAnchor="middle" className="d-texto d-alerta">
        NÃO FAÇA
      </text>
      {/* Conector + cone + lente concentrando */}
      <rect x="104" y="264" width="28" height="12" rx="2" className="d-caixa" />
      <path d="M132 270 L176 254 L176 286 Z" className="d-zona-controlada" />
      <ellipse cx="180" cy="270" rx="5" ry="18" className="d-caixa-destaque" />
      <path d="M185 254 L222 270 L185 286" className="d-cabo-bt" fill="none" />
      <circle cx="232" cy="270" r="10" className="d-caixa" />
      <circle cx="232" cy="270" r="4" className="d-ponto" />
      <text x="200" y="312" textAnchor="middle" className="d-texto">
        Olho nu ou lupa/microscópio
      </text>
      <text x="200" y="330" textAnchor="middle" className="d-texto d-suave">
        sem filtro: concentra a luz no olho
      </text>

      {/* Caixa de baixo: procedimento seguro */}
      <rect x="10" y="352" width="380" height="124" rx="8" className="d-check" />
      <text x="200" y="372" textAnchor="middle" className="d-texto d-forte">
        PROCEDIMENTO SEGURO
      </text>
      <text x="24" y="396" className="d-texto">
        1º Power meter: fibra escura?
      </text>
      <text x="24" y="418" className="d-texto">
        2º Microscópio de vídeo (ou óptico
      </text>
      <text x="40" y="434" className="d-texto">
        com filtro IR)
      </text>
      <text x="24" y="458" className="d-texto">
        3º VFL: de lado, a ≥ 15 cm
      </text>
    </Diagrama>
  );
}
