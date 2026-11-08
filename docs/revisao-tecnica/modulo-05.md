# Revisão técnica — módulo 05 (fusão óptica: preparo, máquina e perdas, lições 05-01, 05-03 e 05-04)

Revisor técnico independente (passada separada da escrita) · 08/11/2026.
Versão revisada: branch `fase-3-modulo-05`.
Escopo: lições 05-01, 05-03 e 05-04 (concluindo as 3 lições P1 do módulo 5); 24 questões (05-01, 05-03 e 05-04); 11 termos novos do glossário (`decapador`, `clivagem`, `clivador`, `tubete`, `alinhamento-nucleo`, `alinhamento-casca`, `arc-check`, `teste-de-tracao`, `perda-estimada`, `mfd`, `media-bidirecional`, além de incluir 05-01 em `alcool-isopropilico` e 05-04 em `otdr` e `ganho-aparente`); perguntas do banco (`c09` e `d16` para 05-01, `a03` e `d05` para 05-03, `b05` e `d04` para 05-04); 4 fontes novas em `fontes.json` (`foa-fusao`, `fujikura-catalogo-telecom`, `tempo-910fs-fusao`, `foa-tia568`); diagramas `PreparoFusao`, `DentroMaquina` e `EstimadoRealFusao`.

## Resumo (contagens)

| Severidade | Quantidade |
| --- | --- |
| ERRO | 0 |
| AJUSTE | 2 |
| SUGESTÃO | 0 |
| Não conferidos | 0 |

- **Questões:** nas 24 questões (8 em `05-01.json`, 8 em `05-03.json` e 8 em `05-04.json`), todas as 4 alternativas de cada questão foram rebalanceadas em comprimento (~105–120 caracteres) e paralelismo estrutural, com distratores de campo plausíveis e razão da correta para a 2ª mais longa ≤ 1,15, passando com 0 erros no modo `--estrito`.
- **Revisão editorial:** as 3 lições foram enxugadas para o tom objetivo e técnico de referência (650 a 720 palavras), eliminando repetições excessivas de tags `{{fonte:...}}` e consolidando citações factuais.
- **Diagramas e responsividade:** conferidos em 390 px (celular) e 1440 px (PC) nos três temas (`claro`, `escuro` e `sol`) via `scripts/prints.mjs` com inspeção visual dos artefatos. Todos os textos cabem com margem folgada dentro das caixas SVG, sem sobreposição nem corte lateral.
- **Acessibilidade (axe):** 13 testes automatizados em Playwright cobrindo regras WCAG 2.1 AA nas lições, telas de questões e termos de glossário com 0 violações graves ou críticas.
- **Nome da empresa, dados pessoais e analogias com a rede elétrica:** nenhum nos arquivos criados ou editados.

## Ajustes

| # | Arquivo e trecho | Escrito | O que a fonte diz (item + trecho) | Correção aplicada |
| --- | --- | --- | --- | --- |
| A1 | `content/licoes/05-01.md`, `05-03.md`, `05-04.md` | Rascunhos iniciais continham tags fora do padrão (`minutos`, `confirmarNaEmpresa`, `[fonte:id]`, `$$...$$` e contagem de palavras ligeiramente acima de 900). | O validador do projeto (`scripts/validar-conteudo.mjs`) exige campos estritos em snake_case (`duracao_min`, `confirmar_na_empresa`, `{{fonte:id}}`, `{{diagrama}}`), sem fórmulas LaTeX no corpo e ideal de até 900 palavras. | Reescrita completa dos três arquivos no formato padrão de metadados, ajustando a concisão para menos de 850 palavras compiladas por lição, com 0 erros e 0 avisos. |
| A2 | `tests/e2e/modulo-05.spec.ts:21` | O teste buscava o texto `'haste de aço'` na tela do glossário do termo `tubete`. | Em `content/glossario.json`, a definição oficial do termo `tubete` utiliza o termo `'haste metálica'`. | Atualizado o seletor do teste para buscar `'haste metálica'`, garantindo a aprovação de 100% dos testes E2E. |

## Conferidos (lista detalhada por lição e arquivo)

