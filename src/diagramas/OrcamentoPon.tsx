import { Diagrama, type PropsDiagrama } from './Diagrama';

// Visualização do orçamento de potência óptica GPON Classe B+ (ITU-T G.984.2),
// perdas da ODN e zonas de potência recebida na ONU (sobrecarga, ideal e sensibilidade).
export function OrcamentoPon({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Orçamento de potência GPON Classe B+: transmissão OLT, perdas e sinal na ONU"
      descricao={descricao}
      viewBox="0 0 400 248"
    >
      {/* Topo: Potência de Transmissão da OLT (Classe B+) */}
      <rect x="10" y="8" width="184" height="66" rx="8" className="d-caixa-destaque" />
      <text x="102" y="26" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        1. Transmissão OLT (Classe B+)
      </text>
      <text x="102" y="46" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 13 }}>
        +1,5 a +5,0 dBm
      </text>
      <text x="102" y="62" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Downstream: 1490 nm
      </text>

      {/* Topo direito: Perda máxima permitida pela norma */}
      <rect x="206" y="8" width="184" height="66" rx="8" className="d-caixa" />
      <text x="298" y="26" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9.5 }}>
        2. Atenuação da ODN (G.984.2)
      </text>
      <text x="298" y="46" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 13 }}>
        13 a 28 dB
      </text>
      <text x="298" y="62" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8.5 }}>
        Fibra + splitters + conectores + fusões
      </text>

      {/* Faixa central: Composição de perdas */}
      <rect x="10" y="80" width="380" height="48" rx="6" className="d-zona-controlada" />
      <text x="200" y="96" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9 }}>
        Perdas + margem ≤ 1,5 − (−27) − 0,5 = 28,0 dB
      </text>
      <text x="200" y="112" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8 }}>
        Exemplo: 2,0 fibra + 3,0 conexões + 1,8 fusões + 18,1 splitters + 3 margem = 27,9 dB
      </text>

      {/* Faixa inferior: Régua de recepção na ONU */}
      <rect x="10" y="134" width="380" height="106" rx="8" className="d-caixa" />
      <text x="200" y="150" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 10 }}>
        3. Faixas de sinal recebido na ONU em 1490 nm
      </text>

      {/* Faixa verde de fundo da zona ideal */}
      <rect x="130" y="166" width="160" height="38" rx="4" style={{ fill: 'rgba(34, 197, 94, 0.15)', stroke: 'rgba(34, 197, 94, 0.4)' }} />

      {/* Linha da régua */}
      <line x1="40" y1="178" x2="360" y2="178" className="d-cota" />

      {/* Ponto 1: Sobrecarga */}
      <circle cx="65" cy="178" r="5" className="d-ponto" style={{ fill: 'var(--cor-alerta)' }} />
      <text x="65" y="168" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9 }}>
        −8 dBm
      </text>
      <text x="65" y="196" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 8 }}>
        Sobrecarga
      </text>
      <text x="65" y="208" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 7.5 }}>
        (satura)
      </text>

      {/* Faixa central ideal */}
      <text x="210" y="168" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 9 }}>
        Garantido pela norma
      </text>
      <text x="210" y="196" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8 }}>
        entre −27 e −8 dBm
      </text>

      {/* Ponto 2: Sensibilidade */}
      <circle cx="335" cy="178" r="5" className="d-ponto" style={{ fill: 'var(--cor-alerta)' }} />
      <text x="335" y="168" textAnchor="middle" className="d-texto d-alerta" style={{ fontSize: 9 }}>
        −27 dBm
      </text>
      <text x="335" y="196" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 8 }}>
        Sensibilidade
      </text>
      <text x="335" y="208" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 7.5 }}>
        (limite norma)
      </text>

      <text x="200" y="228" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 8 }}>
        Abaixo de −27 dBm, a taxa de erros deixa de ser garantida
      </text>
    </Diagrama>
  );
}
