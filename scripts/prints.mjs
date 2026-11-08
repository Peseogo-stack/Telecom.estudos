// Tira prints das telas em 390 px (celular) e 1440 px (PC) para revisão visual.
// Uso: npm run build && npx vite preview --port 4173 & node scripts/prints.mjs docs/prints/fase-2 [fase-2|modulo-02]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const saida = process.argv[2] ?? 'docs/prints';
const conjunto = process.argv[3] ?? 'fase-2';
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

const diagrama = async (p) => p.locator('figure.diagrama').first().scrollIntoViewIfNeeded();
const resultado = async (p) => p.locator('section[aria-labelledby="t-res"]').scrollIntoViewIfNeeded();

const TELAS_MODULO_02 = [
  ['01-trilha-modulo-02', '#/trilha/02'],
  ['02-licao-02-01', '#/licao/02-01'],
  ['03-licao-02-04-g657', '#/licao/02-04', async (p) => p.getByRole('heading', { name: /G\.657: a fibra que aceita curva/ }).scrollIntoViewIfNeeded()],
  ['04-licao-02-05-bandas', '#/licao/02-05', diagrama],
  ['05-licao-02-06-perdas', '#/licao/02-06', diagrama],
  ['06-licao-02-07-escada', '#/licao/02-07', diagrama],
  ['07-questao-02-07', '#/licao/02-07/questoes', async (p) => {
    await p.locator('.alternativa input').nth(1).check();
    await p.getByRole('button', { name: 'Confirmar resposta' }).click();
    await p.locator('.questao legend').scrollIntoViewIfNeeded();
  }],
  ['08-ferramentas', '#/ferramentas'],
  ['09-orcamento-topo', '#/ferramentas/orcamento'],
  ['10-orcamento-resultado', '#/ferramentas/orcamento', resultado],
  ['11-orcamento-escada', '#/ferramentas/orcamento', async (p) => p.locator('section[aria-labelledby="t-res"] figure.diagrama').scrollIntoViewIfNeeded()],
  ['12-orcamento-saturacao', '#/ferramentas/orcamento', async (p) => {
    await p.getByLabel(/^Distância/).fill('1');
    await p.getByRole('button', { name: 'Remover splitter 1' }).click();
    await resultado(p);
  }],
  ['13-conversor-splitters', '#/ferramentas/conversor', async (p) => p.locator('section[aria-labelledby="t-bal"]').scrollIntoViewIfNeeded()],
  ['14-cores-numero', '#/ferramentas/cores', async (p) => {
    await p.getByLabel('Número da fibra').fill('30');
    await p.locator('section[aria-labelledby="t-num"]').scrollIntoViewIfNeeded();
  }],
  ['15-cores-treino', '#/ferramentas/cores', async (p) => p.locator('section[aria-labelledby="t-treino"]').scrollIntoViewIfNeeded()],
];

