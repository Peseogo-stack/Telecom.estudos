# Currículo — 12 módulos, 73 lições

> Versão 0.2 · 07/11/2026 · baseado em `docs/pesquisa.md` e nas decisões de `docs/decisoes.md`
> Cada lição: 10–15 min (explicação + diagrama + na prática + erros comuns + pergunte na empresa + fontes + 5 questões).
> **P1** = primeiras 4 semanas (29 lições). **P2** = semanas 5 a 13 (44 lições).
> 🏢 = a lição tem valores que dependem do padrão da empresa ("confirmar na empresa").

## Visão geral

| # | Módulo | Lições | P1 | Ferramentas ligadas |
| --- | --- | --- | --- | --- |
| 1 | Telecom numa distribuidora | 6 | 0 | — |
| 2 | Fibra óptica | 7 | 7 | Conversor dBm ↔ mW |
| 3 | Cabos e componentes | 7 | 4 | Código de cores, comprimento de cabo |
| 4 | FTTH/PON | 6 | 3 | Orçamento de potência, splitters, montador PON |
| 5 | Fusão | 6 | 3 | Checklist "antes da fusão" |
| 6 | Testes | 7 | 3 | Leitor de OTDR, checklist de aceite |
| 7 | Postes e compartilhamento | 7 | 0 | Inspeção de poste, checklist de fiscalização |
| 8 | QGIS | 7 | 0 | Guia QGIS + dados fictícios |
| 9 | Contratos e fornecedores | 6 | 5 | **Disponibilidade e glosa (P1)**, modelo de planilha |
| 10 | Segurança | 5 | 4 | Checklist "antes de subir no poste" |
| 11 | Redes (só o que telecom usa) | 6 | 0 | — |
| 12 | Carreira | 3 | 0 | Trilha de certificados |
| | **Total** | **73** | **29** | |

**Por que essa ordem:** contratos são a primeira atividade da função (SLA, chamados, fiscalização e relatórios mandados por fornecedores). Por isso a semana 1 junta **segurança e contratos**, e a semana 2 traz a **fibra básica** (dB, dBm e perdas) para entender os números desses relatórios. Fusão, PON e postes vêm depois.

---

## Módulo 1 — Telecom numa distribuidora

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 01-01 | Por que uma distribuidora tem rede própria | Listar os serviços (SCADA, automação de subestação, teleproteção, medição/AMI, religadores, corporativo) e o tempo de resposta de cada um. | P2 🏢 |
| 01-02 | Rede própria × link de operadora | Comparar controle, latência, custo, tempo de reparo e falha em comum. | P2 🏢 |
| 01-03 | Os protocolos que você vai ouvir: DNP3, IEC 60870-5-104 e IEC 61850 | Camada, porta ou EtherType e função de cada um. | P2 |
| 01-04 | GOOSE: por que camada 2 e multicast | O limite de ~3 ms, VLAN e prioridade 802.1p. | P2 |
| 01-05 | Disponibilidade, anel e rotas diferentes | "Noves" em horas/ano; anel e rotas fisicamente distintas. | P2 |
| 01-06 | Meios de transporte: fibra, rádio, PLC, SDH, MPLS-TP e celular | Meio × uso típico × limite. | P2 🏢 |

## Módulo 2 — Fibra óptica (abre a Fase 3)

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 02-01 | Como a luz fica presa no vidro | Núcleo, casca, índice de refração, reflexão interna total. | P1 |
| 02-02 | Anatomia: 9/125, 250 e 900 µm | Ler "9/125"; revestimento primário × *tight buffer*. | P1 |
| 02-03 | Monomodo × multimodo, OM e OS | Diâmetros, dispersão modal e alcance. | P1 |
| 02-04 | G.652.D e a família G.657 | Raios mínimos (30 / 10 / 7,5 / 5 mm); A × B. | P1 🏢 |
| 02-05 | Janelas e bandas | 850, 1310, 1383, 1490, 1550, 1577, 1625/1650 nm e bandas O–U. | P1 |
| 02-06 | Por que a luz se perde | Rayleigh, absorção, curvatura; 0,4/0,3 dB/km (limite G.652.D) × ficha. | P1 |
| 02-07 | dB e dBm sem medo | mW ↔ dBm, somar perdas, potência que chega. | P1 |

