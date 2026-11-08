# Revisão técnica — módulo 3 (cabos, cores, conectores e caixas)

Revisor técnico independente (passada separada da escrita) · 07/11/2026.
Versão revisada: branch `fase-3-modulo-03`, commit `aa4ed84` (com merge do `main` `d065838`).
Escopo: lições 03-01, 03-03, 03-04 e 03-07; 32 questões (03-01, 03-03, 03-04 e 03-07); 12 termos novos do glossário (`cfoa`, `as80`, `tubo-piloto`, `tubo-direcional`, `ceo`, `cto`, `dio`, `pto`, `pigtail`, `patch-cord`, `upc`, `apc`); 2 perguntas novas do banco (`a13`, `a14`); 7 fontes novas do `fontes.json` (`prysmian-duto`, `intelbras-ftth`, `intelbras-cto`, `intelbras-dio`, `nazda-pto`, `foa-conectores`, `fluke-apc`) mais `prysmian-cfoa-as`, `transcend-as`, `furukawa-et02719`, `foa-cores`, `foa-reflectancia`, `foa-otdr`, `foa-seguranca`, `viavi-otdr-dicas`, `fs-gpon-olt` e `extreme-sfp-bx10`; `cores.ts`, `cores.test.ts` e `TelaCores.tsx`; diagramas `GravacaoCabo`, `DozeCores`, `TubosPiloto` e `UpcApcCaixas`.

## Resumo (contagens)

| Severidade | Quantidade |
| --- | --- |
| ERRO | 0 |
| AJUSTE | 7 |
| SUGESTÃO | 2 |
| Não conferidos | 1 |

- **Questões:** nas 32 questões (8 por lição), a alternativa marcada como correta é a certa. Todas as contagens de fibras e tubos foram refeitas (`72 ÷ 12 = 6 tubos`, `fibra 27 = tubo 3 (27 − 24 = 3)`, `tubo 2 × 12 + 4 = fibra 28`, `36 ÷ 6 = 6 tubos`, `fibra 14 em tubos de 6 = tubo 3, 2ª fibra (amarelo)`).
- **Ferramenta de código de cores (`cores.ts`) e diagramas:** conferidos contra as fichas da Prysmian (`prysmian-cfoa-as`, `prysmian-duto`), Transcend (`transcend-as`), Furukawa (`furukawa-et02719`) e FOA (`foa-cores`), além dos prints em 390 px e 1440 px nos temas claro, escuro e sol.
- **Nome da empresa, dados pessoais e analogias com a rede elétrica:** nenhum nos arquivos do módulo 3.

## Ajustes

