# Acabamento do P1: questões, diagramas e lições

Trabalho de 09/11/2026, branch `acabamento-p1`. Cada lote foi para o `main` depois de passar no `npm run verificar`.

## 1. Questões: viés de comprimento

### Medida

Um script, fora do Git, mede o comprimento em caracteres das alternativas de cada questão. Ele calcula duas razões: a correta dividida pela maior errada e a correta dividida pela média das erradas.

| | Antes | Depois |
| --- | --- | --- |
| Questões | 233 | 233 |
| Correta é a mais longa das 4 (o acaso daria 25%) | 152 (65%) | 87 (37%) |
| Razão correta / maior errada: média e mediana | 1,51 e 1,07 | 0,92 e 0,96 |
| Razão correta / média das erradas: média e mediana | 1,79 e 1,39 | 1,00 e 1,01 |
| Correta mais de 15% acima da maior errada (aviso) | 113 | 0 |
| Correta mais de 30% acima da maior errada | 106 | 0 |

A correta ainda é a mais longa em 37% das questões. Em todas elas, a diferença para a maior errada fica abaixo de 15%.

### Regras novas do validador

- **Aviso por questão:** a correta passa de 15% acima da maior errada.
- **Erro por lição:** mais de 30% das questões da lição têm esse aviso. Essa regra entrou no último lote, quando todas as lições já cumpriam.
- **Erro por marca trocada:** a explicação da correta não começa com "Certo", ou a de uma errada começa. Antes, valia em 100% das 932 alternativas. Essa regra pegou o erro do lote 3, descrito abaixo.

### Posição da alternativa correta

O app embaralha as alternativas a cada exibição. O `QuestaoCard` usa o embaralhamento de Fisher–Yates, na lição e na revisão. A posição no arquivo não chega à tela.

Um teste de unidade fixa o sorteio e confere que a ordem na tela não é a do arquivo.

Nas questões reescritas, a correta também passou a variar de posição no arquivo. Ela estava em 1º lugar em 116 das 233 questões e agora está em 94.

### Lotes

O Sonnet reescreveu as questões com aviso. A correta ficou mais curta, as erradas viraram erros plausíveis de campo, cada alternativa tem explicação e nenhuma questão cobra número de item de norma.

Eu conferi todas as corretas que mudaram, contra a lição e, quando preciso, contra a fonte. Também conferi uma amostra de pelo menos 10% das erradas; nos módulos 6, 9 e 10, li todas.

| Lote | Questões | O que achei | Destino |
| --- | --- | --- | --- |
| Módulos 4 e 5 | 4 | Nada. | Aprovado. |
| Módulo 3 | 13 | Em 03-04-q3 e 03-07-q5, a marca de correta ficou na alternativa errada. Em 03-07-q5, isso ensinaria a ligar APC com UPC. | Devolvido e corrigido. |
| Módulo 6 | 18 | Nada técnico. Dois retoques de redação ("desconta-se" e "vidro e ar refletem"). | Aprovado. |
| Módulo 10 (segurança) | 14 | Em 10-01-q2, "é proximidade se a mão **entrar**" afrouxava a definição da NR-10, que diz "**pode** entrar". Em 10-05-q3, "cessão paga **do poste**" foi trocado por "de espaço no poste". | Devolvido e corrigido. Também ajustei a estrutura da 10-01-q2 ("já se… puder entrar"): as três erradas começavam com "só se" e a correta não. |
| Módulo 9 | 28 (27 com aviso e a 09-05-q2) | 09-06-q6: a errada "não precisa, se há monitoramento" é defensável pela própria lição (TRT-7). 09-06-q4: a correta saiu truncada. | Devolvido e corrigido. |
| Módulo 2 | 37 | Nada. | Aprovado. |

No total, 114 questões mudaram: as 113 com aviso e a 09-05-q2, em que só as erradas mudaram.

Pontos conferidos na fonte durante a revisão:

- **NR-10, nova redação (10.7.2):** a permissão de trabalho é "precedida de análise de riscos, aprovada por trabalhador autorizado".
- **NR-10, definição:** trabalho em proximidade é aquele em que o trabalhador "pode entrar na zona controlada".
- **FOA:** "stop using chemicals that cause allergic reactions".

## 2. Diagramas

### Critério

Medi o tamanho efetivo da letra de cada diagrama num celular de 390 px. Nessa largura, uma unidade do viewBox vale cerca de 0,83 px. Também procurei texto cortado e conferi os prints nos temas claro, escuro e sol.

As referências de clareza são `Referencia1Cordao` e `OtdrEventos`, com no mínimo 8,3 px.

### Errados

| Diagrama | Problema | Correção |
| --- | --- | --- |
| FibraReflexao (02-01) | A frase de baixo saía cortada na borda. O cone de entrada e o raio que escapa apareciam como formas pretas, porque `d-cota` e `d-cabo-bt` não tinham `fill: none`. | Frase em duas linhas e `fill: none` nas duas classes. |
| SmMm (02-03) | "Pulso alargado" passava da borda. Os caminhos do multimodo apareciam como triângulos pretos, pela mesma causa. | Rótulo alinhado à direita e a correção do CSS. |
| Escalonamento (09-06) | O relógio do nível 4 ficava fora do desenho e a caixa cobria a nota de cima. | Degraus menores e notas acima da escada. |

### Ilegíveis

Estes oito diagramas tinham quase todo o texto abaixo de 9 px:

| Diagrama | Antes (mínimo / mediana) | Depois (mínimo / mediana) |
| --- | --- | --- |
| AnatomiaFtth (04-01) | 7,1 / 7,1 px | 10,0 / 10,0 px |
| SplittersBalanceados (04-03) | 6,2 / 7,5 px | 9,1 / 10,0 px |
| OrcamentoPon (04-05) | 6,2 / 7,5 px | 9,1 / 10,0 px |
| PreparoFusao (05-01) | 7,9 / 7,9 px | 10,0 / 10,0 px |
| DentroMaquina (05-03) | 7,5 / 7,9 px | 10,0 / 10,0 px |
| EstimadoRealFusao (05-04) | 7,1 / 7,9 px | 10,0 / 10,0 px |
| LuzInvisivel (10-03) | 7,9 / 8,7 px | 10,0 / 10,0 px |
| BancadaLimpa (10-04) | 7,5 / 8,3 px | 10,0 / 10,0 px |

O Sonnet empilhou os blocos em uma ou duas colunas. Eu conferi o resultado de duas formas:

- **Texto:** comparei, no app gerado, todo o texto de cada diagrama antes e depois. Nenhum número nem palavra sumiu. A única mudança foi "de potência" no subtítulo do 04-03.
- **Prints:** olhei os 24 prints. No 04-01, afastei textos que encostavam na borda; no 05-03, desencostei os eletrodos do subtítulo.

A faixa verde do OrcamentoPon usava cor fixa (`rgba`) e passou a usar a classe do tema.

Os outros 18 diagramas ficaram como estavam. Têm letra igual ou maior que a das referências, nada cortado e nada errado nos três temas.

## 3. Lições acima de 700 palavras

(preenchido no fim do trabalho)
