import { Diagrama, type PropsDiagrama } from './Diagrama';

// Esquema (não é mapa): os mesmos 8 postes em três quadros. Camada inteira; selecionar (2 destacados,
// os 8 visíveis); filtrar (só os 2 aparecem, os outros 6 ficam como contorno tracejado e a camada ganha um funil).
const PONTOS: Array<[number, number]> = [
  [50, 0], [140, 0], [230, 0], [320, 0],
  [90, 1], [180, 1], [270, 1], [360, 1],
];
const DESTAQUE = new Set([2, 4]); // os 2 postes com "ocupantes_qtd" > 5

export function FiltrarXSelecionar({ descricao }: PropsDiagrama) {
  const ponto = (i: number, y0: number, modo: 'todos' | 'selecao' | 'filtro') => {
    const [x, linha] = PONTOS[i];
    const y = y0 + 52 + linha * 30;
    const destaque = DESTAQUE.has(i);
    if (modo === 'todos') return <circle key={i} cx={x} cy={y} r="6" className="d-poste" style={{ strokeWidth: 1.5 }} />;
    if (destaque) return <circle key={i} cx={x} cy={y} r="8" className="d-ponto" />;
    if (modo === 'selecao') return <circle key={i} cx={x} cy={y} r="6" className="d-poste" style={{ strokeWidth: 1.5 }} />;
    return <circle key={i} cx={x} cy={y} r="6" className="d-caixa d-caixa-tracejada" />;
  };
  const nomeCamada = (y0: number, funil: boolean) => (
    <g>
      <text x="318" y={y0 + 24} className="d-texto d-suave">postes</text>
      {funil && <path d={`M358 ${y0 + 12} h18 l-7 8 v9 l-4 -3 v-6 z`} className="d-seta" style={{ stroke: 'currentColor' }} />}
    </g>
  );

  const y1 = 6;
  const y2 = 106;
  const y3 = 238;
  return (
    <Diagrama titulo="Selecionar marca; filtrar esconde" descricao={descricao} viewBox="0 0 400 420">
      {/* 1. camada inteira */}
      <rect x="6" y={y1} width="388" height="92" rx="6" className="d-caixa" />
      <text x="16" y={y1 + 24} className="d-texto d-forte">Camada inteira: 8 feições</text>
      {nomeCamada(y1, false)}
      {PONTOS.map((_, i) => ponto(i, y1, 'todos'))}

      {/* 2. selecionar */}
      <rect x="6" y={y2} width="388" height="124" rx="6" className="d-caixa" />
      <text x="16" y={y2 + 24} className="d-texto d-forte">{'Selecionar "ocupantes_qtd" > 5'}</text>
      {nomeCamada(y2, false)}
      {PONTOS.map((_, i) => ponto(i, y2, 'selecao'))}
      <text x="16" y={y2 + 116} className="d-texto">2 selecionadas de 8</text>

      {/* 3. filtrar */}
      <rect x="6" y={y3} width="388" height="148" rx="6" className="d-caixa" />
      <text x="16" y={y3 + 24} className="d-texto d-forte">{'Filtrar "ocupantes_qtd" > 5'}</text>
      {nomeCamada(y3, true)}
      {PONTOS.map((_, i) => ponto(i, y3, 'filtro'))}
      <circle cx="22" cy={y3 + 112} r="6" className="d-caixa d-caixa-tracejada" />
      <text x="36" y={y3 + 116} className="d-texto">fora do projeto até tirar o filtro</text>
      <text x="16" y={y3 + 138} className="d-texto d-forte">a contagem passa a ser 2</text>

      <text x="200" y="410" textAnchor="middle" className="d-texto d-alerta">Nenhum dos dois altera o arquivo.</text>
    </Diagrama>
  );
}
