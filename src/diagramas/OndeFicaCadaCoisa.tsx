import { Diagrama, type PropsDiagrama } from './Diagrama';

// Onde ficam a caixa de emenda, a reserva e os drops. Esquema, não é escala.
// Números de exemplo da Cemig ND-6.6 e da Energisa NDU-009 v4.0 (ver a lição 07-04).
export function OndeFicaCadaCoisa({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Onde fica cada coisa no vão" descricao={descricao} viewBox="0 0 400 350">
      {/* Cotas */}
      <text x="4" y="22" className="d-texto d-forte">CEO: 1.500 mm ou mais</text>
      <text x="4" y="38" className="d-texto d-forte">do poste (Cemig)</text>
      <text x="396" y="22" textAnchor="end" className="d-texto d-forte">Reserva: 1.500 mm (Cemig)</text>
      <text x="396" y="38" textAnchor="end" className="d-texto d-forte">2.000 mm (Energisa v4.0)</text>

      {/* Postes */}
      <rect x="52" y="80" width="16" height="170" rx="3" className="d-poste" />
      <rect x="312" y="80" width="16" height="170" rx="3" className="d-poste" />
      <text x="60" y="270" textAnchor="middle" className="d-texto">poste</text>
      <text x="320" y="270" textAnchor="middle" className="d-texto">poste</text>

      {/* Cabo de telecom */}
      <line x1="4" y1="100" x2="396" y2="100" className="d-cabo-telecom" />

      {/* Cota da CEO */}
      <line x1="68" y1="70" x2="112" y2="70" className="d-cota" />
      <line x1="68" y1="64" x2="68" y2="76" className="d-cota" />
      <line x1="112" y1="64" x2="112" y2="76" className="d-cota" />
      {/* CEO no vão */}
      <rect x="112" y="90" width="30" height="20" rx="3" className="d-caixa d-caixa-destaque" />
      <text x="76" y="132" className="d-texto d-forte">caixa de</text>
      <text x="76" y="148" className="d-texto d-forte">emenda (CEO)</text>

      {/* Cota da reserva */}
      <line x1="258" y1="70" x2="312" y2="70" className="d-cota" />
      <line x1="258" y1="64" x2="258" y2="76" className="d-cota" />
      <line x1="312" y1="64" x2="312" y2="76" className="d-cota" />
      {/* Reserva em raquetes */}
      <ellipse cx="236" cy="116" rx="22" ry="14" className="d-linha-grossa" fill="none" />
      <rect x="212" y="94" width="8" height="12" rx="2" className="d-caixa d-caixa-destaque" />
      <rect x="252" y="94" width="8" height="12" rx="2" className="d-caixa d-caixa-destaque" />
      <text x="304" y="156" textAnchor="end" className="d-texto d-forte">reserva em</text>
      <text x="304" y="172" textAnchor="end" className="d-texto d-forte">raquetes</text>

      {/* Poste da esquerda: não no poste */}
      <circle cx="60" cy="184" r="10" className="d-caixa" />
      <line x1="48" y1="172" x2="72" y2="196" className="d-cabo-bt" />
      <line x1="72" y1="172" x2="48" y2="196" className="d-cabo-bt" />
      <text x="84" y="188" className="d-texto">rolo de cabo</text>
      <rect x="52" y="212" width="16" height="14" rx="2" className="d-caixa" />
      <line x1="48" y1="208" x2="72" y2="232" className="d-cabo-bt" />
      <line x1="72" y1="208" x2="48" y2="232" className="d-cabo-bt" />
      <text x="84" y="226" className="d-texto">caixa de emenda</text>
      <text x="84" y="248" className="d-texto d-alerta">não no poste</text>

      {/* Drop certo: do ponto de fixação do poste da direita */}
      <path d="M328 104 L352 214" className="d-linha" />
      <polygon points="334,224 352,206 378,224" className="d-caixa" />
      <rect x="338" y="224" width="36" height="26" className="d-caixa" />
      <text x="396" y="292" textAnchor="end" className="d-texto d-forte">drop saindo</text>
      <text x="396" y="308" textAnchor="end" className="d-texto d-forte">do poste: certo</text>

      {/* Drop errado: no meio do vão */}
      <path d="M190 104 L190 228" className="d-linha" />
      <line x1="178" y1="150" x2="202" y2="174" className="d-cabo-bt" />
      <line x1="202" y1="150" x2="178" y2="174" className="d-cabo-bt" />
      <polygon points="172,236 190,218 208,236" className="d-caixa" />
      <rect x="176" y="236" width="28" height="22" className="d-caixa" />
      <text x="190" y="292" textAnchor="middle" className="d-texto d-alerta">drop no meio do vão:</text>
      <text x="190" y="308" textAnchor="middle" className="d-texto d-alerta">errado</text>

      <text x="4" y="338" className="d-texto d-alerta">Exemplos. Vale a norma da sua distribuidora.</text>
    </Diagrama>
  );
}
