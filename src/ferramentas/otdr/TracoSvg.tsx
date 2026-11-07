import { useId, useMemo } from 'react';
import {
  alturaDoPico,
  eventoTerminal,
  letra,
  nivelDoRuido,
  nivelRetroespalhamento,
  pontosDoTraco,
  type Cenario,
  type Lambda,
} from './traco';

export interface Marcador {
  km: number;
  /** Letra ou número que aparece no círculo (a legenda fica fora do gráfico). */
  rotulo: string;
  /** Nível em dB onde o círculo aponta; sem ele, aponta para o traço em 1310 nm (ou para o topo do pico). */
  db?: number;
}

const LARGURA = 400;
const ALTURA = 250;
const M = { esq: 34, dir: 8, topo: 30, base: 34 };
/** Os degraus de perda são desenhados ampliados para aparecer na tela do celular (os números reais ficam na tabela). */
export const EXAGERO_PADRAO = 3;
const Y_MAX = 10;

function passoKm(kmMax: number) {
  if (kmMax <= 6) return 1;
  if (kmMax <= 12) return 2;
  if (kmMax <= 25) return 4;
  return 5;
}

const fmt = (x: number) => x.toLocaleString('pt-BR', { maximumFractionDigits: 1 }).replace('-', '−');

/**
 * Desenha o traço (dB relativo × km) de um cenário, com a escala vertical apertada na região da fibra:
 * os picos altos saem cortados no topo (como num OTDR) e o ruído depois do fim sai por baixo.
 * Com `letras`, marca os eventos com A, B, C… (ferramenta); com `marcadores`, desenha círculos fixos (lições).
 */
