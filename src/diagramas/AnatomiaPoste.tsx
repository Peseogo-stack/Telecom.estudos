import { Diagrama, type PropsDiagrama } from './Diagrama';

// Poste visto de frente, de cima para baixo. Esquema fora de escala, com as cotas do EXEMPLO da Cemig ND-6.6.
// Quem manda é a norma da distribuidora local (ver a lição 07-02).
export function AnatomiaPoste({ descricao }: PropsDiagrama) {
  const xTxt = 80;
  return (
    <Diagrama titulo="Anatomia do poste e faixa de ocupação" descricao={descricao} viewBox="0 0 400 468">
      {/* Etiqueta do exemplo */}
      <rect x="6" y="4" width="388" height="28" rx="6" className="d-caixa d-caixa-tracejada" />
      <text x="200" y="23" textAnchor="middle" className="d-texto d-alerta">Exemplo: Cemig ND-6.6. Vale a norma da sua distribuidora.</text>

      {/* Faixa de ocupação (atrás do poste) */}
      <rect x="4" y="222" width="54" height="72" rx="3" className="d-caixa d-caixa-destaque" />
      {/* Poste */}
      <rect x="25" y="44" width="12" height="388" className="d-poste" />

      {/* Média tensão: cruzeta */}
      <line x1="4" y1="62" x2="58" y2="62" className="d-linha-grossa" />
      <circle cx="8" cy="62" r="3" className="d-ponto" />
      <circle cx="31" cy="62" r="3" className="d-ponto" />
      <circle cx="54" cy="62" r="3" className="d-ponto" />
      <text x={xTxt} y="66" className="d-texto d-forte">Média tensão (rede primária)</text>

      {/* Baixa tensão: neutro e 3 fases */}
      <line x1="4" y1="106" x2="58" y2="106" className="d-linha-grossa" />
      <line x1="4" y1="118" x2="58" y2="118" className="d-linha-grossa" />
      <text x={xTxt} y="106" className="d-texto d-forte">Baixa tensão (rede secundária):</text>
      <text x={xTxt} y="122" className="d-texto d-forte">neutro e 3 fases</text>

      {/* Iluminação pública */}
      <line x1="4" y1="152" x2="58" y2="152" className="d-linha" />
      <text x={xTxt} y="156" className="d-texto d-forte">Iluminação pública</text>

      {/* Cota 600 mm */}
      <line x1="66" y1="120" x2="66" y2="222" className="d-cota" />
      <text x={xTxt} y="190" className="d-texto d-alerta">600 mm no mínimo</text>
      <text x={xTxt} y="206" className="d-texto">da baixa tensão ao topo da faixa</text>

      {/* Faixa de ocupação */}
      <line x1="10" y1="234" x2="52" y2="234" className="d-linha-grossa" />
      <line x1="10" y1="250" x2="52" y2="250" className="d-linha-grossa" />
      <line x1="10" y1="266" x2="52" y2="266" className="d-linha-grossa" />
      <line x1="10" y1="282" x2="52" y2="282" className="d-linha-grossa" />
      <text x={xTxt} y="238" className="d-texto d-forte">Faixa de ocupação: 500 mm</text>
      <text x={xTxt} y="256" className="d-texto">pontos de fixação (tracinhos)</text>
      <text x={xTxt} y="274" className="d-texto">topo a 5,70 m do solo</text>

      {/* Equipamentos de telecom */}
      <rect x="8" y="314" width="46" height="34" rx="3" className="d-caixa" />
      <text x={xTxt} y="328" className="d-texto d-forte">Equipamentos de telecom:</text>
      <text x={xTxt} y="344" className="d-texto">de 200 a 1.800 mm abaixo da faixa</text>

      {/* Altura mínima ao solo */}
      <line x1="66" y1="296" x2="66" y2="432" className="d-cota" />
      <text x={xTxt} y="392" className="d-texto d-forte">Altura mínima do cabo ao solo</text>
      <text x={xTxt} y="408" className="d-texto">(lição 07-05)</text>

      {/* Solo */}
      <line x1="0" y1="432" x2="400" y2="432" className="d-eixo" />
      <text x="200" y="452" textAnchor="middle" className="d-texto">solo</text>
      <text x="394" y="462" textAnchor="end" className="d-texto d-suave">desenho fora de escala</text>
    </Diagrama>
  );
}
