import { Link } from 'react-router-dom';
import { useTitulo } from '../componentes/Comuns';

const PRONTAS = [
  {
    para: '/ferramentas/orcamento',
    titulo: 'Orçamento de potência',
    texto: 'PON ou ponto a ponto: soma fibra, conectores, fusões e splitters, compara com o transmissor e o receptor e diz se passa.',
  },
  {
    para: '/ferramentas/cores',
    titulo: 'Código de cores',
    texto: 'Número da fibra → tubo e cor, e o contrário, no padrão brasileiro e no TIA-598, com tubo piloto e modo treino.',
  },
  {
    para: '/ferramentas/conversor',
    titulo: 'dBm ↔ mW e splitters',
    texto: 'Converte potência e mostra a perda de splitters balanceados e desbalanceados, com a fonte de cada valor.',
  },
  {
    para: '/ferramentas/otdr',
    titulo: 'Leitor de OTDR',
    texto: 'Treino com 36 traços simulados em três níveis: conector, fusão, curvatura, quebra, fim de fibra, ganho aparente e fantasma, com a correção explicada.',
  },
  {
    para: '/ferramentas/disponibilidade',
    titulo: 'Disponibilidade e glosa de SLA',
    texto: 'Converte a % do SLA em minutos, soma as paradas, aplica as exclusões e calcula o desconto, com memória de cálculo para copiar.',
  },
];

const EM_BREVE = [
  'Comprimento de cabo com reserva técnica',
  'Montador de rede PON',
  'Inspeção de poste',
];

export function Ferramentas() {
  useTitulo('Ferramentas');
  return (
    <>
      <h1>Ferramentas</h1>
      <ul className="lista-limpa">
        {PRONTAS.map((f) => (
          <li key={f.para} className="cartao cartao-destaque">
            <h2>
              <Link to={f.para}>{f.titulo}</Link>
            </h2>
            <p className="suave">{f.texto}</p>
            <Link to={f.para} className="botao">
              Abrir
            </Link>
          </li>
        ))}
      </ul>
      <section className="cartao" aria-labelledby="t-breve">
        <h2 id="t-breve">Chegam na próxima fase</h2>
        <ul>
          {EM_BREVE.map((t) => (
            <li key={t} className="suave">
              {t}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
