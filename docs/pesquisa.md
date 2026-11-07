# Pesquisa — app de telecom para distribuidora

> Fase 1 · pesquisa feita em 06/11/2026 por 12 subagentes, um por bloco. Todas as datas de acesso são 06/11/2026, salvo indicação.
> Este arquivo é a **base de fontes** do app. Nenhum valor entra no app sem estar aqui (ou em `content/fontes.json`) com link e data.
> Nenhum dado real de rede da empresa foi coletado. Coordenadas aqui são de sedes municipais (IBGE, públicas) ou fictícias.

## Como ler
- Cada bloco tem: resumo, tabela de fatos (com fonte e confiança), divergências, "confirmar na empresa", lições propostas, exemplos de questões, glossário, vídeos (ou termos de busca) e fontes numeradas.
- A numeração das fontes (`[n]`) vale **dentro de cada bloco**. Na Fase 2 elas viram ids únicos em `content/fontes.json`.
- "Confiança baixa" ou "via busca" = valor visto só no resumo do buscador ou em fonte secundária. **Não entra no app sem nova conferência.**

## O que a pesquisa mudou em relação ao pedido

| Ponto do pedido | O que a pesquisa encontrou | Bloco |
| --- | --- | --- |
| QGIS 4.2 seria a 1ª LTR da série 4 em out/2026 | **Não virou.** Blog oficial de 03/10/2026: a próxima LTR será a **4.4** (a partir da 4.4.4, prevista para 05/03/2027). Hoje: LTR = **3.44.15**; latest = **4.2.3**. A 4.4.0 (prevista para 30/10/2026) atrasou. | 8 |
| Novo regulamento de postes dependia da Anatel | Continua **sem vigor** em 06/11/2026. Em 22/05/2026 parecer vinculante da AGU tornou a cessão ao "posteiro" obrigatória, e a ANEEL refaz o texto; reunião ANEEL–Anatel em 27–28/10/2026. Vale: Res. Conjuntas 1/1999, 2/2001, 4/2014 e **REN ANEEL 1.044/2022** (que revogou a REN 797/2017). | 7, 9 |
| ND-6.6 da Cemig "(2025)" | Edição vigente desde **12/2024**. NDU-009 da Energisa: li a v4.0; a atual seria a 8.0 (site bloqueou). NBR 15214 tem edição nova (05/2024), texto não público. | 7 |
| UTM 20N × 20S | Confirmado: EPSG diz que, no Brasil, as zonas "S" (31980) valem nos dois hemisférios. Sedes na zona 21: **Bonfim, Normandia, Caroebe e São João da Baliza**. Uiramutã fica na zona 20 (−60,196). | 8 |
| Medição de perda (TIA-526-14) | A TIA-526-14 é **multimodo**; monomodo é a **TIA-526-7** (IEC 61280-4-2). | 6 |
| NR-10 | O texto de 2004/2016 vale hoje. A **nova NR-10** (Portaria MTE nº 737, de 29/05/2026, DOU de 01/06/2026) entra em vigor 1 ano após a publicação (junho de 2027) e tem regras próprias para quem trabalha em proximidade com compartilhamento de infraestrutura (telecom em poste). **Conferido no texto oficial em 07/11/2026** — ver adendo. | 10 |
| Cabo de telecom a 0,60 m da BT | 0,60 m (afastamento mínimo nas normas de compartilhamento usadas como exemplo) < Rc de 0,70 m (NR-10, Anexo II): quem trabalha no cabo de telecom pode entrar na **zona controlada** da BT, ou seja, faz **trabalho em proximidade**. Raciocínio exposto na lição 10-01; confirmar autorização e APR na empresa. | 7, 10 |

## Pontos a reverificar antes de virar conteúdo (Fase 4)
1. ~~Nova NR-10 (Portaria MTE 737/2026)~~ **conferida em 07/11/2026 no texto oficial** (PDF no gov.br, com a retificação do DOU de 24/06/2026; ver adendo abaixo). Falta conferir a NR-35 com parte presencial obrigatória (Portaria 1.259/2026).
2. Tabela de perda por curvatura da G.657 (veio de blog de fabricante) — conferir no texto ITU-T.
3. Perda mínima de ODN 13 dB (B+) / 17 dB (C+) e sensibilidade −30 dBm (ONU C+) — conferir na G.984.2.
4. Limites numéricos por zona da IEC 61300-3-35 (norma paga; usamos Glenair/Fluke).
5. Valores de bobina de lançamento (VIAVI deu 404).
6. IST (índice de reajuste Anatel) 2026 — só fonte secundária.
7. Arts. da Lei 14.133, LGT art. 73 e CC art. 618 — citados sem abrir o Planalto.
8. PL 3.220/2019 (aprovado na Câmara em 04/11/2026, segundo notícia) — conferir.
9. Preços em dólar (FOA CFOT US$ 150, Fiber U ~US$ 20, CCNA US$ 300) — conferir na data de publicação.
10. Nenhum vídeo em português foi verificado (título + canal). O app usará **termos de busca** até a conferência manual.

## Adendo de 07/11/2026 — nova NR-10 no texto oficial

Fonte: **Portaria MTE nº 737, de 29 de maio de 2026** (DOU de 01/06/2026, Seção 1), com a **retificação do DOU de 24/06/2026**. PDF oficial no gov.br: https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2026-1/portaria-mte-no-737-nova-nr-10.pdf (acesso 07/11/2026).

| Item | O que diz (resumo; trechos curtos entre aspas) |
| --- | --- |
| Art. 5º | A portaria "entra em vigor 1 (um) ano após a sua publicação" → junho de 2027. Até lá vale o texto de 2004/2016. |
| Art. 4º | Revoga as Portarias MTE 598/2004 e MTPS 508/2016 (o texto atual). |
| 10.2.2 | Aplica-se ao trabalho em instalações elétricas "e suas proximidades" quando o trabalhador possa entrar na zona controlada (Anexo II), com parte do corpo ou extensões condutoras. |
| Anexo I (glossário) | **Compartilhamento de infraestrutura**: cessão onerosa de capacidade excedente da infraestrutura de suporte para serviços de telecomunicações. **Infraestrutura de suporte**: inclui postes, torres, dutos e estruturas suspensas. **Trabalho em proximidade**: o trabalhador "pode entrar na zona controlada". |
| 10.7.1 e 10.7.2 | Trabalho em proximidade **rotineiro**: procedimento escrito, feito a partir de análise de risco e aprovado por profissional legalmente habilitado (PLH). **Não rotineiro**: permissão de trabalho precedida de análise de riscos. |
| 10.7.2.2 | A permissão de trabalho vale pela duração da atividade, restrita ao turno. |
| 10.7.4 | Avaliação prévia no local antes de começar; se houver anormalidade, não iniciar e comunicar o superior (10.7.4.2). |
| 10.7.9 | As organizações que compartilham infraestrutura devem fazer ações integradas quando não for possível atuar de forma independente. |
| 10.8.4 e) (retificada) | Capacitação do trabalhador-capacitado: módulo "Compartilhamento de infraestruturas do SEP", mínimo de 24 h, para organizações que trabalham em proximidade com compartilhamento. |
| 10.9.2 (Quadro I) e 10.9.9 | Treinamento inicial **"Específico de compartilhamento de infraestrutura do SEP"**: **40 h**, para quem trabalha em proximidade com compartilhamento. Quem faz esse treinamento não precisa do Básico nem do Complementar do SEP (10.9.4 e 10.9.5). |
| 10.9.10 e 10.9.11 | Periódico **bienal com mínimo de 16 h**; eventual após afastamento de mais de 90 dias, mudança de método ou acidente grave. |
| 10.9.13 | O conteúdo prático deve ser **presencial**. |
| 10.10.2 b) e 10.14.1 | Quem faz trabalho em proximidade é trabalhador **autorizado**; trabalhos em proximidade com compartilhamento "somente podem ser realizados por trabalhadores autorizados". |
| 10.14.1.2 | Para serviços não elétricos na zona livre, na vizinhança da zona controlada: análise de risco e instrução formal. |
| 10.16.1 c) | Trabalho em proximidade por quem não atende ao capítulo 10.10 caracteriza grave e iminente risco. |
| Anexo II | Tabela de raios igual à atual: BT (< 1 kV) Rr 0,20 m e Rc 0,70 m; 10–15 kV Rr 0,38 m e Rc 1,38 m. |
| Anexo III, item 6 | Conteúdo do treinamento de compartilhamento: redes aéreas de telecom e de energia, interação com iluminação pública, distâncias de segurança, indução, descargas atmosféricas, sinalização, resgate, com prática obrigatória dos itens 5, 10, 12, 13 e 14. |

Observação: a transcrição de terceiros (Normas Legais) e o resumo da pesquisa de 06/11 citavam "40 h" para o compartilhamento. Os dois números existem no texto oficial: **24 h** é o módulo de **capacitação** (10.8.4 e) e **40 h** é o **treinamento de segurança** (Quadro I).

## Sites que bloquearam acesso automático
itu.int/rec (PDFs), Corning, Intelbras, Huawei Talent, NetAcad (exige JavaScript), Escola Virtual.Gov, Energisa (NDU-009 atual), Vivo Empresas, UCA Users Group, manuais de máquinas de fusão. Os valores desses lugares estão marcados como "via busca" ou foram substituídos por outra fonte.

---

## Bloco 1 — Telecom numa distribuidora

### Resumo (5-10 linhas)
A distribuidora mantém rede de telecom própria porque comandos de proteção e de operação têm limites de tempo de poucos milissegundos (proteção) a segundos (SCADA). Também precisam de previsibilidade e de continuar funcionando quando a rede pública falha. Na subestação, a IEC 61850 usa três serviços. GOOSE e Sampled Values vão direto na camada 2, em multicast e sem IP, porque o limite é de cerca de 3 ms. MMS vai em TCP/IP, com prazos de 100 ms ou mais. Entre o centro de operação e o campo, os protocolos são DNP3 (IEEE 1815) e IEC 60870-5-101 (serial) e 104 (TCP 2404). No transporte, a fibra usa OPGW (IEEE 1138) e ADSS (IEEE 1222). Há também rádio, PLC, SDH legado em migração para MPLS-TP ou IP/MPLS, e celular 4G/5G para religadores e automação da rede de distribuição. Disponibilidade é medida em "noves": 99,9% admite cerca de 8,8 h fora do ar por ano, e 99,99% admite cerca de 53 min. Desde 01/01/2026, Boa Vista conta oficialmente como interligada ao SIN, data fixada pela ANEEL.

### Fatos e valores de referência

| Afirmação | Valor | Fonte | Acesso | Confiança |
|---|---|---|---|---|
| Interligação de Boa Vista ao SIN | Data efetiva fixada pela ANEEL: 01/01/2026 | [9] | 06/11/2026 | alta |
| Tempo de transferência IEC 61850-5 para trip/bloqueio (classe TT6) | 3 ms | [10] (SEL, citando IEC 61850-5 Ed.2) | 06/11/2026 | alta |
| Demais classes TT | TT5 = 10 ms (status), TT4 = 20 ms, TT3 = 100 ms, TT2 = 500 ms (comandos de operador), TT1 = 1000 ms (eventos e alarmes) | [10] | 06/11/2026 | alta |
| GOOSE trip (tipo 1A) | Camada 2, multicast, máximo de 3 ms, prioridade alta | [10] | 06/11/2026 | alta |
| MMS (tipos 2 e 3) | Camada 3, TCP/IP, menos de 100 ms ou menos de 500 ms | [10] | 06/11/2026 | alta |
| Sampled Values (tipo 4) | Camada 2, multicast, 4 ms, banda alta (barramento de processo) | [10] | 06/11/2026 | média (ver divergências) |
| EtherType GOOSE / SV | 0x88B8 / 0x88BA (IEC 61850-8-1 / 9-2) | [11] (código do Wireshark) | 06/11/2026 | alta |
| MMS: porta | TCP 102 (ISO-on-TCP, RFC 1006) | [12] | 06/11/2026 | média |
| IEC 60870-5-104: porta | TCP 2404 (padrão, configurável) | [13] Schneider Geo SCADA; [14] manual GE | 06/11/2026 | alta |
| DNP3 em TCP: porta | 20000 (registro IANA) | [15] Wireshark wiki | 06/11/2026 | alta |
| DNP3 virou norma IEEE | IEEE 1815 (edição citada: 2012) | [16] | 06/11/2026 | média |
| Diferencial de linha: latência do canal | 5 ms ou menos (IEC TR 61850-90-12 / IEEE 1646) | [17] SEL/CIGRE B5 2019 | 06/11/2026 | alta |
| Diferencial de linha: assimetria | Menos de 0,5 ms para relés de alta sensibilidade. Limite absoluto de 1/4 de ciclo, 4 ms em 60 Hz | [17] | 06/11/2026 | alta |
| Transferência direta de disparo (DTT) | Latência de 10 ms | [17] | 06/11/2026 | média |
| Tempo de restabelecimento típico | MPLS: 50 ms ou mais. Carrier Ethernet: cerca de 20 ms. Pedido para diferencial: 5 ms | [17] | 06/11/2026 | média (fabricante com solução concorrente) |
| Métricas de teleproteção | IEC 60834-1: tempo de transmissão, segurança (Puc) e confiabilidade/dependabilidade (Pmc) | [18] | 06/11/2026 | alta |
| PRP / HSR | IEC 62439-3. Quadros duplicados por dois caminhos, recuperação zero | [19] IEC Webstore | 06/11/2026 | alta |
| OPGW | IEEE 1138-2021 | [20] | 06/11/2026 | alta |
| ADSS | IEEE 1222-2019 | [21] | 06/11/2026 | alta |
| Plataforma híbrida SDH + MPLS-TP com teleproteção integrada | Existe (ex.: FOX615). O próprio fabricante diz que o determinismo do MPLS-TP "não é tão bom quanto o do SDH" | [22] Hitachi Energy | 06/11/2026 | alta |
| Automação da distribuição por celular | Backhaul por Ethernet, DSL ou 4G/5G. Inclui DTT por celular como caso de uso | [23] Cisco DA Design Guide 3.1 | 06/11/2026 | média |
| Redes privativas de concessionárias no Brasil | 29 concessionárias com licença (abr/2024) | [24] | 06/11/2026 | média (fala da ANATEL relatada pela imprensa) |
| Faixa de 450 MHz | Concessionárias e UTCAL pediram à ANATEL (jan/2026) que a faixa saia do leilão. Sem decisão na fonte | [25] | 06/11/2026 | média |
| 99,9% de disponibilidade | 8,76 h fora do ar por ano | Cálculo: 8760 h × 0,001 | — | alta |
| 99,99% | 52,6 min por ano (0,876 h) | Cálculo: 8760 h × 0,0001 | — | alta |
| 99,999% | 5,26 min por ano | Cálculo | — | alta |

### Divergências entre fontes
1. **Classe de desempenho do GOOSE de 3 ms.** O artigo da SEL [10] e um material da ABB chamam essa exigência de "Type 1A, Performance Class P2/P3", com P1 em 10 ms na distribuição. Certificados de teste GOOSE do UCA Users Group (DNV) usam o rótulo "Performance Class: P1 (3 ms)". O tracker do UCA bloqueou o acesso (403). Para o app, ensinar **"trip GOOSE = 3 ms"** sem amarrar a P1 ou P2.
2. **Sampled Values: 3 ms ou 4 ms.** A tabela da SEL [10] dá 4 ms. Outros artigos acadêmicos falam em 3 ms. Mostrar as duas.
3. **Diferencial de linha sobre MPLS.** A SEL [17] diz que MPLS e Carrier Ethernet não cumprem o tempo de restabelecimento e defende o próprio produto. Um estudo da Univ. de Strathclyde (WiMob 2023) conclui que IP/MPLS e MPLS-TP "bem configurados" atendem aos requisitos mais rígidos [26]. A Hitachi [22] reconhece que o MPLS-TP é menos determinístico que o SDH.
4. **Latência da teleproteção.** IEC TR 61850-90-12: 5 ms para diferencial em linhas críticas e 10 ms ou menos para teleproteção em geral, segundo resumos secundários. Norma chinesa citada: 12 ms. Um artigo do CIRED 2007 cita 10 ms. Os valores dependem do esquema de proteção.
5. **Espectro para redes privativas.** A imprensa registra a disputa entre 250 MHz e 450 MHz. As posições de UTCAL e de fabricantes divergem sobre o ecossistema 3GPP em 250 MHz. Nenhuma decisão final da ANATEL foi encontrada até nov/2026.
6. **Ano do IEEE 1815.** Blogs citam 2010. A edição vigente mais citada é a 1815-2012. Confirmar em standards.ieee.org.

### Confirmar na empresa
- A rede de telecom é própria, contratada ou mista, e quais serviços vão em cada uma. **CONFIRMAR NA EMPRESA**
- Protocolo SCADA em uso no centro de operação e nas subestações (DNP3, IEC 104 ou outro) e se as subestações já usam IEC 61850. **CONFIRMAR NA EMPRESA**
- Tecnologias de transporte existentes (OPGW/ADSS, rádio, SDH, MPLS, celular) e plano de migração. **CONFIRMAR NA EMPRESA**
- Como os religadores se comunicam (4G de operadora, rádio próprio, chip M2M, APN privada). **CONFIRMAR NA EMPRESA**
- Metas internas de disponibilidade (SLA) dos links e dos contratos com operadoras. **CONFIRMAR NA EMPRESA**
- Se existe medição inteligente (AMI) e em que escala. **CONFIRMAR NA EMPRESA**
- Com a interligação ao SIN, quais requisitos de telecom do ONS (Procedimentos de Rede) se aplicam aos pontos de conexão. Não localizei o submódulo vigente. **CONFIRMAR NA EMPRESA**
- Se a TI e a TO (OT) estão separadas e quem cuida da telecom operativa. **CONFIRMAR NA EMPRESA**

### Lições propostas
1. **Por que uma elétrica tem rede própria** (P1). Objetivo: listar os 6 serviços (SCADA, automação de SE, teleproteção, medição/AMI, corporativo, religadores) e o prazo típico de cada um. SVG: centro de operação no meio, ícones dos serviços em volta e uma régua de tempo de 3 ms a 1 s.
2. **Rede própria x link de operadora** (P1). Objetivo: decidir quando usar cada uma com base em controle, latência, custo, tempo de reparo e risco de falha em comum. SVG: duas colunas lado a lado com a mesma subestação ligada por fibra própria e por nuvem da operadora.
3. **Os protocolos que você vai ouvir: DNP3, 101/104, IEC 61850** (P1). Objetivo: dizer em que camada e em que porta ou EtherType cada um roda e para que serve. SVG: pilha OSI com MMS em TCP/102, IEC 104 em TCP/2404, DNP3 em TCP/20000, e GOOSE e SV direto em Ethernet (0x88B8/0x88BA).
4. **GOOSE: por que camada 2 e multicast** (P1). Objetivo: explicar que 3 ms não comportam roteamento e handshake, e que um evento vai a vários assinantes de uma vez com VLAN e prioridade 802.1p. SVG: um IED publicando um quadro e o switch entregando a três assinantes, com uma tag VLAN destacada.
5. **Disponibilidade, anel e caminhos diferentes** (P1). Objetivo: converter "noves" em horas por ano e entender anel, rotas fisicamente distintas e PRP/HSR. SVG: barra comparando 8,76 h, 52 min e 5 min, mais um anel com uma falha e o tráfego dando a volta.
6. **Meios de transporte: fibra, rádio, PLC, SDH, MPLS-TP e celular** (P2). Objetivo: associar cada meio ao uso típico e ao limite (por exemplo, assimetria abaixo de 0,5 ms para diferencial). SVG: matriz meios × serviços com marcas de adequação.

### Exemplos de questões
**Q1.** Por que o GOOSE é transmitido direto na camada 2 (Ethernet), sem IP?
- a) Porque roteadores não suportam multicast. *Errada: roteadores suportam multicast IP. O motivo é tempo e simplicidade.*
- **b) Para cumprir prazos de cerca de 3 ms e entregar o mesmo evento a vários IEDs (multicast) sem conexão TCP.** *Certa: [10] traz o tipo 1A com 3 ms, em L2 multicast.*
- c) Porque o GOOSE é criptografado por padrão. *Errada: na configuração padrão, GOOSE não tem criptografia nem autenticação.*
- d) Porque a camada 2 tem alcance maior que IP. *Errada: a camada 2 fica limitada à LAN ou VLAN. Esse é justamente um limite do GOOSE.*

**Q2.** Um link com 99,99% de disponibilidade anual pode ficar fora do ar por cerca de quanto tempo?
- a) 8,8 horas. *Errada: esse é o valor de 99,9%.*
- **b) 53 minutos.** *Certa: 8760 h × 0,0001 = 0,876 h ≈ 52,6 min.*
- c) 5 minutos. *Errada: esse é o valor de 99,999%.*
- d) 3,65 dias. *Errada: esse é o valor de 99%.*

**Q3.** Um fornecedor diz que o canal do 87L (diferencial de linha) tem latência de 4 ms e assimetria de 2 ms. Qual é o problema?
- a) Nenhum, os dois valores estão dentro do limite. *Errada: a assimetria passa do valor típico de 0,5 ms ou menos.*
- b) A latência está alta demais. *Errada: 4 ms está abaixo dos 5 ms da IEC TR 61850-90-12.*
- **c) A assimetria está alta para relés diferenciais sensíveis, que costumam exigir 0,5 ms ou menos.** *Certa [17].*
- d) O diferencial não depende de telecom. *Errada: ele compara correntes dos dois terminais pelo canal de comunicação.*

**Q4.** No Wireshark aparece tráfego TCP na porta 2404. O protocolo mais provável é:
- a) DNP3. *Errada: o DNP3 usa a porta 20000.*
- b) MMS (IEC 61850). *Errada: o MMS usa a porta 102.*
- **c) IEC 60870-5-104.** *Certa [13].*
- d) GOOSE. *Errada: o GOOSE não usa TCP. Ele aparece pelo EtherType 0x88B8.*

**Q5.** Qual é a principal vantagem de uma rede própria em fibra OPGW sobre um link de operadora para a teleproteção?
- a) É sempre mais barata. *Errada: o investimento inicial e a manutenção são altos. A conta depende do caso.*
- **b) Controle do caminho, com latência e assimetria previsíveis, e independência de falhas e prioridades da operadora.** *Certa: é o argumento central de [17] e [22].*
- c) Não precisa de redundância. *Errada: a fibra também se rompe. Usam-se anel e rotas distintas.*
- d) Dispensa equipamentos de teleproteção. *Errada: os equipamentos ou interfaces de teleproteção continuam necessários (IEC 60834-1).*

### Termos para o glossário
| Sigla | Português | Inglês | Definição curta |
|---|---|---|---|
| SCADA | Supervisão, controle e aquisição de dados | Supervisory Control and Data Acquisition | Sistema do centro de operação que lê medidas e envia comandos ao campo |
| RTU / UTR | Unidade terminal remota | Remote Terminal Unit | Equipamento de campo que conversa com o SCADA |
| IED | Dispositivo eletrônico inteligente | Intelligent Electronic Device | Relé ou controlador digital com comunicação |
| GOOSE | Evento genérico de subestação | Generic Object Oriented Substation Event | Mensagem rápida da IEC 61850 em L2 multicast (0x88B8) |
| SV | Valores amostrados | Sampled Values | Amostras de corrente e tensão em L2 multicast (0x88BA) |
| MMS | Especificação de mensagens de fabricação | Manufacturing Message Specification | Cliente-servidor da IEC 61850 sobre TCP/102 |
| DNP3 | — | Distributed Network Protocol 3 | Protocolo SCADA (IEEE 1815), TCP/20000 |
| IEC 104 | — | IEC 60870-5-104 | Protocolo de telecontrole sobre TCP/2404. O 101 é a versão serial |
| AMI | Infraestrutura de medição avançada | Advanced Metering Infrastructure | Medidores inteligentes com comunicação bidirecional |
| OPGW | Cabo para-raios com fibra óptica | Optical Ground Wire | Cabo de blindagem da linha com fibras dentro (IEEE 1138) |
| ADSS | Cabo óptico autossustentado dielétrico | All-Dielectric Self-Supporting | Cabo óptico sem metal, em estruturas aéreas (IEEE 1222) |
| PLC | Comunicação pela linha de potência | Power Line Carrier/Communication | Sinal de telecom injetado no próprio condutor |
| SDH | Hierarquia digital síncrona | Synchronous Digital Hierarchy | Transporte TDM legado, determinístico |
| MPLS-TP | MPLS – perfil de transporte | MPLS Transport Profile | MPLS orientado a conexão, sem plano de controle IP obrigatório |
| PRP / HSR | — | Parallel Redundancy Protocol / High-availability Seamless Redundancy | Redundância com quadros duplicados e recuperação zero (IEC 62439-3) |
| DTT | Transferência direta de disparo | Direct Transfer Trip | Comando de abertura enviado ao terminal remoto |
| SIN | Sistema Interligado Nacional | Brazilian National Interconnected System | Rede elétrica interligada coordenada pelo ONS |

### Vídeos em português (verificados) ou termos de busca
Nenhum vídeo verificado: não foi possível conferir título e canal. Termos de busca sugeridos no YouTube:
- "IEC 61850 GOOSE explicação" / "subestação digital IEC 61850"
- "protocolo DNP3 SCADA" / "IEC 60870-5-104 SCADA"
- "cabo OPGW instalação" / "cabo ADSS"
- "teleproteção linha de transmissão"
- "MPLS-TP setor elétrico" / "UTCAL redes privativas"

### Fontes
2. O Setor Elétrico — "Um ano após interligação ao SIN, linhão Manaus–Boa Vista reforça segurança energética de Roraima", https://www.osetoreletrico.com.br/?p=168634 — acesso 06/11/2026
9. eixos — "Aneel define 1º de janeiro de 2026 como data efetiva da interligação do sistema de Boa Vista", https://eixos.com.br/energia-eletrica/aneel-define-1o-de-janeiro-de-2026-como-data-efetiva-da-interligacao-do-sistema-de-boa-vista/ — acesso 06/11/2026
10. SEL/NTPC — Chelluri et al., "Understanding and Validating Ethernet Networks for Mission-Critical Protection, Automation, and Control Applications" (2014), Tabelas I e II, https://selinc.com/api/download/104201 — acesso 06/11/2026
11. Wireshark (fork osmocom) — dissector GOOSE/SV, https://gitea.osmocom.org/osmith/wireshark/commit/dbf15d9e0b9c334914099e942eb3b9bb8dafb4c6 — acesso 06/11/2026
12. Software Toolbox — "What is IEC 61850", https://softwaretoolbox.com/resources/what-is-iec61850 — acesso 06/11/2026
13. Schneider Electric — Geo SCADA, driver IEC 60870-5-104, https://tprojects.schneider-electric.com/geoscadahelp/geo%20scada%202020/content/IEC608705SLAVEDriverGuide/IEC608705104.htm — acesso 06/11/2026
14. GE — manual F650, IEC 104 settings, https://www.manualslib.com/manual/1368865/Ge-F650.html?page=739 — acesso 06/11/2026
15. Wireshark Wiki — Ports 20000–20099, https://wiki.wireshark.org/PortReference/Ports20000to20099 — acesso 06/11/2026
16. DNP Users Group, https://www.dnp.org — acesso 06/11/2026. Ano da norma não conferido no IEEE.
17. SEL — Robertson, Fodero, Gray, "Solving the Inherent Problem of Transporting Serial Teleprotection Circuits Over MPLS", CIGRE SC B5 Colloquium 2019, Tabela 1, https://selinc.com/api/download/125720 — acesso 06/11/2026
18. IEC 60834-1:1999 (prévia/sumário), https://www.vde-verlag.de/iec-normen/preview-pdf/info_iec60834-1{ed2.0}b.pdf — acesso 06/11/2026
19. IEC Webstore — IEC 62439-3:2021, https://webstore.iec.ch/publication/64423 — acesso 06/11/2026
20. IEEE/Accuris — IEEE 1138-2021 (OPGW), https://store.accuristech.com/ieee/subgroups/36813 — acesso 06/11/2026
21. IEEE SA — IEEE 1222-2019 (ADSS), https://standards.ieee.org/ieee/1222-2019_Cor_1/11777/ — acesso 06/11/2026
22. Hitachi Energy — FOX615 Multiservice Platform, https://www.hitachienergy.com/products-and-solutions/communication-networks/wired-networks/fox-multiservice-platform/fox615-multiservice-platform — acesso 06/11/2026
23. Cisco — Distribution Automation Design Guide 3.1 (set/2025), https://www.cisco.com/c/en/us/td/docs/solutions/Verticals/Distributed-Automation/Distribution-Automation-Design-Guide-3-1.html — acesso 06/11/2026
24. Teletime — "Concessionárias de energia no Brasil têm 29 redes privativas, indica Anatel" (11/04/2024), https://teletime.com.br/11/04/2024/concessionarias-de-energia-no-brasil-tem-29-redes-privativas-indica-anatel/ — acesso 06/11/2026
25. Teletime — "Concessionárias pedem retirada dos 450 MHz do leilão" (26/01/2026), https://teletime.com.br/26/01/2026/concessionarias-450-mhz/ — acesso 06/11/2026
26. Univ. of Strathclyde — Ghanem et al., "IP/MPLS and MPLS/TP teleprotection latencies over high voltage power lines", WiMob 2023, https://strathprints.strath.ac.uk/85798 — acesso 06/11/2026

Observações: o redmine.ucaiug.org (UCA Users Group) retornou 403, e o PDF da Juniper sobre diferencial em MPLS retornou 404. Não foram registrados traçados, coordenadas, endereços de instalações nem nomes de funcionários.


---

## Bloco 2 — Fibra óptica

### Resumo

A fibra guia a luz por **reflexão interna total** (*total internal reflection*): o núcleo (*core*) tem índice de refração um pouco maior que a casca (*cladding*). Quase todas as fibras de telecom têm casca de 125 µm; o núcleo tem ~9 µm na monomodo (*single-mode*) e 50 ou 62,5 µm na multimodo (*multimode*). Sobre o vidro vai o revestimento primário de acrílico (nominal 250 µm, na prática 242–245 µm; existe versão "reduzida" de 200 µm) e, em cabos internos, o *tight buffer* de 900 µm.

Na rede externa de uma distribuidora, o padrão de mercado é monomodo **ITU-T G.652.D** (baixo pico d'água, utilizável de 1260 a 1625 nm), ou **G.657.A1/A2**, que é compatível com G.652.D e suporta curvas mais fechadas. A atenuação máxima da norma é 0,4 dB/km em 1310 nm e 0,3 dB/km em 1550 nm. Fabricantes entregam bem menos (cerca de 0,32–0,36 e 0,18–0,22 dB/km, respectivamente).

As perdas vêm de espalhamento de Rayleigh (proporcional a 1/λ⁴), absorção (pico d'água em 1383 nm) e curvaturas macro e micro. A perda por curvatura cresce acima de 1550 nm, e por isso 1625/1650 nm são os comprimentos de onda que "denunciam" curvas.

As bandas ITU são O, E, S, C, L e U (1260–1675 nm). O PON usa 1310/1490 nm (GPON), 1270/1577 nm (XGS-PON) e 1550 nm (vídeo RF); o monitoramento em serviço usa 1625/1650 nm.

Toda a conta de enlace é feita em **dB** (relação) e **dBm** (potência absoluta, referida a 1 mW). As perdas em dB simplesmente se somam.

**Nota de acesso:** as páginas de recomendações em itu.int/rec bloquearam o download automático. Os valores ITU vieram de folhetos oficiais da ITU (dms_pub), de uma cópia integral do G.Sup39 (02/2016) hospedada por terceiro e de fichas de fabricantes que reproduzem a tabela da norma. Recomenda-se baixar manualmente a G.652 (08/2024) e a G.657 para conferir.

### Fatos e valores de referência

| Afirmação | Valor | Fonte | Acesso | Confiança |
|---|---|---|---|---|
| Luz confinada por reflexão interna total; núcleo com índice maior que a casca | conceito | [8] | 06/11/2026 | Alta |
| Índice de grupo da G.652.D | 1,467 (1310 nm); 1,468 (1550 nm) | [6] | 06/11/2026 | Alta |
| Diâmetros núcleo/casca | 9/125 (SM), 50/125 e 62,5/125 µm (MM) | [8] | 06/11/2026 | Alta |
| Diâmetro da casca G.652.D (fabricante) | 125,0 ± 1,0 µm | [6] | 06/11/2026 | Alta |
| Diâmetro do campo modal (MFD) | 9,2 ± 0,4 µm (1310); 10,4 ± 0,5 µm (1550) | [6] | 06/11/2026 | Alta |
| Revestimento primário (nominal "250 µm") | 245 ± 10 µm (Prysmian) | [6][7] | 06/11/2026 | Alta |
| Revestimento reduzido | 200 ± 10 µm, mesmo vidro de 125 µm, emendável com fibras G.657.A1/G.652.D | [14] | 06/11/2026 | Média (dados via resumo de busca) |
| *Tight buffer* | 900 ± 50 µm sobre o primário de 245 µm | [7] | 06/11/2026 | Alta |
| Abertura numérica (NA) MM | 0,20 (50/125); 0,275 ± 0,015 (62,5/125) | [17] | 06/11/2026 | Média |
| NA monomodo | ≈0,12 a 0,14 (as fontes divergem; ver seção de divergências) | [12][18] | 06/11/2026 | Baixa |
| OM1 | 62,5/125; 200/500 MHz·km (850/1300) | [9] | 06/11/2026 | Alta |
| OM2–OM5 | 50/125; OM3 com EMB de 2000 MHz·km; OM4/OM5 com 4700 MHz·km em 850 nm | [9][11] | 06/11/2026 | Alta |
| Atenuação máxima MM (TIA) | 3,5/1,5 dB/km (OM1/OM2); 3,0/1,5 dB/km (OM3–OM5), em 850/1300 nm | [11] | 06/11/2026 | Alta |
| Atenuação típica MM | ~3 dB/km (850 nm); ~1 dB/km (1300 nm) | [8][9] | 06/11/2026 | Alta |
| 10GBASE-SR | 33 m (OM1), 82 m (OM2), 300 m (OM3), 400 m (OM4) | [11] | 06/11/2026 | Alta |
| OM5 | otimizada para WDM curto em 850–950 nm (VCSELs) | [9][11] | 06/11/2026 | Alta |
| OS1/OS2 (limite TIA de cabo) | 1,0 dB/km em planta interna; 0,5 dB/km em planta externa | [11] | 06/11/2026 | Alta |
| G.652.D: atenuação máxima da norma | 0,4 dB/km (1310); 0,3 dB/km (1550); 0,4 dB/km (1625); 0,4 dB/km (1383 ± 3 nm, após envelhecimento por H₂) | [5] | 06/11/2026 | Alta (tabela comparativa de fabricante citando a ITU) |
| G.652.C/D: requisito do pico d'água | atenuação em 1383 nm ≤ máximo especificado para a faixa de 1310 a 1625 nm | [3] | 06/11/2026 | Alta |
| G.652.D: máximo de cabo do fabricante | ≤ 0,36 (1310) e ≤ 0,22 dB/km (1550) | [6] | 06/11/2026 | Alta |
| G.652.D: fibra "premium" | 0,32 / 0,18 / 0,20 dB/km (1310/1550/1625) | [12] | 06/11/2026 | Média |
| Medidas de campo, média de rede real G.652 | 0,341 (1310); 0,51 (1383); 0,194 (1551); 0,207 (1621); 0,229 (1650) dB/km | [3] Tab. 10-4 | 06/11/2026 | Alta |
| Causas da atenuação | espalhamento de Rayleigh (∝1/λ⁴), absorção pela água, macro e microcurvatura; perda por curvatura cresce acima de 1550 nm | [3] | 06/11/2026 | Alta |
| Espalhamento é a maior causa de perda; dobrar λ reduz o espalhamento ~16× | conceito | [8] | 06/11/2026 | Alta |
| Macrocurvatura G.652.D | 100 voltas em raio de 30 mm: ≤ 0,1 dB em 1625 nm | [5][1] | 06/11/2026 | Alta |
| Raio mínimo das G.657 | A1: 10 mm; A2 e B2: 7,5 mm; B3: 5 mm (G.652: 30 mm) | [1] | 06/11/2026 | Alta |
| Compatibilidade | A1/A2 são **conformes** (*compliant*) com G.652.D; B2/B3 são **compatíveis** (*compatible*), com pequenas diferenças de dispersão e PMD | [1] | 06/11/2026 | Alta |
| Perda máxima G.657.A1 | 15 mm × 10 voltas: 0,25/1,0 dB; 10 mm × 1 volta: 0,75/1,5 dB (1550/1625 nm) | [13] | 06/11/2026 | Média (blog de fabricante; bate com [12]) |
| Perda máxima G.657.A2 | 15 mm × 10: 0,03/0,1; 10 mm × 1: 0,1/0,2; 7,5 mm × 1: 0,5/1,0 dB | [13] | 06/11/2026 | Média |
| Perda máxima G.657.B3 | 10 mm × 1: 0,03/0,1; 7,5 mm × 1: 0,08/0,25; 5 mm × 1: 0,15/0,45 dB | [13] | 06/11/2026 | Média |
| G.655 | fibra NZDSF (dispersão não nula em 1530–1565 nm), para DWDM | [2] | 06/11/2026 | Alta |
| Bandas | O 1260–1360; E 1360–1460; S 1460–1530; C 1530–1565; L 1565–1625; U 1625–1675 nm | [3] Tab. 5-1 | 06/11/2026 | Alta |
| Banda U | reservada para manutenção/teste (OTDR), sem tráfego | [3] | 06/11/2026 | Alta |
| XGS-PON | descida 1575–1580 nm; subida 1260–1280 nm; coexiste com G-PON | [4] | 06/11/2026 | Alta |
| GPON (plano opcional p/ coexistência) | descida 1480–1500 nm; subida 1300–1320 nm | [4] | 06/11/2026 | Alta |
| Vídeo RF (*RF overlay*) | 1550 nm (banda C) | [15][16] | 06/11/2026 | Média |
| OTDR em serviço | 1625 nm (legado GPON) → 1650 nm onde há XGS-PON/NG-PON2; porta filtrada | [15][16] | 06/11/2026 | Média |
| Dispersão cromática G.652.D | ≤ 18 ps/(nm·km) em 1550 nm; zero de dispersão em 1300–1324 nm | [6] | 06/11/2026 | Alta |
| Dispersão modal | só em multimodo (caminhos diferentes chegam em tempos diferentes) | [8] | 06/11/2026 | Alta |
| dBm | dBm = 10·log₁₀(P / 1 mW); 0 dBm = 1 mW | [10] | 06/11/2026 | Alta |
| Relações em dB | +3 dB = 2×; −3 dB = ½; +10 dB = 10×; −10 dB = 1/10; 25 µW = −16 dBm | [10] | 06/11/2026 | Alta |
| Perda medida | dB = P_medida(dBm) − P_referência(dBm); de −20,0 para −22,3 dBm = 2,3 dB de perda | [10] | 06/11/2026 | Alta |
| Cabo AS (Prysmian BR) | acréscimo de atenuação pelo cabeamento ≤ 0,05 dB/km (SM) | [19] | 06/11/2026 | Média |

**Tabela de conversão** (calculada com a fórmula de [10]):

| dBm | mW |
|---|---|
| +10 | 10 |
| +3 | 2 |
| 0 | 1 |
| −3 | 0,5 |
| −10 | 0,1 |
| −20 | 0,01 (10 µW) |
| −27 | 0,002 (2 µW) |
| −30 | 0,001 (1 µW) |

### Divergências entre fontes

1. **Atenuação "da G.652.D".** A norma fixa o máximo (0,4 / 0,3 dB/km) [5]. A FOA fala em "~0,4 / 0,25" como valor típico [8], e as fichas trazem 0,36 / 0,22 [6] ou 0,32 / 0,18 [12]. Ensinar: a norma dá o teto, a ficha do fabricante dá o produto, e a medida de campo fica em torno de 0,34 / 0,19 [3].
2. **Fibra nua × cabo.** O máximo da fibra e o do cabo diferem; cabear acrescenta até ~0,05 dB/km [19]. A Fluke cita o limite TIA de cabo OSP em 0,5 dB/km [11], um valor conservador de projeto e não típico.
3. **250 × 245 × 242 µm.** "250 µm" é nominal; as fichas dão 245 ± 10 [6] ou 242 ± 7 µm [14].
4. **NA monomodo.** Há citações de 0,12 [18] e de ~0,14 (comum em fichas Corning). Em monomodo o MFD importa mais que a NA; ensinar só a ideia.
5. **Banda OM4/OM5.** A FOA lista 3600 MHz·km (OFL) [9] e a Fluke 4700 MHz·km (EMB, banda laser) [11]. São métricas diferentes.
6. **Tabela de macrocurvatura da G.657.** Veio de blog de fabricante (HFCL) [13]. O valor de 10 mm para A1 é compatível com a Corning [12]. Conferir na G.657 oficial (ITU bloqueou o download automático).
7. **1625 × 1650 nm.** A EXFO ainda vende porta de 1625 nm em serviço; AFL e VeEX recomendam 1650 nm com XGS-PON [15][16].
8. **G.657.B2.** O folheto ITU de 2013 traz A1/A2/B2/B3 [1]. A edição atual pode ter reorganizado as subcategorias; o pedido citou só A1/A2/B3. Conferir na G.657 vigente.

### Confirmar na empresa

- Qual fibra a empresa compra nos cabos AS/ADSS da rede externa: G.652.D ou G.657.A1/A2? Pedir a ficha técnica do cabo (fabricante, código, contagem de fibras) — **CONFIRMAR NA EMPRESA**.
- Existe cabo OPGW (cabo-guarda com fibra) nas linhas de transmissão/subtransmissão? Qual fibra ele usa (G.652.D ou G.655)? — **CONFIRMAR NA EMPRESA**.
- Há multimodo (OM3/OM4) nos racks de subestações ou do data center? — **CONFIRMAR NA EMPRESA**.
- Que coeficiente de atenuação o projeto usa no orçamento de potência (0,35/0,25? 0,4/0,3?) e quais perdas padrão por emenda e conector? — **CONFIRMAR NA EMPRESA**.
- Há PON (GPON/XGS-PON) ou só ponto a ponto (SFP 1310/1550)? Há vídeo RF? — **CONFIRMAR NA EMPRESA**.
- Comprimentos de onda dos OTDRs disponíveis (1310/1550/1625/1650) e quem faz a medição — **CONFIRMAR NA EMPRESA**.
- Raio mínimo exigido nas caixas de emenda e nos DIOs pelo padrão interno — **CONFIRMAR NA EMPRESA**.

### Lições propostas

**L1 — Como a luz fica presa no vidro** (12 min)
Objetivo: explicar núcleo, casca, índice de refração e reflexão interna total; NA só como "cone de aceitação".
P1: Por que a luz não escapa pela lateral? P2: O que acontece se a luz entrar muito inclinada?
SVG: corte longitudinal de uma fibra; faixa central (núcleo, cor clara) entre duas faixas (casca). Um raio em zigue-zague refletindo na interface, com o ângulo crítico marcado. Um segundo raio, mais inclinado, atravessa a casca e sai (com um "X"). À esquerda, cone tracejado na entrada rotulado "cone de aceitação (NA)". Legenda: n₁ (núcleo) > n₂ (casca).

**L2 — Anatomia: 9/125, 250 e 900 µm** (10 min)
Objetivo: ler "9/125", diferenciar revestimento primário (250/200 µm) e *tight buffer* (900 µm).
P1: O que significa "9/125"? P2: O que se remove com o decapador antes da emenda?
SVG: corte transversal com círculos concêntricos em escala aproximada: núcleo 9, casca 125, primário 250, buffer 900 µm, cada um rotulado e com cor diferente. Ao lado, o mesmo para 50/125, mostrando o núcleo bem maior.

**L3 — Monomodo × multimodo, OM e OS** (15 min)
Objetivo: comparar diâmetros, dispersão modal, distâncias e usos; explicar por que a rede externa é monomodo.
P1: Por que a multimodo não serve para 30 km? P2: Qual a diferença entre OS2 e G.652.D?
SVG: dois tubos lado a lado. Monomodo: núcleo fino com um único raio reto. Multimodo: núcleo largo com três raios de trajetos diferentes chegando em tempos distintos; os pulsos à saída aparecem "alargados". Abaixo, uma régua de distância: OM3 300 m × SM dezenas de km.

**L4 — G.652.D e a família G.657** (12 min)
Objetivo: diferenciar as subcategorias pelo raio mínimo; distinguir conforme (A) de compatível (B).
P1: Posso emendar G.657.A2 com G.652.D? P2: Onde a B3 faz sentido?
SVG: quatro círculos concêntricos de raios 30, 10, 7,5 e 5 mm (desenhados em escala), rotulados G.652.D, G.657.A1, A2(/B2) e B3. Seta "mais tolerante a curvas" do maior para o menor.

**L5 — Janelas e bandas: quem usa cada cor** (15 min)
Objetivo: localizar 850, 1310, 1383, 1490, 1550, 1577, 1625/1650 nm e as bandas O–U.
P1: Por que o GPON desce em 1490 e sobe em 1310? P2: Por que o OTDR em serviço usa 1650?
SVG: eixo horizontal de 1250 a 1680 nm com seis faixas coloridas (O, E, S, C, L, U). Curva de atenuação em "U" com um pico em 1383 (rotulado "pico d'água"). Marcadores verticais: 1270 e 1577 (XGS-PON), 1310 e 1490 (GPON), 1550 (vídeo RF), 1625/1650 (monitoramento). 850 nm fica fora do eixo, numa seta "multimodo".

**L6 — Por que a luz se perde** (12 min)
Objetivo: Rayleigh, absorção, macro e microcurvatura; por que 1550/1625 sofre mais com curvatura.
P1: Por que a perda em 1550 é menor que em 1310? P2: Uma curva fechada aparece mais em 1310 ou em 1625?
SVG: curva atenuação × λ decomposta em três linhas: Rayleigh descendente (1/λ⁴), pico de absorção em 1383 e "borda de curvatura" subindo depois de 1550. Embaixo, uma fibra curvada com parte da luz vazando para fora; o campo modal desenhado mais largo em 1625 que em 1310.

**L7 — dB e dBm sem medo** (15 min)
Objetivo: converter mW↔dBm, somar perdas e calcular a potência recebida.
P1: Quanto é −3 dBm em mW? P2: O transmissor manda 0 dBm e o enlace perde 12 dB. Quanto chega?
SVG: "escada de enlace". Barra horizontal de Tx (+3 dBm) → conector (−0,5) → 20 km (−7) → emendas (−0,4) → conector (−0,5) → Rx. Acima de cada degrau, o nível acumulado em dBm, descendo como uma escada.

### Exemplos de questões

**Q1.** O que mantém a luz dentro do núcleo?
a) O revestimento de 250 µm reflete a luz — errada: o acrílico protege mecanicamente; quem guia é a interface vidro-vidro.
b) **Núcleo com índice de refração maior que a casca, gerando reflexão interna total** — correta [8].
c) Núcleo com índice menor que a casca — errada: é o inverso.
d) O *buffer* de 900 µm é espelhado — errada: o buffer é plástico de proteção.

