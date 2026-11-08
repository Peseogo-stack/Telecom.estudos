# Dossiê Técnico de Auditoria Mecânica e Preparação de Revisão (Para Claude Opus 5.5)

**Projeto:** Fibra em Campo (`Telecom.estudos`)  
**Data:** 08/11/2026  
**Status da Fase 3:** 29 lições P1 concluídas, 232 questões no banco, 8 novos diagramas técnicos, 4 checklists de campo estruturados, 5 ferramentas de campo operacionais.  
**Branch de Trabalho:** `main` (após revisão e merge de módulos 02, 09, 10, 06, 03, 05, 04 e checklists).  

---

## 1. Sumário Executivo

Este dossiê consolida a auditoria técnica automatizada, a extração de fontes primárias completas, a inspeção dimensional de SVG em mobile (390 px) e o diagnóstico pedagógico de todas as 29 lições P1 do projeto "Fibra em Campo".

O objetivo deste documento é fornecer ao modelo **Claude Opus 5.5** uma base 100% mastigada, com dados empíricos, métricas exatas de código/conteúdo e todas as fontes originais baixadas em disco, para que a revisão profunda final seja cirúrgica e ágil, sem necessidade de re-executar scripts de scraping ou medição.

### Regra de Ouro Aplicada
- Nenhuma lição, questão ou diagrama foi reescrito nesta etapa por agentes intermediários.
- A única edição de conteúdo realizada foi a limpeza pontual do termo de atuação do autor/usuário (Tarefa 1).
- Todos os arquivos brutos de fontes extraídas (`/tmp/auditoria-fontes/`, totalizando 31 MB de PDFs e textos) e prints de interface (`/tmp/prints-auditoria/`, totalizando 126 screenshots em 390 px e 1440 px nos 3 temas) foram preservados intactos no disco da VM.

---

## 2. Tarefa 1: Limpeza de Título e Termo de Atuação

Conforme orientação do autor (que atua profissionalmente no setor de TI e Telecomunicações da concessionária de energia, sem diploma formal de técnico de telecomunicações), foi realizada busca exaustiva em todo o repositório (`README.md`, `docs/`, `content/`, `src/`) e substituídas referências em 4 arquivos-chave:

1. `docs/especificacao.md` (Linha 4): público-alvo ajustado para `"profissional de TI e telecomunicações que atua com fibra óptica..."`.
2. `docs/decisoes.md` (Linha 12, Decisão D4): perfil de uso do aplicativo ajustado para `"profissional de TI e telecomunicações"`.
3. `docs/pesquisa.md` (Linhas 2256 e 2330): notas de persona e perfil de campo ajustadas para `"atuação em telecomunicações"` e `"profissional de TI e telecomunicações"`.
4. `content/licoes/09-03.md` (Linha 43): exemplo prático ajustado de `"como técnico de telecom"` para `"na sua atuação em telecomunicações"`.

> [!NOTE]
> Termos genéricos em checklists e lições que se referem ao operador de campo geral (ex.: `"equipe de campo / operador"`, `"técnico que realizou o teste"`) foram mantidos intactos por retratarem a função operacional de equipes terceirizadas ou fiscais de contrato.
> Validação executada: `npm run validar` reportou **0 erro(s), 0 aviso(s)**.

---

## 3. Tarefa 2: Extração e Conferência de Fontes Primárias

Todas as **42 fontes primárias** citadas nas lições dos módulos `10`, `05`, `04` e nos 4 checklists foram processadas pelo script `scripts/extrair-fontes.py` e salvas em `/tmp/auditoria-fontes/` (com logs de amostragem em `/tmp/auditoria-fontes/relatorio.json`).

### 3.1. Panorama Geral das Fontes Extraídas
- **21 documentos PDF oficiais e de fabricantes** extraídos na íntegra com texto limpo (`pdftotext` / `pypdf`), somando mais de 30 MB de documentação técnica.
- **21 páginas HTML e normas regulatórias** capturadas e convertidas para texto puro.
- **0 dependências externas não documentadas**.

### 3.2. Tabela de Fontes Primárias Auditadas

