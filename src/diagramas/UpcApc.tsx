import { Diagrama, type PropsDiagrama } from './Diagrama';

// Ponta do conector vista de lado (fora de escala: o ângulo do APC está exagerado).
// Valores: FOA (refletância por tipo de conector); comportamento APC × UPC: Fluke Networks.
const AZUL = '#2563eb';
const VERDE = '#16a34a';

export function UpcApc({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="UPC × APC (fora de escala)" descricao={descricao} viewBox="0 0 400 272">
      {/* UPC */}
      <text x="100" y="22" textAnchor="middle" className="d-texto d-forte">
        UPC (corpo azul)
      </text>
      <rect x="14" y="40" width="50" height="56" rx="6" className="d-amostra" style={{ fill: AZUL }} />
      <path d="M64 52 L160 52 Q171 68 160 84 L64 84 Z" className="d-ferrolho" />
      <line x1="64" x2="166" y1="68" y2="68" className="d-nucleo" />
      <path d="M156 63 L96 63" className="d-reflexao" />
      <path d="M0 0 L8 -4 L8 4 Z" className="d-reflexao-ponta" transform="translate(92 63)" />
      <text x="100" y="114" textAnchor="middle" className="d-texto">
        a reflexão volta pela fibra
      </text>
      <text x="100" y="130" textAnchor="middle" className="d-texto d-forte">
        −40 a −50 dB
      </text>

      {/* APC */}
      <text x="300" y="22" textAnchor="middle" className="d-texto d-forte">
        APC (corpo verde)
      </text>
      <rect x="214" y="40" width="50" height="56" rx="6" className="d-amostra" style={{ fill: VERDE }} />
      <path d="M264 52 L370 52 L358 84 L264 84 Z" className="d-ferrolho" />
      <line x1="264" x2="364" y1="68" y2="68" className="d-nucleo" />
      <path d="M362 66 L326 55" className="d-reflexao" />
      <path d="M0 0 L8 -4 L8 4 Z" className="d-reflexao-ponta" transform="translate(322 54) rotate(17)" />
      <text x="384" y="48" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 11 }}>
        8°
      </text>
      <text x="300" y="114" textAnchor="middle" className="d-texto">
        a reflexão sai do núcleo
      </text>
      <text x="300" y="130" textAnchor="middle" className="d-texto d-forte">
        −60 dB ou menos
      </text>

      {/* UPC com APC */}
      <line x1="10" x2="390" y1="150" y2="150" className="d-grade" />
      <rect x="40" y="172" width="44" height="48" rx="6" className="d-amostra" style={{ fill: AZUL }} />
      <path d="M84 182 L176 182 Q186 196 176 210 L84 210 Z" className="d-ferrolho" />
      <path d="M200 182 L316 182 L316 210 L210 210 Z" className="d-ferrolho" />
      <rect x="316" y="172" width="44" height="48" rx="6" className="d-amostra" style={{ fill: VERDE }} />
      <text x="194" y="176" textAnchor="middle" className="d-alerta" style={{ fontSize: 20 }}>
        ✗
      </text>
      <text x="200" y="244" textAnchor="middle" className="d-texto d-forte">
        Não ligue UPC com APC: as faces não casam
      </text>
      <text x="200" y="262" textAnchor="middle" className="d-texto">
        reflexão forte, com ecos no traço do OTDR
      </text>
    </Diagrama>
  );
}
