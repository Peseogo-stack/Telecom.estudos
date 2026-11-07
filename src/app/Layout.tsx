import { useEffect, useRef, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEstado } from './EstadoApp';
import { CONTEUDO_EM_REVISAO, NOME_APP } from './config';
import { AvisoAtualizacao } from './AvisoAtualizacao';
import {
  IconeAjustes,
  IconeBusca,
  IconeCaderno,
  IconeFerramentas,
  IconeGlossario,
  IconeHoje,
  IconeSol,
  IconeTrilha,
  Logo,
} from '../componentes/Icones';

const ITENS_NAV = [
  { para: '/', rotulo: 'Hoje', Icone: IconeHoje, fim: true },
  { para: '/trilha', rotulo: 'Trilha', Icone: IconeTrilha },
  { para: '/ferramentas', rotulo: 'Ferramentas', Icone: IconeFerramentas },
  { para: '/glossario', rotulo: 'Glossário', Icone: IconeGlossario },
  { para: '/caderno', rotulo: 'Caderno', Icone: IconeCaderno },
];

export function Layout({ children }: { children: ReactNode }) {
  const { estado, despachar, armazenamentoDisponivel, dadosCorrompidos } = useEstado();
  const { ajustes } = estado;
  const local = useLocation();
  const principal = useRef<HTMLElement>(null);
  const primeiraRota = useRef(true);

  // Tema e modo sol ficam no <html>, para o CSS trocar as cores.
  useEffect(() => {
    const raiz = document.documentElement;
    if (ajustes.tema === 'sistema') raiz.removeAttribute('data-tema');
    else raiz.setAttribute('data-tema', ajustes.tema);
    raiz.setAttribute('data-sol', ajustes.sol ? 'sim' : 'nao');
  }, [ajustes.tema, ajustes.sol]);

  // A cada troca de tela: volta ao topo e leva o foco ao conteúdo (bom para teclado e leitor de tela).
  useEffect(() => {
    if (primeiraRota.current) {
      primeiraRota.current = false;
      return;
    }
    window.scrollTo(0, 0);
    principal.current?.focus();
  }, [local.pathname]);

  return (
    <div className="app">
      <a className="pular" href="#conteudo" onClick={(e) => { e.preventDefault(); principal.current?.focus(); }}>
        Pular para o conteúdo
      </a>
      <header className="cabecalho">
        <Link to="/" className="marca" aria-label={`${NOME_APP}, ir para Hoje`}>
          <Logo />
          <span>{NOME_APP}</span>
        </Link>
        <Link to="/busca" className="botao-icone" aria-label="Buscar no app" title="Buscar">
          <IconeBusca />
        </Link>
        <button
          type="button"
          className="botao-icone"
          aria-pressed={ajustes.sol}
          aria-label="Modo sol: alto contraste e letra grande"
          title="Modo sol"
          onClick={() => despachar({ tipo: 'ajustes', ajustes: { sol: !ajustes.sol } })}
        >
          <IconeSol />
        </button>
        <Link to="/ajustes" className="botao-icone" aria-label="Ajustes" title="Ajustes">
          <IconeAjustes />
        </Link>
      </header>
      {CONTEUDO_EM_REVISAO && (
        <p className="faixa-revisao" role="note">
          <strong>Conteúdo em revisão.</strong> Cada número tem fonte e cada módulo passa por revisão técnica antes de entrar. Confirme na empresa antes de usar em campo.
        </p>
      )}
      {!armazenamentoDisponivel && (
        <p className="faixa-armazenamento" role="alert">
          O navegador bloqueou o armazenamento: seu progresso e o caderno não serão salvos neste modo.
        </p>
      )}
      {dadosCorrompidos && (
        <p className="faixa-armazenamento" role="alert">
          Os dados salvos neste aparelho estavam ilegíveis; o app recomeçou do zero. Se você tem um arquivo exportado, importe em Ajustes.
        </p>
      )}
      <div className="corpo">
        <nav className="navegacao" aria-label="Principal">
          {ITENS_NAV.map(({ para, rotulo, Icone, fim }) => (
            <NavLink key={para} to={para} end={fim} className={({ isActive }) => (isActive ? 'ativo' : '')}>
              <Icone />
              <span>{rotulo}</span>
            </NavLink>
          ))}
        </nav>
        <main id="conteudo" ref={principal} tabIndex={-1}>
          {children}
        </main>
      </div>
      <AvisoAtualizacao />
    </div>
  );
}