## Módulo 3 — Cabos e componentes

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 03-01 | Ler a gravação do cabo | Decodificar `CFOA-SM-AS80-S 12FO NR`. | P1 |
| 03-02 | Por dentro do cabo | FRP, tubo loose, aramida, hidroexpansíveis, capa. | P2 |
| 03-03 | Código de cores: Brasil × TIA-598 | As 12 cores e a ordem TIA. | P1 🏢 |
| 03-04 | Tubo piloto, direcional e mais de 12 | Contar tubos e fibras em 48 e 144 fibras. | P1 🏢 |
| 03-05 | Tipos de cabo e onde usar | ADSS, figura 8, drop, duto, OPGW. | P2 🏢 |
| 03-06 | Ferragens, ancoragem × suspensão e reserva técnica | Ferragem certa para cada ponto. | P2 🏢 |
| 03-07 | Conectores, polimento e DIO | SC/LC/FC; UPC (azul) × APC (verde); CEO, CTO, DIO, PTO. | P1 🏢 |

## Módulo 4 — FTTH/PON

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 04-01 | Anatomia de uma rede FTTH | OLT, ODN, splitters, CTO, drop, PTO, ONU. | P1 |
| 04-02 | GPON × XGS-PON e coexistência | Taxas, λ, classes B+, C+, N1, N2. | P2 |
| 04-03 | Splitters balanceados: teoria × ficha | 10·log₁₀(N) × máximo de ficha. | P1 |
| 04-04 | Splitters desbalanceados e a rede em cascata | Pernas passante e derivada. | P2 🏢 |
| 04-05 | Orçamento de potência passo a passo | Tabela de perdas, margem, classe; sinal na ONU. | P1 🏢 |
| 04-06 | PON × ponto a ponto na distribuidora | SFP LX/BX/ZX; saturação; usos. | P2 🏢 |

## Módulo 5 — Fusão

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 05-01 | Fibra limpa, emenda boa | Preparo, decapagem, limpeza. | P1 🏢 |
| 05-02 | O corte perfeito | Clivagem e descarte. | P2 |
| 05-03 | Dentro da máquina | Alinhamento núcleo × casca, arco, *arc check*. | P1 🏢 |
| 05-04 | O número da tela não é a verdade | Perda estimada × OTDR; ficha × contrato. | P1 🏢 |
| 05-05 | Erros na tela | Bolha, emenda gorda/fina, sujeira, ângulo. | P2 |
| 05-06 | Fechando a caixa | Tubete, bandeja, raio, mapa de fusão. | P2 🏢 |

## Módulo 6 — Testes

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 06-01 | Power meter e perda de inserção | Medir perda com referência de 1 cordão (TIA-526-7 / IEC 61280-4-2). | P1 |
| 06-02 | Como o OTDR "enxerga" | Retroespalhamento, Fresnel, dB/km. | P1 |
| 06-03 | Eventos no traço | Conector, fusão, curvatura, quebra, ganho aparente, fim. | P1 |
| 06-04 | Duas λ e dois sentidos | Curvatura × fusão; média bidirecional. | P2 |
| 06-05 | Configurar o OTDR | Pulso, zonas mortas, IOR, bobinas. | P2 🏢 |
| 06-06 | Inspecionar e limpar conectores | IEC 61300-3-35, zonas A–D. | P2 |
| 06-07 | Relatório de OTDR em detalhe | Traço, tabela de eventos, bidirecional, ORL (aprofunda a 09-05). | P2 🏢 |

## Módulo 7 — Postes e compartilhamento
Valores de exemplo: **Cemig ND-6.6** e **Energisa NDU-009**, sempre marcados. Quem manda é a norma da distribuidora local.

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 07-01 | Quem manda no poste | Detentor × ocupante; Res. Conjunta 4/2014, REN 1.044/2022. | P2 🏢 |
| 07-02 | Anatomia do poste e faixa de ocupação | MT, BT, IP, faixa de 0,5 m; 0,60 m da BT (exemplos). | P2 🏢 |
| 07-03 | Plaqueta e identificação | Onde vai, o que informa; clandestino. | P2 🏢 |
| 07-04 | Reserva, CEO, CTO e drops | Onde cada coisa pode ficar. | P2 🏢 |
| 07-05 | Alturas ao solo | Rua, entrada de veículos, pedestres. | P2 🏢 |
| 07-06 | Fiscalizar, notificar, retirar | Fluxo da REN 1.044. | P2 🏢 |
| 07-07 | Riscos em Roraima e o novo regulamento | Chuva, raios, queimadas; "posteiro" (ainda não vigente). | P2 |

