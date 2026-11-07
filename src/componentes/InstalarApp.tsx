// Botão "Instalar no aparelho": aparece quando o navegador (Chrome no Android, Edge no PC) oferece a instalação.
// Se o navegador não oferecer, mostra o caminho pelo menu.
import { useEffect, useState } from 'react';

interface EventoInstalacao extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstalarApp() {
  const [evento, setEvento] = useState<EventoInstalacao | null>(null);
  const [instalado, setInstalado] = useState(() => window.matchMedia?.('(display-mode: standalone)').matches ?? false);

  useEffect(() => {
    const aoOferecer = (e: Event) => {
      e.preventDefault();
      setEvento(e as EventoInstalacao);
    };
    const aoInstalar = () => setInstalado(true);
    window.addEventListener('beforeinstallprompt', aoOferecer);
    window.addEventListener('appinstalled', aoInstalar);
    return () => {
      window.removeEventListener('beforeinstallprompt', aoOferecer);
      window.removeEventListener('appinstalled', aoInstalar);
    };
  }, []);

  if (instalado) return <p className="aviso aviso-ok">O app já está instalado neste aparelho e funciona sem internet.</p>;

  return (
    <div>
      {evento ? (
        <button
          type="button"
          className="botao"
          onClick={async () => {
            await evento.prompt();
            const escolha = await evento.userChoice;
            if (escolha.outcome === 'accepted') setInstalado(true);
            setEvento(null);
          }}
        >
          Instalar no aparelho
        </button>
      ) : (
        <p className="dica">
          No Android (Chrome): menu <strong>⋮</strong> ► <strong>Instalar app</strong> (ou <strong>Adicionar à tela inicial</strong>). No PC (Chrome ou Edge): ícone de
          instalar na barra de endereço.
        </p>
      )}
      <p className="dica">Depois de abrir uma vez com internet, o app funciona em modo avião.</p>
    </div>
  );
}
