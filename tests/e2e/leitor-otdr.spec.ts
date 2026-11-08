import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { NOME_TIPO, gerarCenario, letra } from '../../src/ferramentas/otdr/traco';

test.use({ viewport: { width: 390, height: 844 } });

async function semRolagemLateral(page: import('@playwright/test').Page) {
  const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
  expect(l.doc).toBeLessThanOrEqual(l.tela);
}

test('leitor de OTDR: acertar todos os eventos do traço 1 (fácil) e ir ao próximo', async ({ page }) => {
  await page.goto('./#/ferramentas/otdr');
  const c = gerarCenario('facil', 1);
  await expect(page.getByRole('heading', { name: /^Traço 1:/ })).toBeVisible();
  for (const [i, e] of c.eventos.entries()) {
    await page.getByLabel(new RegExp(`^Evento ${letra(i)} `)).selectOption(e.tipo);
  }
  await page.getByRole('button', { name: 'Conferir' }).click();
  await expect(page.getByText(`${c.eventos.length} de ${c.eventos.length}`, { exact: true })).toBeVisible();
  await expect(page.getByText('Leitura completa!', { exact: false })).toBeVisible();
  await semRolagemLateral(page);
  await page.getByRole('button', { name: 'Próximo traço' }).click();
  await expect(page.getByRole('heading', { name: /^Traço 2:/ })).toBeVisible();
});

test('leitor de OTDR: resposta errada mostra o tipo certo e a explicação', async ({ page }) => {
  await page.goto('./#/ferramentas/otdr');
  const c = gerarCenario('facil', 1);
  for (const [i, e] of c.eventos.entries()) {
    // Marca tudo errado de propósito
    const errado = e.tipo === 'fusao' ? 'conector' : 'fusao';
    await page.getByLabel(new RegExp(`^Evento ${letra(i)} `)).selectOption(errado);
  }
  await page.getByRole('button', { name: 'Conferir' }).click();
  await expect(page.getByText(`0 de ${c.eventos.length}`, { exact: true })).toBeVisible();
  await expect(page.getByText(`✗ A: ${NOME_TIPO[c.eventos[0].tipo]}`)).toBeVisible();
});

test('leitor de OTDR: o difícil tem ganho aparente e fantasma nas opções e mostra as duas λ', async ({ page }) => {
  await page.goto('./#/ferramentas/otdr');
  await page.getByLabel('Nível').selectOption('dificil');
  const opcoes = await page.getByLabel(/^Evento A /).locator('option').allTextContents();
  expect(opcoes).toContain('Ganho aparente');
  expect(opcoes).toContain('Fantasma (eco)');
  await expect(page.getByText(/1310 nm \(linha cheia\) e 1550 nm \(tracejada\)/)).toBeVisible();
  // A tabela de eventos abre e mostra as duas λ
  await page.getByText('Tabela de eventos (como o OTDR mostra)').click();
  await expect(page.getByRole('columnheader', { name: 'Perda 1550 (dB)' })).toBeVisible();
});

for (const rota of ['#/ferramentas/otdr', '#/licao/06-01', '#/licao/06-03', '#/licao/06-02/questoes']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