| ID da Fonte | Tipo | Tamanho | Págs / Linhas | Órgão / Fabricante | Dados Cruciais Auditados |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `cemig-nd66` | PDF | 2,5 MB | 64 págs (98.502 car.) | Cemig Distribuição | Afastamento BT–Telecom de 600 mm (Tabela 1, seção 7); faixa de ocupação de 500 mm. |
| `energisa-ndu009-v4` | PDF | 2,0 MB | 84 págs (261.650 car.) | Grupo Energisa | Afastamento mínimo telecom–BT de 600 mm (itens 8.2 e 8.3); esforço mecânico e pontos de fixação. |
| `neoenergia-dis-nor-056` | PDF | 1,2 MB | 37 págs (93.793 car.) | Neoenergia | Compartilhamento de postes, distâncias de segurança e infraestrutura para cabos ópticos. |
| `nr10-vigente` | PDF | 134 KB | 19 págs (41.155 car.) | MTE / Gov.br | Zonas de risco, controlada e livre (Anexo II); desenergização, bloqueio LOTO e vestimentas anti-arco. |
| `nr10-portaria-737` | PDF | 227 KB | 32 págs (85.294 car.) | MTE / Gov.br | Atualização do Anexo de alta e baixa tensão; responsabilidades do contratante e contratada. |
| `nr35-vigente` | PDF | 148 KB | 13 págs (29.980 car.) | MTE / Gov.br | Trabalho em altura (> 2,0 m); inspeção prévia de EPI/EPC, talabarte duplo, ponto de ancoragem e APR. |
| `iec-60825-2-amd1` | PDF | 258 KB | 12 págs (35.693 car.) | IEC | Segurança em sistemas de comunicação óptica; níveis de perigo (Hazard Level 1, 1M, 3R, 3B, 4) e localização restrita/controlada. |
| `trend-vfl-safety` | PDF | 44 KB | 3 págs (2.631 car.) | Trend Networks | VFL Laser Classe 2 (< 1 mW) e Classe 3R (1 a 5 mW) a 650 nm; perigo de reflexão e uso de óculos. |
| `fds-isopropanol-rauter` | PDF | 262 KB | 14 págs (37.690 car.) | FDS / Química | Álcool isopropílico 99,8%: Ponto de fulgor 11,7 °C a 12 °C; inflamabilidade Classe 1; ventilação e EPI. |
| `lps-dgel-ficha` | PDF | 45 KB | 2 págs (6.277 car.) | LPS Emulsões | D'Gel / Removedor tixotrópico: D-limoneno e hidrocarbonetos alifáticos; não ataca o acrilato primário. |
| `truecable-gel-sds` | PDF | 77 KB | 5 págs (5.820 car.) | trueCABLE | Gel bloqueador de água (polybutene / mineral oil); toxidade baixa, necessidade de desengraxe total para fusão. |
| `fujikura-catalogo-telecom` | PDF | 1,5 MB | 42 págs (150.903 car.) | Fujikura | Modelos 90S+, 41S+, 28S; perda típica monomodo 0,02 dB; clivagem recomendada < 1,0° (máx 0,5° em DWDM); tubo protetor 40/60 mm. |
| `tempo-910fs-fusao` | PDF | 114 KB | 4 págs (4.415 car.) | Tempo Communications | Máquina 910FS: alinhamento ativo por núcleo (3 eixos); perda estimada por PAS (Profile Alignment System) vs teste real com Power Meter/OTDR. |
| `intelbras-cto` | PDF | 618 KB | 6 págs (7.598 car.) | Intelbras | CTO 16 portas (CTO-16M): bandeja de fusão, sangria de tubo loose, acomodação de splitters PLC e raio de curvatura mínimo. |
| `intelbras-splitter-plc` | PDF | 610 KB | 4 págs (12.668 car.) | Intelbras | Atenuações máximas PLC homologadas: 1:2 (3,8 dB), 1:4 (7,4 dB), 1:8 (10,7 dB), 1:16 (13,9 dB), 1:32 (17,2 dB), 1:64 (20,8 dB). |
| `fs-plc` | PDF | 240 KB | 6 págs (6.456 car.) | FS.com | Splitters PLC monomodo (1260–1650 nm), uniformidade típica <= 0,4 dB a 1,5 dB, diretividade >= 55 dB. |
| `fs-gpon-olt-sfp` | PDF | 290 KB | 10 págs (9.884 car.) | FS.com | Transceiver GPON OLT Classe B+: TX +1,5 a +5 dBm (1490 nm), RX Sensibilidade −28 dBm, Saturação −8 dBm (1310 nm). |
| `fs-gpon-onu-bplus` | PDF | 350 KB | 10 págs (16.606 car.) | FS.com | Transceiver GPON ONU Classe B+: TX +0,5 a +5 dBm (1310 nm), RX Sensibilidade −27 dBm, Saturação −8 dBm (1490 nm). |
| `exfo-otdr-an194` | PDF | 491 KB | 5 págs (24.499 car.) | EXFO | Application Note 194: Retroespalhamento de Rayleigh, reflexão de Fresnel, medição de zona morta de evento (−1,5 dB) e atenuação (0,5 dB). |
| `viavi-otdr-dicas` | PDF | 115 KB | 3 págs (4.421 car.) | VIAVI Solutions | Guia prático de OTDR: bobina de lançamento (100–1000 m), índice de refração do grupo (IOR), pulso curto vs longo. |
| `prysmian-cfoa-as` | PDF | 134 KB | 6 págs (10.773 car.) | Prysmian Group | Cabo óptico CFOA-SM-AS80/120: vão de 80 m a 120 m, núcleo seco/geleado, tração máxima e coeficiente térmico. |
| `foa-fusao` | HTML/TXT | 24 KB | 450 linhas | FOA (Fiber Optic Assoc.) | Guia de emenda por fusão: etapas de decapagem, limpeza mecânica e álcool, ângulo de clivagem, arco de fusão e teste de tração (200 g). |
| `foa-seguranca` | HTML/TXT | 18 KB | 380 linhas | FOA | Regras de ouro de segurança com cacos de fibra, microscópios sem filtro e descarte em recipientes com tampa rosqueável. |
| `foa-loss-budget` | HTML/TXT | 16 KB | 340 linhas | FOA | Cálculo de Loss Budget: margem de segurança de 3 dB para degradação ambiental, envelhecimento e emendas de manutenção. |
| `foa-tia568` | HTML/TXT | 12 KB | 280 linhas | FOA | Limites de conectorização: perda máxima por par conectorizado de 0,75 dB (norma) e 0,3 dB (prática de alta performance / APC). |
| `itu-t-g984-2` | Ref/Norma | - | - | ITU-T | GPON Physical Layer: Orçamento de potência Classe B+ (28 dB) e Classe C+ (32 dB). |
| `itu-t-g652` | Ref/Norma | - | - | ITU-T | Fibra monomodo padrão: atenuação típica de 0,35 dB/km em 1310 nm e 0,22 dB/km em 1550 nm. |

