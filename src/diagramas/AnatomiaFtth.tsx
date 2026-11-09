import { Diagrama, type PropsDiagrama } from './Diagrama';

// Anatomia completa de uma rede FTTH/PON da OLT até a ONU,
// comparando divisão centralizada e distribuída (cascateada).
export function AnatomiaFtth({ descricao }: PropsDiagrama) {
  const bloco = (y: number, destaque: boolean, titulo: string, l1: string, l2: string, l3: string) => (
    <g>
      <rect x="10" y={y} width="380" height="66" rx="8" className={destaque ? 'd-caixa-destaque' : 'd-caixa'} />
      <text x="22" y={y + 19} className="d-texto d-forte" style={{ fontSize: 13 }}>
        {titulo}
      </text>
      <text x="22" y={y + 37} className="d-texto d-suave">
        {l1}
      </text>
      <text x="22" y={y + 55} className="d-texto d-forte">
        {l3}
      </text>
      {l2 && (
        <text x="378" y={y + 37} textAnchor="end" className="d-texto d-suave">
          {l2}
        </text>
      )}
    </g>
  );
  const seta = (y: number) => <line x1="200" y1={y} x2="200" y2={y + 14} className="d-cota" markerEnd="url(#d-seta)" />;
  const item = (x: number, y: number, t: string, forte = false) => (
    <text x={x} y={y} className={forte ? 'd-texto d-forte' : 'd-texto d-suave'}>
      {t}
    </text>
  );
  return (
    <Diagrama
      titulo="Anatomia da rede FTTH: caminho óptico da OLT até a ONU e topologias"
      descricao={descricao}
      viewBox="0 0 400 484"
    >
      {bloco(8, true, '1. Central: OLT + DIO', 'Down: 1490 nm', 'Up: 1310 nm', 'Alimentador')}
      {seta(74)}
      {bloco(88, false, '2. Planta externa: CEO → CTO', 'CEO: 1º splitter', 'CTO: no poste', 'Cabo drop')}
      {seta(154)}
      {bloco(168, true, '3. Cliente: PTO → ONU', 'PTO: roseta', 'Cordão SC/APC', 'Porta Ethernet')}

      {/* Topologias */}
      <rect x="10" y="244" width="380" height="232" rx="8" className="d-zona-controlada" />
      <text x="200" y="264" textAnchor="middle" className="d-texto d-forte" style={{ fontSize: 13 }}>
        Topologias de divisão óptica na ODN
      </text>

      <rect x="18" y="274" width="364" height="92" rx="6" className="d-caixa" />
      <text x="28" y="292" className="d-texto d-forte" style={{ fontSize: 13 }}>
        Divisão centralizada (1 nível)
      </text>
      {item(28, 310, '• 1 splitter 1:32 / 1:64 na CEO')}
      {item(28, 326, '• CTO só conectoriza os drops')}
      {item(28, 342, '• Perda: a de um splitter só')}
      {item(28, 358, '• Mais fibras nos cabos aéreos', true)}

      <rect x="18" y="374" width="364" height="92" rx="6" className="d-caixa" />
      <text x="28" y="392" className="d-texto d-forte" style={{ fontSize: 13 }}>
        Divisão distribuída (2 níveis)
      </text>
      {item(28, 410, '• 1º nível (CEO) + 2º nível (CTO)')}
      {item(28, 426, '• 1:8 + 1:8 atende até 64 ONUs')}
      {item(28, 442, '• Economiza cabos na rota troncal')}
      {item(28, 458, '• OTDR: do cliente para a central', true)}
    </Diagrama>
  );
}
