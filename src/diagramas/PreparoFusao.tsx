import { Diagrama, type PropsDiagrama } from './Diagrama';

// Sequência de preparo para fusão: tubete antes de tudo → decapar → limpar IPA ≥ 99% → clivar → fundir e forno.
export function PreparoFusao({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Sequência de preparo e proteção da emenda (fora de escala)"
      descricao={descricao}
      viewBox="0 0 400 246"
    >
      {/* Passo 1: Vestir o tubete ANTES */}
      <rect x="10" y="12" width="184" height="68" rx="8" className="d-caixa-destaque" />
      <text x="22" y="30" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        1. Vestir o tubete ANTES
      </text>
      <line x1="22" y1="48" x2="180" y2="48" className="d-cabo-telecom" />
      <rect x="64" y="40" width="68" height="16" rx="4" className="d-caixa" />
      <line x1="70" y1="44" x2="126" y2="44" className="d-marco" />
      <text x="102" y="70" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        40 ou 60 mm + haste de aço
      </text>

      {/* Passo 2: Limpar e decapar */}
      <rect x="206" y="12" width="184" height="68" rx="8" className="d-caixa" />
      <text x="218" y="30" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        2. Limpar e decapar
      </text>
      {/* Revestimento 250 µm -> vidro 125 µm */}
      <rect x="220" y="42" width="76" height="12" rx="2" className="d-marco" />
      <rect x="296" y="45" width="76" height="6" rx="1" className="d-caixa-destaque" />
      <text x="258" y="68" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        Acrilato 250 µm
      </text>
      <text x="334" y="68" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        Casca 125 µm
      </text>

      {/* Passo 3: Limpar com IPA >= 99% */}
      <rect x="10" y="90" width="184" height="68" rx="8" className="d-caixa" />
      <text x="22" y="108" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        3. Limpar com IPA ≥ 99%
      </text>
      <text x="22" y="126" className="d-texto" style={{ fontSize: 9.5 }}>
        • Lenço sem fiapo (1 sentido)
      </text>
      <text x="22" y="143" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        • Antes e depois de decapar
      </text>

      {/* Passo 4: Clivagem de precisão */}
      <rect x="206" y="90" width="184" height="68" rx="8" className="d-caixa" />
      <text x="218" y="108" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        4. Clivar (10–16 mm)
      </text>
      <text x="218" y="126" className="d-texto" style={{ fontSize: 9.5 }}>
        • Face reta: 0,3° a 0,9° (CT50)
      </text>
      <text x="218" y="143" className="d-texto d-alerta" style={{ fontSize: 9.5 }}>
        • Não encostar a ponta em nada
      </text>

      {/* Passo 5: Fusão, tração (~2,0 N) e forno */}
      <rect x="10" y="168" width="380" height="66" rx="8" className="d-check" />
      <text x="20" y="187" className="d-texto d-forte" style={{ fontSize: 10.5 }}>
        5. Fundir → tração (~2,0 N) → centralizar tubete e forno
      </text>
      <text x="20" y="205" className="d-texto" style={{ fontSize: 9.5 }}>
        • Tração (~200 gf) testa a resistência antes de ir à bandeja.
      </text>
      <text x="20" y="221" className="d-texto d-suave" style={{ fontSize: 9.5 }}>
        • Forno (16–23 s em 60 mm): esfriar antes de curvar a fibra.
      </text>
    </Diagrama>
  );
}
