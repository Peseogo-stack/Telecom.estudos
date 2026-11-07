import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function semRolagemLateral(page: Page) {
  const larguras = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, tela: window.innerWidth }));
  expect(larguras.doc).toBeLessThanOrEqual(larguras.tela);
}

test.describe('fluxos principais', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('Hoje mostra a próxima lição do plano (semana 1 começa por segurança)', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('heading', { name: 'Hoje', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /10-01 · Onde termina a zona livre/ })).toBeVisible();
    await expect(page.getByText('Nada para revisar hoje')).toBeVisible();
    await semRolagemLateral(page);
  });

  test('lição → 5 questões → resultado → erros vão para a revisão', async ({ page }) => {
    await page.goto('./#/licao/09-01');
    await expect(page.getByRole('heading', { name: 'Quanto é 99,7%?' })).toBeVisible();
    await expect(page.locator('figure.diagrama svg')).toBeVisible();
    await semRolagemLateral(page);
    await page.getByRole('link', { name: /Fazer as 5 questões/ }).click();
    let erros = 0;
    for (let i = 0; i < 5; i++) {
      // Escolhe sempre a primeira alternativa (a ordem é sorteada).
      await page.locator('.alternativa input').first().check();
      await page.getByRole('button', { name: 'Confirmar resposta' }).click();
      if (await page.getByText(/Não foi dessa vez/).isVisible()) erros++;
      await expect(page.locator('.explicacao')).toHaveCount(4);
      await page.getByRole('button', { name: i < 4 ? 'Próxima questão' : 'Ver resultado' }).click();
    }
    await expect(page.getByText(`${5 - erros} de 5`)).toBeVisible();
    await page.goto('./#/');
    if (erros > 0) {
      // Revisões vencem amanhã: hoje continua sem revisão, mas a próxima data aparece.
      await expect(page.getByText(/Próxima revisão em/)).toBeVisible();
    }
    // O progresso fica salvo no aparelho.
    const salvo = await page.evaluate(() => JSON.parse(localStorage.getItem('fc:v1:estado') ?? '{}'));
    expect(salvo.progresso.licoes['09-01'].tentativas).toBe(1);
    expect(Object.keys(salvo.revisao.itens)).toHaveLength(erros);
  });

  test('revisão: questão vencida aparece em Hoje e pode ser respondida', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => {
      const ontem = new Date(Date.now() - 86_400_000);
      const d = `${ontem.getFullYear()}-${String(ontem.getMonth() + 1).padStart(2, '0')}-${String(ontem.getDate()).padStart(2, '0')}`;
      localStorage.setItem('fc:v1:estado', JSON.stringify({ revisao: { itens: { '09-02-q1': { etapa: 0, vence: d, erros: 1 } }, dominadas: [] } }));
    });
    await page.reload();
    await expect(page.getByRole('heading', { name: '1 questão(ões) para revisar' })).toBeVisible();
    await page.getByRole('link', { name: /Revisar agora/ }).click();
    await expect(page.getByText(/4.320 por mês/)).toBeVisible();
    await page.getByLabel(/R\$ 10,00/).check();
    await page.getByRole('button', { name: 'Confirmar resposta' }).click();
    await expect(page.getByText('Você acertou!')).toBeVisible();
    await page.getByRole('button', { name: 'Terminar' }).click();
    await expect(page.getByText(/1 de 1/)).toBeVisible();
    const salvo = await page.evaluate(() => JSON.parse(localStorage.getItem('fc:v1:estado') ?? '{}'));
    expect(salvo.revisao.itens['09-02-q1'].etapa).toBe(1);
  });

  test('calculadora de disponibilidade e glosa: exemplo da lição 09-02', async ({ page }) => {
    await page.goto('./#/ferramentas/disponibilidade');
    await page.getByRole('button', { name: '+ Adicionar parada' }).click();
    await page.getByLabel(/Duração/).fill('300');
    await page.getByLabel(/Valor do serviço/).fill('3.000');
    const resultado = page.locator('section[aria-labelledby="t-resultado"]');
    await expect(resultado.getByText('NÃO CUMPRIU o SLA', { exact: true })).toBeVisible();
    await expect(resultado.getByText('R$ 20,83').first()).toBeVisible();
    await page.getByLabel(/Só o que passou do permitido/).check();
    await expect(resultado.getByText('R$ 11,83').first()).toBeVisible();
    await semRolagemLateral(page);
  });

  test('glossário acha pelo termo em inglês e a busca acha lição e termo', async ({ page }) => {
    await page.goto('./#/glossario');
    await page.getByLabel(/Buscar por sigla/).fill('workaround');
    await expect(page.getByRole('heading', { name: 'Solução de contorno' })).toBeVisible();
    await page.goto('./#/busca');
    await page.getByLabel(/Procurar em lições/).fill('glosa');
    await expect(page.getByRole('heading', { name: 'Lições' })).toBeVisible();
    await expect(page.getByRole('link', { name: /09-02 · A glosa na prática/ })).toBeVisible();
  });

  test('pergunta da lição vai para o caderno; importar arquivo inválido não muda nada', async ({ page }) => {
    await page.goto('./#/licao/09-03');
    await page.getByRole('button', { name: 'Levar para o caderno' }).first().click();
    await expect(page.getByRole('button', { name: 'No caderno ✓' }).first()).toBeDisabled();
    await page.goto('./#/caderno');
    await expect(page.getByText(/Quem é o gestor e quem são os fiscais/)).toBeVisible();
    await page.getByLabel('Máquina de fusão e clivador').fill('Modelo fictício');
    await page.locator('input[type=file]').first().setInputFiles({ name: 'ruim.json', mimeType: 'application/json', buffer: Buffer.from('{nada') });
    await expect(page.getByText(/não é um JSON válido. Nada foi alterado/)).toBeVisible();
    await page.reload();
    await expect(page.getByLabel('Máquina de fusão e clivador')).toHaveValue('Modelo fictício');
  });

  test('modo sol liga pelo topo', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /Modo sol/ }).click();
    await expect(page.locator('html')).toHaveAttribute('data-sol', 'sim');
  });
});

