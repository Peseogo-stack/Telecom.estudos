import { Diagrama, type PropsDiagrama } from './Diagrama';

// Vista de lado. Escala: 1 m = 200 unidades. Condutor de BT na altura cy.
// Cada ponto do condutor é ponto energizado, então as zonas são faixas que
// acompanham o cabo inteiro (inclusive junto ao poste), não círculos em volta de um ponto.
export function ZonasPoste({ descricao }: PropsDiagrama) {
  const cy = 160;
  const m = 200;
  const rr = 0.2 * m;
  const rc = 0.7 * m;
  const yTelecom = cy + 0.6 * m;
  const xIni = 10;
  const xFim = 390;
  const largura = xFim - xIni;
  return (
    <Diagrama titulo="Zonas da NR-10 em volta da baixa tensão e o cabo de telecom" descricao={descricao} viewBox="0 0 400 412">
      <rect x="60" y="8" width="18" height="330" className="d-poste" />
      <rect x={xIni} y={cy - rc} width={largura} height={2 * rc} className="d-zona-controlada" />
      <rect x={xIni} y={cy - rr} width={largura} height={2 * rr} className="d-zona-risco" />
      <line x1={xIni} y1={cy} x2={xFim} y2={cy} className="d-cabo-bt" />
      <text x="200" y={cy - 8} className="d-texto d-forte">condutor de BT</text>
      {/* Rr e Rc, cotados a partir do condutor */}
      <line x1="380" y1={cy} x2="380" y2={cy - rr} className="d-cota" />
      <text x="374" y={cy - 22} textAnchor="end" className="d-texto">Rr 0,20 m</text>
      <line x1="380" y1={cy} x2="380" y2={cy + rc} className="d-cota" />
      <text x="374" y={cy + 72} textAnchor="end" className="d-texto">Rc 0,70 m</text>
      {/* cabo de telecom no afastamento mínimo das normas de exemplo */}
      <line x1={xIni} y1={yTelecom} x2={xFim} y2={yTelecom} className="d-cabo-telecom" />
      <text x="150" y={yTelecom - 8} className="d-texto d-forte">cabo de telecom</text>
      <line x1="112" y1={cy} x2="112" y2={yTelecom} className="d-cota" />
      <text x="118" y={cy + 0.3 * m + 4} className="d-texto">0,60 m</text>
      <text x="118" y={cy + 0.45 * m + 2} className="d-texto d-alerta">0,60 &lt; 0,70 → dentro da ZC</text>
      {/* mão e braço */}
      <circle cx="270" cy={yTelecom - 2} r="9" className="d-mao" />
      <line x1="270" y1={yTelecom + 7} x2="270" y2="334" className="d-braco" />
      <text x="282" y="330" className="d-texto">mão / ferramenta</text>
      {/* legenda */}
      <text x="12" y="358" className="d-texto">Faixa vermelha: zona de risco (ZR), até 0,20 m do condutor</text>
      <text x="12" y="374" className="d-texto">Faixa tracejada: zona controlada (ZC), até 0,70 m</text>
      <text x="12" y="390" className="d-texto">As faixas seguem o condutor em todo o comprimento.</text>
      <text x="12" y="406" className="d-texto">Fora das faixas: zona livre (ZL)</text>
    </Diagrama>
  );
}
