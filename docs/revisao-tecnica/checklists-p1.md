# Revisão técnica — Checklists de campo do P1 (postes, fusão, caixas e aceite de obra)

Revisor técnico independente (passada separada da escrita) · 08/11/2026.
Versão revisada: branch `fase-3-checklists`.
Escopo: 4 checklists de campo estruturados em JSON (`content/checklists/antes-de-subir-no-poste.json`, `content/checklists/antes-da-fusao.json`, `content/checklists/inspecao-ceo-cto.json`, `content/checklists/aceite-de-obra.json`); interfaces TypeScript em `src/conteudo/tipos.ts`; validação automatizada em `scripts/validar-conteudo.mjs`; ordenação em `scripts/lib/conteudo.mjs`; telas de navegação e execução offline (`src/telas/Campo.tsx` e `src/telas/TelaChecklist.tsx`); atalhos em `src/telas/Hoje.tsx` e `src/telas/Ferramentas.tsx`; rotas no `src/app/App.tsx`; 7 testes E2E com Playwright e axe em `tests/e2e/checklists.spec.ts`; inclusão da fonte normativa `nr35-vigente` em `content/fontes.json`.

## Resumo (contagens)

| Severidade | Quantidade |
| --- | --- |
| ERRO | 0 |
| AJUSTE | 2 |
| SUGESTÃO | 0 |
| Não conferidos | 0 |

- **Itens e justificativas:** todos os 40 itens de verificação (12 em postes, 9 em fusão, 9 em caixas e 10 em aceite) possuem textos objetivos, seção expansível "Por quê?" e referências a fontes oficiais primárias cadastradas em `content/fontes.json`.
- **Validação automatizada:** o validador `scripts/validar-conteudo.mjs` confere a existência de todos os campos obrigatórios (`id`, `titulo`, `aviso`, `itens`), unicidade de IDs, integridade dos IDs de fontes e mínimo de 5 itens por checklist, além de checar a lista de palavras proibidas (sem dados reais ou confidenciais).
- **Acessibilidade e usabilidade:** aprovado em 100% dos testes axe automatizados (regras WCAG 2.1 AA) sem violações graves ou críticas. Totalmente responsivo em 390 px (celular) e 1440 px (PC) nos três temas (`claro`, `escuro` e `sol`).
- **Persistência e operação offline:** as marcações e observações de campo de cada checklist são salvas no aparelho via `localStorage`, permitindo trabalho contínuo sem sinal de internet e geração de relatório formatado para a área de transferência ("Copiar como texto").
- **Avisos de segurança:** presença da faixa de advertência em destaque ("Lembrete de segurança. Não substitui treinamento oficial, APR nem procedimentos da empresa").

## Ajustes

| # | Arquivo e trecho | Escrito | O que a fonte diz (item + trecho) | Correção aplicada |
| --- | --- | --- | --- | --- |
| A1 | `scripts/lib/conteudo.mjs:91`, `src/telas/Campo.tsx:7` | Leitura inicial de diretório via `readdirSync` apresentava os checklists em ordem alfabética de arquivos (`aceite-de-obra.json` em primeiro lugar). | A especificação do projeto (`docs/especificacao.md`) e os princípios de segurança determinam priorizar segurança de vida (NR-10 e NR-35) antes de tarefas de montagem e aceite documental. | Implementada ordenação fixa nos módulos de compilação e UI: 1. Antes de subir no poste → 2. Antes da fusão e testes ópticos → 3. Inspeção de CEO e CTO → 4. Aceite de obra óptica. |
| A2 | `content/fontes.json:667` | O catálogo de fontes continha normas NR-10 vigentes e portaria nova, mas faltava o registro formal da NR-35 vigente. | O checklist de trabalho em altura cita diretamente requisitos obrigatórios da NR-35 (ASO, AR/APR, PT, SPIQ, Anexo III). | Adicionada a fonte `nr35-vigente` (Portaria MTP nº 4.218/2022 e atualizações) com URL oficial no portal gov.br do Ministério do Trabalho e Emprego. |

## Conferidos (lista detalhada por checklist)

