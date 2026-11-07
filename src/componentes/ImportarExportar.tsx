// Exportar e importar em JSON, para passar do PC para o celular (e vice-versa).
// A importação mostra o que vai mudar antes de aplicar e nunca apaga o que já existe.
import { useRef, useState } from 'react';
import { useEstado } from '../app/EstadoApp';
import { type Escopo, type ResultadoLeitura, aplicarImportacao, exportar, lerImportacao, resumirImportacao } from '../dominio/armazenamento';

export function ImportarExportar({ escopo }: { escopo: Escopo }) {
  const { estado, despachar, hoje } = useEstado();
  const arquivo = useRef<HTMLInputElement>(null);
  const [leitura, setLeitura] = useState<Extract<ResultadoLeitura, { ok: true }> | null>(null);
  const [mensagem, setMensagem] = useState<{ tipo: 'ok' | 'erro'; texto: string } | null>(null);
  const nome = escopo === 'caderno' ? 'caderno' : 'tudo';

  function baixar() {
    const blob = new Blob([exportar(estado, escopo)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fibra-em-campo-${nome}-${hoje}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMensagem({ tipo: 'ok', texto: 'Arquivo gerado. Ele pode ter dados da empresa: não publique nem mande para fora.' });
  }

  async function escolher(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0];
    ev.target.value = '';
    if (!f) return;
    const r = lerImportacao(await f.text());
    if (!r.ok) {
      setLeitura(null);
      setMensagem({ tipo: 'erro', texto: `${r.erro} Nada foi alterado.` });
      return;
    }
    if (escopo === 'caderno' && r.escopo === 'tudo') {
      // Arquivo completo aberto na tela do caderno: importa só o caderno.
      setLeitura({ ok: true, escopo: 'caderno', dados: { caderno: r.dados.caderno } });
    } else {
      setLeitura(r);
    }
    setMensagem(null);
  }

  function aplicar() {
    if (!leitura) return;
    despachar({ tipo: 'substituir', estado: aplicarImportacao(estado, leitura) });
    setLeitura(null);
    setMensagem({ tipo: 'ok', texto: 'Importação aplicada.' });
  }

  return (
    <div>
      <div className="acoes">
        <button type="button" className="botao" onClick={baixar}>
          Exportar {escopo === 'caderno' ? 'caderno' : 'tudo'} (.json)
        </button>
        <button type="button" className="botao botao-secundario" onClick={() => arquivo.current?.click()}>
          Importar arquivo
        </button>
        <input ref={arquivo} type="file" accept="application/json,.json" hidden onChange={escolher} aria-label="Escolher arquivo para importar" />
      </div>
      {leitura && (
        <div className="aviso" role="alertdialog" aria-labelledby="t-importar">
          <p id="t-importar">
            <strong>Antes de aplicar, veja o que muda:</strong>
          </p>
          <ul>
            {resumirImportacao(estado, leitura).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <div className="acoes">
            <button type="button" className="botao" onClick={aplicar}>
              Aplicar importação
            </button>
            <button type="button" className="botao botao-secundario" onClick={() => setLeitura(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {mensagem && (
        <p className={`aviso ${mensagem.tipo === 'ok' ? 'aviso-ok' : 'aviso-erro'}`} role="status">
          {mensagem.texto}
        </p>
      )}
    </div>
  );
}
