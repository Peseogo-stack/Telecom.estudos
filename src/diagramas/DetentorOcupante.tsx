import { Diagrama, type PropsDiagrama } from './Diagrama';

// Quem manda no poste: detentor e ocupante, a pilha do que vale em 10/11/2026 e, à parte, o que ainda é proposta.
// Fontes: REN ANEEL 1.044/2022, Resoluções Conjuntas 1/1999 e 4/2014 (ver a lição 07-01).
const PILHA = [
  'Resoluções Conjuntas 1/1999 e 4/2014',
  'REN ANEEL 1.044/2022',
  'Norma técnica e Plano de Ocupação da distribuidora',
  'Contrato com cada ocupante',
];

export function DetentorOcupante({ descricao }: PropsDiagrama) {
  const y0 = 196;
  const passo = 50;
  return (
    <Diagrama titulo="Quem manda no poste" descricao={descricao} viewBox="0 0 400 468">
      {/* Reguladores */}
      <rect x="20" y="6" width="360" height="44" rx="6" className="d-caixa" />
      <text x="200" y="24" textAnchor="middle" className="d-texto d-forte">ANEEL e Anatel</text>
      <text x="200" y="42" textAnchor="middle" className="d-texto">regras e Comissão de Resolução de Conflitos</text>

      {/* Detentor e ocupante */}
      <rect x="4" y="66" width="180" height="48" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="94" y="86" textAnchor="middle" className="d-texto d-forte">Detentor</text>
      <text x="94" y="104" textAnchor="middle" className="d-texto">a distribuidora</text>
      <rect x="216" y="66" width="180" height="48" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="306" y="86" textAnchor="middle" className="d-texto d-forte">Ocupante</text>
      <text x="306" y="104" textAnchor="middle" className="d-texto">operadora ou provedor</text>
      <line x1="192" y1="90" x2="208" y2="90" className="d-linha" />
      <path d="M185 90 L193 85 L193 95 Z" className="d-seta" />
      <path d="M215 90 L207 85 L207 95 Z" className="d-seta" />
      <text x="200" y="136" textAnchor="middle" className="d-texto">contrato + projeto aprovado</text>
      <text x="200" y="154" textAnchor="middle" className="d-texto">cobrança por ponto de fixação</text>

      {/* O que vale */}
      <text x="200" y="184" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 13 }}>O que vale em 10/11/2026</text>
      {PILHA.map((t, i) => {
        const y = y0 + i * passo;
        return (
          <g key={t}>
            <rect x="20" y={y} width="360" height="34" rx="6" className="d-caixa d-caixa-destaque" />
            <text x="200" y={y + 22} textAnchor="middle" className="d-texto d-forte">{t}</text>
            {i < PILHA.length - 1 && <path d={`M193 ${y + 38} L207 ${y + 38} L200 ${y + 47} Z`} className="d-seta" />}
          </g>
        );
      })}

      {/* Proposta */}
      <rect x="20" y="398" width="360" height="62" rx="6" className="d-caixa d-caixa-tracejada" />
      <text x="200" y="418" textAnchor="middle" className="d-texto d-alerta">Ainda proposta</text>
      <text x="200" y="436" textAnchor="middle" className="d-texto">novo regulamento conjunto (posteiro)</text>
      <text x="200" y="452" textAnchor="middle" className="d-texto">e PL 3.220/2019</text>
    </Diagrama>
  );
}