**Q2.** "9/125" indica:
a) 9 fibras em tubo de 125 mm — errada.
b) **núcleo de 9 µm e casca de 125 µm** — correta [8].
c) atenuação de 0,9 dB e 125 km de alcance — errada.
d) revestimento de 9 µm e buffer de 125 µm — errada: o primário tem ~250 µm.

**Q3.** Qual é a atenuação máxima da norma G.652.D em 1550 nm?
a) 0,18 dB/km — errada: é valor de fibra premium de fabricante [12].
b) 0,22 dB/km — errada: é o máximo de cabo de um fabricante [6].
c) **0,3 dB/km** — correta [5].
d) 3,0 dB/km — errada: é o máximo da multimodo OM3 em 850 nm [11].

**Q4.** Uma G.657.A2 pode ser emendada com G.652.D?
a) Não, os diâmetros de casca são diferentes — errada: ambas têm 125 µm.
b) **Sim; a categoria A é conforme à G.652.D** — correta [1].
c) Só com conector — errada.
d) Só se for B3 — errada: B3 é "compatível", não "conforme".

**Q5.** Num OTDR, uma curva fechada numa caixa de emenda aparece com perda bem maior em 1625 nm que em 1310 nm. Por quê?
a) O Rayleigh é maior em 1625 — errada: ele cai com 1/λ⁴.
b) **Em comprimentos de onda maiores o campo modal se espalha mais pela casca e a perda por curvatura cresce** — correta [3][6].
c) O pico d'água fica em 1625 — errada: fica em 1383.
d) O OTDR de 1625 é menos preciso — errada.

**Q6.** −20 dBm equivale a:
a) 20 mW — errada: dBm negativo é menor que 1 mW.
b) 0,1 mW — errada: isso é −10 dBm.
c) **0,01 mW (10 µW)** — correta: 10^(−20/10) = 0,01 mW.
d) 0,2 mW — errada: confundiu com a regra "−3 dB = metade".

**Q7.** Tx = +3 dBm. Enlace de 20 km a 0,35 dB/km, 2 conectores de 0,5 dB e 4 emendas de 0,1 dB. Qual é a potência recebida?
a) −4,0 dBm — errada: esqueceu as emendas.
b) **−5,4 dBm** — correta: perda = 7,0 + 1,0 + 0,4 = 8,4 dB; +3 − 8,4 = −5,4 dBm.
c) +11,4 dBm — errada: somou a perda em vez de subtrair.
d) −8,4 dBm — errada: ignorou a potência do Tx.

**Q8.** O medidor lê −18 dBm com a referência (zero) em −15 dBm. Qual é a perda do trecho?
a) **3 dB, ou seja, só metade da potência chegou** — correta: −18 − (−15) = −3 dB [10].
b) 33 dB — errada: somou os módulos.
c) 3 dBm — errada: diferença entre dois dBm dá **dB**, não dBm.
d) 1,2 dB — errada: dividiu os valores em vez de subtrair.

### Termos para o glossário

| Sigla | Português | Inglês | Definição curta |
|---|---|---|---|
| — | Núcleo | *Core* | Parte central da fibra, por onde a luz viaja |
| — | Casca | *Cladding* | Vidro de índice menor em volta do núcleo (125 µm) |
| n | Índice de refração | *Refractive index* | Quanto a luz "desacelera" no material |
| TIR | Reflexão interna total | *Total internal reflection* | Reflexão completa na interface núcleo/casca |
| NA | Abertura numérica | *Numerical aperture* | Medida do cone de luz aceito pela fibra |
| MFD | Diâmetro do campo modal | *Mode field diameter* | "Tamanho real" do feixe na monomodo (~9,2 µm em 1310) |
| SM / SMF | Monomodo | *Single-mode fiber* | Núcleo ~9 µm, um modo, longas distâncias |
| MM / MMF | Multimodo | *Multimode fiber* | Núcleo 50/62,5 µm, curtas distâncias |
| OM1–OM5 | Classes multimodo | *Optical Multimode* | Classes ISO/IEC 11801 de fibras MM |
| OS1/OS2 | Classes monomodo | *Optical Single-mode* | Classes de fibras SM para cabeamento |
| LWP | Baixo pico d'água | *Low water peak* | Fibra com 1383 nm utilizável (G.652.C/D) |
| — | Revestimento primário | *Primary coating* | Acrílico de ~250 (ou 200) µm sobre o vidro |
| — | Buffer apertado | *Tight buffer* | Camada plástica de 900 µm em cabos internos |
| — | Tubo solto | *Loose tube* | Tubo com fibras de 250 µm soltas (cabo externo) |
| — | Macrocurvatura | *Macrobending* | Perda por curva visível (raio de mm a cm) |
| — | Microcurvatura | *Microbending* | Perda por deformações microscópicas (pressão, frio) |
| — | Espalhamento de Rayleigh | *Rayleigh scattering* | Perda intrínseca do vidro, ∝ 1/λ⁴ |
| CD | Dispersão cromática | *Chromatic dispersion* | Cores diferentes viajam em velocidades diferentes |
| — | Dispersão modal | *Modal dispersion* | Modos (caminhos) diferentes chegam em tempos diferentes (MM) |
| dB | Decibel | *Decibel* | Relação logarítmica entre duas potências |
| dBm | Decibel-miliwatt | *dBm* | Potência absoluta referida a 1 mW |
| PON | Rede óptica passiva | *Passive Optical Network* | Rede ponto-multiponto com divisores passivos |
| OTDR | Reflectômetro óptico no domínio do tempo | *Optical Time-Domain Reflectometer* | Instrumento que "enxerga" eventos ao longo da fibra |
| WDM | Multiplexação por comprimento de onda | *Wavelength Division Multiplexing* | Várias "cores" na mesma fibra |

### Vídeos em português (verificados) ou termos de busca

Nenhum vídeo foi conferido (título e canal) nesta pesquisa. Termos sugeridos para buscar no YouTube:
- "reflexão interna total fibra óptica explicação"
- "fibra monomodo e multimodo diferença Furukawa"
- "G.652D x G.657A2 diferença"
- "dB e dBm fibra óptica cálculo de orçamento de potência"
- "janelas de transmissão fibra óptica 1310 1550"
- "OTDR 1625 nm macrocurvatura"

Preferir canais de fabricantes (Furukawa, Prysmian Brasil) e de escolas técnicas. Validar antes de publicar.

### Fontes

1. ITU-T G.657 Fibres: Bend-insensitive single-mode fibres for access networks (folheto, 10/2013) — ITU. https://itu.int/dms_pub/itu-t/oth/0b/04/T0B040000542C01PDFE.pdf — 06/11/2026
2. ITU-T Optical Fibres and Cables (folheto, 09/2013) — ITU. https://www.itu.int/dms_pub/itu-t/oth/0b/04/T0B040000552C01PDFE.pdf — 06/11/2026
3. ITU-T G.Sup39 (02/2016) Optical system design and engineering considerations — ITU (cópia integral hospedada por terceiro; a oficial fica em https://www.itu.int/rec/T-REC-G.Sup39). https://mathscinotes.com/wp-content/uploads/2017/03/T-REC-G.Sup39-201602-IPDF-E.pdf — 06/11/2026
4. ITU-T G.9807 10-Gigabit Symmetric PON (folheto) — ITU. https://www.itu.int/en/ITU-T/studygroups/2017-2020/15/Documents/flyers/Flyer_ITU-T_G.9807.pdf — 06/11/2026
5. Selection of different ITU-T G.652 fibers (white paper, Tabela 2) — STL (Sterlite Technologies). https://stl.tech/wp-content/uploads/2023/03/Selection_of_different_ITU-T_G.652-Final.pdf — 06/11/2026
6. G652D – Properties of cable with standard Enhanced SM fibre (2021) — Prysmian. https://ec.prysmian.com/sites/ec.prysmian.com/files/media/documents/G652D.pdf — 06/11/2026
7. Tight Buffer SM G.652.D / OM3 — Prysmian Australia. https://australia.prysmian.com/sites/australia.prysmian.com/files/media/documents/TightBuffer.pdf — 06/11/2026
8. Optical Fiber (Guide to Fiber Optics) — The Fiber Optic Association. https://www.thefoa.org/tech/ref/basic/fiber.html — 06/11/2026
9. OM fiber types — The Fiber Optic Association. https://thefoa.org/tech/OM.html — 06/11/2026
10. dB and dBm in fiber optic measurements — The Fiber Optic Association. https://www.thefoa.org/tech/ref/testing/test/dB.html — 06/11/2026
11. OM1, OM2, OM3, OM4, OM5 and OS1, OS2 Fiber — Fluke Networks. https://www.flukenetworks.com/content/om1-om2-om3-om4-and-os1-os2-fiber — 06/11/2026
12. SMF-28 Ultra Optical Fiber, PI-1424 — Corning (o site retornou 403; dados obtidos por resumo de busca). https://www.corning.com/media/worldwide/coc/documents/Fiber/product-information-sheets/PI-1424-AEN.pdf — 06/11/2026
13. Understanding fiber macrobending specifications — HFCL (blog de fabricante). https://hfcl.com/insights/blogs/understanding-fiber-macrobending-specifications-and-applications-for-each-grade-of-fiber — 06/11/2026
14. BendBright A1 200 µm Single-Mode Optical Fiber — Prysmian NA (via resumo de busca). https://na.prysmian.com/sites/na.prysmian.com/files/media/documents/TLS-DS-F-008-1021_BendBright%20A1%20200%20Single-Mode%20Optical%20Fiber%20-%20North%20America.pdf — 06/11/2026
15. OTDR PON testing, Application Note 201 — EXFO (via resumo de busca). https://www.exfo.com/contentassets/d407e533bf304cf8a8d635f389a1bc3a/exfo_anote201_otdr-pon-testing_en.pdf — 06/11/2026
16. AFL introduces pocket-sized in-service PON troubleshooting OTDR — Broadband Communities (notícia sobre a AFL). https://bbcmag.com/afl-introduces-pocket-sized-in-service-pon-troubleshooting-otdr/ — 06/11/2026
17. Spec OM1 Multimode Fiber 46917 — Leviton (NA 0,275). https://devpreview.leviton.com/content/dam/leviton/network-solutions/product_documents/product_specification/emea/Leviton-EMEA-Spec-OM1-Multimode-Fiber-46917.pdf — 06/11/2026
18. Numerical aperture (glossário) — RF Essentials (fonte fraca, só para mostrar a divergência). https://rfessentials.com/resources/rf-glossary/numerical-aperture/ — 06/11/2026
19. Cabo óptico CFOA AS KP Dry-Dry — Prysmian (ficha via revendedor Instrufiber). https://www.instrufiber.com.br/image/catalog/pdf/c6faf5476cadcee5b40cf0d27f99fa00-CFOA%20AS%20KP%20DRY-DRY%20-%20PRYSMIAN%20-%20INSTRUFIBER.pdf — 06/11/2026

**Sites bloqueados ou inacessíveis:** itu.int/rec (download das recomendações G.652 e G.657 bloqueado), corning.com e csmedia.corning.com (403 / DNS) e globalspec (403). Não foi encontrada ficha Furukawa com valores de atenuação.


---

## Bloco 3 — Cabos e componentes

*Pesquisa feita em 06/11/2026. Todas as fontes foram acessadas nessa data. Os números entre colchetes [n] remetem à lista de Fontes.*

### Resumo
- **ADSS** (*All-Dielectric Self-Supporting*), ou **CFOA-…-AS**, é o cabo óptico aéreo autossustentado e totalmente dielétrico. O número depois de "AS" é o **vão máximo em metros**, ou seja, a distância entre dois postes: AS80 = 80 m, AS120 = 120 m, AS200 = 200 m [1][2]. A norma ABNT do produto é a **NBR 14160** [1].
- Como ler a gravação Prysmian: `CFOA-[fibra]-AS[vão]-[S/G] [nº]FO [NR/RC]`. Nela, S = núcleo seco, G = núcleo geleado, NR = capa normal e RC = capa retardante à chama [1].
- **O código de cores brasileiro das fibras é igual nos três documentos consultados** (Furukawa, Prysmian e Transcend): verde, amarela, branca, azul, vermelha, violeta, marrom, rosa, preta, cinza, laranja e azul-claro/"água" [1][2][3]. Esse código **é diferente do TIA-598**, que começa em azul e laranja [4].
- **Os tubos mudam conforme o fabricante.** A Furukawa ET02719 usa tubos coloridos na mesma sequência das fibras [3]. A Prysmian (cabo AS) e a Transcend usam **tubo piloto verde + tubo direcional amarelo + demais brancos/naturais** [1][2].
- Polimento: conector **UPC** usa corpo azul e **APC** usa corpo verde, com face a 8° [4][5]. Nunca conecte APC com UPC [6].

### Fatos e valores de referência
| Afirmação | Valor | Fonte | Acesso | Confiança |
|---|---|---|---|---|
| Significado de "AS80/120/200" | Vão máximo de 80/120/200 m | [1][2] | 06/11/2026 | Alta |
| Norma ABNT do ADSS | NBR 14160 – "Cabo óptico aéreo dielétrico autossustentado" | [1] | 06/11/2026 | Alta |
| Norma do cabo de duto | NBR 14566 | [7] | 06/11/2026 | Alta |
| Norma do drop (flat e figura 8) | NBR 15596 | [8][9] | 06/11/2026 | Alta |
| Normas de cabo anti-roedor | NBR 14773 (cabo dielétrico); NBR 16164 (cabo de terminação) | [3][10] | 06/11/2026 | Alta |
| NBR 14584 / NBR 14772 | Não encontrei fonte que confirme o tema dessas normas | — | — | Não usar |
| Construção do ADSS Prysmian | Tubos loose SZ em torno de FRP/GRP, aramida, fios hidroexpansíveis, capa preta anti-UV, fio de rasgamento (*ripcord*) | [1] | 06/11/2026 | Alta |
| Fibras por tubo (ADSS Prysmian) | 12 fibras por tubo em 48F a 144F; 6 por tubo em 24F/36F | [1] | 06/11/2026 | Alta |
| Raio mínimo de curvatura do ADSS | 20 × Ø durante a instalação; 10 × Ø depois de instalado | [1] | 06/11/2026 | Alta (pode variar por fabricante) |
| Temperatura de operação do ADSS | −20 °C a +65 °C | [1] | 06/11/2026 | Alta |
| Atenuação da fibra G.652D (máx.) | 0,33 dB/km em 1310 nm; 0,19 dB/km em 1550 nm | [1] | 06/11/2026 | Alta |
| Lance padrão do ADSS | Bobina de 4 km | [1] | 06/11/2026 | Média |
| Drop flat / drop figura 8 | Vão máx. 80 m; flecha de instalação de 1 % do vão; no figura 8, mensageiro de aço galvanizado de 1,30 mm | [8][9] | 06/11/2026 | Alta |
| Proteção anti-roedor (Furukawa) | Camada de fibra de vidro de 1,3 mm sobre a capa interna | [3][10] | 06/11/2026 | Alta |
| OPGW | Cabo para-raios (*ground wire*) com fibras em tubos e armação metálica; norma IEC 60794-4-10:2014 | [11] | 06/11/2026 | Alta |
| Ancoragem obrigatória | Nas pontas do cabo e em desvio de traçado ≥ 20°. Abaixo de 20°, em geral usa-se suspensão (tangente) | [12] | 06/11/2026 | Média (fabricante estrangeiro) |
| Sobra para emenda | Cortar cerca de 2–3 m em cada ponta; prever ≥ 5 m para fazer a emenda no chão; reserva definida pela empresa | [12] | 06/11/2026 | Média |
| Reserva técnica de ocupante (Neoenergia) | No vão, a ≥ 2 m do poste, em "optloop"/raquete de no máximo 12 m. Cruzeta ou "kit reserva" proibidos | [13] | 06/11/2026 | Alta (vale para ocupante, não para a rede própria) |
| Plaqueta de identificação (Neoenergia) | 100 × 50 × 3 mm, fundo amarelo com letras pretas, a 0,2–0,4 m do poste | [13] | 06/11/2026 | Alta (norma de outra empresa) |
| Ancoragem do ocupante (Neoenergia) | Parafuso, olhal, alça preformada e manilha-sapatilha | [13] | 06/11/2026 | Alta |
| Refletância (FOA) | PC −30 a −40 dB; UPC −40 a −50 dB; APC −60 dB ou melhor | [5] | 06/11/2026 | Alta |
| Perda por conexão | Típica 0,3 dB; máxima TIA-568 0,75 dB | [14] | 06/11/2026 | Alta |
| Perda por emenda | Máxima TIA-568 0,3 dB; fusão monomodo típica < 0,05 dB | [14] | 06/11/2026 | Alta |
| Cor do conector | Monomodo azul; monomodo APC verde | [4] | 06/11/2026 | Alta |

### Código de cores

**(a) Padrão brasileiro de fibras.** É o mesmo na Furukawa ET02719 [3], na Prysmian [1][7] e na Transcend [2].
| Nº | Cor | Nº | Cor |
|---|---|---|---|
| 1 | Verde | 7 | Marrom |
| 2 | Amarela | 8 | Rosa |
| 3 | Branca | 9 | Preta |
| 4 | Azul | 10 | Cinza |
| 5 | Vermelha | 11 | Laranja |
| 6 | Violeta | 12 | Azul-claro (a Prysmian chama de "Acqua/Água") |

A Furukawa chama esse padrão de "padrão de cor de tubos **ABNT** colorido" [3]. **Não confirmei qual NBR define a tabela de cores.** Não cite número de norma para o código de cores até verificar.

**(b) TIA-598, segundo a FOA [4]:** 1 azul, 2 laranja, 3 verde, 4 marrom, 5 cinza (*slate*), 6 branco, 7 vermelho, 8 preto, 9 amarelo, 10 violeta, 11 rosa (*rose*), 12 água (*aqua*). A lista confere com a do enunciado. Não acessei o texto da norma TIA, que é paga.

**(c) Mais de 12 fibras ou mais de 12 tubos:**
- **Furukawa** [3]: da 13ª à 24ª fibra ou tubo, as cores se repetem com **traços pretos espaçados de cerca de 10 mm**. Na posição 21 (preta), a marcação é **branca**.
- **Prysmian** [7]: "a partir do 13º tubo loose, será acrescentada uma identificação por meio de **anéis**".
- **TIA-598** (via FOA [4]): os tubos 13–24 repetem as cores com **faixa preta** (no tubo preto, a faixa é amarela). Os tubos 25–36 levam faixa laranja e os 37–48, faixa verde.

**(d) Tubo piloto e tubo direcional.**
- Na Transcend [2], a unidade 01 é o "**Piloto**" (verde), a 02 é o "**Direcional**" (amarelo) e da 03 em diante os tubos são "Normal" (branco ou natural).
- A Prysmian segue a mesma lógica: no ADSS, tubos 1 verde, 2 amarelo e 3–12 brancos [1]. No cabo de duto, 1 verde, 2 amarelo e os demais naturais [7].
- **Como contar:** ache o piloto (verde), que é o tubo 1. O direcional (amarelo) ao lado é o tubo 2 e indica o **sentido de contagem**. Os tubos brancos seguem na sequência: 3, 4, 5 e assim por diante.
- **Dentro de cada tubo**, as fibras seguem o código de 12 cores [2].

### Divergências entre fontes
1. **Cores dos tubos:** a Furukawa ET02719 usa 12 tubos coloridos [3]. A Prysmian e a Transcend usam piloto + direcional + brancos [1][2]. Confira a ficha do cabo instalado.
2. **Marcação acima de 12:** a Furukawa usa traços pretos [3], a Prysmian usa anéis [7] e a TIA usa faixa colorida [4].
3. **Nome da 12ª cor:** "azul-claro" na Furukawa e na Transcend, "acqua/água" na Prysmian. É a mesma cor com nomes diferentes.
4. **"NR":** a Prysmian define NR como classe de resistência à chama "normal" [1]. A Transcend escreve "Norma de Segurança" [2], o que parece erro de redação. Vale a definição da Prysmian.
5. **Refletância do UPC:** a FOA dá −40 a −50 dB [5]. Fornecedores citam −50 a −55 dB, e para APC −60 a −65 dB [6]. Para a prova, use "UPC ≈ −50 dB; APC ≤ −60 dB" e cite a faixa da FOA.
6. **Mistura APC com UPC:** todas as fontes concordam que dá perda alta [6]. Quanto ao "dano permanente", vendedores falam de "vários dB" ou "> 10 dB" e de dano à face, mas não achei norma que trate disso. Use "perda alta, reflexão alta e risco de dano à face".
7. **Reserva técnica:** a Neoenergia limita a 12 m em raquete no vão e proíbe cruzeta [13]. Isso vale para ocupantes de poste. A regra para a rede própria da distribuidora pode ser outra.

### Confirmar na empresa
- **CONFIRMAR NA EMPRESA:** fabricantes e modelos dos cabos instalados (Furukawa, Prysmian ou outro) e qual esquema de cores de tubo cada um usa.
- **CONFIRMAR NA EMPRESA:** comprimento e intervalo da reserva técnica (a cada X m, em cada CEO, junto a travessias), se é feita em raquete ou cruzeta, e em que posição.
- **CONFIRMAR NA EMPRESA:** norma interna de ocupação de postes da distribuidora de Roraima. Não encontrei na web.
- **CONFIRMAR NA EMPRESA:** padrão de plaqueta e de etiquetagem no rack/DIO, ou seja, como a empresa aplica a TIA-606.
- **CONFIRMAR NA EMPRESA:** polimento usado no DIO e nos equipamentos (UPC ou APC) e se há cordões híbridos.
- **CONFIRMAR NA EMPRESA:** se existe OPGW em linhas de transmissão da empresa e quem faz a manutenção dele.

### Lições propostas
1. **Ler a gravação do cabo (12 min)**
   - Objetivo: decodificar `CFOA-SM-AS80-S 12FO NR`.
   - P1: o que significa AS120? P2: o que diferencia S de G?
   - SVG: régua com a gravação dividida em blocos coloridos e uma legenda para cada bloco.
2. **Por dentro do cabo (12 min)**
   - Objetivo: identificar FRP, tubo loose, aramida, fios hidroexpansíveis, ripcord e capa.
   - P1: qual elemento suporta a tração no ADSS? P2: o que é núcleo seco?
   - SVG: corte transversal do ADSS com rótulos.
3. **Código de cores BR × TIA (15 min)**
   - Objetivo: recitar as 12 cores brasileiras e reconhecer o TIA-598.
   - P1: qual é a cor da fibra 4 no padrão BR? P2: em qual padrão a fibra 1 é azul?
   - SVG: duas fileiras de 12 círculos coloridos e numerados.
4. **Tubo piloto, direcional e acima de 12 (12 min)**
   - Objetivo: contar tubos e fibras em cabos de 48 e 144 fibras.
   - P1: qual é o tubo 2? P2: como é marcado o tubo 14 na Furukawa?
   - SVG: corte com tubos verde, amarelo e brancos, com uma seta indicando o sentido de contagem.
5. **Tipos de cabo e onde usar (12 min)**
   - Objetivo: diferenciar ADSS, figura 8, drop flat, cabo de duto e OPGW.
   - P1: qual cabo tem mensageiro de aço? P2: onde fica o OPGW?
   - SVG: cinco perfis de cabo lado a lado.
6. **Ferragens, ancoragem × suspensão e reserva técnica (15 min)**
   - Objetivo: escolher a ferragem pelo ponto da rede.
   - P1: com que desvio de traçado se usa ancoragem? P2: onde fica a raquete?
   - SVG: vista lateral de 4 postes com ancoragem, suspensão, CEO e raquete no vão.
7. **Conectores e DIO (15 min)**
   - Objetivo: identificar SC/LC/FC e UPC/APC e entender o caminho cabo → DIO → cordão → equipamento.
   - P1: qual é a cor do APC? P2: por que não conectar APC com UPC?
   - SVG: faces dos conectores reto e angulado, mostrando a reflexão e o caminho da luz.

### Exemplos de questões
**Q1.** O que significa "AS80" em `CFOA-SM-AS80-S`?
- **a) Vão máximo de 80 m. [CERTA]** A Prysmian e a Transcend definem AS[vão] em metros [1][2].
- b) Cabo com 80 fibras. Errada: o número de fibras aparece em "12FO".
- c) Resistência de 80 kgf. Errada: a carga máxima é dada em outro campo da ficha técnica.
- d) Diâmetro de 8,0 mm. Errada: o diâmetro não faz parte da sigla.

**Q2.** No padrão brasileiro, qual é a cor da fibra 3?
- a) Verde. Errada: verde é a fibra 1.
- **b) Branca. [CERTA]** [3]
- c) Verde no TIA. Errada: no TIA-598, a fibra 3 é verde, mas a pergunta é sobre o padrão brasileiro [4].
- d) Azul. Errada: azul é a fibra 4.

**Q3.** Num cabo Prysmian AS de 72 fibras, como achar o tubo 2?
- **a) É o amarelo (direcional), ao lado do verde (piloto). [CERTA]** [1][2]
- b) É o segundo tubo branco. Errada: os tubos brancos começam no 3.
- c) É o tubo com anel. Errada: o anel só aparece a partir do 13º tubo [7].
- d) É o laranja. Errada: essa é a cor do tubo 2 no TIA-598.

**Q4.** O que significa "S" em `CFOA-SM-AS80-S`?
- a) Monomodo. Errada: monomodo é "SM".
- **b) Núcleo seco, protegido por fios ou fitas hidroexpansíveis. [CERTA]** [1]
- c) Suspensão. Errada: a sigla não indica ferragem.
- d) Retardante à chama. Errada: a classe de chama é NR ou RC.

**Q5.** O que acontece ao conectar um cordão APC a um adaptador com conector UPC?
- a) Nada, porque são compatíveis. Errada: as faces não casam.
- b) Melhora a refletância. Errada: a refletância piora.
- **c) Fica um vão de ar, com perda alta e reflexão alta, e há risco de dano à face. [CERTA]** [5][6]
- d) Só muda a cor do conector. Errada: o problema é a geometria da face.

**Q6.** O cabo ADSS deve ser ancorado:
- a) Em todo poste. Errada: em trecho reto usa-se suspensão.
- **b) Nas pontas e em desvios de traçado a partir de cerca de 20°. [CERTA]** [12]
- c) Só em travessias. Errada: as pontas também precisam de ancoragem.
- d) Nunca, porque é autossustentado. Errada: "autossustentado" quer dizer que não precisa de cordoalha, não que dispensa ferragem.

### Termos para o glossário
| Sigla | Português | Inglês | Definição |
|---|---|---|---|
| ADSS / CFOA-AS | Cabo óptico autossustentado dielétrico | All-Dielectric Self-Supporting | Cabo aéreo sem metal que se sustenta sozinho no vão |
| AS80 | Vão 80 | Span 80 m | Vão máximo de projeto do cabo |
| FRP/GRP | Plástico reforçado com fibra de vidro | Fiber/Glass Reinforced Plastic | Elemento central dielétrico do cabo |
| — | Tubo loose | Loose tube | Tubo plástico com fibras soltas dentro |
| — | Aramida | Aramid yarn | Fio de alta resistência que suporta a tração |
| — | Hidroexpansível | Water-swellable | Material que incha e bloqueia a água |
| NR / RC | Normal / retardante à chama | Normal / flame retardant | Classes de comportamento da capa ao fogo |
| COG / LSZH | Cabo óptico geral / baixa fumaça, sem halogênio | Low Smoke Zero Halogen | Capas para uso interno |
| OPGW | Cabo para-raios com fibra | Optical Ground Wire | Cabo para-raios de linha de transmissão com fibras dentro |
| CEO | Caixa de emenda óptica | Splice closure | Caixa que protege as emendas |
| CTO / NAP | Caixa de terminação óptica | Network Access Point | Caixa de onde saem os drops |
| DIO | Distribuidor interno óptico | Optical Distribution Frame (ODF) | Painel no rack onde o cabo é terminado |
| PTO | Ponto de terminação óptica | Optical outlet | Ponto final da fibra no cliente |
| — | Pigtail (extensão óptica) | Pigtail | Fibra com conector em só uma ponta, para emendar |
| — | Cordão óptico | Patch cord | Fibra com conector nas duas pontas |
| UPC / APC | Polimento ultra / angular | Ultra / Angled Physical Contact | Face reta (azul) / face a 8° (verde) |
| — | Refletância | Reflectance | Fração da luz refletida, em dB negativos |
| — | Reserva técnica | Slack loop / slack storage | Sobra de cabo guardada para manutenção |

### Vídeos em português (verificados) ou termos de busca
Não verifiquei nenhum vídeo (título e canal). Termos de busca sugeridos no YouTube:
- "código de cores fibra óptica tubo piloto direcional"
- "cabo ADSS AS80 como ler"
- "conector APC UPC diferença"
- "instalação cabo ADSS ancoragem suspensão reserva técnica"
- "DIO montagem fusão pigtail"

### Fontes
1. Prysmian. *CFOA AS KP DRY-DRY – Cabo Óptico Dielétrico Autossustentado vãos de até 200 m* (BR00_CFOA_AS_DRY_20250625). Arquivo hospedado na Instrufiber: https://www.instrufiber.com.br/image/catalog/pdf/c6faf5476cadcee5b40cf0d27f99fa00-CFOA%20AS%20KP%20DRY-DRY%20-%20PRYSMIAN%20-%20INSTRUFIBER.pdf — acesso em 06/11/2026.
2. Transcend. *Cabo Óptico Speed Star AS80, AS120 e AS200*. Arquivo hospedado na Instrufiber: https://www.instrufiber.com.br/image/catalog/pdf/6d64d073b91d01122c26db94f7ef8e66-Cabos%20AS%20Geral%20Transcend%20-%20INSTRUFIBER.pdf — acesso em 06/11/2026.
3. Furukawa Electric LatAm. *ET02719 v7 (28/06/2024) – Cabo óptico protegido contra roedores e padrão de cor de tubos ABNT colorido*: https://www.instrufiber.com.br/image/catalog/pdf/f9ceeafa9dd5e981464834fafe8443f6-CFOA-XX-DDR-X-FO-RA.pdf — acesso em 06/11/2026.
4. The Fiber Optic Association. *Fiber Optic Cable and Connector Color Codes*: https://www.thefoa.org/tech/ColCodes.htm — acesso em 06/11/2026.
5. The Fiber Optic Association. *Reflectance testing*: https://www.thefoa.org/tech/ref/testing/test/reflectance.html — acesso em 06/11/2026.
6. Fornecedores, fonte secundária: L-com, *APC vs UPC*: https://www.l-com.com/resources/blog/apc-vs-upc-fiber-connectors ; Spring Optical: https://www.springoptical.com/info/pc-vs-upc-vs-apc-fiber-connectors-103528051.html — acesso em 06/11/2026.
7. Prysmian. *CFOA-SM-DD-S 002-288FO NR-RC – Cabo Óptico Dielétrico Duto*: https://br.prysmian.com/sites/br.prysmian.com/files/media/documents/CO_SUB_01_PT_01_CFOA-SM-DD-S%20002-288FO%20NR-RC.pdf — acesso em 06/11/2026.
8. Prysmian. *Flat Drop Óptico SM 002-012FO*: https://br.prysmian.com/sites/br.prysmian.com/files/media/documents/CO_DR_04_PT_01_FLAT%20DROP%20OPTICO%20SM%20002-012FO%20NR-COG-LSZH.pdf — acesso em 06/11/2026.
9. Prysmian. *Drop Óptico Figura 8*: https://br.prysmian.com/sites/br.prysmian.com/files/media/documents/CO_DR_01_PT_01_CABO%20FO%20XX%20DROP%20FIG%208%20MG%20002-012FO%20COG%20%281%2C30%29.pdf — acesso em 06/11/2026.
10. Furukawa. *ET02040 v2 – Cabo óptico dielétrico protegido contra roedores, tubo único UTR*. Arquivo hospedado na Instrufiber: https://www.instrufiber.com.br/image/catalog/pdf/55a17a54434109bfd726f32fde59ba32-CFOT-XX-UTR-XX-XX-RA%20-%20Cabo%20ptico%20Dieltrico%20protegidos%20contra%20Roedores%20Tubo%20nico%20UTR%20-%20FURUKAWA%20-%20INSTRUFIBER.pdf — acesso em 06/11/2026.
11. IEC. *IEC 60794-4-10:2014 – OPGW along electrical power lines*: https://webstore.iec.ch/publication/3505 — acesso em 06/11/2026.
12. Sterlite Technologies. *Aerial Fiber Cable – Application Note*: https://www.stl.tech/new_pdf/pdf/knowledgecenter/appl-note/Aerial-Fiber-Cable.pdf — acesso em 06/11/2026.
13. Neoenergia. *DIS-NOR-056 rev. 01 (aprovada em 22/02/2022) – compartilhamento de infraestrutura*: https://www.neoenergia.com/documents/d/sp/dis-nor-056-rev01-pdf — acesso em 06/11/2026.
14. The Fiber Optic Association. *Loss Budget*: https://www.thefoa.org/tech/lossbudg.htm — acesso em 06/11/2026.


