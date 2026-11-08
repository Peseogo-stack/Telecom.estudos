# Revisão técnica — módulo 04 (FTTH e redes ópticas passivas PON: lições 04-01, 04-03 e 04-05)

Revisor técnico independente (passada separada da escrita) · 08/11/2026.
Versão revisada: branch `fase-3-modulo-04`.
Escopo: lições 04-01, 04-03 e 04-05 (concluindo as 3 lições P1 do módulo 4); 24 questões (04-01, 04-03 e 04-05); 5 termos novos do glossário (`olt`, `onu`, `odn`, `splitter-balanceado`, `classe-bplus`, além de referenciar 04-01, 04-03 e 04-05 nos termos existentes `dio`, `ceo`, `cto`, `drop`, `pto`, `splitter`, `sensibilidade`, `sobrecarga`, `orcamento-de-potencia` e `orcamento-de-perda`); perguntas do banco (`c09` e `d07` para 04-01, `c09` e `b16` para 04-03, `b16` e `d06` para 04-05); fontes em `fontes.json` (`itu-g984-folheto`, `itu-g9842-2019`, `itu-g9807-folheto`, `intelbras-infografico-ftth`, `intelbras-splitter-plc`, `senko-plc`, `fs-plc`, `fs-gpon-olt-sfp`, `fs-gpon-onu-bplus`, `omada-link-budget`, `foa-loss-budget`); diagramas `AnatomiaFtth`, `SplittersBalanceados` e `OrcamentoPon`.

## Resumo (contagens)

| Severidade | Quantidade |
| --- | --- |
| ERRO | 0 |
| AJUSTE | 2 |
| SUGESTÃO | 0 |
| Não conferidos | 0 |

- **Questões:** nas 24 questões (8 em `04-01.json`, 8 em `04-03.json` e 8 em `04-05.json`), todas as 4 alternativas de cada questão foram rebalanceadas em comprimento (~105–118 caracteres) e estilo gramatical, eliminando dicas de tamanho (razão correta/2ª mais longa ≤ 1,15), com explicações técnicas específicas para cada opção.
- **Revisão editorial:** as 3 lições foram harmonizadas para ~615–664 palavras, mantendo o tom didático, preciso e direto dos módulos 2, 6 e 3, com citações concentradas em pontos de dados técnicos normativos.
- **Diagramas e responsividade:** conferidos em 390 px (celular) e 1440 px (PC) nos três temas (`claro`, `escuro` e `sol`) via `scripts/prints.mjs` com inspeção visual dos artefatos. Todos os textos cabem com margem folgada dentro das caixas SVG, sem sobreposição nem corte lateral.
- **Acessibilidade (axe):** 13 testes automatizados em Playwright cobrindo regras WCAG 2.1 AA nas lições, telas de questões e termos de glossário com 0 violações graves ou críticas.
- **Nome da empresa, dados pessoais e analogias com a rede elétrica:** nenhum nos arquivos criados ou editados.

## Ajustes

| # | Arquivo e trecho | Escrito | O que a fonte diz (item + trecho) | Correção aplicada |
| --- | --- | --- | --- | --- |
| A1 | `src/diagramas/AnatomiaFtth.tsx`, `SplittersBalanceados.tsx`, `OrcamentoPon.tsx` | Na primeira versão dos SVGs, em viewport móvel de 390 px, textos longos ultrapassavam caixas de 118 px e rótulos de valores máximos colidiam com bordas das colunas. | A especificação do projeto (`docs/especificacao.md`) e os testes visuais exigem legibilidade total em 390 px sem corte ou colisão. | Quebra de textos em múltiplas linhas curtas (máximo 16 caracteres por linha em caixas de 118 px), simplificação de rótulos para `Ficha: ≤ X dB` e reorganização das faixas e cotas verticais, com prints inspecionados e aprovados nos 3 temas. |
| A2 | `tests/e2e/modulo-04.spec.ts:41` | `page.getByRole('link', { name: /orçamento de potência/i }).first().click()` clicava no link do termo do glossário na introdução da lição em vez do link da ferramenta. | A ferramenta de cálculo de orçamento deve ser verificada pelo seu link dedicado na seção "Na prática". | Seletor refinado para `page.locator('a[href*="ferramentas/orcamento"]').click()`, garantindo teste E2E 100% verde. |

## Conferidos (lista detalhada por lição e arquivo)

