import { Diagrama, type PropsDiagrama } from './Diagrama';

export function Nr10LinhaDoTempo({ descricao }: PropsDiagrama) {
  // A âncora do texto evita que o primeiro e o último rótulo saiam do desenho.
  const marcos: { x: number; rotulo: string; sub: string; ancora: 'start' | 'middle' | 'end'; xTexto: number }[] = [
    { x: 30, rotulo: 'Texto atual', sub: '2004 / 2016 / 2019', ancora: 'start', xTexto: 6 },
    { x: 160, rotulo: '01/06/2026', sub: 'publicação', ancora: 'middle', xTexto: 160 },
    { x: 255, rotulo: '24/06/2026', sub: 'retificação', ancora: 'middle', xTexto: 255 },
    { x: 360, rotulo: 'jun/2027', sub: 'entra em vigor', ancora: 'end', xTexto: 394 },
  ];
  return (
    <Diagrama titulo="Nova NR-10: datas e treinamentos" descricao={descricao} viewBox="0 0 400 296">
      <line x1="30" y1="50" x2="360" y2="50" className="d-linha-grossa" />
      <rect x="30" y="44" width="330" height="12" className="d-faixa-vigente" />
      <text x="40" y="76" className="d-texto">vale o texto atual até a nova entrar em vigor</text>
      {marcos.map((mc) => (
        <g key={mc.rotulo}>
          <circle cx={mc.x} cy="50" r="7" className="d-marco" />
          <text x={mc.xTexto} y="28" textAnchor={mc.ancora} className="d-texto d-forte">{mc.rotulo}</text>
          <text x={mc.xTexto} y="14" textAnchor={mc.ancora} className="d-texto">{mc.sub}</text>
        </g>
      ))}
      <rect x="10" y="100" width="170" height="148" rx="8" className="d-caixa" />
      <text x="20" y="122" className="d-texto d-forte">Hoje</text>
      <text x="20" y="144" className="d-texto">Básico: 40 h</text>
      <text x="20" y="162" className="d-texto">Complementar SEP: 40 h</text>
      <text x="20" y="180" className="d-texto">Reciclagem bienal</text>
      <text x="20" y="198" className="d-texto">(sem carga mínima)</text>
      <rect x="190" y="100" width="200" height="148" rx="8" className="d-caixa d-caixa-destaque" />
      <text x="200" y="122" className="d-texto d-forte">A partir de jun/2027</text>
      <text x="200" y="144" className="d-texto">Básico 40 h + SEP 40 h</text>
      <text x="200" y="162" className="d-texto">ou Compartilhamento 40 h *</text>
      <text x="200" y="180" className="d-texto">Capacitação: módulo 24 h</text>
      <text x="200" y="198" className="d-texto">Reciclagem bienal: 16 h</text>
      <text x="200" y="216" className="d-texto">Prática presencial</text>
      <text x="200" y="234" className="d-texto">Zonas: iguais</text>
      <text x="10" y="270" className="d-texto">* para quem trabalha perto da rede com compartilhamento</text>
      <text x="10" y="286" className="d-texto">(10.9.9); dispensa o Básico e o SEP (10.9.4 e 10.9.5).</text>
    </Diagrama>
  );
}
