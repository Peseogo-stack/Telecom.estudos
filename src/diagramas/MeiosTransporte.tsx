import { Diagrama, type PropsDiagrama } from './Diagrama';

// Matriz meio × uso típico × limite, em cartões empilhados; seta do SDH para o MPLS-TP.
const MEIOS: { meio: string; uso: string[]; limite: string[] }[] = [
  { meio: 'Fibra (OPGW e ADSS)', uso: ['espinha dorsal, linhas novas de transmissão'], limite: ['custo e obra'] },
  { meio: 'Rádio privativo', uso: ['frequências dedicadas ao setor'], limite: ['espectro e licença'] },
  {
    meio: 'PLC: onda portadora na linha de alta tensão',
    uso: ['teleproteção e voz'],
    limite: ['taxa baixa: até 9600 bps (banda estreita)', 'e até 256 kbps (banda larga)'],
  },
  { meio: 'SDH', uso: ['TDM determinístico, banda dedicada'], limite: ['em migração para pacotes'] },
  { meio: 'MPLS-TP', uso: ['recursos do SDH em rede de pacotes'], limite: ['determinismo pior que o do SDH (Hitachi)'] },
  { meio: 'Celular 4G/5G', uso: ['backhaul da automação'], limite: ['APN privado ou público'] },
];

export function MeiosTransporte({ descricao }: PropsDiagrama) {
  let y = 4;
  const cartoes = MEIOS.map((m, i) => {
    const linhas = 1 + m.uso.length + m.limite.length;
    const h = 12 + linhas * 17 + 4;
    const topo = y;
    const migra = i === 3; // espaço maior entre SDH e MPLS-TP, para a seta
    y += h + (migra ? 26 : 8);
    return (
      <g key={m.meio}>
        <rect x="4" y={topo} width="392" height={h} rx="6" className="d-caixa" />
        <text x="14" y={topo + 20} className="d-texto d-forte">{m.meio}</text>
        <text x="14" y={topo + 37} className="d-texto d-suave">Uso</text>
        {m.uso.map((t, k) => <text key={t} x="62" y={topo + 37 + k * 17} className="d-texto">{t}</text>)}
        <text x="14" y={topo + 37 + m.uso.length * 17} className="d-texto d-suave">Limite</text>
        {m.limite.map((t, k) => <text key={t} x="62" y={topo + 37 + (m.uso.length + k) * 17} className="d-texto">{t}</text>)}
        {migra && (
          <g>
            <line x1="40" y1={topo + h + 2} x2="40" y2={topo + h + 20} className="d-linha-grossa" />
            <polygon points={`40,${topo + h + 25} 34,${topo + h + 15} 46,${topo + h + 15}`} className="d-marco" />
            <text x="56" y={topo + h + 18} className="d-texto d-forte">migração gradual</text>
          </g>
        )}
      </g>
    );
  });
  return (
    <Diagrama titulo="Meios de transporte × uso típico" descricao={descricao} viewBox={`0 0 400 ${y - 4}`}>
      {cartoes}
    </Diagrama>
  );
}
