import { Diagrama, type PropsDiagrama } from './Diagrama';

// Comparação entre alinhamento pelo núcleo (PAS/LID, X/Y/Z) e pela casca, mais arco, eletrodos e erros.
export function DentroMaquina({ descricao }: PropsDiagrama) {
  return (
    <Diagrama
      titulo="Dentro da máquina: alinhamento pelo núcleo × pela casca e arco (fora de escala)"
      descricao={descricao}
      viewBox="0 0 400 440"
    >
      {/* Quadro 1: Alinhamento pelo núcleo (PAS / LID) */}
      <rect x="10" y="10" width="380" height="130" rx="8" className="d-caixa-destaque" />
      <text x="200" y="28" textAnchor="middle" className="d-texto d-forte">
        Alinhamento pelo núcleo
      </text>
      <text x="200" y="42" textAnchor="middle" className="d-texto d-suave">
        PAS (câmeras X/Y a 90°) ou LID
      </text>
      {/* Duas fibras com núcleos alinhados mesmo se a casca tiver excentricidade */}
      <rect x="118" y="58" width="68" height="22" rx="2" className="d-caixa" />
      <line x1="118" y1="69" x2="186" y2="69" className="d-cabo-telecom" />
      <rect x="204" y="55" width="68" height="22" rx="2" className="d-caixa" />
      <line x1="204" y1="69" x2="272" y2="69" className="d-cabo-telecom" />
      {/* Eletrodos superior e inferior */}
      <polygon points="191,46 199,46 195,60" className="d-ponto" />
      <polygon points="191,92 199,92 195,78" className="d-ponto" />
      <text x="200" y="112" textAnchor="middle" className="d-texto">
        Motores X, Y e Z casam os núcleos
      </text>
      <text x="200" y="130" textAnchor="middle" className="d-texto d-suave">
        Compensa excentricidade núcleo-casca
      </text>

      {/* Quadro 2: Alinhamento pela casca */}
      <rect x="10" y="150" width="380" height="130" rx="8" className="d-caixa" />
      <text x="200" y="168" textAnchor="middle" className="d-texto d-forte">
        Alinhamento pela casca
      </text>
      <text x="200" y="182" textAnchor="middle" className="d-texto d-suave">
        Ranhura em V (V-groove ativa ou fixa)
      </text>
      {/* Duas fibras alinhadas pela borda externa de 125 µm */}
      <rect x="118" y="198" width="68" height="22" rx="2" className="d-caixa" />
      <line x1="118" y1="207" x2="186" y2="207" className="d-cabo-telecom" />
      <rect x="204" y="198" width="68" height="22" rx="2" className="d-caixa" />
      <line x1="204" y1="212" x2="272" y2="212" className="d-cabo-telecom" />
      <polygon points="191,186 199,186 195,200" className="d-ponto" />
      <polygon points="191,232 199,232 195,218" className="d-ponto" />
      <text x="200" y="252" textAnchor="middle" className="d-texto">
        Alinha o vidro externo (125 µm)
      </text>
      <text x="200" y="270" textAnchor="middle" className="d-texto d-alerta">
        Sofre se o núcleo for excêntrico
      </text>

      {/* Faixa inferior: Arco, eletrodos e defeitos na tela */}
      <rect x="10" y="290" width="380" height="142" rx="8" className="d-zona-controlada" />
      <text x="20" y="310" className="d-texto d-forte">
        Arc check, manutenção e defeitos na tela
      </text>
      <text x="20" y="332" className="d-texto">
        • Arc check: início da sessão;
      </text>
      <text x="32" y="348" className="d-texto">
        eletrodos: 800 a 6.000 fusões.
      </text>
      <text x="20" y="370" className="d-texto">
        • Álcool 99%: V-groove todo dia; lente 1×/mês (90R).
      </text>
      <text x="20" y="392" className="d-texto d-alerta">
        • Linha escura: até 2 re-arcos.
      </text>
      <text x="32" y="408" className="d-texto d-alerta">
        Bolha ou inchaço: refazer.
      </text>
    </Diagrama>
  );
}
