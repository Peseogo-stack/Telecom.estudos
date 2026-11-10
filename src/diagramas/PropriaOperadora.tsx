import { Diagrama, type PropsDiagrama } from './Diagrama';

// Rede própria × link de operadora: dois blocos empilhados e, embaixo, o restabelecimento em ms.
export function PropriaOperadora({ descricao }: PropsDiagrama) {
  const no = (px: number, py: number, a: string, b: string) => (
    <g>
      <rect x={px} y={py} width="82" height="38" rx="6" className="d-caixa d-caixa-destaque" />
      <text x={px + 41} y={b ? py + 15 : py + 23} textAnchor="middle" className="d-texto d-forte">{a}</text>
      {b && <text x={px + 41} y={py + 30} textAnchor="middle" className="d-texto d-forte">{b}</text>}
    </g>
  );
  const escala = 5; // unidades por ms
  const barras: [string, number, boolean][] = [
    ['Diferencial de linha exige até 5 ms', 5, false],
    ['Carrier Ethernet: cerca de 20 ms', 20, false],
    ['MPLS: 50 ms ou mais', 50, true],
  ];
  return (
    <Diagrama titulo="Rede própria × link de operadora" descricao={descricao} viewBox="0 0 400 464">
      {/* rede própria */}
      <rect x="4" y="4" width="392" height="112" rx="8" className="d-caixa" />
      <text x="16" y="24" className="d-texto d-forte">Fibra própria</text>
      {no(16, 34, 'Subestação', '')}
      {no(302, 34, 'Centro de', 'operação')}
      <line x1="98" y1="53" x2="302" y2="53" className="d-linha-grossa" />
      <text x="200" y="46" textAnchor="middle" className="d-texto">tecnologia e caminho: da empresa</text>
      <text x="16" y="94" className="d-texto">TDM (SDH): banda dedicada, latência previsível</text>
      <text x="16" y="110" className="d-texto d-alerta">Contra: custo e obra</text>

      {/* link de operadora */}
      <rect x="4" y="126" width="392" height="164" rx="8" className="d-caixa" />
      <text x="16" y="146" className="d-texto d-forte">Link de operadora</text>
      {no(16, 156, 'Subestação', '')}
      {no(302, 156, 'Centro de', 'operação')}
      <line x1="98" y1="175" x2="150" y2="175" className="d-linha" />
      <line x1="250" y1="175" x2="302" y2="175" className="d-linha" />
      <rect x="150" y="158" width="100" height="34" rx="12" className="d-caixa d-caixa-tracejada" />
      <text x="200" y="180" textAnchor="middle" className="d-texto d-forte">Operadora</text>
      <text x="200" y="208" textAnchor="middle" className="d-texto">decide tecnologia e caminho</text>
      <text x="16" y="230" className="d-texto">Celular, segundo a Cisco: mais fácil, rápido</text>
      <text x="16" y="246" className="d-texto">e barato de implantar que fibra dedicada</text>
      <text x="16" y="266" className="d-texto d-alerta">Contra: reparo vem do contrato (SLA e chamado)</text>
      <text x="16" y="282" className="d-texto d-alerta">Contra: latência de pacotes sem a mesma garantia</text>

      {/* restabelecimento */}
      <text x="4" y="314" className="d-texto d-forte">Tempo de restabelecimento (ms)</text>
      {barras.map(([r, ms, mais], i) => {
        const y = 330 + i * 34;
        return (
          <g key={r}>
            <text x="4" y={y + 10} className="d-texto">{r}</text>
            <rect x="4" y={y + 16} width={ms * escala} height="9" className={mais ? 'd-barra-parada' : 'd-barra-ok'} />
            {mais && <path d={`M${4 + ms * escala} ${y + 13} l12 7.5 l-12 7.5 z`} className="d-ponto" />}
          </g>
        );
      })}
      <text x="4" y="456" className="d-texto d-alerta">Dois canais só protegem se não caírem juntos.</text>
    </Diagrama>
  );
}
