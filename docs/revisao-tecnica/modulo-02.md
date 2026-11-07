# Revisão técnica — módulo 2 (fibra) e ferramentas ópticas

Revisor técnico independente (não escreveu o conteúdo) · 07/11/2026.
Versão revisada: branch `fase-3-modulo-02`, commit `4aecd4c`. Nada foi editado no repositório durante a revisão.
Escopo: lições 02-01 a 02-07; 56 questões (02-01 a 02-07); 26 termos do glossário ligados a 02-xx; 24 fontes novas do `fontes.json`; `potencia.ts` e `potencia.test.ts`; `TelaOrcamento.tsx`; `TelaConversor.tsx`; `cores.ts`, `cores.test.ts` (e o texto de `TelaCores.tsx`); diagramas EspectroBandas, RaiosCurvatura, CausasPerda, EscadaDbm e FibraCamadas.

## Resumo (contagens)

| Severidade | Quantidade |
| --- | --- |
| ERRO | 4 |
| AJUSTE | 20 |
| SUGESTÃO | 18 |
| Não conferidos | 7 |

- **Questões:** nas 56, a alternativa marcada como correta é a certa. Refiz todas as contas; nenhuma conta errada nas questões.
  - Única ressalva sobre "resposta única": na 02-05-q1, a alternativa XGS-PON não é impossível, porque o plano opcional do XGS-PON usa 1490/1310 (A4). A resposta GPON continua sendo a melhor.
  - Pedem ajuste de explicação, enunciado ou fonte (12 questões): 02-01-q5, 02-01-q7, 02-02-q6, 02-02-q7, 02-03-q8, 02-04-q2, 02-05-q1, 02-05-q6, 02-06-q1, 02-06-q2, 02-06-q5 e 02-06-q8.
  - Têm sugestões: 02-01-q6, 02-04-q7 e 02-06-q4.
- **Contas das ferramentas:** refiz em Python o exemplo padrão do orçamento, os 6 casos de `potencia.test.ts`, as conversões dBm↔mW e as perdas ideais dos splitters. Todas batem com o código. Os problemas estão nos dados e no método: E1, E3 e A1.
- **Normas em vigor em 07/11/2026 (páginas da ITU):** G.652 (08/24) em vigor, e o app usa essa edição. **G.657 (08/24) em vigor**, mas o app usa o folheto de 2013, que trata da edição de 2012 (ver E2). **G.Sup39 (10/25) em vigor**, mas o app cita a de 02/2016 por cópia de terceiro; o conteúdo usado não mudou (ver A19). G.984.2 (08/19) em vigor.
- **Validador de conteúdo** (`node scripts/validar-conteudo.mjs`, rodado na cópia): 0 erros e 0 avisos.
- **Nome da empresa, dados pessoais e analogias com a rede elétrica:** nenhum nos arquivos do módulo 2. Fora do escopo, só para registro: o currículo cita "Roraima" (07-07) e uma mensagem de commit cita o fuso de Boa Vista. É apenas a região, sem nome de empresa.

## Erros