const TELAS_FASE_2 = [
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

const TELAS_MODULO_06 = [
  ['01-trilha-modulo-06', '#/trilha/06'],
  ['02-licao-06-01-diagrama', '#/licao/06-01', diagrama],
  ['03-licao-06-02-diagrama', '#/licao/06-02', diagrama],
  ['04-licao-06-03-diagrama', '#/licao/06-03', diagrama],
  ['05-leitor-otdr-facil', '#/ferramentas/otdr'],
  ['06-leitor-otdr-fantasma', '#/ferramentas/otdr', async (p) => {
    await p.getByLabel('Nível').selectOption('dificil');
    await p.getByRole('button', { name: 'Traço seguinte' }).click();
    await p.getByRole('button', { name: 'Traço seguinte' }).click();
    await p.locator('figure.diagrama').first().scrollIntoViewIfNeeded();
  }],
];

const TELAS_MODULO_03 = [
  ['01-trilha-modulo-03', '#/trilha/03'],
  ['02-licao-03-01-diagrama', '#/licao/03-01', diagrama],
  ['03-licao-03-03-diagrama', '#/licao/03-03', diagrama],
  ['04-licao-03-04-diagrama', '#/licao/03-04', diagrama],
  ['05-licao-03-07-diagrama', '#/licao/03-07', diagrama],
];

const TELAS_MODULO_04 = [
  ['01-trilha-modulo-04', '#/trilha/04'],
  ['02-licao-04-01-diagrama', '#/licao/04-01', diagrama],
  ['03-licao-04-03-diagrama', '#/licao/04-03', diagrama],
  ['04-licao-04-05-diagrama', '#/licao/04-05', diagrama],
];

const TELAS_MODULO_05 = [
  ['01-trilha-modulo-05', '#/trilha/05'],
  ['02-licao-05-01-diagrama', '#/licao/05-01', diagrama],
  ['03-licao-05-03-diagrama', '#/licao/05-03', diagrama],
  ['04-licao-05-04-diagrama', '#/licao/05-04', diagrama],
];

const TELAS_CHECKLISTS_P1 = [
  ['01-campo-lista', '#/campo'],
  ['02-antes-subir-poste', '#/campo/antes-de-subir-no-poste'],
  ['03-antes-fusao', '#/campo/antes-da-fusao'],
  ['04-inspecao-ceo-cto', '#/campo/inspecao-ceo-cto'],
  ['05-aceite-obra', '#/campo/aceite-de-obra'],
];

const TELAS_MODULO_10 = [
  ['01-trilha-modulo-10', '#/trilha/10'],
  ['02-licao-10-03-diagrama', '#/licao/10-03', diagrama],
  ['03-licao-10-04-diagrama', '#/licao/10-04', diagrama],
];

const telas =
  conjunto === 'checklists-p1'
    ? TELAS_CHECKLISTS_P1
    : conjunto === 'modulo-04'
    ? TELAS_MODULO_04
    : conjunto === 'modulo-05'
      ? TELAS_MODULO_05
      : conjunto === 'modulo-10'
        ? TELAS_MODULO_10
        : conjunto === 'modulo-03'
          ? TELAS_MODULO_03
          : conjunto === 'modulo-06'
            ? TELAS_MODULO_06
            : conjunto === 'modulo-02'
              ? TELAS_MODULO_02
              : TELAS_FASE_2;
const temas =
  conjunto === 'checklists-p1'
    ? [
        ['06-escuro', '#/campo/antes-de-subir-no-poste', { tema: 'escuro', sol: false }],
        ['07-modo-sol', '#/campo/antes-da-fusao', { tema: 'claro', sol: true }],
      ]
    : conjunto === 'modulo-04'
    ? [
        ['05-escuro', '#/licao/04-03', { tema: 'escuro', sol: false }],
        ['06-modo-sol', '#/licao/04-05', { tema: 'claro', sol: true }],
      ]
    : conjunto === 'modulo-05'
      ? [
          ['05-escuro', '#/licao/05-03', { tema: 'escuro', sol: false }],
          ['06-modo-sol', '#/licao/05-04', { tema: 'claro', sol: true }],
        ]
    : conjunto === 'modulo-10'
      ? [
          ['04-escuro', '#/licao/10-03', { tema: 'escuro', sol: false }],
          ['05-modo-sol', '#/licao/10-04', { tema: 'claro', sol: true }],
        ]
      : conjunto === 'modulo-03'
        ? [
            ['06-escuro', '#/licao/03-04', { tema: 'escuro', sol: false }],
            ['07-modo-sol', '#/licao/03-07', { tema: 'claro', sol: true }],
          ]
        : conjunto === 'modulo-06'
          ? [['07-escuro', '#/licao/06-03', { tema: 'escuro', sol: false }], ['08-modo-sol', '#/ferramentas/otdr', { tema: 'claro', sol: true }]]
          : conjunto === 'modulo-02'
            ? [['16-escuro', '#/licao/02-06', { tema: 'escuro', sol: false }], ['17-modo-sol', '#/ferramentas/orcamento', { tema: 'claro', sol: true }]]
            : [['14-escuro', '#/licao/10-01', { tema: 'escuro', sol: false }], ['15-modo-sol', '#/licao/10-01', { tema: 'claro', sol: true }]];

const navegador = await chromium.launch();
for (const [largura, altura, sufixo] of [[390, 844, '390'], [1440, 900, '1440']]) {
  const contexto = await navegador.newContext({
    viewport: { width: largura, height: altura },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
    locale: 'pt-BR',
    timezoneId: 'America/Boa_Vista',
  });
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
  // Temas escuro e sol
  for (const [nome, rota, ajustes] of temas) {
    await p.evaluate((a) => {
      const e = JSON.parse(localStorage.getItem('fc:v1:estado'));
      e.ajustes = { ...e.ajustes, ...a };
      localStorage.setItem('fc:v1:estado', JSON.stringify(e));
    }, ajustes);
    await p.goto(BASE + rota);
    await p.reload();
    if (await p.locator('figure.diagrama').count() > 0) {
      await p.locator('figure.diagrama').first().scrollIntoViewIfNeeded();
    }
    await p.screenshot({ path: `${saida}/${nome}-${sufixo}.png` });
  }
  await contexto.close();
}
await navegador.close();
console.log(`Prints salvos em ${saida}/`);