---

## Bloco 4 — FTTH/PON

Pesquisa feita em 06/11/2026. As fontes estão numeradas em [n] na seção Fontes.

### Resumo

- Uma PON (rede óptica passiva, *Passive Optical Network*) liga uma OLT (terminal de linha óptica, *Optical Line Terminal*) a várias ONU/ONT (*Optical Network Unit/Terminal*) por uma ODN (rede de distribuição óptica, *Optical Distribution Network*) passiva. A ODN é formada por fibra, splitters, CTO (caixa de terminação óptica), drop e PTO (ponto de terminação óptica).
- **GPON (G.984.x):** opera a 2,488 Gbit/s na descida e 1,244 Gbit/s na subida. O downstream usa 1480–1500 nm (1490 nm) e o upstream usa 1300–1320 nm (1310 nm). O alcance físico básico é de 20 km e o alcance lógico chega a 60 km [1].
- **Classes ópticas de GPON:** a classe B+ admite até 28 dB de perda na ODN e a classe C+ até 32 dB [2][3]. A perda **mínima** de 13 dB para B+ e de 17 dB para C+ **não foi confirmada** no texto da norma (ver Divergências).
- **XGS-PON (G.9807.1):** opera a 9,953 Gbit/s nos dois sentidos, com downstream em 1575–1580 nm e upstream em 1260–1280 nm. Convive com a GPON na mesma ODN por WDM [4]. As classes de perda são N1 (14–29 dB), N2 (16–31 dB), E1 (18–33 dB) e E2 (20–35 dB) [5].
- **Splitters balanceados:** os valores máximos de ficha técnica ficam cerca de 1 a 3 dB acima do ideal teórico 10·log10(N) [6][7][8]. Os splitters desbalanceados FBT da Intelbras (5/95 a 50/50) têm ficha completa [9].
- **Sinal na ONU:** as fichas de fabricante dão −8 a −27 dBm (algumas −28 dBm) [10][11][12]. Faixas "ideais" como −15 a −25 dBm são **prática de mercado** e não aparecem em norma.

### Fatos e valores de referência

| Afirmação | Valor | Fonte | Acesso | Confiança |
|---|---|---|---|---|
| Taxas GPON | 2,488 Gbit/s ↓ / 1,244 Gbit/s ↑ | [1][3] | 06/11/2026 | Alta |
| λ GPON | ↓ 1480–1500 nm; ↑ 1300–1320 nm; o vídeo RF em 1550 nm segue a banda de melhoria da G.984.5 | [1] | 06/11/2026 | Alta (o valor de 1550 nm é média) |
| Alcance GPON | 20 km físico básico; 60 km lógico; até 60 km físico com extensor (G.984.6) | [1] | 06/11/2026 | Alta |
| Distância diferencial GPON | 20 km entre a ONU mais próxima e a mais distante | [13] | 06/11/2026 | Média |
| Potência Tx da OLT GPON B+ | +1,5 a +5 dBm | [3][2] | 06/11/2026 | Alta |
| Potência Tx da OLT GPON C+ | +3 a +7 dBm | [3][2] | 06/11/2026 | Alta |
| Sensibilidade da OLT (Rx a 1310 nm) | B+ −28 dBm; C+ −30 dBm (BER 10⁻¹⁰) ou −32 dBm (BER 10⁻⁴) | [3] | 06/11/2026 | Alta |
| Sobrecarga da OLT | B+ −8 dBm; C+ −12 dBm | [3] | 06/11/2026 | Alta |
| Potência Tx da ONU GPON B+ (1310 nm) | +0,5 a +5 dBm | [10] | 06/11/2026 | Alta |
| Sensibilidade e sobrecarga da ONU B+ (1490 nm) | −27 dBm / −8 dBm | [10][11] | 06/11/2026 | Alta |
| Sensibilidade da ONU C+ | ≈ −30 dBm (G.984.2 Amd.) | não confirmada no texto | — | Baixa: CONFIRMAR |
| Taxas XGS-PON | 9,95328 Gbit/s nos dois sentidos | [4] | 06/11/2026 | Alta |
| λ XGS-PON | ↓ 1575–1580 nm (1577 nm); ↑ 1260–1280 nm (1270 nm) | [4] | 06/11/2026 | Alta |
| Classes XGS-PON | N1 14–29, N2 16–31, E1 18–33, E2 20–35 dB | [5] | 06/11/2026 | Alta |
| OLT XGS-PON N1 | Tx +2 a +5 dBm; Rx −26 dBm a 10G | [2][14] | 06/11/2026 | Média |
| ONU XGS-PON N1 | Tx +4 a +9 dBm; Rx −28 dBm | [14] | 06/11/2026 | Média |
| Conector SC/APC (classe III) | ≤ 0,3 dB | [7] | 06/11/2026 | Alta |
| Conector, limite TIA-568 | ≤ 0,75 dB por par | [15] | 06/11/2026 | Alta |
| Fusão monomodo | 0,15 dB (FOA); limite TIA de 0,3 dB; projeto típico de 0,1 dB | [15][2] | 06/11/2026 | Alta |
| Atenuação da fibra G.652.D (planejamento) | 1270 nm ≈ 0,47; 1310 nm ≈ 0,40; 1490/1550/1577 nm ≈ 0,30 dB/km | [2] | 06/11/2026 | Média |
| Atenuação da fibra (FOA, conservadora) | 1310 nm 0,5; 1550 nm 0,4 dB/km | [15] | 06/11/2026 | Alta |
| Margem de segurança | 3 dB no exemplo; recomendação de 3 a 5 dB | [2] | 06/11/2026 | Média |
| 1000BASE-LX | Tx −9,5 a −3 dBm; Rx −19 a −3 dBm; 10 km em SMF | [16] | 06/11/2026 | Alta |
| 1000BASE-BX10 | Tx −9 a −3 dBm; Rx −19,5 dBm; orçamento de 11 dB; 10 km | [17] | 06/11/2026 | Alta |
| 1000BASE-ZX (não é norma IEEE) | Tx −2 a +5 dBm; Rx −25 a −3 dBm; 70 km (Juniper) | [18] | 06/11/2026 | Média |

### Tabelas para as calculadoras

**A) Splitter balanceado (PLC), em dB.** Ideal = 10·log10(N).

| Razão | Ideal | Intelbras, máx. sem conector [7] | Senko, máx. sem conector [6] | FS [8] | **Padrão do app** |
|---|---|---|---|---|---|
| 1:2 | 3,01 | 4,0 | 4,0 | — | **4,0** |
| 1:4 | 6,02 | 7,3 | 7,4 | — | **7,4** |
| 1:8 | 9,03 | 10,5 | 10,7 | — | **10,7** |
| 1:16 | 12,04 | 13,7 | 13,7 | — | **13,7** |
| 1:32 | 15,05 | 16,9 | 16,9 | — | **17,0** |
| 1:64 | 18,06 | — | 21,0 | 21,4 | **21,4** |
| 1:128 | 21,07 | — | — | — | **24,5** (estimado; CONFIRMAR) |

Notas: a FS orienta somar 0,2 dB por conector do splitter [8]. A ficha da Omada dá faixas reais de 1:8 = 10–11 dB e 1:32 = 17–18 dB [2]. O FBT balanceado é viável até cerca de 1:4, e a partir de 1:8 o PLC domina por ser mais uniforme e funcionar em banda larga [8][9].

**B) Splitter desbalanceado FBT 1x2, em dB.** A coluna "Ideal" vale −10·log10(fração).

| Razão | Ideal (perna menor / maior) | Intelbras XFSD, máx. [9] | Bazis, máx. [19] | **Padrão do app** |
|---|---|---|---|---|
| 1/99 | 20,0 / 0,04 | — | — | **23,0 / 0,3** (Univ. Pisa [20]; CONFIRMAR) |
| 5/95 | 13,0 / 0,22 | 14,3 / 0,8 | 14,2 / 0,4 | **14,3 / 0,8** |
| 10/90 | 10,0 / 0,46 | 11,0 / 1,1 | 11,0 / 0,65 | **11,0 / 1,1** |
| 20/80 | 6,99 / 0,97 | 7,9 / 1,6 | 7,6 / 1,2 | **7,9 / 1,6** |
| 30/70 | 5,23 / 1,55 | 6,1 / 2,2 | — | **6,1 / 2,2** |
| 40/60 | 3,98 / 2,22 | 4,8 / 2,9 | — | **4,8 / 2,9** |
| 50/50 | 3,01 / 3,01 | 3,7 / 3,7 | — | **3,7 / 3,7** |

**C) Classes ópticas: perda permitida na ODN e potências.**

| Classe | Perda da ODN (dB) | Tx da OLT (dBm) | Rx mín. da ONU (dBm) | Fonte |
|---|---|---|---|---|
| GPON B+ | até 28 (mínimo de 13: CONFIRMAR) | +1,5 a +5 | −27 (sobrecarga −8) | [2][3][10] |
| GPON C+ | até 32 (mínimo de 17: CONFIRMAR) | +3 a +7 | ≈ −30 (CONFIRMAR) | [2][3] |
| XGS N1 | 14–29 | +2 a +5 | −28 | [5][2][14] |
| XGS N2 | 16–31 | +4 a +7 | CONFIRMAR | [5][2] |
| XGS E1 | 18–33 | +6 a +9 | CONFIRMAR | [5][2] |
| XGS E2 | 20–35 | CONFIRMAR | CONFIRMAR | [5] |

**D) Componentes passivos (padrão do app).** Fibra: 0,35 dB/km a 1310 nm e 0,25 dB/km a 1490/1550 nm (cenário típico) ou 0,40 / 0,30 dB/km (cenário conservador) [2][15]. Conector: 0,3 dB (típico) e 0,5 dB (conservador) [7][15]. Fusão: 0,1 dB (típico) e 0,15–0,3 dB (conservador) [15]. Margem: 3 dB [2].

**E) SFP ponto a ponto (P2P).**

| Módulo | λ | Tx mín/máx (dBm) | Sensibilidade (dBm) | Sobrecarga (dBm) | Orçamento (Tx mín − Sens) | Fonte |
|---|---|---|---|---|---|---|
| 1000BASE-LX/LH | 1310 | −9,5 / −3 | −19 | −3 | 9,5 dB | [16] |
| 1000BASE-BX10 (par 1310/1490) | 1310↔1490 | −9 / −3 | −19,5 | −3 | 10,5 dB (ficha diz 11 dB) | [17] |
| 1000BASE-ZX (70–80 km) | 1550 | −2 / +5 | −25 | −3 | 23 dB | [18] |

Alerta para o app: no ZX, um enlace curto pode **saturar** o receptor (Tx +5 > −3). Nesse caso é preciso um atenuador.

Fórmulas: P(mW) = 10^(dBm/10) e dBm = 10·log10(P/1 mW). Orçamento disponível = Tx mín − Sensibilidade. Perda total = fibra (km × α) + Σ conectores + Σ fusões + Σ splitters. Potência recebida = Tx − Perda total. Critério de aprovação: perda total + margem ≤ orçamento, e ao mesmo tempo potência recebida ≤ sobrecarga.

### Divergências entre fontes

1. **Perda mínima das classes B+ e C+:** os valores de 13 e 17 dB circulam em material didático, mas as fontes acessadas só confirmam os máximos de 28 e 32 dB [2][3]. Marcado como CONFIRMAR na G.984.2 Amd.1 (página gratuita do ITU-T, cujo PDF não foi possível extrair).
2. **Sensibilidade da ONU B+:** a ficha FS e a Intelbras ONU 110 dão −27 dBm [10][12], enquanto a Intelbras ONU R1 dá −28 dBm [12]. Alguns modelos Huawei vão de −27 a −29 dBm (revendedor) [11].
3. **Sensibilidade da OLT C+:** é −30 dBm a BER 10⁻¹⁰ ou −32 dBm a BER 10⁻⁴ (pré-FEC) na mesma ficha [3]. A Omada cita só −32 dBm [2].
4. **Atenuação da fibra:** a FOA usa 0,5/0,4 dB/km [15]. A Omada e a TIA usam 0,40/0,30 dB/km [2][15]. Cabos G.652.D novos têm ficha de cerca de 0,36/0,22 dB/km (Prysmian) [21].
5. **Conector:** varia de 0,2 a 0,75 dB por fonte [2][7][15]. A própria página da FOA usa 0,3 dB e 0,5 dB em trechos diferentes.
6. **Splitter 1:64:** 20,4 (Gofoton), 21,0 (Senko) e 21,4 dB (FS) [6][8]. Fichas "com conector" somam cerca de 0,2–0,4 dB.
7. **Erro de soma na Omada:** o exemplo publicado dá 22,9 dB, mas os itens listados somam 21,9 dB [2]. Isso é bom para mostrar ao aluno que convém sempre refazer a conta.
8. **ZX:** a Cisco antiga dá Rx de 0 a −23 dBm, e outra revisão dá −3 a −23 dBm [22]. A Juniper dá −25 dBm [18]. O ZX não está em norma IEEE.
9. **Faixa "ideal" na ONU:** não foi encontrada em norma nem em documento oficial Huawei, Intelbras ou Furukawa. O manual Huawei EchoLife só alerta fora de −27/−8 dBm [11]. Textos de campo citam −8 a −25 dBm. Os valores −15 a −25 dBm devem ser tratados como prática de mercado.
10. **Furukawa:** a ficha FSDS-037F (1:8 ≈ 10,4–11,0 dB; 1:16 ≈ 13,8–14,5 dB) não foi lida integralmente, então os valores não foram usados.

### Confirmar na empresa

- Faixa de potência na ONU que a distribuidora exige dos ISPs (se houver) e o limiar de alarme configurado na OLT.
- Classe óptica dos SFP das OLTs usadas (B+, C+ ou C++), se é GPON ou XGS-PON, e se há vídeo em 1550 nm.
- Topologia usada pelos ISPs nos postes (balanceada 1:8+1:8 ou 1:4+1:16, ou cascata desbalanceada) e a norma técnica de compartilhamento de postes da distribuidora (identificação de CTOs, reserva técnica).
- Padrão interno de perda por conector e fusão, margem de projeto e se o cálculo de perda é exigido no projeto de ocupação.
- Se a distribuidora usa PON própria (AMI, religadores, automação) ou só P2P/anel para subestações. Teleproteção exige latência e assimetria baixas (IEC 61850-90-12: TL5 ≤ 5 ms para 87L; assimetria < 200 µs) [23]. Não foi encontrada fonte que valide PON para teleproteção. Existem casos de PON para medição e automação da distribuição (Huawei/State Grid; EPB Chattanooga) [24].
- Modelos de SFP P2P em estoque (LX, BX ou ZX) e as fichas técnicas reais deles.

### Lições propostas (10–15 min cada)

1. **dBm, mW e dB sem medo.** Objetivo: converter dBm↔mW e somar perdas em dB. P1: quanto é −27 dBm em mW (≈ 0,002 mW = 2 µW)? P2: o que acontece com a potência após uma perda de 3 dB? (Cai à metade.) SVG: régua log com 0 dBm = 1 mW, −10 = 0,1 mW, −20 = 0,01 mW e −30 = 0,001 mW.
2. **Anatomia de uma rede FTTH.** Objetivo: identificar OLT, ODN, splitter primário e secundário, CTO, drop, PTO e ONU. P1: onde fica o splitter secundário? P2: qual equipamento é ativo? SVG: árvore OLT → 1:8 (armário ou poste) → CTO 1:8 → drop → PTO/ONU, com λ 1490↓ e 1310↑ nas setas.
3. **GPON x XGS-PON e coexistência.** Objetivo: comparar taxas, λ e classes. P1: qual λ de downstream da XGS-PON? (1577 nm.) P2: por que as duas convivem na mesma fibra? (WDM com λ distintas e filtro bloqueador.) SVG: espectro de 1260 a 1580 nm com as bandas 1270, 1310, 1490, 1550 e 1577.
4. **Splitters balanceados: teoria x ficha técnica.** Objetivo: usar 10·log10(N) e o valor máximo de ficha. P1: perda ideal de 1:16? (12,04 dB.) P2: perda de 1:4 + 1:8 em cascata pela ficha? (7,3 + 10,5 = 17,8 dB.) SVG: barras ideal x máximo de 1:2 a 1:64.
5. **Splitters desbalanceados e rede em cascata.** Objetivo: calcular a perna "passante" e a perna "derivada". P1: num 10/90, qual perna vai à CTO local? (A de 10%, ≈ 11 dB.) P2: potência após três 90/10 em série pela perna de 90%? (3 × 1,1 = 3,3 dB.) SVG: barramento OLT → T1 (10/90) → T2 (20/80) → T3 (50/50), com derivações para CTOs 1:8.
6. **Orçamento de potência passo a passo.** Objetivo: montar a tabela de perdas e checar a classe. P1: orçamento B+ downstream = 1,5 − (−27) = ? (28,5 dB.) P2: a margem de 3 dB entra somando ou subtraindo? (Soma na perda.) SVG: "escada" de potência descendo da OLT até a ONU.
7. **PON x ponto a ponto na distribuidora.** Objetivo: saber quando usar SFP LX, BX ou ZX e quando usar PON. P1: um ZX num enlace de 2 km sem atenuador: risco? (Saturação.) P2: qual tecnologia se usa para teleproteção de linha? (P2P dedicado, por latência e assimetria.) SVG: subestação A ↔ B com par de SFP e, ao lado, PON atendendo medidores.

### Exemplos de questões

**Q1.** Uma OLT GPON B+ transmite +1,5 dBm (pior caso) e a ONU tem sensibilidade de −27 dBm. Qual é o orçamento de potência?
a) 25,5 dB · b) **28,5 dB** · c) 30,0 dB · d) 1,5 dB
- a) Errada: subtrai os valores com o sinal trocado.
- b) Certa: 1,5 − (−27) = 28,5 dB.
- c) Errada: usaria Tx de +3 dBm, que é o mínimo da classe C+.
- d) Errada: ignora a sensibilidade.

**Q2.** Rede GPON B+ com 12 km de fibra a 1490 nm (0,30 dB/km), splitters 1:8 + 1:8 (10,5 dB cada), 4 conectores (0,3 dB), 6 fusões (0,1 dB) e margem de 3 dB. A rede passa no orçamento de 28 dB?
a) Sim, sobram 5 dB · b) **Não: 29,4 dB > 28 dB** · c) Sim, exatamente 28 dB · d) Não dá para calcular sem a λ de subida
- b) Certa: 3,6 + 21,0 + 1,2 + 0,6 = 26,4 dB; somando a margem, 29,4 dB.
- a) Errada: esquece um dos splitters.
- c) Errada: conta errada.
- d) Errada: o cálculo na λ de descida é válido. Mesmo assim, deve-se refazê-lo em 1310 nm, onde a perda na fibra é maior.

**Q3.** Na mesma rede da Q2, troca-se para 1:4 + 1:8 (7,3 + 10,5 dB). Com Tx de +1,5 dBm, qual é a potência estimada na ONU (sem margem)?
a) −26,4 dBm · b) **−21,7 dBm** · c) −18,7 dBm · d) +24,7 dBm
- b) Certa: a perda é 3,6 + 17,8 + 1,2 + 0,6 = 23,2 dB, e 1,5 − 23,2 = −21,7 dBm.
- a) Errada: usa a perda da Q2.
- c) Errada: soma a margem em vez de subtrair a perda.
- d) Errada: sinal trocado.

**Q4.** Qual é a perda ideal de um splitter 1:32?
a) 32 dB · b) 3,2 dB · c) **15,05 dB** · d) 17 dB
- c) Certa: 10·log10(32) = 15,05 dB.
- d) Errada: 17 dB é o valor máximo de ficha (perdas reais) e não o ideal.
- a) Errada: confunde razão com dB.
- b) Errada: não usa log.

**Q5.** Um ISP coloca um splitter 10/90 numa CTO intermediária. A potência chega a −5 dBm. Qual é o sinal na saída de 10% (Intelbras XFSD 1090)?
a) −5,5 dBm · b) **−16,0 dBm** · c) −6,1 dBm · d) −15,0 dBm
- b) Certa: −5 − 11,0 = −16,0 dBm.
- c) Errada: é a perna de 90% (−5 − 1,1).
- d) Errada: usa o ideal de 10 dB, que serve de teoria mas não de projeto.
- a) Errada: usa o ideal da perna de 90%.

**Q6.** Uma ONU GPON B+ mede −29 dBm. O que se pode afirmar?
a) Está ideal · b) **Está abaixo da sensibilidade da ficha (−27 dBm) e pode ter erros ou cair** · c) Está saturada · d) Está acima de −8 dBm
- b) Certa: −29 dBm é pior que −27 dBm [10][11].
- a) Errada: nem a prática de mercado (até −25 dBm) aceita esse valor.
- c) Errada: saturação ocorre acima de −8 dBm.
- d) Errada: −29 < −8.

### Termos para o glossário

| Sigla | Português | Inglês | Definição |
|---|---|---|---|
| PON | Rede óptica passiva | Passive Optical Network | Rede ponto-multiponto sem elementos ativos entre a OLT e a ONU |
| OLT | Terminal de linha óptica | Optical Line Terminal | Equipamento central (ativo) da PON |
| ONU/ONT | Unidade/terminal de rede óptica | Optical Network Unit/Terminal | Equipamento do cliente que termina a PON |
| ODN | Rede de distribuição óptica | Optical Distribution Network | Parte passiva da rede: fibras, splitters e conectores |
| CTO | Caixa de terminação óptica | Fiber access terminal / NAP | Caixa no poste com splitter secundário e portas para os drops |
| PTO | Ponto de terminação óptica | Optical termination point | Tomada óptica na casa do cliente |
| Drop | Cabo de descida | Drop cable | Cabo que liga a CTO ao cliente |
| PLC | Circuito de onda planar | Planar Lightwave Circuit | Tecnologia de splitter balanceado de banda larga |
| FBT | Bicônico fundido afunilado | Fused Biconical Taper | Tecnologia de splitter, usada em desbalanceados 1x2 |
| WDM | Multiplexação por λ | Wavelength Division Multiplexing | Várias λ na mesma fibra |
| CEx | Elemento de coexistência | Coexistence element | Filtro WDM que junta GPON e XGS-PON |
| dBm | Decibel-miliwatt | dB-milliwatt | Potência absoluta em relação a 1 mW |
| BER | Taxa de erro de bit | Bit Error Ratio | Fração de bits errados |
| SFP | Transceptor plugável | Small Form-factor Pluggable | Módulo óptico intercambiável |
| BiDi | Bidirecional | Bidirectional | Transmite e recebe em uma fibra só, com λ diferentes |

### Vídeos em português

Nenhum vídeo foi verificado (título e canal não foram conferidos). Termos de busca sugeridos no YouTube:
- "cálculo de potência rede GPON splitter"
- "splitter desbalanceado rede FTTH provedor"
- "o que é OLT ONU CTO FTTH"
- "XGS-PON vs GPON coexistência"
- "Intelbras splitter desbalanceado cálculo"
- "Furukawa Academy FTTH"

### Fontes

1. Flyer "G.984 Gigabit Passive Optical Networks", ITU-T SG15. https://itu.int/en/ITU-T/studygroups/2017-2020/15/Documents/flyers/Flyer_ITU-T_G.984.pdf. Acesso em 06/11/2026.
2. "Introduction to Optical Link Budget Between OLT and ONU", Omada (TP-Link). https://support.omadanetworks.com/nordic/document/112365/. Acesso em 06/11/2026.
3. Ficha técnica GSFP-43-20B, GPON OLT SFP B+/C+/C++/D (G.984.2), FS.com. https://img-en.fs.com//file/datasheet/gsfp-43-20b-datasheet.pdf. Acesso em 06/11/2026.
4. Flyer "G.9807 10-Gigabit Symmetric PON", ITU-T SG15. https://www.itu.int/en/ITU-T/studygroups/2017-2020/15/Documents/flyers/Flyer_ITU-T_G.9807.pdf. Acesso em 06/11/2026.
5. ITU-T G.9807.1, Tabela 6-1 (classes de perda), via excerto da G.987.2 (2023). https://www.scribd.com/document/685292560/T-REC-G-987-2-202302-I-PDF-E. Recomendação original: https://www.itu.int/rec/T-REC-G.9807.1. Acesso em 06/11/2026. Fonte secundária; CONFIRMAR no PDF do ITU.
6. "1xN PLC Splitter", SENKO. https://www.senko.com/product/1xn-plc-splitter/. Acesso em 06/11/2026.
7. Datasheet "Splitter com conector" (balanceado), Intelbras. https://backend.intelbras.com/sites/default/files/2022-07/datasheet%20-%20Splitter%20com%20conector%20_%20EN.pdf. Acesso em 06/11/2026.
8. "PLC Fiber Splitter, Mini Plug-in Type", FS.com. https://img-en.fs.com/file/datasheet/mini-plug-in-type-plc-splitters-datasheet.pdf. Acesso em 06/11/2026.
9. Datasheet "Splitter FBT Desbalanceado 1x2 XFSD", Intelbras (Rev. 1.0, 2025). https://backend.intelbras.com/sites/default/files/2025-10/Datasheet%20XFSD%20Rev1_0.pdf. Acesso em 06/11/2026.
10. Ficha técnica "GPON ONU SFP Class B+ 20 km", FS.com. https://resource.fs.com/mall/doc/202308261116399vxqtl.pdf. Acesso em 06/11/2026.
11. Página do produto OptiXstar EG8140H5 (Rx −27 / sobrecarga −8 dBm, B+), Huawei. https://e.huawei.com/br/products/optical-terminal/optixstar-eg8140h5. Manual EchoLife: https://manualshive.com/en/manual/huawei/echolife-hg8240/168238?page=284. Acesso em 06/11/2026. Lidos via resumo de busca.
12. Datasheets ONU 110 e ONU R1, Intelbras. https://backend.intelbras.com/sites/default/files/2020-07/Datasheet-onu-110.pdf e https://backend.intelbras.com/sites/default/files/2025-05/Datasheet%20ONU%20R1%20CKD%20V4_1.pdf. Acesso em 06/11/2026. Lidos via resumo de busca.
13. Sumário da G.984.x, ITU-T. https://www.itu.int/dms_pubrec/itu-t/rec/g/T-REC-G.984.7-201007-I!!SUM-HTM-E.htm. Acesso em 06/11/2026.
14. Datasheet "P-XGS-PON ONT" (Positron) e ficha Huawei XGS-PON SFP10G N1. https://amt.com/wp-content/uploads/2024/11/P-XGS-PON-ONT-Datasheet.pdf e https://pre.solid-optics.com/wp-content/uploads/Datasheet-Huawei-XGS-PON-SFP10G-N1-V2.pdf. Acesso em 06/11/2026. Lidos via resumo de busca.
15. "Guidelines On What Loss To Expect When Testing Fiber Optic Cable", The Fiber Optic Association. https://www.thefoa.org/tech/loss-est.htm. Acesso em 06/11/2026.
16. CTP-SFP-1GE-LX hardware specs, Juniper HCT. https://apps.juniper.net/hct/model/CTP-SFP-1GE-LX/hwspecs. Acesso em 06/11/2026.
17. "1000BASE-BX10 Bidirectional 10 km DDI SFP Modules", Extreme Networks. https://documentation.extremenetworks.com/pluggable/GUID-19ED8539-09FF-4FCA-AA4B-CEF749AEE443.shtml. Acesso em 06/11/2026.
18. Manual do EX9200, tabela de SFP (EX-SFP-1GE-LH), Juniper. https://www.manualslib.com/manual/998152/Juniper-Ex9214.html?page=125. Acesso em 06/11/2026. Lido via resumo de busca.
19. Ficha de splitter FBT, Bazis Telecom. https://bazistelecom.ru/upload/iblock/145/kgb3pv2rlx459n2lv4hqsvitcozh6nl2.pdf. Acesso em 06/11/2026. Lida via resumo de busca.
20. Material didático de comunicações ópticas, Universidade de Pisa. https://docenti.ing.unipi.it/m.luise/com_ottiche/Pdf/96028.pdf. Acesso em 06/11/2026. Lido via resumo de busca.
21. Datasheet G.652.D, Prysmian. https://ec.prysmian.com/sites/ec.prysmian.com/files/media/documents/G652D.pdf. Acesso em 06/11/2026.
22. Datasheet "Cisco SFP" (antigo), Cisco. https://www3-realm.cisco.com/en/US/prod/collateral/modules/ps5455/ps6577/product_data_sheet0900aecd8033f885.html. Acesso em 06/11/2026; página com timeout, lida via resumo de busca.
23. Prévia da IEC TR 61850-90-12, IEC/VDE. https://www.vde-verlag.de/iec-normen/preview-pdf/info_iectr61850-90-12{ed2.0}en.pdf. Acesso em 06/11/2026. Lida via resumo de busca.
24. Caso Beijing Electric Power (xPON para automação da distribuição e medição), Huawei. https://enterprise.huawei.com/topic/power-summit2017-en/success-cases4.html. Acesso em 06/11/2026. Lido via resumo de busca.
25. Webinar "Certification tests for FTTH networks in unbalanced splitter situations", EXFO. https://exfo.com/es/recursos/webinars/certification-tests-ftth-networks-unbalanced-splitter-situations. Acesso em 06/11/2026.


---

## Bloco 5 — Fusão

### Resumo
A fusão óptica (fusion splicing) une duas fibras com um arco elétrico. A qualidade depende quase toda do preparo: fibra limpa, decapada sem marcas e com clivagem (cleave) boa. A máquina mostra uma **perda estimada** (estimated loss), calculada pela imagem. Isso não é medição: a perda real só se confirma com OTDR, de preferência nos dois sentidos, fazendo a média [1][10][13]. Os fabricantes informam perdas médias de 0,03 a 0,05 dB em fibra G.652 e G.657 [6]. O limite de aceite (0,1 dB, 0,15 dB etc.) é outra coisa: vem do contrato ou da norma da empresa. A TIA-568 fixa o máximo de 0,3 dB por emenda [3]. A fibra emendada é protegida por tubete termocontrátil (40 ou 60 mm) e acomodada na bandeja (splice tray) sem passar do raio mínimo [6][11]. Os fragmentos de fibra são o principal risco à saúde [2].

### Fatos e valores de referência
| Afirmação | Valor | Fonte | Acesso | Confiança |
|---|---|---|---|---|
| Pureza do álcool isopropílico para limpar a máquina e a fibra | ≥ 99% | [5] Fujikura Europe | 06/11/2026 | Alta |
| Limpar a fibra antes de decapar e de novo antes de clivar | regra | [1] FOA | 06/11/2026 | Alta |
| Limpar V-grooves e garras / lentes | diariamente / mensalmente | [5] | 06/11/2026 | Alta |
| Ângulo de clivagem do clivador CT50 (medido em interferômetro) | média de 0,3–0,9° (fibra única) | [6] Fujikura | 06/11/2026 | Alta |
| Vida útil da lâmina do CT50 | ~60.000 clivagens | [6] | 06/11/2026 | Alta |
| Comprimento de clivagem: 45S (fibra de 250 µm) / fibra de 400–900 µm | 5–16 mm / 10–16 mm | [6] | 06/11/2026 | Alta |
| Clivar com menos de 10 mm piora o ângulo médio | regra | [6] | 06/11/2026 | Alta |
| Perda média de fusão, 45S (alinhamento por casca) | G.652 0,03 dB; G.657 0,03 dB | [6] | 06/11/2026 | Alta (laboratório, cut-back) |
| Perda média, máquina de fita 90R (V-groove fixo) | G.652 0,05 dB | [6] | 06/11/2026 | Alta |
| Perda típica, Sumitomo 72C+ (SMF) | 0,01 dB | [12] revendedor | 06/11/2026 | Média |
| Fusão monomodo em campo, valor típico | < 0,05 dB; faixa de 0,05–0,15 dB | [4] FOA | 06/11/2026 | Média (via busca) |
| Máximo por emenda pela TIA-568 (fusão ou mecânica) | 0,3 dB | [3] FOA/TIA | 06/11/2026 | Alta |
| Teste de tração (proof test) | ~2,0 N (45S); 1,96 N (31S) | [6]; [14] | 06/11/2026 | Alta / Média |
| Vida útil dos eletrodos | ~6.000 (45S); 2.000 (outro modelo); 1.500 (90R); 800 (fita de 16 fibras) | [6] | 06/11/2026 | Alta (varia com o ambiente) |
| Arc check: fazer no início de cada dia e repetir se der negativo | regra | [9] OFS | 06/11/2026 | Média (outro fabricante) |
| Re-arco: no máximo 2 vezes; bolha ou "gordura" → refazer a emenda | regra | [1] | 06/11/2026 | Alta |
| Tubete termocontrátil | 40 ou 60 mm; máximo de 66 mm e Ø 6 mm (Fujikura) | [6] | 06/11/2026 | Alta |
| Sobra dentro da caixa | ~1 m de tubo loose + ~1 m de fibra na bandeja | [1] | 06/11/2026 | Média (varia por caixa) |
| Raio mínimo de curvatura | G.652.D 30 mm; G.657.A1 10 mm; A2 7,5 mm; B3 5 mm | [11] ITU-T | 06/11/2026 | Alta |
| Conector de campo pré-polido (Furukawa EZ APC) | perda de 0,30 dB típica / 0,50 dB máxima | [7] | 06/11/2026 | Média |
| Emenda mecânica, valor típico | 0,3 dB | [4] | 06/11/2026 | Média |
| Perda estimada da máquina = aproximação; validar com OTDR ou medidor de perda | regra | [1][13] | 06/11/2026 | Alta |

### Passo a passo
**Antes da fusão (checklist offline)**
1. Fibra a emendar identificada no mapa (cabo, tubo, cor) e confirmada com o encarregado.
2. Local protegido de vento, poeira e chuva (tenda ou veículo); tapete de trabalho limpo.
3. Óculos de proteção; nada de comida ou bebida no local [2].
4. Recipiente de descarte de fibra aberto e fita adesiva à mão [2].
5. Bateria carregada; máquina sem condensação (se saiu do carro com ar-condicionado, esperar a temperatura igualar).
6. Arc check feito hoje [9]; contador de eletrodos abaixo do limite [6].
7. V-grooves, garras e lentes limpos; clivador limpo, com a posição da lâmina conferida [5].
8. Programa certo selecionado (SM G.652 / G.657 / AUTO).
9. Tubetes no tamanho da bandeja; álcool ≥ 99% [5]; lenço que não solta fiapo (lint-free).

**Preparo e fusão**
1. Abrir a capa no comprimento indicado pela caixa (CONFIRMAR); cortar a aramida e o elemento central; fixar o cabo na caixa.
2. Limpar a geleia do tubo com o removedor indicado pelo fabricante do cabo e secar [15].
3. Decapar o tubo loose sem marcar as fibras; limpar a geleia das fibras.
4. **Colocar o tubete na fibra antes de clivar.**
5. Decapar o revestimento de 250 µm com o decapador (stripper), sem dobrar a fibra.
6. Limpar com álcool: 1 passada, sem voltar o lenço.
7. Clivar no comprimento do suporte (por exemplo, 10–16 mm) [6]; depois de limpa e clivada, **não encostar a ponta em nada**.
8. Recolher o fragmento na hora, para o recipiente.
9. Colocar a fibra no V-groove; fechar a tampa contra vento.
10. Ver na tela: ângulo, sujeira, bolha.
11. Fundir e anotar a perda estimada.
12. Teste de tração (automático ou manual).
13. Centralizar o tubete sobre a emenda e levar ao forno; esperar esfriar.
14. Acomodar na bandeja respeitando o raio e a ordem; preencher o mapa.

