import { Diagrama, type PropsDiagrama } from './Diagrama';
import { CORES } from '../ferramentas/cores/cores';

// Mesmas cores da ferramenta Código de cores (uma fonte só para as duas telas).
const LINHA = 21;
const TOPO = 44;

export function CoresBrTia({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="As 12 cores: Brasil × TIA-598" descricao={descricao} viewBox="0 0 400 300">
      <text x="150" y="20" textAnchor="end" className="d-texto d-forte">
        Brasil
      </text>
      <text x="200" y="20" textAnchor="middle" className="d-texto d-suave">
        nº
      </text>
      <text x="250" y="20" className="d-texto d-forte">
        TIA-598
      </text>
      {/* destaque da fibra 1, a que mais se troca */}
      <rect x="20" y={TOPO - 15} width="360" height={LINHA} rx="6" className="d-faixa-vigente" />
      {CORES.abnt.map((br, i) => {
        const tia = CORES.tia598[i];
        const y = TOPO + i * LINHA;
        return (
          <g key={i}>
            <text x="150" y={y} textAnchor="end" className="d-texto">
              {br.nome}
            </text>
            <rect x="158" y={y - 11} width="26" height="14" rx="3" className="d-amostra" style={{ fill: br.hex }} />
            <text x="200" y={y} textAnchor="middle" className="d-texto d-forte">
              {i + 1}
            </text>
            <rect x="216" y={y - 11} width="26" height="14" rx="3" className="d-amostra" style={{ fill: tia.hex }} />
            <text x="250" y={y} className="d-texto">
              {tia.nome}
            </text>
          </g>
        );
      })}
    </Diagrama>
  );
}
