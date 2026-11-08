# Revisão técnica — módulo 6 (testes ópticos) e leitor de OTDR

Revisor técnico independente (passada separada da escrita) · 07/11/2026.
Versão revisada: branch `fase-3-modulo-06`, commit `a0fafe7`.
Escopo: lições 06-01, 06-02 e 06-03; 24 questões (06-01 a 06-03); 11 termos novos (e 4 atualizados) do glossário; 5 fontes novas do `fontes.json` (`exfo-otdr-an194`, `viavi-otdr-dicas`, `foa-perda-insercao`, `fluke-1-cordao`, `foa-pon-meter`) mais `foa-otdr`, `foa-db`, `foa-reflectancia` e `yokogawa-otdr-bidirecional`; `traco.ts`, `traco.test.ts`, `TracoSvg.tsx` e `TelaLeitorOtdr.tsx`; diagramas `Referencia1Cordao`, `OtdrComoEnxerga` e `OtdrEventos`.

## Resumo (contagens)

| Severidade | Quantidade |
| --- | --- |
| ERRO | 0 |
| AJUSTE | 7 |
| SUGESTÃO | 2 |
| Não conferidos | 1 |

- **Questões:** nas 24 questões, a alternativa marcada como correta é a certa. Todas as contas foram refeitas (`−5,0 − (−8,4) = 3,4 dB`, `3,5 dB ÷ 10 km = 0,35 dB/km`, `5 a 8 dB acima de 24 dB = 29 a 32 dB`, `10,0 km × 1,01 = 10,10 km`, `0,40 / 0,05 = 8×`, `(−0,12 + 0,30) ÷ 2 = 0,09 dB`).
  - Ajuste na `06-01-q2` (A2): a alternativa A trazia `−3,4 dB` como errada, mas a FOA (`foa-db`) lembra que na escala `dB` os medidores de potência mostram a perda como número negativo (`medida − referência = −3,4 dB`) e que dizemos `3,4 dB` positivo por convenção. Trocamos o distrator para `1,7 dB` e explicamos a convenção do visor na alternativa C.
- **Simulador de OTDR (`traco.ts` e `TracoSvg.tsx`) e diagramas:** conferidos os 36 cenários gerados (`facil`, `medio` e `dificil`, traços 1 a 12) e os prints em 390 px e 1440 px nos temas claro, escuro e sol. Encontrados dois ajustes visuais: altura do marcador do fantasma em `TracoSvg.tsx` (A6) e rótulos "lançamento"/"recepção" encostando nas caixas de Fonte/Medidor em `Referencia1Cordao.tsx` (A7).
- **Nome da empresa, dados pessoais e analogias com a rede elétrica:** nenhum nos arquivos do módulo 6.

## Ajustes

