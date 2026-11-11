import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

test('Trilha em 4 etapas, com os módulos na ordem de estudo', async ({ page }) => {
  await page.goto('./#/trilha');
  const etapas = page.locator('section.etapa h2');
  await expect(etapas).toHaveText([
    /Etapa 1 · Base\s*comece aqui/,
    'Etapa 2 · Mão na massa',
    'Etapa 3 · O trabalho na distribuidora',
    'Etapa 4 · Aprofundar',
  ]);
  const modulosDa = (n: number) => page.locator('section.etapa').nth(n).locator('.titulo-item');
  await expect(modulosDa(0)).toHaveText([/^Módulo 1 · /, /^Módulo 10 · /, /^Módulo 2 · /, /^Módulo 3 · /]);
  await expect(modulosDa(1)).toHaveText([/^Módulo 5 · /, /^Módulo 6 · /, /^Módulo 4 · /]);
  await expect(modulosDa(2)).toHaveText([/^Módulo 9 · /, /^Módulo 7 · /, /^Módulo 8 · /]);
  await expect(modulosDa(3)).toHaveText([/^Módulo 11 · /, /^Módulo 12 · /]);
  // Os links continuam com o ID do módulo.
  await expect(page.locator('section.etapa').nth(0).locator('a').nth(1)).toHaveAttribute('href', '#/trilha/10');
  // Contagem de prontas: módulo pronto, módulo pela metade e módulo sem nenhuma.
  await expect(page.locator('li', { hasText: 'Módulo 1 · ' }).first()).toContainText('6 de 6 prontas');
  await expect(page.locator('li', { hasText: 'Módulo 4 · ' }).first()).toContainText('3 de 6 prontas');
  await expect(page.locator('li', { hasText: 'Módulo 11 · ' }).first()).toContainText('0 de 6 prontas · em construção');
  const l = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
  expect(l.doc).toBeLessThanOrEqual(l.tela);
});

test('módulo: as prontas primeiro e as que faltam num bloco "Em construção" no fim', async ({ page }) => {
  await page.goto('./#/trilha/04');
  await expect(page.locator('main .rotulo').first()).toHaveText('Etapa 2 · Mão na massa');
  await expect(page.locator('main')).toContainText('3 de 6 prontas');
  const prontas = page.locator('main ol.cartao .titulo-item');
  await expect(prontas).toHaveText([/^04-01 /, /^04-03 /, /^04-05 /]);
  const bloco = page.locator('section[aria-labelledby="t-em-construcao"]');
  await expect(bloco.getByRole('heading', { name: 'Em construção' })).toBeVisible();
  await expect(bloco.locator('.titulo-item')).toHaveText([/^04-02 /, /^04-04 /, /^04-06 /]);
  await expect(bloco.locator('a')).toHaveCount(0);
  // Módulo completo não mostra o bloco.
  await page.goto('./#/trilha/01');
  await expect(page.locator('section[aria-labelledby="t-em-construcao"]')).toHaveCount(0);
});

test('a nova ordem não perde o que já foi aprovado: a próxima lição pula as aprovadas', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() =>
    localStorage.setItem(
      'fc:v1:estado',
      JSON.stringify({
        progresso: {
          licoes: {
            '10-01': { melhor: 5, tentativas: 1, aprovadaEm: '2026-11-08' },
            '09-01': { melhor: 4, tentativas: 1, aprovadaEm: '2026-11-09' },
            '01-02': { melhor: 5, tentativas: 1, aprovadaEm: '2026-11-10' },
          },
          diasEstudo: [],
        },
      }),
    ),
  );
  await page.reload();
  await expect(page.locator('#t-proxima')).toHaveText(/01-01 · /);
  await page.goto('./#/trilha/10');
  await expect(page.locator('main')).toContainText('Aprovada 5/5');
  await page.goto('./#/trilha/09');
  await expect(page.locator('main')).toContainText('Aprovada 4/5');
  await page.goto('./#/plano');
  const semana2 = page.locator('ol.lista-limpa > li').nth(1);
  await expect(semana2).toContainText('Semana 2');
  await expect(semana2).toContainText('1 de 5 aprovadas');
});

for (const rota of ['#/trilha', '#/trilha/04', '#/trilha/11']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