### Divergências entre fontes
- **Ângulo de clivagem aceitável:** um guia de estudo BICSI pede até 0,5° [14]. O clivador Fujikura tem média de 0,3–0,9° [6]. Um padrão privado (FOI) aceita até 2°. O limite (cleave limit) é configurável na máquina e varia por modelo (CONFIRMAR).
- **Perda de fusão:** 0,01–0,05 dB vem de fabricante, medido em laboratório por cut-back [6][12]. A FOA usa 0,15 dB para orçamento de perda [4]. A TIA admite 0,3 dB [3]. O critério de aceite (0,1 ou 0,15 dB) é **contratual**: nenhuma fonte o apresenta como norma universal.
- **Remoção da geleia:** produtos de mercado (D'Gel, SqueekyKleen) são à base de solvente próprio para o gel. Fontes antigas usam solvente cítrico e depois álcool [15]. "Não usar solvente agressivo" não aparece como regra de fabricante; o certo é usar o produto que o fabricante do cabo indicar e secar bem.
- **Vida do eletrodo:** de 800 a 6.000 arcos conforme o modelo [6]; o ambiente reduz esse número.
- **G.657.B2:** o folheto de 2012 o lista à parte; fontes de 2024 dizem que foi fundido ao A2 [11].

### Confirmar na empresa
- Marca e modelo da máquina e do clivador (Fujikura, Sumitomo, INNO, Signal Fire, AFL e Furukawa são só referência).
- Alinhamento por núcleo ou por casca; programa padrão.
- Critério de aceite por emenda (0,1? 0,15 dB?) e se o OTDR é bidirecional.
- Tipo de fibra dos cabos (G.652.D ou G.657.A1/A2).
- Modelos de CEO e CTO: comprimento de abertura, tubete (40 ou 60 mm), bandejas, raio.
- Removedor de geleia aprovado; álcool fornecido (99%?).
- Modelo da planilha ou mapa de fusão e padrão de cores (ABNT/fabricante).
- Uso permitido de conector de campo e emenda mecânica (drop, CTO?).
- Rotina de arc check, troca de eletrodo e manutenção; quem faz.
- EPIs exigidos na fusão em poste/cesto.

### Lições propostas
1. **"Fibra limpa, emenda boa" (12 min).** Objetivo: preparar o cabo, decapar e limpar. P1: por que limpar antes de clivar? P2: qual a pureza do álcool? SVG: corte do cabo (capa → aramida → tubo → fibra 250 µm → casca 125 µm).
2. **"O corte perfeito" (10 min).** Objetivo: clivagem, comprimento e ângulo, descarte. P1: o que acontece com ângulo grande? P2: onde vai o fragmento? SVG: face de clivagem boa x com lábio, lasca ou ângulo.
3. **"Dentro da máquina" (15 min).** Objetivo: alinhamento núcleo x casca, arco, arc check, programa. P1: diferença entre os dois alinhamentos. P2: quando fazer o arc check? SVG: duas fibras no V-groove com eletrodos e câmeras X/Y.
4. **"O número da tela não é a verdade" (10 min).** Objetivo: perda estimada x OTDR; perda de fabricante x critério do contrato. P1: quem valida a emenda? P2: 0,3 dB é limite de quê? SVG: régua 0 → 0,05 → 0,15 → 0,3 dB com rótulos.
5. **"Erros na tela" (12 min).** Objetivo: reconhecer bolha, gorda/fina, sujeira e ângulo, e saber o que fazer. P1: bolha → causa provável? P2: quantas vezes re-arcar? SVG: 4 miniaturas de emendas com defeito.
6. **"Fechando a caixa" (12 min).** Objetivo: tubete, forno, bandeja, mapa, segurança. P1: quando colocar o tubete? P2: raio mínimo G.657.A1? SVG: bandeja com fibras em laço, raio indicado e numeração.

### Exemplos de questões
1. **Quando colocar o tubete?** A) Depois da fusão: errado, a fibra já está emendada e não passa. **B) Antes de decapar e clivar: certa**, o tubete precisa estar na fibra antes da emenda. C) No forno: errado, o forno só contrai. D) Não precisa: errado, a emenda fica frágil e exposta à umidade [1].
2. **A máquina mostrou 0,02 dB. Conclusão correta:** A) Perda real garantida: errado, é estimativa. **B) Estimativa que deve ser confirmada por OTDR: certa** [1][13]. C) Dispensa o mapa: errado. D) Pode pular o teste de tração: errado.
3. **Concentração de álcool recomendada:** A) 46%: errado, tem muita água. B) 70%: errado, deixa resíduo e umidade. **C) ≥ 99%: certa** [5]. D) Qualquer álcool: errado.
4. **Bolha na emenda. O que fazer?** A) Re-arcar várias vezes: errado, no máximo 2 re-arcos e só para pontos ou linhas escuras. **B) Refazer: limpar, clivar e fundir de novo: certa** [1]. C) Aceitar se a estimativa for baixa: errado. D) Trocar o tubete: errado, não resolve.
5. **Fragmento de fibra após a clivagem:** A) Jogar no chão: errado, ele gruda em sapato e tapete. B) Soprar: errado. **C) Recipiente próprio ou fita adesiva: certa** [2]. D) Guardar no bolso: errado.
6. **0,3 dB por emenda é:** A) Valor típico de fusão: errado, o típico é < 0,05 dB. **B) Máximo da TIA-568: certa** [3]. C) Critério de toda distribuidora: errado, isso é contratual. D) Perda do conector de campo: errado, este é ~0,3 típico / 0,5 máx., mas é outra coisa [7].

### Termos para o glossário
| Sigla | Português | Inglês | Definição |
|---|---|---|---|
| — | Fusão | fusion splice | União de fibras por arco elétrico |
| — | Clivagem | cleave | Corte reto da fibra de vidro |
| — | Clivador | cleaver | Ferramenta de clivagem com lâmina giratória |
| — | Decapador | stripper | Remove o revestimento de 250 µm |
| — | Tubete | splice protection sleeve | Protetor termocontrátil da emenda |
| PAS/LID | Alinhamento por núcleo | core alignment | A máquina alinha os núcleos pela imagem ou pela luz |
| — | Alinhamento por casca | cladding alignment | Alinha pela casca de 125 µm (V-groove ativo ou fixo) |
| — | Teste de tração | proof/tensile test | Puxa a emenda (~2 N) para testar a resistência |
| — | Verificação do arco | arc check/calibration | Ajusta a potência do arco ao ambiente e ao desgaste |
| — | Perda estimada | estimated loss | Cálculo pela imagem; não é medição |
| CEO | Caixa de emenda óptica | splice closure | Caixa de emendas no poste |
| CTO | Caixa de terminação óptica | terminal box | Caixa de distribuição para clientes |
| — | Conector de campo | field/fast connector | Conector montado sem fusão |
| — | Emenda mecânica | mechanical splice | União com gel e alinhador mecânico |

### Vídeos em português
Nenhum vídeo PT-BR verificado (título e canal) nesta pesquisa. Termos de busca: "fusão de fibra óptica passo a passo", "clivagem fibra óptica clivador", "limpeza máquina de fusão eletrodo", "acomodação bandeja CEO fibra", "Furukawa conector de campo montagem". Priorizar canais de fabricantes (Furukawa Brasil, Fujikura, Sumitomo) e escolas técnicas.

### Fontes
1. Fusion Splicing — FOA Reference. The Fiber Optic Association. https://www.thefoa.org/tech/ref/termination/fusion.html — acesso 06/11/2026.
2. Fiber Optic Safety. FOA. https://www.thefoa.org/tech/safety.htm — 06/11/2026.
3. EIA/TIA 568 B.3 For Fiber Optics. FOA. https://www.thefoa.org/tech/tia568b3.htm — 06/11/2026 (via busca).
4. Calculating Loss Budgets / FOA Installation Standard 2025. FOA. https://www.thefoa.org/tech/lossbudg.htm ; https://www.thefoa.org/tech/ref/1pstandards/FOA%20Installation%20Standard%202025%20V1.pdf — 06/11/2026 (via busca).
5. Fusion splicer technical tips. Fujikura Europe. https://www.europe.fujikura.com/?p=13521 — 06/11/2026.
6. Fusion Splicer Telecom Catalog (45S, 90R, CT50). Fujikura. https://www.fusionsplicer.fujikura.com/wp-content/uploads/2025/10/Fusionsplicer_telecom_Eng.pdf — 06/11/2026.
7. Datasheet Conector de Campo EZ APC 3 mm (ET03252). Furukawa (cópia em SAMM). https://telecom.samm.com/Data/EditorFiles/Datasheets/13-fiber-optic-accessories/field-connector-ez-connector-apc-for-3mm-round-cable.pdf — 06/11/2026 (via busca).
8. 90R Troubleshooting Guide. AFL. https://cdn.pathfactory.com/assets/preprocessed/11221/39875e23-7faa-405c-8686-542b33a4ad5a/39875e23-7faa-405c-8686-542b33a4ad5a.ab602f8a-a91d-4a23-8eef-9f22f2d43653 — 06/11/2026 (via busca).
9. FITEL S124M Simple Manual. OFS. https://www.ofsoptics.com/fts-b559-01-s124m_simple-manual-v2 — 06/11/2026 (via busca).
10. IP036A AllWave Fiber Splicing Compatibility. OFS. https://www.ofsoptics.com/nrtc/Installation%20Practices/IP036A%20AllWave%20Fiber%20Splicing%20Compatibility.pdf — 06/11/2026 (via busca).
11. G.657 flyer. ITU-T. https://itu.int/dms_pub/itu-t/oth/0b/04/T0B040000542C01PDFE.pdf — 06/11/2026 (via busca).
12. Sumitomo Type-72C+. Hexatronic (revendedor). https://www.hexatronic.com/en-au/products/installation-and-test/fusion-splicers-sumitomo/sumitomo-type-72c-plus-sum-type-72c-plus — 06/11/2026.
13. Reducing Losses in Fusion Splicing (910FS). Tempo. https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Tempo_910FS_Application_Note.pdf — 06/11/2026 (via busca).
14. Fusion Splicing (guia BICSI; secundária) e Fujikura 31S (revendedor). https://open-exam-prep.com/study-guides/bicsi-technician/chapter-3/fusion-splicing ; https://www.fibersavvy.com/products/fujikura-31s-fusion-splicer — 06/11/2026.
15. Clean gel off loose-tube fibers efficiently. Cabling Installation & Maintenance. https://cablinginstall.com/cable/fiber/article/16465511/clean-gel-off-loosetube-fibers-efficiently — 06/11/2026 (via busca).

Observação: manualshive, manuals.online e um PDF da FOA (VHO) foram bloqueados ou ilegíveis; o PDF da Fujikura foi lido com pdftotext.


---

## Bloco 6 — Testes

### Resumo
Teste de aceite de fibra tem duas medições que se completam. A primeira é a **perda de inserção (insertion loss, IL)**, medida com fonte de luz e medidor de potência (power meter) e referência de 1 cordão. Ela dá o número que vai contra o orçamento de perda. A segunda é o **OTDR** (reflectômetro óptico no domínio do tempo), que mostra onde está cada evento e quanto ele perde. O OTDR funciona com o **retroespalhamento Rayleigh** (Rayleigh backscattering), que forma a rampa do traço, e com as **reflexões de Fresnel**, que formam os picos [1]. O traço é feito em 1310 e 1550 nm. A curvatura (macrobend) perde mais em 1550 nm (e mais ainda em 1625 nm) do que em 1310 nm. A fusão perde quase o mesmo nos dois [1][6]. A perda de emenda vale pela **média bidirecional**, porque um sentido só pode mostrar um "ganho aparente" (gainer) [3][9]. Antes de conectar qualquer coisa: **inspecionar, limpar e inspecionar de novo** (IBYC) [6][15]. Os limites de aceite variam entre norma (TIA-568.3-D, FOA) e contrato. Os da distribuidora devem ser **CONFIRMADOS NA EMPRESA**.

### Fatos e valores de referência
Acesso de todas as fontes: 06/11/2026.

| Afirmação | Valor | Fonte | Confiança |
|---|---|---|---|
| Atenuação típica da fibra monomodo | 0,35 dB/km (1310); 0,20 dB/km (1550) | [6] VIAVI | Alta |
| Atenuação máxima TIA-568 para monomodo de planta externa | 0,5 dB/km nas duas λ (interna: 1,0 dB/km) | [4] FOA | Alta |
| Valores de planejamento da FOA | conector 0,3 dB; fusão 0,15 dB; fibra 0,5/0,4 dB/km (1310/1550) | [4] | Alta |
| Fórmula simplificada de orçamento da FOA | (0,5 dB × nº conectores) + (0,2 dB × nº emendas) + (atenuação × comprimento) | [4] | Alta |
| Perda máxima de par de conectores (TIA-568) | 0,75 dB | [4][5] | Alta |
| Perda máxima de emenda (TIA-568) | 0,3 dB | [5] | Média (citação secundária) |
| Exigência típica do setor para fusão | ≤ 0,10 dB de média bidirecional | [9] Corning | Média |
| Fusão (VIAVI) | 0,10 a 0,30 dB, sem reflexão | [6] | Média (faixa conservadora) |
| Emenda mecânica | perda de 0,15 a 0,50 dB; refletância de −40 a −50 dB | [6] | Alta |
| Par de conectores UPC limpo | perda de 0,15 a 0,5 dB; refletância de −50 a −59 dB | [6] | Alta |
| Par de conectores APC limpo | refletância de −65 a −76 dB. APC novo pode ficar abaixo de −77 dB e não aparecer no OTDR | [6] | Alta |
| Fim de fibra, conector UPC aberto | −14 a −20 dB (Fresnel vidro/ar ≈ 4% ≈ −14 dB) | [6] | Alta |
| Fim de fibra, conector APC aberto | −35 a −45 dB | [6] | Média (outra fonte diz até −65 dB) |
| Quebra ou corte | −30 a −48 dB | [6] | Média |
| Curvatura em 1550 nm comparada a 1310 nm | normalmente 5 a 10 vezes pior; pode passar de 6 dB e parecer fim de fibra | [6] | Alta |
| Comprimentos de onda para analisar curvatura | melhor comparar 1310 com 1625 ou 1550 com 1625 | [7] VIAVI | Média |
| Perda dos divisores (splitters) | 1×8: 9–11 dB; 1×16: 12–14 dB; 1×32: 15–17 dB; 1×64: 18–20 dB | [6] | Alta |
| A reflexão de Fresnel em relação ao retroespalhamento | pode ser milhares de vezes maior | [1] EXFO | Alta |
| Zona morta de evento (EDZ) | menor distância depois de uma reflexão em que se detecta outro evento; medida a −1,5 dB de cada lado do pico | [1] | Alta |
| Zona morta de atenuação (ADZ) | distância até o traço voltar a 0,5 dB do retroespalhamento | [1] | Alta |
| Valores típicos de zona morta (pulso mínimo, reflexão de −45 dB) | EDZ de 0,5 a 1 m; ADZ de 2,5 a 5 m | [1][2] | Média (varia com o modelo) |
| Range dinâmico | escolher um OTDR com 5 a 8 dB acima da perda máxima do enlace | [1] | Alta |
| Resolução de amostragem | de 4 cm a alguns metros, conforme o pulso e o alcance | [1] | Alta |
| IOR do G.652 (Corning SMF-28 Ultra) | 1,4676 (1310); 1,4682 (1550) | [10] | Alta (depende do fabricante) |
| Erro causado por IOR errado | usar 1,4800 no lugar de 1,4682 encurta a distância em cerca de 0,8% (≈ 80 m em 10 km) | cálculo com [10] | Alta |
| Fibra a mais dentro do cabo | cerca de 1%: o OTDR mede a fibra, não o cabo | [3] FOA | Média |
| Cabo de lançamento por pulso (VIAVI) | 10–20 m (3–30 ns); 100–200 m (100–300 ns); 1–2 km (3–100 µs) | [8] (resumo de busca) | Média |
| Cabo de lançamento padrão Fluke (monomodo) | 160 m | [8] | Média |
| Cabo de lançamento (outras fontes) | 500 m para pulsos de 5–300 ns; 1.000 m para 1–2 µs | [8] (nota de terceiro) | Baixa |
| Fantasma (ghost) | aparece em múltiplos do comprimento do cabo de lançamento ou do primeiro trecho | [3] | Alta |
| Uso do OTDR | mais útil em cabos acima de cerca de 250 m | [3] | Média |
| Medidor PON seletivo | filtra 1490 nm (GPON) e 1577 nm (XGS-PON) e mede cada um em separado; um medidor comum soma as duas | [11] FOA | Alta |
| Medidor PON passante (through mode) | 1490/1550/1577 nm descendo; 1270/1310 nm subindo em rajada (burst) | [12] VIAVI OLP-87 | Média |
| VFL | 650 nm ±10, até cerca de 5 km, Classe 2, 1 mW (FLS-230A); há modelos 2M e de 5 a 30 mW | [13] | Média (varia com o modelo) |
| Referência de 1 cordão para monomodo | TIA-526-7 Método A.1; mede os conectores das duas pontas | [14] Fluke | Alta |
| Cordão de referência | perda < 0,2 dB | [4][14] | Alta |
| Zonas da face do conector monomodo (IEC 61300-3-35, 2ª ed., conforme Glenair) | A 0–25 µm; B 25–120 µm; C 120–135 µm; D 135–250 µm | [16] | Média (2022: borda de B = 110 µm) |
| Zona A (núcleo) em monomodo | 2015: nenhum risco e nenhum defeito. 2022: critério um pouco menos rígido (os números exatos estão só na norma paga) | [15] | Média. CONFIRMAR NA EMPRESA |
| Zona B em monomodo (tabela Glenair) | riscos ≤ 3 µm sem limite de quantidade; até 2 defeitos ≤ 5 µm | [16] | Baixa (tabela do fabricante, não a norma) |
| Edição 2022 da IEC 61300-3-35 | aprova ou reprova só pelas zonas A e B; a área de contato toda ainda é inspecionada e limpa | [15] | Média |
| Formato SOR | Telcordia SR-4731 (antigo formato Bellcore), binário; versões 1.x e 2.x | [17] | Alta |

### Forma de cada evento no traço OTDR (base para o simulador)
Eixos: Y em dB (5 dB por divisão) e X em km. A rampa de fundo cai 0,35 dB/km em 1310 e 0,20 dB/km em 1550 [6]. O pico tem altura visual de 2 a 15 dB acima da rampa: quanto maior a refletância, mais alto o pico. A largura do pico segue a do pulso (≈ ADZ). Valores de [1][3][6].

| Evento | Forma | Perda típica | Refletância típica | λ que muda | Como diferenciar |
|---|---|---|---|---|---|
| Início (conector do OTDR e cabo de lançamento) | pico alto e saturado, de topo plano, seguido da zona morta e da rampa | — | −45 a −55 dB | — | sempre em 0 m. Por isso se usa o cabo de lançamento |
| Conector UPC | pico e depois degrau para baixo | 0,15–0,5 dB | −50 a −59 dB | pouca | o pico mostra a reflexão. A posição bate com o DGO/caixa |
| Conector APC | degrau com pico pequeno ou sem pico | 0,15–0,5 dB | −65 a −76 dB | pouca | o software pode chamar de "emenda (possível APC)" |
| Emenda mecânica | pico pequeno e degrau | 0,15–0,5 dB | −40 a −50 dB | pouca | pico menor que o do UPC aberto. Fica em caixa de emenda |
| Fusão | degrau para baixo, sem pico | 0,02–0,1 dB (contrato); até 0,3 | nenhuma | quase igual em 1310 e 1550 | o degrau é igual nas duas λ |
| Macrocurvatura | degrau para baixo, sem pico | variável, de 0,1 a mais de 6 dB | nenhuma | 1550 entre 5 e 10 vezes pior que 1310; 1625 pior ainda | diferença acima de cerca de 0,2 dB entre λ indica curvatura [7] |
| Ganho aparente (gainer) | degrau para CIMA | −0,05 a −0,3 dB aparente | nenhuma | pode mudar | no sentido inverso vira "perdedor". A média dá a perda real (ex.: −0,25 e +0,45 → 0,10 dB) [9] |
| Fim de fibra limpo (UPC aberto) | pico alto e depois queda para o ruído | — | −14 a −20 dB | — | depois dele só há ruído. A distância bate com o projeto |
| Quebra | pico menor (ou nenhum) e queda para o ruído | queda total | −30 a −48 dB, ou nada se a quebra for irregular | — | fica antes do comprimento esperado. Confirmar com o VFL se for perto |
| Fantasma (ghost) | pico sem degrau depois, muitas vezes já no ruído depois do fim | 0 dB | parece reflexivo | muda junto com o evento real | está a 2× (ou n×) a distância de uma reflexão forte. Some ao limpar o conector ou trocar o cabo de lançamento [3] |
| Divisor (splitter) 1×N | degrau grande, sem pico | 1×8 ≈ 10 dB; 1×32 ≈ 16 dB | baixa | pouca | depois do degrau, a rampa fica mais ruidosa |

Para o simulador, os níveis de dificuldade são:
- **Fácil:** eventos isolados e uma λ.
- **Médio:** duas λ, curvatura contra fusão.
- **Difícil:** gainer com o traço do sentido inverso, ghost, dois eventos dentro da zona morta, IOR errado.

### Critérios de aceite (norma x contrato)
| Item | Norma ou referência | Prática comum em contrato | Fonte |
|---|---|---|---|
| Fusão | TIA: ≤ 0,3 dB máx. FOA (planejamento): 0,15 dB | ≤ 0,10 dB de média bidirecional; às vezes ≤ 0,15 dB em evento isolado | [4][5][9] |
| Par de conectores | TIA: ≤ 0,75 dB. FOA: 0,3 dB típico | ≤ 0,5 dB | [4][5][6] |
| Atenuação (planta externa) | TIA: ≤ 0,5 dB/km. Fibra pura: ≤ 0,34/0,20 dB/km (ficha do cabo) | ficha do fabricante + margem | [4][18] |
| Refletância do conector | ≤ −40 dB UPC; ≤ −55 dB APC (texto de terceiro citando a TIA-568.3-D) | igual ou mais rigoroso | [19] |
| Orçamento de IL | soma de fibra, conectores e emendas (TIA/FOA) | IL medida ≤ orçamento; a margem do sistema é separada | [4][5] |
| Inspeção da face | IEC 61300-3-35 aprovada antes do teste | foto da face no relatório | [15] |

Fórmula do orçamento de IL (TIA/FOA): **IL_máx = (α × L) + (n_conectores × perda_conector) + (n_emendas × perda_emenda)** [4][5].
Exemplo em 1310 nm, com 12 km, 2 pares de conectores e 6 fusões, usando os valores TIA: 12×0,5 + 2×0,75 + 6×0,3 = **9,3 dB**. O contrato pode usar outros valores. **CONFIRMAR NA EMPRESA.**

### Modelo de relatório de aceite (itens)
1. Identificação: obra, contrato, fornecedor, enlace (ponta A e ponta B), cabo (tipo, nº de fibras, G.652/G.657, fabricante), fibra ou tubo pela cor.
2. Data, técnico e fiscal da distribuidora.
3. Equipamentos: modelo, nº de série e **certificado de calibração válido** do OTDR, do power meter e da fonte.
4. Parâmetros do OTDR: λ (1310/1550, e 1625 se exigido), pulso, alcance, tempo de média, **IOR usado**, limiares de análise.
5. Cabos de lançamento e de recepção: comprimento e tipo de conector.
6. Traços **bidirecionais** (arquivos .SOR) com tabela de eventos: distância, perda, refletância, perda média bidirecional.
7. Perda total do enlace, **ORL**, atenuação em dB/km.
8. IL medida com o power meter: método de referência (1 cordão) e valor de referência.
9. Comparação com o orçamento, com APROVADO ou REPROVADO por fibra.
10. Fotos da inspeção da face dos conectores (IEC 61300-3-35).
11. Mapa de fusão, as built (posição das caixas e reservas técnicas), fotos das caixas e DGOs.
12. Pendências e assinaturas.

### Divergências entre fontes
- **Nome das normas.** A TIA-526-14 (OFSTP-14) é para **multimodo**. A de monomodo é a **TIA-526-7 (OFSTP-7)**. Na IEC, a 61280-4-1 é para multimodo e a 61280-4-2 para monomodo [3b][14][20].
- **Letras A, B e C.** Na IEC 61280-4-2, os Anexos A, B e C são 1 cordão, **3 cordões** e **2 cordões** [20]. A Fluke chama o de 1 cordão de "Método A.1" (TIA-526-7) [14]. Como as letras mudam entre normas e edições, use os **nomes** (1, 2 ou 3 cordões).
- **Fusão.** A VIAVI dá 0,10–0,30 dB [6]. A FOA dá 0,15 dB [4]. A Corning dá ≤ 0,10 dB [9].
- **Fórmula da FOA.** Na mesma página usa 0,5 e 0,2 dB, mas os valores típicos são 0,3 e 0,15 dB [4].
- **APC aberto.** A VIAVI dá −35 a −45 dB. A Tempo diz que pode chegar a −65 dB [6][19b].
- **IEC 61300-3-35.** A borda da zona B foi de 115/120 µm para 110 µm na edição 2022 [15]. As zonas C e D deixaram de aprovar ou reprovar. Há fontes que contradizem isso.
- **Cabo de lançamento.** Os valores variam de 25 m (EXFO, pulso ≤ 100 ns) até 1–2 km (VIAVI, pulso longo) [8].

### Confirmar na empresa
- Limites contratuais de perda (fusão, conector, dB/km) e de refletância e ORL. **CONFIRMAR NA EMPRESA**
- Qual norma o caderno técnico de aceite da distribuidora segue (TIA, IEC, ABNT, especificação própria).
- λ exigidas (1625 nm?), pulsos e comprimento dos cabos de lançamento e recepção.
- IOR da ficha do cabo comprado (OPGW, ADSS).
- Tipo de conector: UPC ou APC.
- Formato de entrega: .SOR, PDF, software de relatório.
- Validade da calibração exigida.
- Se a rede tem PON e quais λ.
- Regras de segurança a laser (Classe do VFL e do OTDR) e de EPI.

### Lições propostas
1. **Power meter e perda de inserção** (12 min). Objetivo: medir IL com referência de 1 cordão. P1: por que zerar com 1 cordão? P2: calcular um orçamento. SVG: fonte → cordão → enlace → medidor, com 0 dB marcado.
2. **Como o OTDR "enxerga"** (10 min). Objetivo: Rayleigh e Fresnel; inclinação em dB/km. P1: o que forma a rampa? P2: calcular a atenuação a partir de 2 pontos. SVG: traço com rampa e um pico.
3. **Eventos no traço** (15 min). Objetivo: reconhecer as 6 formas. P1/P2: classificar traços. SVG: traço completo com conector, fusão, curvatura e fim.
4. **Duas λ e dois sentidos** (12 min). Objetivo: curvatura contra fusão; gainer e média. P1: degrau maior em 1550, o que é? P2: −0,2 e +0,4 → perda real. SVG: traços A→B e B→A sobrepostos.
5. **Configurar o OTDR** (12 min). Objetivo: pulso, zona morta, IOR, média, cabos de lançamento e recepção. P1: dois eventos a 1 m com pulso longo? P2: erro por IOR errado. SVG: pulso curto e longo lado a lado.
6. **Inspecionar e limpar** (10 min). Objetivo: zonas A a D, IBYC, limpeza a seco e úmida-seca. P1: defeito na zona A em monomodo? P2: ordem dos passos. SVG: círculos concêntricos das zonas.
7. **Ler um relatório de aceite** (15 min). Objetivo: conferir itens e aprovar ou reprovar. P1: falta o IOR, o que fazer? P2: a fusão deu 0,14 dB na média, aprova? SVG: tabela de eventos com destaque.

### Exemplos de questões
**1. Um degrau de 0,4 dB em 1310 nm vira 2,5 dB em 1550 nm, sem pico. O que é?**
a) Fusão: errada, porque a perda de fusão quase não muda com a λ.
b) **Macrocurvatura (certa)**: o campo modal maior em 1550 nm deixa a fibra mais sensível à curvatura [6][7].
c) Conector: errada, porque teria pico de reflexão.
d) Ghost: errada, porque ghost não tem perda.

**2. Uma emenda mostra −0,15 dB no sentido A→B e +0,35 dB no sentido B→A. Qual é a perda real?**
a) −0,15 dB: errada, é o gainer de um sentido só.
b) 0,35 dB: errada, é o valor exagerado de um sentido.
c) **0,10 dB (certa)**: (−0,15 + 0,35)/2 [9].
d) 0,50 dB: errada, a conta é média, não soma.

**3. Por que usar cabo de lançamento?**
a) Para aumentar o range dinâmico: errada.
b) **Para tirar o 1º conector do enlace da zona morta e poder medi-lo (certa)** [3].
c) Para corrigir o IOR: errada.
d) Para filtrar 1490 nm: errada, isso é do medidor PON.

**4. Aparece um pico sem perda a 2× a distância do 1º conector, depois do fim da fibra. O que é?**
a) Quebra: errada, a fibra já terminou antes.
b) **Ghost (certa)**: um eco de reflexão forte em múltiplos da distância [3].
c) Gainer: errada, gainer é degrau para cima.
d) Fusão: errada, fusão não tem pico.

**5. Inspeção conforme a IEC 61300-3-35 num conector monomodo encontra uma partícula na zona A. O que fazer?**
a) Conectar mesmo assim: errada.
b) **Limpar (a seco, depois úmida-seca se precisar) e inspecionar de novo (certa)** [15].
c) Medir no OTDR para ver se perde: errada, isso arrisca contaminar ou danificar a outra face.
d) Reprovar o cabo: errada, primeiro é preciso limpar.

**6. O OTDR estava com IOR 1,4800, mas a fibra tem 1,4682. O que acontece com uma quebra real a 10 km?**
a) Aparece a 10,08 km: errada, o sentido do erro está invertido.
b) **Aparece a cerca de 9,92 km (certa)**: distância = c·t/(2n), então n maior dá distância menor.
c) Não muda: errada.
d) Aparece em dB errado: errada, o IOR afeta a distância.

### Termos para o glossário
| Sigla | Português | Inglês | Definição |
|---|---|---|---|
| OTDR | reflectômetro óptico no domínio do tempo | optical time-domain reflectometer | instrumento que mostra perda × distância a partir da luz que volta pela fibra |
| IL | perda de inserção | insertion loss | perda total do enlace medida com fonte e medidor |
| OPM | medidor de potência óptica | optical power meter | mede potência em dBm |
| ORL | perda de retorno óptica | optical return loss | total de luz refletida, em dB positivo. Quanto maior, melhor |
| — | refletância | reflectance | reflexão de um evento, em dB negativo |
| EDZ/ADZ | zona morta de evento / de atenuação | event / attenuation dead zone | distância "cega" depois de uma reflexão |
| IOR | índice de refração de grupo | group index | converte tempo em distância |
| — | ganho aparente | gainer | degrau para cima causado por diferença de retroespalhamento |
| — | fantasma, eco | ghost | pico falso em múltiplos da distância |
| VFL | localizador visual de falhas | visual fault locator | laser vermelho de 650 nm |
| IBYC | inspecione antes de conectar | Inspect Before You Connect | prática de inspeção da face |
| UPC/APC | polimento ultra / angular | ultra / angled physical contact | tipos de face do conector |
| SOR | registro OTDR padrão | Standard OTDR Record | arquivo binário de traço (SR-4731) |
| PON | rede óptica passiva | passive optical network | rede ponto-multiponto com splitters |

### Vídeos em português
Não encontrei nenhum vídeo em PT-BR com título e canal que eu conseguisse conferir. Termos de busca no YouTube: "como ler traço OTDR", "OTDR bidirecional emenda gainer", "zona morta OTDR bobina de lançamento", "inspeção e limpeza conector óptico IEC 61300-3-35", "power meter perda de inserção referência um cordão". Prefira canais de fabricantes (EXFO Brasil, VIAVI, Fluke) ou de escolas técnicas.
Leitura gratuita em PT: guia de referência de OTDR da EXFO [21] e a apostila "Decifrando o OTDR" [22] (material de curso, que serve só como apoio).

### Fontes
Acesso de todas: 06/11/2026.
1. OTDR Fundamentals, AN 194, EXFO. https://www.exfo.com/contentassets/7e4d240b6717415283238de7dcec35ba/exfo_anote194_otdr-fundamentals_en.pdf
2. Fichas do FTBx-750C e do FTB-7500E, EXFO. https://exfo.com/en/products/field-network-testing/otdr-iolm/FTBx-750C
3. OTDR, FOA. https://www.thefoa.org/tech/ref/testing/OTDR/OTDR.html. [3b] Insertion loss testing (OFSTP-14), FOA. https://www.thefoa.org/tech/ref/testing/test/OFSTP-14.html
4. Loss Budget Estimates, FOA. https://www.thefoa.org/tech/loss-est.htm
5. New Loss Budget Values… ANSI/TIA-568.3-D, Fluke Networks. https://flukenetworks.com/content/new-loss-budget-values-reference-grade-connectors-ansitia-5683-d. Também: Kingfisher, IL TIA-568.3-D SMF. https://us.kingfisherfiber.com/media/s20pjiyx/il-tia-568-3-d-one-cord-smf-draft-2.pdf
6. OTDR Testing Tech Tip, VIAVI (2023). https://www.viavisolutions.com/en-uk/literature/otdr-testing-tips-and-tricks-quick-references-en.pdf
7. Macrobend detection using OTDR, VIAVI. https://www.viavisolutions.com/en-us/literature/macrobend-detection-using-otdr-white-paper-en.pdf
8. Guide to launch fibers, AN 298, EXFO. https://exfo.com/contentassets/25d0082a2b89474d887b20fe84a22a6d/exfo_anote298_guide-to-using-and-selecting-the-right-launch-fibers-for-otdr-test-sets_en.pdf. Recommended launch cable, Fluke. https://es.flukenetworks.com/knowledge-base/fiber-quickmap/recommended-launch-cable-fiber-quickmap. VIAVI "OTDR recommended launch cable sizes" (página com 404 na consulta; valores vêm do resumo da busca).
9. AN3060, Corning. https://www.corning.com/media/worldwide/coc/documents/Fiber/application-notes/AN3060.pdf. Understanding and mitigating OTDR gainers. https://trsrentelco.com/sites/default/files/resources-pdfs/Understanding_and_mitigating_OTDR_gainers.pdf
10. SMF-28 Ultra PI-1424, Corning. https://csmedia.corning.com/media/worldwide/coc/documents/Fiber/product-information-sheets/PI-1424-AEN.pdf
11. OPM and PON meters, FOA (2025). https://www.foa.org/tech/ref/install/OPM%20and%20PON%20meters.pdf
12. OLP-87, VIAVI (revendedor). https://tmgtestequipment.com.au/product/viavi-olp-87-selective-xgs-pon-meter/
13. FLS-230A, EXFO. https://exfo.com/es/recursos/documentacion-tecnica/discontinued-spec-sheets/fls-230a
14. SC/APC fiber testing (1 jumper), Fluke. https://de.flukenetworks.com/knowledge-base/simplifiber-pro/scapc-scapc-fiber-testing-simplifiber-pro
15. Easier Fiber End Face Inspections (IEC 61300-3-35:2022), Fluke. https://www.flukenetworks.com/blog/cabling-chronicles/easier-fiber-end-face-inspection. Resumo da IEC: https://webstore.iec.ch/publication/64254
16. Optical End Face Inspection Guidelines, Glenair. https://www.glenair.com/fiber-optics/pdf/optical-end-face-inspection-guidelines.pdf
17. Optical time-domain reflectometer (SR-4731), Wikipedia/Telcordia. https://en.wikipedia.org/wiki/Optical_time-domain_reflectometer
18. OPGW technical description (G.652 ≤ 0,34/0,20 dB/km). https://gis.viljandivald.ee/geo_ehitus/%C3%9CLD/12736G/II%20etapp%20Oiu-Viljandi%20CD/Teostusjoonised/8%20Optika/OPGW%20tehniline%20kirjeldus.pdf
19. Fiber (TIA) Field Test Specification, Connectix. https://connectixcablingsystems.com/themes/connectix_2024/pdf/Fiber%20(TIA)%20Field%20Test%20Specification.pdf. [19b] Tempo 930XC App Note. https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Tempo_930XC_OTDR_Application_Note.pdf
20. Prévia da IEC 61280-4-2 ed. 3.0, VDE. https://vde-verlag.de/iec-normen/preview-pdf/info_iec61280-4-2{ed3.0}b.pdf
21. Guia de referência OTDR, EXFO. https://exfo.com/es/recursos/documentacion-tecnica/reference-guides/otdr/?lang=pt
22. Decifrando o OTDR, ELO/Fiberschool. https://geo.elo.net.br/cursos/Fiberschool/

Observação: não verifiquei o conteúdo da ITU-T L.300/L.310. Não citei como fonte.


---

## Bloco 7 — Postes e compartilhamento

> Pesquisa feita em 06/11/2026. Os valores técnicos abaixo são **EXEMPLOS** de outras distribuidoras e da ABNT. **CONFIRMAR NA EMPRESA — quem manda é a norma da distribuidora local.**

### Resumo

- **Regras em vigor hoje (06/11/2026):** Resolução Conjunta ANEEL/Anatel/ANP nº 1/1999 (regulamento conjunto), Resolução Conjunta nº 2/2001 (conflitos), Resolução Conjunta ANEEL/Anatel nº 4/2014 (postes, preço de referência de **R$ 3,19** por ponto de fixação, 1 ponto por prestadora por poste) e **REN ANEEL 1.044/2022**. A REN 1.044 **revogou a REN 797/2017** (e a REN 375/2009) e vale desde 01/11/2022 [1][2][3][4].
- **Novo regulamento: ainda não está em vigor.** A ANEEL aprovou um texto em 02/12/2025, mas ele depende de aprovação conjunta com a Anatel. Em 22/05/2026, a AGU decidiu, em parecer vinculante, que a cessão da exploração comercial dos postes a um "posteiro" (explorador de infraestrutura) é **obrigatória** (Decreto 12.068/2024, art. 16). Por isso a ANEEL precisa refazer o texto. Em 27–28/10/2026 as duas agências fizeram uma reunião de alinhamento e o novo texto, relatado pelo diretor Gentil Nogueira, voltava à diretoria da ANEEL. Até hoje não há aprovação conjunta [5][6][7][8].
- **No Congresso:** em 04/11/2026 a Câmara aprovou o substitutivo do PL 3.220/2019, que **volta ao Senado**. Ainda não é lei [9][10].
- **Técnica:** ABNT NBR 15214 (1ª ed. 2005, nova edição em **05/2024**, cujo conteúdo não é público). Os exemplos usados aqui são a Cemig ND-6.6 (vigente desde 13/12/2024) e a Energisa NDU-009 (texto público só da v4.0/2017; a versão em vigor seria a 8.0, que não consegui ler).
- **distribuidora de Roraima:** tem norma própria publicada, a "Norma Técnica de Compartilhamento de Infraestrutura" **DT-DTE-01/NT-002** (arquivo de 12/2020). A página da empresa citaria uma "Norma Técnica 06/2024". O site bloqueou o acesso, então não li nenhuma das duas.

### Regulação: o que vale hoje

| Norma | O que diz | Status em 06/11/2026 | Fonte | Acesso |
|---|---|---|---|---|
| Res. Conjunta ANEEL/Anatel/ANP nº 1, de 24/11/1999 (DOU 25/11/1999) | Regulamento conjunto de compartilhamento entre energia, telecom e petróleo. Art. 11 §1º: o detentor responde ao pedido em **até 90 dias**. Art. 20: cláusulas mínimas do contrato (preço, multas, prazos, proibição de sublocação etc.) | Vigente | [1] | 06/11/2026 |
| Res. Conjunta nº 2, de 27/03/2001 | Regulamento de resolução de conflitos, que cria a **Comissão de Resolução de Conflitos** (extinta pelo Dec. 9.759/2019 e recriada pela Res. Conjunta nº 3/2020, informação de fonte secundária) | Vigente (citada no art. 5º da REN 1.044) | [3][11] | 06/11/2026 |
| Res. Conjunta ANEEL/Anatel nº 4, de 16/12/2014 (DOU 30/12/2014) | Art. 1º: **preço de referência de R$ 3,19 por ponto de fixação**, usado pela Comissão em conflitos. Não é teto nem tarifa e não tem reajuste previsto. Art. 2º: **1 ponto por prestadora (ou grupo) por poste**. Art. 4º: regularização a cargo da prestadora, até 2.100 postes por distribuidora por ano; risco de acidente exige regularização **imediata**, sem precisar notificar; proíbe ocupar "à revelia". Art. 5º: notificação em até 30 dias e adequação em até 150 dias. Art. 8º: pontos de fixação **identificados** | Vigente. O texto aprovado pela ANEEL em 12/2025 a revogaria, mas esse texto ainda não vale | [2][7] | 06/11/2026 |
| REN ANEEL 797/2017 | Procedimentos de compartilhamento | **Revogada** pela REN 1.044/2022 | [4] | 06/11/2026 |
| **REN ANEEL 1.044, de 27/09/2022** (vigor 01/11/2022) | Arts. 2º–4º: define e proíbe a ocupação **à revelia** (sem projeto aprovado) e define a **clandestina** (sem contrato). Art. 7º: poste é cobrado **por ponto de fixação**. Art. 8º: o pedido exige projeto com esforços mecânicos e **traçado georreferenciado**. Art. 12: o detentor **notifica** e pode pedir o traçado georreferenciado ou fotos. Art. 13: em outros casos, retirada com autorização da Comissão. Art. 14: retirada **sem** autorização em caso de clandestina, emergência ou risco. Art. 15: ressarcimento. Art. 17: identificação permanente. Art. 19: Plano de Ocupação aprovado em norma técnica e publicado no site | **Vigente** | [3] | 06/11/2026 |
| Decreto 12.068/2024, art. 16 | Distribuidoras "deverão ceder" a exploração comercial dos postes a terceiro. A AGU confirmou que isso é obrigatório | Vigente, mas falta a regulamentação conjunta | [6] | 06/11/2026 |
| "Res. Conjunta nº 1/2018" | Não encontrei nenhuma resolução conjunta de 2018 sobre postes. Provável confusão de número | **Não confirmada** | — | 06/11/2026 |