| # | Arquivo e trecho | Escrito | O que a fonte diz (item + trecho) | Correção aplicada |
| --- | --- | --- | --- | --- |
| A1 | `content/licoes/06-03.md:48` e `content/glossario.json:970` (`fantasma`) | Na seção "Fantasma", o texto citava apenas "a múltiplos do comprimento do cabo de lançamento ou do primeiro cabo", enquanto o passo a passo (`06-03.md:62`), a questão `06-03-q6` e o simulador (`traco.ts:154-156`) tratam também do fantasma **depois do fim da fibra** (no dobro do comprimento do cabo). | FOA, "OTDRs", seção *OTDR "Ghosts"*: descreve os dois casos — tanto múltiplos do cabo de lançamento/primeiro cabo (*"at multiples of the length of the launch cable or the first cable you test"*) quanto depois do fim do cabo quando o conector final reflete muito (*"the 'break' was at 40 meters and the cable was only 40 meters long. The ghost at 80 meters looked like the end of the cable"*). | Explicitar os dois casos na seção "Fantasma" da `06-03.md` e na definição de `fantasma` no `glossario.json`. |
| A2 | `content/licoes/06-01.md:37` e `content/questoes/06-01.json:36-52` (`06-01-q2`) | `perda (dB) = referência (dBm) − medida (dBm)` atribuído diretamente a `foa-db`, e alternativa A (`−3,4 dB`) dada como errada sem ressalva sobre o visor em modo `dB`. | FOA, "dB and dBm" (`foa-db`): escreve `dB = measured power(dB) - reference power (dB) = -22.3 dBm - (-20 dBm) = -2.3 dB` e avisa que *"Although meters measure a negative number for loss, convention has us saying the loss is a positive number, so we say the loss is 3.0 dB when the meter reads -3.0 dB"* (e na Nota 2 lembra que a IEC inverteu a subtração para dar positivo). | Explicar em `06-01.md` que no modo `dB` o medidor pode exibir `−3,4 dB` (ou `3,4 dB` em conjuntos OLTS/IEC) e que por convenção dizemos `3,4 dB`. Na `06-01-q2`, trocar o distrator `−3,4 dB` por `1,7 dB` e registrar a convenção na explicação da alternativa C. |
| A3 | `content/licoes/06-01.md:26-30` e `content/fontes.json:189` (`fluke-1-cordao`) | Citava apenas "Método A.1" da TIA e o tempo de 5 minutos. | Fluke, "SC/APC to SC/APC fiber testing with the SimpliFiber Pro": *"the '1 jumper method'. To confuse matters, the IEC Standards call it Method 2 for Multimode and Method A1 for Singlemode"*; *"The rule: 'You cannot put an SC/APC connector in the Output port of the source, but you can put an SC/APC connector in the Input port of the meter.'"* FOA (`foa-perda-insercao`): estabilidade de `0.1 dB` após aquecer, acopladores de manga cerâmica ou metálica (nunca de plástico) e incerteza típica de `±10%` (`±0,2 dB` em `2 dB`). | Incluir o nome na IEC (`Método A1` para monomodo), o cuidado com porta de fonte UPC fixa, o critério de estabilidade (`0,1 dB`), o tipo de acoplador e a incerteza típica (`±10%`). |
| A4 | `content/licoes/06-02.md:35-37` e `content/fontes.json:162` (`exfo-otdr-an194`) | Definia zonas mortas e faixa dinâmica sem indicar as condições de ficha em que os fabricantes medem esses números. | EXFO, AN 194: *"Most manufacturers specify dead zones at the shortest available pulse width and on a -45 dB reflection for singlemode fibers and -35 dB for multimode fibers... a -55 dB reflection for singlemode fiber provides more optimistic specifications"* e *"Most of the dynamic range specifications are given using the longest pulse width at a three-minute averaging time, signal-to-noise ratio (SNR) = 1"*. | Acrescentar em `06-02.md` e na observação de `exfo-otdr-an194` as condições de especificação de zona morta (`pulso mais curto`, `−45 dB` em monomodo) e de faixa dinâmica (`pulso mais longo`, `3 min`, `SNR = 1`). |
| A5 | `content/licoes/06-03.md:32` e `content/glossario.json:431` (`orl`) | A lição 06-03 explicava refletância (negativa em dB) e ligava a pergunta `b05` (que cobra ORL), mas não contrastava refletância com ORL no texto. | VIAVI, Tech Tip: *"Optical Return Loss (ORL) is the total amount of reflected power, expressed in dB as a positive number. 40dB ORL is better than 30dB, 50 dB is better than 40 dB."* FOA (`foa-reflectancia`): *"Reflectance of -50 dB is equivalent to a return loss of 50 dB."* | Explicar em `06-03.md` a diferença entre refletância de um evento (negativa: `−55 dB` melhor que `−40 dB`) e `{{termo:orl|ORL}}` do enlace (positiva: `50 dB` melhor que `40 dB`), adicionando `foa-reflectancia` e `exfo-otdr-an194` às fontes da lição. |
| A6 | `src/ferramentas/otdr/TracoSvg.tsx:63,78` | `alvoDoEvento` usava `ruido = Math.min(...)` entre 1310 e 1550 nm para posicionar o círculo do fantasma. | Nos traços difíceis com curvatura forte em 1550 nm e fantasma (como os traços 3, 5, 7 e 8 do nível difícil), o piso de 1550 nm fica até ~3,5 dB abaixo do piso de 1310 nm (por conta do exagero visual de 3× na curvatura). Usando `Math.min`, a linha de chamada do marcador `E` apontava abaixo do topo do pico do fantasma de 1310 nm. | Usar `ruidoTopo = Math.max(...cenario.lambdas.map((l) => nivelDoRuido(cenario, l, exagero)))` em `alvoDoEvento` para que o marcador `E` fique sempre acima do mais alto dos dois picos do fantasma. |
| A7 | `src/diagramas/Referencia1Cordao.tsx:40-41` | Rótulos `"lançamento"` (`x=95, y=162`) e `"recepção"` (`x=303, y=162`) na mesma altura da borda inferior das caixas `"Fonte"` (`x=4..74, y=124..164`) e `"Medidor"` (`x=326..396, y=124..164`), encostando nos cantos das caixas no print de 390 px. | — (revisão visual em 390 px e 1440 px) | Descer os rótulos `"lançamento"` e `"recepção"` para `y=176` (abaixo de `y=164`) e a chave inferior em 10 px. |

