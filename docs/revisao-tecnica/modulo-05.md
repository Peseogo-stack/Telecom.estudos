# Revisão técnica — módulo 5 (fusão: lições 05-01, 05-03 e 05-04)

Revisão de 09/11/2026, branch `revisao-p1`. Substitui o relatório anterior, de 07 e 08/11/2026.

**Escopo:** lições 05-01, 05-03 e 05-04, suas 24 questões, os diagramas `PreparoFusao`, `DentroMaquina` e `EstimadoRealFusao` e os termos do glossário que elas usam.

**Método:** um subagente listou cada afirmação numérica com o trecho candidato da fonte. Cada item foi julgado lendo a lição e o trecho. Fontes baixadas de novo nesta revisão:

- FOA, *Fusion Splicing*, *Loss Budget*, *Deliverables*, *Cleaning* e *OTDRs*;
- catálogo de máquinas de fusão da Fujikura (10/2025) e dicas de manutenção da 90R;
- nota de aplicação da Tempo/Greenlee (910FS);
- tabela de valores típicos da VIAVI;
- resumo da TIA-568 pela FOA.

## Resumo

| Severidade | Quantidade |
| --- | --- |
| ERRO | 14 |
| AJUSTE | 6 |
| Não conferido | 0 |

## Erros corrigidos

| # | Onde | Estava escrito | O que a fonte diz | Correção |
| --- | --- | --- | --- | --- |
| E1 | 05-04, tabela, diagrama e questões q7 e q8 | "0,08 dB: atenuação típica de campo (VIAVI)"; "emendas bem executadas ficam abaixo de 0,10 dB (VIAVI)". | VIAVI, tabela de valores típicos: *"Fusion 0.10 to 0.30 dB"*. | "0,10 a 0,30 dB: típica (VIAVI)". O 0,08 dB fica só como resultado do exemplo bidirecional. |
| E2 | 05-04 | "0,10 a 0,15 dB: valor de referência para projeto e contratos, adotado pela FOA e em metas de distribuidoras". | FOA, *Loss Budget*: *"0.15dB for singlemode fusion splices"* (planejamento). FOA, *Deliverables*: fusão com média de 0,1 dB, rejeitando acima de 0,2 dB. Nada sobre "metas de distribuidoras". | Dois números separados, cada um com a sua fonte; o critério da obra é o do contrato (confirmar na empresa). |
| E3 | 05-04, Na prática | "No orçamento, dimensione as fusões com 0,10 a 0,15 dB". | Decisão D12 e a ferramenta de orçamento: padrão conservador de 0,3 dB por fusão (máximo da TIA). | "O padrão é 0,3 dB (TIA); a FOA planeja com 0,15 dB". |
| E4 | 05-04 | "A máquina não injeta feixe luminoso". | FOA: o sistema LID injeta e detecta luz (*"The LID system also checks transmission after splicing to estimate splice loss"*). | A estimativa é uma aproximação (Tempo; FOA); a perda real se mede com OTDR ou com fonte e medidor. |
| E5 | 05-04 | Fórmulas em LaTeX (`$$\frac{...}$$`), que o app mostrava cruas. | O pipeline de conteúdo não renderiza LaTeX. | Fórmula em texto. O validador agora barra LaTeX. |
| E6 | 05-01 e checklist de CEO | "1 m de **fibra nua**" na bandeja. | FOA: *"~1 m fiber inside the splice tray"*. É fibra com revestimento; fibra nua é o vidro sem revestimento. | "1 m de fibra". |
| E7 | 05-01, glossário e diagrama | Tubete "com haste metálica em **aço inox**". | O catálogo dá comprimento máximo de 66 mm, diâmetro de 6,0 mm antes de encolher e modos de forno para 60 mm. Não fala do material da haste. | O material sai. |
| E8 | 05-01 e diagrama | Clivagem de "10 a 16 mm"; "limite de reprovação > 1,5°"; "abaixo de 10 mm, ângulos acima de 2°". | 45S: comprimento de clivagem de 5 a 16 mm (fibra de 250 µm). CT50: de 5 a 20 mm, mas abaixo de 10 mm exige ajuste da lâmina e *"the average cleave angle is worse"*. Não há 1,5° nem 2° nas fontes. | Os valores do catálogo, sem os limites inventados. |
| E9 | 05-01 | Limpar "em sentido único até ouvir o estalo (squeak)". | Tempo: *"clean the fiber with 99% isopropyl alcohol and a clean lint free wipe prior to cleaving"*. Nada de sentido nem de estalo. | Fica o que a Tempo diz. |
| E10 | 05-01, Erros comuns | Álcool 70% "oxida os eletrodos". | A Fujikura só pede *"purity of 99% or higher"*. | "Os fabricantes pedem 99% ou mais". |
| E11 | 05-03 | Ciclo da máquina "em 6 a 12 segundos". | 45S: *"SM FAST mode: Avg. 6 to 8sec."* | 6 a 8 s na 45S. |
| E12 | 05-03, diagrama e questões | Eletrodos de "1.500 a 6.000 arcos". | Catálogo: 45S cerca de 6.000; 90R12 cerca de 1.500; 90R16 cerca de 800. | "Cerca de 800 a 6.000, conforme o modelo". |
| E13 | 05-03 e questão q8 | Tabela de defeitos com "estrangulamento" e uma coluna de causas. | FOA: pontos ou linhas escuras podem melhorar com novo arco, *"never more than twice"*; *"For large core offsets, bubbles or bulging splices, always redo"*. Não fala de estrangulamento nem das causas. | Tabela só com o que a FOA diz. |
| E14 | Questões 05-03 | "Funde a sílica a cerca de 2.000 °C"; "pré-fusão é uma descarga **invisível**"; arc check "quando mudam pressão, umidade e altitude". | Nenhuma fonte traz a temperatura; o arco é luminoso; a Tempo manda calibrar o arco *"at the beginning of a splicing session"*. | Corrigidas: arco elétrico, sem temperatura; calibração no início da sessão, o resto pelo manual. |

## Ajustes

| # | Onde | Ajuste |
| --- | --- | --- |
| A1 | 05-03 | A vantagem do alinhamento pelo núcleo vem da Tempo, que fabrica máquina por núcleo. O texto agora diz isso e manda confirmar qual máquina a equipe usa. |
| A2 | 05-03 | A limpeza das lentes era "com a máquina desligada"; o passo a passo da Fujikura (90R) manda tirar os eletrodos sem tocar na ponta. |
| A3 | 05-03, q3 | 45S: o catálogo diz *"Active clad alignment"*. Saiu "motores movem as ranhuras em V", que a ficha não traz. |
| A4 | Glossário | Corrigidos arc-check, clivador, decapador, tubete, teste de tração, perda estimada e média bidirecional. |
| A5 | 05-04 | O gainer passa a citar FOA (*OTDRs*) e Yokogawa, que tratam do assunto, no lugar da nota da EXFO. |
| A6 | Questões | "Normas" que "proíbem" ou "exigem" sem norma citada foram trocadas pelo que a fonte diz. |
