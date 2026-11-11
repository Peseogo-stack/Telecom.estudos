import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

for (const id of ['03-01', '03-02', '03-03', '03-04', '03-07']) {
  test(`lição ${id}: diagrama com descrição e sem rolagem lateral`, async ({ page }) => {
    await page.goto(`./#/licao/${id}`);
    const svg = page.locator('figure.diagrama svg[role="img"]').first();
    await expect(svg).toBeVisible();
    expect((await svg.locator('desc').textContent())?.length ?? 0).toBeGreaterThan(40);
    const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
    expect(l.doc).toBeLessThanOrEqual(l.tela);
  });
}

test('03-02: tabela das partes do cabo e aramida no glossário', async ({ page }) => {
  await page.goto('./#/licao/03-02');
  const tabela = page.locator('.prosa table').first();
  await expect(tabela).toContainText('Elemento de tração');
  await expect(tabela).toContainText('Prevenir os esforços de contração do cabo');
  await page.getByRole('link', { name: 'Aramida', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=aramida/);
});

test('03-03: tabela das cores com a fibra 1 verde (Brasil) e azul (TIA)', async ({ page }) => {
  await page.goto('./#/licao/03-03');
  const linha1 = page.locator('.prosa table tbody tr').first();
  await expect(linha1).toContainText('Verde');
  await expect(linha1).toContainText('Azul');
});

test('03-04: o link da lição abre a ferramenta Código de cores', async ({ page }) => {
  await page.goto('./#/licao/03-04');
  await page.getByRole('link', { name: 'Código de cores' }).first().click();
  await expect(page).toHaveURL(/#\/ferramentas\/cores$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Código de cores');
});

test('03-07: termo do glossário abre a definição de APC', async ({ page }) => {
  await page.goto('./#/licao/03-07');
  await page.getByRole('link', { name: 'APC', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=apc/);
  await expect(page.getByText('ângulo de 8°', { exact: false }).first()).toBeVisible();
});

for (const rota of ['#/licao/03-02', '#/licao/03-02/questoes', '#/licao/03-01', '#/licao/03-03', '#/licao/03-04', '#/licao/03-07', '#/licao/03-04/questoes', '#/glossario?t=tubo-piloto']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