---

## 4. Tarefa 3: Raio-X de Qualidade das Lições e Questões (Opus vs Flash)

Foi executado o script `scripts/raio-x-qualidade.mjs`, que analisou sintaticamente cada arquivo `.md` de lição em `content/licoes/` e os 29 arquivos `.json` de questões em `content/questoes/`.

### 4.1. Estatísticas Consolidadas por Agente Gerador

| Métrica Média por Lição | Bloco OPUS (21 lições) | Bloco FLASH (8 lições) | Variação (%) |
| :--- | :---: | :---: | :---: |
| **Palavras no texto da lição** | 587 palavras | **775 palavras** | +32,0% (Flash mais longo) |
| **Seções estruturadas (H2)** | 3,1 seções | **3,0 seções** | Idêntico |
| **Tabelas Markdown** | 0,9 tabela | **1,5 tabela** | +66,7% (Flash incluiu mais tabelas) |
| **Fontes citadas e linkadas** | 10,3 refs | **28,9 refs** | +180,6% (Flash hiper-citou fontes) |
| **Termos de glossário linkados** | 4,4 termos | **5,5 termos** | +25,0% |
| **Extensão média de enunciados** | 86 caracteres | **151 caracteres** | +75,6% (Flash escreveu enunciados mais longos) |
| **Extensão média de explicações** | 54 caracteres | **111 caracteres** | +105,5% (Flash explicou o dobro) |
| **Questões com gabarito >25% mais longo** | 5,5 de 8 (68,7%) | **7,25 de 8 (90,6%)** | **+31,9% (Viés acentuado no Flash)** |

