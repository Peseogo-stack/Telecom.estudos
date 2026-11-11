import { Diagrama, type PropsDiagrama } from './Diagrama';

// Altura do cabo ao solo: vale no ponto mais baixo do vão (com a flecha), não no poste.
// Esquema, não é escala. Valores de exemplo da Cemig ND-6.6, Tabela 2 (ver a lição 07-05).
export function AlturasAoSolo({ descricao }: PropsDiagrama) {
  const barra = (y: number, largura: number, texto: string) => (
    <g>
      <rect x="4" y={y} width={largura} height="26" rx="4" className="d-caixa d-caixa-destaque" />
      <text x="12" y={y + 18} className="d-texto d-forte">{texto}</text>
    </g>
  );
  return (
    <Diagrama titulo="Altura mínima do cabo ao solo" descricao={descricao} viewBox="0 0 400 480">
      <text x="396" y="20" textAnchor="end" className="d-texto d-alerta">Com calor, a flecha aumenta.</text>

      {/* Postes e solo */}
      <rect x="32" y="52" width="16" height="188" rx="3" className="d-poste" />
      <rect x="352" y="52" width="16" height="188" rx="3" className="d-poste" />
      <line x1="4" y1="240" x2="396" y2="240" className="d-eixo" />
      <text x="396" y="258" textAnchor="end" className="d-texto d-suave">solo</text>

      {/* Cabo com a flecha: ponto mais baixo no meio do vão */}
      <path d="M48 60 Q200 160 352 60" className="d-cabo-telecom" fill="none" />
      <circle cx="200" cy="110" r="5" className="d-marco" />

      {/* Cota do ponto mais baixo ao solo */}
      <line x1="200" y1="116" x2="200" y2="240" className="d-cota" />
      <line x1="192" y1="240" x2="208" y2="240" className="d-cota" />
      <text x="212" y="156" className="d-texto d-forte">altura mínima:</text>
      <text x="212" y="172" className="d-texto d-forte">medida aqui, no</text>
      <text x="212" y="188" className="d-texto d-forte">ponto mais baixo</text>

      {/* Altura no poste, maior */}
      <line x1="72" y1="60" x2="72" y2="240" className="d-cota" />
      <text x="82" y="206" className="d-texto">altura no poste:</text>
      <text x="82" y="222" className="d-texto">maior que no vão</text>

      {/* Exemplos por o que passa embaixo */}
      <text x="4" y="284" className="d-texto d-forte">Exemplo de altura mínima, por o que passa embaixo:</text>
      {barra(296, 120, 'pedestres 3,0 m')}
      {barra(328, 180, 'entrada de veículos 4,5 m')}
      {barra(360, 200, 'ruas e avenidas 5,0 m')}
      {barra(392, 280, 'rodovia federal 7,0 m')}

      <text x="4" y="440" className="d-texto d-alerta">Cabo baixo é risco: afaste-se e comunique.</text>
      <text x="4" y="458" className="d-texto d-suave">Exemplo: Cemig ND-6.6, Tabela 2.</text>
      <text x="4" y="474" className="d-texto d-suave">Vale a norma da sua distribuidora.</text>
    </Diagrama>
  );
}
