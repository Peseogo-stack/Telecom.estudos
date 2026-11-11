import { Diagrama, type PropsDiagrama } from './Diagrama';

// Cinco cortes de cabo (fora de escala), um por linha: o que sustenta e onde vai.
const LINHA = 86;

function Tubo({ x, y, r = 9 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} className="d-caixa-destaque" />
      <circle cx={x - 3} cy={y - 2} r="1.8" className="d-seta" />
      <circle cx={x + 3} cy={y - 2} r="1.8" className="d-seta" />
      <circle cx={x} cy={y + 3} r="1.8" className="d-seta" />
    </g>
  );
}

export function TiposCabo({ descricao }: PropsDiagrama) {
  const textos: [string, string, string][] = [
    ['Autossustentado (AS)', 'segura: aramida', 'poste a poste, vão de 80, 120 ou 200 m'],
    ['Duto (DD)', 'sem vão máximo na ficha', 'duto, subduto ou aéreo preso à cordoalha'],
    ['Drop flat', 'segura: 2 fios de fibra de vidro', 'do poste ao cliente, vão de até 80 m'],
    ['Drop figura 8', 'segura: fio de AÇO de 1,30 mm', 'do poste ao cliente, vão de até 80 m'],
    ['OPGW', 'cabo para-raios com fibras', 'no alto das linhas de transmissão'],
  ];
  const cx = 52;
  const y0 = 44;
  return (
    <Diagrama titulo="Cinco tipos de cabo: o que segura e onde vai" descricao={descricao} viewBox={`0 0 400 ${y0 + LINHA * 5 - 30}`}>
      {/* 1. autossustentado */}
      <circle cx={cx} cy={y0} r="30" className="d-capa-cabo" />
      <circle cx={cx} cy={y0} r="24" className="d-caixa" style={{ strokeDasharray: '3 2', strokeWidth: 3 }} />
      {[0, 1, 2, 3].map((i) => (
        <Tubo key={i} x={cx + 11 * Math.cos((i * Math.PI) / 2 + Math.PI / 4)} y={y0 + 11 * Math.sin((i * Math.PI) / 2 + Math.PI / 4)} r={7} />
      ))}
      {/* 2. duto */}
      <circle cx={cx} cy={y0 + LINHA} r="30" className="d-capa-cabo" />
      <circle cx={cx} cy={y0 + LINHA} r="24" className="d-caixa" />
      {[0, 1, 2, 3].map((i) => (
        <Tubo key={i} x={cx + 11 * Math.cos((i * Math.PI) / 2 + Math.PI / 4)} y={y0 + LINHA + 11 * Math.sin((i * Math.PI) / 2 + Math.PI / 4)} r={7} />
      ))}
      {/* 3. drop flat */}
      <rect x={cx - 40} y={y0 + 2 * LINHA - 16} width="80" height="32" rx="16" className="d-capa-cabo" />
      <circle cx={cx - 26} cy={y0 + 2 * LINHA} r="5" className="d-poste" />
      <circle cx={cx + 26} cy={y0 + 2 * LINHA} r="5" className="d-poste" />
      <Tubo x={cx} y={y0 + 2 * LINHA} />
      {/* 4. figura 8 */}
      <circle cx={cx} cy={y0 + 3 * LINHA - 18} r="9" className="d-capa-cabo" />
      <circle cx={cx} cy={y0 + 3 * LINHA - 18} r="4" className="d-ponto" />
      <rect x={cx - 3} y={y0 + 3 * LINHA - 10} width="6" height="8" className="d-capa-cabo" />
      <circle cx={cx} cy={y0 + 3 * LINHA + 12} r="16" className="d-capa-cabo" />
      <Tubo x={cx} y={y0 + 3 * LINHA + 12} />
      {/* 5. OPGW */}
      <circle cx={cx} cy={y0 + 4 * LINHA} r="30" className="d-poste" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i} cx={cx + 20 * Math.cos((i * Math.PI) / 4)} cy={y0 + 4 * LINHA + 20 * Math.sin((i * Math.PI) / 4)} r="8" className="d-caixa" />
      ))}
      <Tubo x={cx} y={y0 + 4 * LINHA} r={10} />
      {textos.map(([nome, segura, onde], i) => (
        <g key={nome}>
          <text x="100" y={y0 - 16 + i * LINHA} className="d-texto d-forte">
            {nome}
          </text>
          <text x="100" y={y0 + 2 + i * LINHA} className={i === 3 ? 'd-texto d-alerta' : 'd-texto'}>
            {segura}
          </text>
          <text x="100" y={y0 + 20 + i * LINHA} className="d-texto d-suave">
            {onde}
          </text>
          {i < 4 && <line x1="4" y1={y0 + 44 + i * LINHA} x2="396" y2={y0 + 44 + i * LINHA} className="d-linha" strokeDasharray="4 4" />}
        </g>
      ))}
    </Diagrama>
  );
}
