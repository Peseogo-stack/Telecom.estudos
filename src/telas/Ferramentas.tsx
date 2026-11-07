import { Link } from 'react-router-dom';
import { useTitulo } from '../componentes/Comuns';

const PRONTAS = [
  {
    para: '/ferramentas/disponibilidade',
    titulo: 'Disponibilidade e glosa de SLA',
    texto: 'Converte a % do SLA em minutos, soma as paradas, aplica as exclusões e calcula o desconto, com memória de cálculo para copiar.',
  },
];

const EM_BREVE = [
  'Orçamento de potência (PON e ponto a ponto)',
  'Conversor dBm ↔ mW e perda de splitters',
  'Código de cores (Brasil e TIA-598)',
  'Comprimento de cabo com reserva técnica',
  'Leitor de OTDR',
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
