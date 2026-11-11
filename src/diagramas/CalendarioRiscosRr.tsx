import { Diagrama, type PropsDiagrama } from './Diagrama';

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const X0 = 11;
const L = 31.5;
const x = (i: number) => X0 + i * L;

// Meses do calendário (0 = janeiro). Fontes: Embrapa (1989) e INPA (1999 a 2009); médias de séries antigas.
// Chuva em Boa Vista: maio a setembro, pico em junho, abril mais claro (pode começar no fim de abril).
// Seca e focos de calor: dezembro a março, pico em fevereiro e março (dois trechos: janeiro a março e dezembro).
function Meses({ y }: { y: number }) {
  return (
    <>
      {MESES.map((m, i) => (
        <text key={m} x={x(i) + L / 2} y={y} textAnchor="middle" className="d-texto d-suave">
          {m}
        </text>
      ))}
    </>
  );
}

function Grade({ y1, y2 }: { y1: number; y2: number }) {
  return (
    <>
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1={x(i)} y1={y1} x2={x(i)} y2={y2} className="d-grade" />
      ))}
    </>
  );
}

export function CalendarioRiscosRr({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Calendário de riscos em Roraima" descricao={descricao} viewBox="0 0 400 410">
      <defs>
        <pattern id="calrr-hachura" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="d-linha" />
        </pattern>
      </defs>

      {/* Bloco 1: chuva (barra cheia) */}
      <rect x="11" y="8" width="14" height="14" className="d-barra-ok" />
      <text x="32" y="20" className="d-texto d-forte">Chuva (Boa Vista)</text>
      <text x="32" y="38" className="d-texto">maio a setembro; pico em junho</text>
      <Meses y={62} />
      <Grade y1={68} y2={106} />
      <rect x={x(3)} y="80" width={L} height="14" className="d-faixa-vigente d-linha" />
      <rect x={x(4)} y="80" width={5 * L} height="14" className="d-barra-ok" />
      <rect x={x(5)} y="73" width={L} height="28" className="d-barra-ok" />
      <path d={`M${x(5) + L / 2} 103 L${x(5) + L / 2 - 4} 110 L${x(5) + L / 2 + 4} 110 Z`} className="d-seta" />
      <text x={x(5) + L / 2} y="125" textAnchor="middle" className="d-texto d-forte">pico</text>
      <text x="11" y="145" className="d-texto">Abril, mais claro: pode começar no fim de abril.</text>

      {/* Bloco 2: seca e focos de calor (barra hachurada, dois trechos) */}
      <rect x="11" y="170" width="14" height="14" className="d-caixa" />
      <rect x="11" y="170" width="14" height="14" fill="url(#calrr-hachura)" />
      <text x="32" y="182" className="d-texto d-forte">Seca e focos de calor</text>
      <text x="32" y="200" className="d-texto">dezembro a março; pico em fevereiro e março</text>
      <Meses y={224} />
      <Grade y1={230} y2={268} />
      {/* trecho 1: janeiro a março */}
      <rect x={x(0)} y="242" width={3 * L} height="14" className="d-caixa" />
      <rect x={x(0)} y="242" width={3 * L} height="14" fill="url(#calrr-hachura)" />
      {/* trecho 2: dezembro */}
      <rect x={x(11)} y="242" width={L} height="14" className="d-caixa" />
      <rect x={x(11)} y="242" width={L} height="14" fill="url(#calrr-hachura)" />
      {/* pico: fevereiro e março */}
      <rect x={x(1)} y="235" width={2 * L} height="28" className="d-caixa" />
      <rect x={x(1)} y="235" width={2 * L} height="28" fill="url(#calrr-hachura)" />
      <path d={`M${x(2)} 265 L${x(2) - 4} 272 L${x(2) + 4} 272 Z`} className="d-seta" />
      <text x={x(2)} y="287" textAnchor="middle" className="d-texto d-forte">pico</text>
      <text x="11" y="307" className="d-texto">Dezembro continua em janeiro.</text>

      {/* Notas */}
      <rect x="11" y="324" width="378" height="36" rx="6" className="d-caixa" />
      <text x="20" y="340" className="d-texto">Fontes: Embrapa (1989) e INPA (1999 a 2009).</text>
      <text x="20" y="355" className="d-texto">Médias de séries antigas.</text>
      <rect x="11" y="368" width="378" height="36" rx="6" className="d-zona-risco" />
      <text x="20" y="384" className="d-texto d-alerta">Raio, chuva forte, vento ou fogo perto da rede:</text>
      <text x="20" y="399" className="d-texto d-alerta">parar e comunicar.</text>
    </Diagrama>
  );
}
