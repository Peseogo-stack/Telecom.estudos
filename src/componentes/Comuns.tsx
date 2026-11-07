import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { NOME_APP } from '../app/config';
import type { Fonte } from '../conteudo/tipos';
import { formatarDia } from '../dominio/datas';

/** Define o título da aba do navegador. */
export function useTitulo(titulo: string) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · ${NOME_APP}` : NOME_APP;
  }, [titulo]);
}

export function AvisoSeguranca() {
  return (
    <p className="aviso aviso-seguranca" role="note">
      ⚠ Lembrete de estudo. Não substitui treinamento, APR, permissão de trabalho nem o procedimento da empresa. Na dúvida, pare e pergunte.
    </p>
  );
}

export function SeloConfirmar() {
  return <span className="selo-confirmar">Confirmar na empresa</span>;
}

/** HTML gerado no build a partir do nosso próprio Markdown (não vem do usuário). */
export function Html({ html }: { html: string }) {
  return <div className="prosa" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function ListaFontes({ fontes }: { fontes: Fonte[] }) {
  return (
    <ol className="prosa">
      {fontes.map((f) => (
        <li key={f.id}>
          <a href={f.url} target="_blank" rel="noopener noreferrer">
            {f.titulo}
          </a>{' '}
          — {f.organizacao}. Acesso em {formatarDia(f.acessadoEm)}.
          {f.observacao ? <span className="suave"> {f.observacao}</span> : null}
        </li>
      ))}
    </ol>
  );
}

export function BarraProgresso({ valor, total, rotulo }: { valor: number; total: number; rotulo: string }) {
  const pct = total ? Math.round((valor / total) * 100) : 0;
  return (
    <div
      className="barra-progresso"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={valor}
      aria-label={rotulo}
      aria-valuetext={`${valor} de ${total}`}
    >
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Migalhas({ itens }: { itens: { para?: string; rotulo: string }[] }) {
  return (
    <nav className="migalhas" aria-label="Você está em">
      {itens.map((i, n) => (
        <span key={i.rotulo}>
          {n > 0 && ' › '}
          {i.para ? <Link to={i.para}>{i.rotulo}</Link> : <span aria-current="page">{i.rotulo}</span>}
        </span>
      ))}
    </nav>
  );
}

export function Cartao({ children, destaque, titulo }: { children: ReactNode; destaque?: boolean; titulo?: string }) {
  return (
    <section className={`cartao${destaque ? ' cartao-destaque' : ''}`} aria-label={titulo}>
      {children}
    </section>
  );
}

/** Embaralha (Fisher–Yates) uma cópia da lista. */
export function embaralhar<T>(lista: T[]): T[] {
  const c = [...lista];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}
