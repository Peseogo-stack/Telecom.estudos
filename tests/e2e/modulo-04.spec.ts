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
  await page.getByRole('link', { name: 'OLT', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=olt/);
  await expect(page.getByText('Equipamento ativo da central', { exact: false }).first()).toBeVisible();
});

test('04-03: tabela de splitters exibe valores máximos de ficha e link de conversor', async ({ page }) => {
  await page.goto('./#/licao/04-03');
  // 1ª tabela: perda ideal; 2ª: máximos das fichas Intelbras, SENKO e FS (sem conectores)
  await expect(page.locator('.prosa table').first()).toContainText('9,03 dB');
  const fichas = page.locator('.prosa table').nth(1);
  await expect(fichas).toContainText('10,5 dB');
  await expect(fichas).toContainText('10,9 dB');
  await expect(fichas).toContainText('17,3 dB');
  await expect(fichas).toContainText('21,0 dB');
  await page.getByRole('link', { name: /conversor e splitters/i }).first().click();
  await expect(page).toHaveURL(/ferramentas\/conversor/);
});

test('04-05: tabela GPON B+ exibe potências da norma e link para orçamento', async ({ page }) => {
  await page.goto('./#/licao/04-05');
  const limites = page.locator('.prosa table').first();
  await expect(limites).toContainText('+1,5 a +5 dBm');
  await expect(limites).toContainText('−27 dBm');
  await expect(limites).toContainText('−8 dBm');
  await expect(limites).toContainText('13 a 28 dB');
  // O exemplo é o mesmo que abre a ferramenta: 24,9 dB de perdas
  await expect(page.locator('.prosa table').nth(1)).toContainText('24,9 dB');
  await page.locator('a[href*="ferramentas/orcamento"]').first().click();
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
