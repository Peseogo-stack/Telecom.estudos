# Como fechar uma lição do "Fibra em Campo"

App de estudo offline (PWA React + TypeScript + Vite), em português do Brasil, para um técnico de telecom de uma distribuidora de energia em Roraima. Ele estuda no celular. Repositório: `/home/user/telecom.estudos` (branch `p2-qgis-postes`). Trabalhe só nele. NÃO rode `git commit`, `git push`, `npm run verificar` nem Playwright (`npx playwright`); o `npm run build` pode, e o preview na porta 4186.

Você recebe uma FICHA com os fatos conferidos na fonte. **Tudo o que for número, regra, nome de menu ou afirmação técnica tem de sair da ficha.** Se faltar um fato para a lição ficar boa, NÃO invente nem complete de memória: deixe sem e diga no relatório o que faltou. Onde a prática muda de empresa para empresa, use `{{confirmar}}`.

## Regras de conteúdo (valem sempre)

- Nenhum dado real de empresa: nenhuma rota, coordenada real de rede, nome ou logo de distribuidora ou operadora. Exemplos usam dados fictícios.
- Segurança é lembrete: nada pode afrouxar uma regra de segurança; na dúvida, "confirmar na empresa".
- Não use analogia com a rede elétrica para explicar conceito de rede, de dados ou de mapa.
- Português do Brasil, frases curtas, voz ativa, sem enfeite. Termo em inglês só quando é o nome na tela do programa; nesse caso, o nome da tela vem como está no manual.

## O que entregar

Leia antes, como modelo de formato: `content/licoes/06-02.md`, `content/questoes/06-02.json`, `docs/especificacao.md` (seção do conteúdo e do validador), `content/glossario.json` (2 ou 3 itens), `content/perguntas-empresa.json` (2 ou 3 itens), `content/videos.json` (1 item), `src/diagramas/Referencia1Cordao.tsx`, `src/diagramas/OtdrEventos.tsx`, `src/diagramas/index.ts` e `tests/e2e/modulo-10.spec.ts`.

1. **Fontes** em `content/fontes.json`: as da ficha, com `acessadoEm` da ficha e, na `observacao`, os fatos conferidos (os números e as frases que a lição usa).
2. **Lição** `content/licoes/<id>.md`: no máximo 700 palavras (o validador conta; mire em 600 a 690), seções "## Explicação", "## Na prática" e "## Erros comuns", `{{diagrama}}` no ponto certo, `{{fonte:id}}` em cada número, regra ou caminho de menu, `{{termo:id|texto}}` na primeira vez que um termo do glossário aparece. `duracao_min` entre 10 e 15. `revisado_em` = data da ficha. `diagrama_descricao` descreve o desenho final, com os mesmos números.
3. **Glossário** `content/glossario.json`: os termos novos da ficha (confira se já não existem), com fonte.
4. **Perguntas para a empresa** `content/perguntas-empresa.json`: as da ficha (ids novos na sequência do grupo: a = descobrir sozinho, b = documentos, c = outras áreas, d = colega). Ligue-as no cabeçalho `perguntas` da lição. O `docs/perguntas-para-a-empresa.md` é gerado por `npm run conteudo`.
5. **8 questões** `content/questoes/<id>.json`:
   - testam conceito usado no trabalho (uma situação: "o fornecedor mandou…", "ao abrir o arquivo…"), não decoreba de número solto;
   - 4 alternativas, 1 correta; toda alternativa tem explicação; a explicação da correta começa com "Certo." e nenhuma explicação de errada começa com "Certo";
   - **equilíbrio:** a correta não pode ser mais longa que a maior errada (mire em razão ≤ 1,05; o validador avisa acima de 1,15 e trava a lição se mais de 30% das questões tiverem aviso). Em pelo menos 4 das 8, alguma errada é mais longa que a correta;
   - o texto de alternativa não começa com "Certo", "Errado", "Sim", "Não"; e nada de três alternativas que concordam e uma que discorda (ou o contrário): a correta não pode ser descoberta por exclusão, por ser a única com ressalva, a única com número, ou a mais completa;
   - as erradas são erros que um iniciante comete de verdade, e a explicação diz por que está errada, com o fato da lição;
   - posição da correta variada (não mais que 3 na mesma posição); dificuldades 3 fáceis (1), 3 médias (2) e 2 difíceis (3);
   - nada de fato que não esteja na lição.
   Confira com `node scripts/validar-conteudo.mjs` e com `node /tmp/claude-0/-home-user/eeebe228-0019-5f30-a2c6-ae30bad511d5/scratchpad/vies/vies.mjs` (se o script pedir argumento, leia o começo dele).
6. **Diagrama** `src/diagramas/<Nome>.tsx`, registrado em `src/diagramas/index.ts` com o id do cabeçalho `diagrama` da lição. Regras em `/tmp/claude-0/-home-user/eeebe228-0019-5f30-a2c6-ae30bad511d5/scratchpad/diag/regras-diagramas.md` (texto ≥ 11 unidades, só as classes `d-*`, três temas), com uma diferença: **a altura do viewBox fica em no máximo 480**, porque o CSS limita a altura do SVG a 420 px e encolhe o que passar disso. Meça com o `medir.cjs` e tire os prints dos três temas com o `prints.cjs` na pasta `/tmp/claude-0/-home-user/eeebe228-0019-5f30-a2c6-ae30bad511d5/scratchpad/diag/p2/` (porta 4186). Olhe os prints: nada sobreposto, nada cortado, números iguais aos da lição.
7. **Vídeos** `content/videos.json`: acrescente a entrada da lição com `"videos": []` e 2 ou 3 `termosBusca`. NÃO grave vídeo nenhum. Levante candidatos com `NODE_USE_ENV_PROXY=1 node /tmp/claude-0/-home-user/eeebe228-0019-5f30-a2c6-ae30bad511d5/scratchpad/videos/yt.mjs busca "<consulta>" 8` (no máximo 3 buscas por lição; cada uma custa cota). Só serve vídeo em português do Brasil, de até uns 20 minutos (ou longo com capítulos), de preferência de fabricante, escola, universidade ou órgão público; evite vídeo de venda de curso. No relatório, liste até 4 candidatos com id, título, canal, duração, capítulos e o que a descrição diz, e aponte qualquer coisa que contradiga a lição.
8. **Teste e2e**: acrescente a lição ao `tests/e2e/modulo-<NN>.spec.ts` (crie o arquivo no padrão do `modulo-10.spec.ts` se não existir). Não rode. Para procurar um texto no corpo da lição, use `page.locator('main')`: `page.locator('.prosa')` sozinho casa com vários blocos e o Playwright recusa (modo estrito). `.prosa table` pode, quando a lição tem uma tabela só; com duas tabelas, use `.first()` ou `main`.
9. `content/curriculo.json` e `content/plano.json`: não mude a ordem; só ajuste `confirmarNaEmpresa` se a ficha mandar.

Ao terminar, rode `node scripts/validar-conteudo.mjs` (tem de dar 0 erro e 0 aviso), `npx tsc --noEmit -p .` e `npx vitest run` e pare o preview.

## Relatório final (curto)

- contagem de palavras; razão correta/maior errada de cada questão e posição da correta;
- o que da ficha ficou de fora e o que faltou na ficha;
- qualquer frase da lição ou alternativa que NÃO esteja coberta pela ficha (liste todas, mesmo as óbvias);
- medidas do diagrama (min e mediana em px) e caminho dos prints;
- candidatos a vídeo;
- saída do validador, do tsc e do vitest.
