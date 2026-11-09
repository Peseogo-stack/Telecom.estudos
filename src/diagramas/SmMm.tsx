import { Diagrama, type PropsDiagrama } from './Diagrama';

export function SmMm({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Monomodo: um caminho. Multimodo: vários." descricao={descricao} viewBox="0 0 400 270">
      <text x="10" y="22" className="d-texto d-forte">Monomodo (núcleo ~9 µm)</text>
      <rect x="10" y="32" width="300" height="40" className="d-caixa" />
      <rect x="10" y="47" width="300" height="10" className="d-caixa-destaque" />
      <line x1="10" y1="52" x2="310" y2="52" className="d-traco" />
      <path d="M330 52 l8 -14 l8 14 z" className="d-marco" />
      <text x="392" y="88" textAnchor="end" className="d-texto">pulso estreito</text>
      <text x="10" y="122" className="d-texto d-forte">Multimodo (núcleo 50 ou 62,5 µm)</text>
      <rect x="10" y="132" width="300" height="60" className="d-caixa" />
      <rect x="10" y="142" width="300" height="40" className="d-caixa-destaque" />
      <line x1="10" y1="162" x2="310" y2="162" className="d-traco" />
      <path d="M10 162 L60 144 L110 180 L160 144 L210 180 L260 144 L310 170" className="d-cota" />
      <path d="M10 162 L90 180 L170 144 L250 180 L310 160" className="d-linha" />
      <path d="M322 162 q14 -22 28 0" className="d-traco" />
      <text x="392" y="206" textAnchor="end" className="d-texto">pulso alargado</text>
      <line x1="10" y1="240" x2="390" y2="240" className="d-eixo" />
      <text x="10" y="232" className="d-texto">multimodo: centenas de metros</text>
      <text x="390" y="262" textAnchor="end" className="d-texto">monomodo: dezenas de km →</text>
    </Diagrama>
  );
}
