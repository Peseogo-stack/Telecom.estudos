import { Diagrama, type PropsDiagrama } from './Diagrama';

// Esquema (não é mapa): o ciclo de edição em 5 etapas, com a bifurcação salvar x descartar
// e a faixa que lembra que, até salvar, a mudança está só na memória do QGIS.
const seta = (x: number, y: number) => <path d={`M${x - 6} ${y - 9} L${x + 6} ${y - 9} L${x} ${y} Z`} className="d-seta" />;

export function CicloDeEdicao({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="O ciclo de edição" descricao={descricao} viewBox="0 0 400 392">
      {/* 1 */}
      <rect x="6" y="6" width="388" height="38" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="200" y="30" textAnchor="middle" className="d-texto d-forte">1. Copiar o arquivo</text>
      <line x1="200" y1="44" x2="200" y2="56" className="d-linha-grossa" />
      {seta(200, 64)}

      {/* 2 */}
      <rect x="6" y="64" width="388" height="38" rx="6" className="d-caixa" />
      <text x="200" y="88" textAnchor="middle" className="d-texto d-forte">2. Ligar a edição (Toggle Editing)</text>
      <line x1="200" y1="102" x2="200" y2="114" className="d-linha-grossa" />
      {seta(200, 122)}

      {/* 3 */}
      <rect x="6" y="122" width="388" height="38" rx="6" className="d-caixa" />
      <text x="200" y="146" textAnchor="middle" className="d-texto d-forte">3. Editar: Add Point Feature, Vertex Tool</text>

      {/* bifurcação */}
      <line x1="200" y1="160" x2="200" y2="172" className="d-linha-grossa" />
      <line x1="101" y1="172" x2="299" y2="172" className="d-linha-grossa" />
      <line x1="101" y1="172" x2="101" y2="186" className="d-linha-grossa" />
      <line x1="299" y1="172" x2="299" y2="186" className="d-linha-grossa" />
      {seta(101, 194)}
      {seta(299, 194)}

      <rect x="6" y="194" width="190" height="52" rx="6" className="d-caixa d-caixa-destaque" />
      <text x="101" y="216" textAnchor="middle" className="d-texto d-forte">4a. Save Layer Edits</text>
      <text x="101" y="235" textAnchor="middle" className="d-texto">grava no arquivo</text>
      <rect x="204" y="194" width="190" height="52" rx="6" className="d-caixa" />
      <text x="299" y="216" textAnchor="middle" className="d-texto d-forte">4b. Descartar</text>
      <text x="299" y="235" textAnchor="middle" className="d-texto">nada muda</text>

      {/* junção */}
      <line x1="101" y1="246" x2="101" y2="258" className="d-linha-grossa" />
      <line x1="299" y1="246" x2="299" y2="258" className="d-linha-grossa" />
      <line x1="101" y1="258" x2="299" y2="258" className="d-linha-grossa" />
      <line x1="200" y1="258" x2="200" y2="268" className="d-linha-grossa" />
      {seta(200, 276)}

      {/* 5 */}
      <rect x="6" y="276" width="388" height="38" rx="6" className="d-caixa" />
      <text x="200" y="300" textAnchor="middle" className="d-texto d-forte">5. Desligar a edição</text>

      {/* faixa */}
      <rect x="6" y="326" width="388" height="58" rx="6" className="d-caixa d-caixa-tracejada" />
      <text x="200" y="350" textAnchor="middle" className="d-texto d-alerta">Até salvar, a mudança está só na memória do QGIS.</text>
      <text x="200" y="368" textAnchor="middle" className="d-texto d-alerta">Ctrl+Z desfaz antes de salvar.</text>
    </Diagrama>
  );
}
