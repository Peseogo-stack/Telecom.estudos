import { Diagrama, type PropsDiagrama } from './Diagrama';

export function FibraReflexao({ descricao }: PropsDiagrama) {
  // Núcleo entre y=90 e y=150; casca de 50 a 90 e de 150 a 190.
  const zigue = 'M40 120 L100 92 L170 148 L240 92 L310 148 L370 108';
  return (
    <Diagrama titulo="A luz presa no núcleo por reflexão interna total" descricao={descricao} viewBox="0 0 400 250">
      <rect x="30" y="50" width="360" height="140" rx="6" className="d-caixa" />
      <rect x="30" y="90" width="360" height="60" className="d-caixa-destaque" />
      <text x="36" y="72" className="d-texto">casca (vidro, 125 µm)</text>
      <text x="36" y="178" className="d-texto">casca</text>
      <text x="300" y="124" className="d-texto d-forte">núcleo</text>
      {/* cone de aceitação */}
      <path d="M2 95 L40 120 L2 145" className="d-cota" />
      <text x="2" y="40" className="d-texto d-suave">cone de entrada</text>
      <line x1="10" y1="44" x2="18" y2="100" className="d-linha" />
      {/* raio guiado */}
      <path d={zigue} className="d-traco" />
      {/* raio que escapa */}
      <path d="M40 120 L80 90 L120 20" className="d-cabo-bt" strokeDasharray="5 4" />
      <text x="124" y="24" className="d-texto d-alerta">entrou torto: escapa</text>
      <text x="40" y="225" className="d-texto">índice do núcleo um pouco maior que o da casca → a luz volta para dentro</text>
    </Diagrama>
  );
}