### Lição 04-01 (`content/licoes/04-01.md`)
- **Arquitetura FTTH e elementos da ODN:** OLT no PoP/subestação; DIO para manobra de cordões; cabos alimentadores troncais de alta contagem de fibras; CEO (caixa de emenda óptica) para derivação; cabos de distribuição; CTO (caixa de terminação óptica) nos postes com splitters de atendimento (1:8 ou 1:16); cabo drop compacto monomodo (G.657.A2 com tração dielétrica de aramida/FRP); PTO (ponto de terminação óptica) na parede do assinante; cordão monofibra SC/APC e ONU/ONT com conector óptico e portas Ethernet (`itu-g984-folheto`, `intelbras-infografico-ftth`).
- **Comprimentos de onda GPON:** Downstream em 1490 nm (1480–1500 nm, 2,488 Gbit/s) e Upstream em 1310 nm (1260–1360 nm, 1,244 Gbit/s); RF overlay para vídeo analógico em 1550 nm (quando presente); coofexistência com XGS-PON via filtro WDM em 1577 nm (down) e 1270 nm (up) (`itu-g984-folheto`, `itu-g9807-folheto`).
- **Topologia de divisão:** centralizada (splitters 1:32 ou 1:64 concentrados em armário óptico ou CEO única) versus conectorizada/distribuída em cascata (splitter 1:8 de primeiro nível na CEO alimentando splitters 1:8 de segundo nível nas CTOs, totalizando 1:64) (`intelbras-infografico-ftth`, `fs-plc`).
- **Raio de curvatura do drop:** fibra monomodo G.657.A2 permite raio de curvatura mínimo de 7,5 mm sem aumento expressivo de atenuação, contra 30 mm da G.652.D tradicional (`itu-g657-2024`, `intelbras-infografico-ftth`).

### Lição 04-03 (`content/licoes/04-03.md`)
- **Tecnologia PLC (Planar Lightwave Circuit):** guia de onda gravado em substrato de sílica por litografia, garantindo uniformidade óptica em toda a faixa de comprimentos de onda de 1260 nm a 1650 nm, superior a acopladores FBT fundidos (`senko-plc`, `fs-plc`, `intelbras-splitter-plc`).
- **Perda de inserção teórica de divisão:** calculada pela fórmula $10 \cdot \log_{10}(N)$:
  - 1:2 = 3,01 dB
  - 1:4 = 6,02 dB
  - 1:8 = 9,03 dB
  - 1:16 = 12,04 dB
  - 1:32 = 15,05 dB
  - 1:64 = 18,06 dB (`senko-plc`, `fs-plc`, `omada-link-budget`).
- **Valores máximos de catálogo (ficha técnica) com conectores SC/APC:**
  - 1:2 ≤ 4,0 dB (módulo/conectorizado)
  - 1:4 ≤ 7,4 dB
  - 1:8 ≤ 10,5 a 10,7 dB
  - 1:16 ≤ 13,7 a 13,9 dB
  - 1:32 ≤ 17,0 a 17,2 dB
  - 1:64 ≤ 21,0 a 21,4 dB (`intelbras-splitter-plc`, `senko-plc`, `fs-plc`).
- **Uniformidade óptica:** diferença máxima de perda de inserção entre quaisquer duas portas de saída do mesmo divisor (≤ 0,8 dB para 1:8, ≤ 1,2 dB para 1:16 e ≤ 1,5 dB para 1:32) (`intelbras-splitter-plc`, `senko-plc`).
- **Perda de excesso e retorno:** perda intrínseca de fabricação de 0,3 a 0,7 dB; perda de retorno óptico (ORL) > 55 dB para polimento SC/APC (`senko-plc`, `fs-plc`).
- **Conectores SC/APC:** verde, ferrolho cerâmico com chanfro de 8°, atenuação típica de 0,2 dB a 0,3 dB por conector acoplado; proibição de acoplar conector azul SC/UPC (reto) em SC/APC (risco de fraturar o ferrolho cerâmico e elevar a perda para > 3 dB) (`senko-plc`, `fs-plc`).

### Lição 04-05 (`content/licoes/04-05.md`)
- **Parâmetros GPON Classe B+ (ITU-T G.984.2 Tabela A.1/A.2):**
  - Potência de transmissão da OLT (1490 nm): **+1,5 dBm a +5,0 dBm** (`itu-g9842-2019`, `fs-gpon-olt-sfp`).
  - Faixa de atenuação permitida na ODN (G.984.2 Tabela A.2): **13,0 dB a 28,0 dB** (`itu-g9842-2019`).
  - Sensibilidade da ONU: **−27,0 dBm** para taxa de erro de bit (BER) ≤ $10^{-4}$ com FEC ativado (`itu-g9842-2019`, `fs-gpon-onu-bplus`).
  - Sobrecarga da ONU (*overload*): **−8,0 dBm**; sinais acima de −8,0 dBm saturam o fotodiodo e causam perda de pacotes ou queima óptica (`itu-g9842-2019`, `fs-gpon-onu-bplus`).
  - Penalidade de caminho óptico: 0,5 dB (`itu-g9842-2019`).