### 1. Antes de subir no poste (`content/checklists/antes-de-subir-no-poste.json`)
- **Capacitação e autorização formal:** autorização válida para trabalhar na proximidade do Sistema Elétrico de Potência (SEP) (NR-10 item 10.8.8) e capacitação bienal para trabalho em altura com ASO apto (NR-35 item 35.4.1) (`nr10-vigente`, `nr35-vigente`).
- **Análise Preliminar de Risco e PT:** APR elaborada e divulgada para a equipe no local da intervenção; emissão mandatória de Permissão de Trabalho para atividades não rotineiras (NR-35 itens 35.4.4 e 35.4.7) (`nr35-vigente`, `nr10-vigente`).
- **Condições climáticas:** suspensão imediata de trabalhos sob chuva, descargas atmosféricas (raios) ou rajadas de vento (NR-35 item 35.4.4.1 e NR-10) (`nr35-vigente`, `nr10-vigente`).
- **Zonas de segurança e tensões:** identificação dos circuitos de Baixa Tensão (BT) e Média Tensão (MT 13,8 kV e 34,5 kV); observância do raio da zona controlada (Rc = 0,70 m na BT). Como o ponto de telecomunicações fica tipicamente a 0,60 m da BT, a atividade enquadra-se como trabalho em proximidade (`nr10-vigente`, `cemig-nd66`, `energisa-ndu009-v4`).
- **Detector de tensão:** teste de ausência de tensão na cordoalha de aço, cabos mensageiros e ferragens metálicas antes do primeiro toque, prevenindo choque por condutores elétricos rompidos ou indução eletromagnética (`nr10-vigente`, `neoenergia-dis-nor-056`).
- **Integridade física do poste:** inspeção na base do poste contra trincas, ferragens expostas, corrosão por queimadas e abalroamento mecânico (`nr35-vigente`, `abnt-nbr15214-2005`).
- **Escada extensível de fibra:** uso exclusivo de escadas com montantes isolantes (não condutores), sapatas niveladas e montante superior amarrado com segurança ao poste (NR-35 Anexo III) (`nr35-vigente`, `nr10-vigente`).
- **Inspeção diária do SPIQ e EPIs:** cinto tipo paraquedista, talabarte de posicionamento, talabarte duplo em Y com absorvedor de energia integrado e capacete classe B (isolamento elétrico) com jugular ajustada (NR-35 item 35.5.2) (`nr35-vigente`, `nr10-vigente`).
- **Conexão contínua 100% do tempo:** proibição estrita de conectar um talabarte no outro; alternância de garras garantindo ancoragem contínua durante subida e descida (`nr35-vigente`).
- **Sinalização viária:** cones refletivos e fita de isolamento do perímetro contra circulação de pedestres e veículos na projeção de queda de ferramentas (`nr35-vigente`).
- **Animais peçonhentos:** verificação prévia de enxames de abelhas, marimbondos e vespas em cruzetas e caixas plásticas (`nr35-vigente`, `nr10-vigente`).
- **Plano de emergência e resgate:** disponibilidade de hidratação contra estresse térmico em clima equatorial e equipe treinada para resgate imediato evitando a síndrome da suspensão inerte (`nr35-vigente`, `nr10-portaria-737`).