| # | Arquivo e trecho | Escrito | O que a fonte diz (item + trecho) | Correção proposta |
| --- | --- | --- | --- | --- |
| E1 | `src/ferramentas/optica/potencia.ts:39`. O valor aparece na tabela "Máximo de ficha" de `TelaConversor.tsx` e no seletor de splitter do orçamento. | 1:32 → `maximo: 17.0`, `fonte: 'senko-plc'` | SENKO, "1xN PLC Splitter", tabela Specifications: "Insertion Loss Max. (dB): 4; 7.4; 10.7; 13.7; 16.9; 21" (nota 1: "without connectors"). A observação do próprio `fontes.json` (senko-plc) diz 16,9. Outras fichas: Intelbras "≤ 16.9 dB"; FS "≤17.3". Nenhuma traz 17,0. | `maximo: 16.9` (SENKO). Se a intenção for o pior caso entre fichas, usar 17.3 com `fonte: 'fs-plc'`. |
| E2 | `content/licoes/02-04.md:43` (linha "G.657.B2 / 7,5 mm / Compatível") e `diagrama_descricao` da mesma lição; `src/diagramas/RaiosCurvatura.tsx:11` ("G.657.A2 e B2: 7,5 mm"); `content/questoes/02-04.json:46` (explicação da q2: "A2 e B2: 7,5 mm"); observação de `itu-g657-folheto` | A B2 aparece como um tipo atual da G.657, "compatível" com a G.652.D. | ITU-T G.657 (08/2024), em vigor (a página da ITU diz "G.657 (08/24) In force"). Resumo: "…merges category B2 into category A2". Change log, ed. 5.0: "Merged category B2 into Category A2". Tabela 2, Nota 3: "G.657.B2 fibre had been specified in the previous Recommendation G.657 which had same requirement for macrobending loss as A2 fibre". Hoje a categoria B tem só a B3 (5 mm). O folheto citado é de 10/2013 e trata da edição de 2012. | Tirar a B2 da tabela e do diagrama, ou deixar uma nota: "existiu até a edição de 2016; em 2024 foi fundida na A2; fichas antigas ainda escrevem 'A2/B2'". Criar a fonte `itu-g657-2024` (https://www.itu.int/rec/T-REC-G.657-202408-I/en) e manter o folheto só pela figura. Explicação da q2: "A2: 7,5 mm; B3: 5 mm". O objetivo da lição (A1, A2, B3) já está certo. |
| E3 | Orçamento de potência: `potencia.ts:149` (`orcamentoDisponivel = e.txMin - e.sensibilidade`, sem penalidade), com o preset `gpon-bplus`, que é também o exemplo padrão de `TelaOrcamento.tsx:26-44` | Orçamento da GPON B+ = 1,5 − (−27) = **28,5 dB**. Exemplo padrão: perda 24,9 dB, margem 3 dB, folga 0,6 dB → "PASSA". | G.984.2 (08/2019), Anexo A. Tabela A.1 (B+): OLT "Mean launched power MIN +1.5"; ONU "Minimum sensitivity −27"; "Downstream optical penalty 0.5 dB". Tabela A.2: "Maximum optical loss at 1 490 nm 28 dB". A ficha FS da ONU, que é a fonte do preset, diz "28 dB link budget; Class B+". Descontada a penalidade, a folga do exemplo padrão cai para **0,1 dB**. | Criar o campo "Penalidade óptica (dB)" e descontá-lo do orçamento: 0,5 dB no preset GPON B+ (G.984.2, Tabela A.1). No BX10, a ficha Extreme traz "Maximum transmitter and dispersion power penalty 3.3 dB". Outra opção: mostrar o orçamento de classe (28 dB) quando o preset for B+. Ajustar também o teste "GPON B+ com dois 1:8" (orçamento 28,0). |
| E4 | `content/licoes/02-01.md:18` | "Uma fibra óptica é um fio de **vidro** mais fino que um fio de cabelo." | FOA, "Optical Fiber", seção Fiber Types: "Most glass fibers are 125 microns in outside diameter … 125 microns is 0.005 inches- a bit larger than the typical human hair." | "…um fio de vidro da espessura de um fio de cabelo (o vidro tem 125 µm, um pouco mais grosso que um cabelo típico)." |

## Ajustes

| # | Arquivo e trecho | Escrito | O que a fonte diz (item + trecho) | Correção proposta |
| --- | --- | --- | --- | --- |
| A1 | Teste de saturação: `potencia.ts:151,154` (`recebidaMax = txMax − perdaTotal`, usando as mesmas perdas **máximas** de ficha) e a linha "Chega no receptor (Tx máxima)" de `TelaOrcamento` | Confere a sobrecarga usando as perdas máximas (splitter de ficha, 0,75 dB por conector etc.). | G.984.2, Tabela A.2: "Minimum optical loss at 1 490 nm 13 dB". A classe B+ exige uma perda mínima justamente por causa da sobrecarga de −8 dBm (Tabela A.1). O pior caso de saturação é Tx máxima com perda **mínima**. Exemplo: 1 km com um 1:8. Com as perdas de ficha (15,9 dB), chegam −10,9 dBm e passa. Com as perdas ideais (≈10,5 dB), chegam ≈−5,5 dBm e o receptor satura. | Calcular `recebidaMax` com perdas mínimas: splitter ideal 10·log₁₀N e fibra, conector e fusão em zero ou no mínimo. No preset B+, avisar também quando a perda ideal ficar abaixo de 13 dB. |
| A2 | Regra TIA-598 acima de 12 aplicada às **fibras**: `cores.ts:70-73`, via `localizar()` → `identificar(cfg.padrao, fibraNoTubo)` com 24 fibras por tubo; texto de `TelaCores.tsx:206`; observação de `foa-cores` | Fibras 13–24 do tubo com "faixa preta" (amarela na preta), 25–36 com laranja e 37–48 com verde, atribuído à FOA | FOA, "Fiber Optic Cable and Connector Color Codes": "**Buffer tubes** follow the same color sequence up to 12 tubes, then tubes 13-24 will repeat the colors with a black stripe (black will have a yellow stripe), tubes 25-36 … orange stripe, 37-48 use a green stripe… Tubes containing more than 12 fibers will use binder tape to separate fibers into groups." A regra vale para os tubos. Para tubos com mais de 12 fibras, a FOA fala em grupos separados por fita. | No modo TIA, marcar as fibras 13–24 de um mesmo tubo como "confirmar na ficha (a FOA cita grupos com fita)", ou citar a TIA-598-D original. Corrigir a tela e a observação do `fontes.json` para "nos tubos". |
| A3 | Subida do GPON: `02-05.md:36` "(1300–1320)"; `glossario.json:760` (termo gpon); `02-05.json:10` (explicação da q1); `fontes.json:207` | Subida do GPON = 1300–1320 nm | G.984.2 (08/2019), 8.2.5.2: "The operating wavelength range for the upstream direction shall be 1 260-1 360 nm". Apêndice V (informativo), Tabelas V.1 (classe C+) e V.2 (classe D): "Upstream wavelength range 1 290-1 330 [ITU-T G.984.5]". O folheto citado diz "1300 to 1320 nm (plus other options)". A ficha FS da ONU, também citada, transmite em "1290 / 1310 / 1330" nm (mín./típ./máx.). | "Subida em torno de 1310 nm (faixa da G.984.2: 1260–1360 nm; há opções mais estreitas, 1290–1330 e 1300–1320 nm, para convivência com outras PON)". |
| A4 | `02-05.md:48`; q1 de `02-05.json` (explicação da alternativa B) | "Quando um provedor fala em '1490 e 1310', é GPON". Alternativa B: "XGS-PON desce em 1575–1580 e sobe em 1260–1280 nm". | Folheto G.9807: "The optional wavelength plan contains downstream wavelength band of 1480 to 1500 nm, and … upstream wavelength band of 1300 to 1320 nm". Ficha FS da OLT GPON, lista de pedidos: "ESFP-43-20 1.25G EPON … 1490nm-TX/1310nm-RX". Extreme BX10: "Wavelength 1310 nm and 1490 nm". | "…quase sempre é GPON. O EPON e o BX10 ponto a ponto também usam 1490/1310, e o XGS-PON tem um plano opcional nessas faixas." Na q1, alternativa B: "no plano básico, o XGS-PON…". A resposta certa (GPON) continua valendo. |
| A5 | "Média medida em redes reais": `02-06.md:32`; `02-06.json:41` (q2); q8 de `02-06.json` (enunciado e linha 229); `CausasPerda.tsx:33` | Média de "redes reais" | G.Sup39, logo antes da Tabela 10-4 (igual em 02/2016 e 10/2025): "based on OTDR link measurement of the core network of the same network operator… two 60 km lengths of 216 ITU-T G.655 fibres, and the same lengths of 55 ITU-T G.652 fibres". Valores da G.652, "Fitted attenuation": 0.341 (1310) e 0.194 (1551). | "Média medida no núcleo de rede de **uma** operadora (duas rotas de 60 km, 55 fibras G.652) — G.Sup39, Tabela 10-4". |
| A6 | Diâmetro do campo modal: `02-02.md:36`; `02-02.json:192` (q7) | "o '9' é o núcleo, mas a luz ocupa uma área um pouco maior… Na G.652.D, ele fica entre 8,6 e 9,2 µm". Na q7: "A ficha da G.652.D fala em… 8,6 a 9,2 µm". | G.652 (08/2024), Tabela 2: "Mode field diameter… Range of nominal values 8.6-9.2 µm; Tolerance 0.4 µm". O valor real pode ir de 8,2 a 9,6 µm; a ficha Prysmian traz "9.2 ± 0.4". FOA: "Singlemode fiber has a core diameter of 8-10 microns, specified as 'mode field diameter,' the effective size of the core". O texto também se contradiz: diz que o campo é "um pouco maior" que 9 µm e dá uma faixa que começa abaixo de 9. | "Na prática, o '9' é o diâmetro do campo modal (a área por onde a luz anda), um pouco maior que o núcleo de vidro. A G.652.D fixa o valor nominal entre 8,6 e 9,2 µm em 1310 nm, com tolerância de ±0,4 µm." Na q7: "A G.652.D fixa…" (é a norma, não uma ficha). |
| A7 | `02-07.md:32`; `TelaConversor.tsx:75` | "sensibilidade **típica** de uma ONU GPON B+" (−27 dBm) | G.984.2, Tabela A.1: ONU "Minimum sensitivity −27 dBm" (é um requisito). Na ficha FS da ONU, −27 está na coluna "Max.". | "sensibilidade especificada (pior caso) de uma ONU GPON B+". |
| A8 | Faixa de 1260 a 1310 nm: `02-04.md:57` ("Fora disso, o máximo é 0,40") e a tabela da G.652.D em 02-04, que não traz a Nota 2 | 0,40 em tudo que fica fora de 1530–1565 nm | G.652, Tabela 2, Nota 2: "This wavelength region can be extended to 1260 nm by adding 0.07 dB/km induced Rayleigh scattering loss to the attenuation value at 1310 nm", o que dá 0,47. A ferramenta já mostra 0,47 em 1270 nm (subida do XGS-PON), mas a lição não explica. | "De 1310 a 1625 nm, o máximo é 0,40; de 1260 a 1310 nm, 0,47 (Nota 2). É o caso da subida do XGS-PON, em 1270 nm." Acrescentar essa linha à tabela. |
| A9 | `02-03.md:25,30` | Coluna "Alcance de exemplo (10GBASE-SR)" com "OS1 / OS2 … quilômetros" | Fluke: o alcance do 10GBASE-SR só aparece para OM1–OM5 (33/82/300/400 m). O 10GBASE-SR é multimodo, em 850 nm. | Na linha OS: "não se aplica (SR é multimodo); 10GBASE-LR: 10 km". Ou renomear a coluna para "Alcance de exemplo (10 Gbit/s)". |
| A10 | `02-03.md:50` | "**LX** e **LR** (1310 nm) são para monomodo" | Juniper CTP-SFP-1GE-LX: "Distance 10 km / 550 m / 550 m"; "An offset-launch mode-conditioning patch cord is required for MMF operation of 1000BASE-LX." | "O LR é só monomodo. O LX é usado em monomodo, mas também roda em multimodo até 550 m com cordão condicionador de modo." |
| A11 | `02-02.md:21` ("A norma da fibra monomodo comum fixa 125,0 ± 0,7 µm"); `02-01.json:139` (q5: "A G.652 fixa…") | Tolerância de ±0,7 µm atribuída à G.652 inteira | G.652 (08/2024): Tabela 2 (G.652.D) "Cladding diameter Nominal 125.0 / Tolerance 0.7"; Tabela 1 (G.652.B) "Tolerance 1". Histórico de 2024: "In Table 2 (G.652.D) the cladding diameter tolerance has been tightened". A ficha Prysmian de 2021, citada na mesma lição, traz "125.0 ± 1.0". | "A G.652.D, edição de 2024, fixa 125,0 µm com tolerância de ±0,7 µm (fichas e edições anteriores: ±1 µm)." |
| A12 | Tabela de `02-04.md` ("garante, no **cabo**"), linha "Curvatura (100 voltas de raio 30 mm)" | A macrocurvatura aparece como atributo do cabo. | G.652, Tabela 2: "Macrobending loss" está em "Fibre attributes"; a atenuação está em "Cable attributes". | Separar: "No cabo: atenuação…; na fibra: macrocurvatura…". |
| A13 | Invisibilidade sem fonte: q7 de `02-01.json` (fonte foa-fibra); q6 de `02-05.json` (fontes itu-gsup39 e foa-fibra); `glossario.json:660` (termo comprimento-de-onda, fonte itu-gsup39) | "1310/1550 nm é infravermelho, invisível" | Nem a página "Optical Fiber" da FOA nem a G.Sup39 falam de visibilidade. A página "Safety" da FOA fala: "Since the light is infrared, you can't see it, which means you cannot tell if there is light present by looking at it." | Criar a fonte `foa-seguranca` (https://www.thefoa.org/tech/safety.htm) e usá-la nessas duas questões e no termo. |
| A14 | `02-06.md:38`; q1 e q5 de `02-06.json` (fonte itu-gsup39) | "Uma fusão ruim, ao contrário, perde parecido nos dois. Esse contraste ajuda a separar curvatura de emenda no OTDR." | A G.Sup39 só sustenta que a perda por curvatura "generally increases with wavelengths above 1550 nm". A página "OTDR" da FOA diz: "since fiber is more sensitive to stress at longer wavelengths, this allows finding stress points caused by installation". Nenhuma fonte citada diz que a fusão "perde parecido". | Citar a página "OTDR" da FOA (https://www.thefoa.org/tech/ref/testing/OTDR/OTDR.html) e uma fonte para o comportamento da fusão, ou suavizar para "costuma perder parecido". |
| A15 | "Tight buffer em cordões e cabos internos": `02-02.md:32`; q6 de `02-02.json` (fonte prysmian-tight-buffer); `glossario.json:582` | Uso em cordões e cabos internos atribuído à Prysmian | A ficha Prysmian Tight Buffer só diz: "dual acrylate primary coating to nominally 245µm and a secondary LSOH or PVC buffer to 900µm… versatile, and robust buffering system". A FOA (Color Codes) cita "pigtails with 900 micron buffer fibers" e "900 micron tight buffer fiber" em cabos breakout. | Acrescentar `foa-cores` (ou a página de cabos da FOA) como fonte do uso. |
| A16 | q8 de `02-03.json` (fonte: só fluke-om-os) | "OS2 é uma classe de cabo (TIA/ISO); G.652.D é a recomendação ITU da fibra usada nesses cabos" | A Fluke só diz que "the TIA adopted the nomenclature for fiber found in… ISO/IEC 11801… 'OS'". Quem liga a G.652.D ao OS2 são a ficha Prysmian ("ESMF, low water peak single mode fibre G652D, OS2") e a FOA ("(OS2, B1.2 or G.652)"). | Acrescentar `prysmian-g652d` e/ou `foa-fibra` às fontes da q8. |
| A17 | `TelaOrcamento.tsx:227` | "limites da TIA, 0,75 dB por par de conectores e 0,3 dB por fusão (Fluke)" | A página da Fluke citada só traz "the standard-grade loss value of 0.75 dB" e não fala de emenda. A FOA ("Loss Budget Estimates") traz "0.3 max per EIA/TIA 568" para a emenda. | Citar também `foa-loss-budget` para os 0,3 dB. |
| A18 | `EscadaDbm.tsx:20` | No ramo positivo, o rótulo sai "+2.5 dBm" (com ponto); a descrição da lição diz "+2,5". | — (formatação pt-BR) | Fazer a troca `.`→`,` também no ramo positivo, ou usar `toLocaleString('pt-BR')`. |
| A19 | `fontes.json`, `itu-gsup39` | G.Sup39 (02/2016), "cópia integral hospedada por terceiro" (mathscinotes.com) | Página da ITU: "G.Sup39 (10/25) In force"; "(02/16) Superseded". No PDF oficial de 10/2025, de graça, a Tabela 5-1, o parágrafo sobre as causas da atenuação e a Tabela 10-4 estão iguais aos citados. | Trocar para a fonte oficial em vigor: https://www.itu.int/rec/T-REC-G.Sup39-202510-I/en (10/2025). |
| A20 | `fontes.json`, `prysmian-cfoa-as` (observação) | "acréscimo de atenuação do cabeamento ≤ 0,05 dB/km" | Ficha Prysmian CFOA AS: "Ciclo térmico NBR 13510 … SM Δα ≤ 0.05 dB/km", com a nota "(1) Acréscimo ou variação de atenuação". É a variação no ensaio de ciclo térmico, não o acréscimo causado pelo cabeamento. | "Variação de atenuação ≤ 0,05 dB/km no ensaio de ciclo térmico (NBR 13510)". Não aparece nas lições, mas está na pesquisa. |

## Sugestões

1. **02-04-q7:** a premissa não se mede na prática. Um cordão de 3 m com 0,8 dB/km perde 0,0024 dB, abaixo da resolução de qualquer medidor. A G.657 (2024), Tabela 1, Nota 3, diz: "Due to the lack of accuracy in measuring the attenuation coefficient of a short cable, its value can be taken from that of the original longer donor cable." Trocar por algo como "um cabo interno de 300 m".
2. **CausasPerda.tsx** (verificado pelas coordenadas do código):
   - a curva passa por ≈0,17 dB/km em 1550 nm (0,34·(1310/1550)⁴), mas o marco está em 0,194;
   - o termo de curvatura sai pelo topo do gráfico entre ≈1620 e 1630 nm (acima de 0,71 dB/km) e cruza o rótulo "curvatura ↗" perto de x≈330;
   - o pico d'água desenhado chega a ≈0,43 dB/km em 1383 nm, acima do limite de 0,40 da G.652.D citado na mesma lição.

   Ajustar a escala e os coeficientes, ou pôr na legenda "fibra antiga".
3. **02-07 e EscadaDbm:** 7 dB em 20 km dá 0,35 dB/km. Escrever "em 1310 nm", porque em 1550 nm esse valor passa do máximo de 0,30 ensinado em 02-04 e 02-06.
4. **02-01.md:27:** "Esse cone tem o nome técnico de abertura numérica" → "a abertura numérica mede a abertura desse cone", como no glossário. FOA: "numerical aperture (the acceptance angle of light into the fiber)".
5. **Splitters:** a tabela mistura fabricantes (1:2 da Intelbras, 1:4 a 1:32 da SENKO, 1:64 da FS). Sugestão: mostrar a faixa entre fichas:
   - Intelbras: 4,0 / 7,3 / 10,5 / 13,7 / 16,9;
   - SENKO: 4 / 7,4 / 10,7 / 13,7 / 16,9 / 21;
   - FS: 4,4 / 7,6 / 10,9 / 13,9 / 17,3 / 21,4.

   Na dica sobre conectores, citar também a Intelbras ("≤ 0.3 dB – Class III"), além dos 0,2 dB da FS.
6. **XFSD (FBT):** a ficha Intelbras diz "comprimentos de onda de 1310 a 1550nm". A ferramenta deixa usar esses valores em 1270, 1577 e 1625 nm; vale um aviso.
7. **TIA-598, tubos 25–36 (faixa laranja) e 37–48 (faixa verde):** as posições 26 (laranja com faixa laranja) e 39 (verde com faixa verde) não se distinguem. A FOA não trata essa exceção; marcar como "confirmar na ficha".
8. **1625 nm:** a G.Sup39, Tabela 5-1, põe 1625 nm na fronteira entre L ("1565 to 1625") e U ("1625 to 1675"), e diz que a transmissão é "limited to less than or equal to 1625 nm". Em 02-05 e no EspectroBandas, citar 1650 nm como o comprimento de onda típico de teste em serviço na banda U.
9. **02-05, convivência GPON/XGS-PON:** o folheto G.9807 cita "blocking filters, loss budget for coexistence on a common ODN, and a combo OLT". Mencionar o filtro na ONU e o elemento de coexistência.
10. **02-05.md:54, "perigosas para o olho":** a FOA (Safety) diz "Light in the 1300-1550 nm range is unlikely to damage your retina, but might harm the cornea or lens" e "it's not a good idea to look into a fiber unless you know no source is being transmitted". Sugestão: "podem ferir o olho e, como são invisíveis, você não sabe se há luz".
11. **02-01-q6:** acrescentar "na fibra de telecom" ao enunciado. A FOA lembra que "some fibers are all plastic or a glass core and plastic cladding".
12. **02-02-q6, alternativa B:** a explicação "Não é exclusivo de OPGW" dá a entender que o OPGW usa tight buffer. O OPGW usa fibras de 250 µm dentro de tubo (em geral, metálico). Sugestão: "O OPGW usa fibras de 250 µm em tubo; o 900 µm é de cordões e cabos internos".
13. **Glossário:** alguns termos têm `licoes` 02-xx, mas a lição não usa `{{termo:}}` para eles:
    - núcleo e casca (02-02);
    - G.652.D (02-06);
    - bandas ópticas, GPON e XGS-PON (02-05);
    - splitter, sensibilidade, sobrecarga e orçamento de potência (02-07).

    A lição 02-07 nem trata de splitter; ligar esse termo a 04-03/04-04.
14. **`fontes.json`, `omada-link-budget`:** a página diz "1490/1550/1577 nm: ~0.30 dB/km", o que contraria a Tabela 2 da G.652 e a lição 02-04. Registrar na observação "usar só para a margem".
15. **`fontes.json`, `foa-db`:** "perdas em dB se somam" não está escrito na página de dB; está na página "Loss Budget" da FOA ("summing them up"). A FOA também escreve a perda medida como número negativo ("−2.3 dB… convention has us saying the loss is a positive number"). A lição usa a convenção positiva, e corretamente; vale uma nota.
16. **02-04.md:31, "libera toda a faixa de 1260 a 1625 nm":** a G.652 diz "allows transmissions in portions of an extended wavelength range from 1260 nm to 1625 nm".
17. **02-06-q4:** a explicação poderia dizer que o 0,22 da ficha também é um máximo garantido para aquele cabo (Prysmian: "Maximum attenuation value of cable at 1550 nm ≤ 0.22"). O máximo da norma é o mais seguro quando o cabo ou os reparos futuros não são conhecidos.
18. **02-04, "perde menos":** dar os números da norma. G.657 (2024), Tabelas 1 e 2:
    - A1, raio de 10 mm, 1 volta: ≤ 0,75 dB em 1550 nm e ≤ 1,5 dB em 1625 nm;
    - A2, 7,5 mm: ≤ 0,5 / 1,0 dB;
    - B3, 5 mm: ≤ 0,15 / 0,45 dB.

## Não conferidos (e por quê)

1. **Corning SMF-28 Ultra (PI-1424):** não conferido (bloqueado). O proxy recusou `csmedia.corning.com` (502). Serviria de apoio extra para "núcleo de ~8,2 µm × campo modal de 9,2 µm" (A6). A correção proposta se apoia na G.652 e na FOA.
2. **TIA-598-D (texto original, pago):** a regra exata para as fibras 13–24 de um mesmo tubo e as exceções nas posições 26 e 39 (A2, sugestão 7) foram conferidas só pela FOA.
3. **Normas ABNT de cabo e código de cores (NBR 14773 e outras):** texto pago. A ordem brasileira foi conferida só nas fichas (Furukawa ET02719 v7, Prysmian CFOA AS, Transcend AS).
4. **IEEE 802.3, cláusulas 38 e 59** (LX e BX10: penalidades e perda de canal): não consultadas. Os presets foram conferidos nas fichas de fabricante citadas.
5. **G.984.5 e G.9807.1 (textos completos):** não baixados. Usei os folhetos e a G.984.2 (08/2019).
6. **Diagramas renderizados:** não abri o app. A sobreposição em CausasPerda e o "+2.5" em EscadaDbm foram deduzidos do código e das coordenadas.
7. **Testes unitários (vitest):** não executados, para não gravar cache dentro do `node_modules` do repositório. Recalculei em Python todos os valores esperados, e eles batem.

## Conferidos (lista curta por arquivo)

### Lições

- **02-01.md**
  - Núcleo e casca de vidro, índice do núcleo maior, reflexão interna total. FOA: "The core is designed to have a higher index of refraction… than the cladding, which causes 'total internal reflection'".
  - Casca de 125 µm. G.652, Tabela 2: "Cladding diameter Nominal 125.0".
  - Cone de entrada. FOA: "numerical aperture (the acceptance angle of light into the fiber)".
  - Perda por curvatura. FOA: "Stress causes light to exit the core of the fiber causing loss".
- **02-02.md**
  - 9/125, 50/125 e 62,5/125 em µm. FOA: "core/cladding diameters expressed in microns"; "only about 9 microns"; "almost always 50 or 62.5 microns".
  - Revestimento. Prysmian: "Primary coating diameter… 245 ± 10".
  - Tight buffer. Prysmian TB: "Tight buffer diameter 900 ± 50".
  - Decapagem. FOA: "The buffer is what one strips off the fiber for termination or splicing".
  - Emenda de 250 com 900 µm. FOA Color Codes: "250 micron buffer fiber are spliced to pigtails with 900 micron buffer fibers".
- **02-03.md**
  - Núcleos OM1 de 62,5 µm e OM2–OM5 de 50 µm (FOA OM).
  - 10GBASE-SR: 33/82/300/400 m (Fluke).
  - Limites TIA: OS 0,5 dB/km externo e 1,0 interno; multimodo 3,0–3,5 dB/km em 850 nm (tabela da Fluke).
  - Cores da capa. FOA, Tabela 3: "OM2… Orange", "OM1… Orange", "OM3, OM4… Aqua", "OM5… Lime Green", "OS1, OS1a, OS2… Yellow". Também: "Outdoor cables are generally black".
  - Sem dispersão modal na monomodo. FOA: "Since there is only one mode, there is no problem with modal dispersion".
- **02-04.md**
  - G.652, Tabela 2: 0.40 de 1310 a 1625 nm; 0.40 em 1383 ± 3 nm após envelhecimento por hidrogênio; 0.30 de 1530 a 1565 nm; macrocurvatura com raio de 30 mm, 100 voltas e 0.1 dB em 1625 nm.
  - G.652, Nota 1: "should not be applied to short cables such as jumper cables, indoor cables and drop cables"; cabo interno a 1,0 dB/km.
  - G.657: A1 10 mm, A2 7,5 mm, B3 5 mm. Tipos A "compliant" e B "compatible" (folheto e G.657 de 2024).
  - "G.657.A fibres can be used for all networks where G.652.D fibres are specified" (G.657 de 2024, cláusula 1).
  - Tipo B "at the end of access networks, in particular inside buildings".
- **02-05.md**
  - Bandas O/E/S/C/L/U e seus nomes: G.Sup39, Tabela 5-1, igual em 02/2016 e 10/2025.
  - Banda U: "for possible maintenance purposes only, and transmission of traffic-bearing signals is not currently foreseen" (nota 4).
  - "Banda não diz o equipamento": "The definition of spectral bands is to facilitate discussion and is not for specification" (nota 1).
  - Descida do GPON em 1480–1500 nm: folheto e G.984.2, 8.2.5.1. A OLT transmite em 1490 nm.
  - XGS-PON: 1575–1580 / 1260–1280 nm e coexistência com o GPON (folheto G.9807).
  - Pico d'água: "close to 1383 nm" (G.Sup39).
- **02-06.md**
  - Causas da atenuação. G.Sup39, cláusula 10: "Rayleigh scattering, water absorption, macrobending loss and microbending loss"; "follows a 1/λ⁴ relationship"; a curvatura "generally increases with wavelengths above 1550 nm".
  - Pico d'água limitado. G.Sup39: "G.652.C and G.652.D… less than or equal to the maximum value specified for the range 1310 nm to 1625 nm".
  - Ficha de exemplo. Prysmian: "Maximum attenuation value of cable at 1310 nm ≤ 0.36", "at 1550 nm ≤ 0.22".
  - Médias medidas: 0,341 e 0,194 (Tabela 10-4; ver a nuance em A5).
  - Contas: 20 × 0,30 = 6 dB; 20 × 0,40 = 8 dB; 20 × 0,19 = 3,8 dB.
- **02-07.md**
  - Fórmula. FOA: "dBm = 10 log (measured power / 1mw)".
  - Regras de bolso. FOA: "-3 dB is a ratio of 1/2", "-10 dB is a ratio of 1/10", "-20 dB is a ratio of 1/100".
  - Exemplo de perda. FOA: "We start at -20.0dBm… down to -22.3dBm… 2.3dB loss".
  - −27 dBm = 0,001995 mW.
  - Escada: +3 − 8,4 = −5,4 dBm (+2,5; −4,5; −4,9; −5,4).

### Questões

- **02-01 a 02-07 (56 questões):** a resposta marcada é a certa e única. Todas as explicações foram lidas. Contas refeitas:
  - 0 dBm − 12 dB = −12 dBm;
  - −3 dBm = 0,501 mW; 3 mW = +4,77 dBm; 0,03 mW = −15,2 dBm; 0,27 mW = −5,69 dBm;
  - 0,1 + 0,1 mW = 0,2 mW = −6,99 dBm; 1/3 da potência = −4,77 dB;
  - −20,0 − (−22,3) = 2,3 dB;
  - 20 km × 0,30 / 0,40 / 0,19 = 6 / 8 / 3,8 dB;
  - −27 dBm ≈ 0,002 mW.

### Glossário

- **Conferidos (23 dos 26 termos):** nucleo, casca, reflexao-interna-total, abertura-numerica, revestimento-primario, monomodo, multimodo, dispersao-modal, g652d, g657, bandas-opticas, atenuacao, espalhamento-rayleigh, pico-dagua, macrocurvatura, microcurvatura, db, dbm, xgs-pon, splitter, sensibilidade, sobrecarga, orcamento-de-potencia.
  - "sensibilidade −27 dBm": G.984.2, Tabela A.1, "Minimum sensitivity −27".
  - "sobrecarga −8 dBm": "Minimum overload −8".
- **Com pendência:** tight-buffer (A15), comprimento-de-onda (A13), gpon (A3).

### Fontes (`fontes.json`)

- As 24 fontes novas foram abertas; todas as URLs responderam 200 em 07/11/2026.
- As observações batem com os documentos, exceto itu-g657-folheto (E2), itu-gsup39 (A19), itu-g984-folheto (A3), foa-cores (A2), prysmian-cfoa-as (A20), foa-db (sugestão 15) e omada-link-budget (sugestão 14).
- Folheto G.984: "2.5 Gbit/s downstream and 1.25 Gbit/s upstream"; "Basic physical reach 20 km"; "Logical reach of up to 60 km".

### Ferramentas e testes

- **potencia.ts**
  - Fórmulas: dBm↔mW, 10·log₁₀N e −10·log₁₀p.
  - Máximo da G.652.D por comprimento de onda: 0,30 de 1530 a 1565 nm; 0,40 de 1310 a 1625 nm; 0,47 de 1260 a 1310 nm (Nota 2); NaN fora da faixa.
  - Splitters balanceados: 1:2 com 4,0 dB (Intelbras "≤ 4.0 dB", "Connector losses not taken into account"); 1:4 com 7,4, 1:8 com 10,7 e 1:16 com 13,7 dB (SENKO); 1:64 com 21,4 dB (FS "≤21.4"). O 1:32 está em E1.
  - Splitters desbalanceados XFSD: 5/95 = 14,3/0,8; 10/90 = 11,0/1,1; 20/80 = 7,9/1,6; 30/70 = 6,1/2,2; 40/60 = 4,8/2,9; 50/50 = 3,7/3,7 dB (Intelbras). Todos ficam acima do valor ideal.
  - Preset GPON B+: FS OLT "Mean Launched Power(B+) 1.5 / 5" e "TX Central Wavelength 1480 1490 1500"; FS ONU "Sensitivity −27", "Saturation −8"; G.984.2, Tabela A.1.
  - Preset LX: Juniper "Transmitter output power… −9.5 / −3 dBm" e "Receiver input power… −19 / −3 dBm".
  - Preset BX10: Extreme "Minimum launch power –9.0 dBm", "Maximum receiver sensitivity –19.5 dBm", "Maximum input power… –3.0 dBm", "1310 nm and 1490 nm".
- **potencia.test.ts:** valores esperados recalculados:
  - dois 1:8: 28,0 / 28,5 / −26,5 / −2,5;
  - 1:8 com 1:4: 24,7 / 0,8;
  - margem zerada: folga 0;
  - saturação: 3,4 dBm;
  - LX em 10 km: 6,1 / 0,4;
  - ideais: 3,01 / 12,04 / 15,05 / 0,46 dB;
  - 25 µW = −16,02 dBm.
- **TelaOrcamento.tsx**
  - Conector: 0,75 dB por par (Fluke: "standard-grade loss value of 0.75 dB").
  - Fusão: 0,3 dB (FOA: "0.3 max per EIA/TIA 568"; ver A17).
  - Margem de 3 dB (Omada: "Safety margin: typically 3 dB…"; "Reserve 3–5 dB margin").
  - Exemplo padrão recalculado: perda 24,9 dB, orçamento 28,5 dB, folga 0,6 dB, recepção de −23,4 dBm (pior caso) e −19,9 dBm (Tx máxima). Ver E3 e A1.
- **TelaConversor.tsx:** a tabela "Para decorar" está certa; "0,2 dB por conector" confere com a FS ("Add an additional 0.2dB loss per connector").
- **cores.ts e cores.test.ts**
  - Ordem brasileira. Furukawa ET02719 v7: "01 Verde… 12 Azul Claro"; Prysmian e Transcend iguais.
  - Posições 13–24 com traço preto, e branco sobre o preto. Furukawa: "* Marcação de cor negra… traços espaçados de 10 mm"; "** Marcação de cor branca sobre o tubo Preto".
  - Posições 25 em diante: "não definida". Correto.
  - Ordem TIA-598. FOA: "1 Blue … 12 Aqua".
  - Tubos 13–48 com faixa preta (amarela na preta), laranja e verde (FOA).
  - Tubo piloto e direcional. Transcend: "01 Piloto Verde; 02 Direcional Amarelo; 03 em diante Normal Branco ou Natural". Prysmian: "Cor dos tubos loose: Verde Amarelo Branco…".
  - O teste "ida e volta" de 1 a 288 fibras é coerente com o código.

### Diagramas

- **EspectroBandas:** limites das bandas e marcas de 1270, 1310, 1490, 1550, 1577 e 1625 nm conferem com a G.Sup39 e os folhetos.
- **RaiosCurvatura:** raios de 30, 10, 7,5 e 5 mm, na mesma escala (3,6 unidades por mm). A G.652 mostra 30 mm (folheto, Fig. 2). A B2 está em E2.
- **FibraCamadas:** os rótulos estão certos; na multimodo, núcleo e casca estão na proporção 16/40 = 50/125.
- **EscadaDbm:** valores certos; ver A18 e sugestão 3.
- **CausasPerda:** os pontos 0,341 e 0,194 conferem; ver A5 e sugestão 2.

## Fontes consultadas (URL ou arquivo + data)

Todas consultadas em 07/11/2026, sempre lidas como texto (pdftotext ou extração de HTML). Já baixados antes da revisão: ITU-T G.652 (08/2024), folheto da G.657 (10/2013), G.Sup39 (02/2016), Furukawa ET02719 v7, folheto G.9807 e ficha do splitter Intelbras, iguais aos das URLs de `content/fontes.json`. `docs/pesquisa.md` (blocos 2 a 4) foi usado só como pista.

### ITU

- Folheto G.984: https://itu.int/en/ITU-T/studygroups/2017-2020/15/Documents/flyers/Flyer_ITU-T_G.984.pdf
- G.984.2 (08/2019), PDF oficial: https://www.itu.int/rec/T-REC-G.984.2-201908-I/en
- G.657 (08/2024), PDF oficial, e página de edições: https://www.itu.int/rec/T-REC-G.657-202408-I/en e https://www.itu.int/rec/T-REC-G.657/en
- G.Sup39 (10/2025), PDF oficial, e página de edições: https://www.itu.int/rec/T-REC-G.Sup39-202510-I/en e https://www.itu.int/rec/T-REC-G.Sup39/en
- Página de edições da G.652: https://www.itu.int/rec/T-REC-G.652/en

### FOA

- https://www.thefoa.org/tech/ref/basic/fiber.html
- https://www.thefoa.org/tech/ref/testing/test/dB.html
- https://thefoa.org/tech/OM.html
- https://www.thefoa.org/tech/ColCodes.htm
- https://www.thefoa.org/tech/loss-est.htm
- https://www.thefoa.org/tech/safety.htm
- https://www.thefoa.org/tech/ref/testing/OTDR/OTDR.html

### Fluke

- https://www.flukenetworks.com/content/om1-om2-om3-om4-and-os1-os2-fiber
- https://flukenetworks.com/content/new-loss-budget-values-reference-grade-connectors-ansitia-5683-d

### Fabricantes

- Prysmian:
  - https://ec.prysmian.com/sites/ec.prysmian.com/files/media/documents/G652D.pdf
  - https://australia.prysmian.com/sites/australia.prysmian.com/files/media/documents/TightBuffer.pdf
  - CFOA AS (URL do instrufiber no `fontes.json`)
- Transcend AS (URL do instrufiber no `fontes.json`).
- Intelbras:
  - https://backend.intelbras.com/sites/default/files/2022-07/datasheet%20-%20Splitter%20com%20conector%20_%20EN.pdf
  - https://backend.intelbras.com/sites/default/files/2025-10/Datasheet%20XFSD%20Rev1_0.pdf
- SENKO: https://www.senko.com/product/1xn-plc-splitter/
- FS:
  - https://img-en.fs.com/file/datasheet/mini-plug-in-type-plc-splitters-datasheet.pdf (página 2 renderizada como imagem para ler a linha de perda de inserção)
  - https://img-en.fs.com//file/datasheet/gsfp-43-20b-datasheet.pdf
  - https://resource.fs.com/mall/doc/202308261116399vxqtl.pdf
- Juniper: https://apps.juniper.net/hct/model/CTP-SFP-1GE-LX/hwspecs
- Extreme: https://documentation.extremenetworks.com/pluggable/GUID-19ED8539-09FF-4FCA-AA4B-CEF749AEE443.shtml
- Omada: https://support.omadanetworks.com/nordic/document/112365/

### Não acessada

- Corning PI-1424: https://csmedia.corning.com/media/worldwide/coc/documents/Fiber/product-information-sheets/PI-1424-AEN.pdf (bloqueada pelo proxy).

## O que foi feito com cada item (07/11/2026)

Os trechos novos citados abaixo foram conferidos de novo no texto oficial antes de entrar no app: G.657 (08/2024), G.984.2 (08/2019), G.Sup39 (10/2025), FOA (segurança, OTDR, código de cores) e a ficha da FS (lida na imagem da página 2).

| Item | Resolução |
| --- | --- |
| E1 | Splitter 1:32 com 16,9 dB (SENKO). A tela do conversor mostra também a faixa entre as três fichas (Intelbras, SENKO e FS), por exemplo 16,9 a 17,3 dB no 1:32. |
| E2 | G.657.B2 sai da tabela, do diagrama, da q2 e do glossário. Nova fonte `itu-g657-2024`; o folheto de 2013 fica só como referência histórica ("fichas antigas ainda escrevem A2/B2"). |
| E3 | Campo "Penalidade óptica" no orçamento: 0,5 dB no GPON B+ (G.984.2, Tabela A.1), o que dá 28 dB de orçamento, e 3,3 dB no BX10 (ficha Extreme). No LX, a ficha não informa, então o campo fica em zero, com aviso. O exemplo padrão passa com 0,1 dB de folga e aviso de folga baixa. |
| E4 | 02-01: "da espessura de um fio de cabelo: os 125 µm de vidro são um pouco mais grossos que um cabelo típico" (FOA). |
| A1 | A saturação usa a perda mínima: splitters ideais, e fibra, conectores e fusões em zero. Campo "Perda mínima da classe", com 13 dB no GPON B+ (G.984.2, Tabela A.2) e aviso quando a perda mínima fica abaixo disso. |
| A2 | No modo TIA-598, as faixas valem para os tubos. Fibra 13 ou acima no mesmo tubo aparece como "grupo separado por fita: confira na ficha" (FOA). Tela e `fontes.json` corrigidos. |
| A3, A4 | Subida do GPON em torno de 1310 nm: faixa de 1260 a 1360 nm na G.984.2, com opções mais estreitas. "1490/1310" quase sempre é GPON, mas EPON, BX10 e o plano opcional do XGS-PON também usam esse par. |
| A5 | "Média medida no núcleo de rede de uma operadora (duas rotas de 60 km, 55 fibras G.652)" na lição, nas questões e no diagrama. |
| A6 | Campo modal: o "9" é o diâmetro do campo modal, um pouco maior que o núcleo; a faixa nominal vai de 8,6 a 9,2 µm, com tolerância de ±0,4 µm. |
| A7 | "Sensibilidade especificada (pior caso)", na lição 02-07 e no conversor. |
| A8 | Linha de 1260 a 1310 nm (0,47 dB/km, Nota 2) na tabela da 02-04 e no item "erros comuns". |
| A9, A10 | Linha OS da tabela: "não se aplica (o SR é multimodo); em monomodo, um LX chega a 10 km". O LX também roda em multimodo até 550 m, com cordão condicionador. |
| A11 | Casca: ±0,7 µm na G.652.D de 2024; ±1 µm em fichas e edições anteriores. |
| A12 | Tabela da G.652.D separa cabo (atenuação) de fibra (macrocurvatura). |
| A13 | Nova fonte `foa-seguranca`, usada na 02-01, na 02-05, nas q7 e q6 e no termo "comprimento de onda". |
| A14 | Nova fonte `foa-otdr` (sensibilidade a tensão nos λ longos). A frase sobre a fusão virou "costuma perder parecido". |
| A15, A16 | `foa-cores` como fonte do uso do tight buffer; `prysmian-g652d` e `foa-fibra` na q8 da 02-03. |
| A17 | Orçamento cita a FOA para os 0,3 dB por fusão (e lembra os 0,15 dB de planejamento). |
| A18 | "+2,5 dBm" com vírgula na escada. |
| A19 | G.Sup39 trocada pela edição oficial em vigor (10/2025). |
| A20 | Prysmian CFOA AS: "variação de atenuação no ensaio de ciclo térmico", em `fontes.json` e em `docs/pesquisa.md`. |
| Sugestões | Aplicadas: 1 (cabo interno de 300 m), 2 (curva ajustada aos pontos, pico d'água abaixo de 0,40 e curvatura em curva tracejada à parte), 3, 4, 5, 6 (aviso do XFSD fora de 1310–1550 nm), 7 (tubos 26 e 39), 8 (1650 nm na banda U), 9, 10, 11, 12, 13 (termos ligados nas lições), 14, 15, 16, 17 e 18 (perdas de 1 volta da G.657). |
| Pesquisa | `docs/pesquisa.md` corrigido onde repetia os mesmos erros: orçamento B+ de 28,5 dB, B2 e subida do GPON. |
| Não conferidos | Seguem como estão: TIA-598-D original, normas ABNT de cabo, cláusulas da IEEE 802.3, textos completos da G.984.5 e da G.9807.1. A ficha da Corning foi conferida só pelo trecho indexado na busca (o site recusa o acesso direto). |
