import { Diagrama, type PropsDiagrama } from './Diagrama';

// GOOSE: um publicador, um switch e três assinantes na mesma VLAN; embaixo, a retransmissão no tempo.
const PARADAS = [30, 56, 90, 136, 196, 276, 356];
const ROTULOS = ['T1', 'T2', 'T3', '…', 'T0', 'T0'];

export function GooseMulticast({ descricao }: PropsDiagrama) {
  const ied = (py: number, a: string, b: string) => (
    <g>
      <rect x="306" y={py} width="90" height="40" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="351" y={py + 16} textAnchor="middle" className="d-texto d-forte">{a}</text>
      <text x="351" y={py + 31} textAnchor="middle" className="d-texto d-forte">{b}</text>
    </g>
  );
  const base = 350;
  return (
    <Diagrama titulo="GOOSE: um publicador, vários assinantes" descricao={descricao} viewBox="0 0 400 416">
      {/* publicador, switch, assinantes */}
      <rect x="4" y="68" width="84" height="40" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="46" y="84" textAnchor="middle" className="d-texto d-forte">IED</text>
      <text x="46" y="99" textAnchor="middle" className="d-texto d-forte">publicador</text>
      <rect x="150" y="56" width="84" height="64" rx="6" className="d-caixa" />
      <text x="192" y="93" textAnchor="middle" className="d-texto d-forte">Switch</text>
      <line x1="88" y1="88" x2="150" y2="88" className="d-linha-grossa" />
      {[16, 68, 120].map((y) => (
        <line key={y} x1="234" y1="88" x2="306" y2={y + 20} className="d-linha-grossa" />
      ))}
      {ied(16, 'IED', 'assinante')}
      {ied(68, 'IED', 'assinante')}
      {ied(120, 'IED', 'assinante')}
      <text x="351" y="176" textAnchor="middle" className="d-texto d-suave">mesma VLAN</text>

      {/* quadro */}
      <text x="4" y="206" className="d-texto d-forte">Quadro GOOSE</text>
      <rect x="4" y="214" width="190" height="44" rx="4" className="d-caixa" />
      <text x="99" y="234" textAnchor="middle" className="d-texto">Destino:</text>
      <text x="99" y="250" textAnchor="middle" className="d-texto d-forte">multicast</text>
      <rect x="194" y="214" width="202" height="44" rx="4" className="d-caixa d-caixa-destaque" />
      <text x="295" y="234" textAnchor="middle" className="d-texto">Tag 802.1Q:</text>
      <text x="295" y="250" textAnchor="middle" className="d-texto d-forte">VLAN + prioridade</text>

      {/* retransmissão */}
      <text x="4" y="284" className="d-texto d-forte">Retransmissão após um evento</text>
      <line x1="10" y1={base} x2="390" y2={base} className="d-eixo" />
      <text x="390" y={base + 34} textAnchor="end" className="d-texto d-suave">tempo →</text>
      {PARADAS.map((px, i) => (
        <line key={px} x1={px} y1={base} x2={px} y2={base - (i === 0 ? 34 : 20)} className="d-linha-grossa" />
      ))}
      <text x="30" y={base - 40} className="d-texto d-forte">evento: envio imediato</text>
      {ROTULOS.map((r, i) => (
        <text key={i} x={(PARADAS[i] + PARADAS[i + 1]) / 2} y={base + 16} textAnchor="middle" className="d-texto">{r}</text>
      ))}
      <text x="196" y={base + 34} className="d-texto d-suave">T0 = regime</text>
      <text x="4" y="408" className="d-texto d-suave">Exemplo da SEL: 4 ms após o evento, 1000 ms no regime.</text>
    </Diagrama>
  );
}
