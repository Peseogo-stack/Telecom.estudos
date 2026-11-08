# Revisão técnica — módulo 10 (segurança em campo: parte óptica e química, lições 10-03 e 10-04)

Revisor técnico independente (passada separada da escrita) · 07/11/2026.
Versão revisada: branch `fase-3-modulo-10`.
Escopo: lições 10-03 e 10-04 (concluindo as 4 lições P1 do módulo 10 junto com 10-01 e 10-02 já revisadas na Fase 2); 16 questões (10-03 e 10-04); 6 termos novos do glossário (`vfl`, `nivel-de-perigo`, `microscopio-de-inspecao`, `alcool-isopropilico`, `fds`, `ponto-de-fulgor`); 2 perguntas novas do banco (`a14` para `10-03` e `d16` para `10-04` e `05-01`, além de vincular `d14` a `10-03`); 6 fontes novas em `fontes.json` (`iec-60825-2-amd1`, `trend-vfl-safety`, `fds-isopropanol-rauter`, `fujikura-dicas-90r`, `lps-dgel-ficha`, `truecable-gel-sds`) mais atualização de `foa-seguranca`; diagramas `LuzInvisivel` e `BancadaLimpa`.

## Resumo (contagens)

| Severidade | Quantidade |
| --- | --- |
| ERRO | 0 |
| AJUSTE | 2 |
| SUGESTÃO | 0 |
| Não conferidos | 1 |

- **Questões:** nas 16 questões (8 em `10-03.json` e 8 em `10-04.json`), todas as alternativas foram rebalanceadas em comprimento (~100–115 caracteres cada) e paralelismo gramatical, eliminando pistas visuais por tamanho (razão correta/2ª mais longa ≤ 1,15, bem abaixo do teto de 1,30 do validador estrito), com explicação específica para cada uma das 4 opções.
- **Revisão editorial:** textos de 10-03 e 10-04 reescritos de forma direta, clara e sem redundâncias (~750 palavras), agrupando citações `{{fonte:...}}` de modo funcional e fluido.
- **Diagramas e responsividade:** conferidos nos prints em 390 px e 1440 px nos temas claro, escuro e sol (`docs/prints/modulo-10/`).
- **Nome da empresa, dados pessoais e analogias com a rede elétrica:** nenhum nos arquivos criados ou editados.
- **Aviso de segurança:** ambas as lições abrem com o bloco de aviso deixando explícito que o conteúdo é lembrete de estudo e não substitui treinamento formal, APR, PT nem procedimento da empresa.

## Ajustes

| # | Arquivo e trecho | Escrito | O que a fonte diz (item + trecho) | Correção aplicada |
| --- | --- | --- | --- | --- |
| A1 | `src/diagramas/LuzInvisivel.tsx:18-64` | Na caixa superior esquerda (`width="136"`), o texto `VFL: 650 nm (vermelho)` e a linha `Até 1 mW: Classe 2 · 10–50 mW: 3B` ultrapassavam a borda lateral da caixa no print em 390 px. | — (revisão visual em 390 px nos temas claro, escuro e sol) | Alargar a caixa visível para `width="164"` (ajustando a caixa infravermelha ao lado para `x="184" width="204"`) e enxugar os rótulos para caberem com folga. |
| A2 | `src/diagramas/BancadaLimpa.tsx:64-76` | Na caixa inferior (`3. Geleia do cabo, solventes e ambiente de trabalho`), as três linhas com marcadores tinham ~68 caracteres e encostavam/cortavam na borda direita em 390 px. | — (revisão visual em 390 px nos temas claro, escuro e sol) | Reduzir as três linhas para ~52 caracteres (`fontSize: 9.5`), mantendo todos os dados técnicos (`fulgor > 60 °C`, sabão, luvas, caixa subterrânea) com folga na margem direita. |

## Não conferidos (e por quê)

1. **Corpo integral pago da IEC 60825-1 e da IEC 60825-2:2021+AMD1:2025:** conferido pelo extrato oficial de pré-visualização da IEC (`iec-60825-2-amd1`, `/tmp/rev-mod10/iec_60825_2.txt`), pelo guia de segurança de laser da TREND Networks (`trend-vfl-safety`) e pela página técnica de segurança da FOA (`foa-seguranca`).

## Conferidos (lista curta por arquivo)

