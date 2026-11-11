# Revisão técnica do módulo 1: telecom numa distribuidora

Revisão de 09/11/2026, branch `modulo-01-e-videos`.

O Sonnet escreveu o conteúdo a partir de uma ficha de fatos com o trecho literal de cada fonte. Eu conferi cada frase das seis lições, os termos do glossário, as perguntas para a empresa, as questões e os diagramas contra o trecho da fonte. Os originais baixados ficam fora do Git; o `content/fontes.json` traz, na observação de cada fonte, os números conferidos.

## Fontes

São 19 fontes, todas acessadas em 09/11/2026:

| Tipo | Fontes |
| --- | --- |
| Fabricante, artigo técnico | SEL: tempos da IEC 61850; teleproteção sobre MPLS; segurança do GOOSE; assimetria do canal |
| Registro e código | IANA (portas); Wireshark (EtherTypes) |
| Norma (página oficial) | IEEE 1815 (DNP3); IEC 62439-3 (PRP e HSR); IEEE 1222 (ADSS) |
| Fabricante | Software Toolbox (IEC 61850); Schneider (IEC 104); Hitachi Energy (FOX615 e ETL600); Cisco (automação da distribuição) |
| Governo | U.S. DOE (requisitos de comunicação) |
| Universidade | Strathclyde (MPLS em teleproteção) |
| Imprensa técnica | Teletime (redes privativas e 450 MHz); T&D World (requisitos de telecom no Brasil) |

Falharam e ficaram fora:

- a prévia da IEC 60834-1 (404);
- a página do IEEE 1138 (403).

O OPGW ficou com a T&D World, que diz que ele é obrigatório nas linhas de transmissão novas no Brasil.

## O que a revisão mudou nas lições

| Lição | Estava | Fonte | Ficou |
| --- | --- | --- | --- |
| 01-01 | "Dá o vocabulário dos próximos módulos" | — | "das próximas lições do módulo" |
| 01-01 | SCADA "500 ms a 5 s" | Cisco: "~500 ms to ~5 seconds" | "cerca de 500 ms a 5 s" |
| 01-01 | "A resposta [o prazo] decide a tecnologia" | Sem fonte para "decide" | O prazo pesa na escolha do meio (lição 01-06) |
| 01-01 | "Copiar para a distribuição os requisitos da transmissão" (erro comum) | T&D World: na distribuição, os requisitos são menos rígidos | "Supor que os requisitos da transmissão valem iguais na distribuição" |
| 01-02 | Prometia "controle" e não tratava dele | SEL: as operadoras planejam desligar as linhas analógicas alugadas; um link Ethernet alugado caiu 2 min 33 s, com suspeita de firmware da operadora; as empresas evitam circuito alugado no diferencial | Nova parte "Controle", com esses exemplos e a T&D World ("implement, operate and maintain") |
| 01-02 | "O diferencial exige 5 ms", sem dizer de quê | SEL, Tabela 1: restabelecimento em 5 ms | "pede restabelecimento em até 5 ms" |
| 01-02 e 01-06 | OPGW como "cabo de aterramento" | Termo usual: cabo para-raios | "cabo para-raios" |
| 01-02 | "Aplicar à distribuição a regra de dois canais" | Lido como "não precisa" | A regra da rede básica não vale automaticamente; vale o procedimento da empresa |
| 01-03 | "102? MMS" | IANA: a 102 é ISO-TSAP | "Provavelmente MMS"; a 102 não é só do MMS; as portas podem ser trocadas |
| 01-04 | "Divergência de redação" sobre a classe do GOOSE | As duas fontes da SEL concordam (P2/P3 = 3 ms; P1 cerca de 10 ms) | Sem "divergência" |
| 01-04 | Prioridade 802.1p sem fonte | SEL: 802.1Q e 802.1p põem etiqueta de prioridade; a mensagem crítica sai antes e só espera por pacotes de prioridade igual ou maior | Frase com a fonte |
| 01-05 | "Contratos costumam medir o SLA por mês" | Lição 09-01: mensal e anual existem | "pode ser medido por mês ou por ano" |
| 01-05 | "A SEL testou um anel" | SEL: anel de dez switches como exemplo | "usa como exemplo" |
| 01-05 | "Disparo direto em até 20 ms" | SEL: 20 ms é o disparo completo; 3 ms é a transferência | Saiu, para não confundir com os 3 ms; ficaram as taxas de sucesso (99,99% e 99,999999%) |
| 01-05 | "Não são regra da distribuição" | Sem fonte para afirmar o contrário | "Na distribuição, vale o procedimento da empresa", com selo "confirmar" |
| 01-06 | "Uso típico" e "limite" descrevendo propriedades | — | SDH: teleproteção, legado em migração; rádio: redes próprias; celular: rede da operadora ou espectro privado |
| 01-06 | PLC "é um dos dois meios" da regra | T&D World dá como exemplo | "pode ser o segundo meio" |

