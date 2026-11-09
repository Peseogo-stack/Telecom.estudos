# Revisão técnica — módulo 10 (segurança: lições 10-03 e 10-04)

Revisão de 09/11/2026, branch `revisao-p1`. Substitui o relatório anterior (de 07/11/2026), que registrava "0 erros" sem ter conferido as fontes.

**Escopo:** lições 10-03 e 10-04, suas 16 questões, os diagramas `LuzInvisivel` e `BancadaLimpa`, os termos do glossário e as fontes que elas citam.

**Método:** cada frase foi lida contra o trecho da fonte, baixada de novo nesta revisão:

- FOA, *Safety in Fiber Optic Installations* (página inteira);
- IEC 60825-2:2004/AMD1:2006, amostra oficial da iTeh (cláusula 4.4, item 4.6.1 e Tabelas 1 a 3);
- TREND Networks, nota de aplicação sobre VFL;
- FDS do isopropanol (Rauter, 01/07/2025);
- ficha do D'Gel FO (LPS) e dicas de manutenção da 90R (Fujikura);
- NR-33.

Regra da revisão: nada pode afrouxar uma regra de segurança. Na dúvida, o item fica com "confirmar na empresa".

## Resumo

| Severidade | Quantidade |
| --- | --- |
| ERRO (afirmação errada ou atribuída a uma fonte que não diz aquilo) | 12 |
| ERRO que afrouxava regra de segurança | 1 |
| AJUSTE | 8 |
| Não conferido | 1 |

## Erros corrigidos

| # | Onde | Estava escrito | O que a fonte diz | Correção |
| --- | --- | --- | --- | --- |
| E1 | 10-04, Erros comuns | "Realizar emendas no interior de galerias subterrâneas **sem ventilação forçada ou teste prévio de atmosfera inflamável**". Isso sugere que, com ventilação ou teste, a fusão lá dentro seria aceitável. **Afrouxava a regra.** | FOA: *"Splicing is never done in manholes where gasses can accumulate. The cables are brought up to the surface into a splicing trailer"*. | "Fazer fusão dentro de caixa subterrânea 'porque ventilou um pouco'". Entrou também o aviso de espaço confinado (NR-33, 33.2.2), com "confirmar na empresa". |
| E2 | 10-03, Explicação | "Todos os sinais ópticos usados para transportar dados **e testar fibras** operam no infravermelho". | O próprio texto e a FOA tratam o VFL (650 nm) como luz visível. | Os sinais de dados e a maior parte dos testes são infravermelhos; o VFL, vermelho visível, é a exceção. |
| E3 | 10-03, tabela IEC | Só o 3B teria "rotulagem preta sobre fundo amarelo". | IEC 60825-2 AMD1, 4.6.1: *"Markings shall be coloured black on a yellow background"*. Vale para todas as marcações exigidas. | A tabela foi refeita pelas Tabelas 1 a 3: nível máximo por local e o que avisa cada etiqueta (2M, 1M, 3R, 3B). A cor vale para todas. |
| E4 | 10-03, tabela IEC | Em local sem restrição, a regra era "proibido observar com instrumentos". | 4.4.1: acima do nível 2 (visível) ou 1 (infravermelho), *"suitable means shall limit access to the radiation from the connector"*. Não observar com instrumentos é o texto da etiqueta do 2M (e do 1M em local restrito). | A regra de local sem restrição é limitar o acesso à luz. O aviso sobre instrumentos aparece como texto da etiqueta. |
| E5 | 10-03, VFL | Canetas vendidas com "alcance de 10 a 30 km". | TREND: *"claim to be visible over 10+km"*. | "Visíveis a mais de 10 km". |
| E6 | 10-03, VFL | "Queimadura permanente de retina por [...] reflexão especular **em ferrolhos metálicos**". | TREND: *"direct or reflected exposure is an eye hazard [...] can result in permanent eye damage"*. Não fala de ferrolho metálico. | "Lesão permanente no olho, por feixe direto ou refletido". Que 650 nm chega à retina vem da FOA. |
| E7 | 10-03, Na prática | Microscópio de vídeo citado com a fonte VIAVI ("o olho nunca se alinha com o feixe"). | A nota da VIAVI diz *"Inspect [...] Before You Connect"*; não trata de segurança ocular do microscópio. | VIAVI só para "inspecione antes de conectar". O microscópio de vídeo é explicado pela lógica (você olha uma tela). |
| E8 | 10-04 | "Recipiente rígido com **tampa rosqueável**". | FOA: recipiente próprio com tampa (*"takeout [...] containers, in the pint size, with a lid"*), tampado e passado fita no fim. | "Recipiente próprio com tampa", com o destino conforme a regra da empresa. |
| E9 | 10-04 e questão 10-04-q6 | Gel do cabo "com cerca de 95% de óleo mineral e 5% de parafina", piso escorregadio, lavar com sabão neutro. | A fonte (trueCABLE) é a ficha do gel de um **cabo de cobre Cat6** de enterrar, não de cabo óptico. | A composição e a fonte saem. O gel é tratado pela FOA (limpar com o produto apropriado; pedir a ficha de segurança de cada produto). A q6 foi reescrita. |
| E10 | 10-04 | Removedor D'Gel "à base de **d-limoneno**", "luvas de **nitrila**". | Ficha LPS: odor cítrico, *"May cause an allergic skin reaction [...] Wear protective gloves/eye protection/face protection"*, ponto de fulgor acima de 61 °C (TCC). Não traz d-limoneno nem nitrila. | Ficam o que a ficha diz: alergia, luvas e proteção para olhos e rosto, longe de calor e faísca, secar antes. |
| E11 | 10-04 e questão 10-04-q8 | Arco "a mais de 1.800 °C" e "da ordem de 2.000 °C". | Nenhuma fonte citada traz a temperatura. | O número sai; fica "a máquina emenda com arco elétrico". |
| E12 | Questões 10-04-q4 e q5 | Álcool 70% "oxida componentes"; acetona e thinner "danificam vedações", ar comprimido "tem óleo". | As fichas só pedem pureza de 99% ou mais (Fujikura; Tempo; FOA, limpeza). | As explicações passam a dizer o que as fontes dizem. |
| E13 | Questão 10-03-q5 | VFL de 1 mW "protegido pelo piscar"; o de 10 a 50 mW "gera lesão". | TREND: até 1 mW, seguro por até 1/4 s porque a pessoa desvia o olhar; Classe 3B *"can result in permanent eye damage"*. | "Reflexo de desviar o olhar" e "pode lesar o olho". |

