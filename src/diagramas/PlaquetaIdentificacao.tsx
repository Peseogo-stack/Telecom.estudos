import { Diagrama, type PropsDiagrama } from './Diagrama';

// Plaqueta de identificação do cabo. Números de exemplo da Cemig ND-6.6 (ver a lição 07-03).
export function PlaquetaIdentificacao({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Plaqueta de identificação do cabo" descricao={descricao} viewBox="0 0 400 376">
      {/* Poste e cabo */}
      <text x="4" y="22" className="d-texto d-forte">No poste</text>
      <rect x="10" y="40" width="22" height="150" rx="3" className="d-caixa" />
      <text x="21" y="208" textAnchor="middle" className="d-texto">poste</text>
      <line x1="32" y1="80" x2="390" y2="80" className="d-cabo-telecom" />
      <text x="212" y="68" textAnchor="middle" className="d-texto">cabo do ocupante</text>

      {/* Plaqueta no cabo */}
      <rect x="100" y="70" width="34" height="20" rx="3" className="d-caixa d-caixa-destaque" />
      <text x="117" y="110" textAnchor="middle" className="d-texto d-forte">plaqueta</text>

      {/* Cota */}
      <line x1="32" y1="132" x2="100" y2="132" className="d-cota" />
      <line x1="32" y1="126" x2="32" y2="138" className="d-cota" />
      <line x1="100" y1="126" x2="100" y2="138" className="d-cota" />
      <text x="44" y="154" className="d-texto">de 200 a 400 mm do poste</text>
      <text x="44" y="172" className="d-texto">(exemplo: Cemig)</text>

      {/* Plaqueta ampliada */}
      <text x="4" y="236" className="d-texto d-forte">Plaqueta ampliada</text>
      <rect x="4" y="246" width="204" height="100" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="106" y="266" textAnchor="middle" className="d-texto d-forte">NOME DO OCUPANTE</text>
      <text x="106" y="284" textAnchor="middle" className="d-texto">tipo de cabo</text>
      <text x="106" y="302" textAnchor="middle" className="d-texto">telefone</text>
      <text x="106" y="322" textAnchor="middle" className="d-texto d-suave">90 × 40 mm</text>
      <text x="106" y="338" textAnchor="middle" className="d-texto d-suave">fundo amarelo (exemplos)</text>

      {/* Modelo novo */}
      <rect x="220" y="246" width="176" height="100" rx="6" className="d-caixa d-caixa-tracejada" />
      <text x="308" y="274" textAnchor="middle" className="d-texto d-forte">Modelo novo da Cemig:</text>
      <text x="308" y="296" textAnchor="middle" className="d-texto">as mesmas linhas, mais</text>
      <text x="308" y="320" textAnchor="middle" className="d-texto d-forte">CNPJ + QR Code</text>

      <text x="4" y="368" className="d-texto d-alerta">Exemplo. Vale a norma da sua distribuidora.</text>
    </Diagrama>
  );
}
