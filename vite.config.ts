import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// O endereço do GitHub Pages é https://peseogo-stack.github.io/Telecom.estudos/
// Por isso a base tem o nome exato do repositório (T maiúsculo e ponto).
const BASE = '/Telecom.estudos/';

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icone.svg', 'icone-192.png', 'icone-512.png'],
      manifest: {
        name: 'Fibra em Campo',
        short_name: 'Fibra em Campo',
        description: 'Estudo e consulta em campo sobre telecom numa distribuidora de energia.',
        lang: 'pt-BR',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        background_color: '#F6F8FC',
        theme_color: '#0B1F4B',
        icons: [
          { src: 'icone-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icone-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icone-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Pré-carrega tudo (app + conteúdo) para funcionar sem internet.
        globPatterns: ['**/*.{js,css,html,svg,png,json,webmanifest}'],
        navigateFallback: `${BASE}index.html`,
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/testes-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.mjs'],
  },
});
