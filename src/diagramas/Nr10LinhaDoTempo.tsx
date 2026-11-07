import { Diagrama, type PropsDiagrama } from './Diagrama';

export function Nr10LinhaDoTempo({ descricao }: PropsDiagrama) {
  const marcos = [
    { x: 30, rotulo: 'Texto atual', sub: '2004 / 2016 / 2019' },
    { x: 150, rotulo: '01/06/2026', sub: 'publicação' },
    { x: 250, rotulo: '24/06/2026', sub: 'retificação' },
    { x: 360, rotulo: 'jun/2027', sub: 'entra em vigor' },
  ];
  return (
    <Diagrama titulo="Nova NR-10: datas e treinamentos" descricao={descricao} viewBox="0 0 400 250">
      <line x1="30" y1="50" x2="360" y2="50" className="d-linha-grossa" />
      <rect x="30" y="44" width="330" height="12" className="d-faixa-vigente" />
      <text x="40" y="76" className="d-texto">vale o texto atual até a nova entrar em vigor</text>
      {marcos.map((mc) => (
        <g key={mc.rotulo}>
          <circle cx={mc.x} cy="50" r="7" className="d-marco" />
          <text x={mc.x} y="28" textAnchor="middle" className="d-texto d-forte">{mc.rotulo}</text>
          <text x={mc.x} y="14" textAnchor="middle" className="d-texto">{mc.sub}</text>
        </g>
      ))}
      <rect x="10" y="100" width="180" height="138" rx="8" className="d-caixa" />
      <text x="20" y="122" className="d-texto d-forte">Hoje</text>
      <text x="20" y="144" className="d-texto">Básico: 40 h</text>
      <text x="20" y="162" className="d-texto">Complementar SEP: 40 h</text>
      <text x="20" y="180" className="d-texto">Reciclagem bienal</text>
      <text x="20" y="198" className="d-texto">(sem carga mínima)</text>
      <rect x="210" y="100" width="180" height="138" rx="8" className="d-caixa d-caixa-destaque" />
      <text x="220" y="122" className="d-texto d-forte">A partir de jun/2027</text>
      <text x="220" y="144" className="d-texto">Compartilhamento: 40 h</text>
      <text x="220" y="162" className="d-texto">Capacitação: módulo 24 h</text>
      <text x="220" y="180" className="d-texto">Reciclagem bienal: 16 h</text>
      <text x="220" y="198" className="d-texto">Prática presencial</text>
      <text x="220" y="216" className="d-texto">Zonas: iguais</text>
    </Diagrama>
  );
}
