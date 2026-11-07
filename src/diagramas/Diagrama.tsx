import { useId, type ReactNode } from 'react';

/** Moldura comum: todo diagrama tem título e descrição para leitor de tela. */
export function Diagrama({
  titulo,
  descricao,
  viewBox,
  children,
}: {
  titulo: string;
  descricao: string;
  viewBox: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <figure className="diagrama">
      <svg viewBox={viewBox} role="img" aria-labelledby={`${id}-t ${id}-d`} xmlns="http://www.w3.org/2000/svg">
        <title id={`${id}-t`}>{titulo}</title>
        <desc id={`${id}-d`}>{descricao}</desc>
        {children}
      </svg>
      <figcaption>{titulo}</figcaption>
    </figure>
  );
}

export interface PropsDiagrama {
  descricao: string;
}