### Novo regulamento: status e o que muda

**Linha do tempo (fontes: Teletime, TeleSíntese, Cenário Energia, Câmara)**
- **24/10/2023:** a Anatel aprova a sua versão do regulamento (CP 17/2022), com posteiro obrigatório e sem rede própria [12].
- **02/12/2025:** a ANEEL aprova uma versão diferente. Nela, a cessão ao "explorador de infraestrutura" é **facultativa**, mas pode ser imposta por mau desempenho. O explorador pode ser do grupo da distribuidora, mas não de grupo com outorga de telecom. O texto cria o **Plano de Regularização de Postes Prioritários (PRPP)**, anual, de 2–3% do parque por ciclo, com custos pagos pelas teles. A remoção de cabos "mortos" fica com o explorador. O preço passa a ser orientado a custo e seria definido na 2ª fase da CP 73/2021. O texto revoga a Res. 4/2014 [7].
- **22/05/2026:** a AGU (Parecer CONUNI nº 4/2026, vinculante) decide que a **cessão é obrigatória** e que a regulação conjunta trata só de preço, faixa e áreas [6].
- **26/08/2026:** uma nota técnica da ANEEL propõe uma **segunda resolução conjunta** para o chamamento público do posteiro, e só depois a CP de preços [8].
- **27–28/10/2026:** as diretorias de ANEEL e Anatel fazem uma reunião de alinhamento. O texto do diretor Gentil Nogueira está em análise na ANEEL e "não há confirmação de aprovação definitiva". O ponto em disputa é a participação de empresas do grupo da distribuidora no posteiro [5].
- **04/11/2026:** a Câmara aprova o PL 3.220/2019, que **volta ao Senado** [9][10]. Pontos do texto, segundo IPNews: a distribuidora continua titular; a ANEEL **transfere** a exploração comercial se houver falha de gestão ou se o grupo tiver tele; a ANEEL tem 30 meses para fixar o teto de preço com a Anatel, e o teto rural é metade do urbano; quem pedir regularização em **180 dias** fica livre de multa; a regularização completa leva 5 anos (+5); instalações que oferecem risco podem ser **retiradas imediatamente** [10].

**O que vale hoje:** as Res. Conjuntas 1/1999, 2/2001 e 4/2014, a REN 1.044/2022, o contrato de cada provedor e a norma da distribuidora. **Em discussão:** o posteiro, o PRPP, o novo preço e a revogação da 4/2014.

### Valores técnicos de exemplo

Valores padrão sugeridos para o exercício. **Todos editáveis. CONFIRMAR NA EMPRESA.**

| Item | EXEMPLO — Cemig ND-6.6 (12/2024) | EXEMPLO — Energisa NDU-009 v4.0 (12/2017) | NBR 15214:2005 (edição 2024 não pública) | **Padrão sugerido no app** |
|---|---|---|---|---|
| Faixa de ocupação | **500 mm**, com topo a **5.700 mm** do solo e 600 mm (mín.) abaixo da BT (Fig. 2, p. 51) | **500 mm**; topo da rede telecom **≤ 5,70 m** do solo (itens 10.1.1–10.1.4) | **500 mm** (item 5.1); pode mudar conforme o padrão da detentora | Faixa de **5,20 a 5,70 m** |
| Pontos por poste | Urbano **9** pontos, rural **5**. O 1º ponto de cima é reserva técnica da Cemig. Limite de 1 ponto por ocupante (5.9–5.10) | **4** pontos (+1 excedente com BT multiplex = 5) (10.1.2). Busca indica **6** na v6.0/2022, não verificado | Conforme a detentora | **Urbano 9 / rural 5** (Cemig ND-6.6, 5.9–5.10; editável). Separar urbano (9) e rural (5), como na Cemig; Energisa v4.0: 4 (+1) |
| Espaço entre pontos | ~**100 mm** (Fig. 11, p. 61) | Não extraído | — | **100 mm** |
| Telecom ↔ BT (≤1 kV) | **600 mm** (Tab. 1, seção 7) | **600 mm** (Tab. 01/02, 8.2–8.3). Anexo VII cita **700 mm** | **600 mm** (Tab. 1, 8.2) | **0,60 m** |
| Telecom ↔ MT 15 kV | **1.500 mm**; 15–36,2 kV: 1.800 | 15 kV: 1.500; 24,2 kV: 1.600; 36,2 kV: 1.800; neutro: 1.400 | 1.500 / 1.800 | **1,50 m** |
| Altura ao solo, rua/avenida | **5,0 m** (Tab. 2, telecom) | **5,5 m** (Tab. 03, coluna U ≤1 kV, sem coluna separada para telecom) | **5,00 m** (8.1) | **5,0 m** |
| Entrada de veículos | 4,5 m | 4,5 m | 4,50 m | **4,5 m** |
| Via só de pedestres (urbana) | 3,0 m | 3,5 m | 3,0 m | **3,0 m** |
| Rodovia federal | 7,0 m | 7,0 m | Órgão competente | 7,0 m |
| Plaqueta | **90×40 mm**, ≥3 mm, fundo amarelo, não metálica, resistente a UV; a **200–400 mm** do poste; em **todos** os postes e vãos. **Desde 01/2026: modelo com QR Code e CNPJ** (Seção 6, Fig. 4.1/4.2) | 90×40×3 mm, fundo amarelo; a **300 mm** (10.1.27) ou **300–400 mm** (Anexo VIII) | 90×40 mm; **200–400 mm** (5.2, Fig. A.4) | Plaqueta obrigatória a **0,2–0,4 m** do poste |
| Reserva técnica e caixa de emenda (CEO) | **Proibidas no poste**. No vão, presas na cordoalha com "raquetes", a **≥1.500 mm** do poste, ou em caixa subterrânea (6.30) | Caixa: **proibida no poste**, no vão. Reserva: no vão a **≥2.000 mm** (15.1.1 j/k) | "Preferencialmente" no vão a **≥2.000 mm** (6.6) | **Nunca no poste**; ≥ **1,5 m** (editável para 2,0) |
| Outros equipamentos no vão | ≥ **600 mm** do poste (6.31) | ≥ 600 mm (15.1.1 i) | ≥ 600 mm (6.7) | 0,6 m |
| Equipamento no poste (armário, fonte, CTO) | Só com projeto aprovado; entre **200 e 1.800 mm abaixo** da faixa; no máximo 600×600×450 mm; proibido em esquina, em poste com equipamento da Cemig (6.23–6.32) ou em poste com transformador (6.33) | Caixas terminais e fontes podem ir no poste, com as mesmas cotas; proibido em poste com trafo, religador ou chave (15.1.1 b) | 200–1.800 mm abaixo da faixa; 600×600×450 | Faixa de equipamento de **0,2–1,8 m abaixo** da faixa; proibido em poste com trafo |
| Drops | Derivação **só a partir do ponto de fixação no poste**; **proibida no meio do vão**; ≤ **8 drops por vão por ocupante**; ≤ 90 m da caixa (5.13, 6.8, 6.10) | Contrato Energisa MS: ≤ **10** por ponto ou vão; ≤ 10 vãos até o assinante (cl. 4ª §9º) | ≤ **10** por vão por ocupante (5.10) | Drop no meio do vão = **irregular**; máx. **8** (editável) |
| Diâmetro do feixe por ponto | ≤ **50 mm** (6.7) | — | ≤ **65 mm** (5.9) | 50 mm |
| Lado do poste | Mesmo lado da BT (6.1). Proibido braço para "estender" (6.2) | Mesmo lado da BT (10.1.2) | Mesmo lado (5.3); disposição horizontal **vedada** (5.4) | — |
| Cabo ocioso | Retirar com projeto de exclusão de pontos (14.11) | Retirada pode ser pedida a qualquer momento (16.1.13) | — | Ocioso = irregular |

Fontes da tabela: Cemig [14], Energisa v4.0 anexada ao contrato UFGD [15], NBR 15214:2005 [16]. As páginas e itens estão entre parênteses.

### Fiscalização e cobrança

- **Antes de ocupar:** o provedor apresenta um pedido com projeto, esforços mecânicos e **traçado georreferenciado** (REN 1.044, art. 8º). O detentor responde em até 90 dias (Res. 1/1999, art. 11). É proibido instalar antes da aprovação (REN 1.044, art. 4º; Cemig 14.5). A distribuidora de Roraima pede formulário, KMZ com planilha dos postes, planta, memorial, ART e cronograma, com protocolo no "PROGER" (informação de resumo de busca; CONFIRMAR).
- **Vistoria e cadastro:** o detentor zela pela conformidade (REN 1.044, art. 6º §1º), pode pedir traçado georreferenciado ou fotos (art. 12 §2º) e tem o direito contratual de fiscalizar as obras (art. 18 II). Em 2026 a Anatel coletou dados de contratos dos provedores SCM (prazo 01/03/2026) [17].
- **Notificação:** deve indicar a localização do poste e a não conformidade (Res. 4/2014, art. 4º §4º). Prazos: no contrato, ou 30 + 150 dias para adequação (art. 5º). O contrato Energisa MS dá **24 h em caso de risco** e 15 dias para outras irregularidades [15].
- **Retirada:** sem autorização da Comissão se for **clandestina**, emergência ou risco (REN 1.044, art. 14). Nos outros casos, com autorização da Comissão (art. 13). O custo é ressarcido pelo ocupante, que não recebe indenização (art. 15). Em Boa Vista, a distribuidora de Roraima faz desde 10/2021 operações de retirada de cabos clandestinos: os provedores marcavam os seus cabos e o resto era retirado [13].
- **Cobrança:** por **ponto de fixação** (REN 1.044, art. 7º IV), 1 ponto por poste por prestadora (Res. 4/2014). O valor é negociado no contrato. Referência regulatória de R$ 3,19 (2014). Exemplo: o contrato Energisa MS de 2022 cobra **R$ 6,58/ponto**, com multa por ocupação à revelia de 90% do valor mensal mais **1,5× o valor do ponto** por mês [15]. A receita abate a tarifa (modicidade tarifária).
- **Conflitos:** Comissão de Resolução de Conflitos ANEEL/Anatel/ANP, depois de esgotada a negociação.

### Riscos da rede aérea em Roraima (com fonte)

| Risco | Período / dado | Efeito no poste | Fonte |
|---|---|---|---|
| Chuva | Estação chuvosa de **abr–set**, mais forte em mai–jul (Femarh). Em Boa Vista o início é na 1ª–2ª dezena de maio e o fim na 2ª de setembro (Embrapa, série 1970–87). Abril tem média de 146 mm (normais INMET 1991–2020, via Climatempo) | Flecha, umidade em caixas, erosão na base do poste | [18][19] |
| Raios | Densidade estadual de cerca de **7,9 raios/km²/ano** (ranking ELAT/INPE, edição não datada, via imprensa) | Surtos; exige aterramento independente (NBR 5.7; Cemig 6.5) | [20] |
| Vento | Projetar trações considerando o vento crítico. Exemplo Cemig: 60 km/h urbano e 80–100 km/h rural (6.14). Não achei valor oficial para RR | Excesso de esforço no poste | [14] |
| Vegetação | Galhos sobre os cabos, principalmente na estação chuvosa | Curto-circuito e rompimento | Termo de busca: "poda de árvores rede de distribuição Roraima" |
| Queimadas | Período seco **dez–mar**, pico em **fev–mar** (INPE, 1999–2009). Recorde de 5.358 focos em 2024, com 2.057 em fevereiro | Fogo em cabos, poste de madeira e fumaça; acesso difícil | [21][22] |

NR-10 e NR-35 (lembrete): o trabalho no poste exige treinamento, APR e distância da parte energizada. A Cemig exige NR-10, NR-35 e NR-6 do ocupante (5.7).

### Divergências entre fontes

1. **Altura sobre rua:** Cemig e NBR dizem 5,0 m. A Energisa v4 diz 5,5 m (a coluna dela é de BT, sem coluna separada para telecom).
2. **Reserva técnica:** Cemig ≥1,5 m. NBR 2005 e Energisa ≥2,0 m.
3. **Plaqueta:** Cemig e NBR, 200–400 mm. Energisa, 300 mm ou 300–400 mm. A Cemig passou a exigir QR Code a partir de 01/2026.
4. **Pontos por poste:** Cemig 9 urbanos (1 reservado). Energisa 4–5 (v4), possivelmente 6 (v6). Roraima, "5" (fala de gestor na imprensa).
5. **Drops:** Cemig 8 por vão. NBR e Energisa, 10.
6. **Feixe:** Cemig 50 mm. NBR 65 mm.
7. **Afastamento da BT:** 600 mm (tabelas) contra 700 mm (anexo da Energisa v4).
8. **Cemig "2025":** o PDF foi publicado no site em 10/2025, mas o controle de revisão mostra versão inicial **12/2024, vigência 13/12/2024**.
9. **Cessão ao posteiro:** a ANEEL (12/2025) diz facultativa; Anatel e AGU dizem obrigatória; o PL da Câmara prevê transferência em casos definidos.
10. **Estação chuvosa:** começa em abril (Femarh) ou em maio (Embrapa/INMET).
11. **NBR 15214:** a edição de 05/2024 pode ter mudado os valores da tabela, que usam a edição de 2005.

### Confirmar na empresa

- O número e a versão vigente da norma de compartilhamento da distribuidora de Roraima (DT-DTE-01/NT-002? NT 06/2024?) e o Plano de Ocupação (REN 1.044, art. 19).
- Faixa de ocupação, quantidade de pontos, afastamentos, alturas, plaqueta (com QR Code?), distância de reserva e caixas, limite de drops.
- O processo interno: PROGER, quem aprova o projeto, quem vistoria, prazos do contrato, valor por ponto, multas.
- O procedimento de retirada de clandestinos (quem autoriza, registro com fotos, guarda do material).
- Se a empresa vai aderir a um posteiro quando sair o novo regulamento.
- **Não registrar** no app dados de rede, rotas ou coordenadas da empresa.

### Lições propostas

**L1 — Quem manda no poste (12 min).** Objetivo: entender detentor, ocupante e as normas em vigor. P1: Qual norma da ANEEL substituiu a REN 797/2017? (REN 1.044/2022.) P2: Quantos pontos por poste a Res. 4/2014 permite a cada prestadora? (Um.)
```svg
<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="40" width="90" height="40" rx="6" fill="none" stroke="currentColor"/><text x="55" y="64" font-size="11" text-anchor="middle">Distribuidora (detentor)</text><rect x="220" y="40" width="90" height="40" rx="6" fill="none" stroke="currentColor"/><text x="265" y="64" font-size="11" text-anchor="middle">Provedor (ocupante)</text><path d="M100 60h120" stroke="currentColor" marker-end="url(#a)"/><text x="160" y="52" font-size="10" text-anchor="middle">contrato + R$/ponto</text><text x="160" y="105" font-size="10" text-anchor="middle">ANEEL + Anatel: regras e conflitos</text><defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs></svg>
```

**L2 — Anatomia do poste e faixa de ocupação (15 min).** Objetivo: ler as alturas MT, BT, IP, faixa e equipamentos. P1: Qual a distância mínima do cabo telecom à BT? (0,60 m.) P2: Onde fica a faixa no exemplo da Cemig? (De 5,2 a 5,7 m.)
```svg
<svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg"><rect x="100" y="10" width="14" height="280" fill="none" stroke="currentColor"/><text x="120" y="30" font-size="10">MT</text><text x="120" y="90" font-size="10">BT (neutro/fases)</text><line x1="60" y1="100" x2="100" y2="100" stroke="currentColor" stroke-dasharray="3"/><text x="10" y="120" font-size="10">≥0,60 m</text><rect x="114" y="140" width="40" height="30" fill="none" stroke="currentColor"/><text x="158" y="158" font-size="10">Faixa 0,5 m</text><text x="10" y="145" font-size="10">5,70 m</text><text x="10" y="172" font-size="10">5,20 m</text><text x="120" y="200" font-size="10">equip. 0,2–1,8 m abaixo</text><line x1="40" y1="290" x2="180" y2="290" stroke="currentColor"/></svg>
```

**L3 — Plaqueta e identificação (10 min).** Objetivo: saber onde vai a plaqueta e o que ela informa. P1: A que distância do poste fica a plaqueta? (0,2–0,4 m.) P2: Cabo sem identificação e sem contrato é que tipo de ocupação? (Clandestina.)
```svg
<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="12" height="80" fill="none" stroke="currentColor"/><line x1="32" y1="40" x2="290" y2="45" stroke="currentColor"/><rect x="70" y="48" width="45" height="20" fill="none" stroke="currentColor"/><text x="72" y="62" font-size="8">PROVEDOR</text><text x="40" y="88" font-size="10">0,2–0,4 m do poste</text></svg>
```

**L4 — Reserva, CEO, CTO e drops (15 min).** Objetivo: onde cada coisa pode ficar. P1: A caixa de emenda pode ser fixada no poste? (Não; vai no vão, a ≥1,5 m no exemplo da Cemig.) P2: Drop derivado no meio do vão é permitido? (Não, na Cemig.)
```svg
<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="12" height="90" fill="none" stroke="currentColor"/><rect x="298" y="10" width="12" height="90" fill="none" stroke="currentColor"/><path d="M22 40 Q160 60 298 40" fill="none" stroke="currentColor"/><ellipse cx="90" cy="52" rx="14" ry="8" fill="none" stroke="currentColor"/><text x="60" y="78" font-size="9">reserva/CEO ≥1,5 m</text><path d="M22 42 L60 100" stroke="currentColor"/><text x="40" y="105" font-size="9">drop sai do poste</text><text x="200" y="80" font-size="9" fill="red">✗ drop no meio do vão</text></svg>
```

**L5 — Alturas ao solo (10 min).** Objetivo: aplicar os valores de altura. P1: Qual a altura mínima sobre rua? (5,0 m na NBR e na Cemig.) P2: E sobre entrada de garagem? (4,5 m.)
```svg
<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="110" x2="300" y2="110" stroke="currentColor"/><path d="M0 30 Q150 50 300 30" fill="none" stroke="currentColor"/><line x1="150" y1="45" x2="150" y2="110" stroke="currentColor" stroke-dasharray="3"/><text x="155" y="80" font-size="10">rua ≥5,0 m (flecha a 50 °C)</text></svg>
```

**L6 — Fiscalizar, notificar, retirar (15 min).** Objetivo: seguir o fluxo da REN 1.044. P1: Em que casos o detentor retira cabo sem autorização da Comissão? (Clandestino, emergência, risco.) P2: O que a notificação precisa conter? (Localização do poste e a não conformidade.)
```svg
<svg viewBox="0 0 360 60" xmlns="http://www.w3.org/2000/svg"><g font-size="9" text-anchor="middle"><rect x="2" y="15" width="80" height="30" fill="none" stroke="currentColor"/><text x="42" y="34">Vistoria/foto</text><rect x="94" y="15" width="80" height="30" fill="none" stroke="currentColor"/><text x="134" y="34">Notificação</text><rect x="186" y="15" width="80" height="30" fill="none" stroke="currentColor"/><text x="226" y="34">Prazo/regulariza</text><rect x="278" y="15" width="80" height="30" fill="none" stroke="currentColor"/><text x="318" y="34">Retirada</text></g></svg>
```

**L7 — Riscos em Roraima e o novo regulamento (12 min).** Objetivo: calendário de chuva, raios e queimadas, e o que pode mudar com o posteiro. P1: Em que meses fica o pico de queimadas em RR? (Fev–mar.) P2: O novo regulamento conjunto já está em vigor? (Não, em 06/11/2026.)
```svg
<svg viewBox="0 0 360 50" xmlns="http://www.w3.org/2000/svg"><g font-size="8" text-anchor="middle"><rect x="0" y="10" width="120" height="20" fill="none" stroke="currentColor"/><text x="60" y="24">dez–mar seco/queimadas</text><rect x="120" y="10" width="180" height="20" fill="none" stroke="currentColor"/><text x="210" y="24">abr–set chuvas/raios</text><rect x="300" y="10" width="60" height="20" fill="none" stroke="currentColor"/><text x="330" y="24">out–nov</text></g></svg>
```

### Exemplos de questões

**Q1.** Qual norma da ANEEL trata hoje dos procedimentos de compartilhamento de postes?
A) REN 797/2017. Errada: foi revogada.
B) **REN 1.044/2022. Certa:** está em vigor desde 01/11/2022.
C) REN 414/2010. Errada: era a norma de condições de fornecimento.
D) Res. Conjunta 1/2018. Errada: esse número não foi confirmado.

**Q2.** O preço de referência da Res. Conjunta 4/2014 é:
A) **R$ 3,19 por ponto de fixação. Certa** (art. 1º).
B) R$ 3,19 por poste. Errada: a unidade é o ponto.
C) Um teto obrigatório. Errada: é referência para a Comissão de conflitos.
D) R$ 6,58. Errada: esse é o valor de um contrato específico da Energisa.

**Q3.** Na inspeção, você vê uma caixa de emenda presa no poste. No exemplo da Cemig:
A) Ok, se tiver plaqueta. Errada.
B) **Irregular: a caixa deve ficar no vão, na cordoalha, a ≥1,5 m do poste. Certa** (6.30).
C) Ok, se estiver dentro da faixa. Errada.
D) Ok em poste com transformador. Errada: em poste com trafo é ainda mais proibido (6.33).

**Q4.** Qual é o afastamento mínimo entre o cabo telecom e a rede BT (≤1 kV), segundo a NBR 15214?
A) 0,30 m. Errada.
B) **0,60 m. Certa.**
C) 1,50 m. Errada: esse é o valor para MT de 15 kV.
D) 1,80 m. Errada: esse é o valor para 15–35 kV.

**Q5.** Um cabo sem contrato e sem dono identificado depois de notificar os ocupantes. A distribuidora:
A) Precisa de autorização da Comissão. Errada.
B) **Pode retirar sem autorização, por ser ocupação clandestina. Certa** (REN 1.044, art. 14).
C) Deve indenizar o dono. Errada (art. 15, parágrafo único).
D) Deve cobrar R$ 3,19. Errada.

**Q6.** Situação do novo regulamento de postes em 06/11/2026:
A) Em vigor desde 12/2025. Errada: a ANEEL aprovou sozinha.
B) **Em revisão entre ANEEL e Anatel, depois do parecer da AGU. O PL 3.220/2019 voltou ao Senado. Certa.**
C) Revogado pela AGU. Errada: a AGU só interpretou o decreto.
D) Já é lei sancionada. Errada.

### Termos para o glossário

| Sigla/termo | Português | Inglês | Definição |
|---|---|---|---|
| Detentor | Detentor | Pole owner | Dono da infraestrutura (a distribuidora) |
| Ocupante | Ocupante | Attacher | Quem instala cabos no poste por contrato |
| Ponto de fixação | Ponto de fixação | Attachment point | Local do suporte do cabo ou cordoalha dentro da faixa; unidade de cobrança |
| Faixa de ocupação | Faixa de ocupação | Communications space | Faixa de 500 mm reservada a telecom |
| À revelia | Ocupação à revelia | Unauthorized attachment | Ocupação sem projeto aprovado |
| Clandestina | Ocupação clandestina | Illegal attachment | Ocupação sem contrato ou sem dono identificado |
| Reserva técnica | Reserva técnica | Slack loop / cable reserve | Sobra de cabo guardada no vão |
| CEO | Caixa de emenda óptica | Splice closure | Caixa onde ficam as fusões |
| CTO | Caixa de terminação óptica | Fiber distribution terminal | Caixa de onde saem os drops |
| Drop | Cabo de assinante | Drop cable | Cabo que vai do poste até o cliente |
| Cordoalha | Cordoalha | Messenger strand | Cabo de aço que sustenta outros cabos |
| Flecha | Flecha | Sag | Quanto o cabo "barriga" no vão |
| Posteiro | Explorador de infraestrutura | Neutral pole operator | Terceiro que explora comercialmente os postes (em discussão) |
| PRPP | Plano de Regularização de Postes Prioritários | — | Plano anual de regularização (proposta ANEEL 12/2025) |
| CRC | Comissão de Resolução de Conflitos | Dispute commission | Órgão conjunto ANEEL/Anatel/ANP |

### Vídeos em português (verificados) ou termos de busca

Não consegui verificar título e canal de nenhum vídeo. Termos de busca sugeridos:
- "compartilhamento de postes NBR 15214 faixa de ocupação"
- "ocupação clandestina postes retirada de cabos distribuidora"
- "reserva técnica fibra óptica no vão raquete"
- "Aneel Anatel regulamento postes posteiro 2026"
- "plaqueta identificação cabo provedor poste"

### Fontes

1. Res. Conjunta ANEEL/Anatel/ANP nº 1/1999, LegisWeb. https://www.legisweb.com.br/legislacao/?id=96802 (acesso 06/11/2026)
2. Res. Conjunta ANEEL/Anatel nº 4/2014, LegisWeb. https://www.legisweb.com.br/legislacao/?id=279489 (06/11/2026)
3. REN ANEEL 1.044/2022 (cópia publicada pela Ceripa; o site da ANEEL retornou 403). https://www.ceripa.com.br/docs/Resolucao_Normativa_ANEEL_n_1_044_2022.pdf. Original: https://www2.aneel.gov.br/cedoc/ren20221044.html (06/11/2026)
4. REN 797/2017, com a nota "Revogada pela REN 1.044", ANEEL. https://www2.aneel.gov.br/cedoc/ren2017797.pdf; CanalEnergia, "Regras de compartilhamento são consolidadas". https://www.canalenergia.com.br/noticias/53225665/regras-de-compartilhamento-sao-consolidadas-pela-aneel (06/11/2026)
5. Cenário Energia, "ANEEL e ANATEL avançam em proposta…", 28/10/2026. https://cenarioenergia.com.br/2026/10/28/aneel-e-anatel-avancam-em-proposta-para-regulamentar-gestao-compartilhada-de-postes/ (06/11/2026)
6. TeleSíntese, "Conflito entre Aneel e Anatel… decisão vinculante da AGU", 22/05/2026. https://telesintese.com.br/conflito-entre-aneel-e-anatel-sobre-postes-chega-ao-fim-com-decisao-vinculante-da-agu/ (06/11/2026)
7. TeleSíntese, "Aneel aprova regra de compartilhamento de postes", 02/12/2025. https://telesintese.com.br/aneel-aprova-regra-de-compartilhamento-de-postes/ (06/11/2026)
8. Teletime, "Aneel quer definir regras a posteiros…", 26/08/2026. https://teletime.com.br/26/08/2026/aneel-quer-definir-regras-a-posteiros-antes-de-discutir-metodologia-de-precos-dos-postes/ (06/11/2026)
9. Agência Câmara, "Câmara aprova regras para o uso de postes…". https://www.camara.leg.br/noticias/1315992-camara-aprova-regras-para-o-uso-de-postes-por-empresas-de-energia-e-teles; tramitação: https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2617269 (06/11/2026)
10. IPNews, "Câmara aprova novas regras para compartilhamento de postes" (04/11/2026). https://ipnews.com.br/camara-aprova-novas-regras-para-compartilhamento-de-postes/ (06/11/2026)
11. Res. Conjunta nº 2/2001, citada no art. 5º da REN 1.044 [3]. Sobre a recriação da Comissão: resumo de busca, confirmar no DOU (06/11/2026)
12. Teletime, "Anatel aprova regulamento de postes…", 24/10/2023. https://teletime.com.br/24/10/2023/anatel-aprova-regulamento-de-postes-posteira-nao-podera-ter-rede-propria/ (06/11/2026)
14. Cemig, ND-6.6 "Compartilhamento de Postes das Redes de Distribuição de 15 kV, 24,2 kV e 36,2 kV", versão inicial 12/2024. https://www.cemig.com.br/wp-content/uploads/2025/10/nd-6-6-compartilhamento-postes-redes-distribuicao.pdf (lida na íntegra, 06/11/2026)
15. Energisa MS × UFGD, contrato EMS-APEC-03-2022, com o Anexo NDU-009 v4.0 (12/2017). https://files.ufgd.edu.br/arquivos/arquivos/78/CONTRATOS-PRAD/Contratos%20Vigentes/Contrato%2039-2022%20-%20Compartilhamento%20de%20postes%20-%20ENERGISA.pdf. NDU 009 v6.0 (bloqueada, 403): https://www.energisa.com.br/sites/energisa/files/media/documents/2025-02/NDU%20009%20-%20Crit%C3%A9rios%20para%20Compartilhamento%20de%20Infraestrutura%20da%20Rede%20El%C3%A9trica%20de%20Distribui%C3%A7%C3%A3o%20%20Vers%C3%A3o%206.0.pdf (06/11/2026)
16. ABNT NBR 15214:2005 (versão corrigida 2006), cópia anexada a documento do SEESP. https://www.seesp.org.br/site/images/documentos/InfraRede/ANEXO_2__ABNT_NBR_15214_2005_-_Compartilhamento_de_postes.pdf; edição 05/2024 no catálogo Target: https://www.target.com.br/produtos/normas-tecnicas/28761/nbr15214-rede-de-distribuicao-de-energia-eletrica-compartilhamento-de-infraestrutura-com-redes-de-telecomunicacoes (06/11/2026)
17. Demarest, "Anatel e Aneel avançam em medidas para disciplinar o uso de postes". https://www.demarest.com.br/anatel-e-aneel-avancam-em-medidas-para-disciplinar-o-uso-de-postes-no-brasil/ (06/11/2026)
18. Embrapa, Comunicado Técnico 006 (jun/1989), período chuvoso de Boa Vista. https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/687491/1/CT-006-JUN89.pdf (06/11/2026)
19. Climatempo, citando normais INMET 1991–2020. https://www.climatempo.com.br/noticia/norte/boa-vista-rr-chuva-de-um-mes-em-um-dia (06/11/2026)
20. Poder360, ranking ELAT/INPE de raios. https://www.poder360.com.br/brasil/brasil-registra-778-milhoes-de-raios-por-ano-e-prejuizo-de-r-100-milhoes/; ELAT: https://www.inpe.br/elat (06/11/2026)
21. INPE, Barbosa (2010), "Distribuição de focos de calor em Roraima". https://dataserver-coids.inpe.br/queimadas/queimadas/Publicacoes-Impacto/material3os/2010_Barbosa_DistribuicaoFocosRoraima_IXSASRSI_DE3os.pdf (06/11/2026)
22. Portal Amazônia, "Roraima bate recorde histórico de focos de calor… 2024". https://portalamazonia.com/meio-ambiente/roraima-recorde-focos-de-calor-2024/; painel: https://terrabrasilis.dpi.inpe.br/queimadas/ (06/11/2026)
23. Norma Técnica de Compartilhamento de Infraestrutura DT-DTE-01/NT-002 (12/2020), publicada no site da distribuidora de Roraima. Download bloqueado em 06/11/2026; endereço omitido na versão pública.


---

## Bloco 8 — QGIS

### Resumo

- **Versões (06/11/2026):** a LTR (versão de suporte longo) ainda é a **3.44** (3.44.15, de 25/09/2026). A "latest" (versão mais nova) é a **4.2.3**. A **4.2 NÃO virou LTR**: em 03/10/2026 o PSC (comitê do projeto) anunciou que a próxima LTR será a **4.4**, prevista para virar LTR na 4.4.4, em **05/03/2027**. A 4.4.0 estava marcada para 30/10/2026 e **atrasou**: o blog de 04/11/2026 diz que ainda não há data, por causa de regressões da migração para Qt6 [1][2][3][4].
- **Menus 3.44 x 4.x:** os manuais das duas versões trazem **os mesmos caminhos de menu** para as tarefas de iniciante. As diferenças estão em detalhes (lista abaixo) [5][6][7][8].
- **SRC (sistema de referência de coordenadas) em Roraima:** SIRGAS 2000 é o sistema oficial (R.PR 1/2005) [9]. Para UTM, o EPSG registra que, **no Brasil**, a versão "S" (falso norte 10.000.000 m) vale **nos dois hemisférios**, e a versão "N" da zona 20 nem cobre o Brasil [10]. O manual do IBGE de 1999 descreve só a regra genérica (0 m no hemisfério norte) [11]. Isso é uma divergência: **CONFIRMAR NA EMPRESA**.

### Versões em 06/11/2026

| Item | Situação | Fonte (acesso 06/11/2026) |
|---|---|---|
| LTR atual | 3.44.15 (25/09/2026). Próximas: 3.44.16 a 3.44.19, até 22/01/2027 | [1] roadmap; [2] tags git `final-3_44_15`, `ltr-3_44` |
| Latest atual | 4.2.3 (25/09/2026). `qgis.org/version.txt` = 4.2.3 | [1][12] |
| 3.44.0 | 20/06/2025. É a última série 3.x (depois dela vem a 3.99, que é a 4.0 em desenvolvimento) | [1] |
| 4.0.0 | **06/03/2026**, com o núcleo migrado para Qt6 | [1][5] |
| 4.2.0 | 03/07/2026 | [1][6] |
| 4.2 como LTR | **Cancelado.** "QGIS 4.2 will no longer be LTR" (03/10/2026). Não existe tag `ltr-4_2` no repositório | [3][2] |
| 4.4.0 | Planejada para 30/10/2026 e **atrasada**: "QGIS 4.4.0 would be delayed… regressions… Qt5 to Qt6" (04/11/2026). Ainda não existe a tag `final-4_4_0` | [4][2] |
| Primeira LTR 4.x | 4.4.4, prevista para 05/03/2027. No roadmap, a 3.44 sai do repositório LTR quando a 4.4.4 entra | [3][1] |
| Docs "latest" | docs.qgis.org/latest = manual da **3.44** | [7] |

**Divergência:** o blog de 07/10/2025 dizia que a 4.2 seria a primeira LTR 4.x, em out/2026 [13]. A lista do PSC (ago/2026) questionou isso [14], e o post de 03/10/2026 mudou o plano [3]. A página do roadmap ainda mostra "Latest 4.2.3 / Future: 4.4", sem uma data nova para a 4.4.0 [1].

**Mudanças 3.x → 4.x que afetam um iniciante** [5][6]:
- Qt6 por baixo. Alguns **complementos (plugins)** antigos podem não funcionar. **CONFIRMAR NA EMPRESA** quais a equipe usa.
- A 4.x guarda as **configurações num diretório separado**. Na primeira abertura, ela copia o perfil da 3.x uma vez, e depois os dois não se sincronizam [6].
- Página de boas-vindas redesenhada. Dá para criar menus e barras de ferramentas próprios. Os temas visuais passaram a vir por complemento [5].
- Tabela de atributos: um duplo clique na linha seleciona a feição e dá zoom nela [5]. Na 4.2, o botão direito no cabeçalho da coluna oferece **Calculadora de campo (Field Calculator)** [6].
- Na 4.2, o menu Camada ganhou o submenu **Estilos (Styles) ► Carregar/Salvar estilo** [6].
- Layout de impressão: a legenda passou a ter o modo padrão "Synchronize to Visible Layers", e "Update All" virou "Reset" [5]. O HTML em layouts está entre os bloqueios da 4.4 [14].

### SRC em Roraima

| SRC | EPSG | Parâmetros-chave | Uso |
|---|---|---|---|
| SIRGAS 2000 geográfico | **4674** | lat/long, elipsoide GRS80 | oficial do Brasil [9][10] |
| SIRGAS 2000 / UTM 20S | **31980** | MC −63°, k 0,9996, FE 500.000, **FN 10.000.000** | Área EPSG: "Brazil – between 66°W and 60°W, **northern and southern hemispheres**" [10] |
| SIRGAS 2000 / UTM 20N | **31974** | MC −63°, FN **0** | Área EPSG: "South America between 66°W and 60°W, north of approximately 4°N" (não inclui o Brasil) [10] |
| SIRGAS 2000 / UTM 21S | 31981 | MC −57°, FN 10.000.000 | Brasil entre 60°W e 54°W, nos dois hemisférios [10] |
| SIRGAS 2000 / UTM 21N | 31975 | MC −57°, FN 0 | fora do Brasil [10] |
| WGS 84 | 4326 | lat/long | GPS, KML, Google Earth [10][15] |
| SAD69 / SAD69 UTM 20S | 4618 / 29190 | elipsoide do SAD69 | legado [9][10] |
| Córrego Alegre 1970-72 | 4225 | elipsoide Internacional | legado [9][10] |

- **Zona 20:** de −66° a −60°. **Zona 21:** de −60° a −54° [10].
- **Hemisfério S ao norte do Equador:** o EPSG define que as CRS "S" (31980, 31981) valem para o Brasil nos dois hemisférios. As "N" cobrem só outros países [10]. O manual do IBGE de 1999 dá apenas a regra geral: "10.000.000 m ou 0 (zero) m … para os hemisférios sul e norte respectivamente" (p. 42) [11]. Não achei norma do IBGE que mande usar o "S" no norte. **CONFIRMAR NA EMPRESA** qual EPSG está no projeto.
- **Sedes municipais a leste de −60° (zona 21)**, segundo o IBGE (Cadastro de Localidades 2010, categoria "CIDADE") [16]: **Bonfim** (−59,878), **Normandia** (−59,635), **Caroebe** (−59,695) e **São João da Baliza** (−59,906).
- **Sedes a oeste (zona 20):** Uiramutã (−60,196, perto do limite), São Luiz (−60,028, muito perto), Rorainópolis, Boa Vista (−60,671) e as demais.
- **Territórios que cruzam −60°**, pela caixa envolvente da malha IBGE 2024 [17]: Bonfim, Caracaraí, Normandia, São João da Baliza, São Luiz e Uiramutã. Caroebe fica toda a leste. A caixa envolvente é só um retângulo em volta do município, então isso é aproximado. A regra prática é que a maioria dos dados de RR vai na zona 20. A empresa pode usar **uma zona só para o estado todo**: CONFIRMAR NA EMPRESA.
- **O erro de 10.000 km (exemplo fictício):** um poste fictício em 2°00′N, 61°00′W fica em E 722.461 m.
  - Em 31980, a coordenada norte é **N 10.221.197 m**. Em 31974, é **N 221.197 m**. A diferença é exatamente 10.000.000 m.
  - Se N = 221.197 for lido como 31980, o QGIS calcula 221.197 − 10.000.000 = −9.778.803 m, e o ponto vai parar perto da **Antártida**.
  - O contrário, N = 10.221.197 lido como 31974, joga o ponto perto do **Polo Norte**.
  - Em 31974, um ponto logo ao sul do Equador fica com N negativo (≈ −442 m a 0,004°S).
  - Os valores foram calculados com as fórmulas de Transverse Mercator e os parâmetros do EPSG [10]. A precisão é de 1 m.
