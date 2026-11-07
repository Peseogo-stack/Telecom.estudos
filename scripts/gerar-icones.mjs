// Gera os ícones PNG do PWA a partir do desenho em SVG, usando o Chromium do Playwright.
// Uso: node scripts/gerar-icones.mjs  (só precisa rodar quando o ícone mudar)
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const svg = (tam) => `<html><body style="margin:0;background:#0B1F4B">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 40 40" width="${tam}" height="${tam}">
<rect x="-4" y="-4" width="40" height="40" fill="#0B1F4B"/>
<rect width="32" height="32" rx="8" fill="#1F4FD8"/>
<path d="M5 22c6 0 7-12 13-12s5 6 9 6" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="27" cy="16" r="2.5" fill="#FFE600"/></svg></body></html>`;

const navegador = await chromium.launch();
for (const tam of [192, 512]) {
  const pagina = await navegador.newPage({ viewport: { width: tam, height: tam } });
  await pagina.setContent(svg(tam));
  writeFileSync(`public/icone-${tam}.png`, await pagina.screenshot({ type: 'png' }));
}
await navegador.close();
console.log('Ícones gerados em public/.');