export function TracoSvg({
  cenario,
  letras = false,
  marcadores = [],
  rotuloAria,
  exagero = EXAGERO_PADRAO,
}: {
  cenario: Cenario;
  letras?: boolean;
  marcadores?: Marcador[];
  rotuloAria?: string;
  exagero?: number;
}) {
  const recorte = useId().replace(/:/g, '');
  const series = useMemo(
    () => cenario.lambdas.map((l) => ({ lambda: l as Lambda, pontos: pontosDoTraco(cenario, l, 480, exagero) })),
    [cenario, exagero],
  );
  const terminal = eventoTerminal(cenario);
  const temFantasma = cenario.eventos.some((e) => e.tipo === 'fantasma');
  const nivelFim = Math.min(...cenario.lambdas.map((l) => nivelRetroespalhamento(cenario, l, terminal.km, exagero)));
  const ruido = Math.min(...cenario.lambdas.map((l) => nivelDoRuido(cenario, l, exagero)));
  const yMin = Math.floor((temFantasma ? ruido - 2 : nivelFim - 6) / 2) * 2;

  const x = (km: number) => M.esq + (km / cenario.kmMax) * (LARGURA - M.esq - M.dir);
  const y = (db: number) => M.topo + ((Y_MAX - db) / (Y_MAX - yMin)) * (ALTURA - M.topo - M.base);
  const yPreso = (db: number) => y(Math.min(Y_MAX, Math.max(yMin, db)));
  const passo = passoKm(cenario.kmMax);
  const marcasX: number[] = [];
  for (let k = 0; k <= cenario.kmMax + 1e-9; k += passo) marcasX.push(k);
  const marcasY: number[] = [];
  for (let d = 10; d >= yMin; d -= 5) marcasY.push(d);
  const caminho = (pts: { km: number; db: number }[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.km).toFixed(1)} ${y(p.db).toFixed(1)}`).join(' ');

  /** Onde a letra aponta: topo do pico (se refletir) ou o traço em 1310 nm. */
  const alvoDoEvento = (km: number, refletancia: number | null, ehFantasma: boolean) =>
    (ehFantasma ? ruido : nivelRetroespalhamento(cenario, 1310, km, exagero)) + alturaDoPico(refletancia);

  const circulo = (key: string, km: number, alvoDb: number, texto: string) => {
    const yAlvo = yPreso(alvoDb);
    const yl = Math.max(M.topo - 14, yAlvo - 18);
    return (
      <g key={key}>
        <line x1={x(km)} x2={x(km)} y1={yl + 8} y2={yAlvo - 2} className="d-cota" />
        <circle cx={x(km)} cy={yl} r={9} className="d-marco-letra" />
        <text x={x(km)} y={yl + 4} textAnchor="middle" className="d-texto d-forte d-letra" style={{ fontSize: 11 }}>
          {texto}
        </text>
      </g>
    );
  };

  const conteudo = (
    <>
      <defs>
        <clipPath id={recorte}>
          <rect x={M.esq} y={M.topo} width={LARGURA - M.esq - M.dir} height={ALTURA - M.topo - M.base} />
        </clipPath>
      </defs>
      {/* grade */}
      {marcasY.map((d) => (
        <g key={`y${d}`}>
          <line x1={M.esq} x2={LARGURA - M.dir} y1={y(d)} y2={y(d)} className="d-grade" />
          <text x={M.esq - 4} y={y(d) + 4} textAnchor="end" className="d-texto d-suave" style={{ fontSize: 10 }}>
            {fmt(d)}
          </text>
        </g>
      ))}
      {marcasX.map((k) => (
        <text key={`x${k}`} x={x(k)} y={ALTURA - M.base + 14} textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 10 }}>
          {fmt(k)}
        </text>
      ))}
      <line x1={M.esq} x2={LARGURA - M.dir} y1={ALTURA - M.base} y2={ALTURA - M.base} className="d-eixo" />
      <line x1={M.esq} x2={M.esq} y1={M.topo - 6} y2={ALTURA - M.base} className="d-eixo" />
      <text x={LARGURA - M.dir} y={ALTURA - 4} textAnchor="end" className="d-texto d-suave" style={{ fontSize: 10 }}>
        km
      </text>
      <text x={2} y={12} className="d-texto d-suave" style={{ fontSize: 10 }}>
        dB
      </text>
      {/* traços */}
      <g clipPath={`url(#${recorte})`}>
        {series.map((s) => (
          <path key={s.lambda} d={caminho(s.pontos)} className={s.lambda === 1310 ? 'd-traco d-traco-fino' : 'd-traco d-traco-1550'} />
        ))}
      </g>
      {/* legenda das λ */}
      {series.length > 1 && (
        <g>
          <line x1={M.esq} x2={M.esq + 20} y1={ALTURA - 8} y2={ALTURA - 8} className="d-traco d-traco-fino" />
          <text x={M.esq + 24} y={ALTURA - 4} className="d-texto" style={{ fontSize: 11 }}>
            1310 nm
          </text>
          <line x1={M.esq + 84} x2={M.esq + 104} y1={ALTURA - 8} y2={ALTURA - 8} className="d-traco d-traco-1550" />
          <text x={M.esq + 108} y={ALTURA - 4} className="d-texto" style={{ fontSize: 11 }}>
            1550 nm
          </text>
        </g>
      )}
      {letras && cenario.eventos.map((e, i) => circulo(`l${i}`, e.km, alvoDoEvento(e.km, e.refletancia, e.tipo === 'fantasma'), letra(i)))}
      {marcadores.map((mk, i) => {
        const ev = cenario.eventos.find((e) => Math.abs(e.km - mk.km) < 1e-6);
        const alvo = mk.db ?? (ev ? alvoDoEvento(ev.km, ev.refletancia, ev.tipo === 'fantasma') : nivelRetroespalhamento(cenario, 1310, mk.km, exagero));
        return circulo(`m${i}`, mk.km, alvo, mk.rotulo);
      })}
    </>
  );

  if (rotuloAria)
    return (
      <svg viewBox={`0 0 ${LARGURA} ${ALTURA}`} role="img" aria-label={rotuloAria} className="traco-otdr">
        {conteudo}
      </svg>
    );
  // Dentro de um <Diagrama> (que já tem título e descrição), o grupo é decorativo.
  return <g>{conteudo}</g>;
}

export const TAMANHO_TRACO = { largura: LARGURA, altura: ALTURA };