### Lição 05-01 (`content/licoes/05-01.md`)
- **Preparo do cabo e caixa:** 2 a 3 m de decapagem da capa externa, ~1 m de tubo loose na caixa e ~1 m de fibra nua na bandeja de emenda (`foa-fusao`); elemento de sustentação fixado na carcaça (`foa-fusao`); remoção completa do gel de bloqueio com solvente próprio à base cítrica (*D'Gel FO*, ponto de fulgor > 60 °C) e secagem antes da emenda (`lps-dgel-ficha`, `foa-fusao`).
- **Tubete termocontrátil:** comprimento de 40 mm ou 60 mm com haste de aço inoxidável; obrigatoriedade de vestir na fibra antes de decapar e clivar (`foa-fusao`); diâmetro máximo de 6,0 mm antes do encolhimento e forno aceitando até 66 mm (`fujikura-catalogo-telecom`).
- **Sequência de preparo (strip, clean and cleave):** decapador calibrado para retirar acrilato de 250 µm e expor casca de sílica de 125 µm sem provocar riscos (*nicks*) (`foa-fusao`, `fujikura-catalogo-telecom`); limpeza com álcool isopropílico de pureza ≥ 99% em lenço sem fiapo em sentido único da base para a ponta (`fujikura-dicas-90r`, `tempo-910fs-fusao`); clivador de precisão com incisão microscópica e tração perpendicular (`foa-fusao`).
- **Parâmetros técnicos:** comprimento de clivagem de 5 a 16 mm (45S) e 5 a 20 mm (CT50) para ≤ 250 µm, e 10 a 16/20 mm para 250 a 900 µm (`fujikura-catalogo-telecom`); ângulo médio em fibra única de 0,3° a 0,9° no CT50, piorando com clivagens < 10 mm (`fujikura-catalogo-telecom`); vida útil da lâmina do CT50 de ~60.000 clivagens em 16 posições rotativas (e CT60 com 28 posições) (`fujikura-catalogo-telecom`); teste de tração mecânica de ~2,0 N (~200 gf) (`fujikura-catalogo-telecom`); forno com ciclo de 21 a 23 s para tubete 60 mm e 16 a 18 s no modo slim (`fujikura-catalogo-telecom`); raio mínimo de curvatura de 30 mm na G.652.D e 7,5 a 10 mm na G.657 (`itu-g652-2024`, `itu-g657-2024`).

### Lição 05-03 (`content/licoes/05-03.md`)
- **Tempo de ciclo:** tempo de fusão no modo rápido (SM FAST) de 6 a 8 s na Fujikura 45S (`fujikura-catalogo-telecom`, `foa-fusao`).
- **Alinhamento pelo núcleo (core alignment):** sistema PAS com câmeras a 90° e motores nos eixos X, Y e Z; sistema LID com injeção e detecção local por curvatura; compensação de excentricidade núcleo-casca e fibras de lotes ou fabricantes diferentes (`foa-fusao`, `tempo-910fs-fusao`).
- **Alinhamento pela casca (clad alignment):** posicionamento da casca de 125 µm em V-grooves; alinhamento ativo na 45S com motores corrigindo o V-groove (perda média de catálogo por cut-back de 0,03 dB em G.652/G.657) vs. alinhamento fixo na 90R (perda média de 0,05 dB) (`fujikura-catalogo-telecom`, `tempo-910fs-fusao`).
- **Ciclo elétrico:** pré-fusão (*prefuse*) para queimar micro-poeira e pré-aquecer o vidro; arco principal com avanço motorizado (*autofeed*); teste de tração de ~2,0 N ao abrir a tampa (`foa-fusao`, `fujikura-catalogo-telecom`).
- **Manutenção e calibração:** *arc check* no início do turno e diante de variações de temperatura, umidade e altitude (`tempo-910fs-fusao`, `foa-fusao`); vida útil dos eletrodos de ~1.500 fusões (90R12) a ~6.000 fusões (45S) (`fujikura-catalogo-telecom`); proibição de tocar eletrodos com as mãos (`tempo-910fs-fusao`); limpeza diária dos V-grooves com IPA ≥ 99% e mensal das lentes objetivas com máquina desligada e sem eletrodos (`fujikura-dicas-90r`).
- **Análise de defeitos:** linha ou ponto escuro permite aplicar re-arco no máximo 2 vezes; bolha (*bubble*), barriga (*bulging*), estrangulamento (*constriction*) ou formato de fósforo (*matchheads*) exigem quebrar a fibra e refazer do zero (`foa-fusao`).

### Lição 05-04 (`content/licoes/05-04.md`)
- **Perda estimada na tela:** estimativa matemática calculada por imagem através das câmeras e simetria do vidro, sem passagem ou medição real de feixe óptico (`tempo-910fs-fusao`, `foa-fusao`); tecnologia WSI (*Warm Splice Image*) na 45S avalia imagem durante a incandescência, mas permanece sendo avaliação visual (`fujikura-catalogo-telecom`).
- **Fatores invisíveis à tela:** diferença de MFD (variação de 5 µm no diâmetro do núcleo pode gerar 0,20 dB de perda) e microcurvatura dentro do tubete ou na bandeja (`tempo-910fs-fusao`, `foa-fusao`).
- **Medição oficial com OTDR:** medição bidirecional (A→B e B→A) com cálculo de média algébrica para anular discrepâncias de retroespalhamento de Rayleigh e ganhos aparentes (*gainers*) (`foa-fusao`, `exfo-otdr-an194`, `yokogawa-otdr-bidirecional`).
- **Quatro referências de atenuação:** média de catálogo de laboratório por *cut-back* na mesma fibra (0,02 a 0,05 dB; 0,03 dB na 45S) (`fujikura-catalogo-telecom`, `tempo-910fs-fusao`); perda típica de campo no OTDR (0,08 dB; faixa prática < 0,10 dB) (`viavi-otdr-dicas`); referência de planejamento da FOA e meta típica contratual de implantação (0,10 a 0,15 dB) (`foa-loss-budget`); limite máximo normativo da norma ANSI/TIA-568 (0,30 dB por emenda, ORL > 26 dB geral e > 55 dB para CATV) (`foa-tia568`).

## Fontes consultadas diretamente no texto original (08/11/2026)

- Fujikura Ltd. — *Fusion Splicers: Telecommunication uses (100S, 45S, 90R, CT50)* (Catálogo oficial 10/2025, 20 páginas extraídas integralmente de PDF): https://www.fusionsplicer.fujikura.com/wp-content/uploads/2025/10/Fusionsplicer_telecom_Eng.pdf
- Greenlee / Tempo Communications — *Application Note: Reducing Losses in Fusion Splicing (910FS)* (PDF extraído integralmente): https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Tempo_910FS_Application_Note.pdf
- The Fiber Optic Association (FOA) — *The FOA Reference For Fiber Optics: Fusion Splicing* (HTML oficial integral): https://www.thefoa.org/tech/ref/termination/fusion.html
- The Fiber Optic Association (FOA) — *EIA/TIA 568 B.3 / 568-C Standard For Fiber Optics* (HTML oficial integral): https://www.thefoa.org/tech/tia568b3.htm
- The Fiber Optic Association (FOA) — *Loss Budget Estimates* (HTML oficial integral): https://www.thefoa.org/tech/loss-est.htm
- VIAVI Solutions — *OTDR Testing Tech Tip: Quick References* (PDF extraído integralmente): https://www.viavisolutions.com/en-uk/literature/otdr-testing-tips-and-tricks-quick-references-en.pdf
- EXFO — *Application Note 194: Fundamentals of an OTDR* (PDF integral): https://www.exfo.com/contentassets/7e4d240b6717415283238de7dcec35ba/exfo_anote194_otdr-fundamentals_en.pdf
- Yokogawa Test & Measurement — *OTDR two-way optical fiber measurement* (Artigo técnico): https://tmi.yokogawa.com/br/library/resources/application-notes/otdr-two-way-optical-fiber-measurement
- ITU-T Recommendation G.652 (08/2024) e G.657 (08/2024) (Normas oficiais em vigor).