## Ajustes

| # | Onde | Ajuste |
| --- | --- | --- |
| A1 | 10-03 | "Lesões térmicas" na córnea sai: a FOA diz *"might harm the cornea or lens"*, sem falar em efeito térmico. |
| A2 | 10-03 | O item "tampas de proteção", que estava sem fonte, agora cita a FOA (limpeza): *"always keep dust caps on connectors"*. |
| A3 | 10-03, questão q7 | O enunciado perguntava "o que significa o M" sem que nenhuma alternativa respondesse. Agora pergunta o que avisa a etiqueta do 2M. |
| A4 | 10-04 | "Os acidentes mais frequentes" eram atribuídos ao álcool. A FOA diz só que o risco real para os olhos são os cacos de fibra. |
| A5 | 10-04 | "Os fabricantes exigem 99%" passa a "a Fujikura pede 99% ou mais" e "a FOA, isopropílico 99% para conectores". |
| A6 | 10-04 | A tabela da FDS foi conferida item a item: H225, H319 e H336; ponto de fulgor de 11,85 °C (vaso fechado) e 21 °C (vaso aberto); limites de 2% a 12%; 310 ppm e 765 mg/m³, com absorção pela pele; P210 e P233. |
| A7 | `LuzInvisivel` | "PROIBIDO (níveis 1M / 2M+)", rótulo confuso, vira "NÃO FAÇA"; e "foca o feixe" vira "concentra a luz". |
| A8 | `BancadaLimpa` | Saem a composição do gel e o D'Gel nominal; fica "Gel: limpar com o produto apropriado; pedir a ficha". |

## Não conferido

- **IEC 60825-1 (classes de laser).** A norma é paga. A revisão usou a amostra oficial da IEC 60825-2 AMD1 e a nota da TREND para as classes do VFL. As definições de local sem restrição, restrito e controlado são da norma-base (60825-2:2004), que não está na amostra. A lição as descreve de forma resumida e manda confirmar na empresa como cada local é classificado.
