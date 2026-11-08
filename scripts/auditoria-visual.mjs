// Script de auditoria visual e medição DOM dos 8 diagramas e 4 checklists.
// Captura prints em 390 px e 1440 px nos 3 temas (claro, escuro, sol)
// e mede colisões de <text> e proximidade da borda (< 6 px).
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { preview } from 'vite';

const SAIDA_PRINTS = '/tmp/prints-auditoria';
const SAIDA_RELATORIO = '/tmp/auditoria-svg.json';
mkdirSync(SAIDA_PRINTS, { recursive: true });

const BASE = 'http://localhost:4173/Telecom.estudos/';

const ontem = (() => {
  const d = new Date(Date.now() - 86_400_000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
})();

const ESTADO_BASE = {
  progresso: {
    licoes: {
      '10-01': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem },
      '10-03': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem },
      '10-04': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem },
      '05-01': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem },
      '05-03': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem },
      '05-04': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem },
      '04-01': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem },
      '04-03': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem },
      '04-05': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem },
    },
    diasEstudo: [ontem],
  },
  revisao: { itens: {}, dominadas: [] },
  caderno: { campos: {}, notas: [], perguntas: [] },
  ajustes: { tema: 'claro', sol: false, inicioPlano: ontem, diasSoRevisao: [], soRevisaoAte: null },
};

const DIAGRAMAS = [
  { id: '10-03', rota: '#/licao/10-03', nome: 'Luz Invisível e Segurança Ocular' },
  { id: '10-04', rota: '#/licao/10-04', nome: 'Bancada Limpa e Descarte' },
  { id: '05-01', rota: '#/licao/05-01', nome: 'Preparo da Fibra para Fusão' },
  { id: '05-03', rota: '#/licao/05-03', nome: 'Dentro da Máquina de Fusão' },
  { id: '05-04', rota: '#/licao/05-04', nome: 'Atenuação Estimada vs Real' },
  { id: '04-01', rota: '#/licao/04-01', nome: 'Anatomia da Rede FTTH' },
  { id: '04-03', rota: '#/licao/04-03', nome: 'Splitters Balanceados e Atenuação' },
  { id: '04-05', rota: '#/licao/04-05', nome: 'Orçamento de Atenuação PON' },
];

const CHECKLISTS = [
  { id: 'campo-hub', rota: '#/campo', nome: 'Central de Checklists de Campo' },
  { id: 'antes-de-subir-no-poste', rota: '#/campo/antes-de-subir-no-poste', nome: 'Antes de Subir no Poste' },
  { id: 'antes-da-fusao', rota: '#/campo/antes-da-fusao', nome: 'Antes da Fusão' },
  { id: 'inspecao-ceo-cto', rota: '#/campo/inspecao-ceo-cto', nome: 'Inspeção de CEO e CTO' },
  { id: 'aceite-de-obra', rota: '#/campo/aceite-de-obra', nome: 'Aceite de Obra e Trecho Óptico' },
];

const TEMAS = [
  { id: 'claro', config: { tema: 'claro', sol: false } },
  { id: 'escuro', config: { tema: 'escuro', sol: false } },
  { id: 'sol', config: { tema: 'claro', sol: true } },
];

const RESOLUCOES = [
  { id: '390', largura: 390, altura: 844 },
  { id: '1440', largura: 1440, altura: 900 },
];

