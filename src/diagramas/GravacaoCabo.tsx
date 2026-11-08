import { Diagrama, type PropsDiagrama } from './Diagrama';

// Modelo de gravação: fichas Prysmian (CFOA AS e duto) e Transcend AS. Marcação de metro fictícia.
// Cada parte é um <text> separado, centrado num x fixo, para os números de cima não dependerem da largura da fonte.
const PARTES = [
  { texto: 'CFOA', x: 99.5, n: 1 },
  { texto: '-', x: 128.5 },
  { texto: 'SM', x: 147, n: 2 },
  { texto: '-', x: 165.5 },
  { texto: 'AS80', x: 192, n: 3 },
  { texto: '-', x: 218.5 },
  { texto: 'S', x: 230.5, n: 4 },
  { texto: '12FO', x: 267.5, n: 5 },
  { texto: 'NR', x: 311, n: 6 },
];

const LEGENDA = [
  ['CFOA', 'cabo de fibra óptica'],
  ['SM', 'fibra monomodo'],
  ['AS80', 'autossustentado, vão de até 80 m'],
  ['S', 'núcleo seco (G = geleado)'],
  ['12FO', '12 fibras'],
  ['NR', 'classe da capa (RC = retardante à chama)'],
];

export function GravacaoCabo({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Gravação do cabo, parte por parte" descricao={descricao} viewBox="0 0 400 300">
      {/* cabo com a gravação */}
      <rect x="8" y="34" width="384" height="40" rx="20" className="d-capa-cabo" />
      {PARTES.map((p, i) => (
        <g key={i}>
          <text x={p.x} y="60" textAnchor="middle" className="d-texto-capa" style={{ fontSize: 16 }}>
            {p.texto}
          </text>
          {p.n && (
            <>
              <line x1={p.x} x2={p.x} y1="25" y2="34" className="d-linha" />
              <circle cx={p.x} cy="16" r="9" className="d-marco-letra" />
              <text x={p.x} y="20" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>
                {p.n}
              </text>
            </>
          )}
        </g>
      ))}

      {/* legenda */}
      {LEGENDA.map(([parte, sentido], i) => (
        <g key={parte}>
          <circle cx="20" cy={96 + i * 19} r="8" className="d-marco-letra" />
          <text x="20" y={100 + i * 19} textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10 }}>
            {i + 1}
          </text>
          <text x="36" y={100 + i * 19} className="d-texto d-forte">
            {parte}
          </text>
          <text x="84" y={100 + i * 19} className="d-texto">
            {sentido}
          </text>
        </g>
      ))}

      {/* marcação de metro */}
      <text x="8" y="222" className="d-texto d-suave" style={{ fontSize: 11 }}>
        Duas marcações do mesmo cabo:
      </text>
      <rect x="8" y="230" width="150" height="26" rx="13" className="d-capa-cabo" />
      <text x="83" y="248" textAnchor="middle" className="d-texto-capa" style={{ fontSize: 13 }}>
        … 01180 M
      </text>
      <line x1="158" x2="242" y1="243" y2="243" className="d-cota" />
      <rect x="242" y="230" width="150" height="26" rx="13" className="d-capa-cabo" />
      <text x="317" y="248" textAnchor="middle" className="d-texto-capa" style={{ fontSize: 13 }}>
        … 02350 M
      </text>
      <text x="200" y="282" textAnchor="middle" className="d-texto d-forte">
        2350 − 1180 = 1170 m de cabo entre elas
      </text>
    </Diagrama>
  );
}
