// Uma questão de múltipla escolha. Depois de confirmar, mostra a explicação de TODAS as alternativas.
// Teclado: 1 a 4 escolhem a alternativa; Enter confirma e depois avança.
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { Questao } from '../conteudo/tipos';
import { fontesPorId } from '../conteudo/carregar';
import { embaralhar } from './Comuns';

interface Props {
  questao: Questao;
  numero: number;
  total: number;
  onResponder: (acertou: boolean) => void;
  onProxima: () => void;
  rotuloProxima: string;
}

export function QuestaoCard({ questao, numero, total, onResponder, onProxima, rotuloProxima }: Props) {
  const nome = useId();
  const alternativas = useMemo(() => embaralhar(questao.alternativas), [questao]);
  const [escolhida, setEscolhida] = useState<number | null>(null);
  const [confirmada, setConfirmada] = useState(false);
  const botaoProxima = useRef<HTMLButtonElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);

  // O componente é recriado a cada questão (key={questao.id} no pai), então o estado já começa limpo.
  useEffect(() => {
    titulo.current?.focus();
  }, []);

  const acertou = escolhida !== null && alternativas[escolhida].correta;
  const certa = alternativas.find((a) => a.correta)!;

  function confirmar() {
    if (escolhida === null || confirmada) return;
    setConfirmada(true);
    onResponder(alternativas[escolhida].correta);
    setTimeout(() => botaoProxima.current?.focus(), 0);
  }

  useEffect(() => {
    function tecla(e: KeyboardEvent) {
      const alvo = e.target as HTMLElement;
      if (alvo.tagName === 'TEXTAREA' || (alvo.tagName === 'INPUT' && (alvo as HTMLInputElement).type !== 'radio')) return;
      if (!confirmada && /^[1-4]$/.test(e.key)) {
        const i = Number(e.key) - 1;
        if (i < alternativas.length) setEscolhida(i);
      } else if (e.key === 'Enter' && alvo.tagName !== 'BUTTON' && alvo.tagName !== 'A') {
        e.preventDefault();
        if (!confirmada) confirmar();
        else onProxima();
      }
    }
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  });

  return (
    <div className="cartao questao">
      <p className="rotulo">
        Questão {numero} de {total}
      </p>
      <h2 ref={titulo} tabIndex={-1} className="so-leitor">
        Questão {numero}
      </h2>
      <fieldset>
        <legend>{questao.enunciado}</legend>
        {alternativas.map((a, i) => {
          const classe = confirmada ? (a.correta ? ' certa' : i === escolhida ? ' errada' : '') : '';
          return (
            <label key={a.texto} className={`alternativa${classe}`}>
              <input
                type="radio"
                name={nome}
                checked={escolhida === i}
                disabled={confirmada}
                onChange={() => setEscolhida(i)}
              />
              <span>
                <span className="tecla" aria-hidden="true">{i + 1}. </span>
                {a.texto}
                {confirmada && (
                  <span className="explicacao">
                    <span className="marca-resposta">
                      {a.correta ? (i === escolhida ? '✓ Sua resposta. ' : '✓ ') : i === escolhida ? '✗ Sua resposta. ' : '✗ '}
                    </span>
                    <span className="so-leitor">{a.correta ? 'Alternativa certa.' : 'Alternativa errada.'} </span>
                    {a.explicacao}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </fieldset>
      <div aria-live="polite" className={confirmada ? (acertou ? 'aviso aviso-ok' : 'aviso aviso-erro') : 'so-leitor'}>
        {confirmada && (acertou ? 'Você acertou!' : `Não foi dessa vez. A certa é: ${certa.texto}`)}
      </div>
      {confirmada && (
        <p className="dica">
          Fonte:{' '}
          {questao.fontes.map((id, n) => {
            const f = fontesPorId.get(id);
            return (
              <span key={id}>
                {n > 0 && '; '}
                {f ? (
                  <a href={f.url} target="_blank" rel="noopener noreferrer">
                    {f.organizacao.split(' (')[0]}
                  </a>
                ) : (
                  id
                )}
              </span>
            );
          })}
        </p>
      )}
      <div className="acoes">
        {!confirmada ? (
          <button type="button" className="botao botao-largo" disabled={escolhida === null} onClick={confirmar}>
            Confirmar resposta
          </button>
        ) : (
          <button ref={botaoProxima} type="button" className="botao botao-largo" onClick={onProxima}>
            {rotuloProxima}
          </button>
        )}
      </div>
      <p className="dica">Teclado: 1 a 4 para escolher, Enter para confirmar.</p>
    </div>
  );
}
