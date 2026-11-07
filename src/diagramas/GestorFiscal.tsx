import { Diagrama, type PropsDiagrama } from './Diagrama';

export function GestorFiscal({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Quem faz o quê no contrato" descricao={descricao} viewBox="0 0 400 300">
      <rect x="90" y="10" width="220" height="74" rx="8" className="d-caixa d-caixa-destaque" />
      <text x="200" y="32" textAnchor="middle" className="d-texto d-forte">Gestor do contrato</text>
      <text x="200" y="52" textAnchor="middle" className="d-texto">coordena a fiscalização</text>
      <text x="200" y="70" textAnchor="middle" className="d-texto">recebimento definitivo · sanções</text>
      <line x1="200" y1="84" x2="200" y2="110" className="d-linha" />
      <line x1="100" y1="110" x2="300" y2="110" className="d-linha" />
      <line x1="100" y1="110" x2="100" y2="130" className="d-linha" />
      <line x1="300" y1="110" x2="300" y2="130" className="d-linha" />
      <rect x="10" y="130" width="180" height="104" rx="8" className="d-caixa" />
      <text x="100" y="152" textAnchor="middle" className="d-texto d-forte">Fiscal técnico</text>
      <text x="100" y="172" textAnchor="middle" className="d-texto">registra ocorrências</text>
      <text x="100" y="190" textAnchor="middle" className="d-texto">notifica com prazo</text>
      <text x="100" y="208" textAnchor="middle" className="d-texto">recebimento provisório</text>
      <text x="100" y="226" textAnchor="middle" className="d-texto">avisa o vencimento</text>
      <rect x="210" y="130" width="180" height="104" rx="8" className="d-caixa" />
      <text x="300" y="152" textAnchor="middle" className="d-texto d-forte">Fiscal administrativo</text>
      <text x="300" y="172" textAnchor="middle" className="d-texto">prazos e aditivos</text>
      <text x="300" y="190" textAnchor="middle" className="d-texto">pagamentos</text>
      <text x="300" y="208" textAnchor="middle" className="d-texto">garantias e glosas</text>
      <rect x="110" y="252" width="180" height="40" rx="8" className="d-caixa d-caixa-tracejada" />
      <text x="200" y="277" textAnchor="middle" className="d-texto">Fornecedor e seu preposto</text>
    </Diagrama>
  );
}
