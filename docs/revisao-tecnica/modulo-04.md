# Revisão técnica — módulo 4 (FTTH/PON: lições 04-01, 04-03 e 04-05)

Revisão de 09/11/2026, branch `revisao-p1`. Substitui o relatório anterior, de 07 e 08/11/2026.

**Escopo:** lições 04-01, 04-03 e 04-05, suas 24 questões, os diagramas `AnatomiaFtth`, `SplittersBalanceados` e `OrcamentoPon` e os termos olt, onu e odn.

**Método:** cada número foi comparado com a ficha ou a norma.

- Splitters: as fichas Intelbras, SENKO e FS. Os valores da FS estão em imagem no PDF e foram lidos na imagem da página de especificação.
- GPON B+: a ITU-T G.984.2 (Tabelas A.1 e A.2), conferida na revisão do módulo 2, e as fichas FS de OLT e ONU, baixadas de novo.
- OTDR em PON: FOA, *Testing Fiber To The Home*.
- Splitter bidirecional: FOA, *Fiber Optic Splitters for PONs*.

## Resumo

| Severidade | Quantidade |
| --- | --- |
| ERRO | 12 |
| AJUSTE | 5 |
| Não conferido | 1 |

## Erros corrigidos

| # | Onde | Estava escrito | O que a fonte diz | Correção |
| --- | --- | --- | --- | --- |
| E1 | 04-03, tabela e questão q5 | Coluna FS "com conectores": 4,0 / 7,4 / 10,7 / 13,9 / 17,2 / 21,4 dB. | Ficha FS: ≤ 4,4 / 7,6 / 10,9 / 13,9 / 17,3 / 21,4 dB, *"Specified without connectors"*, *"Add an additional 0.2dB loss per connector"*. | Valores e rótulo corrigidos. Nas três fichas, o máximo é sem conectores. |
| E2 | 04-03 | SENKO 1:2 "—". | SENKO: *"Insertion Loss Max. (dB): 4 / 7.4 / 10.7 / 13.7 / 16.9 / 21"*. | 4,0 dB. |
| E3 | `SplittersBalanceados` | 1:32 com "≤ 17,0 dB". | Nenhuma ficha traz 17,0: Intelbras e SENKO dão 16,9; a FS, 17,3. | Faixas por ficha: 16,9 a 17,3 dB (e as demais). |
| E4 | 04-03 | "ORL com conectores SC/APC garantida acima de 55 dB". | Intelbras e FS: perda de retorno ≥ 50 dB; diretividade ≥ 55 dB. SENKO: perda de retorno ≥ 55 dB. O conector SC/APC da Intelbras: ≥ 60 dB. | Os três números, cada um com o que é. |
| E5 | 04-03 | Uniformidade "não deve exceder 0,8 a 1,5 dB em splitters 1:8 e 1:16". | Intelbras: ≤ 0,8 dB (1:8), ≤ 1,2 dB (1:16), ≤ 1,5 dB (1:32). | Valores por modelo. |
| E6 | 04-01, tabela e questões q5 e q8 | Divisão centralizada: "da OLT, o operador vê o degrau do splitter e a ponta de cada drop"; em dois níveis, "os 21 dB cegam o OTDR". | FOA: da central, *"multiple traces from each downstream fiber combine"*; o traço é *"very complex to analyze"*; *"OTDRs are generally used on PONs from the subscriber end toward the CO"*. | O OTDR se usa do lado do cliente em direção à central, em qualquer topologia; da central, ele serve para medir o comprimento dos ramos. |
| E7 | 04-01, Erros comuns | UPC em APC "induz **alta** perda de retorno" e "destrói o núcleo". | Reflexão forte é perda de retorno **baixa**. Fluke: o efeito antirreflexo some e a reflexão fica forte. Nada sobre destruir o núcleo. | "A reflexão fica forte (perda de retorno baixa)". |
| E8 | 04-05 | Fibra a "0,25 a 0,35 dB/km em 1490 nm (FOA)". | A FOA não traz esse valor. A G.652.D tem máximo de 0,40 dB/km de 1310 a 1625 nm, e a ferramenta usa esse máximo (decisão D12). | O exemplo usa 0,40 dB/km. |
| E9 | 04-05 e diagrama | Exemplo "10 km: 2,5 + 21 + 1,5 + 3 = 28 dB", fechando no limite, sem a penalidade de 0,5 dB, e diferente da ferramenta. | G.984.2, Tabela A.1: penalidade de 0,5 dB; orçamento de 1,5 − (−27) − 0,5 = 28,0 dB. | O exemplo agora é o mesmo que abre a ferramenta: 24,9 dB de perdas + 3 dB de margem = 27,9 dB ≤ 28,0 dB. |
| E10 | 04-05, diagrama e questão q5 | Faixa "ideal" de −15 a −25 dBm como regra, com fontes G.984.2 e Omada. | Nenhuma das duas traz essa faixa; a G.984.2 garante de −27 a −8 dBm (classe B+). Nenhuma fonte confiável foi achada para −15 a −25 dBm. | A faixa sai como número; fica "a empresa costuma usar uma faixa mais estreita: confirmar". |
| E11 | 04-05 e questão q2 | "Abaixo de −27 dBm: LOS"; "BER máxima de 10⁻⁴". | −27 dBm é a sensibilidade especificada. A ficha FS mede a sensibilidade com *"BER 1X10^-10, pre-FEC"*. | "Abaixo de −27 dBm, a taxa de erros não é mais garantida"; a explicação cita 10⁻¹⁰. |
| E12 | 04-03, 04-05 | Fórmulas em LaTeX, que o app mostrava cruas. | O pipeline não renderiza LaTeX. | Texto; o validador agora barra LaTeX. |

## Ajustes

| # | Onde | Ajuste |
| --- | --- | --- |
| A1 | 04-05 | Conectores e fusões "0,3 dB e 0,10 a 0,15 dB" sem fonte viraram os máximos da TIA (0,75 dB por par; 0,3 dB por emenda), como na ferramenta; a FOA aparece como referência de planejamento. |
| A2 | 04-05 | Atenuador de bancada "de 15 a 20 dB" vira "pelo menos 13 dB": a perda mínima da classe B+ existe porque a OLT a +5 dBm menos 13 dB dá a sobrecarga de −8 dBm. |
| A3 | 04-05 | A ONU "danificada" acima de −8 dBm vira "saturada". A sobrecarga é limite de funcionamento, não de dano. |
| A4 | 04-01 e glossário | "Central / Subestação" vira "central"; onde fica a OLT é coisa de confirmar. |
| A5 | 04-03 | A "perda em excesso" passa a ter fonte (FOA: 1:4 = 6 dB de divisão + cerca de 1 dB de excesso), e o splitter "bidirecional" também (FOA). |

## Não conferido

- **Texto da G.984.2.** O endereço citado é a página de capa da ITU. Os valores B+ (Tabelas A.1 e A.2) foram lidos no PDF na revisão do módulo 2 e conferem com as fichas FS de OLT e ONU, baixadas de novo agora.