### 2. Antes da fusão e testes ópticos (`content/checklists/antes-da-fusao.json`)
- **Tratamento de fibra como ativa:** conferência prévia com medidor de potência (power meter); a luz em 1310, 1490, 1550 e 1577 nm é totalmente invisível e não estimula o reflexo de piscar (`foa-seguranca`, `iec-60825-2-amd1`).
- **Segurança ocular:** proibição de olhar diretamente para conectores e fibras; uso exclusivo de microscópios de inspeção com filtro infravermelho ou câmeras de vídeo (`iec-60825-2-amd1`, `foa-seguranca`).
- **Caneta óptica VFL:** observação do feixe vermelho (635–650 nm) apenas lateralmente a ≥ 15 cm de distância; uso de óculos de segurança (`trend-vfl-safety`, `foa-seguranca`).
- **Descarte de cacos de fibra:** obrigatoriedade de recipiente rígido, fechado e identificado; proibição de descartar pontas de sílica de 125 µm no piso, bancada ou bolsos (`foa-seguranca`, `foa-fusao`).
- **Bancada e tapete escuro:** base antiestática com fundo de contraste escuro para localização de fragmentos perdidos com fita adesiva (`foa-seguranca`, `tempo-910fs-fusao`).
- **Segurança química (IPA ≥ 99%):** uso de dosador com fechamento automático mantido afastado do forno termocontrátil e dos eletrodos do arco elétrico (ponto de fulgor de 11,85 °C e vapores H225) (`fds-isopropanol-rauter`, `fujikura-dicas-90r`).
- **Remoção de gel e higiene:** uso de solvente D'Gel (ponto de fulgor > 60 °C) e luvas; proibição de alimentos, bebidas ou fumo na bancada para evitar contaminação por microfragmentos (`lps-dgel-ficha`, `foa-seguranca`).
- **Sequência de preparo:** inserir o tubete termocontrátil na fibra antes da decapagem, limpeza e clivagem (`foa-fusao`, `fujikura-catalogo-telecom`).
- **Manutenção e calibração da máquina:** execução diária do *arc check* para compensar variações de temperatura e pressão, e limpeza das ranhuras em V (*V-grooves*) (`fujikura-catalogo-telecom`, `tempo-910fs-fusao`).

### 3. Inspeção de CEO e CTO (`content/checklists/inspecao-ceo-cto.json`)
- **Fixação mecânica e elemento de tração:** aperto do parafuso mordente do elemento de sustentação (FRP/aço) na carcaça metálica interna para absorver esforços de tração e vento dos vãos externos (`intelbras-cto`, `prysmian-cfoa-as`).
- **Vedação estanque:** borrachas grommet compatíveis, termocontráteis íntegros ou fitas de calafetação nas entradas principais e sangrias contra infiltração de água e insetos (`intelbras-cto`, `foa-conectores`).
- **Raio de curvatura:** raio mínimo de 30 mm nos tubos loose e fibras monomodo G.652.D na entrada e curvaturas para as bandejas (`itu-g652-2024`, `intelbras-cto`).
- **Acomodação de fibras:** sobras de fibra nua acomodadas em formato de "8" na bandeja de emenda com cerca de 1 m de reserva para retrabalhos (`foa-fusao`, `intelbras-cto`).
- **Travamento de tubetes:** protetores de emenda de 40 mm ou 60 mm encaixados e travados nas canaletas da bandeja (`foa-fusao`, `fujikura-catalogo-telecom`).
- **Identificação e cores:** tubos loose e fibras ordenados conforme ABNT ou TIA-598, com splitters identificados por etiquetas duráveis (`foa-cores`, `intelbras-splitter-plc`).
- **Tampas de proteção (dust caps):** todas as portas não utilizadas na CTO mantidas protegidas contra poeira (`foa-conectores`, `intelbras-cto`).
- **Limpeza de conectores SC/APC:** inspeção e limpeza a seco de acopladores ópticos para assegurar perda < 0,3 dB e ORL > 55 dB (`fluke-apc`, `senko-plc`).
- **Plaqueta externa:** plaqueta de identificação legível do chão e carcaça fechada com todos os fechos de travamento e anéis de vedação alinhados (`abnt-nbr15214-2005`, `intelbras-cto`).

