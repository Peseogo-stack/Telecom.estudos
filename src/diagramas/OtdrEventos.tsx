import { Diagrama, type PropsDiagrama } from './Diagrama';
import { TracoSvg } from '../ferramentas/otdr/TracoSvg';
import type { Cenario } from '../ferramentas/otdr/traco';

// Traço didático em 1310 e 1550 nm com os eventos mais comuns. Valores típicos: VIAVI (2023).
const CENARIO: Cenario = {
  nivel: 'dificil',
  indice: 1,
  projetoKm: 8,
  lambdas: [1310, 1550],
  kmMax: 10.4,
  eventos: [
    { tipo: 'conector', km: 1.8, perda: { 1310: 0.35, 1550: 0.35 }, refletancia: -55 },
    { tipo: 'fusao', km: 3.4, perda: { 1310: 0.12, 1550: 0.12 }, refletancia: null },
    { tipo: 'curvatura', km: 5, perda: { 1310: 0.15, 1550: 1.1 }, refletancia: null },
    { tipo: 'ganho', km: 6.4, perda: { 1310: -0.12, 1550: -0.12 }, refletancia: null },
    { tipo: 'fim', km: 8.08, perda: { 1310: 0, 1550: 0 }, refletancia: -16 },
  ],
};

const LEGENDA = [
  'A  conector: pico e degrau',
  'B  fusão: degrau sem pico, igual nas duas λ',
  'C  curvatura: degrau sem pico, maior em 1550 nm',
  'D  ganho aparente: degrau para cima (peça o outro sentido)',
  'E  fim da fibra: pico alto e queda para o ruído',
];

export function OtdrEventos({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Eventos no traço do OTDR" descricao={descricao} viewBox="0 0 400 340">
      <TracoSvg
        cenario={CENARIO}
        marcadores={[
          { km: 1.8, rotulo: 'A' },
          { km: 3.4, rotulo: 'B' },
          { km: 5, rotulo: 'C' },
          { km: 6.4, rotulo: 'D' },
          { km: 8.08, rotulo: 'E' },
        ]}
      />
      {LEGENDA.map((l, i) => (
        <text key={i} x="4" y={268 + i * 16} className="d-texto" style={{ fontSize: 11.5 }}>
          {l}
        </text>
      ))}
      <text x="396" y="20" textAnchor="end" className="d-texto d-suave" style={{ fontSize: 10 }}>
        degraus ampliados 3×
      </text>
    </Diagrama>
  );
}