## Glossário e perguntas para a empresa

**Glossário: 24 termos novos.** A revisão corrigiu seis:

- **SCADA:** nome em português.
- **Teleproteção:** é o esquema de proteção, não só o canal.
- **OPGW:** cabo para-raios.
- **RSTP:** não é "protocolo de anel".
- **DTT:** definição da Cisco.
- **Assimetria:** definição da SEL de 2025, a diferença de atraso entre ida e volta.

**Perguntas para a empresa: 7 novas.** Saiu a c17, que repetia a c08. As perguntas antigas c06, c07 e c08 foram ligadas às lições 01-01 e 01-02.

## Questões (revisão de 11/11/2026)

São 48 questões, 8 por lição. Li as de 01-03 a 01-06 frase a frase contra a lição e a fonte. As de 01-01 e 01-02 já estavam conferidas; mexi só na 01-01-q5.

| Questão | Estava | Ficou |
| --- | --- | --- |
| 01-01-q5 | Uma alternativa concordava com o colega e três discordavam | Duas concordam e duas discordam; a nova errada ("até o trip fica entre 100 ms e 2 s") cai pela tabela do DOE |
| 01-03-q5 | A explicação não dizia que há saída para levar GOOSE para fora da LAN | Diz que isso exige solução própria, como as que a Cisco cita para a rede celular |
| 01-04-q4 | "Sem autenticação nativa nem certificado" | "Segundo a SEL, sem autenticação nativa" |
| 01-04-q5, q6 | Três alternativas concordavam com o colega e só a correta discordava: dava para acertar por exclusão | Duas concordam e duas discordam |
| 01-04-q8 | A correta dizia que a norma não tem prioridade padrão | A IEC 61850-8-1 indica prioridade 4 para o GOOSE, e o projeto pode usar de 0 a 7 (fonte abaixo); alternativas refeitas, duas concordando e duas discordando |
| 01-06-q4 | A explicação de uma errada dizia que a Strathclyde achou "desempenho variado", o que a lição não traz | Cita a conclusão da Strathclyde como está na fonte |

01-05 e 01-06: sem erro de conteúdo; os números (8,76 h, 52,6 min, 5,26 min, 99 a 99,999%, 99,99% e 99,999999%, 9600 bps e 256 kbps) batem com a lição e com a fonte.

## Prioridade padrão do GOOSE

A dúvida era se a IEC 61850-8-1 dá um valor padrão. Dá. Fonte aberta: Hou e Dolezilek, "IEC 61850 – What It Can and Cannot Offer to Traditional Protection Schemes" (SEL, WPRC 2008), página 8: "The IEC 61850-8-1 standard specifies that default GOOSE messages should have a priority level of 4. However, network designers and protection engineers can choose any value between 0 and 7". A ajuda do AC500 da ABB e a base de conhecimento da COPA-DATA dizem o mesmo (padrão 4, faixa 0 a 7), sem citar a parte da norma; ficaram só como confirmação. A lição 01-04, o erro comum e a questão 8 foram corrigidos, e a fonte `sel-61850-tradicional` entrou em `content/fontes.json`.

## Diagramas

Conferi os seis desenhos contra a lição: todos os números batem (prazos de 3 ms a 15 s, restabelecimento de 5, 20 e 50 ms, portas e EtherTypes, retransmissão do exemplo da SEL, noves, taxas do PLC). Mudanças:

- 01-02: "Diferencial de linha exige até 5 ms" virou "pede até 5 ms", como na lição.
- 01-06: o limite do SDH virou "legado, em migração para pacotes", como na tabela da lição.
- `diagrama_descricao` reescrito em 01-01, 01-02, 01-04, 01-05 e 01-06 para descrever o desenho como ele é (blocos empilhados, régua de 1 ms a 10 s, anel de seis switches, cartões empilhados). A de 01-03 já batia.

## Vídeos

- 01-03 e 01-04: o mesmo vídeo da Conprove (conceitos do IEC 61850, GOOSE e SV), com aviso de que a parte final apresenta produtos.
- 01-06: um vídeo sobre o OPGW.
- 01-01, 01-02 e 01-05: só termos de busca; não havia candidato.
- Ficaram de fora os dois do Bê-á-bá da IEC: a descrição não diz se tratam do que a lição ensina.
