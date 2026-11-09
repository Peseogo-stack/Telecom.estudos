import { Diagrama, type PropsDiagrama } from './Diagrama';

// Espectro visível (VFL 650 nm) × infravermelho invisível de telecom (850–1625 nm)
// e a regra de inspeção: power meter antes + vídeo ou filtro IR (fora de escala).
export function LuzInvisivel({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Luz visível (VFL) × infravermelho invisível na fibra (fora de escala)"
      descricao={descricao}
      viewBox="0 0 400 248"
    >
      {/* Faixa superior: espectro */}
      <text x="12" y="18" className="d-texto d-forte" style={{ fontSize: 11 }}>
        1. O que passa na fibra
      </text>

      {/* Bloco visível 400-700 nm */}
      <rect x="12" y="26" width="164" height="68" rx="8" className="d-caixa-destaque" />
      <text x="94" y="44" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Visível (400–700 nm)
      </text>
      <circle cx="28" cy="60" r="5" className="d-ponto" />
      <text x="38" y="64" className="d-texto" style={{ fontSize: 10 }}>
        VFL: 650 nm (vermelho)
      </text>
      <text x="94" y="82" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        ≤ 1 mW: Cl. 2 · 10–50 mW: 3B
      </text>

      {/* Bloco infravermelho 850-1625 nm */}
      <rect x="184" y="26" width="204" height="68" rx="8" className="d-caixa d-caixa-tracejada" />
      <text x="286" y="44" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Infravermelho — INVISÍVEL
      </text>
      <text x="286" y="62" textAnchor="middle" className="d-texto" style={{ fontSize: 10 }}>
        850 · 1310 · 1490 · 1550 · 1577 nm
      </text>
      <text x="286" y="82" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        Fibra ativa parece apagada a olho nu
      </text>

      {/* Faixa inferior: errado × certo na inspeção */}
      <text x="12" y="118" className="d-texto d-forte" style={{ fontSize: 11 }}>
        2. Como inspecionar a ponta ou o conector
      </text>

      {/* Caixa esquerda: proibido */}
      <rect x="12" y="126" width="182" height="110" rx="8" className="d-zona-risco" />
      <text x="103" y="146" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 10.5 }}>
        NÃO FAÇA
      </text>
      {/* Conector + cone + lente concentrando */}
      <rect x="24" y="166" width="28" height="12" rx="2" className="d-caixa" />
      <path d="M52 172 L96 156 L96 188 Z" className="d-zona-controlada" />
      <ellipse cx="100" cy="172" rx="5" ry="18" className="d-caixa-destaque" />
      <path d="M105 156 L142 172 L105 188" className="d-cabo-bt" fill="none" />
      <circle cx="152" cy="172" r="10" className="d-caixa" />
      <circle cx="152" cy="172" r="4" className="d-ponto" />
      <text x="103" y="210" textAnchor="middle" className="d-texto" style={{ fontSize: 9.5 }}>
        Olho nu ou lupa/microscópio
      </text>
      <text x="103" y="224" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        sem filtro: concentra a luz no olho
      </text>

      {/* Caixa direita: procedimento seguro */}
      <rect x="206" y="126" width="182" height="110" rx="8" className="d-check" />
      <text x="297" y="146" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>
        PROCEDIMENTO SEGURO
      </text>
      <text x="218" y="168" className="d-texto" style={{ fontSize: 10.5 }}>
        1º Power meter: fibra escura?
      </text>
      <text x="218" y="186" className="d-texto" style={{ fontSize: 10.5 }}>
        2º Microscópio de vídeo (ou
      </text>
      <text x="232" y="200" className="d-texto" style={{ fontSize: 10.5 }}>
        óptico com filtro IR)
      </text>
      <text x="218" y="220" className="d-texto" style={{ fontSize: 10.5 }}>
        3º VFL: de lado, a ≥ 15 cm
      </text>
    </Diagrama>
  );
}
