import { Diagrama, type PropsDiagrama } from './Diagrama';

// Escala: 1 m = 200 unidades. Condutor de BT em (230, 150).
export function ZonasPoste({ descricao }: PropsDiagrama) {
  const cx = 230;
  const cy = 150;
  const m = 200;
  const yTelecom = cy + 0.6 * m;
  const d45 = Math.SQRT1_2;
  return (
    <Diagrama titulo="Zonas da NR-10 em volta da baixa tensão e o cabo de telecom" descricao={descricao} viewBox="0 0 400 380">
      <rect x="60" y="10" width="18" height="290" className="d-poste" />
      <circle cx={cx} cy={cy} r={0.7 * m} className="d-zona-controlada" />
      <circle cx={cx} cy={cy} r={0.2 * m} className="d-zona-risco" />
      <line x1="78" y1={cy} x2="390" y2={cy} className="d-cabo-bt" />
      <circle cx={cx} cy={cy} r="5" className="d-ponto" />
      <text x={cx + 10} y={cy - 8} className="d-texto d-forte">BT</text>
      {/* Rr */}
      <line x1={cx} y1={cy} x2={cx - 0.2 * m * d45} y2={cy - 0.2 * m * d45} className="d-cota" />
      <text x={cx - 92} y={cy - 30} className="d-texto">Rr 0,20 m</text>
      {/* Rc */}
      <line x1={cx} y1={cy} x2={cx + 0.7 * m * d45} y2={cy + 0.7 * m * d45} className="d-cota" />
      <text x={cx + 50} y={cy + 62} className="d-texto">Rc 0,70 m</text>
      {/* cabo de telecom */}
      <line x1="78" y1={yTelecom} x2="390" y2={yTelecom} className="d-cabo-telecom" />
      <text x="320" y={yTelecom + 18} className="d-texto d-forte">telecom</text>
      <line x1="112" y1={cy} x2="112" y2={yTelecom} className="d-cota" />
      <text x="118" y={cy + 0.3 * m + 4} className="d-texto">0,60 m</text>
      {/* mão e braço */}
      <circle cx="270" cy={yTelecom - 2} r="9" className="d-mao" />
      <line x1="270" y1={yTelecom + 7} x2="270" y2="300" className="d-braco" />
      <text x="280" y="318" className="d-texto">mão / ferramenta</text>
      {/* legenda */}
      <text x="84" y="300" className="d-texto d-alerta">0,60 &lt; 0,70 → dentro da ZC</text>
      <text x="20" y="338" className="d-texto">Círculo vermelho: zona de risco (ZR)</text>
      <text x="20" y="354" className="d-texto">Círculo tracejado: zona controlada (ZC)</text>
      <text x="20" y="370" className="d-texto">Fora dos círculos: zona livre (ZL)</text>
    </Diagrama>
  );
}
