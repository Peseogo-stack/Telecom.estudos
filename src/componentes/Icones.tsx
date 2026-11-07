// Ícones próprios em SVG (traço), sem biblioteca externa.
import type { ReactNode } from 'react';

function Icone({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export const IconeHoje = () => (
  <Icone>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9h18M8 2v4M16 2v4" />
    <path d="M8 14l2.5 2.5L16 12" />
  </Icone>
);
export const IconeTrilha = () => (
  <Icone>
    <path d="M4 5h6v6H4zM14 13h6v6h-6z" />
    <path d="M10 8h4a3 3 0 0 1 3 3v2" />
  </Icone>
);
export const IconeFerramentas = () => (
  <Icone>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 18h2M14 18h2" />
  </Icone>
);
export const IconeGlossario = () => (
  <Icone>
    <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />
    <path d="M5 17a3 3 0 0 1 3-3h11" />
  </Icone>
);
export const IconeCaderno = () => (
  <Icone>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 3v18M12 8h4M12 12h4" />
  </Icone>
);
export const IconeBusca = () => (
  <Icone>
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.5-4.5" />
  </Icone>
);
export const IconeAjustes = () => (
  <Icone>
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </Icone>
);
export const IconeSol = () => (
  <Icone>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Icone>
);
export const IconeRevisao = () => (
  <Icone>
    <path d="M20 12a8 8 0 1 1-2.3-5.6" />
    <path d="M20 4v5h-5" />
  </Icone>
);
export const IconePlano = () => (
  <Icone>
    <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
  </Icone>
);

/** Logotipo: fibra em curva com o núcleo destacado. */
export const Logo = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <rect width="32" height="32" rx="8" fill="#1F4FD8" />
    <path d="M5 22c6 0 7-12 13-12s5 6 9 6" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="27" cy="16" r="2.5" fill="#FFE600" />
  </svg>
);