async function main() {
  console.log('Iniciando servidor Vite preview...');
  let previewServer;
  try {
    previewServer = await preview({ preview: { port: 4173 } });
  } catch (err) {
    console.log('Vite preview pode já estar rodando:', err.message);
  }

  const relatorioSVG = {};

  const navegador = await chromium.launch();

  for (const res of RESOLUCOES) {
    console.log(`\n=== Processando resolução ${res.id}px (${res.largura}x${res.altura}) ===`);
    const contexto = await navegador.newContext({
      viewport: { width: res.largura, height: res.altura },
      deviceScaleFactor: 2,
      serviceWorkers: 'block',
      locale: 'pt-BR',
      timezoneId: 'America/Boa_Vista',
    });

    const page = await contexto.newPage();

    // 1. Processar Diagramas
    for (const diag of DIAGRAMAS) {
      console.log(`Diagrama ${diag.id} (${diag.nome})...`);
      for (const tema of TEMAS) {
        const estado = {
          ...ESTADO_BASE,
          ajustes: { ...ESTADO_BASE.ajustes, ...tema.config },
        };

        await page.goto(BASE);
        await page.evaluate((e) => localStorage.setItem('fc:v1:estado', JSON.stringify(e)), estado);
        await page.goto(BASE + diag.rota);
        await page.locator('main h1').first().waitFor();

        const diagLoc = page.locator('figure.diagrama').first();
        await diagLoc.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);

        // Screenshot do elemento diagrama com legenda
        const arqDiag = `${SAIDA_PRINTS}/diagrama-${diag.id}-${res.id}-${tema.id}.png`;
        await diagLoc.screenshot({ path: arqDiag });

        // Screenshot da tela completa com contexto
        const arqTela = `${SAIDA_PRINTS}/tela-licao-${diag.id}-${res.id}-${tema.id}.png`;
        await page.screenshot({ path: arqTela });

        // Medição DOM no tema claro a 390px (referência de colisão)
        if (res.id === '390' && tema.id === 'claro') {
          const resultadoAnalise = await page.evaluate(() => {
            const svg = document.querySelector('figure.diagrama svg');
            if (!svg) return { erro: 'SVG não encontrado' };

            const vb = svg.viewBox.baseVal;
            const viewBox = { x: vb.x, y: vb.y, width: vb.width, height: vb.height };
            const svgRect = svg.getBoundingClientRect();

            const textElements = Array.from(svg.querySelectorAll('text'));
            const textos = textElements.map((el, idx) => {
              const bbox = el.getBBox();
              const rect = el.getBoundingClientRect();
              return {
                idx,
                texto: el.textContent.trim().replace(/\s+/g, ' '),
                tag: el.tagName,
                fontSize: window.getComputedStyle(el).fontSize,
                bbox: { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height },
                rect: {
                  x: rect.x - svgRect.x,
                  y: rect.y - svgRect.y,
                  width: rect.width,
                  height: rect.height,
                  left: rect.left - svgRect.left,
                  right: rect.right - svgRect.left,
                  top: rect.top - svgRect.top,
                  bottom: rect.bottom - svgRect.top,
                },
              };
            });

            // 1. Proximidade de bordas (viewBox)
            const avisosBorda = [];
            for (const t of textos) {
              const dEsq = t.bbox.x - viewBox.x;
              const dDir = viewBox.x + viewBox.width - (t.bbox.x + t.bbox.width);
              const dTop = t.bbox.y - viewBox.y;
              const dFundo = viewBox.y + viewBox.height - (t.bbox.y + t.bbox.height);

              if (dEsq < 6) avisosBorda.push({ texto: t.texto, lado: 'esquerda', distancia: Math.round(dEsq * 10) / 10 });
              if (dDir < 6) avisosBorda.push({ texto: t.texto, lado: 'direita', distancia: Math.round(dDir * 10) / 10 });
              if (dTop < 6) avisosBorda.push({ texto: t.texto, lado: 'topo', distancia: Math.round(dTop * 10) / 10 });
              if (dFundo < 6) avisosBorda.push({ texto: t.texto, lado: 'fundo', distancia: Math.round(dFundo * 10) / 10 });
            }

            // 2. Colisões entre pares de textos
            const colisoes = [];
            for (let i = 0; i < textos.length; i++) {
              for (let j = i + 1; j < textos.length; j++) {
                const a = textos[i];
                const b = textos[j];

                // Medição em viewBox coords
                const ox = Math.min(a.bbox.x + a.bbox.width, b.bbox.x + b.bbox.width) - Math.max(a.bbox.x, b.bbox.x);
                const oy = Math.min(a.bbox.y + a.bbox.height, b.bbox.y + b.bbox.height) - Math.max(a.bbox.y, b.bbox.y);

                // Medição em tela px
                const rox = Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left);
                const roy = Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top);

                if (ox > 1 && oy > 1 && rox > 1 && roy > 1) {
                  colisoes.push({
                    t1: a.texto,
                    t2: b.texto,
                    overlapViewBox: { x: Math.round(ox * 10) / 10, y: Math.round(oy * 10) / 10 },
                    overlapPx: { x: Math.round(rox * 10) / 10, y: Math.round(roy * 10) / 10 },
                  });
                }
              }
            }

            return {
              viewBox,
              svgRect: { width: Math.round(svgRect.width), height: Math.round(svgRect.height) },
              totalTextos: textos.length,
              avisosBorda,
              colisoes,
            };
          });

          relatorioSVG[diag.id] = {
            id: diag.id,
            nome: diag.nome,
            rota: diag.rota,
            ...resultadoAnalise,
          };
        }
      }
    }

    // 2. Processar Checklists
    for (const chk of CHECKLISTS) {
      console.log(`Checklist ${chk.id} (${chk.nome})...`);
      for (const tema of TEMAS) {
        const estado = {
          ...ESTADO_BASE,
          ajustes: { ...ESTADO_BASE.ajustes, ...tema.config },
        };

        await page.goto(BASE);
        await page.evaluate((e) => localStorage.setItem('fc:v1:estado', JSON.stringify(e)), estado);
        await page.goto(BASE + chk.rota);
        await page.locator('main h1').first().waitFor();
        await page.waitForTimeout(150);

        const arqCheck = `${SAIDA_PRINTS}/checklist-${chk.id}-${res.id}-${tema.id}.png`;
        await page.screenshot({ path: arqCheck });
      }
    }

    await contexto.close();
  }

  await navegador.close();
  if (previewServer) {
    await previewServer.close();
  }

  writeFileSync(SAIDA_RELATORIO, JSON.stringify(relatorioSVG, null, 2), 'utf8');
  console.log(`\nAuditoria visual concluída!`);
  console.log(`Prints salvos em: ${SAIDA_PRINTS}/`);
  console.log(`Relatório SVG salvo em: ${SAIDA_RELATORIO}`);
}

main().catch((err) => {
  console.error('Erro na auditoria visual:', err);
  process.exit(1);
});
