import { Diagrama, type PropsDiagrama } from './Diagrama';

// Linha do tempo vertical com duas trilhas (LTR à esquerda, latest à direita).
// Caixas tracejadas são previsão; a faixa do meio é o "hoje" de 11/11/2026.
export function VersoesQgis({ descricao }: PropsDiagrama) {
  const caixa = (x: number, y: number, h: number, linhas: string[], opc?: { tracejada?: boolean; alerta?: boolean }) => (
    <g>
      <rect x={x} y={y} width="190" height={h} rx="6" className={`d-caixa${opc?.tracejada ? ' d-caixa-tracejada' : ''}`} />
      {linhas.map((t, i) => (
        <text key={t} x={x + 10} y={y + 20 + i * 18} className={`d-texto${i === 0 ? ' d-forte' : ''}${opc?.alerta && i > 0 ? ' d-alerta' : ''}`}>
          {t}
        </text>
      ))}
    </g>
  );
  return (
    <Diagrama titulo="Versões do QGIS em 11/11/2026" descricao={descricao} viewBox="0 0 400 436">
      <text x="101" y="18" textAnchor="middle" className="d-texto d-forte">LTR (suporte longo)</text>
      <text x="299" y="18" textAnchor="middle" className="d-texto d-forte">Latest (mais nova)</text>
      <line x1="200" y1="28" x2="200" y2="336" className="d-linha" />

      {caixa(6, 28, 42, ['3.44.0 · 20/06/2025', 'versão LTR'])}
      {caixa(204, 56, 28, ['4.0.0 · 06/03/2026'])}
      {caixa(204, 98, 42, ['4.2.0 · 03/07/2026', 'não virou LTR'], { alerta: true })}

      <rect x="6" y="150" width="388" height="52" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="200" y="171" textAnchor="middle" className="d-texto d-forte">Hoje: 11/11/2026</text>
      <text x="200" y="191" textAnchor="middle" className="d-texto">LTR 3.44.15 · latest 4.2.3</text>

      {caixa(204, 212, 60, ['4.4.0', 'prevista para 30/10/2026,', 'atrasada, sem data'], { tracejada: true })}
      {caixa(6, 274, 60, ['4.4.4', 'prevista para virar LTR', 'em 05/03/2027'], { tracejada: true })}

      <text x="200" y="358" textAnchor="middle" className="d-texto d-suave">caixa tracejada = previsão</text>
      <text x="200" y="392" textAnchor="middle" className="d-texto d-alerta">Datas da página de versões do QGIS</text>
      <text x="200" y="410" textAnchor="middle" className="d-texto d-alerta">em 11/11/2026. Confira antes de decidir.</text>
    </Diagrama>
  );
}
