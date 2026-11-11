import { Diagrama, type PropsDiagrama } from './Diagrama';

// Serviços de telecom da distribuidora e o prazo de cada um, em régua logarítmica (1 ms a 20 s).
const X0 = 18;
const POR_DECADA = 85;
const x = (ms: number) => X0 + POR_DECADA * Math.log10(ms);

const MARCAS: [number, string][] = [
  [1, '1 ms'],
  [10, '10 ms'],
  [100, '100 ms'],
  [1000, '1 s'],
  [10000, '10 s'],
];

// [rótulo, valor, início (ms), fim (ms; omitido = ponto)]
const PRAZOS: [string, string, number, number?][] = [
  ['Trip por GOOSE', '3 ms', 3],
  ['Diferencial de linha', '5 ms', 5],
  ['Transferência direta de disparo', '10 ms', 10],
  ['Comandos do operador', '500 ms', 500],
  ['Eventos e alarmes', '1 s', 1000],
  ['Dados de SCADA, subestação ao centro', '0,5 a 5 s', 500, 5000],
  ['Gestão da rede de distribuição', '100 ms a 2 s', 100, 2000],
  ['Medição inteligente (AMI)', '2 a 15 s', 2000, 15000],
];

export function ServicosPrazos({ descricao }: PropsDiagrama) {
  const caixa = (px: number, py: number, w: number, a: string, b?: string, tracejada?: boolean) => (
    <g>
      <rect x={px} y={py} width={w} height="34" rx="6" className={tracejada ? 'd-caixa d-caixa-tracejada' : 'd-caixa'} />
      <text x={px + w / 2} y={b ? py + 14 : py + 22} textAnchor="middle" className="d-texto d-forte">{a}</text>
      {b && <text x={px + w / 2} y={py + 28} textAnchor="middle" className="d-texto d-forte">{b}</text>}
    </g>
  );
  const topo = 232;
  const passo = 30;
  return (
    <Diagrama titulo="Serviços da distribuidora e o prazo de cada um" descricao={descricao} viewBox="0 0 400 480">
      {/* centro e serviços */}
      <rect x="148" y="4" width="104" height="114" rx="8" className="d-caixa d-caixa-destaque" />
      <text x="200" y="54" textAnchor="middle" className="d-texto d-forte">Centro de</text>
      <text x="200" y="70" textAnchor="middle" className="d-texto d-forte">operação</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1="124" y1={21 + i * 40} x2="148" y2={21 + i * 40} className="d-linha-grossa" />
          <line x1="252" y1={21 + i * 40} x2="276" y2={21 + i * 40} className="d-linha-grossa" />
        </g>
      ))}
      {caixa(4, 4, 120, 'SCADA')}
      {caixa(4, 44, 120, 'Automação de', 'subestação')}
      {caixa(4, 84, 120, 'Teleproteção')}
      {caixa(276, 4, 120, 'Medição', 'inteligente (AMI)')}
      {caixa(276, 44, 120, 'Religadores')}
      {caixa(276, 84, 120, 'Gestão de perdas')}

      {/* rede corporativa, separada */}
      <line x1="4" y1="130" x2="396" y2="130" className="d-linha" strokeDasharray="6 4" />
      <text x="4" y="158" className="d-texto d-suave">separada da rede operativa</text>
      {caixa(200, 138, 196, 'Rede corporativa', undefined, true)}

      {/* régua de tempo */}
      <text x="4" y="196" className="d-texto d-forte">Prazo de cada serviço</text>
      <text x="396" y="196" textAnchor="end" className="d-texto d-suave">escala logarítmica</text>
      {MARCAS.map(([ms, r]) => (
        <g key={r}>
          <text x={x(ms)} y="218" textAnchor="middle" className="d-texto d-suave" style={{ fontSize: 11 }}>{r}</text>
          <line x1={x(ms)} y1="224" x2={x(ms)} y2={topo + PRAZOS.length * passo - 14} className="d-grade" />
        </g>
      ))}
      {PRAZOS.map(([nome, valor, ini, fim], i) => {
        const y = topo + i * passo;
        return (
          <g key={nome}>
            <text x="4" y={y + 10} className="d-texto">
              {nome}: <tspan className="d-forte">{valor}</tspan>
            </text>
            {fim && <line x1={x(ini)} y1={y + 22} x2={x(fim)} y2={y + 22} className="d-linha-grossa" />}
            <circle cx={x(ini)} cy={y + 22} r="5" className="d-marco" />
            {fim && <circle cx={x(fim)} cy={y + 22} r="5" className="d-marco" />}
          </g>
        );
      })}
    </Diagrama>
  );
}
