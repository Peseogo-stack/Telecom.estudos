import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

async function semRolagemLateral(page: import('@playwright/test').Page) {
  const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
  expect(l.doc).toBeLessThanOrEqual(l.tela);
}

test('orçamento de potência: exemplo GPON B+ passa; com dois 1:8 não passa', async ({ page }) => {
  await page.goto('./#/ferramentas/orcamento');
  const res = page.locator('section[aria-labelledby="t-res"]');
  // Exemplo: 5 km × 0,40 + 4 × 0,75 + 6 × 0,3 + 7,4 + 10,7 = 24,9 dB; orçamento 28,5; margem 3 → folga 0,6
  await expect(res.getByText('PASSA', { exact: true })).toBeVisible();
  await expect(res.getByRole('row', { name: /Perda total/ })).toContainText('24,9 dB');
  // Troca o 1:4 por um 1:8
  await page.getByRole('button', { name: 'Remover splitter 1' }).click();
  await page.getByLabel('Tipo de splitter').selectOption('b8');
  await page.getByRole('button', { name: '+ Adicionar' }).click();
  await expect(res.getByText('NÃO PASSA', { exact: true })).toBeVisible();
  await semRolagemLateral(page);
});

test('orçamento: o máximo da G.652.D muda com o comprimento de onda', async ({ page }) => {
  await page.goto('./#/ferramentas/orcamento');
  await page.getByLabel('Comprimento de onda').selectOption('1550');
  await expect(page.getByText(/Máximo da G\.652\.D em 1550 nm: 0,3 dB\/km/)).toBeVisible();
  await page.getByRole('button', { name: 'Usar o máximo da norma' }).click();
  await expect(page.getByLabel(/Atenuação da fibra/)).toHaveValue('0,3');
});

test('código de cores: fibra 30 de um cabo de 48 (12 por tubo) e o caminho de volta', async ({ page }) => {
  await page.goto('./#/ferramentas/cores');
  await page.getByLabel('Número da fibra').fill('30');
  const sec = page.locator('section[aria-labelledby="t-num"]');
  await expect(sec.getByText('Tubo 3 · fibra 6')).toBeVisible();
  await expect(sec.getByText('Violeta')).toBeVisible();
  const volta = page.locator('section[aria-labelledby="t-cor"]');
  await volta.getByRole('combobox', { name: /^Tubo/ }).selectOption('2');
  await volta.getByRole('combobox', { name: /^Cor da fibra/ }).selectOption('4');
  await expect(page.getByText('Fibra 16 do cabo')).toBeVisible();
  await semRolagemLateral(page);
});

test('código de cores: modo treino confere a resposta', async ({ page }) => {
  await page.goto('./#/ferramentas/cores');
  const treino = page.locator('section[aria-labelledby="t-treino"]');
  const enunciado = await treino.locator('.resultado-grande').textContent();
  const n = Number(enunciado?.match(/fibra (\d+)/)?.[1]);
  const tubo = Math.ceil(n / 12);
  const pos = n - (tubo - 1) * 12;
  await treino.getByRole('combobox', { name: /^Tubo/ }).selectOption(String(tubo));
  await treino.getByRole('combobox', { name: /^Cor da fibra/ }).selectOption(String(pos));
  await treino.getByRole('button', { name: 'Conferir' }).click();
  await expect(treino.getByText(/^Certo!/)).toBeVisible();
});

test('conversor: −3 dBm ≈ 0,501 mW e splitters com fonte', async ({ page }) => {
  await page.goto('./#/ferramentas/conversor');
  await page.getByLabel('Potência (dBm)').fill('-3');
  await expect(page.getByText(/−?-?3 dBm = 0,501 mW/)).toBeVisible();
  await expect(page.locator('section[aria-labelledby="t-bal"] tbody tr')).toHaveCount(6);
});

for (const rota of ['#/ferramentas/orcamento', '#/ferramentas/cores', '#/ferramentas/conversor', '#/licao/02-05', '#/licao/02-07/questoes']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
