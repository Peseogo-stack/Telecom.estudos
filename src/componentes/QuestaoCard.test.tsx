import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { QuestaoCard } from './QuestaoCard';
import type { Questao } from '../conteudo/tipos';

vi.mock('../conteudo/carregar', () => ({ fontesPorId: new Map() }));

const questao: Questao = {
  id: 't-q1',
  licao: '09-01',
  enunciado: 'Quanto é 0,3% de 43.200 min?',
  alternativas: [
    { texto: '129,6 min', correta: true, explicacao: 'Conta certa.' },
    { texto: '43,2 min', correta: false, explicacao: 'Isso é 0,1%.' },
    { texto: '216 min', correta: false, explicacao: 'Isso é 0,5%.' },
    { texto: '302,4 min', correta: false, explicacao: 'Isso é 0,7%.' },
  ],
  fontes: [],
  dificuldade: 1,
};

describe('QuestaoCard', () => {
  it('só confirma depois de escolher, e então mostra a explicação de todas as alternativas', () => {
    const onResponder = vi.fn();
    render(<QuestaoCard questao={questao} numero={1} total={5} onResponder={onResponder} onProxima={() => {}} rotuloProxima="Próxima" />);
    const confirmar = screen.getByRole('button', { name: 'Confirmar resposta' });
    expect(confirmar).toBeDisabled();
    fireEvent.click(screen.getByLabelText(/43,2 min/));
    fireEvent.click(confirmar);
    expect(onResponder).toHaveBeenCalledWith(false);
    for (const a of questao.alternativas) expect(screen.getByText(a.explicacao)).toBeInTheDocument();
    expect(screen.getByText(/A certa é: 129,6 min/)).toBeInTheDocument();
  });

  it('embaralha as alternativas: a posição da certa na tela não é a do arquivo', () => {
    // Com o sorteio sempre em 0, o Fisher–Yates leva a 1ª alternativa do arquivo para o fim.
    const sorteio = vi.spyOn(Math, 'random').mockReturnValue(0);
    render(<QuestaoCard questao={questao} numero={1} total={5} onResponder={() => {}} onProxima={() => {}} rotuloProxima="Próxima" />);
    const textos = screen.getAllByRole('radio').map((r) => r.closest('label')?.textContent ?? '');
    expect(textos[0]).not.toContain('129,6');
    expect(textos[3]).toContain('129,6');
    sorteio.mockRestore();
  });

  it('teclado: 1 a 4 escolhem e Enter confirma', () => {
    const onResponder = vi.fn();
    render(<QuestaoCard questao={questao} numero={1} total={5} onResponder={onResponder} onProxima={() => {}} rotuloProxima="Próxima" />);
    const certaIndice = screen.getAllByRole('radio').findIndex((r) => r.closest('label')?.textContent?.includes('129,6'));
    fireEvent.keyDown(window, { key: String(certaIndice + 1) });
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(onResponder).toHaveBeenCalledWith(true);
    expect(screen.getByText('Você acertou!')).toBeInTheDocument();
  });
});