| # | Arquivo e trecho | Escrito | O que a fonte diz (item + trecho) | Correção aplicada |
| --- | --- | --- | --- | --- |
| A1 | `content/licoes/03-01.md:19,22,28,39` | Modelo de gravação da capa sem o bloco `xxxx` da ordem de produção; contagem de fibras sem citar o zero à esquerda (`012FO`) nem a grafia `F` usada por outros fabricantes (`72F`); cabos de duto citavam apenas `DD`, sem `DDR`. | Prysmian, ficha *CFOA-SM-AS80-S / AS120-S* (`prysmian-cfoa-as`, p. 4): `< COMPRIMENTO > m PRYSMIAN FIBRA OPTICA CFOA-SM-AS80-S <nº de fibras>FO NR MES/ANO xxxx - LOTE: <N.º LOTE> - ANATEL: <nº homologação>` (e na tabela de pedido: `012FO`, `036FO`, `072FO`, `144FO`). Transcend (`transcend-as`, p. 3): `CFOA-SM-AS80-G 72F NR`. Furukawa (`furukawa-et02719`, p. 1): `CFOA-SM-DD-S` e `CFOA-SM-DDR-S` (duto com proteção contra roedores). | Incluir `xxxx` (código da ordem de produção) no modelo de gravação, explicar `012FO` e `72F`, e acrescentar `DDR` nos códigos de instalação. |
| A2 | `content/licoes/03-03.md:27,31` e `content/fontes.json:70` (`foa-cores`) | Na tabela das 12 cores, a posição 5 da TIA-598 trazia apenas `Cinza` e a 11 apenas `Rosa`, sem os nomes originais da tabela da FOA (*Slate* e *Rose*). | FOA, *Color Codes* (`foa-cores`): tabela TIA-598 lista `5 Slate` e `11 Rose` (e para cabos/conectores internos lista `Aqua` para OM3/OM4, `Lime Green` para OM5 e `Black` em OM2). | Incluir `Cinza (*slate*)` na posição 5 e `Rosa (*rose*)` na 11 em `03-03.md`, e completar a observação de `foa-cores` em `fontes.json`. |
| A3 | `content/licoes/03-04.md:13,18-29,39` | Descrevia apenas o esquema piloto/direcional para tubos 13+ e não explicava como a TIA-598 identifica tubos 13 a 48 nem como se diferenciam fibras quando um mesmo tubo tem mais de 12 fibras. | FOA (`foa-cores`): *"For cables with more than 12 tubes, tubes 13-24 typically are Blue with Black tracer, Orange with Black tracer, etc., 25-36 use an orange tracer, 37-48 use a green tracer"* e fitas (*binder tape*) para grupos acima de 12 fibras num mesmo tubo. Furukawa (`furukawa-et02719`, p. 2): nas fibras 13 a 24 do mesmo tubo, repete as 12 cores com **um traço preto** (exceto a preta, que recebe **traço branco**). | Acrescentar em `03-04.md` a regra de listras da TIA-598 para tubos 13 a 48, a marcação das fibras 13+ num mesmo tubo (traço preto/branco na Furukawa ou fitas na TIA-598) e os termos em inglês `FRP (*fiber reinforced plastic*)` e `enchimentos (*fillers*)`. |
| A4 | `src/ferramentas/cores/cores.ts:108-114` e `src/ferramentas/cores/cores.test.ts` | No modo `piloto`, `descreverTubo` retornava apenas `Natural (branco)` para qualquer tubo `≥ 3`, inclusive a partir do 13º. | Prysmian, ficha *CFOA-SM-DD/G* (`prysmian-duto`, p. 2): *"A partir do 13º tubo loose, é utilizado o código de marcação tipo anéis."* | Retornar `marcacao: 'anéis'` quando `esquemaTubos === 'piloto'` e `tubo >= 13`, com teste unitário em `cores.test.ts`. |
| A5 | `content/licoes/03-07.md:27-49`, `content/questoes/03-07.json:55-68` e `content/glossario.json` (`upc`, `apc`, `pto`) | `03-07.md` trazia apenas os valores da FOA (`−40 a −50 dB` para UPC e `−60 dB ou melhor` para APC), enquanto `06-03.md` trazia os valores da ficha da VIAVI (`−50 a −59 dB` para par UPC e `−65 a −76 dB` para par APC); na cor de conectores multimodo, citava apenas `bege` (`foa-conectores`) sem mencionar `preto` (OM2), `água` (OM3/OM4) e `verde-limão` (OM5) de `foa-cores`; na PTO, descrevia apenas a roseta doméstica de 1 ou 2 adaptadores, enquanto a ficha `nazda-pto` é uma caixa de terminação interna de corredor para até 8 fibras. | FOA (`foa-reflectancia`): `PC −30 a −40 dB`, `UPC −40 a −50 dB`, `APC −60 dB ou melhor`. VIAVI (`viavi-otdr-dicas`, p. 1): par acoplado `UPC −50 a −59 dB`, `APC −65 a −76 dB`. FOA (`foa-conectores` vs `foa-cores`): `Beige` tradicional na TIA-568 e `Black`/`Aqua`/`Lime Green` nas gerações OM2/OM3-OM4/OM5. Nazda (`nazda-pto`, p. 1): caixa interna de parede para distribuição vertical em corredor (até 8 fibras SC). | Mostrar lado a lado as duas referências de refletância (FOA e VIAVI) em `03-07.md`, `03-07.json` e `glossario.json`; incluir as cores multimodo OM2/OM3-OM4/OM5; e distinguir no texto e no glossário a PTO doméstica (roseta de 1–2 portas) da caixa de corredor para até 8 fibras da ficha `nazda-pto`. |
| A6 | `content/licoes/06-03.md:54` e `content/fontes.json:152` (`foa-otdr`) | Em `06-03.md`, o texto usava `**Leitor de OTDR**` em negrito em vez da marcação `{{ferramenta:otdr|Leitor de OTDR}}`; em `fontes.json`, a observação de `foa-otdr` não listava explicitamente os ~1% de fibra a mais e o limite de ~250 m. | Especificação (`docs/especificacao.md`): links para ferramentas no corpo das lições usam `{{ferramenta:id|texto}}`. FOA (`foa-otdr`): *"around 1% more fiber than the cable length"* e *"more than approximately 250 meters"*. | Trocar para `{{ferramenta:otdr|Leitor de OTDR}}` em `06-03.md` e completar a observação de `foa-otdr` em `fontes.json`. |
| A7 | `src/diagramas/TubosPiloto.tsx:75-80` | Legenda inferior direita (`1 verde (piloto), 2 amarelo (direcional)`) centrada em `x=300` num `viewBox` de `400 px` de largura ultrapassava os `200 px` disponíveis e cortava o final de `(direcional)` na borda direita em 390 px e 1440 px. | — (revisão visual em 390 px e 1440 px nos temas claro, escuro e sol) | Quebrar a legenda em `1 verde (piloto), 2 amarelo` (linha 1) e `(direcional) e brancos a seguir` (linha 2), mantendo folga nas duas margens. |

