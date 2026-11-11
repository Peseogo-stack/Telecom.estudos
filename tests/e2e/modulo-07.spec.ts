import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 390, height: 844 } });

for (const id of ['07-01', '07-02', '07-03', '07-04', '07-05', '07-06']) {
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

test('07-04: diagrama traz as cotas dos dois exemplos e a etiqueta de exemplo', async ({ page }) => {
  await page.goto('./#/licao/07-04');
  const svg = page.locator('figure.diagrama svg');
  await expect(svg).toContainText('CEO: 1.500 mm ou mais');
  await expect(svg).toContainText('1.500 mm (Cemig)');
  await expect(svg).toContainText('2.000 mm (Energisa v4.0)');
  await expect(svg).toContainText('não no poste');
  await expect(svg).toContainText('Exemplos. Vale a norma da sua distribuidora.');
});

test('07-04: exemplos que discordam, "não conferido" e observação do solo', async ({ page }) => {
  await page.goto('./#/licao/07-04');
  const licao = page.locator('main');
  await expect(licao).toContainText('Dois exemplos: não é a regra da sua empresa');
  await expect(licao).toContainText('Discordam na reserva: 1.500 contra 2.000 mm.');
  await expect(licao).toContainText('não conferido');
  await expect(licao).toContainText('não em CTO');
  await expect(licao).toContainText('Você não mede distância em poste');
  await expect(licao).toContainText('Não suba.');
});

test('07-04: termo reserva técnica abre a definição no glossário', async ({ page }) => {
  await page.goto('./#/licao/07-04');
  await page.getByRole('link', { name: 'Reserva técnica', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=reserva-tecnica/);
  await expect(page.getByText('Sobra de cabo do ocupante', { exact: false }).first()).toBeVisible();
});

test('07-05: diagrama mostra o ponto mais baixo, os exemplos e a etiqueta de exemplo', async ({ page }) => {
  await page.goto('./#/licao/07-05');
  const svg = page.locator('figure.diagrama svg');
  await expect(svg).toContainText('medida aqui, no');
  await expect(svg).toContainText('ponto mais baixo');
  await expect(svg).toContainText('ruas e avenidas 5,0 m');
  await expect(svg).toContainText('rodovia federal 7,0 m');
  await expect(svg).toContainText('Com calor, a flecha aumenta.');
  await expect(svg).toContainText('Exemplo: Cemig ND-6.6, Tabela 2.');
});

test('07-05: tabela de exemplo, altura no vão e conduta de segurança', async ({ page }) => {
  await page.goto('./#/licao/07-05');
  const licao = page.locator('main');
  await expect(licao).toContainText('não é a regra da sua empresa');
  await expect(licao).toContainText('ponto mais baixo');
  await expect(licao).toContainText('Altura no poste não prova altura no vão');
  await expect(licao).toContainText('Você não mede embaixo da rede');
  await expect(licao).toContainText('não libera o trânsito');
  await expect(licao).toContainText('comunique na hora');
});

test('07-05: termo travessia abre a definição no glossário', async ({ page }) => {
  await page.goto('./#/licao/07-05');
  await page.getByRole('link', { name: 'travessia', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=travessia/);
  await expect(page.getByText('cruza uma via', { exact: false }).first()).toBeVisible();
});

test('07-06: diagrama mostra o losango, os três caminhos e o rodapé da empresa', async ({ page }) => {
  await page.goto('./#/licao/07-06');
  const svg = page.locator('figure.diagrama svg');
  await expect(svg).toContainText('Registrar: poste, problema, dono, foto, data');
  await expect(svg).toContainText('Que caso é?');
  await expect(svg).toContainText('Risco de acidente ou emergência');
  await expect(svg).toContainText('Clandestina');
  await expect(svg).toContainText('Cronograma (até 1 ano).');
  await expect(svg).toContainText('Sem regularizar: pedido à Comissão.');
  await expect(svg).toContainText('procedimento da empresa.');
});

test('07-06: o fluxo, o prazo de 90 dias e a conduta do técnico', async ({ page }) => {
  await page.goto('./#/licao/07-06');
  const licao = page.locator('main');
  await expect(licao).toContainText('As normas valem em 10/11/2026');
  await expect(licao).toContainText('Nada se instala sem aprovação');
  await expect(licao).toContainText('Quem classifica é a empresa');
  await expect(licao).toContainText('Não misture com o ano do cronograma');
  await expect(licao).toContainText('Não decide se é clandestino, não corta e não retira');
  await expect(licao).toContainText('equipe autorizada');
});

test('07-06: termo notificação abre a definição no glossário', async ({ page }) => {
  await page.goto('./#/licao/07-06');
  await page.getByRole('link', { name: 'notificação', exact: true }).first().click();
  await expect(page).toHaveURL(/glossario\?t=notificacao/);
  await expect(page.getByText('Comunicação formal do detentor', { exact: false }).first()).toBeVisible();
});

for (const rota of ['#/licao/07-01', '#/licao/07-01/questoes', '#/glossario?t=posteiro', '#/licao/07-02', '#/licao/07-02/questoes', '#/licao/07-03', '#/licao/07-03/questoes', '#/licao/07-04', '#/licao/07-04/questoes', '#/licao/07-05', '#/licao/07-05/questoes', '#/licao/07-06', '#/licao/07-06/questoes']) {
  test(`acessibilidade (axe) em /${rota}`, async ({ page }) => {
    await page.goto(`./${rota}`);
    await page.locator('main h1').first().waitFor();
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((x) => x.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}