## Módulo 8 — QGIS
Caminhos de menu na **3.44 LTR** (principal) e na **4.2** (aba).

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 08-01 | O que é o QGIS e qual versão eu tenho | LTR × latest; 3.44 → 4.4 LTR em 03/2027. | P2 🏢 |
| 08-02 | Vetor, raster, feição e atributo | Geometrias e tabela de atributos. | P2 |
| 08-03 | SRC sem medo: SIRGAS, UTM 20S e o erro de 10.000 km | 31980 × 4674; zona 21 no leste. | P2 🏢 |
| 08-04 | Formatos de arquivo | GPKG, SHP, KML, CSV, DXF. | P2 |
| 08-05 | Editar com segurança | Modo de edição, ponto, vértice, salvar. | P2 |
| 08-06 | Perguntas à camada | Expressões, filtros, contagens. | P2 |
| 08-07 | Campo com QField | Empacotar → coletar offline → sincronizar. | P2 🏢 |

## Módulo 9 — Contratos e fornecedores (semana 1)

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 09-01 | Quanto é 99,7%? | Converter disponibilidade em minutos de parada por mês e por ano; SLA mensal × anual. | P1 |
| 09-02 | A glosa na prática | Calcular o desconto (Dc = Cm × Ti / To), as exclusões e as variantes de regra. | P1 🏢 |
| 09-03 | Gestor × fiscal | Separar os papéis (vocabulário da Lei 14.133 e do Decreto 11.246, usado como boa prática em empresa privada). | P1 🏢 |
| 09-04 | Tipos de contrato de telecom | Link IP, L2/MPLS, fibra apagada/IRU, construção, manutenção, postes. | P2 🏢 |
| 09-05 | Conferir o relatório de teste ou de aceite do fornecedor | Checar se o relatório está completo (OTDR bidirecional, λ, IOR, power meter, mapa de fusão, as built) e se os números cabem no contrato. | P1 🏢 |
| 09-06 | Chamado e escalonamento | Abrir chamado com evidências; N1 → N2 → N3; incidente × problema × requisição. | P1 🏢 |

## Módulo 10 — Segurança (semana 1 e semana 4)
Faixa fixa: "Lembrete. Não substitui treinamento, APR nem procedimento da empresa."

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 10-01 | Onde termina a zona livre | Anexo II da NR-10 aplicado ao poste, com o raciocínio à vista: 0,60 m (afastamento mínimo telecom–BT nas normas de exemplo) < 0,70 m (Rc da BT) → trabalho em proximidade → confirmar autorização e APR antes de qualquer trabalho em poste. | P1 🏢 |
| 10-02 | Altura: APR, PT e SPIQ | NR-35 no poste. | P2 🏢 |
| 10-03 | A luz que você não vê | Laser invisível, classes, microscópio com filtro. | P1 |
| 10-04 | Bancada limpa: fragmentos, álcool e gel | Descarte, álcool isopropílico perto do arco. | P1 |
| 10-05 | Nova NR-10: o que muda para telecom em poste | Portaria MTE 737/2026 (vigência em junho de 2027): compartilhamento de infraestrutura, trabalho em proximidade, treinamento específico de 40 h, capacitação de 24 h, prática presencial, reciclagem bienal de 16 h. | P1 🏢 |

