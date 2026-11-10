import { Diagrama, type PropsDiagrama } from './Diagrama';

// Esquema (não é mapa): três postes (pontos) ligados por um cabo (linha), uma quadra (polígono) e, embaixo,
// a tabela de atributos da camada postes. O traço liga o poste PF-0007 à sua linha na tabela.
export function FeicaoETabela({ descricao }: PropsDiagrama) {
  const colunas = [6, 100, 196, 272, 394];
  const nomes = ['cod_poste', 'material', 'altura_m', 'ocupantes_qtd'];
  const linhas: Array<[string, string, string, string]> = [
    ['PF-0006', '…', '…', '…'],
    ['PF-0007', 'concreto', '12', '6'],
    ['PF-0008', '…', '…', '…'],
  ];
  return (
    <Diagrama titulo="Uma feição: desenho no mapa e linha na tabela" descricao={descricao} viewBox="0 0 400 392">
      {/* mapa */}
      <rect x="6" y="8" width="388" height="188" rx="6" className="d-caixa" />
      <text x="14" y="26" className="d-texto d-forte">Mapa</text>

      <polyline points="26,66 86,104 146,70" className="d-traco" />
      <circle cx="26" cy="66" r="6" className="d-ponto" />
      <circle cx="86" cy="104" r="6" className="d-ponto" />
      <circle cx="146" cy="70" r="6" className="d-ponto" />
      <text x="14" y="52" className="d-texto">PF-0006</text>
      <text x="97" y="124" className="d-texto d-forte">PF-0007</text>
      <text x="146" y="54" textAnchor="middle" className="d-texto">PF-0008</text>

      <polygon points="182,64 236,70 232,150 178,140" className="d-caixa d-caixa-destaque" />

      {/* legenda do mapa */}
      <circle cx="256" cy="44" r="5" className="d-ponto" />
      <text x="268" y="48" className="d-texto">ponto: poste</text>
      <line x1="250" y1="68" x2="262" y2="68" className="d-traco" />
      <text x="268" y="72" className="d-texto">linha: cabo</text>
      <rect x="250" y="86" width="12" height="10" className="d-caixa d-caixa-destaque" />
      <text x="268" y="96" className="d-texto">polígono: quadra</text>

      {/* raster (opcional): quadriculado de pixels */}
      {[0, 1, 2, 3].map((i) =>
        [0, 1, 2].map((j) => (
          <rect
            key={`${i}-${j}`}
            x={252 + i * 14}
            y={112 + j * 14}
            width="14"
            height="14"
            className={(i + j) % 2 === 0 ? 'd-caixa d-caixa-destaque' : 'd-caixa'}
          />
        )),
      )}
      <text x="316" y="140" className="d-texto">raster:</text>
      <text x="316" y="156" className="d-texto">pixels</text>

      <text x="98" y="222" className="d-texto d-alerta">uma feição = um desenho</text>
      <text x="98" y="238" className="d-texto d-alerta">+ uma linha da tabela</text>

      {/* tabela */}
      <text x="394" y="248" textAnchor="end" className="d-texto d-forte">coluna = campo</text>
      <path d="M350 252 L344 262 L356 262 Z" className="d-seta" />
      <rect x="6" y="268" width="388" height="26" className="d-caixa d-caixa-destaque" />
      <rect x="6" y="294" width="388" height="78" className="d-caixa" />
      <rect x="6" y="320" width="388" height="26" className="d-caixa d-caixa-destaque" />
      {colunas.slice(1, 4).map((x) => (
        <line key={x} x1={x} y1="268" x2={x} y2="372" className="d-grade" />
      ))}
      {nomes.map((n, i) => (
        <text key={n} x={colunas[i] + 8} y="286" className="d-texto d-forte">{n}</text>
      ))}
      {linhas.map((l, r) =>
        l.map((v, i) => (
          <text key={`${r}-${i}`} x={colunas[i] + 8} y={312 + r * 26} className={r === 1 ? 'd-texto d-forte' : 'd-texto'}>{v}</text>
        )),
      )}
      {/* traço do poste PF-0007 até a linha da tabela */}
      <line x1="86" y1="110" x2="86" y2="306" className="d-cota" />
      <path d="M86 320 L80 308 L92 308 Z" className="d-seta" />
    </Diagrama>
  );
}
