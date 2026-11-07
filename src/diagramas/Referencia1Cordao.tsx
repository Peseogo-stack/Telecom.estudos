import { Diagrama, type PropsDiagrama } from './Diagrama';

// Referência de 1 cordão (na TIA, Método A.1 para monomodo): zera com o cordão de lançamento
// direto no medidor; depois o enlace entra entre o cordão de lançamento e o de recepção.
export function Referencia1Cordao({ descricao }: PropsDiagrama) {
  const caixa = (x: number, y: number, texto: string, sub?: string) => (
    <g>
      <rect x={x} y={y} width="70" height="40" rx="6" className="d-caixa d-caixa-destaque" />
      <text x={x + 35} y={y + (sub ? 17 : 25)} textAnchor="middle" className="d-texto d-forte">
        {texto}
      </text>
      {sub && (
        <text x={x + 35} y={y + 32} textAnchor="middle" className="d-texto" style={{ fontSize: 11 }}>
          {sub}
        </text>
      )}
    </g>
  );
  return (
    <Diagrama titulo="Perda de inserção com referência de 1 cordão" descricao={descricao} viewBox="0 0 400 284">
      {/* 1. Zerar */}
      <text x="4" y="18" className="d-texto d-forte">1. Zerar</text>
      {caixa(4, 30, 'Fonte')}
      <line x1="74" y1="50" x2="326" y2="50" className="d-cabo-telecom" />
      <text x="200" y="44" textAnchor="middle" className="d-texto" style={{ fontSize: 11 }}>cordão de lançamento</text>
      {caixa(326, 30, 'Medidor', '0,00 dB')}

      {/* 2. Medir */}
      <text x="4" y="112" className="d-texto d-forte">2. Medir</text>
      {caixa(4, 124, 'Fonte')}
      <line x1="74" y1="144" x2="128" y2="144" className="d-cabo-telecom" />
      <circle cx="132" cy="144" r="5" className="d-marco" />
      <line x1="136" y1="144" x2="266" y2="144" className="d-linha-grossa" />
      <text x="201" y="136" textAnchor="middle" className="d-texto" style={{ fontSize: 10.5 }}>enlace: fibra e emendas</text>
      <circle cx="270" cy="144" r="5" className="d-marco" />
      <line x1="274" y1="144" x2="326" y2="144" className="d-cabo-telecom" />
      {caixa(326, 124, 'Medidor', 'perda')}
      <text x="132" y="162" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>A</text>
      <text x="270" y="162" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>B</text>
      <text x="95" y="162" textAnchor="middle" className="d-texto" style={{ fontSize: 10 }}>lançamento</text>
      <text x="303" y="162" textAnchor="middle" className="d-texto" style={{ fontSize: 10 }}>recepção</text>

      {/* chave do que entra na medida */}
      <path d="M126 172 v8 h150 v-8" className="d-linha" />
      <text x="201" y="196" textAnchor="middle" className="d-texto">entra na medida: conexão A + fibra + emendas + conexão B</text>

      <text x="4" y="228" className="d-texto d-alerta">Depois de zerar, não solte o cordão do lado da fonte:</text>
      <text x="4" y="244" className="d-texto d-alerta">solte só o lado do medidor.</text>
      <text x="4" y="272" className="d-texto d-suave">Perda (dB) = referência (dBm) − medida (dBm).</text>
    </Diagrama>
  );
}
