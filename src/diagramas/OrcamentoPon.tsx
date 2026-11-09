import { Diagrama, type PropsDiagrama } from './Diagrama';

// Visualização do orçamento de potência óptica GPON Classe B+ (ITU-T G.984.2),
// perdas da ODN e zonas de potência recebida na ONU (sobrecarga, ideal e sensibilidade).
export function OrcamentoPon({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Orçamento de potência GPON Classe B+: transmissão OLT, perdas e sinal na ONU"
      descricao={descricao}
      viewBox="0 0 400 424"
    >
      {/* 1. Transmissão da OLT */}
      <rect x="10" y="8" width="380" height="68" rx="8" className="d-caixa-destaque" />
      <text x="200" y="26" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 13 }}>
        1. Transmissão OLT (Classe B+)
      </text>
      <text x="200" y="48" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 16 }}>
        +1,5 a +5,0 dBm
      </text>
      <text x="200" y="66" textAnchor="middle" className="d-texto d-suave">
        Downstream: 1490 nm
      </text>

      {/* 2. Atenuação da ODN */}
      <rect x="10" y="84" width="380" height="68" rx="8" className="d-caixa" />
      <text x="200" y="102" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 13 }}>
        2. Atenuação da ODN (G.984.2)
      </text>
      <text x="200" y="124" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 16 }}>
        13 a 28 dB
      </text>
      <text x="200" y="142" textAnchor="middle" className="d-texto d-suave">
        Fibra + splitters + conectores + fusões
      </text>

      {/* Composição de perdas */}
      <rect x="10" y="160" width="380" height="104" rx="6" className="d-zona-controlada" />
      <text x="200" y="180" textAnchor="middle" className="d-texto d-forte">
        Perdas + margem ≤ 1,5 − (−27) − 0,5 = 28,0 dB
      </text>
      <text x="200" y="200" textAnchor="middle" className="d-texto d-suave">
        Exemplo: 2,0 fibra + 3,0 conexões
      </text>
      <text x="200" y="217" textAnchor="middle" className="d-texto d-suave">
        + 1,8 fusões + 18,1 splitters
      </text>
      <text x="200" y="234" textAnchor="middle" className="d-texto d-suave">
        + 3 margem = 27,9 dB
      </text>

      {/* 3. Régua de recepção na ONU */}
      <rect x="10" y="272" width="380" height="144" rx="8" className="d-caixa" />
      <text x="200" y="292" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 13 }}>
        3. Faixas de sinal recebido na ONU em 1490 nm
      </text>

      {/* Zona garantida (entre os dois limites) */}
      <rect x="64" y="316" width="272" height="8" rx="4" className="d-faixa-vigente" />
      <line x1="64" y1="320" x2="336" y2="320" className="d-cota" />
      <circle cx="64" cy="320" r="6" className="d-ponto" />
      <circle cx="336" cy="320" r="6" className="d-ponto" />
      <text x="64" y="308" textAnchor="middle" className="d-texto d-alerta">
        −8 dBm
      </text>
      <text x="336" y="308" textAnchor="middle" className="d-texto d-alerta">
        −27 dBm
      </text>
      <text x="200" y="312" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>
        Garantido pela norma
      </text>
      <text x="200" y="378" textAnchor="middle" className="d-texto d-suave">
        entre −27 e −8 dBm
      </text>

      <text x="64" y="342" textAnchor="start" className="d-texto d-forte">
        Sobrecarga
      </text>
      <text x="64" y="358" textAnchor="start" className="d-texto d-suave">
        (satura)
      </text>
      <text x="336" y="342" textAnchor="end" className="d-texto d-forte">
        Sensibilidade
      </text>
      <text x="336" y="358" textAnchor="end" className="d-texto d-suave">
        (limite norma)
      </text>

      <text x="200" y="397" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 11 }}>
        Abaixo de −27 dBm, a taxa de erros deixa de ser garantida
      </text>
    </Diagrama>
  );
}
