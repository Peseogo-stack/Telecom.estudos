import { Diagrama, type PropsDiagrama } from './Diagrama';

// Sequência de preparo para fusão: tubete antes de tudo → decapar → limpar IPA ≥ 99% → clivar → fundir e forno.
export function PreparoFusao({ descricao }: PropsDiagrama) {
  const titulo = (y: number, t: string) => (
    <text x="22" y={y} className="d-texto d-forte" style={{ fontSize: 13 }}>
      {t}
    </text>
  );
  return (
    <Diagrama
      titulo="Sequência de preparo e proteção da emenda (fora de escala)"
      descricao={descricao}
      viewBox="0 0 400 440"
    >
      {/* Passo 1: Vestir o tubete ANTES */}
      <rect x="10" y="8" width="380" height="76" rx="8" className="d-caixa-destaque" />
      {titulo(28, '1. Vestir o tubete ANTES')}
      <line x1="22" y1="58" x2="250" y2="58" className="d-cabo-telecom" />
      <rect x="84" y="49" width="96" height="18" rx="4" className="d-caixa" />
      <line x1="90" y1="54" x2="174" y2="54" className="d-marco" />
      <text x="268" y="63" className="d-texto d-suave">
        40 ou 60 mm
      </text>

      {/* Passo 2: Limpar e decapar */}
      <rect x="10" y="92" width="380" height="76" rx="8" className="d-caixa" />
      {titulo(112, '2. Limpar e decapar')}
      <rect x="22" y="124" width="150" height="14" rx="2" className="d-marco" />
      <rect x="172" y="127" width="200" height="8" rx="1" className="d-caixa-destaque" />
      <text x="97" y="157" textAnchor="middle" className="d-texto d-suave">
        Acrilato 250 µm
      </text>
      <text x="272" y="157" textAnchor="middle" className="d-texto d-suave">
        Casca 125 µm
      </text>

      {/* Passo 3: Limpar com IPA >= 99% */}
      <rect x="10" y="176" width="380" height="70" rx="8" className="d-caixa" />
      {titulo(196, '3. Limpar com IPA ≥ 99%')}
      <text x="22" y="216" className="d-texto">
        • Lenço sem fiapo
      </text>
      <text x="22" y="234" className="d-texto d-suave">
        • Limpar casca nua antes de clivar
      </text>

      {/* Passo 4: Clivagem de precisão */}
      <rect x="10" y="254" width="380" height="70" rx="8" className="d-caixa" />
      {titulo(274, '4. Clivar (5–16 mm na 45S)')}
      <text x="22" y="294" className="d-texto">
        • Ângulo médio 0,3° a 0,9° (CT50)
      </text>
      <text x="22" y="312" className="d-texto d-alerta">
        • Não encostar a ponta em nada
      </text>

      {/* Passo 5: Fusão, tração (~2,0 N) e forno */}
      <rect x="10" y="332" width="380" height="100" rx="8" className="d-check" />
      {titulo(352, '5. Fundir → tração (~2,0 N) →')}
      {titulo(370, 'centralizar tubete e forno')}
      <text x="22" y="392" className="d-texto">
        • Tração (~2,0 N) testa a emenda antes da bandeja.
      </text>
      <text x="22" y="410" className="d-texto d-suave">
        • Forno (16–23 s em 60 mm): esfriar antes de
      </text>
      <text x="32" y="426" className="d-texto d-suave">
        curvar a fibra.
      </text>
    </Diagrama>
  );
}
