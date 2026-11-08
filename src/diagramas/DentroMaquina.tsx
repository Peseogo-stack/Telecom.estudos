import { Diagrama, type PropsDiagrama } from './Diagrama';

// Comparação entre alinhamento pelo núcleo (PAS/LID, X/Y/Z) e pela casca, mais arco, eletrodos e erros.
export function DentroMaquina({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Dentro da máquina: alinhamento pelo núcleo × pela casca e arco (fora de escala)"
      descricao={descricao}
      viewBox="0 0 400 248"
    >
      {/* Quadro esquerdo: Alinhamento pelo núcleo (PAS / LID) */}
      <rect x="10" y="12" width="184" height="124" rx="8" className="d-caixa-destaque" />
      <text x="102" y="30" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Alinhamento pelo núcleo
      </text>
      <text x="102" y="44" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9 }}>
        PAS (câmeras X/Y a 90°) ou LID
      </text>
      {/* Duas fibras com núcleos alinhados mesmo se a casca tiver excentricidade */}
      <rect x="24" y="58" width="68" height="22" rx="2" className="d-caixa" />
      <line x1="24" y1="69" x2="92" y2="69" className="d-cabo-telecom" />
      <rect x="112" y="55" width="68" height="22" rx="2" className="d-caixa" />
      <line x1="112" y1="69" x2="180" y2="69" className="d-cabo-telecom" />
      {/* Eletrodos superior e inferior */}
      <polygon points="98,48 106,48 102,62" className="d-ponto" />
      <polygon points="98,90 106,90 102,76" className="d-ponto" />
      <text x="102" y="106" textAnchor="middle" className="d-texto" style={{ fontSize: 9.5 }}>
        Motores X, Y e Z casam os núcleos
      </text>
      <text x="102" y="122" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9 }}>
        Compensa excentricidade núcleo-casca
      </text>

      {/* Quadro direito: Alinhamento pela casca */}
      <rect x="206" y="12" width="184" height="124" rx="8" className="d-caixa" />
      <text x="298" y="30" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Alinhamento pela casca
      </text>
      <text x="298" y="44" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9 }}>
        Ranhura em V (V-groove ativa ou fixa)
      </text>
      {/* Duas fibras alinhadas pela borda externa de 125 µm */}
      <rect x="220" y="58" width="68" height="22" rx="2" className="d-caixa" />
      <line x1="220" y1="67" x2="288" y2="67" className="d-cabo-telecom" />
      <rect x="308" y="58" width="68" height="22" rx="2" className="d-caixa" />
      <line x1="308" y1="72" x2="376" y2="72" className="d-cabo-telecom" />
      <polygon points="294,48 302,48 298,62" className="d-ponto" />
      <polygon points="294,90 302,90 298,76" className="d-ponto" />
      <text x="298" y="106" textAnchor="middle" className="d-texto" style={{ fontSize: 9.5 }}>
        Alinha o vidro externo (125 µm)
      </text>
      <text x="298" y="122" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9 }}>
        Sofre se o núcleo for excêntrico
      </text>

      {/* Faixa inferior: Arco, eletrodos e defeitos na tela */}
      <rect x="10" y="148" width="380" height="88" rx="8" className="d-zona-controlada" />
      <text x="20" y="168" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        Arc check, manutenção e defeitos na tela
      </text>
      <text x="20" y="186" className="d-texto" style={{ fontSize: 9.5 }}>
        • Arc check: início do dia; eletrodos: 1.500–6.000 arcos.
      </text>
      <text x="20" y="203" className="d-texto" style={{ fontSize: 9.5 }}>
        • IPA ≥ 99%: V-groove todo dia; lente 1×/mês (desligada).
      </text>
      <text x="20" y="220" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        • Linha: até 2 re-arcos. Bolha ou barriga: refazer do zero!
      </text>
    </Diagrama>
  );
}
