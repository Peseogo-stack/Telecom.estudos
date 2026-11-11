import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

for (const id of ['07-01']) {
  test(`lição ${id}: diagrama com descrição e sem rolagem lateral em 390 px`, async ({ page }) => {
    await page.goto(`./#/licao/${id}`);
    const svg = page.locator('figure.diagrama svg[role="img"]').first();
    await expect(svg).toBeVisible();
    expect((await svg.locator('desc').textContent())?.length ?? 0).toBeGreaterThan(40);
    const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
    expect(l.doc).toBeLessThanOrEqual(l.tela);
  });
}

test('07-01: diagrama mostra a pilha do que vale em 10/11/2026 e a caixa de proposta', async ({ page }) => {
  await page.goto('./#/licao/07-01');
  const svg = page.locator('figure.diagrama svg');
  await expect(svg).toContainText('O que vale em 10/11/2026');
  await expect(svg).toContainText('REN ANEEL 1.044/2022');
  await expect(svg).toContainText('Ainda proposta');
  await expect(svg).toContainText('PL 3.220/2019');
});

test('07-01: a proposta vem com data e não é apresentada como regra vigente', async ({ page }) => {
  await page.goto('./#/licao/07-01');
  const licao = page.locator('main');
  await expect(licao).toContainText('O que ainda é proposta, em 10/11/2026');
  await expect(licao).toContainText('não é lei');
});

test('07-01: termo detentor abre a definição no glossário', async ({ page }) => {
  await page.goto('./#/licao/07-01');
  await page.getByRole('link', { name: 'detentor', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=detentor/);
  await expect(page.getByText('detém, administra ou controla', { exact: false }).first()).toBeVisible();
});

for (const rota of ['#/licao/07-01', '#/licao/07-01/questoes', '#/glossario?t=posteiro']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
