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
