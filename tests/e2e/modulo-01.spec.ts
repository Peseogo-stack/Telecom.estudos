import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

for (const id of ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06']) {
  test(`lição ${id}: diagrama com descrição e sem rolagem lateral`, async ({ page }) => {
    await page.goto(`./#/licao/${id}`);
    const svg = page.locator('figure.diagrama svg[role="img"]').first();
    await expect(svg).toBeVisible();
    expect((await svg.locator('desc').textContent())?.length ?? 0).toBeGreaterThan(40);
    const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
    expect(l.doc).toBeLessThanOrEqual(l.tela);
  });
}

test('comece por aqui: a 01-01 aparece em Hoje e no Plano como opcional, fora das semanas', async ({ page }) => {
  await page.goto('./#/');
  const cartao = page.locator('section[aria-labelledby="t-comece"]');
  await expect(cartao).toContainText('opcional');
  await expect(cartao.getByRole('link', { name: 'Abrir a lição' })).toHaveAttribute('href', '#/licao/01-01');
  // A próxima lição continua sendo a do plano (semana 1), não a opcional.
  await expect(page.locator('#t-proxima')).not.toContainText('01-01');

  await page.goto('./#/plano');
  await expect(page.locator('section[aria-labelledby="t-comece"]')).toContainText('01-01');
  const semana5 = page.locator('ol.lista-limpa > li').nth(4);
  await expect(semana5).toContainText('Semana 5');
  await expect(semana5).not.toContainText('01-01');
});

for (const rota of ['#/licao/01-01', '#/licao/01-03', '#/licao/01-04', '#/licao/01-05', '#/plano']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}

test('01-04: a prioridade padrão do GOOSE vem da IEC 61850-8-1, com fonte', async ({ page }) => {
  await page.goto('./#/licao/01-04');
  await expect(page.locator('main')).toContainText('IEC 61850-8-1 indica prioridade 4');
  await expect(page.locator('main')).toContainText('What It Can and Cannot Offer');
});
