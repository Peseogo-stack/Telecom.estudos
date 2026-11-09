import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { VideosLicao } from './VideosLicao';
import { ProvedorEstado } from '../app/EstadoApp';
import type { Video } from '../conteudo/tipos';

vi.mock('../conteudo/carregar', () => ({ indice: { perguntasEmpresa: [] } }));

const video: Video = {
  url: 'https://www.youtube.com/watch?v=aaaaaaaaaaa',
  titulo: 'Fusão passo a passo',
  canal: 'Canal Teste',
  duracao: '12:34',
  trecho: '3:10 a 9:45',
  observar: 'Veja como o clivador é limpo.',
  aviso: 'O vídeo usa outra máquina de fusão.',
  conferidoEm: '2026-11-09',
};

const mostrar = (videos: Video[], termos: string[] = []) =>
  render(
    <ProvedorEstado>
      <VideosLicao videos={videos} termos={termos} />
    </ProvedorEstado>,
  );

function definirOnline(valor: boolean) {
  vi.spyOn(window.navigator, 'onLine', 'get').mockReturnValue(valor);
}

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.clear();
});

describe('VideosLicao', () => {
  it('mostra título (link para o YouTube), canal, duração, trecho e o que observar', () => {
    mostrar([video]);
    const link = screen.getByRole('link', { name: /Fusão passo a passo/ });
    expect(link).toHaveAttribute('href', video.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAccessibleName(/abre no YouTube/);
    expect(screen.getByText(/Canal Teste · 12:34 · trecho: 3:10 a 9:45/)).toBeInTheDocument();
    expect(screen.getByText(/Veja como o clivador é limpo/)).toBeInTheDocument();
  });

  it('sem duração, diz que a duração não foi conferida', () => {
    mostrar([{ ...video, duracao: undefined, trecho: undefined }]);
    expect(screen.getByText('Canal Teste · duração não conferida')).toBeInTheDocument();
  });

  it('mostra o aviso quando há', () => {
    mostrar([video]);
    expect(screen.getByText('O vídeo usa outra máquina de fusão.')).toHaveClass('aviso');
  });

  it('Útil e Fora do tema alternam e desmarcam ao clicar de novo', () => {
    mostrar([video]);
    const util = screen.getByRole('button', { name: 'Útil' });
    const fora = screen.getByRole('button', { name: 'Fora do tema' });
    expect(util).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(util);
    expect(util).toHaveAttribute('aria-pressed', 'true');
    expect(fora).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(fora);
    expect(util).toHaveAttribute('aria-pressed', 'false');
    expect(fora).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(fora);
    expect(fora).toHaveAttribute('aria-pressed', 'false');
  });

  it('sem vídeo, mostra os termos como links de busca no YouTube', () => {
    mostrar([], ['fusão de fibra óptica passo a passo', 'OTDR como ler o traço']);
    expect(screen.getByText(/Ainda não há vídeo conferido para esta lição/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /OTDR como ler o traço/ });
    expect(link).toHaveAttribute('href', 'https://www.youtube.com/results?search_query=OTDR%20como%20ler%20o%20tra%C3%A7o');
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.queryByRole('button', { name: 'Útil' })).not.toBeInTheDocument();
  });

  it('sem internet, avisa no topo; o aviso some e volta com os eventos online e offline', () => {
    definirOnline(false);
    mostrar([video]);
    expect(screen.getByRole('status')).toHaveTextContent('Sem internet: os vídeos abrem no YouTube quando a conexão voltar.');
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('com internet, não mostra o aviso', () => {
    definirOnline(true);
    mostrar([video]);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