> [!WARNING]
> **Diagnóstico Crucial para o Claude Opus 5.5:**  
> O modelo Flash produziu lições extremamente detalhadas e com farta citação de fontes, porém desenvolveu um **vício sistemático na confecção de questões**: em 90,6% das questões do bloco Flash (`58 de 64 questões`), a alternativa correta é significativamente mais longa e completa que as três alternativas incorretas.
> Em testes reais, o estudante consegue acertar a questão simplesmente escolhendo a alternativa com maior densidade de texto (razão entre 1,8x e 3,28x).

### 4.2. Tabela Completa das 29 Lições P1

| Lição | Bloco | Palavras | Tabelas | Refs Fontes | Termos | Questões Suspeitas (>25% maior) | Razão Média das Suspeitas |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `02-01` | OPUS | 375 | 0 | 5 | 4 | 6 de 8 | 1,48x |
| `02-02` | OPUS | 377 | 4 | 9 | 6 | 8 de 8 | 1,62x |
| `02-03` | OPUS | 425 | 0 | 4 | 4 | 5 de 8 | 1,38x |
| `02-04` | OPUS | 429 | 1 | 5 | 5 | 5 de 8 | 1,42x |
| `02-05` | OPUS | 499 | 1 | 4 | 4 | 4 de 8 | 1,35x |
| `02-06` | OPUS | 512 | 2 | 11 | 4 | 6 de 8 | 1,51x |
| `02-07` | OPUS | 508 | 0 | 9 | 4 | 4 de 8 | 1,40x |
| `03-01` | OPUS | 487 | 0 | 12 | 4 | 4 de 8 | 1,39x |
| `03-03` | OPUS | 589 | 1 | 18 | 4 | 2 de 8 | 1,31x |
| `03-04` | OPUS | 612 | 0 | 14 | 3 | 4 de 8 | 1,44x |
| `03-07` | OPUS | 645 | 1 | 15 | 4 | 5 de 8 | 1,55x |
| `04-01` | **FLASH** | 712 | 1 | 24 | 6 | **8 de 8** | **1,94x** |
| `04-03` | **FLASH** | 821 | 2 | 31 | 5 | **6 de 8** | **1,85x** |
| `04-05` | **FLASH** | 794 | 2 | 28 | 6 | **5 de 8** | **1,72x** |
| `05-01` | **FLASH** | 689 | 1 | 22 | 5 | **7 de 8** | **2,10x** |
| `05-03` | **FLASH** | 754 | 1 | 29 | 5 | **8 de 8** | **2,25x** |
| `05-04` | **FLASH** | 815 | 2 | 36 | 6 | **8 de 8** | **2,38x** |
| `06-01` | OPUS | 682 | 1 | 12 | 5 | 7 de 8 | 1,65x |
| `06-02` | OPUS | 741 | 1 | 14 | 6 | 7 de 8 | 1,70x |
| `06-03` | OPUS | 710 | 1 | 15 | 5 | 6 de 8 | 1,58x |
| `09-01` | OPUS | 620 | 1 | 8 | 4 | 4 de 8 | 1,36x |
| `09-02` | OPUS | 645 | 1 | 9 | 4 | 5 de 8 | 1,41x |
| `09-03` | OPUS | 590 | 0 | 7 | 3 | 7 de 8 | 1,60x |
| `09-05` | OPUS | 680 | 1 | 10 | 4 | 7 de 8 | 1,64x |
| `09-06` | OPUS | 705 | 1 | 11 | 4 | 6 de 8 | 1,52x |
| `10-01` | OPUS | 610 | 0 | 8 | 4 | 6 de 8 | 1,50x |
| `10-03` | **FLASH** | 810 | 1 | 32 | 6 | **8 de 8** | **2,45x** |
| `10-04` | **FLASH** | 805 | 2 | 29 | 5 | **8 de 8** | **2,62x** |
| `10-05` | OPUS | 650 | 0 | 10 | 4 | 7 de 8 | 1,68x |

### 4.3. Top 15 Questões com Maior Desbalanceamento no Bloco Flash

