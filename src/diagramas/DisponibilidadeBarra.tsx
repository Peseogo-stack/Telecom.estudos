import { Diagrama, type PropsDiagrama } from './Diagrama';

// Barra de 43.200 min. As fatias de parada são exageradas 20× para ficarem visíveis (aviso no desenho).
export function DisponibilidadeBarra({ descricao }: PropsDiagrama) {
  const largura = 340;
  const linhas = [
    { sla: '99,9%', min: 43.2 },
    { sla: '99,7%', min: 129.6 },
    { sla: '99,5%', min: 216 },
  ];
  return (
    <Diagrama titulo="Parada permitida num mês de 30 dias (43.200 min)" descricao={descricao} viewBox="0 0 400 210">
      {linhas.map((l, i) => {
        const y = 30 + i * 52;
        const fatia = (l.min / 43200) * largura * 20;
        return (
          <g key={l.sla}>
            <text x="10" y={y + 16} className="d-texto d-forte">{l.sla}</text>
            <rect x="52" y={y} width={largura - fatia} height="24" className="d-barra-ok" />
            <rect x={52 + largura - fatia} y={y} width={fatia} height="24" className="d-barra-parada" />
            <text x={52 + largura - 4} y={y + 40} textAnchor="end" className="d-texto">
              {l.min.toLocaleString('pt-BR')} min permitidos
            </text>
          </g>
        );
      })}
      <text x="52" y="200" className="d-texto d-suave">Fatias vermelhas ampliadas 20× para aparecer no desenho.</text>
    </Diagrama>
  );
}
