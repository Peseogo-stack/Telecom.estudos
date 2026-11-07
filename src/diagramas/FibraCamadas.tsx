import { Diagrama, type PropsDiagrama } from './Diagrama';

// Fora de escala (o núcleo de 9 µm sumiria ao lado do buffer de 900 µm).
export function FibraCamadas({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Camadas da fibra (fora de escala)" descricao={descricao} viewBox="0 0 400 240">
      <g transform="translate(110 115)">
        <circle r="95" className="d-caixa" />
        <circle r="70" className="d-faixa-vigente" />
        <circle r="45" className="d-caixa-destaque" />
        <circle r="9" className="d-marco" />
      </g>
      <text x="110" y="20" textAnchor="middle" className="d-texto">tight buffer 900 µm (cordões)</text>
      <text x="110" y="232" textAnchor="middle" className="d-texto">monomodo 9/125</text>
      <line x1="110" y1="115" x2="200" y2="70" className="d-linha" />
      <text x="203" y="66" className="d-texto">núcleo ~9 µm</text>
      <line x1="150" y1="105" x2="200" y2="92" className="d-linha" />
      <text x="203" y="96" className="d-texto">casca 125 µm (vidro)</text>
      <line x1="170" y1="130" x2="200" y2="124" className="d-linha" />
      <text x="203" y="128" className="d-texto">revestimento ~250 µm</text>
      <g transform="translate(330 190)">
        <circle r="40" className="d-caixa-destaque" />
        <circle r="16" className="d-marco" />
      </g>
      <text x="330" y="232" textAnchor="middle" className="d-texto">multimodo 50/125</text>
    </Diagrama>
  );
}