## Sugestões aplicadas

1. **Termos em inglês na primeira menção (regra do conteúdo):** incluídos `(*self-supporting*)`, `(*loose*)`, `(*tight*)` e `(*low smoke zero halogen*)` em `03-01.md`; `(*fiber reinforced plastic*)` e `(*fillers*)` em `03-04.md`; e `(*physical contact*)`, `(*ultra physical contact*)`, `(*angled physical contact*)` e `(*optical distribution frame*)` em `03-07.md`.
2. **Alinhamento entre módulos 2, 3 e 6:** `03-07.md` agora referencia `viavi-otdr-dicas` e `foa-cores` além de `foa-reflectancia` e `foa-conectores`, mantendo os números de refletância e as cores TIA-568/TIA-598 consistentes em todo o app.

## Não conferidos (e por quê)

1. **Normas ABNT NBR 14160, NBR 14566, NBR 14773 e ANSI/TIA-598, ANSI/TIA-568, TIA-604 / FOCIS (textos originais, pagos):** conferidas pelas fichas técnicas da Prysmian (`prysmian-cfoa-as`, `prysmian-duto`), Transcend (`transcend-as`) e Furukawa (`furukawa-et02719`) e pelas páginas técnicas da FOA (`foa-cores`, `foa-conectores`, `foa-reflectancia`).

## Conferidos (lista curta por arquivo)

