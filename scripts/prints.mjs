// Tira prints das telas em 390 px (celular) e 1440 px (PC) para revisão visual.
// Uso: npm run build && npx vite preview --port 4173 & node scripts/prints.mjs docs/prints/fase-2
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const saida = process.argv[2] ?? 'docs/prints';
mkdirSync(saida, { recursive: true });
const BASE = 'http://localhost:4173/Telecom.estudos/';

const ontem = (() => {
  const d = new Date(Date.now() - 86_400_000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
})();
// Estado de exemplo (fictício) para as telas não aparecerem vazias.
const EXEMPLO = {
  progresso: { licoes: { '10-01': { melhor: 5, tentativas: 1, aprovadaEm: ontem, lidaEm: ontem } }, diasEstudo: [ontem] },
  revisao: { itens: { '09-02-q1': { etapa: 0, vence: ontem, erros: 1 }, '10-01-q6': { etapa: 0, vence: ontem, erros: 1 } }, dominadas: [] },
  caderno: {
    campos: { 'sla-links': 'Exemplo fictício: 99,7% mensal, glosa proporcional' },
    notas: [],
    perguntas: [{ id: '10-01-p1', texto: 'Para telecom em poste com baixa tensão, que autorização NR-10 eu preciso e quem emite a APR e a permissão de trabalho?', onde: 'outras-areas', licao: '10-01', resposta: '', resolvida: false, criadaEm: new Date().toISOString() }],
  },
  ajustes: { tema: 'claro', sol: false, inicioPlano: ontem, diasSoRevisao: [], soRevisaoAte: null },
};

const telas = [
  ['01-hoje', '#/'],
  ['02-trilha', '#/trilha'],
  ['03-modulo-09', '#/trilha/09'],
  ['04-licao-10-01', '#/licao/10-01'],
  ['05-licao-10-01-diagrama', '#/licao/10-01', async (p) => p.locator('figure.diagrama').scrollIntoViewIfNeeded()],
  ['06-questao-respondida', '#/licao/09-01/questoes', async (p) => {
    await p.locator('.alternativa input').nth(1).check();
    await p.getByRole('button', { name: 'Confirmar resposta' }).click();
    await p.locator('.questao legend').scrollIntoViewIfNeeded();
  }],
  ['07-revisao', '#/revisao'],
  ['08-calculadora', '#/ferramentas/disponibilidade', async (p) => {
    await p.getByRole('button', { name: '+ Adicionar parada' }).click();
    await p.getByLabel(/Descrição ou protocolo/).fill('Chamado 0001 (exemplo)');
    await p.getByLabel(/Duração/).fill('300');
    await p.getByLabel(/Valor do serviço/).fill('3.000');
    await p.locator('#t-resultado').scrollIntoViewIfNeeded();
  }],
  ['09-glossario', '#/glossario?t=zona-controlada'],
  ['10-busca', '#/busca?q=glosa'],
  ['11-caderno', '#/caderno'],
  ['12-plano', '#/plano'],
  ['13-ajustes', '#/ajustes'],
];

const navegador = await chromium.launch();
for (const [largura, altura, sufixo] of [[390, 844, '390'], [1440, 900, '1440']]) {
  const contexto = await navegador.newContext({ viewport: { width: largura, height: altura }, deviceScaleFactor: 2, serviceWorkers: 'block' });
  const p = await contexto.newPage();
  await p.goto(BASE);
  await p.evaluate((e) => localStorage.setItem('fc:v1:estado', JSON.stringify(e)), EXEMPLO);
  await p.reload();
  for (const [nome, rota, acao] of telas) {
    await p.goto(BASE + rota);
    await p.reload();
    await p.locator('main h1').first().waitFor();
    if (acao) await acao(p);
    await p.waitForTimeout(250);
    await p.screenshot({ path: `${saida}/${nome}-${sufixo}.png` });
  }
  // Temas escuro e sol (só a lição)
  for (const [nome, ajustes] of [['14-escuro', { tema: 'escuro', sol: false }], ['15-modo-sol', { tema: 'claro', sol: true }]]) {
    await p.evaluate((a) => {
      const e = JSON.parse(localStorage.getItem('fc:v1:estado'));
      e.ajustes = { ...e.ajustes, ...a };
      localStorage.setItem('fc:v1:estado', JSON.stringify(e));
    }, ajustes);
    await p.goto(BASE + '#/licao/10-01');
    await p.reload();
    await p.locator('main h1').first().waitFor();
    await p.locator('figure.diagrama').scrollIntoViewIfNeeded();
    await p.screenshot({ path: `${saida}/${nome}-${sufixo}.png` });
  }
  await contexto.close();
}
await navegador.close();
console.log(`Prints salvos em ${saida}/`);