test('funciona sem internet depois da primeira visita (inclusive lição ainda não aberta)', async ({ page, context }) => {
  await page.goto('./');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  // Espera o service worker controlar a página.
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Hoje', level: 1 })).toBeVisible();
  await page.goto('./#/licao/10-05');
  await expect(page.getByRole('heading', { name: /Nova NR-10/ })).toBeVisible();
  await page.goto('./#/ferramentas/disponibilidade');
  await expect(page.getByRole('heading', { name: 'Disponibilidade e glosa' })).toBeVisible();
  await context.setOffline(false);
});

test.describe('acessibilidade (axe, regras WCAG A e AA)', () => {
  for (const rota of ['', '#/trilha', '#/trilha/09', '#/licao/10-01', '#/licao/09-05/questoes', '#/ferramentas/disponibilidade', '#/glossario', '#/caderno', '#/plano', '#/ajustes', '#/busca?q=sla']) {
    test(`sem violações graves em /${rota}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`./${rota}`);
      await page.waitForLoadState('networkidle');
      await page.locator('main h1').first().waitFor();
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(graves.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
    });
  }

  test('alvos de toque têm pelo menos 44 px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const rota of ['', '#/licao/09-01', '#/ferramentas/disponibilidade']) {
      await page.goto(`./${rota}`);
      await page.locator('main h1').first().waitFor();
      const pequenos = await page.evaluate(() =>
        [...document.querySelectorAll('button, .botao, .navegacao a, .botao-icone, .item-lista[href]')]
          .filter((e) => (e as HTMLElement).offsetParent !== null)
          .map((e) => ({ t: (e.textContent ?? '').trim().slice(0, 30), r: e.getBoundingClientRect() }))
          .filter(({ r }) => r.height < 43.5 || r.width < 43.5)
          .map(({ t, r }) => `${t} ${Math.round(r.width)}x${Math.round(r.height)}`),
      );
      expect(pequenos, rota).toEqual([]);
    }
  });
});

test.describe('contraste nos temas escuro e sol', () => {
  for (const [tema, ajustes] of [
    ['escuro', { tema: 'escuro', sol: false }],
    ['sol', { tema: 'sistema', sol: true }],
  ] as const) {
    for (const rota of ['', '#/licao/10-01', '#/ferramentas/disponibilidade']) {
      test(`${tema}: sem violações graves em /${rota}`, async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('./');
        await page.evaluate((a) => localStorage.setItem('fc:v1:estado', JSON.stringify({ ajustes: a })), ajustes);
        await page.goto(`./${rota}`);
        await page.reload();
        await page.locator('main h1').first().waitFor();
        const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
        const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        expect(graves.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
      });
    }
  }
});