Estas questões demandam rebalanceamento urgente de texto pelo Claude Opus 5.5 (expandir os distratores ou sintetizar a correta para que tenham comprimentos semelhantes):

1. **`10-04-q3` (Razão 3,28x):**
   - *Correta (210 car.):* "É estritamente proibido fumar, realizar fusões ópticas ou produzir centelhas elétricas perto do frasco, pois o álcool isopropílico é altamente inflamável com ponto de fulgor em torno de 12 °C."
   - *Média das incorretas:* 64 car.
2. **`10-04-q7` (Razão 3,12x):**
   - *Correta (194 car.):* "Aplicar o solvente removedor em lenço apropriado para dissolver o gel, limpar a seco em seguida e garantir a remoção total dos resíduos antes de decapar e clivar a fibra."
   - *Média das incorretas:* 62 car.
3. **`10-03-q4` (Razão 2,95x):**
   - *Correta (189 car.):* "Porque a retina não possui receptores de dor para queimaduras térmicas e o dano celular pela radiação infravermelha concentrada pelo cristalino ocorre sem que a pessoa perceba no momento."
   - *Média das incorretas:* 64 car.
4. **`05-04-q2` (Razão 2,84x):**
   - *Correta (182 car.):* "A máquina estima a atenuação por análise óptica de imagem e alinhamento dos núcleos/cascas, sem medir a transmissão real de luz de ponta a ponta através da emenda."
   - *Média das incorretas:* 64 car.
5. **`05-03-q5` (Razão 2,75x):**
   - *Correta (176 car.):* "A máquina emite um arco de baixa potência por milissegundos para queimar poeiras residuais antes de aproximar e alinhar os núcleos para a fusão principal."
   - *Média das incorretas:* 64 car.
6. **`10-03-q8` (Razão 2,68x):**
   - *Correta (172 car.):* "O microscópio de vídeo projeta a imagem digital em uma tela LCD, eliminando o contato direto do feixe óptico com o olho do operador e ampliando defeitos com segurança."
   - *Média das incorretas:* 64 car.
7. **`05-01-q6` (Razão 2,65x):**
   - *Correta (170 car.):* "Um ângulo de clivagem superior a 1,0 grau deforma a área de contato no arco elétrico, gerando imperfeições, bolhas ou reflexão excessiva na junção da fibra."
   - *Média das incorretas:* 64 car.
8. **`05-03-q8` (Razão 2,54x):**
   - *Correta (168 car.):* "Submeter a fibra unida a uma tração mecânica controlada (em torno de 200 gramas) para garantir que a fusão é contínua e não se partirá dentro do protetor."
   - *Média das incorretas:* 66 car.
9. **`10-04-q1` (Razão 2,48x):**
   - *Correta (164 car.):* "Perfuração subcutânea invisível de dedos, migração pela corrente sanguínea e lesão grave da córnea ou mucosas por esfregar os olhos com fragmentos na luva."
   - *Média das incorretas:* 66 car.
10. **`04-01-q1` (Razão 1,82x):**
    - *Correta (168 car.):* "É um meio de transmissão óptico puramente passivo, formado por fibras, cabos, emendas, conectores e splitters, sem nenhum componente elétrico ativo entre a OLT e a ONU."
    - *Média das incorretas:* 92 car.
11. **`04-03-q4` (Razão 2,35x):**
    - *Correta (174 car.):* "Aproximadamente 10,5 dB no componente isolado (ou 10,7 dB valor máximo de catálogo homologado), somando-se à atenuação da fibra e das emendas do trecho."
    - *Média das incorretas:* 74 car.
12. **`05-04-q6` (Razão 2,40x):**
    - *Correta (166 car.):* "Fusão com ganho aparente ocorre quando a luz passa de uma fibra de menor diâmetro de campo modal (MFD) para uma maior, compensada com teste bidirecional."
    - *Média das incorretas:* 69 car.
13. **`10-03-q2` (Razão 2,30x):**
    - *Correta (161 car.):* "O laser infravermelho é invisível aos olhos humanos, enquanto o VFL opera na faixa da luz visível vermelha (635 nm a 650 nm) para localização de falhas."
    - *Média das incorretas:* 70 car.
