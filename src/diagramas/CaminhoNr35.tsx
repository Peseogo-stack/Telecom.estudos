import { Diagrama, type PropsDiagrama } from './Diagrama';

// Fluxo da NR-35 no poste: de cima para baixo, com a bifurcação rotineira × não rotineira.
export function CaminhoNr35({ descricao }: PropsDiagrama) {
  const caixa = (x: number, y: number, w: number, h: number, linhas: string[], destaque = false, alerta?: number) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" className={destaque ? 'd-caixa d-caixa-destaque' : 'd-caixa'} />
      {linhas.map((t, i) => (
        <text
          key={t}
          x={x + w / 2}
          y={y + 17 + i * 16}
          textAnchor="middle"
          className={i === 0 ? 'd-texto d-forte' : i === alerta ? 'd-texto d-alerta' : 'd-texto'}
        >
          {t}
        </text>
      ))}
    </g>
  );
  const seta = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const l = Math.hypot(dx, dy);
    const ux = dx / l;
    const uy = dy / l;
    const bx = x2 - ux * 8;
    const by = y2 - uy * 8;
    return (
      <g>
        <line x1={x1} y1={y1} x2={bx} y2={by} className="d-linha-grossa" />
        <polygon points={`${x2},${y2} ${bx - uy * 5},${by + ux * 5} ${bx + uy * 5},${by - ux * 5}`} className="d-marco" />
      </g>
    );
  };
  return (
    <Diagrama titulo="Do chão ao alto: o caminho da NR-35 no poste" descricao={descricao} viewBox="0 0 400 470">
      {caixa(40, 4, 320, 40, ['Diferença de nível acima de 2,0 m', 'com risco de queda: vale a NR-35'], true)}
      {seta(200, 44, 200, 62)}
      {caixa(40, 62, 320, 56, ['Autorizado pela empresa', 'capacitado (presencial; periódico a cada 2 anos)', 'e apto, com registro no ASO'])}
      {seta(200, 118, 200, 136)}
      {caixa(40, 136, 320, 40, ['Análise de risco', 'antes de todo trabalho em altura'], true)}
      {seta(150, 176, 103, 198)}
      {seta(250, 176, 297, 198)}
      {caixa(4, 198, 192, 74, ['Rotineira', 'análise de risco no', 'procedimento operacional'])}
      {caixa(204, 198, 192, 74, ['Não rotineira: PT', 'NR-35: turno ou jornada', 'nova NR-10, proximidade', '(06/2027): só o turno'], false, 3)}
      {seta(103, 272, 150, 292)}
      {seta(297, 272, 250, 292)}
      {caixa(40, 292, 320, 40, ['Avaliação prévia no local', 'anormalidade: não começa e avisa'], false, 1)}
      {seta(200, 332, 200, 350)}
      {caixa(40, 350, 320, 40, ['SPIQ inspecionado antes do uso', 'e conectado o tempo todo'], true)}
      {seta(200, 390, 200, 408)}
      {caixa(40, 408, 320, 40, ['Resgate planejado antes de subir', 'equipe, tempo e técnica definidos'])}
      <text x="200" y="464" textAnchor="middle" className="d-texto d-suave">
        Lembrete: vale o procedimento da empresa.
      </text>
    </Diagrama>
  );
}
