import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

for (const id of ['05-01', '05-03', '05-04']) {
  test(`lição ${id}: diagrama com descrição e sem rolagem lateral em 390 px`, async ({ page }) => {
    await page.goto(`./#/licao/${id}`);
    const svg = page.locator('figure.diagrama svg[role="img"]').first();
    await expect(svg).toBeVisible();
    expect((await svg.locator('desc').textContent())?.length ?? 0).toBeGreaterThan(40);
    const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
    expect(l.doc).toBeLessThanOrEqual(l.tela);
  });
}

test('05-01: termo tubete no glossário abre definição', async ({ page }) => {
  await page.goto('./#/licao/05-01');
  await page.getByRole('link', { name: /tubete termocontrátil/i }).first().click();
  await expect(page).toHaveURL(/glossario\?t=tubete/);
  await expect(page.getByText('Protetor termocontrátil', { exact: false }).first()).toBeVisible();
});

test('05-03: tabela de defeitos mostra até duas repetições do arco e refazer para bolha', async ({ page }) => {
  await page.goto('./#/licao/05-03');
  const tabela = page.locator('.prosa table');
  await expect(tabela).toContainText('no máximo duas vezes');
  await expect(tabela).toContainText('Refazer');
});

test('05-04: exibe a conta da média bidirecional (0,08 dB) e régua de limites', async ({ page }) => {
  await page.goto('./#/licao/05-04');
  // O resultado do exemplo fica no texto da lição (o diagrama também o mostra)
  await expect(page.locator('.prosa strong', { hasText: '0,08 dB' }).first()).toBeVisible();
  const tabela = page.locator('.prosa table');
  await expect(tabela).toContainText('0,10 a 0,30 dB');
  await expect(tabela).toContainText('0,15 dB');
  await expect(tabela).toContainText('0,3 dB');
});

for (const rota of [
  '#/licao/05-01',
  '#/licao/05-03',
  '#/licao/05-04',
  '#/licao/05-01/questoes',
  '#/licao/05-03/questoes',
  '#/licao/05-04/questoes',
  '#/glossario?t=arc-check',
]) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
