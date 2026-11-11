import { Diagrama, type PropsDiagrama } from './Diagrama';

// Esquema (não é mapa): GeoPackage (um arquivo, várias camadas) x Shapefile (uma camada, vários arquivos),
// a nota dos 10 caracteres e as faixas do KML e do CSV.
const CAMADAS = ['postes', 'cabos', 'caixas', 'quadras'];
const ARQUIVOS = ['postes.shp', 'postes.shx', 'postes.dbf', 'postes.prj', 'postes.cpg'];

export function FormatosArquivo({ descricao }: PropsDiagrama) {
  return (
    <Diagrama titulo="Cada formato guarda uma coisa" descricao={descricao} viewBox="0 0 400 410">
      {/* GeoPackage */}
      <rect x="6" y="6" width="190" height="226" rx="6" className="d-caixa" />
      <text x="16" y="28" className="d-texto d-forte">GeoPackage</text>
      <text x="16" y="48" className="d-texto">um arquivo só</text>
      <rect x="16" y="58" width="170" height="164" rx="4" className="d-caixa d-caixa-destaque" />
      <text x="26" y="78" className="d-texto d-suave">rede-ficticia.gpkg</text>
      {CAMADAS.map((c, i) => (
        <g key={c}>
          <rect x="26" y={88 + i * 31} width="150" height="26" rx="4" className="d-caixa" />
          <text x="36" y={106 + i * 31} className="d-texto">{c}</text>
        </g>
      ))}

      {/* Shapefile */}
      <rect x="204" y="6" width="190" height="226" rx="6" className="d-caixa" />
      <text x="214" y="28" className="d-texto d-forte">Shapefile</text>
      <text x="214" y="48" className="d-texto">uma camada, vários arquivos</text>
      {ARQUIVOS.map((a, i) => (
        <g key={a}>
          <rect x="214" y={58 + i * 34} width="170" height="28" rx="4" className="d-caixa d-caixa-destaque" />
          <text x="224" y={77 + i * 34} className="d-texto">{a}</text>
        </g>
      ))}

      {/* nota */}
      <rect x="6" y="242" width="388" height="52" rx="6" className="d-caixa d-caixa-tracejada" />
      <text x="200" y="264" textAnchor="middle" className="d-texto d-alerta">nome de campo: até 10 caracteres</text>
      <text x="200" y="284" textAnchor="middle" className="d-texto d-alerta">ocupantes_qtd → ocupantes_</text>

      {/* faixas */}
      <rect x="6" y="304" width="388" height="44" rx="6" className="d-caixa" />
      <text x="200" y="331" textAnchor="middle" className="d-texto d-forte">KML: sempre EPSG:4326 (graus)</text>
      <rect x="6" y="358" width="388" height="44" rx="6" className="d-caixa" />
      <text x="200" y="385" textAnchor="middle" className="d-texto d-forte">CSV: sem SRC; quem abre informa</text>
    </Diagrama>
  );
}
