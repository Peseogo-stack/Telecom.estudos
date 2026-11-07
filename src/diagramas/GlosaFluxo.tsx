import { Diagrama, type PropsDiagrama } from './Diagrama';

export function GlosaFluxo({ descricao }: PropsDiagrama) {
  const passos = [
    'Registrar paradas (protocolo e horários)',
    'Tirar as exclusões do contrato',
    'Somar o tempo que conta (Ti)',
    'Calcular D = (To − Ti) ÷ To',
    'Comparar com o SLA',
    'Aplicar a regra e escrever a memória',
  ];
  return (
    <Diagrama titulo="Do chamado à glosa" descricao={descricao} viewBox="0 0 400 330">
      <defs>
        <marker id="seta-glosa" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="d-seta" />
        </marker>
      </defs>
      {passos.map((p, i) => {
        const y = 10 + i * 53;
        return (
          <g key={p}>
            <rect x="40" y={y} width="320" height="38" rx="8" className={i === 5 ? 'd-caixa d-caixa-destaque' : 'd-caixa'} />
            <text x="56" y={y + 24} className="d-texto">
              <tspan className="d-forte">{i + 1}.</tspan> {p}
            </text>
            {i < passos.length - 1 && <line x1="200" y1={y + 38} x2="200" y2={y + 52} className="d-linha" markerEnd="url(#seta-glosa)" />}
          </g>
        );
      })}
    </Diagrama>
  );
}
