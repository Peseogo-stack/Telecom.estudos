import { Diagrama, type PropsDiagrama } from './Diagrama';

// Pilha de camadas: Ethernet na base; à esquerda o caminho com IP e TCP; à direita o caminho direto.
export function PilhaProtocolos({ descricao }: PropsDiagrama) {
  const proto = (px: number, w: number, nome: string, porta: string, extra?: string) => (
    <g>
      <rect x={px} y="52" width={w} height="62" rx="6" className="d-caixa d-caixa-destaque" />
      <text x={px + w / 2} y="72" textAnchor="middle" className="d-texto d-forte">{nome}</text>
      <text x={px + w / 2} y="90" textAnchor="middle" className="d-texto">{porta}</text>
      {extra && <text x={px + w / 2} y="106" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 11 }}>{extra}</text>}
    </g>
  );
  const camada = (px: number, py: number, w: number, texto: string) => (
    <g>
      <rect x={px} y={py} width={w} height="30" rx="6" className="d-caixa" />
      <text x={px + w / 2} y={py + 20} textAnchor="middle" className="d-texto d-forte">{texto}</text>
    </g>
  );
  return (
    <Diagrama titulo="Onde cada protocolo roda" descricao={descricao} viewBox="0 0 400 284">
      <text x="4" y="18" className="d-texto d-forte">Com IP e TCP</text>
      <text x="4" y="36" className="d-texto d-suave">porta TCP</text>
      <text x="244" y="18" className="d-texto d-forte">Direto, sem IP e sem TCP</text>
      <text x="244" y="36" className="d-texto d-suave">EtherType · multicast</text>

      {proto(4, 72, 'MMS', 'TCP/102', 'IEC 61850')}
      {proto(82, 72, 'IEC 104', 'TCP/2404')}
      {proto(160, 72, 'DNP3', 'TCP/20000')}
      {camada(4, 124, 228, 'TCP')}
      {camada(4, 160, 228, 'IP')}

      {proto(244, 72, 'GOOSE', '0x88B8')}
      {proto(324, 72, 'SV', '0x88BA')}
      <line x1="280" y1="118" x2="280" y2="196" className="d-linha" />
      <line x1="360" y1="118" x2="360" y2="196" className="d-linha" />

      <rect x="4" y="198" width="392" height="34" rx="6" className="d-caixa" />
      <text x="200" y="220" textAnchor="middle" className="d-texto d-forte">Ethernet</text>

      <text x="4" y="256" className="d-texto">Quadro com tag de VLAN: EtherType 0x8100</text>
      <text x="4" y="274" className="d-texto d-suave">SV = Sampled Values</text>
    </Diagrama>
  );
}