## Módulo 11 — Redes (só o que telecom usa)
Ligado ao Cisco NetAcad (ITN v7, módulos 3, 4, 6, 7, 11 e 13) e ao Aprenda Mais (Redes de Computadores I e II).

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 11-01 | Onde a fibra entra | Camadas OSI; fibra na camada 1. | P2 |
| 11-02 | Padrões ópticos e transceptores | SX/LX, SR/LR/ER; SFP, SFP+, QSFP. | P2 |
| 11-03 | Ler o DOM e diagnosticar o link | Tx/Rx × ficha. | P2 🏢 |
| 11-04 | VLAN: access, trunk e separação | 802.1Q. | P2 🏢 |
| 11-05 | IPv4, máscara e sub-redes /24, /29, /30 | Rede, broadcast, faixa útil. | P2 |
| 11-06 | MPLS e L2VPN no contrato | VPWS × VPLS. | P2 🏢 |

## Módulo 12 — Carreira

| Id | Lição | Objetivo | Prior. |
| --- | --- | --- | --- |
| 12-01 | Cargo × título: o que é ser técnico no Brasil | Lei 13.639/2018, CFT/CRT, diploma técnico. | P2 |
| 12-02 | Trilha de certificados grátis | Fiber U → CFOT, NetAcad, Intelbras Itec, QGIS Training Manual. | P2 |
| 12-03 | Portfólio do técnico de campo | Documentar sem dados da empresa; LinkedIn. | P2 |

---

## Plano de 90 dias

**Ritmo padrão:** cerca de 7 pílulas por semana (uma por dia, ou duas no fim de semana). No app, em **Ajustes**, você marca a data de início e os dias que são **só de revisão** (por exemplo, noites com curso), com data de término; o plano se ajusta. Essas preferências ficam só no aparelho.

| Semana | Lições (ordem de estudo) | Para usar no trabalho |
| --- | --- | --- |
| 1 | 10-01, 10-05, 09-01, 09-02, 09-03, 09-06, 09-05 | Segurança no poste; SLA, glosa, chamados e relatório do fornecedor; **calculadora de disponibilidade e glosa** |
| 2 | 02-07, 02-01, 02-02, 02-05, 02-06, 06-01, 06-02 | Ler os números dos relatórios (dB, dBm, dB/km, λ); **conversor dBm ↔ mW** |
| 3 | 06-03, 02-03, 02-04, 03-01, 03-03, 03-04, 03-07 | Eventos de OTDR, tipos de fibra, cabo, cores e conectores; **código de cores**, **leitor de OTDR** |
| 4 | 10-03, 10-04, 05-01, 05-03, 05-04, 04-01, 04-03, 04-05 | Segurança na bancada, fusão, PON; **orçamento de potência** |
| 5 | 07-01, 07-02, 07-04, 08-03, 01-01, 09-04 | Poste, SRC, por que a rede existe, tipos de contrato |
| 6 | 05-02, 05-05, 05-06, 06-04, 06-05 | Fusão e OTDR completos |
| 7 | 06-06, 06-07, 07-03, 07-05, 07-06 | Inspeção de conector, relatório de OTDR, fiscalização de poste |
| 8 | 07-07, 10-02, 03-02, 03-05, 03-06 | Riscos regionais, NR-35, cabos e ferragens |
| 9 | 08-01, 08-02, 08-04, 08-05 | QGIS: base e edição |
| 10 | 08-06, 08-07, 04-02, 04-04, 04-06 | QGIS avançado; PON avançado; **montador PON** |
| 11 | 01-02, 01-03, 01-04, 01-05, 01-06 | Telecom da distribuidora: protocolos e redundância |
| 12 | 11-01, 11-02, 11-03, 11-04 | Redes: camadas, SFP, DOM, VLAN |
| 13 | 11-05, 11-06, 12-01, 12-02, 12-03 | IP, MPLS e carreira; revisão geral |

| Marco | O que você consegue fazer |
| --- | --- |
| Dia 7 | Calcular SLA e glosa, abrir e escalar chamado, saber o papel de gestor e fiscal, conferir se um relatório do fornecedor está completo |
| Dia 30 | Ler os números de um relatório de teste e acompanhar fusão e OTDR entendendo cada valor |
| Dia 60 | Fiscalizar ocupação de poste e abrir o projeto no QGIS |
| Dia 90 | Conversar de igual com a equipe, os fornecedores e os provedores |

As semanas 5 a 13 têm 4 a 6 lições, o que deixa espaço para a revisão espaçada (que cresce com o tempo) e para semanas cheias no trabalho.
