// Campo de número que aceita o jeito brasileiro ("99,7", "3.000") e, se pedir, valores negativos
// (dBm quase sempre é negativo, e o teclado numérico do celular nem sempre tem o sinal de menos).
import { useEffect, useId, useState } from 'react';
import { lerNumero, mostrarNumero } from '../dominio/numeros';

interface Props {
  rotulo: string;
  valor: number;
  onMudar: (n: number) => void;
  dica?: string;
  sufixo?: string;
  permitirNegativo?: boolean;
}

export function CampoNumero({ rotulo, valor, onMudar, dica, sufixo, permitirNegativo }: Props) {
  const id = useId();
  const [texto, setTexto] = useState(mostrarNumero(valor));
  useEffect(() => {
    if (lerNumero(texto) !== valor && !(Number.isNaN(valor) && texto === '')) setTexto(mostrarNumero(valor));
    // Só reage a mudanças de fora (ex.: botão "restaurar padrão").
  }, [valor]);

  function mudar(t: string) {
    setTexto(t);
    onMudar(lerNumero(t));
  }

  return (
    <div className="campo">
      <label htmlFor={id}>
        {rotulo}
        {sufixo ? ` (${sufixo})` : ''}
      </label>
      <div className={permitirNegativo ? 'campo-com-sinal' : undefined}>
        <input id={id} type="text" inputMode={permitirNegativo ? 'text' : 'decimal'} autoComplete="off" value={texto} onChange={(e) => mudar(e.target.value)} />
        {permitirNegativo && (
          <button
            type="button"
            className="botao botao-secundario"
            aria-label={`Trocar o sinal de ${rotulo}`}
            onClick={() => {
              const n = lerNumero(texto);
              mudar(Number.isFinite(n) ? mostrarNumero(-n) : '-');
            }}
          >
            ±
          </button>
        )}
      </div>
      {dica && <span className="dica">{dica}</span>}
    </div>
  );
}
