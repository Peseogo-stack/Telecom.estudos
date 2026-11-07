import { Diagrama, type PropsDiagrama } from './Diagrama';
import { TracoSvg } from '../ferramentas/otdr/TracoSvg';
import type { Cenario } from '../ferramentas/otdr/traco';

// Traço didático em 1310 nm: rampa (retroespalhamento), pico (Fresnel), degrau (fusão) e fim.
const CENARIO: Cenario = {
  nivel: 'facil',
  indice: 1,
  projetoKm: 8,
  lambdas: [1310],
  kmMax: 10.4,
  eventos: [
    { tipo: 'conector', km: 3, perda: { 1310: 0.35, 1550: 0.35 }, refletancia: -55 },
    { tipo: 'fusao', km: 5.5, perda: { 1310: 0.15, 1550: 0.15 }, refletancia: null },
    { tipo: 'fim', km: 8.08, perda: { 1310: 0, 1550: 0 }, refletancia: -16 },
  ],
};

const LEGENDA = [
  '1  zona morta do início (o pulso cega o receptor)',
  '2  rampa: retroespalhamento; a inclinação dá o dB/km',
  '3  pico: reflexão de Fresnel num conector, e o degrau da perda',
  '4  degrau sem pico: fusão',
  '5  fim da fibra: pico alto e queda para o ruído',
];

export function OtdrComoEnxerga({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Como o OTDR enxerga a fibra" descricao={descricao} viewBox="0 0 400 340">
      <TracoSvg
        cenario={CENARIO}
        marcadores={[
          { km: 0.12, rotulo: '1', db: 8 },
          { km: 1.6, rotulo: '2' },
          { km: 3, rotulo: '3' },
          { km: 5.5, rotulo: '4' },
          { km: 8.08, rotulo: '5' },
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
