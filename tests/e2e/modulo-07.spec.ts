import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

for (const id of ['07-01', '07-02', '07-03']) {
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

test('07-02: diagrama traz a etiqueta de exemplo e as cotas da Cemig', async ({ page }) => {
  await page.goto('./#/licao/07-02');
  const svg = page.locator('figure.diagrama svg');
  await expect(svg).toContainText('Exemplo: Cemig ND-6.6. Vale a norma da sua distribuidora.');
  await expect(svg).toContainText('600 mm no mínimo');
  await expect(svg).toContainText('Faixa de ocupação: 500 mm');
  await expect(svg).toContainText('topo a 5,70 m do solo');
  await expect(svg).toContainText('de 200 a 1.800 mm abaixo da faixa');
});

test('07-02: os números aparecem como exemplo e os 600 mm não viram distância de trabalho', async ({ page }) => {
  await page.goto('./#/licao/07-02');
  const licao = page.locator('main');
  await expect(licao).toContainText('Dois exemplos: não é a regra da sua empresa');
  await expect(licao).toContainText('Os 600 mm são regra de instalação do cabo de telecom.');
  await expect(licao).toContainText('Não são distância de trabalho');
  await expect(licao).toContainText('Não suba para conferir.');
});

test('07-02: termo rede secundária abre a definição no glossário', async ({ page }) => {
  await page.goto('./#/licao/07-02');
  await page.getByRole('link', { name: 'rede secundária', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=rede-secundaria/);
  await expect(page.getByText('Rede de baixa tensão do poste', { exact: false }).first()).toBeVisible();
});

test('07-03: diagrama traz a etiqueta de exemplo, a cota e o modelo novo da Cemig', async ({ page }) => {
  await page.goto('./#/licao/07-03');
  const svg = page.locator('figure.diagrama svg');
  await expect(svg).toContainText('Exemplo. Vale a norma da sua distribuidora.');
  await expect(svg).toContainText('de 200 a 400 mm do poste');
  await expect(svg).toContainText('NOME DO OCUPANTE');
  await expect(svg).toContainText('CNPJ + QR Code');
  await expect(svg).toContainText('fundo amarelo (exemplos)');
});

test('07-03: obrigação x modelo, ilegível do solo e cabo sem plaqueta não é clandestino por si só', async ({ page }) => {
  await page.goto('./#/licao/07-03');
  const licao = page.locator('main');
  await expect(licao).toContainText('Dois exemplos: não é a regra da sua empresa');
  await expect(licao).toContainText('A obrigação vem das resoluções e vale para todo ocupante.');
  await expect(licao).toContainText('ilegível do solo');
  await expect(licao).toContainText('Não suba para ler');
  await expect(licao).toContainText('não corta nem retira');
});

test('07-03: termo plaqueta abre a definição no glossário', async ({ page }) => {
  await page.goto('./#/licao/07-03');
  await page.getByRole('link', { name: 'plaqueta', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=plaqueta/);
  await expect(page.getByText('diz de quem é o cabo', { exact: false }).first()).toBeVisible();
});

for (const rota of ['#/licao/07-01', '#/licao/07-01/questoes', '#/glossario?t=posteiro', '#/licao/07-02', '#/licao/07-02/questoes', '#/licao/07-03', '#/licao/07-03/questoes']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
