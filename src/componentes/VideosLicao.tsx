// Seção "Vídeos" da lição: vídeos conferidos (com avaliação guardada no aparelho)
// ou, sem vídeo, termos para buscar no YouTube.
import { useEffect, useState } from 'react';
import { useEstado } from '../app/EstadoApp';
import type { Video } from '../conteudo/tipos';
import type { AvaliacaoVideo } from '../dominio/estado';

function useOnline(): boolean {
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
  useEffect(() => {
    const ligar = () => setOnline(true);
    const desligar = () => setOnline(false);
    window.addEventListener('online', ligar);
    window.addEventListener('offline', desligar);
    return () => {
      window.removeEventListener('online', ligar);
      window.removeEventListener('offline', desligar);
    };
  }, []);
  return online;
}

const BOTOES: { valor: AvaliacaoVideo; rotulo: string }[] = [
  { valor: 'util', rotulo: 'Útil' },
  { valor: 'fora', rotulo: 'Fora do tema' },
];

function CartaoVideo({ video }: { video: Video }) {
  const { estado, despachar } = useEstado();
  const escolha = estado.videos[video.url];
  return (
    <div className="cartao">
      <h3>
        <a className="link-toque" href={video.url} target="_blank" rel="noopener noreferrer">
          {video.titulo}
          <span className="so-leitor"> (abre no YouTube, em outra aba)</span>
        </a>
      </h3>
      <p className="suave">
        {video.canal} · {video.duracao ?? 'duração não conferida'}
        {video.trecho ? ` · trecho: ${video.trecho}` : ''}
      </p>
      <p>
        <strong>O que observar:</strong> {video.observar}
      </p>
      {video.aviso && <p className="aviso">{video.aviso}</p>}
      <div className="acoes">
        {BOTOES.map((b) => (
          <button
            key={b.valor}
            type="button"
            className={`botao ${escolha === b.valor ? '' : 'botao-secundario'}`}
            aria-pressed={escolha === b.valor}
            onClick={() => despachar({ tipo: 'avaliarVideo', url: video.url, avaliacao: b.valor })}
          >
            {b.rotulo}
          </button>
        ))}
      </div>
    </div>
  );
}

export function VideosLicao({ videos, termos }: { videos: Video[]; termos: string[] }) {
  const online = useOnline();
  return (
    <section className="secao-licao" aria-labelledby="s-videos">
      <h2 id="s-videos">Vídeos</h2>
      {!online && (
        <p className="aviso" role="status">
          Sem internet: os vídeos abrem no YouTube quando a conexão voltar.
        </p>
      )}
      {videos.length > 0 ? (
        videos.map((v) => <CartaoVideo key={v.url} video={v} />)
      ) : (
        <>
          <p>Ainda não há vídeo conferido para esta lição. Termos para buscar no YouTube:</p>
          <ul className="prosa">
            {termos.map((t) => (
              <li key={t}>
                <a className="link-toque" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(t)}`} target="_blank" rel="noopener noreferrer">
                  {t}
                  <span className="so-leitor"> (abre no YouTube, em outra aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
