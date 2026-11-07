import { Diagrama, type PropsDiagrama } from './Diagrama';
import { CORES } from '../ferramentas/cores/cores';

// Corte de um cabo com 6 tubos em volta do elemento central (fora de escala).
// Esquerda: tubos coloridos (ficha Furukawa). Direita: piloto e direcional (fichas Prysmian e Transcend).
const R_TUBO = 21;
const R_ANEL = 46;
const BRANCO = '#f8fafc';

/** Cor do número dentro do tubo: escuro nos tubos claros, claro nos escuros. */
const CLAROS = new Set(['#facc15', '#ffffff', BRANCO]);

function Corte({ cx, cy, cores }: { cx: number; cy: number; cores: string[] }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="80" className="d-capa-cabo" />
      <circle cx={cx} cy={cy} r="72" className="d-caixa" />
      <circle cx={cx} cy={cy} r="14" className="d-caixa-destaque" />
      <text x={cx} y={cy + 4} textAnchor="middle" className="d-texto" style={{ fontSize: 9 }}>
        FRP
      </text>
      {cores.map((hex, i) => {
        // Tubo 1 no alto; os demais seguem no sentido horário (o sentido do direcional neste desenho).
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        const x = cx + R_ANEL * Math.cos(a);
        const y = cy + R_ANEL * Math.sin(a);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={R_TUBO} className="d-amostra" style={{ fill: hex }} />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              className="d-forte"
              style={{ fontSize: 14, fill: CLAROS.has(hex) ? '#111111' : '#ffffff' }}
            >
              {i + 1}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function TubosPiloto({ descricao }: PropsDiagrama) {
  const coloridos = CORES.abnt.slice(0, 6).map((c) => c.hex);
  const piloto = [CORES.abnt[0].hex, CORES.abnt[1].hex, BRANCO, BRANCO, BRANCO, BRANCO];
  // Seta da contagem no corte da direita: do tubo 1 (alto) ao tubo 3, por fora da capa.
  const cx = 300;
  const cy = 112;
  const r = 92;
  const ponto = (graus: number) => {
    const a = (graus * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  };
  return (
    <Diagrama titulo="Tubos coloridos × piloto e direcional (fora de escala)" descricao={descricao} viewBox="0 0 400 262">
      <Corte cx={100} cy={112} cores={coloridos} />
      <Corte cx={cx} cy={cy} cores={piloto} />
      <path d={`M ${ponto(-80)} A ${r} ${r} 0 0 1 ${ponto(22)}`} className="d-linha" />
      <path d="M0 0 L-7 -4 L-7 4 Z" className="d-seta" transform={`translate(${ponto(24)}) rotate(115)`} />
      <text x="396" y="16" textAnchor="end" className="d-texto d-suave" style={{ fontSize: 10 }}>
        sentido da contagem
      </text>
      <text x="100" y="216" textAnchor="middle" className="d-texto d-forte">
        Tubos coloridos
      </text>
      <text x="100" y="232" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 11 }}>
        mesmas cores das fibras
      </text>
      <text x="300" y="216" textAnchor="middle" className="d-texto d-forte">
        Piloto e direcional
      </text>
      <text x="300" y="232" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 11 }}>
        1 verde (piloto), 2 amarelo (direcional)
      </text>
      <text x="300" y="248" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 11 }}>
        e os brancos na sequência
      </text>
    </Diagrama>
  );
}