- **WGS 84 x SIRGAS 2000:** o IBGE trata os dois como iguais para a cartografia ("Na prática, para cartografia, NÃO existem diferenças") [18]. O EPSG publica a transformação com parâmetros zero (`towgs84=0,0,0`) [10]. A diferença real é **centimétrica a decimétrica** e cresce com o tempo, pela época e pela deriva de placas. Para um técnico de campo com GPS de navegação (±3–5 m), ela não importa.
- **SAD69 e Córrego Alegre** só puderam ser usados junto com o SIRGAS 2000 num período de transição "não superior a dez anos" a partir de 2005 [9]. Dados antigos nesses sistemas precisam ser transformados. Entre SAD69 e SIRGAS a diferença chega a dezenas de metros, e a R.PR 1/2005 traz os parâmetros de transformação [9].

### Fatos e valores de referência

| Afirmação | Valor | Fonte | Acesso | Confiança |
|---|---|---|---|---|
| Medição padrão do QGIS é elipsoidal | o elipsoide vem de Projeto ► Propriedades ► Geral (Project ► Properties ► General); "None/Planimetric" para cartesiana | [19] | 06/11/26 | alta |
| Ferramenta de medição | opções Cartesiana (Cartesian) e Elipsoidal (Ellipsoidal) para linha e área | [19] | 06/11/26 | alta |
| `$length` | respeita o elipsoide e a unidade do projeto | [20] | 06/11/26 | alta |
| `length($geometry)` | "always planimetric" no SRC da camada, na unidade do SRC | [20] | 06/11/26 | alta |
| `aggregate()` | agrega valores de outra camada (count, sum…) | [20] | 06/11/26 | alta |
| `overlay_contains()` | testa se a feição contém feições de outra camada | [20] | 06/11/26 | alta |
| Shapefile | nome de campo ≤ 10 caracteres; atributos em .dbf; SRC no .prj; limite recomendado de 2 GB. A GDAL 3.13 usa .shp.xml para nomes longos | [21] | 06/11/26 | alta |
| KML | "uses only a single projection, EPSG:4326"; a GDAL reprojeta ao gravar | [15] | 06/11/26 | alta |
| GeoPackage | padrão OGC aberto, num arquivo único; o QGIS cria a chave `fid` | [22][23] | 06/11/26 | alta |
| Texto delimitado | "Point coordinates" + campo X / campo Y + SRC da geometria | [24] | 06/11/26 | alta |
| DXF | pode misturar geometrias, e o QGIS pede para escolher uma | [24] | 06/11/26 | alta |
| SIRGAS 2000 oficial | R.PR 1/2005, transição de até 10 anos | [9] | 06/11/26 | alta |
| QFieldCloud | Community grátis (100 MB); Flat €18/usuário/mês (anual; €14 com 20+ usuários; €23 no mensal); Flex €28/usuário ativo/mês | [25] | 06/11/26 | média (preço muda) |
| Mergin Maps | Solo €25/mês; Start €99/mês (5 usuários); Explore €199/mês | [26] | 06/11/26 | média |

### Caminhos de menu

Os nomes estão em inglês, como no manual. A tradução da tela em PT pode ser diferente da tradução do manual pt_BR: lá aparece "Ver" no lugar de "Exibir", por exemplo. Conferido nos manuais 3.44 [7] e 4.2 [8].

| Tarefa | QGIS 3.44 | QGIS 4.x (4.2) | Fonte |
|---|---|---|---|
| Adicionar camada vetorial | Layer ► Add Layer ► Add Vector Layer… (Ctrl+Shift+V) ou Data Source Manager (Ctrl+L) | igual | [7][8] |
| CSV com X/Y | Layer ► Add Layer ► Add Delimited Text Layer… (Ctrl+Shift+T) | igual | [7][24] |
| Tabela de atributos | Layer ► Open Attribute Table (F6) | igual. Duplo clique na linha dá zoom na feição | [7][5] |
| Selecionar por expressão | Edit ► Select ► Select Features by Expression… (Ctrl+F3) | igual | [7][8] |
| Filtrar (Query Builder) | Layer ► Filter… (Ctrl+F) | igual | [7][8] |
| Modo de edição | Layer ► Toggle Editing | igual | [7][8] |
| Adicionar ponto | Edit ► Add Point Feature (Ctrl+.) | igual | [7] |
| Mover vértice | Edit ► Vertex Tool (Current Layer) | igual | [7] |
| Salvar edições | Layer ► Save Layer Edits | igual | [7] |
| Calculadora de campo | botão na tabela de atributos (Ctrl+I) | igual + botão direito no cabeçalho (4.2) | [27][6] |
| Medir distância | View ► Measure ► Measure Line (Ctrl+Shift+M) | igual | [7][19] |
| Rótulos | Layer ► Labeling / Layer Properties ► Labels | igual | [7] |
| Estilo categorizado | Layer Properties ► Symbology ► Categorized | igual. Na 4.2, estilos também em Layer ► Styles | [28][6] |
| SRC do projeto / camada | Project ► Properties… ► CRS; botão direito ► Layer CRS ► Set Layer CRS… | igual | [28] |
| Buffer | Vector ► Geoprocessing Tools ► Buffer… | igual | [7][8] |
| Contar pontos em polígono | Vector ► Analysis Tools ► Count Points in Polygon… | igual | [7][8] |
| Junção espacial | Vector ► Data Management Tools ► Join Attributes by Location… | igual | [7][8] |
| Layout de impressão | Project ► New Print Layout… (Ctrl+P) | igual. Legenda com modos novos | [7][5] |
| Exportar para KML | botão direito ► Export ► Save Features As… → formato "Keyhole Markup Language [KML]" (ou Layer ► Save As…) | igual | [28][24] |
| Caixa de ferramentas | Processing ► Toolbox (Ctrl+Alt+T) | igual. Na 4.2, dá para pôr algoritmos em menu próprio | [7][6] |

### Proposta de dados fictícios

- **Área:** "Vila Fictícia", um quadrado de 1,2 km × 1,2 km **cruzando o Equador** em 61°00′W, em EPSG:31980: E 722.000–723.200, N 9.999.400–10.000.600.
- **Por quê:** fica na zona 20 e ensina o problema do hemisfério na prática, já que em 31974 metade dos pontos ficaria com N negativo.
- **Cuidados:** toda feição leva `ficticio = 1`, e o projeto não traz mapa de fundo real, assim nada se confunde com rede real.
- **Antes de publicar:** conferir em imagem que o local não tem infraestrutura. Se tiver, deslocar só o N/E.
- **Alternativa:** um "sistema local" inventado (origem 0,0 em metros, sem georreferência) para os exercícios sem SRC.

| Camada (GeoPackage `rede_ficticia.gpkg`) | Geometria | Campos (tipo) |
|---|---|---|
| `postes` | Ponto | fid (int), cod_poste (text, "PF-0001"), material (text: concreto/madeira/metal), altura_m (real), esforco_daN (int), ocupantes_qtd (int), situacao (text), data_vistoria (date), ficticio (int) |
| `cabos` | Linha | fid, cod_cabo (text), tipo (text: óptico/metálico/drop), fibras (int), ocupante_id (int), poste_ini / poste_fim (text), compr_proj_m (real) |
| `caixas` | Ponto | fid, cod_caixa (text), tipo (text: CEO/CTO), capacidade (int), poste_cod (text), ocupante_id (int) |
| `ocupantes` | Tabela sem geometria | ocupante_id (int), nome_ficticio (text: "Operadora Alfa"…), cnpj_ficticio (text, "00.000.000/0001-00"), contrato (text) |
| `quadras` | Polígono | fid, quadra (text), para os exercícios de contagem |

Exportar também `postes.kml` (EPSG:4326), `postes.csv` (X/Y em 31980) e um `postes_shp` para mostrar o corte dos nomes de campo (por exemplo, `data_vistoria` vira `data_visto`).

### Exercícios propostos

1. Abra `postes.csv` como texto delimitado com SRC 31974 (errado). Em que latitude aproximada o QGIS desenha os pontos? **Resp.:** N≈10.000.000 m lido com falso norte 0 significa ~10.000 km ao norte do Equador, ou seja, no Polo Norte ou além (pontos somem ou ficam distorcidos). O correto é **31980**.
2. Calcule o comprimento do cabo `CB-07` com `$length` e com `length($geometry)` (projeto em 31980 com elipsoide GRS80). **Resp.:** diferem cerca de 0,02% (em E≈722 km o fator de escala UTM é ≈1,0002; no meridiano central seria 0,9996). `length($geometry)` dá o valor "no plano UTM", um pouco maior que o elipsoidal. Gabarito: gerar com o próprio dataset.
3. Selecione os postes com `"ocupantes_qtd" > 5`. **Resp.:** conferível pela contagem na barra da tabela (o dataset define, por exemplo, 7).
4. Na camada `quadras`, crie o campo `n_postes` com `aggregate('postes','count',"fid",filter:=intersects(geometry(@parent),$geometry))` ou com Count Points in Polygon. **Resp.:** a soma por quadra é igual ao total de postes.
5. Exporte `caixas` para KML. Qual SRC o arquivo terá? **Resp.:** EPSG:4326, sempre [15].
6. Salve `postes` como Shapefile. Que nome recebe `data_vistoria`? **Resp.:** `data_visto` (10 caracteres) [21].

### Divergências / Confirmar na empresa

- **Divergência:** a 4.2 como LTR (blog de 2025) foi substituída pela 4.4.4 em mar/2027 (blog de 03/10/2026). A data da 4.4.0 está em aberto [3][4][13].
- **Divergência:** UTM "S" no hemisfério norte. O EPSG aplica isso ao Brasil [10], mas o manual do IBGE só dá a regra genérica [11].
- **Divergência:** WGS84 = SIRGAS "na prática" (IBGE, 2000) [18], mas a diferença real é de cm a dm, conforme a época.
- **CONFIRMAR NA EMPRESA:**
  - versão do QGIS (3.44 LTR ou 4.x) e complementos usados;
  - SRC do projeto e das camadas (31980? 4674?) e se a empresa usa uma zona única;
  - nomes e tipos de campos dos postes, cabos, caixas e ocupantes;
  - formato oficial (GeoPackage, PostGIS, Shapefile);
  - se usa QField/QFieldCloud, Mergin Maps ou outro app;
  - modelo de layout de impressão.

### Lições propostas

1. **O que é o QGIS e qual versão eu tenho** (10 min).
   - Objetivo: identificar a versão em Ajuda ► Sobre (Help ► About) e entender LTR x latest.
   - P1: por que a empresa usaria a LTR? P2: a 4.2 é LTR?
   - SVG: linha do tempo 3.44 → 4.0 → 4.2 → 4.4 (LTR em 03/2027).
2. **Vetor, raster, feição e atributo** (12 min).
   - Objetivo: diferenciar ponto, linha e polígono de raster, e ler a tabela de atributos.
   - P1: um poste é qual geometria? P2: o que é uma linha da tabela?
   - SVG: mapa com poste (ponto), cabo (linha) e quadra (polígono) ligados à tabela.
3. **SRC sem medo: SIRGAS, UTM 20S e o erro de 10.000 km** (15 min).
   - Objetivo: escolher 31980 ou 4674 e reconhecer coordenadas absurdas.
   - P1: N = 10.221.197 é de qual EPSG? P2: Bonfim fica em qual zona?
   - SVG: faixa das zonas 20 e 21 sobre RR, com o Equador e os eixos N=0 e N=10.000.000.
4. **Formatos de arquivo** (10 min).
   - Objetivo: saber quando usar GPKG, SHP, KML, CSV ou DXF.
   - P1: por que o KML sai em 4326? P2: o que se perde no Shapefile?
   - SVG: "um arquivo .gpkg" x "vários arquivos .shp/.shx/.dbf/.prj".
5. **Editar com segurança** (12 min).
   - Objetivo: modo de edição, adicionar ponto, mover vértice, salvar.
   - P1: o que acontece se fechar sem salvar? P2: qual atalho adiciona um ponto?
   - SVG: o fluxo lápis → ponto → vértice → salvar.
6. **Perguntas à camada: expressões, filtros e contagens** (15 min).
   - Objetivo: usar seleção por expressão, filtro, calculadora de campo, `$length` x `length()` e Count Points in Polygon.
   - P1: qual a diferença entre filtrar e selecionar? P2: qual medição respeita o elipsoide?
   - SVG: funil filtro x destaque seleção.
7. **Campo com QField** (12 min).
   - Objetivo: o ciclo empacotar → coletar offline → sincronizar.
   - P1: qual menu empacota o projeto? P2: o QField funciona sem internet?
   - SVG: o ciclo QGIS → QFieldSync → celular → QFieldSync → QGIS.

### Exemplos de questões

1. **Em 06/11/2026, qual é a LTR do QGIS?** a) 4.2 b) **3.44** c) 4.4 d) 4.0.
   - a) A 4.2 deixou de ser LTR (03/10/2026).
   - b) **Certa:** a 3.44.15 é a LTR atual [1].
   - c) A 4.4 só vira LTR na 4.4.4 (03/2027), e a 4.4.0 atrasou.
   - d) A 4.0 nunca foi LTR.
2. **Um ponto em RR com N = 10.221.197 m está em:** a) 31974 b) **31980** c) 4674 d) 4326.
   - a) A 31974 tem falso norte 0, então perto do Equador o N seria ~221 km.
   - b) **Certa:** é o falso norte de 10.000.000 m da zona 20S.
   - c) A 4674 é em graus.
   - d) A 4326 também é em graus.
3. **Exportei postes para KML. O SRC do arquivo é:** a) o do projeto b) 31980 c) **4326** d) 4674.
   - a) O SRC do projeto não importa, porque o KML só aceita 4326.
   - b) A 31980 é projetada, e o KML não aceita.
   - c) **Certa:** a especificação do KML usa somente EPSG:4326 [15].
   - d) A 4674 é muito parecida com a 4326, mas não é a que vai no arquivo.
4. **`length($geometry)` retorna:** a) medida elipsoidal b) **medida planimétrica no SRC da camada** c) o número de vértices d) sempre metros.
   - a) Elipsoidal é o `$length`.
   - b) **Certa:** é o que diz a documentação [20].
   - c) O número de vértices é `num_points`.
   - d) A unidade é a do SRC, por isso em 4326 sai em graus.
5. **Ao salvar como Shapefile, o campo `ocupantes_qtd`:** a) fica igual b) **é truncado para 10 caracteres** c) vira texto d) some.
   - a) O .dbf limita o nome do campo a 10 caracteres.
   - b) **Certa:** vira `ocupantes_` [21].
   - c) O tipo do campo continua o mesmo.
   - d) O campo continua no arquivo, só o nome muda.

### Termos para o glossário

| Sigla | Português | Inglês | Definição |
|---|---|---|---|
| SIG | Sistema de Informação Geográfica | GIS | software para dados com localização |
| LTR | Versão de suporte longo | Long Term Release | versão que recebe correções por ~1 ano ou mais |
| SRC | Sistema de Referência de Coordenadas | CRS | define como as coordenadas se ligam à Terra |
| EPSG | Código EPSG | EPSG code | número que identifica um SRC (ex.: 31980) |
| UTM | Universal Transversa de Mercator | UTM | projeção em zonas de 6°, coordenadas em metros |
| FN | Falso norte | False northing | valor somado ao N (0 ou 10.000.000 m) |
| — | Feição | Feature | um objeto da camada (um poste) |
| — | Tabela de atributos | Attribute table | dados descritivos das feições |
| GPKG | GeoPackage | GeoPackage | arquivo único, padrão OGC |
| KML | — | Keyhole Markup Language | formato do Google Earth, sempre em 4326 |
| — | Reprojeção em tempo real | On-the-fly reprojection | o QGIS mostra camadas de SRCs diferentes juntas no SRC do projeto |
| — | Construtor de consultas | Query Builder | tela do Filtrar (Filter…) |

### Vídeos/cursos em português

Não verifiquei nenhum vídeo em PT-BR com título e canal confirmados. Termos de busca: "QGIS 3.44 tutorial iniciante", "QGIS SIRGAS 2000 UTM 20S", "QField QFieldSync tutorial português", "calculadora de campo QGIS".

Cursos e materiais (links conferidos com HTTP 200):
- Manual de Treinamento do QGIS (Training Manual) em pt_BR [29].
- Uma Introdução Gentil ao SIG [30].
- Guia do Usuário pt_BR 3.44 [7].
- Docs do QField em português [31].
- Mackenzie LABGEO, "Curso de Geoprocessamento com QGIS3 – Módulo I" (gratuito) [32].
- ENAP Escola Virtual: o catálogo está no ar [33], mas não achei curso de QGIS. Embrapa e-Campo e INPE: não encontrei curso de QGIS gratuito ativo. IBGE: o manual "Noções Básicas de Cartografia" [11] serve como apoio.

### Fontes

1. QGIS Release Roadmap. qgis.org. https://www.qgis.org/resources/roadmap/ (06/11/2026)
2. Repositório QGIS, tags/branches (`git ls-remote`). https://github.com/qgis/QGIS (06/11/2026)
3. "Release schedule changes for next QGIS LTR", 03/10/2026. blog.qgis.org. https://blog.qgis.org/2026/10/03/release-schedule-changes-for-next-qgis-ltr/ (06/11/2026)
4. "Where is QGIS 4.4.0?", 04/11/2026. blog.qgis.org. https://blog.qgis.org/2026/11/04/where-is-qgis-4.4.0/ (06/11/2026)
5. Changelog QGIS 4.0. https://changelog.qgis.org/en/version/4.0/ (06/11/2026)
6. Changelog QGIS 4.2. https://changelog.qgis.org/en/version/4.2/ (06/11/2026)
7. QGIS User Guide 3.44, QGIS GUI. https://docs.qgis.org/3.44/en/docs/user_manual/introduction/qgis_gui.html (pt_BR: https://docs.qgis.org/3.44/pt_BR/docs/user_manual/index.html) (06/11/2026)
8. QGIS User Guide 4.2, QGIS GUI. https://docs.qgis.org/4.2/en/docs/user_manual/introduction/qgis_gui.html (06/11/2026)
9. IBGE, Resolução R.PR 1/2005. https://geoftp.ibge.gov.br/metodos_e_outros_documentos_de_referencia/normas/rpr_01_25fev2005.pdf (06/11/2026)
10. EPSG.io (registro EPSG): 4674, 31974, 31980, 31975, 31981, 4326, 4618, 29190, 4225. https://epsg.io/31980 (e demais códigos) (06/11/2026)
11. IBGE, Noções Básicas de Cartografia (1999), p. 42. https://biblioteca.ibge.gov.br/visualizacao/livros/liv8595_v1.pdf (06/11/2026)
12. https://qgis.org/version.txt (06/11/2026)
13. "Update on QGIS 4.0 Release Schedule and LTR Plans", 07/10/2025. https://blog.qgis.org/2025/10/07/update-on-qgis-4-0-release-schedule-and-ltr-plans/ (via busca, 06/11/2026; página instável)
14. Lista qgis-psc "Next 4.x LTR", ago/2026. https://lists.osgeo.org/pipermail/qgis-psc/2026-August/010820.html; 010826.html; qgis-developer out/2026: https://lists.osgeo.org/pipermail/qgis-developer/2026-October/068634.html (06/11/2026)
15. GDAL, KML driver. https://gdal.org/en/stable/drivers/vector/kml.html (06/11/2026)
16. IBGE, Cadastro de Localidades Selecionadas 2010. https://geoftp.ibge.gov.br/organizacao_do_territorio/estrutura_territorial/localidades/cadastro_de_localidades_selecionadas_2010/ (06/11/2026)
17. IBGE, Malha Municipal 2024 – RR. https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2024/UFs/RR/RR_Municipios_2024.zip (06/11/2026)
18. IBGE, Seminário 2000 (proposta SIRGAS). https://geoftp.ibge.gov.br/metodos_e_outros_documentos_de_referencia/outros_documentos_tecnicos/apresentacoes_artigos/2000/seminario_2000_proposta_a.pdf (via busca, 06/11/2026)
19. QGIS User Guide 3.44, 2D Map View – Measuring. https://docs.qgis.org/3.44/en/docs/user_manual/map_views/map_view.html (06/11/2026)
20. QGIS User Guide 3.44, List of functions. https://docs.qgis.org/3.44/en/docs/user_manual/expressions/functions_list.html (06/11/2026)
21. GDAL, ESRI Shapefile driver. https://gdal.org/en/stable/drivers/vector/shapefile.html (06/11/2026)
22. OGC GeoPackage. https://www.geopackage.org/ (06/11/2026)
23. QGIS User Guide 3.44, Creating Layers. https://docs.qgis.org/3.44/en/docs/user_manual/managing_data_source/create_layers.html (06/11/2026)
24. QGIS User Guide 3.44, Opening Data. https://docs.qgis.org/3.44/en/docs/user_manual/managing_data_source/opening_data.html (06/11/2026)
25. QFieldCloud Pricing. https://qfield.cloud/pricing (06/11/2026); QFieldSync: https://docs.qfield.org/get-started/tutorials/get-started-qfs/ (06/11/2026)
26. Mergin Maps Pricing. https://merginmaps.com/pricing (06/11/2026)
27. QGIS User Guide 3.44, Attribute Table. https://docs.qgis.org/3.44/en/docs/user_manual/working_with_vector/attribute_table.html (06/11/2026)
28. QGIS User Guide 3.44, Vector Properties. https://docs.qgis.org/3.44/en/docs/user_manual/working_with_vector/vector_properties.html (06/11/2026)
29. QGIS Training Manual pt_BR. https://docs.qgis.org/latest/pt_BR/docs/training_manual/index.html (06/11/2026)
30. Uma Introdução Gentil ao SIG. https://docs.qgis.org/3.44/pt_BR/docs/gentle_gis_introduction/index.html (06/11/2026)
31. Documentação QField (PT). https://docs.qfield.org/pt/ (06/11/2026)
32. Mackenzie LABGEO. https://www.mackenzie.br/universidade/laboratorio/ee/labgeo/curso-de-geoprocessamento-com-qgis3 (06/11/2026)
33. ENAP Escola Virtual, catálogo. https://www.escolavirtual.gov.br/catalogo (06/11/2026)

**Nota sobre o QField** [25][31]: o QField é um app de coleta em campo para Android, iOS, Windows, macOS e Linux. O fluxo é este:
1. No QGIS, instalar o QFieldSync em Plugins ► Manage and Install Plugins….
2. Empacotar o projeto em Plugins ► QFieldSync ► Package for QField. As camadas marcadas como "Offline editing" são copiadas e têm as alterações registradas.
3. Coletar em campo sem internet.
4. Trazer os dados em Plugins ► QFieldSync ► Synchronize from QField, uma vez por pacote. A outra opção é a sincronização automática pelo QFieldCloud.

O Mergin Maps é uma alternativa com app e complemento próprios.


---

## Bloco 9 — Contratos e fornecedores

Pesquisa feita em 06/11/2026. As fontes estão numeradas como [n] (lista no final). "CONFIRMAR NA EMPRESA" = depende do contrato ou da norma interna da distribuidora.

### Resumo

- **A distribuidora é uma empresa privada.** Por isso a Lei 14.133/2021 (licitações) **não se aplica** a ela. Os contratos seguem o Código Civil e o que as partes assinaram. Mesmo assim, os termos "gestor", "fiscal", "recebimento provisório/definitivo", "glosa" e "Nível Mínimo de Serviço (NMS)" vêm dessa lei e do Decreto 11.246/2022 [1][2]. Eles são o vocabulário mais usado no mercado e servem de boa prática.
- **O SLA (acordo de nível de serviço, *Service Level Agreement*) de um link B2B vale pelo que está no contrato.** Nos termos de referência (TR) públicos, o que mais aparece é:
  - disponibilidade mensal de 99,3% a 99,9%;
  - reparo em 4 h;
  - latência de até 25 ms até a borda da operadora;
  - perda de pacotes de 2% a 3%;
  - desconto proporcional ao tempo parado, calculado como Valor × minutos parados ÷ minutos do mês [3][4][5][6].
- **O RGC (Res. Anatel 765/2023) vale para STFC, SMP, SCM e TV por assinatura** e protege o "Consumidor", que também pode ser pessoa jurídica [7][8]. Pontos que interessam a uma distribuidora:
  - o prazo de permanência (fidelidade) de pessoa jurídica pode passar de 12 meses (art. 36 §1º);
  - pedidos de reparo de concessionárias e autorizadas de serviço público contam como "demandas urgentes", com atendimento 24 h [7][8];
  - o ressarcimento automático por interrupção é calculado como (valor mensal ÷ 43.200) × minutos parados [8].
- **A EILD (Res. 590/2012) é um contrato de atacado entre prestadoras** [9]. A distribuidora normalmente não compra EILD. Ela compra o serviço de uma operadora (SCM).
- **Postes:** a Resolução Conjunta ANEEL/Anatel nº 4/2014 continua valendo, com preço de referência de R$ 3,19 por ponto [10][11]. A nova resolução conjunta ainda não foi publicada: em outubro de 2026 o impasse sobre o "posteiro" continuava [12].
- **IST:** é o índice da Anatel usado para reajustar contratos de telecom. O TJAL, por exemplo, o usa em contrato de link [6]. A série oficial deve ser consultada na Anatel; os valores de 2026 que encontrei são de fonte secundária [13].

### Fatos e valores de referência

| Afirmação | Valor | Fonte | Acesso | Confiança |
|---|---|---|---|---|
| Atribuições do gestor do contrato (coordena a fiscalização, faz o recebimento definitivo, abre processo de sanção) | Decreto 11.246/2022, art. 21 | [2] | 06/11/2026 | Alta |
| Atribuições do fiscal técnico (registra ocorrências, notifica, informa o gestor) | art. 22 | [2] | 06/11/2026 | Alta |
| Fiscalização do contrato por representante designado | Lei 14.133, art. 117 | [1] | 06/11/2026 | Alta |
| Recebimento provisório (pelo fiscal) e definitivo (pelo gestor ou comissão) | Lei 14.133, art. 140 | [1] | 06/11/2026 | Alta |
| Obra: o construtor responde por solidez e segurança | mínimo de 5 anos (Lei 14.133 art. 140 §6º; Código Civil art. 618) | [1][14] | 06/11/2026 | Alta (CONFIRMAR prazo de garantia no contrato) |
| Fórmula de disponibilidade | D = (To − Ti)/To × 100, em minutos/mês | [3][5] | 06/11/2026 | Alta |
| Disponibilidade mínima de um TR | 99,3% = 5,04 h/mês | [3] | 06/11/2026 | Alta |
| Latência até a borda da operadora | ≤ 25 ms (RTT) | [6] | 06/11/2026 | Alta (exemplo) |
| Perda de pacotes tolerada | 2% [6]; 3% [3] | [3][6] | 06/11/2026 | Média (varia) |
| Paradas programadas fora da conta | 2 por ano, ≤ 4 h, com aviso de 15 dias | [6] | 06/11/2026 | Alta (exemplo) |
| Falhas repetidas em menos de 3 h | contam como uma só (da 1ª à última) | [6] | 06/11/2026 | Alta (exemplo) |
| Falta de energia no cliente | é "alarme indevido": não conta contra a operadora | [6] | 06/11/2026 | Alta (exemplo) |
| Prazo de reparo do link | 4 h | [4] | 06/11/2026 | Média |
| Abrangência do RGC | STFC, SMP, SCM e TV por assinatura; não vale para acessos IoT; vigência desde 09/2025 | [7] | 06/11/2026 | Alta |
| Fidelidade de pessoa jurídica | pode passar de 12 meses (art. 36 §1º) | [8] | 06/11/2026 | Alta |
| Reparo para concessionária de serviço público | "demanda urgente", atendimento 24 h | [7][8] | 06/11/2026 | Alta |
| Ressarcimento por interrupção (RGC) | (valor ÷ 43.200) × minutos; crédito em até 90 dias | [8] | 06/11/2026 | Alta |
| Desconsideração de interrupções programadas (RGC) | 0–6 h (planta interna) e 6–12 h (rede externa), com aviso de 24 h | [8] | 06/11/2026 | Alta |
| EILD | linha dedicada fornecida de uma prestadora para outra; modalidades Padrão (grupos com PMS) e Especial | [9] | 06/11/2026 | Média |
| Preço de referência por ponto no poste | R$ 3,19 (Res. Conj. 4/2014) | [11] | 06/11/2026 | Média |
| Receita de postes: parte que vai para a modicidade tarifária | 60% da receita bruta (Proret 2.7) | [15] | 06/11/2026 | Média (CONFIRMAR) |
| Direito de prestadora usar postes a preços "justos e razoáveis" | LGT (Lei 9.472/1997), art. 73 | [16] | 06/11/2026 | Alta |
| IST anual de 2025 | 3,51% | [13][17] | 06/11/2026 | Média (2 fontes secundárias) |
| Duração típica de um IRU | cerca de 20 anos (vida útil da fibra), com O&M em contrato separado | [18] | 06/11/2026 | Média (fonte estrangeira) |
| Perda típica de emenda por fusão | < 0,1 dB; aferir com OTDR bidirecional | [19][20] | 06/11/2026 | Média |

### Tabela de disponibilidade

Bases de cálculo: mês de 30 dias = 43.200 min; ano de 365 dias = 525.600 min. Cálculo feito por mim. A fórmula está em [3]; o mês de 43.200 min vem de [8].

| SLA | Parada permitida por mês (30 d) | Parada permitida por ano |
|---|---|---|
| 98,0% | 864 min = 14 h 24 min | 175,2 h ≈ 7,3 dias |
| 99,0% | 432 min = 7 h 12 min | 87,6 h ≈ 3,65 dias |
| 99,3% | 302,4 min ≈ 5 h 02 min | 61,3 h |
| 99,5% | 216 min = 3 h 36 min | 43,8 h = 43 h 48 min |
| 99,7% | 129,6 min ≈ 2 h 10 min | 26,3 h ≈ 26 h 17 min |
| 99,9% | 43,2 min ≈ 43 min 12 s | 8,76 h ≈ 8 h 46 min |
| 99,95% | 21,6 min | 4,38 h |
| 99,99% | 4,3 min | 52,6 min |

Atenção: um SLA "anual" de 99,9% (é o caso de [21]) permite concentrar as 8 h 46 min de parada em um único mês. Um SLA mensal não permite.

### Fórmulas de glosa

1. **Desconto proporcional ao tempo parado** (IF Sul de Minas [5]; mesma lógica do RGC [8]):
   Dc = (Cm × Ti) / To
   - Cm = custo mensal do link, incluindo roteador e modem;
   - Ti = minutos parados;
   - To = minutos do mês.

   *Exemplo fictício:* Cm = R$ 3.000 e Ti = 300 min → Dc = 3.000 × 300 / 43.200 = **R$ 20,83**. A disponibilidade fica em 99,31%: abaixo de 99,7% e acima de 99,3%.
2. **Forma SUDAM** [22]: Vd = V × [1 − (D/100)], limitada a 20%. Ela dá o mesmo valor da fórmula 1, porque 1 − D/100 = Ti/To. Com os números do exemplo: R$ 20,83.
3. **Glosa por faixas** [5]:
   - disponibilidade < 90% → glosa de 50% do mês;
   - disponibilidade < 80% → glosa de 100%.

   Outro edital aplicava glosa de 10% quando a disponibilidade ficava abaixo de 99,7% [23].
4. **Variante ilustrativa, sem fonte oficial:** descontar só o excesso acima da parada permitida. Exemplo: 3.000 × (300 − 129,6) / 43.200 = R$ 11,83. **CONFIRMAR NA EMPRESA** qual regra o contrato usa.
5. **Degradação contada como indisponibilidade** [6]:
   - latência acima de 25 ms em 2 amostras seguidas;
   - perda de pacotes acima de 2%;
   - vazão abaixo de 95% da velocidade contratada.

### Modelo de planilha de controle

| Coluna | Tipo | Exemplo fictício |
|---|---|---|
| ID interno | texto | CT-TEL-001 |
| Fornecedor / CNPJ | texto | Operadora Exemplo Ltda / 00.000.000/0001-00 |
| Categoria | lista: Link IP dedicado, L2/MPLS, Banda larga, Fibra apagada/IRU, Capacidade/lambda, Construção, Manutenção, Postes (receita), Locação | Link IP dedicado |
| Objeto / circuito (designação) | texto | Internet 500 Mbps – Sede – ID circuito XYZ123 |
| Nº do contrato / aditivos | texto | 045/2025 – 1º TA |
| Receita ou despesa | lista | Despesa |
| Vigência: início e fim | data | 01/03/2025 – 28/02/2027 |
| Dias para vencer | fórmula =FIM−HOJE() | 479 |
| Alerta | fórmula: "90/60/30 dias" | (vazio) |
| Índice de reajuste / data-base | lista (IST, IPCA, IGP-M) + data | IST / 01/03 |
| Valor mensal / valor global | moeda | R$ 3.000 / R$ 72.000 |
| SLA contratado | % + período | 99,7% mensal |
| Tempo de reparo / de resposta | horas | 4 h / 30 min |
| Janela de manutenção (aviso prévio) | texto | 2 por ano, ≤ 4 h, aviso de 15 dias |
| Fórmula de glosa / multa | texto | Proporcional; multa de 2% por reincidência |
| Gestor / fiscal técnico | texto | Nome do gestor / técnico (fiscal de apoio) |
| Contato de chamados / escalonamento | texto | 0800…, NOC, gerente de contas |
| Chamados no mês (qtd., protocolos) | nº / texto | 2 – #12345, #12388 |
| Minutos parados (Ti) | nº | 300 |
| Disponibilidade medida | fórmula =(43200−Ti)/43200 | 99,31% |
| Cumpriu o SLA? | fórmula SE | NÃO |
| Glosa calculada | fórmula =Cm×Ti/43200 | R$ 20,83 |
| Evidências (pasta, link) | texto | \\servidor\contratos\045 |
| Observações / ocorrências | texto | Rompimento de cabo na BR-174 |

Para contratos de postes (receita), colunas extras: nº de pontos ocupados, preço por ponto, inadimplência, projeto aprovado (S/N), ocupação irregular.

### Checklist de aceite de obra

1. Ordem de serviço e projeto aprovado. Conferir se o executado bate com o projeto (traçado, postes, vãos).
2. **Boletim de medição** com quantidades conferidas em campo:
   - metros de cabo, por tipo e número de fibras;
   - caixas de emenda (CEO) e caixas de terminação (CTO);
   - fusões, reservas técnicas, ferragens e plaquetas.
3. **Relatório fotográfico** georreferenciado: antes e depois, caixas abertas, identificação nos postes.
4. **OTDR (reflectômetro óptico no domínio do tempo, *Optical Time-Domain Reflectometer*) bidirecional**, em 1310 e 1550 nm, para cada fibra. A média dos dois sentidos corrige "ganhos" aparentes [20]. Arquivos .SOR originais.
5. **Power meter / fonte de luz** (perda total do enlace) dentro do orçamento óptico de projeto.
6. Perda por emenda dentro do limite do contrato (típico < 0,1 dB [19]) e perda por conector conforme o contrato. **CONFIRMAR NA EMPRESA**.
7. **Mapa de fusão**: qual fibra do tubo liga em qual fibra, em cada caixa.
8. **As built** (como construído): desenho do que foi realmente executado.
   - Formatos: DWG (CAD), KMZ (Google Earth), GeoPackage/Shapefile (SIG).
   - **CONFIRMAR NA EMPRESA** o formato aceito pelo sistema de cadastro.
9. Identificação: plaquetas nos postes e etiquetas nas caixas e nos DIO.
10. Ocupação dos postes conforme a norma da distribuidora (altura, faixa de ocupação).
11. Limpeza do local e devolução de sobras de material.
12. Pendências listadas → **termo de aceite provisório**. Depois do prazo de observação, sem defeitos → **termo de aceite definitivo** [1].
13. Garantia: prazo, início da contagem e caução ou retenção. **CONFIRMAR NA EMPRESA**.

### Divergências / Confirmar na empresa

- **RGC × contrato corporativo.** O RGC alcança pessoa jurídica, mas contratos negociados B2B costumam ter SLA próprio. Não achei no texto do RGC uma exclusão expressa para "contratos negociados". **CONFIRMAR** com o jurídico se a operadora aplica o RGC aos links da distribuidora.
- **RQUAL (Res. 717/2019).** Mede a qualidade (IQS, selo A–E) por município e por serviço, com foco no varejo [24]. Não substitui o SLA do contrato.
- **Inconsistência num TR.** O TR do TJAL escreve "99,5% (noventa e nove vírgula **sete** por cento)" [6]. Mostra como é preciso conferir número e extenso.
- **Edital com dois SLAs.** Um edital trazia glosa abaixo de 99,7% e, em outro item, SLA de 99% [23].
- **Momento em que o relógio começa.** Pode ser a abertura do chamado [6] ou a primeira falha registrada [3].
- **IST.** Valores de 2026 só em fonte secundária (Teleco); a extração da página ficou confusa [13]. A Anatel não divulgou série acessível. **CONFIRMAR** o índice e a data-base em cada contrato.
- **IRU.** Prazo de 20 anos é dado internacional [18]. No Brasil, a cessão da RNP usa outro modelo [25].
- **Postes.** O preço de R$ 3,19 é "referência", não teto, segundo decisões do TJBA [11]. A nova norma está pendente [12]. **CONFIRMAR** o modelo de contrato de ocupação que a distribuidora usa.
- **Termos públicos de SLA de Embratel, Claro, Vivo, TIM e Algar não foram encontrados** (página da Vivo retornou 403). **CONFIRMAR** os SLAs reais nos contratos assinados.
- **Hierarquia interna** (quem é gestor e quem é fiscal; alçada para aplicar glosa ou multa): **CONFIRMAR NA EMPRESA**.

### Lições propostas

1. **"Quanto é 99,7%?" (10 min)**
   - Objetivo: converter % de disponibilidade em minutos de parada.
   - P1: 99,5% em um mês = ? (216 min).
   - P2: SLA anual × mensal.
   - SVG: barra horizontal de 43.200 min, com a fatia vermelha da parada permitida para 99,5%, 99,7% e 99,9%.
2. **"A glosa na prática" (15 min)**
   - Objetivo: calcular o desconto e saber o que não entra na conta.
   - P1: Dc com Cm = R$ 2.000 e Ti = 216 min (R$ 10,00).
   - P2: falta de energia no cliente entra na conta? (não [6]).
   - SVG: fluxograma "chamado → apuração de Ti → exclusões → D% → compara com o SLA → glosa → memória de cálculo".