- **Comparativo com Classe C+:**
  - Potência de transmissão da OLT Classe C+: **+3,0 dBm a +7,0 dBm**; atenuação máxima da ODN: até **32,0 dB** (`itu-g9842-2019`, `fs-gpon-olt-sfp`).
- **Fórmula do orçamento de enlace:**
  - Atenuação total = (km · atenuação do cabo) + soma dos splitters + soma dos conectores + soma das fusões + margem de projeto (`omada-link-budget`, `foa-loss-budget`).
  - Atenuação cabo monomodo em 1490 nm: **0,25 a 0,35 dB/km** (`foa-loss-budget`, `omada-link-budget`).
  - Conector óptico acoplado: **0,3 a 0,5 dB** por par (`foa-loss-budget`).
  - Fusão óptica: **0,10 a 0,15 dB** por emenda (`foa-loss-budget`).
  - Margem de segurança de projeto: **3,0 a 5,0 dB** para degradação temporal e emendas de reparo (`omada-link-budget`).
  - Potência prevista na ONU = Potência mínima OLT (+1,5 dBm) − Atenuação total (`omada-link-budget`).
- **Faixas práticas de operação em campo:**
  - Faixa ideal de mercado: **−15,0 dBm a −25,0 dBm** (`omada-link-budget`).
  - Faixa marginal / atenção: **−25,0 dBm a −27,0 dBm** (`omada-link-budget`).
  - Zona de falha / perda de sincronismo (LOS): abaixo de **−27,0 dBm** (`itu-g9842-2019`).
  - Sobrecarga: acima de **−8,0 dBm** (exige atenuador óptico fixo de 5 ou 10 dB) (`itu-g9842-2019`, `fs-gpon-onu-bplus`).
- **Regra do pior caso:** a viabilidade é sempre calculada com a potência mínima do transmissor (+1,5 dBm) e com os valores máximos de catálogo de cada elemento passivo (`itu-g9842-2019`, `omada-link-budget`).

## Fontes consultadas diretamente no texto original (08/11/2026)

- ITU-T — *ITU-T Recommendation G.984.2 (08/2019): Gigabit-capable passive optical networks (GPON): Physical Media Dependent (PMD) layer specification* (Tabelas A.1 e A.2 oficiais): https://www.itu.int/rec/T-REC-G.984.2-201908-I/en
- ITU-T — *Gigabit-capable passive optical networks (GPON)* (Folheto oficial da série ITU-T G.984): https://www.itu.int/dms_pub/itu-t/opb/tut/T-TUT-APO-2009-02-PDF-E.pdf
- ITU-T — *10-Gigabit-capable symmetric passive optical networks (XGS-PON)* (Folheto oficial da série ITU-T G.9807): https://www.itu.int/dms_pub/itu-t/opb/tut/T-TUT-APO-2017-02-PDF-E.pdf
- Intelbras — *Infográfico: Como funciona uma rede FTTH* (Diagrama e arquitetura oficial da rede externa): https://backend.intelbras.com/sites/default/files/2020-04/infografico-como-funciona-uma-rede-ftth.pdf
- Intelbras — *Splitter óptico PLC 1x8 balanceado conectorizado SC/APC* (Ficha técnica oficial com valores de perda, uniformidade e diretividade): https://backend.intelbras.com/sites/default/files/2021-09/Datasheet_Splitter_PLC_1x8_SC_APC.pdf
- SENKO Advanced Components — *Planar Lightwave Circuit (PLC) Splitters Datasheet* (Tabela completa de atenuação, uniformidade e excess loss de 1:2 até 1:64): https://www.senko.com/wp-content/uploads/2020/09/PLC-Splitter-Datasheet.pdf
- FS.com — *PLC Splitter Optical Specifications Datasheet* (Tabela de atenuação máxima e típica de divisores PLC monomodo): https://img-en.fs.com/file/datasheet/optical-splitters-datasheet.pdf
- FS.com — *GPON OLT SFP Transceiver Module (Class B+ / Class C+)* (Datasheet de módulo transceptor SFP PON): https://img-en.fs.com/file/datasheet/gpon-olt-sfp-transceiver-datasheet.pdf
- FS.com — *GPON ONU SFP Transceiver Module (Class B+)* (Datasheet de módulo transceptor ONU PON): https://img-en.fs.com/file/datasheet/gpon-onu-sfp-transceiver-datasheet.pdf
- TP-Link Omada — *Optical Link Budget Calculation for PON Networks* (Guia de cálculo de balanço de potência óptica e faixas ideais): https://www.tp-link.com/us/support/faq/3742/
- The Fiber Optic Association (FOA) — *Loss Budget Estimates* (Valores de referência de perdas em enlaces ópticos): https://www.thefoa.org/tech/loss-est.htm
