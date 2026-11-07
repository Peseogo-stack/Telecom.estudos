import { Diagrama, type PropsDiagrama } from './Diagrama';

export function Escalonamento({ descricao }: PropsDiagrama) {
  const degraus = ['Atendimento inicial (central)', 'Suporte técnico especializado', 'Engenharia / campo', 'Gerente de contas'];
  return (
    <Diagrama titulo="Escada de escalonamento" descricao={descricao} viewBox="0 0 400 260">
      {degraus.map((d, i) => {
        const x = 10 + i * 40;
        const y = 200 - i * 56;
        return (
          <g key={d}>
            <rect x={x} y={y} width={250} height="44" rx="6" className={i === 3 ? 'd-caixa d-caixa-destaque' : 'd-caixa'} />
            <text x={x + 12} y={y + 27} className="d-texto">
              <tspan className="d-forte">{i + 1}</tspan> {d}
            </text>
            <circle cx={x + 275} cy={y + 22} r="12" className="d-relogio" />
            <line x1={x + 275} y1={y + 22} x2={x + 275} y2={y + 14} className="d-linha" />
            <line x1={x + 275} y1={y + 22} x2={x + 281} y2={y + 22} className="d-linha" />
          </g>
        );
      })}
      <text x="10" y="18" className="d-texto d-suave">Prazos de cada nível: no contrato.</text>
      <text x="10" y="36" className="d-texto d-suave">Funcional = técnico · Hierárquico = gestão.</text>
    </Diagrama>
  );
}
