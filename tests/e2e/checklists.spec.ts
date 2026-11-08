import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Checklists de campo (P1)', () => {
  test('tela /campo lista os 4 checklists com aviso de segurança', async ({ page }) => {
    await page.goto('./#/campo');
    await expect(page.locator('h1')).toContainText('Checklists de campo');
    await expect(page.locator('.aviso-seguranca')).toBeVisible();

    const titulos = page.locator('ul.lista-limpa h2');
    await expect(titulos).toHaveCount(4);
    await expect(titulos.nth(0)).toContainText('Antes de subir no poste');
    await expect(titulos.nth(1)).toContainText('Antes da fusão e testes ópticos');
    await expect(titulos.nth(2)).toContainText('Inspeção de CEO e CTO');
    await expect(titulos.nth(3)).toContainText('Aceite de obra óptica');
  });

  test('interação com checklist: marcar itens, ver por quê, anotar e copiar', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('./#/campo/antes-de-subir-no-poste');

    await expect(page.locator('h1')).toContainText('Antes de subir no poste');
    await expect(page.locator('.aviso-seguranca')).toContainText('Lembrete de segurança');

    // Inicialmente 0 de 12 itens
    const contador = page.locator('#t-progresso');
    await expect(contador).toContainText('0 de 12 itens verificados');

    // Marca o primeiro item (Autorização e ASO)
    const primeiroCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(primeiroCheckbox).not.toBeChecked();
    await primeiroCheckbox.click();
    await expect(primeiroCheckbox).toBeChecked();
    await expect(contador).toContainText('1 de 12 itens verificados');

    // Abre o detalhe "Por quê?"
    const detalhe = page.locator('details').first();
    await detalhe.locator('summary').click();
    await expect(detalhe).toHaveAttribute('open', '');
    await expect(detalhe).toContainText('NR-10');
    await expect(detalhe).toContainText('NR-35');

    // Digita observações
    const campoObs = page.locator('#campo-observacoes');
    await campoObs.fill('Poste em bom estado, sem presença de marimbondos.');

    // Clica em copiar
    await page.getByRole('button', { name: /copiar como texto/i }).click();
    await expect(page.getByRole('button', { name: /copiado/i })).toBeVisible();

    // Recarrega a página para checar persistência local
    await page.reload();
    await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
    await expect(page.locator('#campo-observacoes')).toHaveValue('Poste em bom estado, sem presença de marimbondos.');

    // Limpar marcações
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: /limpar marcações/i }).click();
    await expect(page.locator('input[type="checkbox"]').first()).not.toBeChecked();
    await expect(page.locator('#campo-observacoes')).toHaveValue('');
    await expect(contador).toContainText('0 de 12 itens verificados');
  });

  for (const rota of [
    '#/campo',
    '#/campo/antes-de-subir-no-poste',
    '#/campo/antes-da-fusao',
    '#/campo/inspecao-ceo-cto',
    '#/campo/aceite-de-obra',
  ]) {
    test(`acessibilidade (axe) em ${rota}`, async ({ page }) => {
      await page.goto(`./${rota}`);
      const resultados = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const graves = resultados.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(graves, JSON.stringify(graves, null, 2)).toEqual([]);
    });
  }
});