3. **"Gestor × fiscal" (10 min)**
   - Objetivo: separar os papéis.
   - P1: quem registra a ocorrência? (fiscal).
   - P2: quem assina o aceite definitivo? (gestor).
   - SVG: organograma com gestor no topo, fiscais técnico e administrativo abaixo e o fornecedor ao lado.
4. **"Tipos de contrato de telecom" (15 min)**
   - Objetivo: diferenciar link IP, L2/MPLS, fibra apagada/IRU, lambda, construção, manutenção e postes.
   - P1: IRU com O&M separado.
   - P2: postes = receita.
   - SVG: matriz "quem opera os equipamentos × quem é dono da fibra".
5. **"Aceite de obra óptica" (15 min)**
   - Objetivo: seguir o checklist.
   - P1: por que fazer OTDR bidirecional?
   - P2: o que é as built.
   - SVG: traço de OTDR estilizado (conector, emenda, fim da fibra) e caixa de emenda com mapa de fusão.
6. **"Chamado e escalonamento" (10 min)**
   - Objetivo: abrir um chamado com evidências e escalar N1 → N2 → N3 → gerente de contas.
   - P1: incidente × problema × requisição.
   - SVG: escada de escalonamento com o tempo em cada degrau. Os tempos são **CONFIRMAR NA EMPRESA**.

### Exemplos de questões

1. **SLA mensal de 99,7% (30 dias) permite quantos minutos de parada?**
   - a) 43,2 — errada: corresponde a 99,9%.
   - **b) 129,6 — certa:** 0,3% de 43.200 min.
   - c) 216 — errada: corresponde a 99,5%.
   - d) 302,4 — errada: corresponde a 99,3%.
2. **Link de R$ 4.320/mês ficou 100 min parado. Desconto proporcional (Dc = Cm × Ti / 43.200):**
   - a) R$ 1,00 — errada: dividiu duas vezes.
   - **b) R$ 10,00 — certa:** 4.320 × 100 / 43.200.
   - c) R$ 100,00 — errada: confundiu minutos com reais.
   - d) R$ 432,00 — errada: aplicou 10% fixo.
3. **Quem faz o recebimento definitivo, pelo modelo do Decreto 11.246?**
   - a) Fiscal técnico — errada: ele apoia e registra.
   - **b) Gestor do contrato — certa:** art. 21, IX [2].
   - c) Fornecedor — errada: ele não aceita a própria obra.
   - d) Fiscal administrativo — errada: cuida de documentos e regularidade.
4. **Usuários não conseguem acessar um sistema = ?**
   - **a) Incidente — certa:** interrupção não planejada do serviço.
   - b) Problema — errada: é a causa de um ou mais incidentes.
   - c) Requisição — errada: é um pedido rotineiro.
   - d) Mudança — errada: alteração planejada.
5. **O que é EILD?**
   - a) Banda larga residencial — errada.
   - **b) Linha dedicada fornecida de uma prestadora para outra — certa** [9].
   - c) Contrato de ocupação de postes — errada.
   - d) Selo de qualidade — errada: isso é do RQUAL.
6. **Para que serve o OTDR bidirecional no aceite?**
   - a) Medir a velocidade da internet — errada.
   - **b) Fazer a média dos dois sentidos e eliminar ganhos e perdas aparentes nas emendas — certa** [20].
   - c) Substituir o as built — errada.
   - d) Medir latência — errada.

### Termos para o glossário

| Sigla | Português | Inglês | Definição |
|---|---|---|---|
| SLA / ANS | Acordo de nível de serviço | Service Level Agreement | Metas de serviço (disponibilidade, reparo) e consequências previstas no contrato |
| NMS | Nível mínimo de serviço | — | Termo usado nos contratos públicos para as metas do SLA |
| MTTR | Tempo médio de reparo | Mean Time To Repair | Média do tempo entre a falha e o restabelecimento |
| — | Glosa | — | Desconto ou retenção no pagamento por serviço não prestado ou fora do padrão |
| IRU | Direito irrevogável de uso | Indefeasible Right of Use | Cessão de longo prazo do uso de fibras ou capacidade |
| — | Fibra apagada | Dark fiber | Fibra cedida sem equipamentos; quem a recebe "acende" |
| O&M | Operação e manutenção | Operation & Maintenance | Contrato de manutenção da rede, em geral separado do IRU |
| EILD | Exploração Industrial de Linha Dedicada | — | Linha dedicada vendida no atacado entre prestadoras |
| IST | Índice de Serviços de Telecomunicações | — | Índice de preços da Anatel usado em reajustes |
| RGC | Regulamento Geral de Direitos do Consumidor | — | Res. Anatel 765/2023 |
| RQUAL | Regulamento de Qualidade | — | Res. Anatel 717/2019 (IQS, selo A–E) |
| OTDR | Reflectômetro óptico no domínio do tempo | Optical Time-Domain Reflectometer | Mede perdas e eventos ao longo da fibra |
| — | As built | As built | Projeto atualizado do que foi realmente construído |
| N1/N2/N3 | Níveis de suporte | Support tiers | Escalonamento técnico crescente |
| — | Incidente / Problema / Requisição | Incident / Problem / Service request | Categorias do ITIL [26] |
| RTT | Tempo de ida e volta | Round Trip Time | Latência medida em ida e volta |

### Vídeos em português (verificados) ou termos de busca

Não verifiquei nenhum vídeo (título e canal). Termos de busca sugeridos:

- "gestão e fiscalização de contratos Lei 14.133 gestor fiscal"
- "cálculo de disponibilidade SLA link dedicado"
- "OTDR bidirecional certificação fibra óptica"
- "as built rede óptica KMZ"
- "ITIL 4 incidente problema requisição"
- "compartilhamento de postes Anatel ANEEL"

### Fontes

1. Lei 14.133/2021 — Planalto — https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm — 06/11/2026. Os artigos 117 e 140 foram citados de memória e não reconferidos: o site do Planalto não respondeu.
2. Decreto 11.246/2022 (texto atualizado) — Câmara dos Deputados — https://www2.camara.leg.br/legin/fed/decret/2022/decreto-11246-27-outubro-2022-793362-normaatualizada-pe.pdf — 06/11/2026
3. TR Anexo I, Serviço de acesso à internet — TRT-7 — https://www.trt7.jus.br/artefatos_tic/2022/ (arquivo 2022.TIC028.CITIC.TR.ANEXOI) — 06/11/2026
4. TR SEI 90012322 — CEASA-GO — https://goias.gov.br/ceasa/wp-content/uploads/sites/48/2026/05/SEI_90012322_Termo__de__Referencia.pdf — 06/11/2026 (via resumo de busca)
5. Anexo I-A, Acordo de Nível de Serviço — IF Sul de Minas — https://portal.mch.ifsuldeminas.edu.br/images/ANEXO_IA_-_ACORDO_DE_NÍVEL_DE_SERVIÇO.pdf — 06/11/2026
6. TR Link — TJAL — https://diati.tjal.jus.br/wp-content/uploads/2024/TR-Link2.pdf — 06/11/2026
7. Apresentação "Novo RGC" (Anatel, 07/10/2025) — ALMG — https://mediaserver.almg.gov.br/acervo/447/546/2447546.pdf — 06/11/2026
8. Manual Operacional do RGC, v4 (jun/2025) — Anatel (hospedado pela Claro) — https://www.claro.com.br/files/104379/x/e94cf9c977/manual-operacional-do-rgc-consolidado_versaojunho_2025.pdf — 06/11/2026
9. Resolução Anatel 590/2012 (EILD) — LegisWeb — https://www.legisweb.com.br/legislacao/?id=241429 — 06/11/2026 (via resumo de busca)
10. Notícia: proposta de resolução conjunta sobre postes aprovada pela ANEEL — ANEEL — https://www.gov.br/aneel/pt-br/assuntos/noticias/2025/proposta-de-resolucao-conjunta-sobre-compartilhamento-de-postes-e-aprovada-pela-aneel-e-segue-para-decisao-da-anatel — 06/11/2026
11. "Sem mexer no preço, Anatel e Aneel buscam nova regra" — Convergência Digital — https://convergenciadigital.com.br/telecom/sem-mexer-no-preo-anatel-e-aneel-buscam-nova-regra-para-ocupao-de-postes/ — 06/11/2026
12. "Aneel buscará Anatel para acelerar resolução conjunta" — Poder360 (out/2026) — https://www.poder360.com.br/poder-infra/aneel-buscara-anatel-para-acelerar-resolucao-conjunta-sobre-uso-de-postes/ — 06/11/2026
13. Tarifas / IST — Teleco — https://teleco.com.br/tarifafixo2.asp — 06/11/2026
14. Código Civil (Lei 10.406/2002), art. 618 — Planalto — https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm — 06/11/2026 (citado de memória)
15. "Receita das elétricas com postes cresce quase 700%" — Teletime — https://teletime.com.br/29/01/2026/receita-das-eletricas-com-postes-cresce-quase-700-em-nove-anos/ — 06/11/2026
16. Lei 9.472/1997 (LGT), art. 73 — Planalto — https://www.planalto.gov.br/ccivil_03/leis/l9472.htm — 06/11/2026 (citado de memória)
17. Comunicado de reajuste 2026 — Baldussi — https://baldussi.com.br/comunicado-institucional-reajuste-anual-de-telecomunicacoes-2026/ — 06/11/2026
18. Indefeasible rights of use — Wikipedia (EN) — https://en.wikipedia.org/wiki/Indefeasible_rights_of_use — 06/11/2026
19. AN3060, nota de aplicação sobre emendas — Corning — https://www.corning.com/media/worldwide/coc/documents/Fiber/application-notes/AN3060.pdf — 06/11/2026
20. Medição bidirecional com OTDR — Yokogawa — https://tmi.yokogawa.com/br/library/resources/application-notes/otdr-two-way-optical-fiber-measurement — 06/11/2026
21. TR SEI 0984103 — CRC-BA (2026) — https://www.crcba.org.br/wp-content/uploads/2026/02/SEI_0984103_Termo_de_Referencia-1.pdf — 06/11/2026
22. Manifestação sobre impugnação da Claro, PE 90006/2026 — SUDAM — https://www.gov.br/sudam/pt-br/acesso-a-informacoes/licitacoes-e-contratos/licitacoes-e-contratos-1/andamento/2026/Manifestacao_CGTIC_Impugnacao_CLARO_PE90006_2026.pdf — 06/11/2026
23. Pedido de esclarecimento da Telefônica — CRE-AMS — https://transparencia.creams.org.br/wp-content/uploads/2023/03/01.-Pedido-de-esclarecimento-Telefonica.pdf — 06/11/2026 (via resumo de busca)
24. Qualidade: dúvidas frequentes — Anatel — https://www.gov.br/anatel/pt-br/dados/qualidade/qualidade-dos-servicos/duvidas-frequentes/ — 06/11/2026
25. Termo de cessão de fibras da Infovia 01 — RNP — https://www.rnp.br/arquivos/documents/ANEXO%20I%20-%20Termo%20de%20Cess%C3%A3o%20do%20Direito%20de%20Uso%20de%20Par%20de%20Fibras%20%C3%93pticas%20da%20Infovia%2001%20e%20outras%20aven%C3%A7as.pdf — 06/11/2026
26. Incidentes × problemas no ITIL — Global Knowledge (fonte secundária; o glossário oficial PeopleCert/Axelos não foi acessado) — https://www.globalknowledge.com/en-us/resources/articles/how-itil-differentiates-problems-and-incidents — 06/11/2026
27. Orientação para contratação de serviços de comunicação de dados — SGD/gov.br — https://www.gov.br/governodigital/pt-br/contratacoes-de-tic/legislacao/orientacao-para-contratacao-servicos-de-comunicacao-de-dados — 06/11/2026


---

## Bloco 10 — Segurança

> **AVISO DO APP (exibir sempre):** o conteúdo de segurança deste app é **LEMBRETE de estudo**. Não substitui treinamento, APR/AR, Permissão de Trabalho, procedimento da empresa nem a orientação do supervisor. Na dúvida, **pare e pergunte**.

### Resumo
- **NR-10 em transição.** O texto que vale hoje (06/11/2026) é o de 2004, com as alterações de 2016 [1]. Já existe uma **nova NR-10**, aprovada pela Portaria MTE nº 737/2026 (DOU de 01/06/2026), que **entra em vigor em ~01/06/2027** [2][3]. A tabela de raios do **Anexo II** é **idêntica nas duas versões** [1][2]. A nova norma cria definições de *compartilhamento de infraestrutura* (postes) e um treinamento “específico de compartilhamento de infraestrutura do SEP” (40 h) [2].
- **Telecom no poste é trabalho em proximidade.** A norma de compartilhamento da Neoenergia (com base na NBR 15688) fixa **0,6 m** como distância mínima entre condutores de BT (≤1 kV) e cabos de telecom [15]. A NR-10 define a zona controlada da BT com **Rc = 0,70 m** [1]. *Inferência:* quem trabalha no cabo de telecom tende a estar **dentro da zona controlada da BT**, ou seja, em **trabalho em proximidade**, que exige trabalhador **autorizado** [1].
- **NR-35** tem redação nova desde 03/07/2023 (Portaria MTP 4.218/2022) [4]. Desde 16/07/2026 os **treinamentos devem ser presenciais** (Portaria MTE 1.259/2026; prazo de 1 ano para refazer ou complementar) [5].
- **Fibra:** os maiores riscos práticos são **fragmentos de vidro** e **luz infravermelha invisível** [8]. O álcool isopropílico (IPA) tem ponto de fulgor de **~12 °C** (H225) [12], e no calor de Roraima ele **sempre** está acima disso.

### Fatos e valores de referência
| Afirmação | Valor | Fonte | Acesso | Confiança |
|---|---|---|---|---|
| Texto da NR-10 em vigor hoje | Port. 598/2004 + MTPS 508/2016 | [1] | 06/11/2026 | Alta |
| Nova NR-10 | Port. MTE 737, de 29/05/2026, DOU 01/06/2026; vigência 1 ano após a publicação; revoga a 598/2004 e a 508/2016 | [2][3] | 06/11/2026 | Alta |
| Trabalho em proximidade | O trabalhador “pode entrar na zona controlada, ainda que seja com uma parte do seu corpo ou com extensões condutoras” | [1] glossário 28 | 06/11/2026 | Alta |
| Quem pode entrar na zona controlada (ZC) ou na zona de risco (ZR) | Somente profissionais **autorizados** (na ZR, também com técnicas e instrumentos apropriados) | [1] glossário 30–31 | 06/11/2026 | Alta |
| Autorização | Exige trabalhador capacitado, qualificado ou habilitado, com curso do Anexo III, aproveitamento satisfatório e anuência da empresa | [1] 10.8.8.1 | 06/11/2026 | Alta |
| Curso básico / complementar SEP | 40 h / 40 h (o SEP exige o básico como pré-requisito) | [1] Anexo III | 06/11/2026 | Alta |
| Reciclagem NR-10 (texto atual) | Bienal; também ao trocar de função, voltar de afastamento >3 meses ou em mudanças significativas | [1] 10.8.8.2 | 06/11/2026 | Alta |
| Reciclagem NR-10 (texto novo, a partir de 2027) | Bienal, **mínimo de 16 h**; eventual após afastamento >90 dias | [2] 10.9.10–11 | 06/11/2026 | Média (fonte secundária) |
| Suspensão do serviço | Serviços em instalações energizadas ou nas proximidades devem ser suspensos de imediato na iminência de perigo | [1] 10.6.3 | 06/11/2026 | Alta |
| Distância entre BT e telecom | ≤1 kV: 0,6 m; 1–15 kV: 1,5 m; 15–36,2 kV: 1,8 m | [15] Tab. 2 | 06/11/2026 | Média (norma de outra distribuidora) |
| Ocupante do poste e NR-10 | “os empregados da Ocupante devem cumprir os requisitos da NR-10” | [15] 6.8.3 | 06/11/2026 | Alta |
| Campo de aplicação da NR-35 | Diferença de nível **acima de 2,0 m**, com risco de queda | [4] 35.2.1 | 06/11/2026 | Alta |
| Treinamento NR-35 | Inicial ≥8 h; periódico **a cada 2 anos**, ≥8 h; **presencial** | [4] 35.4.2.1–2; [5] 35.4.5 | 06/11/2026 | Alta |
| Análise de risco (AR) e Permissão de Trabalho (PT) | Todo trabalho em altura exige AR. A rotina pode ficar no procedimento operacional; o trabalho não rotineiro exige PT, válida por turno ou jornada | [4] 35.5.5–35.5.8.2 | 06/11/2026 | Alta |
| SPIQ (proteção individual contra quedas) | Tipos: restrição de movimentação, retenção de queda, posicionamento e acesso por cordas. Na retenção, cinto paraquedista com talabarte e absorvedor; impacto máximo de **6 kN** | [4] 35.6.4, 35.6.9, 35.6.11 | 06/11/2026 | Alta |
| Talabarte | Proibido ligar talabarte a outro talabarte ou usar com nós ou laços (salvo indicação do fabricante) | [4] 35.6.11.1.1 | 06/11/2026 | Alta |
| Inspeção do SPIQ | Rotineira antes de cada uso; periódica pelo menos a cada 12 meses | [4] 35.6.6 | 06/11/2026 | Alta |
| Escada | Uso como acesso ou posto de trabalho exige análise de risco antes (Anexo III da NR-35) | [5] art. 2º | 06/11/2026 | Alta |
| NR-01 (GRO/PGR) | Riscos psicossociais exigidos no PGR desde 26/05/2026 | [7] | 06/11/2026 | Média |
| Microscópio de inspeção | Deve ter **filtro infravermelho**. Confirme com o medidor de potência que a fibra está “escura” | [8] | 06/11/2026 | Alta |
| VFL (localizador visual de falhas) | 650 nm. Em geral classe 2 até 1 mW; os modelos de 10–50 mW são classe 3B | [10][11] | 06/11/2026 | Média |
| Hazard Level (IEC 60825-2) | Local sem restrição: até 1M/2M. Local restrito: até 3R. Local controlado: até 3B | [9] | 06/11/2026 | Média (resumo de emenda) |
| FDS do IPA ≥99% | H225, H319, H336; fulgor 11,85 °C (vaso fechado); limites de inflamabilidade 2–12 % v/v; autoignição ~399 °C | [12] | 06/11/2026 | Alta |
| Calor | NR-15 Anexo 3 usa a NHO 06 (Fundacentro, 3ª ed. 2025) | [18][19] | 06/11/2026 | Média |
| Sinalização de obra na via | MBST Vol. VII (Sinalização Temporária), dentro da Res. CONTRAN 973/2022 | [20][21] | 06/11/2026 | Alta |

**Tabela completa do Anexo II da NR-10 (raios em metros; tensão em kV)** [1][2]:

| Faixa de tensão | Rr | Rc | Faixa de tensão | Rr | Rc |
|---|---|---|---|---|---|
| <1 | 0,20 | 0,70 | ≥45 e <60 | 0,83 | 1,83 |
| ≥1 e <3 | 0,22 | 1,22 | ≥60 e <70 | 0,90 | 1,90 |
| ≥3 e <6 | 0,25 | 1,25 | ≥70 e <110 | 1,00 | 2,00 |
| ≥6 e <10 | 0,35 | 1,35 | ≥110 e <132 | 1,10 | 3,10 |
| **≥10 e <15 (13,8 kV)** | **0,38** | **1,38** | ≥132 e <150 | 1,20 | 3,20 |
| ≥15 e <20 | 0,40 | 1,40 | ≥150 e <220 | 1,60 | 3,60 |
| ≥20 e <30 | 0,56 | 1,56 | ≥220 e <275 | 1,80 | 3,80 |
| **≥30 e <36 (34,5 kV)** | **0,58** | **1,58** | ≥275 e <380 | 2,50 | 4,50 |
| ≥36 e <45 | 0,63 | 1,63 | ≥380 e <480 | 3,20 | 5,20 |
| | | | ≥480 e <700 | 5,20 | 7,20 |

- **Rr** é o limite entre a zona de risco e a zona controlada. **Rc** é o limite entre a zona controlada e a zona livre.
- Em sistemas trifásicos, a tensão considerada é a tensão entre fases [2].
- **Os raios não substituem a distância de segurança definida no procedimento da empresa.**

### Checklist "antes de subir no poste"
*Lembrete. Siga a AR/APR, a PT e o procedimento da empresa.*
1. Estou com a autorização NR-10 (incluindo SEP) e NR-35 válida e com o ASO apto para altura? [1 10.8.8.1][4 35.4.1, 35.4.4.1]
2. A AR/APR da tarefa está feita e foi lida pela equipe? A PT está emitida, se for trabalho não rotineiro? [4 35.5.5, 35.5.7]
3. O clima está bom? Se houver chuva, raios ou vento forte: **não subo** ou desço. [1 10.6.3][4 35.5.5.1 d]
4. Identifiquei a tensão da rede (BT, 13,8 kV, 34,5 kV) e as distâncias de 0,70 m, 1,38 m e 1,58 m (Rc)? [1 Anexo II]
5. Testei a cordoalha, o mensageiro e as ferragens com detector de tensão antes de tocar? *CONFIRMAR NA EMPRESA* [8][15]
6. O poste está íntegro (base, fissuras, inclinação)? A escada está inspecionada e bem amarrada? [4 35.5.5.1 a; 5]
7. Inspecionei o cinto paraquedista, o talabarte de posicionamento, o talabarte com absorvedor e os conectores? [4 35.6.6.2]
8. Vou ficar conectado o tempo todo, sem ligar um talabarte no outro? [4 35.6.11 a; 35.6.11.1.1]
9. A área está isolada e a via sinalizada (cones e placas do Vol. VII)? [4 35.5.5.1 b][21]
10. Verifiquei se há abelhas, marimbondos ou animais no poste e na caixa? *CONFIRMAR NA EMPRESA*
11. Tenho água, protetor e pausas planejadas por causa do calor? [19]
12. Sei quem faz o resgate, quanto tempo leva e como me comunico com a equipe? [4 35.7.1, 35.5.5.1 l]
13. As ferramentas estão presas (porta-ferramentas, sacola) para não cair? [4 35.5.5.1 f]

### Checklist de segurança na fusão/teste óptico
*Lembrete.*
1. Trate toda fibra como **ativa**: confirme com o medidor de potência antes de olhar a ponta. [8]
2. Nunca olhe a ponta nem o conector a olho nu. Use só microscópio com filtro IR ou um inspetor de vídeo. [8]
3. Com o VFL, olhe de lado, a ≥15 cm; não aponte para os olhos. Confira a classe na etiqueta. [8][10]
4. OTDR, OLT e fontes devem ficar desligados ou desconectados antes de manusear os cordões. *CONFIRMAR NA EMPRESA* [9]
5. Use óculos de segurança com proteção lateral. [8]
6. Coloque os fragmentos num recipiente fechado e identificado; nunca no chão nem no bolso. [8]
7. Não coma, não beba e não fume na área; lave as mãos ao terminar. [8]
8. IPA: use pouca quantidade, com ventilação, longe de chama e faísca (máquina de fusão com arco!), e feche o frasco. [12]
9. Gel: limpe com o removedor indicado e luvas; lave a pele com água e sabão. [13][14]
10. No veículo: IPA em frasco original fechado, longe do sol direto. *CONFIRMAR NA EMPRESA* [12 seção 7]
11. Não faça fusão em local onde gases possam se acumular (caixa subterrânea): ventile antes. [8]

### Divergências / Confirmar na empresa
- **NR-10 nova × atual.** Até ~01/06/2027 vale o texto de 2004/2016 [1][2]. Pela nova norma, a reciclagem passa a ter mínimo de 16 h e há indicação de carga presencial [2][3]. **Ainda não existe manual de interpretação**: a comissão tripartite (CNTT) o está preparando [3].
- **Enquadramento de telecom.** A inferência de que a fibra ou cordoalha fica na ZC da BT depende do padrão do poste. *CONFIRMAR NA EMPRESA* o padrão de ocupação da distribuidora de Roraima. Não achei a norma pública dela: usei como referência a da Neoenergia [15] e a Res. Conjunta 4/2014 [16]. As regras novas de compartilhamento (ANEEL 2025) dependem da Anatel [16].
- **NR-35 Anexo III (escadas).** Foi revogado em 2023, recriado pela Port. 1.680/2025 e alterado em 07/2026 [4][5][6]. A Port. 1.259 cita a 1.680 “de 2026” no preâmbulo e “de 2025” no art. 6º, provavelmente erro de digitação [5].
- **Classe do VFL.** Há produtos de 1 mW rotulados como classe 2 e outros como 3R [10][11]. Vale a etiqueta do equipamento.
- **Ponto de fulgor do IPA.** Vaso fechado: 11,85–12 °C. Vaso aberto: 17–21 °C. A diferença vem do método [12].
- **Fragmentos de fibra.** A FOA prefere recipiente fechado a fita adesiva [8].
- **Data da NR-01 psicossocial.** As fontes citam 25 ou 26/05/2026 [7].
- **CONFIRMAR NA EMPRESA:**
  - lista de EPIs (luva isolante? capacete classe B? vestimenta anti-arco?);
  - modelo de APR e quem a assina;
  - quando é exigida PT;
  - plano de resgate em poste;
  - procedimento para cordoalha energizada;
  - acesso a usinas e subestações: autorização, acompanhante, rota segura, ZC dos barramentos de 13,8 a 230 kV (Rc de 1,38 a 3,80 m) e campos eletromagnéticos (o curso básico da NR-10 cobre esse tema [1]).

### Lições propostas
1. **“Onde termina a zona livre”** (12 min). *Objetivo:* ler o Anexo II e aplicar ao poste. *P1:* qual é o Rc de 13,8 kV? (1,38 m) *P2:* o cabo de telecom está a 0,6 m da BT: estou na ZC? (sim, porque 0,6 < 0,70)
   ```svg
   <svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><circle cx="120" cy="70" r="60" fill="#fde68a"/><circle cx="120" cy="70" r="25" fill="#f87171"/><circle cx="120" cy="70" r="4" fill="#000"/><text x="105" y="74" font-size="9">ZR</text><text x="160" y="40" font-size="9">ZC</text><text x="200" y="20" font-size="9">ZL</text><text x="124" y="60" font-size="8">Rr</text><text x="150" y="80" font-size="8">Rc</text></svg>
   ```
2. **“Altura: AR, PT e SPIQ”** (12 min). *P1:* a partir de quantos metros vale a NR-35? (>2 m) *P2:* qual é a validade da PT? (o turno ou a jornada)
   ```svg
   <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="95" y="10" width="10" height="150" fill="#9ca3af"/><circle cx="80" cy="60" r="8" fill="#60a5fa"/><path d="M80 68 v30" stroke="#000"/><path d="M80 80 Q100 85 105 80" stroke="#f59e0b" fill="none" stroke-width="2"/><text x="110" y="84" font-size="8">talabarte de posicionamento</text><path d="M80 72 Q100 40 105 30" stroke="#ef4444" fill="none" stroke-width="2"/><text x="110" y="32" font-size="8">retenção de queda (absorvedor)</text></svg>
   ```
3. **“A luz que você não vê”** (10 min). *P1:* 1310 e 1550 nm são visíveis? (não, são infravermelho) *P2:* o que fazer antes de inspecionar o conector? (medir a potência e usar microscópio com filtro ou inspetor de vídeo)
   ```svg
   <svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="20" width="60" height="20" fill="#6366f1"/><text x="5" y="34" font-size="8" fill="#fff">400 nm</text><rect x="60" y="20" width="60" height="20" fill="#ef4444"/><text x="62" y="34" font-size="8">650 nm VFL</text><rect x="120" y="20" width="120" height="20" fill="#374151"/><text x="125" y="34" font-size="8" fill="#fff">1310 / 1550 nm – invisível</text></svg>
   ```
4. **“Bancada limpa: fragmentos, IPA e gel”** (10 min). *P1:* onde descartar o fragmento? (recipiente fechado) *P2:* por que o IPA é perigoso perto da máquina de fusão? (fulgor de ~12 °C e arco elétrico)
   ```svg
   <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="20" width="50" height="50" fill="#d1d5db"/><text x="12" y="16" font-size="8">pote fechado</text><rect x="80" y="30" width="30" height="40" fill="#93c5fd"/><text x="78" y="26" font-size="8">IPA</text><path d="M150 40 l10 -20 l10 20 z" fill="#f97316"/><text x="135" y="60" font-size="8">chama/arco</text><line x1="115" y1="50" x2="145" y2="50" stroke="#000" stroke-dasharray="3"/></svg>
   ```

### Exemplos de questões
1. **Rc para 13,8 kV?** a) 0,70 m b) **1,38 m ✔** c) 0,38 m d) 1,58 m
   - a) é o Rc da BT.
   - b) correta [1].
   - c) é o Rr de 13,8 kV.
   - d) é o Rc de 34,5 kV.
2. **“Trabalho em proximidade” significa:** a) tocar o condutor b) **poder entrar na ZC com o corpo ou com ferramentas ✔** c) trabalhar a até 2 m da rede d) trabalhar na zona livre
   - a) tocar o condutor é intervenção, não proximidade.
   - b) é a definição do glossário [1].
   - c) o critério é a zona controlada, não “2 m”.
   - d) na zona livre não há proximidade.
3. **Validade da PT da NR-35:** a) 1 semana b) **o turno ou a jornada (pode ser revalidada sem mudanças) ✔** c) 30 dias d) indeterminada
   - b) correta [4 35.5.8.2]. As demais contrariam o item.
4. **Microscópio óptico sem filtro em fibra ativa:** a) seguro, porque a luz é fraca b) seguro em 1550 nm c) **perigoso, porque o IR é invisível e o microscópio concentra a luz ✔** d) só é perigoso com o VFL
   - a), b) e d) ignoram o IR invisível [8].
5. **Treinamento NR-35 hoje:** a) EAD permitido b) **presencial, com periódico bienal de ≥8 h ✔** c) só o inicial d) anual de 4 h
   - b) correta [4][5].
   - a) foi vedado pela Port. 1.259 [5].
   - c) e d) contrariam o item 35.4.2.2.
6. **Chuva forte começando com você no poste:** a) terminar rápido b) **suspender e descer com segurança ✔** c) cobrir a caixa e continuar d) trocar de luva
   - b) cumpre o 10.6.3 [1] e o 35.5.5.1 d [4].
   - As demais mantêm a exposição.

### Termos para o glossário
| Sigla | Português | Inglês | Definição |
|---|---|---|---|
| ZR | Zona de risco | Hazard zone | Área até Rr em volta de parte energizada; só autorizados, com técnica |
| ZC | Zona controlada | Controlled zone | Área entre Rr e Rc; só autorizados |
| ZL | Zona livre | Free zone | Área além de Rc |
| SEP | Sistema Elétrico de Potência | Power system | Geração, transmissão e distribuição até a medição |
| AR/APR | Análise (Preliminar) de Risco | (Preliminary) Hazard Analysis | Estudo dos riscos antes da tarefa |
| PT | Permissão de Trabalho | Work permit | Documento de controle para trabalho não rotineiro |
| SPIQ | Sistema de Proteção Individual contra Quedas | Personal fall protection system | Cinto, talabarte, conectores e ancoragem |
| GRO/PGR | Gerenciamento de Riscos Ocupacionais / Programa de GR | OHS risk management | Exigências da NR-01 |
| FDS/FISPQ | Ficha com Dados de Segurança | SDS | Riscos do produto químico, EPI e armazenamento |
| VFL | Localizador visual de falhas | Visual Fault Locator | Laser vermelho de 650 nm |
| IPA | Álcool isopropílico | Isopropyl alcohol | Solvente de limpeza inflamável |
| HL | Nível de perigo | Hazard Level | Classificação de risco laser num ponto do sistema óptico (IEC 60825-2) |

### Vídeos em português (verificados) ou termos de busca
Nenhum vídeo foi verificado (título e canal oficiais não foram confirmados). Termos de busca:
- “Fundacentro trabalho em altura”
- “Fundacentro NR-10 eletricidade”
- “SENAI NR-35 resgate em poste”
- “segurança fibra óptica fragmentos”
- “inspeção de conector óptico microscópio”

### Fontes
1. NR-10 consolidada (Port. 598/2004, MTPS 508/2016). MTE. https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-10-atualizada-2019-1.pdf (06/11/2026)
2. Portaria MTE nº 737/2026 (nova NR-10, texto integral). Normas Legais. https://www.normaslegais.com.br/legislacao/portaria-mte-737-2026.htm (06/11/2026)
3. “Nova NR-10 entra em vigor a partir de junho de 2027”. O Setor Elétrico. https://www.osetoreletrico.com.br/nova-nr-10-entra-em-vigor-no-pais-a-partir-de-junho-de-2027/ (06/11/2026)
4. NR-35 consolidada (Port. MTP 4.218/2022). MTE. https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/NR35atualizada2023.pdf (06/11/2026)
5. Portaria MTE nº 1.259/2026. MTE. https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2026-1/portaria-mte-no-1-259-alteracao-do-anexo-iii-da-nr-35.pdf (06/11/2026)
6. Portaria MTE nº 1.680/2025. Normas Legais. https://www.normaslegais.com.br/legislacao/portaria-mte-1680-2025.htm (06/11/2026)
7. “8 pontos para entender NR 01 e fatores psicossociais”. CNI. https://noticias.portaldaindustria.com.br/noticias/trabalho/8-pontos-para-entender-nr-01-e-fatores-psicossociais-relacionados-ao-trabalho/ (06/11/2026)
8. Fiber Optic Safety. The Fiber Optic Association. https://www.thefoa.org/tech/safety.htm (06/11/2026)
9. IEC 60825-2 Amd1 (amostra). IEC/iTeh. https://cdn.standards.iteh.ai/samples/13181/dca9a6a5603847b592304856dde678a2/IEC-60825-2-2004-AMD1-2006.pdf (06/11/2026)
10. VFL Safety App Note. Trend Networks. https://www.trend-networks.com/wp-content/uploads/2022/06/VFL-Safety-App-Note-1.pdf (06/11/2026)
11. Manual FFL-100 VFL. Viavi. https://www.viavisolutions.com/fr-fr/support/files/Manual-Visual-Fault-Locator-FFL-100.pdf (06/11/2026)
12. FDS Isopropanol (v1, 01/07/2025). Rauter Química/Fabesul. https://fabesul.com.br/HabilB2B/Catalogo/29302-FISPQ.pdf (06/11/2026)
13. D’Gel FO Cable Gel Remover. LPS. https://assets.testequity.com/te1/Documents/pdf/LPS/lps_61200_dgel_fo_fiber_optic_cable_gel_remover_datasheet.pdf (06/11/2026)
14. SDS cabo gel-filled. trueCABLE. https://cdn.shopify.com/s/files/1/0014/6404/1539/files/trueCABLE-Cat6-Gel-Filled-Direct-Burial-SDS-Sheet.pdf (06/11/2026)
15. DIS-NOR-056 Compartilhamento de Infraestrutura. Neoenergia. https://www.neoenergia.com/documents/d/sp/dis-nor-056-rev01-pdf (06/11/2026)
16. Resolução Conjunta ANEEL/ANATEL nº 4/2014. LegisWeb. https://www.legisweb.com.br/legislacao/?id=279489 (06/11/2026)
17. “NR10 – Trabalhos em proximidade – Telecom” (palestra, A. Bizzo). SEESP. https://www.seesp.org.br/site/images/APRESENTACAO_NR10_x_TELEFONIA_BIZZO.pdf (06/11/2026)
18. NR-15 Anexo 3. MTE. https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-15-anexo-03.pdf (06/11/2026)
19. Fundacentro publica nova edição da NHO 06. CBIC. https://cbic.org.br/artigo-estresse-termico-fundacentro-publica-nova-edicao-da-nho-06-para-avaliar-exposicao-ocupacional-ao-calor/ (06/11/2026)
20. Resolução CONTRAN nº 973/2022. Min. Transportes. https://www.gov.br/transportes/pt-br/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9732022.pdf (06/11/2026)
21. MBST Vol. VII – Sinalização Temporária. DNIT. https://www.gov.br/dnit/pt-br/rodovias/operacoes-rodoviarias/faixa-de-dominio/regulamentacao-atual/microsoft-word-07-mbst-vol-vii-sinaliza_347_343o-tempor_341ria.pdf (06/11/2026)


---

## Bloco 11 — Redes

### Resumo
A fibra é a **camada física** (*physical layer*, camada 1 do modelo OSI): ela leva luz, sem "saber" de IP ou VLAN. Por cima dela, o **Ethernet** (camada 2) monta **quadros** (*frames*) com endereços **MAC**; o **IP** (camada 3) cuida de endereços lógicos e roteamento. Para o técnico de telecom, o essencial é: (1) casar **padrão óptico ↔ tipo de fibra ↔ comprimento de onda (λ)** nas duas pontas; (2) ler a **potência Tx/Rx no DOM** do transceptor; (3) reconhecer as falhas típicas de camada 1/2 (sem luz, λ trocado, velocidade diferente nas pontas, negociação desligada só de um lado); (4) entender o vocabulário da equipe e dos fornecedores: VLAN, trunk, /30, gateway, MPLS, L2VPN. Os valores dos fabricantes (Cisco) e do resumo da FOA **divergem** em alguns alcances. Isso acontece porque a norma IEEE dá o mínimo garantido e o fabricante pode garantir mais (ex.: o 1000BASE-LX vai a 5 km pela IEEE/FOA e a 10 km no módulo Cisco LX/LH).

### Fatos e valores de referência

**Tabela A — Padrões ópticos Ethernet** (alcance = máximo garantido; varia com o grau da fibra)

| Padrão | Fibra | λ | Alcance FOA (IEEE) | Alcance Cisco | Fonte |
|---|---|---|---|---|---|
| 1000BASE-SX | MM OM1 / OM2 / OM3 / OM4 | 850 nm | 275 / 550 / 800 / 880 m | 220 m (62,5 µm) / 550 m (50 µm); até 1 km em 50 µm otimizada para laser | [2], [4] |
| 1000BASE-LX | SM (OS1/OS2) | 1310 nm | 5 km | 10 km (módulo "LX/LH") | [2], [4] |
| 10GBASE-SR | MM OM1/OM2/OM3/OM4 | 850 nm | 33 / 82 / 300 / 450 m | 33 / 82 / 300 / 400 m | [2], [3] |
| 10GBASE-LR | SM G.652 | 1310 nm | 10 km | 10 km | [2], [3] |
| 10GBASE-ER | SM G.652 | 1550 nm | 40 km | 40 km | [2], [3] |
| 25G/40G/100G (SR4, LR4…) | MM (SR) / SM (LR) | 850 / 1310 nm | 100GBASE-SR4: 100 m em OM4; 100GBASE-LR4: 10 km | — (só citar) | [2] |

**Tabela B — Demais fatos**