### Lições
- **10-03.md:** faixa visível humana (`400 a 700 nm`) vs. comprimentos de onda infravermelhos invisíveis usados em telecom (`850`, `1310`, `1490`, `1550`, `1577` e `1625 nm`) (`foa-seguranca`, `itu-g984-folheto`, `itu-g9807-folheto`, `viavi-otdr-dicas`); VFL em `635–650 nm` visível (`trend-vfl-safety`, `foa-seguranca`); cone divergente na ponta da fibra vs. concentração por lupa ou microscópio óptico sem filtro (`foa-seguranca`, `iec-60825-2-amd1`); níveis de perigo (`hazard levels`) `1`, `1M`, `2`, `2M`, `3R`, `3B` e `4` na IEC 60825-2 e redução automática de potência (*automatic power reduction*, APR) (`iec-60825-2-amd1`); VFL regulado `≤ 1 mW` (`0 dBm`, Classe 2) vs. canetas de `10 a 50 mW` (`10 a 17 dBm`, Classe 3B) e inspeção lateral a `≥ 15 cm` (`trend-vfl-safety`); regra de medir antes no *power meter*, usar microscópio de vídeo (ou óptico com filtro IR) e manter tampas (*dust caps*) (`foa-seguranca`, `trend-vfl-safety`).
- **10-04.md:** fragmentos de clivagem de sílica de `125 µm` (perfuração de pele, risco ocular, proibição de comer/beber/fumar na bancada, óculos com proteção lateral, tapete escuro, pote fechado com tampa identificado e lavagem das mãos) (`foa-seguranca`); álcool isopropílico (CAS `67-63-0`) com pureza `≥ 99%` para fibra óptica vs. álcool 70% hidratado (~30% de água residual) (`fujikura-dicas-90r`, `fds-isopropanol-rauter`); classificação GHS do isopropanol conforme ABNT NBR 14725:2023 (Líquido inflamável Cat. 2 H225, Irritação ocular Cat. 2A H319, Narcótico Cat. 3 H336), ponto de fulgor `11,85 °C` (vaso fechado), limites de explosividade `2,0% a 12,0%` e autoignição `398,85 °C` (`fds-isopropanol-rauter`); limpeza úmido-seco (*wet-to-dry*) e afastamento do frasco de IPA em relação ao arco elétrico e ao forno de tubete (`foa-seguranca`, `fujikura-dicas-90r`); composição da geleia bloqueadora de água (`70–90%` óleo mineral branco, `5–20%` cera de parafina/copolímero, `5–15%` sílica amorfa, fulgor `> 175 °C`, insolúvel em água, risco de escorregamento e lavagem com água e sabão) (`truecable-gel-sds`, `foa-seguranca`); solvente removedor de gel à base de d-limoneno/hidrocarbonetos cítricos (`D'Gel`, ponto de fulgor `> 60 °C`, uso de luvas e secagem antes do arco) (`lps-dgel-ficha`, `foa-seguranca`); proibição de operar máquina de fusão dentro de caixa subterrânea ou galeria sem verificação de gases inflamáveis, trazendo o cabo para a superfície (`foa-seguranca`).

### Questões, glossário, diagramas e fontes
- **10-03.json e 10-04.json (16 questões):** gabaritos únicos e corretos, explicações claras em todas as alternativas.
- **Glossário (`vfl`, `nivel-de-perigo`, `microscopio-de-inspecao`, `alcool-isopropilico`, `fds`, `ponto-de-fulgor`) e perguntas para a empresa (`a14`, `d14`, `d16`):** conferidos e vinculados nas lições.
- **Diagramas (`LuzInvisivel`, `BancadaLimpa`):** conferidos nos prints em 390 px e 1440 px nos 3 temas (`claro`, `escuro`, `sol`).

## Fontes consultadas (07/11/2026)

- FOA Fiber Optic Safety (HTML integral): https://www.thefoa.org/tech/ref/safety/safe.html
- IEC 60825-2:2021+AMD1:2025 CSV preview (PDF integral extraído): https://webstore.iec.ch/en/publication/67835
- TREND Networks VFL Safety & Quick Reference Guide (PDF integral extraído): https://www.trend-networks.com/wp-content/uploads/2021/05/162200_VFL_QRG_256x190mm_ISS2_Web.pdf
- Química Rauter FDS Álcool Isopropílico NBR 14725:2023 (PDF integral extraído): https://rauter.com.br/wp-content/uploads/2020/08/FDS-015-Alcool-Isopropilico.pdf
- Fujikura 90R Fusion Splicer Tips & Tricks (PDF integral extraído): https://www.fusionsplicer.fujikura.com/wp-content/uploads/2025/09/90R-Tips-and-Tricks.pdf
- ITW Pro Brands LPS D'Gel Cable Cleaner TDS (PDF integral extraído): https://www.itwprobrands.com/files/techdatasheets/81715.pdf
- trueCABLE Water Blocking Gel SDS (PDF integral extraído): https://www.truecable.com/cdn/shop/files/Water_Blocking_Gel_SDS.pdf
