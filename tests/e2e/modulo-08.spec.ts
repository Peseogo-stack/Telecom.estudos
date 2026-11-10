import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

for (const id of ['08-03']) {
  test(`lição ${id}: diagrama com descrição e sem rolagem lateral em 390 px`, async ({ page }) => {
    await page.goto(`./#/licao/${id}`);
    const svg = page.locator('figure.diagrama svg[role="img"]').first();
    await expect(svg).toBeVisible();
    expect((await svg.locator('desc').textContent())?.length ?? 0).toBeGreaterThan(40);
    const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
    expect(l.doc).toBeLessThanOrEqual(l.tela);
  });
}

test('08-03: tabela mostra os dois valores de N e o link do CSV de exercício', async ({ page }) => {
  await page.goto('./#/licao/08-03');
  const tabela = page.locator('.prosa table');
  await expect(tabela).toContainText('10.375.911 m');
  await expect(tabela).toContainText('375.911 m');
  await expect(page.getByRole('link', { name: 'vistoria-utm-sem-src.csv' })).toHaveAttribute('href', /dados-qgis\/vistoria-utm-sem-src\.csv$/);
});

test('08-03: termo SRC abre a definição no glossário', async ({ page }) => {
  await page.goto('./#/licao/08-03');
  await page.getByRole('link', { name: 'SRC', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=src/);
  await expect(page.getByText('como os números de uma coordenada', { exact: false }).first()).toBeVisible();
});

for (const rota of ['#/licao/08-03', '#/licao/08-03/questoes', '#/glossario?t=falso-norte']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}

test('08-03: os arquivos de exercício baixam de verdade (GeoPackage e CSV)', async ({ page }) => {
  await page.goto('./#/licao/08-03');
  const link = page.getByRole('link', { name: 'rede-ficticia.gpkg' });
  await expect(link).toHaveAttribute('download', '');
  const inicio = await page.evaluate(async () => {
    const r = await fetch('dados-qgis/rede-ficticia.gpkg');
    return new TextDecoder().decode((await r.arrayBuffer()).slice(0, 15));
  });
  expect(inicio).toBe('SQLite format 3');
  const csv = await page.evaluate(async () => (await (await fetch('dados-qgis/vistoria-utm-sem-src.csv')).text()).split('\n')[0].trim());
  expect(csv).toBe('cod_poste;x;y;data;obs');
});