| Afirmação | Valor | Fonte | Acesso | Confiança |
|---|---|---|---|---|
| Orçamento de perda do canal (FOA): 10GBASE-LR / ER | 6,2 dB / 11,0 dB | [2] | 06/11/2026 | Alta |
| Potência Tx do SFP-10G-LR (Cisco) | −8,2 a +0,5 dBm | [3] | 06/11/2026 | Alta |
| Sensibilidade (Rx mín.) SFP-10G-LR / SFP-10G-SR | −14,4 dBm / −9,9 dBm | [3] | 06/11/2026 | Alta |
| Faixa de λ: SR / LR / ER | 840–860 / 1260–1355 / 1530–1565 nm | [3], [5] | 06/11/2026 | Alta |
| dBm = 10·log(P em mW); com potência zero o switch mostra "N/A" | — | [6] | 06/11/2026 | Alta |
| Alarmes no `show interfaces transceiver`: `++` alarme alto, `+` aviso alto, `-` aviso baixo, `--` alarme baixo | — | [6] | 06/11/2026 | Média (manual antigo do Catalyst 4500) |
| DOM só aparece se o transceptor suportar (padrão SFF-8472) | — | [3], [7] | 06/11/2026 | Alta |
| Comando varia: Catalyst `show interfaces transceiver [detail]`; Nexus `show interface ethX/Y transceiver details`; Cisco SMB `show fiber-ports optical-transceiver` | — | [6], [7], [8] | 06/11/2026 | Média (fóruns + docs SMB) |
| Distância mínima de cabo dos SFP Cisco | 2 m | [4] | 06/11/2026 | Média (cópia de datasheet) |
| Fibra GE Cisco: padrão `no speed nonegotiate` (1000 Mb/s fixo, negocia só flow control/falha remota); `speed nonegotiate` desliga a negociação; duplex não é configurável | — | [9] | 06/11/2026 | Média (knowledge base Cisco) |
| Divergência: a IEEE exige autonegociação (cláusula 37) no 1000BASE-X, mas ela **não escolhe velocidade**. Negociação ligada de um lado e desligada do outro pode deixar o link down mesmo com luz | — | [9], [10] | 06/11/2026 | Média (relatos de campo) |
| Tag 802.1Q: 4 bytes (TPID 0x8100 + TCI com prioridade de 3 bits e VLAN ID de 12 bits); quadro máx. passa de 1518 para 1522 bytes | VID 1–4094 (0 e 4095 reservados) | [11], [12] | 06/11/2026 | Média (guias; norma IEEE é paga) |
| Num trunk 802.1Q, todas as VLANs vão com tag, exceto a **VLAN nativa** (padrão VLAN 1); as duas pontas precisam concordar | — | [12] | 06/11/2026 | Alta |
| Faixas privadas (RFC 1918) | 10.0.0.0/8; 172.16.0.0/12; 192.168.0.0/16 | [13] | 06/11/2026 | Alta |
| CIDR: prefixo /n = n bits de rede | /24 = 256 end. (254 hosts); /29 = 8 (6); /30 = 4 (2) | [14] | 06/11/2026 | Alta |
| /31 em enlace ponto a ponto é permitido (RFC 3021). A operadora pode usar /30 ou /31 | — | [15] | 06/11/2026 | Alta |
| L2VPN: dois tipos, VPWS (ponto a ponto, "fio virtual") e VPLS (multiponto, "LAN virtual") | — | [16] | 06/11/2026 | Alta |
| MPLS encaminha por **rótulo** (*label*) e não pelo IP de destino | — | [17] | 06/11/2026 | Alta |
| Switch de subestação: IEC 61850-3 e IEEE 1613 tratam de robustez (EMC, temperatura, vibração) | — | [18] | 06/11/2026 | Média (fabricante) |

### Mapa para Cisco NetAcad e Aprenda Mais

| Lição do app | Cisco NetAcad (CCNA ITN v7 / SRWE / ENSA) | Network Technician Career Path | Aprenda Mais (MEC/IFRS) |
|---|---|---|---|
| 11.1 Camadas e onde a fibra entra | ITN Mód. 3 Protocols and Models; Mód. 4 Physical Layer (4.5 Fiber-Optic Cabling) [19] | Networking Basics [20] | Redes de Computadores (módulos: redes e topologias; arquitetura e protocolos) [21] |
| 11.2 Ethernet, transceptores e DOM | ITN Mód. 6 Data Link Layer; Mód. 7 Ethernet Switching [19] | Networking Devices and Initial Configuration [20] | Redes de Computadores (transmissão, equipamentos e redes locais) [21] |
| 11.3 VLAN e separação de redes | SRWE Mód. VLANs [19] | Network Support and Security [20] | Redes de Computadores II (switching) [22] |
| 11.4 IPv4, máscara e sub-redes | ITN Mód. 5 Number Systems; Mód. 8 Network Layer; Mód. 11 IPv4 Addressing; Mód. 12 IPv6 (só citar) [19] | Network Addressing and Basic Troubleshooting [20] | Redes de Computadores II (roteadores e IP) [22] |
| 11.5 ping, traceroute e diagnóstico | ITN Mód. 13 ICMP; Mód. 17 Build a Small Network [19] | Network Addressing and Basic Troubleshooting [20] | Redes de Computadores II [22] |
| 11.6 MPLS e L2VPN em contratos | ENSA Mód. WAN Concepts / VPN and IPsec [19] | — | — |

**Cursos de redes no Aprenda Mais** (busca "redes" no portal, 06/11/2026; todos do IFRS, 30 h, sem tutoria, certificado a partir de 5 dias, conclusão até 31/01/2027):
- Redes de Computadores – Turma 2026B: https://aprendamais.mec.gov.br/course/info.php?id=3478
- Redes de Computadores II – Turma 2026B: https://aprendamais.mec.gov.br/course/info.php?id=3479
- Localização de Dispositivos Móveis em Redes Sem Fio – Turma 2026B (fora do foco): https://aprendamais.mec.gov.br/course/view.php?id=3153
- Também aparece "Automação de Sistemas" (turma 2026B, id 3182). Não é de redes, mas pode interessar pela automação de subestação.
- Buscas por "telecomunicações", "fibra", "cabeamento", "internet" e "TCP" **não retornaram nenhum curso**.

**Observação:** NetAcad informa que o antigo curso self-paced foi renovado com o nome **Network Technician Career Path**: 4 cursos, cerca de 70 h, gratuito, preparatório para a certificação CCST Networking [20]. As páginas da NetAcad dependem de JavaScript e não puderam ser lidas automaticamente. A numeração dos módulos vem do *outline* oficial do CCNAv7 (versão 2020) e deve ser **conferida na versão atual do curso**.

### Confirmar na empresa
1. Que padrões e transceptores estão instalados (1000BASE-LX? 10GBASE-LR? BiDi?) e se o DOM é suportado. Quais são os limiares de Rx que a equipe usa como "alerta".
2. Marca e comando dos switches (Cisco IOS, Nexus, SMB, Huawei, switch industrial de subestação).
3. Plano de VLANs (automação/SCADA, corporativa, CFTV, VoIP) e quem pode alterar o trunk.
4. Se a operadora entrega o link como IP (/30 ou /31), como L2 (VPWS/VPLS) ou como MPLS L3VPN, e quais parâmetros constam no contrato (SLA, VLAN de entrega, MTU).
5. Política de ping e traceroute (o ICMP pode estar bloqueado no firewall) e se o técnico pode executar comandos `show`.
6. Se os switches de subestação são certificados IEC 61850-3 / IEEE 1613.

### Lições propostas

**11.1 — Onde a fibra entra (10 min)**
Objetivo: localizar a fibra na camada 1 e dizer o que cada camada acrescenta.
P1: Se o ping falha, mas o LED do link está apagado, em que camada está o problema? (1, física)
P2: A VLAN e o endereço MAC pertencem a qual camada? (2)
```svg
<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg" font-size="11"><rect x="10" y="10" width="140" height="22" fill="#dde"/><text x="15" y="25">7-5 Aplicação (HTTP)</text><rect x="10" y="36" width="140" height="22" fill="#dde"/><text x="15" y="51">4 Transporte (TCP/UDP)</text><rect x="10" y="62" width="140" height="22" fill="#cde"/><text x="15" y="77">3 Rede (IP, roteador)</text><rect x="10" y="88" width="140" height="22" fill="#cec"/><text x="15" y="103">2 Enlace (Ethernet, MAC, VLAN)</text><rect x="10" y="114" width="140" height="22" fill="#fc9"/><text x="15" y="129">1 Física (fibra, SFP, luz)</text><text x="160" y="129">← trabalho do técnico de telecom</text></svg>
```

**11.2 — Padrões ópticos e transceptores (15 min)**
Objetivo: escolher SFP/SFP+ pelo padrão, pela fibra e pela λ; reconhecer QSFP; saber quando usar um conversor de mídia.
P1: Um SFP SX está numa ponta e um LX na outra. O link sobe? (não: λ e fibra diferentes)
P2: Para 10 Gb/s em 25 km de monomodo, qual padrão serve? (ER, 40 km)
```svg
<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" font-size="11"><rect x="5" y="30" width="70" height="30" fill="#ccd"/><text x="10" y="49">Switch A</text><rect x="75" y="38" width="22" height="14" fill="#fc9"/><text x="70" y="75">SFP LR</text><line x1="97" y1="45" x2="223" y2="45" stroke="#f80" stroke-width="3"/><text x="110" y="38">SM 1310 nm ≤10 km</text><rect x="223" y="38" width="22" height="14" fill="#fc9"/><text x="220" y="75">SFP LR</text><rect x="245" y="30" width="70" height="30" fill="#ccd"/><text x="250" y="49">Switch B</text></svg>
```

**11.3 — Ler o DOM e diagnosticar o link (15 min)**
Objetivo: interpretar Tx, Rx, temperatura e alarmes em `show interfaces transceiver detail` e comparar com o datasheet.
P1: Num SFP-10G-LR, o Rx está em −16 dBm. O que isso indica? (abaixo da sensibilidade de −14,4 dBm; procure perda: conector sujo, emenda, curvatura)
P2: O Rx aparece como "N/A". Qual a hipótese inicial? (não chega luz: fibra rompida, Tx invertido com Rx ou ponta remota desligada)
```svg
<svg viewBox="0 0 320 70" xmlns="http://www.w3.org/2000/svg" font-size="11"><rect x="10" y="20" width="300" height="16" fill="#eee"/><rect x="10" y="20" width="60" height="16" fill="#e66"/><rect x="70" y="20" width="200" height="16" fill="#6c6"/><rect x="270" y="20" width="40" height="16" fill="#e66"/><text x="10" y="55">−20</text><text x="62" y="55">−14,4</text><text x="150" y="55">OK</text><text x="262" y="55">+0,5 dBm</text></svg>
```

**11.4 — VLAN: access, trunk e separação (12 min)**
Objetivo: explicar o tag 802.1Q e por que automação, corporativa e CFTV ficam em VLANs separadas (segurança, isolamento de broadcast e prioridade).
P1: Uma porta que leva várias VLANs com tag é do tipo… (trunk)
P2: Uma câmera ligada numa porta access da VLAN 30 envia quadro com tag? (não; quem coloca o tag é o switch, no trunk)
```svg
<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg" font-size="11"><rect x="10" y="10" width="80" height="80" fill="#ccd"/><text x="20" y="30">Switch</text><text x="95" y="25">access V10 → RTU</text><text x="95" y="50">access V20 → PC</text><text x="95" y="75">access V30 → câmera</text><line x1="10" y1="95" x2="310" y2="95" stroke="#f80" stroke-width="3"/><text x="200" y="88">trunk 10,20,30 (tag)</text></svg>
```

**11.5 — IPv4, máscara e sub-redes /24, /29, /30 (15 min)**
Objetivo: calcular a rede, o broadcast e a faixa útil; reconhecer IP privado e gateway.
Exemplo: 10.20.30.0/29 → máscara 255.255.255.248; hosts .1–.6; broadcast .7. Link da operadora 200.x.y.4/30: .5 e .6 úteis.
P1: Quantos hosts cabem num /24? (254)
P2: 172.20.1.1 é público ou privado? (privado, dentro de 172.16/12)
```svg
<svg viewBox="0 0 320 60" xmlns="http://www.w3.org/2000/svg" font-size="11"><rect x="10" y="15" width="270" height="22" fill="#cde"/><text x="15" y="30">29 bits de rede</text><rect x="280" y="15" width="30" height="22" fill="#fc9"/><text x="283" y="30">3</text><text x="10" y="55">2³ = 8 endereços → 6 hosts (rede e broadcast reservados)</text></svg>
```

**11.6 — MPLS e L2VPN no contrato (10 min)**
Objetivo: distinguir VPWS (ponto a ponto) de VPLS (multiponto) e entender que o MPLS é a rede da operadora no meio.
P1: Para ligar só duas subestações em camada 2, qual serviço é o típico? (VPWS)
P2: Para ligar várias unidades como se estivessem numa mesma LAN? (VPLS)
```svg
<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" font-size="11"><ellipse cx="160" cy="45" rx="70" ry="30" fill="#eef" stroke="#88a"/><text x="125" y="49">MPLS operadora</text><rect x="5" y="35" width="55" height="20" fill="#ccd"/><text x="8" y="49">SE-A</text><rect x="260" y="35" width="55" height="20" fill="#ccd"/><text x="263" y="49">SE-B</text><line x1="60" y1="45" x2="90" y2="45" stroke="#f80" stroke-width="2"/><line x1="230" y1="45" x2="260" y2="45" stroke="#f80" stroke-width="2"/></svg>
```

### Exemplos de questões

1. **Qual combinação é compatível?** a) SX com fibra SM a 10 km — errada: o SX usa 850 nm em fibra multimodo. b) **LR com SM a 8 km — certa**: 1310 nm, até 10 km. c) SR com OM3 a 2 km — errada: o limite é cerca de 300 m. d) ER com OM4 — errada: o ER é para monomodo.
2. **No DOM, o Rx = −30 dBm num link LR. O que fazer primeiro?** a) Trocar a VLAN — errada: o problema é de camada 1. b) **Limpar e inspecionar os conectores e medir a perda — certa**: o Rx está muito abaixo de −14,4 dBm. c) Mudar a máscara — errada: é camada 3. d) Reiniciar o roteador da operadora — errada: não ataca a causa provável.
3. **Quantos hosts úteis tem um /30?** a) 4 — errada: esse é o total de endereços. b) **2 — certa**: 4 menos rede e broadcast. c) 6 — errada: esse é o /29. d) 254 — errada: esse é o /24.
4. **O que diferencia uma porta trunk de uma porta access?** a) A velocidade — errada. b) **O trunk transporta várias VLANs identificadas pelo tag 802.1Q — certa**. c) O trunk só funciona em cobre — errada. d) A access usa IPv6 — errada: não tem relação.
5. **Há luz nas duas pontas, mas o link GE em fibra continua down. Qual a causa provável?** a) **A negociação está ligada de um lado e desligada (`speed nonegotiate`) do outro — certa** [9]. b) O endereço IP está errado — errada: o IP não derruba o link físico. c) A VLAN nativa é diferente — errada: isso gera outros sintomas, o link continua up. d) DNS — errada.
6. **Qual endereço é privado pela RFC 1918?** a) 172.32.0.1 — errada: está fora de 172.16–172.31. b) **192.168.10.1 — certa**. c) 8.8.8.8 — errada: é público. d) 100.64.0.1 — errada: é o espaço CGNAT (RFC 6598), não o da RFC 1918.

### Termos para o glossário

| Sigla | Português | Inglês | Definição |
|---|---|---|---|
| OSI | Modelo de referência OSI | Open Systems Interconnection | Modelo de 7 camadas; a fibra fica na camada 1 |
| MAC | Endereço físico | Media Access Control address | Endereço de 48 bits da interface Ethernet |
| SFP/SFP+ | Transceptor plugável | Small Form-factor Pluggable | Módulo óptico de 1 Gb/s (SFP) ou 10 Gb/s (SFP+) |
| QSFP | Transceptor quádruplo | Quad SFP | Módulo de 40/100 Gb/s |
| DOM/DDM | Monitoramento óptico digital | Digital Optical/Diagnostic Monitoring | Leitura de Tx, Rx, temperatura, tensão e corrente de polarização (*bias*) |
| dBm | Decibel-miliwatt | decibel-milliwatt | Potência em relação a 1 mW |
| VLAN | Rede local virtual | Virtual LAN | Divisão lógica de um switch em redes separadas |
| Trunk | Tronco | trunk | Porta que leva várias VLANs com tag |
| CIDR | Prefixo /n | Classless Inter-Domain Routing | Notação da máscara em bits |
| Gateway | Gateway padrão | default gateway | Roteador que leva para fora da sub-rede |
| MPLS | Comutação por rótulos | Multiprotocol Label Switching | Encaminhamento por rótulo na rede da operadora |
| VPWS/VPLS | Serviço de fio / LAN virtual | Virtual Private Wire/LAN Service | L2VPN ponto a ponto / multiponto |
| ICMP | Protocolo de mensagens de controle | Internet Control Message Protocol | Base do ping e do traceroute |

### Vídeos em português (verificados) ou termos de busca
Não encontrei nenhum vídeo em PT-BR com título e canal conferidos nas buscas desta sessão. Termos de busca sugeridos (YouTube):
- "camada física fibra óptica modelo OSI aula"
- "SFP SFP+ diferença transceptor óptico"
- "show interfaces transceiver detail potência óptica"
- "VLAN 802.1Q porta access trunk explicação"
- "cálculo de sub-rede /29 /30 passo a passo"
- "MPLS VPLS VPWS o que é"
Também há a documentação Cisco em PT-BR sobre o status do módulo óptico em switches SMB [8].

### Fontes
1. IEEE 802.3 Ethernet Working Group — https://www.ieee802.org/3/ (acesso 06/11/2026)
2. FOA — "Link Specifications / Fiber Optic Network Standards" — https://www.thefoa.org/tech/Linkspec.htm (06/11/2026)
3. Cisco — "Cisco 10GBASE SFP+ Modules Data Sheet" — https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/data_sheet_c78-455693.html (06/11/2026)
4. Cisco — "Cisco SFP Modules for Gigabit Ethernet Applications" (cópia de datasheet) — https://www3-realm.cisco.com/en/US/prod/collateral/modules/ps5455/ps6577/product_data_sheet0900aecd8033f885.html (06/11/2026)
5. Cisco Community — 10GBASE SFP Modules (legado) — https://community.cisco.com/legacyfs/online/legacy/9/6/7/112769-10GBASE%20SFP%20Modules.pdf (06/11/2026)
6. Cisco Catalyst 4500 Command Reference, "show interfaces transceiver" (via ManualsLib) — https://manualslib.com/manual/441979/Cisco-4500m.html?page=322 (06/11/2026)
7. Cisco Community — "Digital Optical Monitoring (DOM)" — https://community.cisco.com/t5/networking-documents/digital-optical-monitoring-dom/ta-p/3120342 (06/11/2026)
8. Cisco (PT-BR) — "Exibir o status do módulo óptico em um switch" (SMB) — https://bxin.cisco.com/c/pt_br/support/docs/smb/switches/cisco-350x-series-stackable-managed-switches/smb5568-view-the-optical-module-status-on-a-switch-through-the-comma.pdf (06/11/2026)
9. Cisco Community KB — "How to configure the Gigabit Ethernet fiber optic interface…" — https://community.cisco.com/t5/networking-knowledge-base/how-to-configure-the-gigabit-ethernet-fiber-optic-interface-to/ta-p/3116432 (06/11/2026)
10. LKML — discussão sobre autonegociação no 1000BASE-X (DP83869) — https://lkml.iu.edu/2407.0/02013.html (06/11/2026)
11. IEEE 802.1Q (página da norma) — https://standards.ieee.org/ieee/802.1Q/10323/ (06/11/2026); resumo em https://open-exam-prep.com/study-guides/ccna/chapter-2/trunking-802-1q
12. Cisco TechNotes 802.1Q (índice) — https://www.cisco.com/c/en/us/support/docs/lan-switching/8021q/8760-67.html; Cisco Community "native VLANs and tagging" — https://community.cisco.com/t5/switching/native-vlans-and-tagging/td-p/835405 (06/11/2026)
13. IETF — RFC 1918 "Address Allocation for Private Internets" — https://www.rfc-editor.org/rfc/rfc1918 (06/11/2026)
14. IETF — RFC 4632 "Classless Inter-domain Routing (CIDR)" — https://www.rfc-editor.org/rfc/rfc4632 (06/11/2026)
15. IETF — RFC 3021 "Using 31-Bit Prefixes on IPv4 Point-to-Point Links" — https://www.rfc-editor.org/rfc/rfc3021 (06/11/2026)
16. IETF — RFC 4664 "Framework for Layer 2 VPNs" — https://www.rfc-editor.org/rfc/rfc4664 (06/11/2026)
17. IETF — RFC 3031 "MPLS Architecture" — https://www.rfc-editor.org/rfc/rfc3031 (06/11/2026)
18. EtherWAN — "IEC 61850-90-4 vs IEC 61850-3 and IEEE 1613" — https://www.etherwan.com/us/node/1759 (06/11/2026)
19. Cisco NetAcad — CCNAv7 Outline (ITN/SRWE/ENSA), cópia em https://ace.ucv.ro/pdf/stiri/2022/CCNAv7-outline.pdf; curso: https://www.netacad.com/courses/ccna-introduction-networks (06/11/2026)
20. Cisco NetAcad — Network Technician Career Path — https://www.netacad.com/career-paths/network-technician ; Networking Basics — https://www.netacad.com/courses/networking-basics ; Cisco Networking Academy — https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html (06/11/2026)
21. MEC/IFRS — Aprenda Mais, "Redes de Computadores – Turma 2026B" — https://aprendamais.mec.gov.br/course/info.php?id=3478 (06/11/2026)
22. MEC/IFRS — Aprenda Mais, "Redes de Computadores II – Turma 2026B" — https://aprendamais.mec.gov.br/course/info.php?id=3479 (06/11/2026)


---

## Bloco 12 — Carreira

### Resumo

Para quem já tem NR-10, SEP e NR-35, o que mais pesa no trabalho em poste já está coberto. O que falta é **comprovar conhecimento de fibra/FTTH e de redes IP** e, no médio prazo, **resolver o "técnico" formal**. Com orçamento curto, a ordem que dá mais retorno é esta:

1. **Grátis e imediato:** Fiber U (FOA), trilha Cisco NetAcad (Networking Basics → CCNA ITN), cursos EAD da Intelbras Itec e QGIS Training Manual. Tudo pode ser feito em pílulas de 15 a 30 minutos.
2. **Barato e com peso internacional:** o certificado de conclusão do Fiber U (cerca de US$ 20, valor a confirmar) e, em 9 a 12 meses, o **CFOT por certificação direta da FOA (US$ 150)**, depois de juntar experiência documentada no trabalho.
3. **Formal:** o **Técnico Subsequente em Eletrotécnica do IFRR (Boa Vista, noturno, cerca de 18 meses, gratuito)** é o único técnico público e presencial que confirmamos em Boa Vista. Não encontramos Técnico em Telecomunicações em Boa Vista.

Notas de método: todas as páginas foram conferidas em **06/11/2026**. Os portais da Intelbras e do Huawei Talent bloquearam o acesso automático (Cloudflare/403). Os catálogos da NetAcad e da Escola Virtual.Gov carregam por JavaScript, e a busca automática não trouxe resultados filtrados. Onde a página oficial não abriu, o item está marcado como "não confirmado".

### Tabela de cursos e certificações

Legenda de prioridade: **Agora** = nov/2026 a jan/2027 · **90 dias** = fev a abr/2027 · **Depois** = a partir de mai/2027.

| # | Nome | Instituição | Custo | Duração | Certificado | Valor | Prioridade | Link | Conferido em |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Fiber U — Basic Fiber Optics (e depois OSP/FTTH) | FOA (EUA), em inglês | Curso grátis. Certificado de conclusão: US$ 20 (valor de página antiga; a página atual diz apenas "taxa nominal") | Autoestudo; horas não confirmadas | Certificate of Completion em PDF. A FOA aceita como base para pedir o CFOT [1][2] | **Alto**: a FOA é a referência mundial e o curso cobre exatamente fusão e OSP | Agora | fiberu.org | 06/11/2026 |
| 2 | CFOT — Certified Fiber Optic Technician (certificação direta) | FOA | **US$ 150** no exame (cartão de crédito); o certificado do Fiber U custa US$ 20 à parte | Prova online. Exige experiência documentada, analisada por um conselheiro da FOA [1] | Certificação CFOT, com renovação periódica | **Alto**: único título de fibra reconhecido internacionalmente e acessível sem viajar | Depois (mês 9 a 12) | thefoa.org/Direct_Cert_Process.html | 06/11/2026 |
| 3 | Escola aprovada pela FOA no Brasil | FOA | — | — | — | Não encontramos escola aprovada na lista consultada (EUA/Canadá; a parte "Worldwide" não carregou) [3] | — | foa-approved.org/schools | 06/11/2026 |
| 4 | Networking Basics | Cisco NetAcad | Grátis | **22 h** (estimativa da Cisco citada em fontes secundárias; página oficial não renderizou) | Certificado e badge da NetAcad | **Médio-alto**: base de IP para OLT/ONU | Agora | netacad.com/courses/networking-basics | 06/11/2026 |
| 5 | CCNA: Introduction to Networks (ITN) | Cisco NetAcad | Grátis no autoestudo (não confirmado na página oficial) | cerca de 70 h (não confirmado) | Badge | **Alto**: primeiro módulo do CCNA | 90 dias | netacad.com | 06/11/2026 |
| 6 | Exame CCNA 200-301 | Cisco / Pearson VUE | **US$ 300 + impostos** (sem câmbio conferido; some dólar do dia e IOF) | 120 min, prova em inglês ou japonês [4] | CCNA, válido por 3 anos | Alto no currículo, mas caro para agora | Depois (2º ano) | cisco.com (página do exame CCNA) | 06/11/2026 |
| 7 | Cursos EAD gratuitos Intelbras Itec (redes, fibra, GPON) | Intelbras | Grátis | 15 min a 25 h por curso (fonte de 2021) | Certificado grátis no portal | **Médio**: marca muito usada pelos provedores de RR, com equipamento que aparece no poste | Agora | cursos.intelbras.com.br (bloqueado; não confirmado) [5] | 06/11/2026 |
| 8 | FTTx Solution Planning (online) | Furukawa/Lightera Academy | Grátis ("no cost") [6] | Não informada | Não informado | **Médio**: planejamento FTTx, que liga com QGIS e projetos | 90 dias | academy.latam.lightera.com | 06/11/2026 |
| 9 | FCP Fibras Ópticas | Furukawa/Lightera, em centros autorizados | **Não confirmado** (curso pago e presencial) | **24 h** presencial [7][8] | Certificação FCP | Médio-alto, mas exige viagem a Manaus ou outra capital | Depois, só se a empresa pagar | academy.latam.lightera.com | 06/11/2026 |
| 10 | Huawei ICT Academy / HCIA-Datacom ou Access | Huawei | Cursos online grátis; exame HCIA de **US$ 200** (edital de 2022, desatualizado) [9] | Não confirmada | HCIA, válido por 3 anos | Médio: útil se as OLTs dos provedores forem Huawei | Depois | e.huawei.com/en/talent (bloqueado) | 06/11/2026 |
| 11 | Introdução a Redes de Computadores | Fundação Bradesco (Escola Virtual, ev.org.br) | Grátis | Não confirmada (cursos da plataforma: 5 a 40 h; prazo de 60 dias) | Certificado com carga horária | Baixo-médio: repete o que a NetAcad cobre | Só se precisar de horas complementares | ev.org.br | 06/11/2026 |
| 12 | Aprenda Mais (MEC) | MEC / Rede Federal | Grátis | Varia | Certificado de conclusão | Médio para **horas complementares da faculdade**. Nenhum curso de fibra ou QGIS apareceu na página inicial [10] | Usar como complemento | aprendamais.mec.gov.br | 06/11/2026 |
| 13 | QGIS Training Manual (v3.44) | Projeto QGIS | Grátis | Autoestudo em 18 módulos [11] | Sem certificado | **Alto para o trabalho**, mas zero no papel. Gera portfólio (mapas próprios com dados fictícios) | Agora | docs.qgis.org/latest/pt_BR/docs/training_manual | 06/11/2026 |
| 14 | Geoprocessamento com QGIS 3 — Módulo I | LabGeo Mackenzie | Grátis (segundo fonte secundária) | Não confirmada | Declaração de participação, ao enviar os exercícios | Médio | 90 dias | mackenzie.br (LabGeo) [12] | 06/11/2026 |
| 15 | QGIS na Escola Virtual.Gov (ENAP) | ENAP | Grátis | — | — | **Não encontramos curso de QGIS** (a busca devolveu catálogo genérico) [13] | — | escolavirtual.gov.br | 06/11/2026 |
| 16 | Smart Grids: The Basics (edX, modo audit) | TU Delft | Audit grátis; certificado verificado pago (outro curso da série custa US$ 129) | cerca de 6 semanas × 5 h (curso irmão "Modeling") | Só no modo pago | Baixo-médio: cultura do setor, em inglês | Depois | edx.org (página antiga deu 404; buscar "Delft smart grids") | 06/11/2026 |
| 17 | Técnico Subsequente em Eletrotécnica | IFRR Campus Boa Vista | **Grátis** (seleção por histórico escolar) | cerca de 18 meses, **noturno**, 36 vagas em 2026.2 [14][15] | Diploma técnico (MEC) com registro no CRT | **Alto**: dá registro de técnico industrial e combina com NR-10/SEP | Ficar de olho no edital 2027.1 ou 2027.2 | sgc.ifrr.edu.br | 06/11/2026 |
| 18 | FTTH no SENAI-RR / Mundo SENAI | SENAI | — | — | — | Não encontramos turma de FTTH em Roraima. As turmas SENAI+Huawei foram em DF, BA, TO e ES [16]. No Mundo SENAI, nenhum curso de fibra apareceu nas listas | Consultar rr.senai.br a cada semestre | rr.senai.br | 06/11/2026 |
| 19 | Fibracem, Prysmian, Nokia, ABRINT, Anatel | — | — | — | — | Nenhuma oferta gratuita confirmada no Brasil | — | — | 06/11/2026 |

### O que não vale a pena (e por quê)

- **Cursos pagos de "instalador FTTH" em plataformas de cursos livres** (Udemy, Hotmart, OpenCourser etc.): o certificado não tem peso, e o conteúdo é o mesmo do Fiber U e da Intelbras, que são gratuitos.
- **Pagar o exame CCNA (US$ 300) no primeiro ano.** Para o dia a dia de fibra e FTTH o retorno ainda é baixo. Antes, é preciso concluir ITN e SRWE. Pagar o exame só faz sentido em 2028 ou com subsídio da empresa.
- **Pagar o FCP Furukawa do próprio bolso**: curso presencial de 24 h, preço não divulgado, e em Roraima não há centro autorizado confirmado (viagem a Manaus). Só vale se a distribuidora pagar.
- **Huawei HCIA pago (cerca de US$ 200)** antes de saber se os provedores dos postes usam OLT Huawei.
- **Certificados verificados do edX/Coursera para smart grid e IEC 61850** agora: é conteúdo avançado e em inglês. Fazer no modo audit, de graça, e só depois de ter a base de redes.
- **Técnico em Telecom EAD particular sem cadastro no SISTEC/MEC**: não dá registro no CRT. Antes de pagar qualquer técnico EAD, consultar o SISTEC.
- **"Colecionar" certificados curtos** (de 15 min a 2 h) no LinkedIn: poluem o perfil. Mostrar só trilhas concluídas, como Fiber U, NetAcad e Intelbras com carga relevante.

### Técnico em telecom: formação e registro (CFT)

- **Base legal:** a Lei 13.639/2018 criou o CFT e os CRTs, que "orientam, disciplinam e fiscalizam o exercício profissional" (art. 3º). O registro é feito no CRT do domicílio e vale para todo o país (art. 26). Exercer a profissão "quando impedido" é infração (art. 20) [17].
- **Roraima mudou de conselho:** pela **Resolução CFT nº 252/2024**, a partir de **22/06/2026** passou a existir o **CRT-06 (AC, AM, RO e RR)**. Antes, Roraima ficava no CRT-01 [18].
- **Quem pode se registrar:** quem tem diploma de **curso técnico reconhecido pelo MEC**, com histórico (fontes secundárias e guias de CRT). As atribuições do técnico com habilitação em telecom estão na **Resolução CFT 83/2019**. O CREA-PB contesta essa resolução e entende que telecom é atribuição de engenharia [19]. Ou seja, o tema tem disputa jurídica.
- **O que isso significa para quem tem o cargo sem diploma técnico:** "Técnico de telecomunicações" é o **nome do cargo na empresa (CLT)**, e pode ser exercido normalmente sob supervisão. O que **não pode** é se apresentar como "Técnico Industrial", nem **assinar responsabilidade técnica (TRT)**, nem registrar-se no CRT-06 enquanto não tiver diploma técnico. Os certificados de cursos livres (FOA, Cisco, Intelbras) **não substituem** o diploma.
- **Caminhos:** (a) **Técnico Subsequente em Eletrotécnica do IFRR**, noturno, gratuito, cerca de 18 meses. É o caminho mais realista em Boa Vista e casa com o setor elétrico. (b) Técnico em Telecomunicações EAD de uma instituição pública ou do SENAI, desde que conste no SISTEC. Não confirmamos nenhuma oferta aberta em 2026. (c) **Certificação por competência** (avaliação no SENAI ou na rede federal): costuma exigir anos de experiência comprovada, e o próprio sistema CFT critica o modelo. Não vale para ele agora.

### Sequência sugerida de 12 meses

Ritmo de exemplo: pílulas curtas em dias úteis e um bloco maior no fim de semana. A faculdade tem prioridade nas semanas de prova.

| Mês | Foco | Entregável no currículo |
|---|---|---|
| Nov/26 | Fiber U Basic (lições 1 a 4) e QGIS Training Manual, módulos 1 e 2 | — |
| Dez/26 | Terminar o Fiber U Basic e pagar o certificado (cerca de US$ 20) | Certificado FOA Fiber U |
| Jan/27 | NetAcad Networking Basics (22 h) | Badge da Cisco |
| Fev/27 | Intelbras Itec: cursos de GPON/FTTH e de OLT/ONU (escolher 2 ou 3 com mais de 4 h) | Certificados Intelbras |
| Mar/27 | Fiber U OSP/FTTH e QGIS módulos 3 a 6 (vetores e análise), usando dados do trabalho, se permitido | Portfólio: mapa de rede no QGIS |
| Abr/27 | Furukawa FTTx Solution Planning (grátis) e Aprenda Mais para horas complementares | — |
| Mai a Jul/27 | CCNA ITN em pílulas (cerca de 70 h) | Badge ITN |
| Jul/27 | Ficar atento ao edital IFRR 2027.2 (Eletrotécnica subsequente) | Inscrição |
| Ago a Set/27 | Documentar a experiência do trabalho (OS de fusão, OTDR, fotos) e revisar Fiber U para o CFOT | Dossiê de experiência |
| Out/27 | **Exame CFOT direto (US$ 150)** | **CFOT** |
| Nov/27 | Revisão: atualizar o LinkedIn e escolher entre SRWE (CCNA 2) e o curso de smart grid no modo audit | — |

### Lições propostas para o módulo Carreira (P2)

1. **"Cargo x título: o que é ser técnico no Brasil"**: Lei 13.639, CRT-06, TRT, por que certificado livre não é diploma e o caminho pelo IFRR. Fechar com um quiz de 5 questões.
2. **"Minha trilha de certificados grátis"**: um checklist interativo com Fiber U → CFOT, NetAcad → CCNA e Intelbras/Furukawa, com links, carga horária e marcação de "concluído".
3. **"Portfólio do técnico de campo"**: como documentar fusões, medições e mapas QGIS (sem dados sigilosos da empresa) e como escrever o LinkedIn.

Vídeos: não conferimos canais em PT-BR. Termos de busca no YouTube: "FOA fibra óptica curso básico português", "fusão de fibra óptica passo a passo", "QGIS 3 curso básico iniciante", "Packet Tracer aula 1 NetAcad".

### Fontes

Todas acessadas em 06/11/2026.

1. More On FOA Certifications / Direct Cert Process — FOA — https://www.thefoa.org/Direct_Cert_Process.html
2. Fiber U, FOA's Free Online Learning Site — FOA — https://www.thefoa.org/fiberu.html e https://fiberu.org/
3. FOA Approved Schools — FOA — https://foa-approved.org/schools e https://www.thefoa.org/foa_aprv.htm
4. CCNA exam (200-301) — Cisco — https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html
5. Notícias Intelbras Itec (acesso bloqueado; título lido na busca) — Intelbras — https://www.intelbras.com/pt-br/noticia/carreira-em-alta-intelbras-disponibiliza-mais-de-mil-cursos-online-gratuitos-para
6. Furukawa Electric Academy — Lightera/Furukawa — https://academy.latam.lightera.com/en/?p=577
7. Curso FCP Fibras Ópticas — SENAC-SP — https://www.sp.senac.br/cursos-livres/curso-de-furukawa-certified-professional-fibras-opticas
8. Parecer, contratação do FCP Fibras Ópticas (2026) — TRE-BA — https://www.tre-ba.jus.br/transparencia-e-prestacao-de-contas/licitacoes/compras/arquivos-seaqui/tre-ba-0000572-57-2026-parecer
9. Convocatória Huawei Seeds/1000 Talentos (2022) — Uniceplac — https://www.uniceplac.edu.br/app/uploads/2022/02/2-Convocatoria_HUAWEI-SRE_1000_Talentos_-PT-3-1.pdf
10. Aprenda Mais — MEC — https://aprendamais.mec.gov.br/
11. QGIS Training Manual (v3.44, pt_BR) — QGIS.org — https://docs.qgis.org/latest/pt_BR/docs/training_manual/index.html
12. Curso de Geoprocessamento com QGIS — LabGeo Mackenzie — https://www.mackenzie.br/universidade/laboratorio/ee/labgeo/curso-de-geoprocessamento-com-qgis2
13. Catálogo Escola Virtual.Gov — ENAP — https://www.escolavirtual.gov.br/catalogo
14. "IFRR altera data do Vestibular 2026.2..." (02/06/2026) — Folha BV — https://www.folhabv.com.br/geral/ifrr-altera-data-do-vestibular-2026-2-e-amplia-oportunidades-de-ingresso-em-cursos-no-estado/
15. Editais do IFRR (SGC), Edital 10/2026 Eletrotécnica — IFRR — https://sgc.ifrr.edu.br/edital/arquivos/3440
16. "SENAI e Huawei vão capacitar profissionais para o setor de telecomunicações" — Portal da Indústria/CNI — https://noticias.portaldaindustria.com.br/noticias/educacao/senai-e-huawei-vao-capacitar-profissionais-para-o-setor-de-telecomunicacoes/
17. Lei nº 13.639/2018 (texto) — Normas Legais — https://www.normaslegais.com.br/legislacao/lei-13639-2018.htm
18. Resolução CFT nº 252/2024 — CFT — https://www.cft.org.br/wp-content/uploads/2024/02/RESOLUCAO-CFT-N-252.pdf
19. Decisão nº 68/2024 sobre registros de provedores de internet (contesta as Res. CFT 74 e 83/2019) — CREA-PB — https://creapb.org.br/transparencia/wp-content/uploads/2024/12/20241230-decisao-no-68-2024-esclarecimentos-de-registros-de-empresas-provedoras-de-internet.pdf


---

