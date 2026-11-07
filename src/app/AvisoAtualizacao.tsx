// Mostra "Pronto para usar sem internet" na primeira vez e "Nova versão disponível" quando sair atualização.
import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function AvisoAtualizacao() {
  const {
    offlineReady: [prontoOffline, setProntoOffline],
    needRefresh: [precisaAtualizar, setPrecisaAtualizar],
    updateServiceWorker,
  } = useRegisterSW();

  // O aviso de "pronto offline" some sozinho em 6 s para não cobrir a tela.
  useEffect(() => {
    if (!prontoOffline) return;
    const t = setTimeout(() => setProntoOffline(false), 6000);
    return () => clearTimeout(t);
  }, [prontoOffline, setProntoOffline]);

  if (precisaAtualizar) {
    return (
      <div className="toast" role="status">
        <span>Nova versão disponível.</span>
        <button type="button" className="botao" onClick={() => updateServiceWorker(true)}>
          Atualizar
        </button>
        <button type="button" className="botao-icone" aria-label="Fechar aviso" onClick={() => setPrecisaAtualizar(false)}>
          ✕
        </button>
      </div>
    );
  }
  if (prontoOffline) {
    return (
      <div className="toast" role="status">
        <span>Pronto: o app agora funciona sem internet.</span>
        <button type="button" className="botao-icone" aria-label="Fechar aviso" onClick={() => setProntoOffline(false)}>
          ✕
        </button>
      </div>
    );
  }
  return null;
}
