import { Diagrama, type PropsDiagrama } from './Diagrama';

// Fluxo da irregularidade: ver, registrar e três caminhos. Quem decide e quem executa é a empresa.
// Fontes: REN ANEEL 1.044/2022 (arts. 13 e 14) e Resolução Conjunta 4/2014, art. 4º (ver a lição 07-06).
export function FluxoFiscalizacao({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Fiscalizar, notificar, retirar" descricao={descricao} viewBox="0 0 400 470">
      {/* Passos do técnico */}
      <rect x="110" y="6" width="180" height="30" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="200" y="26" textAnchor="middle" className="d-texto d-forte">Ver do solo</text>
      <path d="M193 39 L207 39 L200 48 Z" className="d-seta" />

      <rect x="20" y="52" width="360" height="30" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="200" y="72" textAnchor="middle" className="d-texto d-forte">Registrar: poste, problema, dono, foto, data</text>
      <path d="M193 85 L207 85 L200 94 Z" className="d-seta" />

      {/* Decisão da empresa */}
      <path d="M200 98 L290 124 L200 150 L110 124 Z" className="d-caixa d-caixa-destaque" />
      <text x="200" y="129" textAnchor="middle" className="d-texto d-forte">Que caso é?</text>

      {/* Trilho dos três caminhos */}
      <path d="M110 124 L12 124 L12 360" className="d-linha" />
      <line x1="12" y1="206" x2="20" y2="206" className="d-linha" />
      <line x1="12" y1="290" x2="20" y2="290" className="d-linha" />
      <line x1="12" y1="360" x2="20" y2="360" className="d-linha" />

      {/* Risco: único com a classe de alerta */}
      <rect x="20" y="164" width="376" height="84" rx="6" className="d-zona-risco" />
      <text x="30" y="184" className="d-texto d-alerta">Risco de acidente ou emergência</text>
      <text x="30" y="204" className="d-texto">Comunicar na hora.</text>
      <text x="30" y="222" className="d-texto">Regularização imediata.</text>
      <text x="30" y="240" className="d-texto">Pode retirar sem autorização da Comissão.</text>

      <rect x="20" y="260" width="376" height="60" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="30" y="282" className="d-texto d-forte">Clandestina</text>
      <text x="30" y="302" className="d-texto">Pode retirar sem autorização da Comissão.</text>

      <rect x="20" y="330" width="376" height="86" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="30" y="350" className="d-texto d-forte">Outros</text>
      <text x="30" y="368" className="d-texto">Notificação.</text>
      <text x="30" y="386" className="d-texto">Cronograma (até 1 ano).</text>
      <text x="30" y="404" className="d-texto">Sem regularizar: pedido à Comissão.</text>

      <text x="200" y="442" textAnchor="middle" className="d-texto d-forte">Quem decide e quem executa:</text>
      <text x="200" y="460" textAnchor="middle" className="d-texto d-forte">procedimento da empresa.</text>
    </Diagrama>
  );
}
