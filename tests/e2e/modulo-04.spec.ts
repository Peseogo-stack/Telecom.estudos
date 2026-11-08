import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

for (const id of ['04-01', '04-03', '04-05']) {
  test(`lição ${id}: diagrama com descrição e sem rolagem lateral em 390 px`, async ({ page }) => {
    await page.goto(`./#/licao/${id}`);
    const svg = page.locator('figure.diagrama svg[role="img"]').first();
    await expect(svg).toBeVisible();
    expect((await svg.locator('desc').textContent())?.length ?? 0).toBeGreaterThan(40);
    const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
    expect(l.doc).toBeLessThanOrEqual(l.tela);
  });
}

test('04-01: termo OLT no glossário abre definição', async ({ page }) => {
  await page.goto('./#/licao/04-01');
  await page.getByRole('link', { name: /OLT \(Terminal de Linha Óptico\)/i }).first().click();
  await expect(page).toHaveURL(/glossario\?t=olt/);
  await expect(page.getByText('subestação, POP ou central', { exact: false }).first()).toBeVisible();
});

test('04-03: tabela de splitters exibe valores máximos de ficha e link de conversor', async ({ page }) => {
  await page.goto('./#/licao/04-03');
  const tabela = page.locator('.prosa table');
  await expect(tabela).toContainText('10,5 dB');
  await expect(tabela).toContainText('13,7 dB');
  await expect(tabela).toContainText('21,0 dB');
  await page.getByRole('link', { name: /conversor e splitters/i }).first().click();
  await expect(page).toHaveURL(/ferramentas\/conversor/);
});

test('04-05: tabela GPON B+ exibe potências da norma e link para orçamento', async ({ page }) => {
  await page.goto('./#/licao/04-05');
  const tabela = page.locator('.prosa table');
  await expect(tabela).toContainText('+1,5 dBm a +5,0 dBm');
  await expect(tabela).toContainText('−27,0 dBm');
  await expect(tabela).toContainText('−8,0 dBm');
  await expect(tabela).toContainText('13,0 dB a 28,0 dB');
  await page.locator('a[href*="ferramentas/orcamento"]').click();
  await expect(page).toHaveURL(/ferramentas\/orcamento/);
});

for (const rota of [
  '#/licao/04-01',
  '#/licao/04-03',
  '#/licao/04-05',
  '#/licao/04-01/questoes',
  '#/licao/04-03/questoes',
  '#/licao/04-05/questoes',
  '#/glossario?t=olt',
]) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
