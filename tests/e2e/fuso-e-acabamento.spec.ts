import { expect, test, type Page } from '@playwright/test';

// O playwright.config.ts já roda tudo em pt-BR e no fuso America/Boa_Vista (UTC−4).

async function semear(page: Page, estado: object) {
  await page.goto('./');
  await page.evaluate((e) => localStorage.setItem('fc:v1:estado', JSON.stringify(e)), estado);
  await page.reload();
}

test.describe('estudo à noite em Boa Vista (21h = 01h do dia seguinte em UTC)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('"hoje", a sequência e a revisão usam a data local', async ({ page }) => {
    // Segunda-feira, 09/11/2026, 21h00 em Boa Vista = 10/11/2026 01h00 UTC.
    await page.clock.install({ time: new Date('2026-11-10T01:00:00Z') });
    await semear(page, {
      progresso: { licoes: {}, diasEstudo: ['2026-11-08'] },
      revisao: { itens: { '09-02-q1': { etapa: 0, vence: '2026-11-10', erros: 1 } }, dominadas: [] },
      ajustes: { tema: 'claro', sol: false, inicioPlano: '2026-11-09', diasSoRevisao: [], soRevisaoAte: null },
    });
    await expect(page.getByText('segunda, 09/11/2026')).toBeVisible();
    await expect(page.getByText('Nada para revisar hoje')).toBeVisible();
    await expect(page.getByText('Próxima revisão em 10/11/2026.')).toBeVisible();

    // Faz a lição 09-01 inteira às 21h.
    await page.goto('./#/licao/09-01/questoes');
    for (let i = 0; i < 5; i++) {
      await page.locator('.alternativa input').first().check();
      await page.getByRole('button', { name: 'Confirmar resposta' }).click();
      await page.getByRole('button', { name: i < 4 ? 'Próxima questão' : 'Ver resultado' }).click();
    }
    const salvo = await page.evaluate(() => JSON.parse(localStorage.getItem('fc:v1:estado') ?? '{}'));
    expect(salvo.progresso.diasEstudo).toEqual(['2026-11-08', '2026-11-09']);
    for (const [id, item] of Object.entries<{ vence: string }>(salvo.revisao.itens)) {
      if (id.startsWith('09-01')) expect(item.vence, id).toBe('2026-11-10');
    }
    await page.goto('./');
    await expect(page.getByText(/2 dias seguidos estudando/)).toBeVisible();

    // Passa da meia-noite com o app aberto: a tela vira para terça e a revisão aparece.
    await page.clock.fastForward('03:01:00');
    await expect(page.getByText('terça, 10/11/2026')).toBeVisible();
    await expect(page.getByRole('heading', { name: /para revisar$/ })).toBeVisible();
  });

  test('Ajustes mostram a data de início em pt-BR', async ({ page }) => {
    await page.clock.install({ time: new Date('2026-11-10T01:00:00Z') });
    await semear(page, { ajustes: { tema: 'claro', sol: false, inicioPlano: '2026-11-09', diasSoRevisao: [3, 4], soRevisaoAte: '2026-11-27' } });
    await page.goto('./#/ajustes');
    await expect(page.getByTestId('inicio-por-extenso')).toContainText('segunda, 09/11/2026');
    await expect(page.getByLabel('Início do plano de 90 dias')).toHaveValue('2026-11-09');
    expect(await page.evaluate(() => navigator.language)).toBe('pt-BR');
  });
});

test.describe('modo sol: barra de baixo e título', () => {
  // A fonte do sistema muda de aparelho para aparelho. DejaVu Sans é bem mais larga que Inter e Roboto:
  // se couber com ela, cabe nos celulares. (No CI do GitHub, a fonte padrão já é larga.)
  for (const fonte of ['padrão', 'DejaVu Sans'] as const)
  for (const largura of [320, 360, 390]) {
    test(`rótulos não se encostam e o título fica numa linha (${largura} px, fonte ${fonte})`, async ({ page }) => {
      await page.setViewportSize({ width: largura, height: 800 });
      await semear(page, { ajustes: { tema: 'claro', sol: true, inicioPlano: null, diasSoRevisao: [], soRevisaoAte: null } });
      if (fonte !== 'padrão') {
        await page.addStyleTag({ content: `html, body, body * { font-family: '${fonte}', sans-serif !important; }` });
        await page.evaluate(() => document.fonts.ready);
      }
      const caixas = await page.locator('.navegacao a span').evaluateAll((els) =>
        els.map((e) => {
          const r = e.getBoundingClientRect();
          const link = (e.parentElement as HTMLElement).getBoundingClientRect();
          return { texto: e.textContent, esq: r.left, dir: r.right, linkEsq: link.left, linkDir: link.right, linhas: Math.round(r.height / parseFloat(getComputedStyle(e).lineHeight)) };
        }),
      );
      for (let i = 0; i < caixas.length; i++) {
        const c = caixas[i];
        expect(c.esq, `${c.texto} dentro do botão`).toBeGreaterThanOrEqual(c.linkEsq - 0.5);
        expect(c.dir, `${c.texto} dentro do botão`).toBeLessThanOrEqual(c.linkDir + 0.5);
        if (i > 0) expect(c.esq - caixas[i - 1].dir, `espaço entre ${caixas[i - 1].texto} e ${c.texto}`).toBeGreaterThanOrEqual(4);
      }
      if (largura >= 360) for (const c of caixas) expect(c.linhas, `${c.texto} em uma linha`).toBe(1);
      const marca = await page.locator('.marca span').evaluate((e) => {
        const r = e.getBoundingClientRect();
        return { altura: r.height, linha: parseFloat(getComputedStyle(e).lineHeight) || parseFloat(getComputedStyle(e).fontSize) * 1.55 };
      });
      expect(marca.altura).toBeLessThan(marca.linha * 1.5);
    });
  }
});