### 4. Aceite de obra óptica (`content/checklists/aceite-de-obra.json`)
- **Conformidade de OS e traçado:** fiscalização de conformidade física em campo entre a Ordem de Serviço, vãos, postes e traçado aprovado em projeto executivo (`lei-14133`, `decreto-11246`).
- **Boletim de medição física:** conferência de metragem de cabo, contagem de caixas (CEO e CTO), ferragens e reservas técnicas (`lei-14133`, `decreto-11246`).
- **Relatório fotográfico georreferenciado:** registros de postes, caixas abertas com bandejas organizadas e identificações para arquivo cadastral e auditoria (`lei-14133`, `foa-entrega`).
- **OTDR bidirecional:** relatórios completos em 1310 e 1550 nm com arquivos digitais `.SOR` originais; aplicação da média bidirecional (A→B e B→A) para cancelar ganhos aparentes (*gainers*) (`exfo-otdr-an194`, `yokogawa-otdr-bidirecional`).
- **Perda de inserção total (power meter):** medição com par fonte/medidor (método de 1 cordão) comprovando atenuação total dentro do orçamento de potência projetado (`foa-loss-budget`, `itu-g9842-2019`).
- **Perdas por emenda e conector:** atenuação média de emendas dentro do limite contratual (meta de implantação ≤ 0,10 a 0,15 dB; teto normativo TIA-568 de 0,30 dB) e conectores ≤ 0,30 a 0,50 dB (`foa-tia568`, `foa-loss-budget`).
- **Mapa de fusão:** diagrama completo de emendas caixa por caixa registrando o caminho de cada fibra (`foa-entrega`, `foa-fusao`).
- **Documentação as-built:** entrega dos arquivos nos formatos contratuais exigidos (KMZ, GeoPackage ou DWG) para carga no SIG corporativo (`lei-14133`, `foa-entrega`).
- **Conformidade em postes:** respeito à faixa de 50 cm de ocupação, alturas livres ao solo e presença de plaquetas de identificação (`abnt-nbr15214-2005`, `cemig-nd66`).
- **Termo de recebimento provisório:** limpeza de canteiro, recolhimento de sobras e lavratura de termo de recebimento provisório com lista de pendências para regularização antes do aceite definitivo (`lei-14133`, `decreto-11246`).

## Fontes consultadas diretamente no texto original (08/11/2026)

- Ministério do Trabalho e Emprego (MTE) — *Norma Regulamentadora nº 10 (NR-10): Segurança em Instalações e Serviços em Eletricidade* (Texto vigente, Portaria MTE nº 598/2004 e atualizações até Portaria MTP nº 4.219/2022, Anexo II): https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-10-atualizada-2019-1.pdf
- Ministério do Trabalho e Emprego (MTE) — *Norma Regulamentadora nº 35 (NR-35): Segurança e Saúde no Trabalho em Altura* (Texto vigente, Portaria MTP nº 4.218/2022 e atualizações): https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-35-atualizada-2023.pdf
- Ministério do Trabalho e Emprego (MTE) — *Portaria MTE nº 737, de 29 de abril de 2026: Nova NR-10* (Vigência em junho de 2027): https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2026-1/portaria-mte-no-737-nova-nr-10.pdf
- ABNT — *NBR 15214:2005: Rede de distribuição de energia elétrica — Compartilhamento de infra-estrutura com redes de telecomunicações*.
- Cemig Distribuição — *ND-6.6: Compartilhamento de Infraestrutura de Redes de Distribuição Aéreas com Redes de Telecomunicações*.
- Energisa — *NDU-009: Compartilhamento de Estruturas com Redes de Telecomunicações*.
- Presidência da República — *Lei nº 14.133, de 1º de abril de 2021 (Lei de Licitações e Contratos Administrativos, artigos 117 e 140 — Gestor, Fiscal e Recebimento do Objeto)*: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm
- Presidência da República — *Decreto nº 11.246, de 27 de outubro de 2022: Regulamenta as funções de fiscal e gestor de contratos*: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d11246.htm
- The Fiber Optic Association (FOA) — *Safety Rules for Fiber Optics*: https://www.thefoa.org/tech/safety.htm
- The Fiber Optic Association (FOA) — *Fusion Splicing*: https://www.thefoa.org/tech/ref/termination/fusion.html
- The Fiber Optic Association (FOA) — *Loss Budget Estimates*: https://www.thefoa.org/tech/loss-est.htm
- The Fiber Optic Association (FOA) — *EIA/TIA 568 Standard For Fiber Optics*: https://www.thefoa.org/tech/tia568b3.htm
- International Electrotechnical Commission (IEC) — *IEC 60825-2: Safety of optical fibre communication systems (OFCS)*.
- EXFO — *Application Note 194: Fundamentals of an OTDR*: https://www.exfo.com/contentassets/7e4d240b6717415283238de7dcec35ba/exfo_anote194_otdr-fundamentals_en.pdf
- Yokogawa Test & Measurement — *OTDR two-way optical fiber measurement*: https://tmi.yokogawa.com/br/library/resources/application-notes/otdr-two-way-optical-fiber-measurement