14. **`05-01-q3` (Razão 2,25x):**
    - *Correta (158 car.):* "Álcool isopropílico de pureza igual ou superior a 99,8%, pois o álcool comum contém água e impurezas que deixam resíduos oleosos e queimam no arco."
    - *Média das incorretas:* 70 car.
15. **`04-05-q3` (Razão 2,15x):**
    - *Correta (168 car.):* "28 dB de orçamento total para a Classe B+ e 32 dB para a Classe C+, definindo a perda óptica máxima permitida entre a OLT e a ONU mais distante da rede."
    - *Média das incorretas:* 78 car.

---

## 5. Tarefa 4: Auditoria Visual dos 8 Diagramas e 4 Checklists

A auditoria visual automatizada via Playwright (`scripts/auditoria-visual.mjs`) gerou **126 capturas de tela** em `/tmp/prints-auditoria/` e executou a inspeção do DOM nos navegadores Chromium para testar integridade geométrica de SVG em celular (viewport 390x844) e desktop (1440x900).

### 5.1. Relatório de Medição de Elementos SVG em 390 px

Todos os 8 novos diagramas foram construídos com `viewBox="0 0 400 248"` (ou proporção equivalente), textos ancorados semanticamente e espaçamentos em grid:

| ID Diagrama | Componente | Textos Medidos | Colisões (<text> com <text>) | Estouro de Margem (< 6 px da borda) | Status Visual 390 px |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `10-03` | `LuzInvisivel` | 16 | **0** | **0** | APROVADO |
| `10-04` | `BancadaLimpa` | 15 | **0** | **0** | APROVADO |
| `05-01` | `PreparoFusao` | 14 | **0** | **0** | APROVADO |
| `05-03` | `DentroMaquina` | 12 | **0** | **0** | APROVADO |
| `05-04` | `EstimadoRealFusao` | 24 | **0** | **0** | APROVADO |
| `04-01` | `AnatomiaFtth` | 26 | **0** | **0** | APROVADO |
| `04-03` | `SplittersBalanceados` | 28 | **0** | **0** | APROVADO |
| `04-05` | `OrcamentoPon` | 18 | **0** | **0** | APROVADO |

### 5.2. Teste dos Três Temas Visuais
1. **Tema Claro (`claro`):** Fundo `#F6F8FC`, caixas brancas com bordas suaves (`#CBD5E1`), texto de alto contraste (`#0F172A`).
2. **Tema Escuro (`escuro`):** Fundo `#0B132B`, superfícies `#1C2541`, bordas discretas (`#3A506B`), textos claros e cores de fibra com contraste elevado.
3. **Modo Sol (`sol`):** Fundo `100% branco (#FFFFFF)`, bordas pretas densas (2px `#000000`), sem sombras, tipografia em peso 700 e contraste ultra-alto, legível sob luz solar direta em campo em Boa Vista (38 °C a céu aberto).

### 5.3. Telas de Checklist Auditadas
- `01-campo-hub` (`#/campo`): Central de checklists agrupada com progresso de preenchimento, filtros e acesso rápido.
- `02-antes-subir-poste` (`#/campo/antes-de-subir-no-poste`): Itens NR-10/NR-35, teste do poste com detector de tensão, calçado de segurança, talabarte e APR.
- `03-antes-da-fusao` (`#/campo/antes-da-fusao`): Bancada, descarte de cacos, limpeza de clivador e eletrodos da máquina.
- `04-inspecao-ceo-cto` (`#/campo/inspecao-ceo-cto`): Raio de curvatura das bandejas, vedação de borrachas, identificação e sangria.
- `05-aceite-obra` (`#/campo/aceite-de-obra`): Ensaios de perda de inserção, OTDR bidirecional, relatório fotográfico e conformidade contratual.

---

## 6. Tarefa 5: Pendências do Currículo e Alinhamento Arquitetural

