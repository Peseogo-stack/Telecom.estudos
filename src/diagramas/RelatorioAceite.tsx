import { Diagrama, type PropsDiagrama } from './Diagrama';

export function RelatorioAceite({ descricao }: PropsDiagrama) {
  const itens = ['Identificação', 'Calibração', 'λ, pulso, IOR', 'Dois sentidos', 'Perda e ORL', 'Orçamento', 'Mapa de fusão', 'As built'];
  return (
    <Diagrama titulo="O que conferir no relatório" descricao={descricao} viewBox="0 0 400 270">
      <rect x="10" y="10" width="160" height="250" rx="8" className="d-caixa" />
      {itens.map((t, i) => (
        <g key={t}>
          <rect x="22" y={24 + i * 29} width="16" height="16" rx="3" className="d-check" />
          <path d={`M25 ${32 + i * 29}l4 4l7-8`} className="d-check-marca" />
          <text x="46" y={37 + i * 29} className="d-texto">{t}</text>
        </g>
      ))}
      {/* traço de OTDR simplificado */}
      <line x1="190" y1="230" x2="390" y2="230" className="d-eixo" />
      <line x1="190" y1="230" x2="190" y2="40" className="d-eixo" />
      <text x="290" y="252" textAnchor="middle" className="d-texto d-suave">distância (km)</text>
      <text x="184" y="36" textAnchor="end" className="d-texto d-suave">dB</text>
      <path d="M192 50 L196 50 L198 70 L270 100 L272 112 L360 145 L362 60 L366 225 L388 226" className="d-traco" />
      <text x="200" y="64" className="d-texto">conector</text>
      <text x="276" y="96" className="d-texto">fusão</text>
      <text x="368" y="56" className="d-texto">fim</text>
    </Diagrama>
  );
}