## Sugestões aplicadas

1. **Links de termos já existentes no glossário:** ligar `{{termo:ior|IOR}}` em `06-02.md` e `{{termo:otdr|OTDR}}`, `{{termo:reflexao-de-fresnel|reflexão de Fresnel}}` e `{{termo:orl|ORL}}` em `06-03.md`.
2. **`content/fontes.json`, `foa-pon-meter`:** registrar na observação que o PDF da FOA traz um erro de digitação (`1557 nm`) na primeira menção ao XG(S)-PON na p. 2 e usa o valor correto (`1577 nm`) nas duas menções seguintes (páginas 2 e 3).

## Não conferidos (e por quê)

1. **Normas TIA OFSTP-7 / OFSTP-14 e IEC 61280-4-1 / 61280-4-2 (textos originais, pagos):** conferidas pelas páginas técnicas da FOA (`foa-perda-insercao`) e da Fluke (`fluke-1-cordao`).

## Conferidos (lista curta por arquivo)

### Lições
- **06-01.md:** perda de inserção medida com fonte e medidor (`foa-perda-insercao`); OTDR não deve ser usado para medir perda de inserção (`foa-otdr`: *"OTDRs should not be used for measuring insertion loss"*); método de 1 cordão = TIA Method A.1 / IEC Method A1 em monomodo (`fluke-1-cordao`); estabilização de 5 min e soltar só do lado do medidor (`fluke-1-cordao`); inclui conectores das duas pontas (`foa-perda-insercao`: *"including the connectors on each end"*); cordão de referência monomodo 0,2 dB e troca acima de 0,5 dB (`foa-perda-insercao`); IBYC — inspecionar antes de conectar, inclusive portas do equipamento (`viavi-otdr-dicas`); medidor comum soma 1490 e 1577 nm e medidor PON seletivo filtra cada um (`foa-pon-meter`).
- **06-02.md:** pulso curto e tempo convertido em distância pelo IOR, dividindo tempo e perda por 2 (`exfo-otdr-an194`, `foa-otdr`); retroespalhamento de Rayleigh forma a rampa e dá dB/km (`exfo-otdr-an194`); reflexão de Fresnel ("milhares de vezes" maior) forma picos (`exfo-otdr-an194`); eventos sem reflexão (fusão, curvatura) formam degrau na rampa (`exfo-otdr-an194`); 0,35 dB/km (1310 nm) e 0,2 dB/km (1550 nm) típicos (`viavi-otdr-dicas`); zona morta de evento a −1,5 dB de cada lado do pico e de atenuação até voltar a 0,5 dB do retroespalhamento (`exfo-otdr-an194`); faixa dinâmica 5 a 8 dB acima da maior perda (`exfo-otdr-an194`); cabo de lançamento e de recepção (`foa-otdr`); ~1% de fibra a mais no cabo (`foa-otdr`); OTDR mais efetivo acima de ~250 m (`foa-otdr`: *"more than approximately 250 meters"*).
- **06-03.md:** tabela de valores típicos conferida linha por linha com `viavi-otdr-dicas` (par UPC `0,15 a 0,5 dB` e `−50 a −59 dB`; par APC `0,15 a 0,5 dB` e `−65 a −76 dB`, APC novo `≤ −77 dB` mostrado como *"Splice (Possible APC Connector)"*; fusão `0,10 a 0,30 dB` sem reflexão; emenda mecânica `0,15 a 0,50 dB` e `−40 a −50 dB`; curvatura sem reflexão, `5× a 10×` pior em 1550 nm, pode passar de `6 dB` e parecer fim de fibra, e não é identificada com uma λ só; UPC aberto `−14 a −20 dB`; APC aberto `−35 a −45 dB`; quebra `−30 a −48 dB`; splitters 1x8 `9 a 11 dB` e 1x32 `15 a 17 dB`); ganho aparente e média bidirecional (`foa-otdr`, `yokogawa-otdr-bidirecional`); fantasma (`foa-otdr`).