### Lições
- **03-01.md:** gravação a cada 1 metro com comprimento acumulado (`prysmian-cfoa-as`, `prysmian-duto`); modelo completo da gravação na capa (`prysmian-cfoa-as` p. 4); decomposição da sigla `CFOA-SM-AS80-S 36FO NR` e variantes `AS120`/`AS200`, `DD`/`DDR`, `G`/`S`, `72F`/`012FO`, `NR`/`RC`/`LSZH` (`prysmian-cfoa-as`, `transcend-as`, `furukawa-et02719`); número de homologação ANATEL e número de lote na capa (`prysmian-cfoa-as`, `transcend-as`, `furukawa-et02719`).
- **03-03.md:** tabela das 12 cores ABNT (Verde, Amarelo, Branco, Azul, Vermelho, Violeta, Marrom, Rosa, Preto, Cinza, Laranja, Acqua) e TIA-598 (Azul, Laranja, Verde, Marrom, Cinza/*Slate*, Branco, Vermelho, Preto, Amarelo, Violeta, Rosa/*Rose*, Acqua) conferida posição por posição com `prysmian-cfoa-as`, `transcend-as`, `furukawa-et02719` e `foa-cores`; branco na posição 3 (ABNT) e 6 (TIA-598) e vermelho na 5 (ABNT) e 7 (TIA-598); conta de tubo e fibra (`fibra = (tubo − 1) × fibras_por_tubo + posição`).
- **03-04.md:** elemento central dielétrico FRP e enchimentos (`prysmian-cfoa-as`, `furukawa-et02719`); esquema de tubos coloridos e listras para tubos 13+ (`furukawa-et02719`, `foa-cores`); esquema piloto (verde = 1) e direcional (amarelo = 2) + naturais (brancos) e marcação por anéis a partir do 13º tubo (`prysmian-cfoa-as`, `prysmian-duto`, `transcend-as`); inversão do sentido horário/anti-horário nas duas pontas do mesmo lance; marcação de fibras 13 a 24 num mesmo tubo (`furukawa-et02719`, `foa-cores`).
- **03-07.md:** conectores SC (`2,5 mm`, *push-pull*), LC (`1,25 mm`, trava tipo RJ-45, SFP) e FC (`2,5 mm`, rosca) (`foa-conectores`, `fs-gpon-olt`, `extreme-sfp-bx10`); polimentos PC (`−30 a −40 dB`), UPC (`−40 a −50 dB` na FOA; `−50 a −59 dB` em par acoplado na VIAVI) e APC a `8°` (`−60 dB ou melhor` na FOA; `−65 a −76 dB` em par acoplado na VIAVI) (`foa-reflectancia`, `viavi-otdr-dicas`); proibição de acoplar APC com UPC (`fluke-apc`, `foa-conectores`); cores azul (UPC), verde (APC) e bege/preto/água/verde-limão (multimodo) (`foa-conectores`, `foa-cores`); caminho DIO → CEO → CTO → PTO e diferença entre pigtail e patch cord (`intelbras-ftth`, `intelbras-cto`, `intelbras-dio`, `nazda-pto`, `foa-conectores`).

### Questões, glossário, diagramas e ferramenta de cores
- **03-01.json, 03-03.json, 03-04.json e 03-07.json (32 questões):** gabaritos únicos e corretos, explicações em todas as alternativas.
- **Glossário e perguntas para a empresa (`a13`, `a14`):** termos conferidos contra as fontes e ligados nas lições.
- **Ferramenta de código de cores (`cores.ts`, `TelaCores.tsx`) e diagramas (`GravacaoCabo`, `DozeCores`, `TubosPiloto`, `UpcApcCaixas`):** cores, posições, contagens e marcações de tubo conferidas e validadas nos testes unitários e E2E.

## Fontes consultadas (07/11/2026)

- Prysmian CFOA-SM-AS80-S / AS120-S (PDF integral extraído): https://br.prysmian.com/sites/default/files/atoms/files/Folha_de_Dados_CFOA_SM_AS80-S_e_AS120-S_0.pdf
- Prysmian CFOA-SM-DD/G (PDF integral extraído): https://br.prysmian.com/sites/default/files/atoms/files/CFOA-SM-DD-G_0.pdf
- Transcend CFOA-SM-AS80/120/200-G (PDF integral extraído): https://transcend.com.br/wp-content/uploads/2020/03/Cabo-%C3%93ptico-CFOA-SM-AS-G-6F-a-72F.pdf
- Furukawa ET02719 CFOA-SM-DD-S / DDR-S (PDF integral extraído): https://www.alldata.com.br/arquivos/produtos/arquivos/et02719-pt_1481554802.pdf
- Intelbras Infográfico FTTH (PDF integral extraído): https://backend.intelbras.com/sites/default/files/2020-02/Infografico_FTTH.pdf
- Intelbras Caixa de Terminação Óptica CTO 1612 (PDF integral extraído): https://backend.intelbras.com/sites/default/files/2019-06/Datasheet_Caixa_de_terminacao_optica_v6.pdf
- Intelbras DIO 24 fibras (PDF integral extraído): https://backend.intelbras.com/sites/default/files/2023-03/Datasheet-DIO-24-FO-A4-01-23.pdf
- Nazda PTO 8 fibras (PDF integral extraído): https://www.nazda.com.br/assets/uploads/produtos/11/612ff9103dd1e.pdf
- FOA Color Codes (HTML integral): https://www.thefoa.org/tech/ColCodes.htm
- FOA Connectors (HTML integral): https://www.thefoa.org/tech/connID.htm
- FOA Reflectance / ORL (HTML integral): https://www.thefoa.org/tech/ref/testing/test/reflectance.html
- Fluke APC × UPC (HTML integral): https://www.flukenetworks.com/blog/cabling-chronicles/what-happens-when-you-connect-apc-connector-upc-connector