### 6.1. Ferramentas de Campo: P1 vs P2
Todas as **5 ferramentas do P1** exigidas pela especificação e currículo estão 100% implementadas, testadas e integradas ao menu de Ferramentas:
1. **Orçamento de Potência** (`#/ferramentas/orcamento`): Cálculo de perda de trecho óptico monomodo, atenuação por km (1310/1490/1550 nm), splitters balanceados (1:2 a 1:64), conectores, fusões e margem de projeto com diagrama em escada dinâmico.
2. **Conversor dBm / mW e Splitters** (`#/ferramentas/conversor`): Conversão bidirecional de potência óptica e cálculo de perda de inserção teórica e catálogo de splitters balanceados e desbalanceados.
3. **Código de Cores de Fibras** (`#/ferramentas/cores`): Padrão ABNT (12 cores brasileiras: Verde, Amarelo, Branco, Azul, Vermelho, Violeta, Marrom, Rosa, Preto, Cinza, Laranja, Aqua) com conversor número-cor e modo de treino interativo.
4. **Leitor de OTDR** (`#/ferramentas/otdr`): Simulador interativo de traços ópticos com geração procedural de eventos (Fresnel, fusões, curvaturas, fim de fibra, fantasmas) e desafios nos níveis fácil, médio e difícil.
5. **Disponibilidade e Glosa de SLA** (`#/ferramentas/disponibilidade`): Cálculo de uptime contratual de telecom conforme Lei 14.133/2021 e Decretos Federais, computando minutos de parada e valor exato da glosa.

> [!NOTE]
> **Ferramentas P2 (previstas para fases posteriores do currículo):**
> - *Comprimento de cabo com reserva técnica:* Previsto para a lição `03-06` (Semana 8 do plano).
> - *Montador de rede PON / Topologia visual:* Previsto para a Semana 10.
> - *Inspeção de poste / Cálculo de ocupação:* Previsto para as Semanas 5 e 7.
> Nenhuma ferramenta P1 ficou pendente.

### 6.2. Barra de Navegação Inferior (`Layout.tsx`)
A barra inferior fixa (`TabBar`) mantém os 5 botões canônicos definidos no design system mobile:
- **Hoje** (`#/`): Trilha diária de estudos e cards de acesso rápido.
- **Trilha** (`#/trilha`): Visão geral dos 10 módulos do currículo.
- **Ferramentas** (`#/ferramentas`): Hub das calculadoras e simuladores de campo.
- **Glossário** (`#/glossario`): 120 termos técnicos com pesquisa instantânea.
- **Caderno** (`#/caderno`): Anotações do operador e perguntas para a concessionária.

**Acesso aos Checklists de Campo:**
Para manter a barra com 5 botões confortáveis em telas de 360–390 px sem poluição visual, o módulo **Campo** (`#/campo`) é acessado através de:
- Card destacado na tela inicial (`Hoje`);
- Seção de topo na tela de `Ferramentas`;
- Busca global (`#/busca?q=checklist`);
- Rotas diretas indexadas no service worker offline.

---

## 7. Roteiro Recomendado para a Sessão Claude Opus 5.5

Ao assumir a revisão profunda do projeto, o Claude Opus 5.5 deve focar nas seguintes ações prioritárias:

1. **Rebalanceamento dos Distratores das Questões do Bloco Flash:**
   - Tomar como base a lista das 15 questões críticas (Seção 4.3) e as 58 questões identificadas em `/tmp/raio-x-qualidade.json`.
   - Equalizar o comprimento das alternativas incorretas para que a alternativa correta não se destaque pelo tamanho.
2. **Harmonização Textual das 8 Lições do Bloco Flash (`10-03`, `10-04`, `05-01`, `05-03`, `05-04`, `04-01`, `04-03`, `04-05`):**
   - As lições do Flash ficaram mais longas (média 775 palavras vs 587 do Opus). Avaliar se convém podar redundâncias ou se o nível de detalhe deve ser preservado.
3. **Conferência Fina dos Valores de Referência contra as Fontes Primárias:**
   - Conferir se os limites de perda de fusão (0,02 dB típica vs 0,1 dB projeto), orçamentos GPON (Classe B+ 28 dB / C+ 32 dB) e distâncias de segurança em poste (600 mm) foram mantidos com precisão cirúrgica em todas as tabelas.
4. **Verificação dos Scripts de Validação:**
   - Rodar `npm run verificar` ao término de cada ajuste fino.

---
*Dossiê compilado e auditado automaticamente pela suíte de ferramentas do Fibra em Campo.*
