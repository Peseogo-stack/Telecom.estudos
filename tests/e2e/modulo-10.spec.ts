import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

for (const id of ['10-02', '10-03', '10-04']) {
  test(`lição ${id}: aviso de segurança, diagrama com descrição e sem rolagem lateral`, async ({ page }) => {
    await page.goto(`./#/licao/${id}`);
    await expect(page.getByText('Não substitui treinamento, APR, permissão de trabalho nem o procedimento da empresa', { exact: false })).toBeVisible();
    const svg = page.locator('figure.diagrama svg[role="img"]').first();
    await expect(svg).toBeVisible();
    expect((await svg.locator('desc').textContent())?.length ?? 0).toBeGreaterThan(40);
    const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
    expect(l.doc).toBeLessThanOrEqual(l.tela);
  });
}

test('10-03: termo do glossário abre a definição de VFL', async ({ page }) => {
  await page.goto('./#/licao/10-03');
  await page.getByRole('link', { name: 'VFL', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=vfl/);
  await expect(page.getByText('Classe 2', { exact: false }).first()).toBeVisible();
});

test('10-02: NR-35 com os itens da norma, a PT da nova NR-10 e o termo SPIQ no glossário', async ({ page }) => {
  await page.goto('./#/licao/10-02');
  const prosa = page.locator('main');
  await expect(prosa).toContainText('acima de 2,0m (dois metros)');
  await expect(prosa).toContainText('restrita ao turno ou à jornada');
  await expect(prosa).toContainText('(10.7.2.2)');
  await page.getByRole('link', { name: 'SPIQ', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=spiq/);
  await expect(page.getByText('retenção de queda', { exact: false }).first()).toBeVisible();
});

test('10-04: tabela da FDS do isopropanol mostra 11,85 °C e H225', async ({ page }) => {
  await page.goto('./#/licao/10-04');
  const tabela = page.locator('.prosa table');
  await expect(tabela).toContainText('11,85 °C');
  await expect(tabela).toContainText('H225');
});

for (const rota of ['#/licao/10-02', '#/licao/10-02/questoes', '#/licao/10-03', '#/licao/10-04', '#/licao/10-03/questoes', '#/licao/10-04/questoes', '#/glossario?t=ponto-de-fulgor']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
