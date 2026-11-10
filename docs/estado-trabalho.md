# Estado do trabalho

Atualizado em 10/11/2026. Este arquivo diz o que está pronto, o que ficou pela metade e qual é o próximo passo, para retomar sem depender da memória de ninguém.

## No ar (main)

- P1 completo e revisado: módulos 2, 3, 4, 5, 6, 9 e 10 (29 lições, 233 questões) e as ferramentas.
- Acabamento do P1 (questões equilibradas, diagramas, lições de até 700 palavras).
- Vídeos: a tela, o validador e o `npm run conferir-videos` estão no main. Toda lição tem termos de busca; as do P1 ainda não têm vídeo conferido.
- Dados fictícios de QGIS em `public/dados-qgis/` (`npm run dados-qgis`).

## Pela metade, fora do main

### Branch `modulo-01-e-videos` (módulo 1: telecom numa distribuidora)

Pronto e conferido:

- 19 fontes, seis lições (01-01 a 01-06), 24 termos de glossário e 7 perguntas para a empresa;
- a 01-01 como "comece por aqui" opcional no plano;
- as 16 questões de 01-01 e 01-02.

Falta (está no commit "WIP"):

1. **Questões de 01-03 a 01-06.** Passam no validador; falta a revisão frase a frase. Li as de 01-03 e 01-04 e anotei:
   - 01-04-q5, q6 e q8 (e a 01-01-q5): três alternativas concordam com o colega ("Certo: …") e só a correta discorda. Quem não sabe a matéria acerta por exclusão. Reescrever com duas que concordam e duas que discordam.
   - 01-04-q8 e a lição 01-04: a lição diz que não há valor-padrão de prioridade na norma e que o 4 é só exemplo da SEL. Pelo que conheço, a IEC 61850-8-1 indica prioridade 4 como padrão do GOOSE. Achar uma fonte aberta e corrigir a lição e a questão; sem fonte, tirar a afirmação.
   - 01-04-q4: trocar "nem certificado" por "segundo a SEL, sem autenticação nativa".
   - 01-03-q5: dizer na explicação que levar GOOSE para fora da LAN exige solução própria (Cisco).
   - 01-05 e 01-06: não li.
2. **Diagramas.** Os seis estão desenhados (agente), medidos nos três temas e compilam. Falta a minha conferência dos números contra as lições e atualizar o `diagrama_descricao` de cada lição para bater com o desenho. O agente avisou que o CSS `.diagrama svg { max-height: 420px }` encolhe desenhos com mais de uns 500 de altura.
3. **Teste e2e** `tests/e2e/modulo-01.spec.ts` e o relatório `docs/revisao-tecnica/modulo-01.md` (rascunho, sem as partes de questões e diagramas).
4. Depois: apagar `docs/wip/`, rodar `npm run verificar` num worktree limpo, merge no main.

### Vídeos (conferência dos candidatos)

- `docs/wip/videos-candidatos.json` (no branch `modulo-01-e-videos`): candidatos para 27 das 35 lições, levantados por agente com o oEmbed e a YouTube Data API. Nenhum foi conferido por mim contra a lição.
- Próximo passo: para cada lição, na ordem semanas 1 e 2, módulo 1 e depois o resto, ler a descrição e os capítulos do candidato, comparar com a lição (valores de perda, regras de segurança) e só então gravar em `content/videos.json`. Vídeo longo sem capítulos fica de fora.
- A consulta usa a YouTube Data API (`videos.list`, 1 unidade por chamada; `search.list` custa 100). A chave fica só no segredo de rede do ambiente (host `www.googleapis.com`, cabeçalho `X-Goog-Api-Key`). Ela não está no Git nem em nenhum documento.
- Lições sem candidato até agora: 01-01, 01-02, 01-05, 02-04, 03-01, 09-02, 10-03 e 10-04.

## Em andamento: P2 de QGIS (módulo 8) e postes (módulo 7)

Branch `p2-qgis-postes`. Uma lição por vez, fechada por inteiro (pesquisa na fonte, lição, diagrama, glossário, perguntas para a empresa, 8 questões, vídeos ou termos de busca, revisão técnica, `npm run verificar`, merge no main).

Ordem: 08-03, 08-02, 08-06, 07-01, 07-02; depois 08-01, 08-04, 08-05, 08-07, 07-03 a 07-07.

| Lição | Fechada em | Questões | Vídeos | O que a revisão corrigiu |
| --- | --- | --- | --- | --- |
| 08-03 SRC, UTM 20S e o erro de 10.000 km | 10/11/2026 | 8 | 2 (1 com aviso) | Destino do ponto com o falso norte trocado (perto do Polo Norte, não "some"); "oficial desde 2005" virou a frase da resolução; regra dos dígitos só ao norte do Equador; separador do CSV; lição enxugada para 700 palavras |