### Questões, glossário, diagramas e Leitor de OTDR
- **06-01.json, 06-02.json e 06-03.json (24 questões):** gabaritos únicos e corretos, explicações em todas as alternativas.
- **Glossário:** todos os termos novos e atualizados conferidos contra as fontes e ligados nas lições.
- **Leitor de OTDR (`traco.ts`, `TracoSvg.tsx`, `TelaLeitorOtdr.tsx`) e diagramas (`Referencia1Cordao`, `OtdrComoEnxerga`, `OtdrEventos`):** faixas de sorteio batem com `viavi-otdr-dicas` (conectores `0,20–0,50 dB` e `−50 a −59 dB`, fusões `0,10–0,30 dB`, curvaturas `5,5× a 9,5×` maiores em 1550 nm, quebras `−30 a −48 dB` ou sem pico, fim UPC aberto `−14 a −20 dB` em `1,01 × projetoKm`).

## Fontes consultadas (07/11/2026)

- EXFO AN 194 (PDF integral extraído com `pdftotext`): https://www.exfo.com/contentassets/7e4d240b6717415283238de7dcec35ba/exfo_anote194_otdr-fundamentals_en.pdf
- VIAVI OTDR Testing Tech Tip (PDF integral extraído com `pdftotext`): https://www.viavisolutions.com/en-uk/literature/otdr-testing-tips-and-tricks-quick-references-en.pdf
- FOA PON Power Meter (PDF integral extraído com `pdftotext`): https://www.foa.org/tech/ref/install/OPM%20and%20PON%20meters.pdf
- FOA OFSTP-14 / Insertion Loss (HTML integral): https://www.thefoa.org/tech/ref/testing/test/OFSTP-14.html
- FOA dB and dBm (HTML integral): https://www.thefoa.org/tech/ref/testing/test/dB.html
- FOA OTDRs (HTML integral): https://www.thefoa.org/tech/ref/testing/OTDR/OTDR.html
- FOA Reflectance / ORL: https://www.thefoa.org/tech/ref/testing/test/reflectance.html
- Fluke SimpliFiber Pro 1-jumper method (HTML integral): https://de.flukenetworks.com/knowledge-base/simplifiber-pro/scapc-scapc-fiber-testing-simplifiber-pro
- Yokogawa Two-Way OTDR Measurement (HTML integral): https://tmi.yokogawa.com/br/library/resources/application-notes/otdr-two-way-optical-fiber-measurement
