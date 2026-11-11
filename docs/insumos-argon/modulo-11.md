> Insumo bruto do módulo 11 (redes), feito por outra IA (Gemini) e recebido em PDF em 11/11/2026. Convertido para Markdown sem mudar o conteúdo: só a numeração dos fatos (L1-F01…) para o sorteio da conferência e a retirada de marcas de extração do PDF ("[span_N](start_span)"). **Não é fonte do app.** O resultado da conferência está em `modulo-11-conferencia.md`.

# Módulo 11 · Pesquisa


## Lição 1. SFP e transceptores ópticos: tipos (SFP, SFP+, SFP28, QSFP), alcance, comprimento de onda, monomodo x multimodo, BiDi, e por que os dois lados do enlace precisam combinar


### Objetivo prático

Identificar, especificar e validar transceptores ópticos e cordões de fibra ao ativar ou substituir enlaces entre switches/roteadores da distribuidora e CPEs de provedores em subestações, agências e centro de operação.


### Fatos


**L1-F01.** O formato SFP (Small Form-factor Pluggable) foi introduzido em 2001 para substituir os módulos GBIC maiores, cumpre as normas IEEE 802.3 e SFF-8472 e opera em taxas de até 1 Gbps para aplicações 100BASE ou 1000BASE

- fonte: https://www.fs.com/ca/blog/sfp-sfp-sfp28-qsfp-qsfp28-what-are-the-differences-386.html
- trecho: "First introduced in 2001, built to replace the larger GBIC form factor modules." / "Up to 1 Gbps (supports 100BASE or 1000BASE applications)." / "SFP: Complies with IEEE 802.3 and SFF-8472 standards."
- acesso: 11/11/2026

**L1-F02.** O formato SFP+ (Enhanced Small Form-factor Pluggable), introduzido em 2006 e baseado na especificação SFF-8431, mantém o mesmo tamanho físico do SFP e suporta taxas de até 10 Gbps (8 Gbps, 10 Gbps e 16 Gbps) com distâncias de transmissão de 30 m a 120 km

- fonte: https://www.fs.com/ca/blog/sfp-sfp-sfp28-qsfp-qsfp28-what-are-the-differences-386.html
- trecho: "Introduced in 2006 as an enhanced version of SFP; it remains a dominant industry format transceiver module." / "Up to 10 Gbps (transmission rates are available at 8 Gbps, 10 Gbps, and 16 Gbps)." / "SFP+: Based on the SFF-8431 standard." / "SFP+ transmission distances cover from 30 m to 120 km."
- acesso: 11/11/2026

**L1-F03.** O formato SFP28 (Small Form-Factor Pluggable 28) é uma interface 25GBASE que utiliza um canal de 25 Gbit/s (tecnologia definida para 100 Gigabit Ethernet implementada como quatro vias de 25 Gbit/s), alcançando até 100 m sobre fibra multimodo (MMF) no padrão SFP-25G-SR e até 10 km sobre fibra monomodo (SMF) no padrão SFP-25G-LR

- fonte: https://img-en.fs.com/file/catalog/optical-module.pdf
- trecho: "Small Form-Factor Pluggable 28 (SFP28) SFP28 is a 25GBASE interface which uses technology defined for 100 Gigabit Ethernet implemented as four 25Gbit/s lanes. ... SFP28 contains SFP-25G-SR, SFP-25G-LR and CWDM SFP28. The SFP-25G-SR is used for short-distance transmission (up to 100m over MMF). While the SFP-25G-LR and CWDM SFP28 are applied for long-distance transmission (up to 10km over SMF)."
- acesso: 11/11/2026

**L1-F04.** O formato QSFP+ (Quad Small Form-Factor Pluggable Plus) combina quatro canais de 10 Gbps multiplexados dentro do módulo para transmitir e receber um sinal agregado de 40 Gbps sobre fibras multimodo ou monomodo

- fonte: https://img-en.fs.com/file/catalog/optical-module.pdf
- trecho: "Quad Small Form-Factor Pluggable Plus (QSFP+) QSFP+ provides high-density 40G Ethernet connectivity options for data center and high-performance computing networks. FS QSFP+ module can operate on duplex multimode and single mode fibers. It has four channels of 10G multiplexed inside the module to transmit and receive as the aggregate 40G signal."
- acesso: 11/11/2026

**L1-F05.** O formato QSFP28 opera com 4 canais de 25,78 Gbps (taxa máxima agregada de 103,125 Gbps) para enlaces de 100 Gbps (como o 100GBASE-LR4, regido pelas normas IEEE 802.3 100GBASE-LR4, QSFP28 MSA, SFF-8665 e SFF-8636, com alcance de até 10 km em SMF)

- fonte: https://www.fs.com/blog/overview-of-qsfp28-lr4-optical-transceiver-641.html
- trecho: "Form Type | QSFP28 | Wavelength | 1310nm* | Connector | Duplex LC | Media | SMF | Max Data Rate | 103.125Gbps (4x 25.78Gbps) | Max Cable Distance | 10km" / "Protocols | IEEE 802.3 100GBASE-LR4, QSFP28 MSA, SFF-8665, SFF-8636"
- acesso: 11/11/2026

**L1-F06.** Regra de compatibilidade mecânica e elétrica entre portas SFP, SFP+ e SFP28: portas SFP+ aceitam ópticas SFP operando na velocidade reduzida de 1 Gbps, mas um módulo SFP+ não pode ser inserido em uma porta SFP; da mesma forma, portas SFP28 aceitam ópticas SFP+ operando a 10 Gbps se a porta puder ser configurada para transmissão em 10G

- fonte: https://www.fs.com/ca/blog/sfp-sfp-sfp28-qsfp-qsfp28-what-are-the-differences-386.html
- trecho: "SFP+ ports can accept SFP optics, but they will operate at a reduced speed of 1 Gbps." / "An SFP+ transceiver cannot be plugged into an SFP port, as doing so may damage the product or the port." / "SFP28 will work with SFP+ optics at a reduced speed of 10 Gbps." / "10G SFP+ modules will work in an SFP28 port on a network switch only if the port can be manually configured for 10G transmission."
- acesso: 11/11/2026

**L1-F07.** Em módulos 1G SFP, o padrão 1000BASE-SX opera em fibra multimodo (MMF) com comprimento de onda de 850 nm e alcance de até 500 m; o 1000BASE-LX opera em fibra monomodo (SMF) em 1310 nm com alcance de até 10 km; o 1000BASE-LH opera em SMF em 1310 nm com alcance de até 40 km; e o 1000BASE-T opera em cabo de cobre UTP Categoria 5/5e até 100 m com conector RJ-45

- fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/small-business-network-accessories/datasheet-c78-741408.pdf
- trecho: "MGBLH1. 1000BASE-LH SFP transceiver for single-mode fiber, 1310 nm wavelength, supports up to 40 km. MGBLX1. 1000BASE-LX SFP transceiver for single-mode fiber, 1310 nm wavelength, supports up to 10 km. MGBSX1. 1000BASE-SX SFP transceiver for multimode fiber, 850 nm wavelength, supports up to 500 m. MGBT1. 1000BASE-T SFP transceiver for Category 5 copper wire, supports up to 100 m."
- acesso: 11/11/2026

**L1-F08.** Em módulos 1G SFP de longo alcance adicional para fibra monomodo (SMF), o padrão 1000BASE-EX opera em 1310 nm e o 1000BASE-ZX opera em 1550 nm

- fonte: https://www.cisco.com/c/en/us/td/docs/interfaces_modules/transceiver_modules/installation/note/78_15160.html
- trecho: "GLC-EX-SMD= | Cisco 1000BASE-EX SFP transceiver module for SMF, 1310-nm wavelength, extended operating temperature range." / "GLC-ZX-SMD= | Cisco 1000BASE-ZX SFP transceiver module for SMF, 1550-nm wavelength, extended operating temperature range."
- acesso: 11/11/2026

**L1-F09.** Os módulos SFP 1000BASE-ZX (1550 nm) podem alcançar distâncias de até 100 km (62 milhas) sobre fibra monomodo

- fonte: https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst6500/hardware/Module_Installation/Mod_Install_Guide/6500-emig.pdf
- trecho: "1000BASE-ZX SFP modules can reach up to 62 miles (100 km) by using"
- acesso: 11/11/2026

**L1-F10.** Em módulos 10G SFP+, o padrão 10GBASE-SR opera em 850 nm sobre fibra multimodo (MMF), alcançando 26 m em fibra FDDI (62,5 µm, 160 MHz·km), 33 m em OM1 (62,5 µm, 200 MHz·km), 66 m em fibra 50 µm (400 MHz·km), 82 m em OM2 (50 µm, 500 MHz·km), 300 m em OM3 (50 µm, 2000 MHz·km) e 400 m em OM4 e OM5 (50 µm, 4700 MHz·km)

- fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/data_sheet_c78-455693.html
- trecho: "SFP-10G-SR-S a SFP-10G-SR SFP-10G-SR-X SFP-10G-SR-I a | 850 | MMF | 62.5 62.5 50.0 50.0 50.0 50.0 50.0 | 160 (FDDI) 200 (OM1) 400 500 (OM2) 2000 (OM3) 4700 (OM4) 4700 (OM5) | 26m 33m 66m 82m 300m 400m 400m"
- acesso: 11/11/2026

**L1-F11.** Em módulos 10G SFP+ para fibra monomodo (SMF G.652), o 10GBASE-LR (1310 nm) alcança 10 km, o 10GBASE-ER (1550 nm) alcança 40 km e o 10GBASE-ZR (1530 a 1565 nm) alcança 80 km

- fonte: https://www.cisco.com/c/en/us/products/collateral/switches/nexus-7000-series-switches/data_sheet_c78-605482.html
- trecho: "SFP-10G-LR SFP‑10G-LR-S | 1310 | ● SMF | ● G.652 | - | ● 10km | SFP-10G-ER SFP‑10G-ER-S | 1550 | ● SMF | ● G.652 | - | ● 40 km 5 | SFP-10G-ZR SFP‑10G-ZR-S | 1530 - 1565 | ● SMF | ● G.652 | - | ● 80 km"
- acesso: 11/11/2026

**L1-F12.** Em módulos 25G SFP28, o 25GBASE-SR suporta 70 m em OM3 e 100 m em OM4 MMF; o 10/25GBASE-LR suporta 10 km em SMF G.652; o 25GBASE-ER suporta 40 km em SMF G.652; e o 25GBASE-ZR suporta 80 km em SMF G.652, exigindo RS-FEC nas portas do equipamento hospedeiro para alcance total em 25G

- fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/datasheet-c78-736950.html
- trecho: "The Cisco 25GBASE-SR Module supports a link length of 70/100m on OM3/4 MMF. This module requires RS-FEC on the host ports." / "The Cisco 10/25GBASE-LR Module supports a link length of 10 kilometers on standard Single-Mode Fiber (SMF) G. 652 at both 10G and 25G." / "The Cisco 25GBASE-ER Module supports a link length of 40 kilometers on standard Single-Mode Fiber (SMF) G. 652 at 25G." / "The Cisco 25GBASE-ZR Module supports link lengths of 80km over standard Single-Mode Fiber (SMF) G. 652 at 25G. This module requires RS-FEC on the host at 25G."
- acesso: 11/11/2026

**L1-F13.** Em módulos 40G QSFP+ e 100G QSFP28, o QSFP-40G-SR4 (850 nm, conector MTP/MPO de 12 fibras sobre MMF) alcança 30 m (OM2), 100 m (OM3) e 150 m (OM4); o QSFP-100G-SR4-S (850 nm, MPO-12 sobre MMF) alcança 70 m (OM3) e 100 m (OM4); e o QSFP-100G-LR4-S opera em quatro comprimentos de onda nominais (1295, 1300, 1304 e 1309 nm) sobre fibra monomodo G.652 com conector LC até 10 km

- fonte: https://www.cisco.com/c/en/us/products/collateral/switches/nexus-7000-series-switches/datasheet-c78-738175.html
- trecho: "Cisco QSFP-100G-SR4-S | 850 | MMF | 50.0 50.0 | 2000 (OM3) 4700 (OM4) | MPO-12 (12 fibers) | 70m 100m | Cisco QSFP-100G-LR4-S | 1295, 1300, 1304, 1309 | SMF | G.652 | - | LC | 10km" / "QSFP-40G-SR4 | 850 | ● MMF (OM2) ● MMF (OM3) ● MMF (OM4) | ● 50.0 ● 50.0
- 50.0 | ● 500 ● 2000 ● 4700 | 12-fiber MTP/MPO | ● 30m ● 100m ● 150m 3" | acesso: 11/11/2026

**L1-F14.** A fibra multimodo (MMF) é projetada para operar em 850 nm e 1300 nm, enquanto a fibra monomodo (SMF) é otimizada para 1310 nm e 1550 nm

- fonte: https://www.thefoa.org/tech/wavelength.htm
- trecho: "Multimode fiber is designed to operate at 850 and 1300 nm, while singlemode fiber is optimized for 1310 and 1550 nm."
- acesso: 11/11/2026

**L1-F15.** Nas recomendações da ITU-T e normas ISO/IEC/TIA, a fibra multimodo de índice gradual tem núcleo/casca de 62,5/125 µm (OM1) ou 50/125 µm (OM2, OM3, OM4 e OM5, cobertas pela ITU-T G.651 / G.651.1), enquanto a fibra monomodo tem diâmetro de núcleo (mode field diameter) de 8 a 10 µm (nominalmente 9/125 µm, OS1/OS2, coberta pela ITU-T G.652)

- fonte: https://www.thefoa.org/tech/ref/OSP/fiber.html
- trecho: "Two types are in use, 50/125 and 62.5/125, where the numbers represent the core/cladding diameter in microns." / "Singlemode fiber has a core diameter of 8-10 microns, specified as "mode field diameter," the effective size of the core, and a cladding diameter of 125 microns."
- acesso: 11/11/2026

**L1-F16.** A atenuação típica da fibra monomodo (9/125 µm, G.652) é de 0,4 dB/km em 1310 nm e 0,25 dB/km em 1550 nm, muito inferior à atenuação da fibra multimodo (3 dB/km em 850 nm e 1 dB/km em 1300 nm na OM2; 2,5 dB/km em 850 nm e 0,8 dB/km em 1300 nm na OM4 e OM5)

- fonte: https://www.thefoa.org/tech/ref/basic/fiber.html
- trecho: "50/125 microns (OM2, G.651.1) 3/1 dB/km. 500/500 MHz-km. ... Optimized for 850 nm VCSELs. 50/125 microns (OM4, G.651.1) 2.5/0.8 dB/km. 3500/500 MHz-km. Optimized for 850 nm VCSELs, higher speed. 50/125 microns (OM5) 2.5/0.8 dB/km. 3500/500 MHz-km." / "Singlemode. @1310/1550 nm* 9/125 microns (OS1 B1.1 or G.652) 0.4/0.25 dB/km."
- acesso: 11/11/2026

**L1-F17.** Não se pode misturar tipos de fibra: tentar conectar fibra monomodo em multimodo pode causar 20 dB de perda (99% da potência), e conectar fibras multimodo 62,5/125 µm com 50/125 µm pode causar perda de 3 dB ou mais (mais da metade da potência)

- fonte: https://www.thefoa.org/tech/ref/basic/fiber.html
- trecho: "CAUTION: You cannot mix and match fibers! Trying to connect singlemode to multimode fiber can cause 20 dB loss - that's 99% of the power. Even connections between 62.5/125 and 50/125 can cause loss of 3 dB or more - over half the power."
- acesso: 11/11/2026

**L1-F18.** Módulos SFP Gigabit utilizam conectores LC/PC (duplos em SX, LX/LH, EX e ZX; simples em BX-D e BX-U), exigem cordões ópticos com polimento PC ou UPC (cordões com conector APC não são suportados) e possuem distância mínima de cabo de 2 metros (6,5 pés)

- fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/gigabit-ethernet-gbic-sfp-modules/datasheet-c78-366584.html
- trecho: "Note: Only connections with patch cords with PC or UPC connectors are supported. Patch cords with APC connectors are not supported. All cables and cable assemblies used must be compliant with the standards specified in the standards section. Table 2 provides cabling specifications for the SFPs that you install in the Gigabit Ethernet port. Note that all SFP ports have LC-type connectors, and the minimum cable distance for all SFPs listed (multimode and single-mode fiber) is 6.5 feet (2 m)."
- acesso: 11/11/2026

**L1-F19.** Transceptores BiDi (Bidirecionais, padrão BX) operam sobre um único filamento de fibra monomodo (single-strand SMF) com conector LC simples, utilizando um divisor WDM integrado no SFP para separar os comprimentos de onda de transmissão e recepção

- fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/gigabit-ethernet-gbic-sfp-modules/datasheet-c78-366584.html
- trecho: "As shown, the presence of a Wavelength-Division Multiplexing (WDM) splitter integrated into the SFP to split the 1310-nm and 1490-nm light"
- acesso: 11/11/2026

**L1-F20.** Em enlaces BiDi de 1 Gbps (1000BASE-BX10), um lado utiliza o módulo Downstream (GLC-BX-D=), que transmite (TX) em 1490 nm e recebe (RX) em 1310 nm, e o outro lado utiliza o módulo Upstream (GLC-BX-U=), que transmite (TX) em 1310 nm e recebe (RX) em 1490 nm

- fonte: https://www.cisco.com/c/en/us/td/docs/interfaces_modules/transceiver_modules/installation/note/78_15160.html
- trecho: "GLC-BX-D= | 1000BASE-BX10 SFP module for single-strand SMF, 1490-nm TX/1310-nm RX wavelength, commercial operating temperature range. | GLC-BX-U= | 1000BASE-BX10 SFP module for single-strand SMF, 1310-nm TX/1490-nm RX wavelength, commercial operating temperature range."
- acesso: 11/11/2026

**L1-F21.** Em enlaces BiDi de 10 Gbps (10 km em SFP-10G-BXD-I/SFP-10G-BXU-I e 40 km em SFP-10G-BX40D-I/SFP-10G-BX40U-I) e de 10/25 Gbps (10 km em SFP-10/25G-BXD-I/SFP-10/25G-BXU-I), o módulo Downstream (BXD) transmite no canal de 1330 nm (1320 a 1340 nm) e recebe em 1270 nm (1260 a 1280 nm), enquanto o módulo Upstream (BXU) transmite em 1270 nm e recebe em 1330 nm

- fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/datasheet-c78-736950.html
- trecho: "SFP-10/25G-BXD-I transmits at 1330nm channel and receives at 1270nm signal. The SFP-10/25G-BXU-I transmits at a 1270nm wavelength and receives a 1330nm signal."
- acesso: 11/11/2026

**L1-F22.** Regra de combinação dos dois lados do enlace: ambos os SFPs nas extremidades do link precisam ser compatíveis e operar no mesmo comprimento de onda (em transceptores simétricos) ou ter os valores de TX e RX inversamente combinados no outro lado do enlace (em transceptores BiDi assimétricos), caso contrário haverá falha de comunicação

- fonte: https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html
- trecho: "Choosing the wrong laser/LED wavelength leads to miscommunication between transceivers, if communication is even possible. Both the SFPs must be capable of reading, transmitting on the same wavelength." / "Special attention must be paid to asymmetrical Receive (RX)/Transmit (TX) transceivers where the TX and RX values differ from each other, and they must be conversely matched at the other side of the link."
- acesso: 11/11/2026

### Divergências

- Comprimento de onda nominal 1300 nm vs 1310 nm em módulos 1000BASE-LX/LH: As notas de instalação da linha Cisco GLC-LH-SM/GLC-LH-SMD descrevem o módulo como operando em 1300 nm ("GLC-LH-SMD= | Cisco 1000BASE-LX/LH SFP transceiver module for MMF and SMF, 1300-nm wavelength, extended operating temperature range.", fonte: https://www.cisco.com/c/en/us/td/docs/interfaces_modules/transceiver_modules/installation/note/78_15160.html, acesso: 11/11/2026), enquanto a folha de dados do módulo Cisco MGBLX1/MGBLH1 especifica 1310 nm ("MGBLX1. 1000BASE-LX SFP transceiver for single-mode fiber, 1310 nm wavelength, supports up to 10 km.", fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/small-business-network-accessories/datasheet-c78-741408.pdf, acesso: 11/11/2026). A Fiber Optic Association (FOA) esclarece que essa diferença terminológica é histórica — lasers centrados estatisticamente em 1310 nm vs LEDs chamados de 1300 nm — e irrelevante para calibração ("When NBS (now NIST) created a calibration standard for power meters, they used 850, 1300 and 1550nm so meter calibration is usually at those wavelengths, although some manufacturers offer both 1300 and 1310 or call it 1300/1310 because it is an irrelevant difference in calibration.", fonte: https://www.thefoa.org/tech/ref/OSP/fiber.html, acesso: 11/11/2026).
- Pares de comprimento de onda em módulos BiDi conforme a velocidade e a distância: Em 100 Mbps (100BASE-BX10), os módulos usam 1550 nm e 1310 nm ("GLC-FE-100BX-D=: 100BASE-BX10-D SFP module for single-strand SMF, 1550-nm TX / 1310-nm RX", fonte: https://www.cisco.com/c/en/us/td/docs/interfaces_modules/transceiver_modules/installation/note/78_15160.html, acesso: 11/11/2026); em 1 Gbps (1000BASE-BX10), usam 1490 nm e 1310 nm; em 10 Gbps (10 e 40 km) e 25 Gbps (10 km), usam 1330 nm e 1270 nm ("SFP-10G-BXD-I transmits a 1330-nm channel and receives a 1270-nm signal, whereas SFP-10G-BXU-I transmits at a 1270-nm wavelength and receives a 1330-nm signal.", fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/data_sheet_c78-455693.html, acesso: 11/11/2026); e em 25 Gbps de 40 km, usam 1314 nm e 1289 nm ("SFP-25G-BX40D-I transmits at 1314nm wavelength and receives at 1289nm wavelength. The SFP-25G-BX40U-I transmits at 1289nm and receives at 1314nm wavelengths.", fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/datasheet-c78-736950.html, acesso: 11/11/2026).

### Confirmar na empresa

- Marcas de switches e roteadores adotadas na rede operativa (subestações e Centro de Operação da Distribuição - COD) e corporativa da distribuidora em Roraima (ex.: Cisco, Huawei, Juniper, Intelbras) e se há bloqueio de módulos de terceiros (vendor lock-in / ID check).
- Padrão de transceptores em estoque na distribuidora para enlaces internos de subestação (se usam MMF 850 nm ou SMF 1310 nm, e se exigem faixa de temperatura industrial I-Temp de -40 °C a +85 °C nos painéis de pátio/subestação devido ao calor intenso de Roraima).
- Se a entrega óptica dos provedores locais no DIO/CPE utiliza fibra dupla (LC duplex, 1310 nm) ou fibra única BiDi (LC simplex, pares 1310/1490 nm ou 1270/1330 nm), e qual lado (U ou D) fica padronizado no equipamento da concessionária.
- Padrão de polimento nos DIOs da distribuidora (se os DIOs usam adaptadores azuis UPC e se há necessidade de cordão híbrido SC-APC para LC-UPC ao conectar na caixa do provedor, já que os módulos SFP exigem conector LC PC/UPC).

### Ideias de diagrama

- Comparativo visual em escala das famílias de transceptores: SFP (1G, 1 canal), SFP+ (10G, 1 canal) e SFP28 (25G, 1 canal) com o mesmo tamanho físico e conector LC, ao lado do QSFP+ (40G, 4x10G) e QSFP28 (100G, 4x25G) mais largos com conectores MPO-12 ou LC duplex.
- Corte transversal comparando a fibra Multimodo (núcleo de 50 µm ou 62,5 µm e casca de 125 µm, cordão laranja/aqua, múltiplos raios a 850 nm até 300–500 m) e a fibra Monomodo (núcleo de 9 µm e casca de 125 µm, cordão amarelo, feixe único a 1310/1550 nm para 10–80 km).
- Esquema lado a lado de um enlace tradicional Duplex (2 fibras cruzando TX→RX em 1310 nm) versus um enlace BiDi (1 única fibra com filtro WDM interno onde o lado A transmite em 1310 nm e recebe em 1490 nm, e o lado B transmite em 1490 nm e recebe em 1310 nm), destacando o erro clássico de colocar dois módulos BiDi iguais nas duas pontas.

### Ideias de questão (só o conceito testado, sem alternativas)

- Identificação de incompatibilidade quando dois módulos BiDi de mesmo sufixo (ex.: dois módulos BX-U transmitindo em 1310 nm) são instalados nas duas pontas de uma única fibra.
- Escolha do módulo correto (SX/SR 850 nm multimodo vs LX/LR 1310 nm monomodo vs ER/ZR 1550 nm monomodo) a partir da distância do enlace (ex.: 150 m dentro da subestação vs 8 km em Boa Vista vs 35 km entre subestações) e do tipo de cabo óptico instalado.
- Consequência prática de tentar inserir um módulo SFP+ de 10G em uma porta legada apenas SFP de 1G versus inserir um SFP de 1G em uma porta SFP+ de 10G.
- Impacto de atenuação severa (até 20 dB de perda) ao conectar um cordão multimodo em um enlace monomodo ou usar conector APC diretamente na porta do SFP que exige polimento PC/UPC.

## Lição 2. Leitura de potência óptica no switch (DDM/DOM): o que significam potência de transmissão e de recepção, temperatura e corrente do laser, e como comparar com os limites da ficha do módulo


### Objetivo prático

Diagnosticar falhas de enlace óptico (fibra rompida, cordão sujo/dobrado, saturação por falta de atenuador ou módulo queimado) lendo os valores de DDM/DOM na linha de comando do switch e confrontando-os com a ficha técnica (datasheet).


### Fatos


**L2-F01.** A norma SFF-8472 (Diagnostic Monitoring Interface for Optical Transceivers, mantida pela SNIA / SFF Committee) define a interface digital (mapa de memória no endereço A2h e interface de gerência) para monitorar em tempo real os parâmetros operacionais de transceptores ópticos e inclui um sistema de flags de alarme e aviso (warning) quando os parâmetros saem da faixa normal ajustada de fábrica

- fonte: https://sup.xenya.si/sup/info/finisar/an-2030-finisar.pdf
- trecho: "allows real time access to device operating parameters, and it includes a sophisticated system of alarm and warning flags which alerts end-users when particular operating parameters are outside of a factory set normal range."
- acesso: 11/11/2026

**L2-F02.** O transceptor gera os dados de diagnóstico digitalizando sinais analógicos internos, e as constantes de calibração e os limiares (thresholds) de alarme e aviso são gravados na memória durante a fabricação do módulo

- fonte: https://sup.xenya.si/sup/info/finisar/an-2030-finisar.pdf
- trecho: "The transceiver generates this diagnostic data by digitization of internal analog signals. Calibration and alarm threshold data is written during device manufacture." / "In addition to generating digital readings of internal analog values, the device generates various status bits based on comparison between current values and factory-preset limits."
- acesso: 11/11/2026

**L2-F03.** Os cinco parâmetros monitorados pelo DDM/DOM e suas unidades exibidas ao usuário são: temperatura (Temperature, em graus Celsius / C), tensão de alimentação (Supply Voltage, em Volts), corrente de polarização do laser (TX Bias Current, em mA), potência óptica transmitida (TX Output Power, potência óptica média em dBm convertida de mW) e potência óptica recebida (RX Received Optical Power, potência óptica média em dBm)

- fonte: https://documentation.nokia.com/sas/23-9/books/dk-interface-config/digital-diagnostics-monitor.html
- trecho: "Some Nokia SFPs, XFPs, and the MSA DWDM transponder support the Digital Diagnostics Monitoring (DDM) capability, which allows the transceiver module to maintain information about its working status in device registers, including: temperature, supply voltage, transmit (Tx) bias current, Tx output power, received (Rx) optical power" / "The Tx and Rx power displayed in the DDM output are average optical power in dBm." / "Temperature | Celsius | C | Supply Voltage | Volts | µV | TX Bias Current | mA | µA | TX Output Power | dBm (converted from mW) | mW | RX Received Optical Power4 | dBm (converted from dBm) (Avg Rx Power or OMA) | mW"
- acesso: 11/11/2026

**L2-F04.** A leitura de potência óptica via DDM/DOM fornece valores em tempo real para orientação com precisão (margem de erro) de ±3 dB ou melhor definida pela norma SFF-8472; onde for exigido dado de potência óptica preciso, deve-se utilizar um medidor de potência óptica (optical power meter)

- fonte: https://documentation.nokia.com/sas/23-9/books/dk-interface-config/digital-diagnostics-monitor.html
- trecho: "Note: The optical transceiver DDM feature provides real-time values for guidance. For the specific values, the optical power data provides an accuracy of ±3 dB or better. The accuracy of this data is defined in the relevant standard for the transceiver type, such as SFF-8472 for SFP+. Use an optical power meter where precise optical power data is required."
- acesso: 11/11/2026

**L2-F05.** Em equipamentos Cisco, o monitoramento DOM é consultado pelos comandos show interfaces transceiver, show interfaces transceiver detail e show interfaces transceiver threshold table, exibindo as colunas Temperature (Celsius), Voltage (Volts), Current (mA), Optical Tx Power (dBm) e Optical Rx Power (dBm) acompanhadas dos indicadores ++ (high alarm), + (high warning), - (low warning) e -- (low alarm)

- fonte: https://www.cisco.com/c/en/us/td/docs/wireless/asr_901/Configuration/Guide/b_asr901-scg/b_asr901-scg_chapter_0101011.pdf
- trecho: "The real-time parameters of the router, such as optical output power, optical input power, temperature, laser bias current, and transceiver supply voltage can be monitored using the show interfaces transceiver command." / "++ : high alarm, + : high warning, - : low warning, -- : low alarm. NA or N/A: not applicable, Tx: transmit, Rx: receive. mA: milliamperes, dBm: decibels (milliwatts). Optical. Optical. Temperature Voltage Current. Tx Power Rx Power. Port. (Celsius) (Volts) (mA) (dBm) (dBm)"
- acesso: 11/11/2026

**L2-F06.** Em equipamentos Huawei, o comando display transceiver interface [interface-type interface-number] verbose exibe os campos Bias Current, Current Rx Power e Current Tx Power junto aos respectivos limiares High Threshold e Low Threshold para verificar se os valores estão dentro da faixa permitida (ex.: exibindo alarme RX power low quando Current Rx Power(dBM) :-31.54 está abaixo de Default Rx Power Low Threshold(dBM) :-16.98, enquanto Current Tx Power(dBM) :-5.01 está dentro da faixa de -9.50 a 0.00)

- fonte: https://info.support.huawei.com/network/ptmngsys/Web/tsrev_ar/en/content/ar/16_edesk_optical_interface_cannot_up/edesk_optical_interface_cannot_up_edesk004.html
- trecho: "Run the display transceiver interface interface-type interface-number verbose command to view optical module information. Check whether the local and remote optical modules work properly. View the Bias Current, Current Rx Power, and Current Tx Power fields to check whether the values are within the allowed range." / "Alarm information: RX power low ... Temperature(ºC) :35 Voltage(V) :3.30 Bias Current(mA) :4.08 ... Current Rx Power(dBM) :-31.54 Default Rx Power High Threshold(dBM) :0.00 Default Rx Power Low Threshold(dBM) :-16.98 Current Tx Power(dBM) :-5.01 Default Tx Power High Threshold(dBM) :0.00 Default Tx Power Low Threshold(dBM) :-9.50"
- acesso: 11/11/2026

**L2-F07.** Em equipamentos Juniper, o diagnóstico óptico DOM é visualizado pelo comando show interfaces diagnostics optics [interface], que apresenta a corrente de polarização, potências ópticas e limiares de alarme e aviso em mW e dBm

- fonte: https://supportportal.juniper.net/s/article/EX-How-to-view-the-diagnostic-detail-DOM-for-the-transceiver-on-the-10G-1G-VC-port
- trecho: "show interfaces diagnostics optics xe-0/1/0 ... Laser rx power low warning threshold : 0.0158 mW / -18.01 dBm."
- acesso: 11/11/2026

**L2-F08.** Regra prática de isolamento de falha ao comparar a leitura com os limites do módulo: se a potência de transmissão (Tx Power) estiver muito alta ou muito baixa, substitui-se o módulo óptico local; se a potência de recepção (Rx Power) estiver muito alta ou muito baixa, substitui-se o módulo óptico (local ou remoto) ou a fibra, verifica-se se a distância e o tipo de fibra atendem aos requisitos e mede-se a atenuação de cada trecho com um medidor de potência óptica

- fonte: https://info.support.huawei.com/network/ptmngsys/Web/tsrev_ar/en/content/ar/16_edesk_optical_interface_cannot_up/edesk_optical_interface_cannot_up_edesk004.html
- trecho: "If the transmit power is too high or low, replace the optical module. If the receive power is too high or low: Replace the (local or remote) optical module or fiber. Check whether the transmission distance of the optical module and fiber type meet requirements. Use an optical power meter to measure the attenuation of each part of links and recover the problematic link."
- acesso: 11/11/2026

**L2-F09.** Limites ópticos de ficha técnica para módulos 1G SFP (Cisco MGBSX1, MGBLX1 e MGBLH1): no 1000BASE-SX (850 nm, até 500 m), potência média de saída (Tx) de -9,5 dBm a -4 dBm, sensibilidade do receptor (Rx mínimo típico) de -20 dBm e sobrecarga do receptor (Receiver overload / Rx máximo) de 0 dBm; no 1000BASE-LX (1310 nm, até 10 km), Tx de -9,5 dBm a -3 dBm, sensibilidade Rx de -20 dBm (típ.) e sobrecarga Rx de -3 dBm; no 1000BASE-LH (1310 nm, até 40 km), Tx de -4 dBm a 0 dBm, sensibilidade Rx de -25 dBm (típ.) e sobrecarga Rx de -3 dBm

- fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/small-business-network-accessories/datasheet-c78-741408.pdf
- trecho: "Average output power. MGBLH1: -4 dBm to 0 dBm. MGBLX1: -9.5 dBm to -3 dBm. MGBSX1: -9.5 dBm to -4 dBm. MGBT1: N/A. * Receiver sensitivity. MGBLH1: -25 dBm (typ) MGBLX1: -20 dBm (typ) MGBSX1: -20 dBm (typ) MGBT1: N/A. * Receiver overload. MGBLH1: -3 dBm. MGBLX1: -3 dBm. MGBSX1: -0 dBm."
- acesso: 11/11/2026

**L2-F10.** Limites ópticos de ficha técnica para módulos 10G SFP+ (10GBASE-SR, 10GBASE-LR e 10GBASE-LRM): no SFP-10G-SR (850 nm, 300 m/400 m), Tx Power de -7,3 a -1 dBm e sensibilidade Rx < -11,1 dBm; no SFP-10G-LR (1310 nm, 10 km), Tx Power de -8,2 a 0,5 dBm e sensibilidade Rx < -14,4 dBm; no SFP-10G-LRM (1310 nm, 220 m/300 m), Tx Power de -6,5 a -0,5 dBm e sensibilidade Rx < -8,4 dBm

- fonte: https://www.fs.com/blog/sfp10gsr-vs-sfp10glrm-vs-sfp10glr-which-to-choose-1177.html
- trecho: "Wavelength | 850nm | 1310nm | 1310nm ... Max. Cable Distance | 300m/400m | 10km | 220m/300m | Rate | 10 Gbps | 10 Gbps | 10 Gbps | TX Power | -7.3～-1dBm | -8.2～0.5dBm | -6.5~-0.5dBm | Receiver Sensitivity | < -11.1dBm | < -14.4dBm | < -8.4dBm"
- acesso: 11/11/2026

**L2-F11.** Limites ópticos de ficha técnica para módulos 10G SFP+ de longa distância (Cisco 10GBASE-ER, 10GBASE-BX40 e 10GBASE-ZR): no 10GBASE-ER (40 km, 1530 a 1565 nm), Tx Power de -4,7 dBm a 4,0 dBm e Rx Power de -15,8 dBm a -1 dBm; no 10GBASE-BX40 (40 km BiDi), Tx Power de -2,7 dBm a 4,5 dBm e Rx Power de -21,2 dBm a -9 dBm; no 10GBASE-ZR (80 km, 1530 a 1565 nm), Tx Power de 0 dBm a 4,0 dBm, sensibilidade Rx de -24 dBm, sobrecarga Rx (Receiver Overload) de -7 dBm e limiar de dano físico do receptor (Receiver Damage Threshold) de +5 dBm

- fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/data_sheet_c78-455693.html
- trecho: "10GBASE-ER Modules (SFP-10G-ER-S, SFP-10G-ER, SFP-10G-ER-I) Wavelength: 1530 to 1565 nm Maximum Transmit Power: 4.0 dBm Minimum Transmit Power: -4.7 dBm Maximum Receive Power: -1 dBm Minimum Receive Power: -15.8 dBm" / "10G-SFP Bidirectional for 40km Modules ... Maximum Transmit Power: 4.5 dBm Minimum Transmit Power: -2.7 dBm Maximum Receive Power: -9 dBm Minimum Receive Power: -21.2 dBm" / "Transmitter Optical Output Power (Pout): Min 0 dBm | Max 4.0 dBm ... Receiver Damage Threshold: +5 dBm | Receiver Overload: -7 dBm ... Receiver Sensitivity: -24 dBm"
- acesso: 11/11/2026

**L2-F12.** Quando a potência óptica transmitida excede a capacidade de recepção da interface oposta (como na interoperabilidade do SFP dual-rate GLC-GE-DR-LX transmitindo para uma interface 100BASE-LX10), é obrigatório inserir um atenuador óptico (ex.: atenuador de 5 dB) na fibra de transmissão para evitar sobrecarga no receptor

- fonte: https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/gigabit-ethernet-gbic-sfp-modules/datasheet-c78-366584.html
- trecho: "The GLC-GE-DR-LX SFP can interoperate with other 100M SFPs/interfaces as long as those are based on 100BASE-LX10 standard. A 5dB attenuator is needed on the path of dual-rate SFP Tx and 100BASE-LX10 interface Rx. No attenuator is needed on the other fiber strand."
- acesso: 11/11/2026

**L2-F13.** Faixas padronizadas de temperatura de operação de módulos SFP nas fichas técnicas: Comercial (0 °C a +70 °C), Estendida / EXT-TEMP (-10 °C a +85 °C) e Industrial / I-TEMP (-40 °C a +85 °C)

- fonte: https://www.cisco.com/c/en/us/products/collateral/optical-networking/network-convergence-system-2000-series/pluggable-optical-modules-ds.html
- trecho: "ONS-SE-100-LX10= | SFP - 100 Mbps Long Reach - 1310 nm - SM - LC, EXT-TEMP | 10-2213-01 | 100BASE LX IEEE-802.3 | -10 to +85 | ONS-SI-100-LX10= | SFP - 100 Mbps Long Reach - 1310 nm - SM - LC, I‑TEMP | 10-2294-01 | 100BASE LX IEEE-802.3 | -40 to +85" / "15327-SFP-LC-SX=EOS | 1000BASE-SX LC, SFP | 30-1301-01 | 1000BASE SX IEEE-802.3 | 0 to +70"
- acesso: 11/11/2026

**L2-F14.** O sensor DOM/DDM não está integrado em todos os modelos de transceptores (quando não suportado, o switch retorna a mensagem Diagnostic Monitoring is not implemented), e o suporte também exige uma versão mínima de sistema operacional no switch

- fonte: https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html
- trecho: "Note: These values are provided by the Digital Monitoring Sensor (DOM) module. DOM is not integrated into all transceivers, and the minimum Cisco IOS® XE version required varies depending on the switch hosting the transceiver."
- acesso: 11/11/2026

### Divergências

- Sigla DDM vs DOM: A norma SFF-8472 e fabricantes como Nokia, Huawei e FS.com utilizam o termo DDM ("Digital Diagnostics Monitoring (DDM)", fonte: https://documentation.nokia.com/sas/23-9/books/dk-interface-config/digital-diagnostics-monitor.html, acesso: 11/11/2026), enquanto a Cisco adota a sigla DOM ("Digital Optical Monitoring. (DOM) support", fonte: https://www.cisco.com/c/en/us/products/collateral/optical-networking/network-convergence-system-4200-series/datasheet-c78-737800.pdf/1000, acesso: 11/11/2026) para referenciar a mesma funcionalidade.
- Fator de escala de corrente de laser (Bias Current) entre revisões da SFF-8472: Versões iniciais da SFF-8472 usavam fator de escala de 1 µA por contagem A/D para interpretar leituras de corrente de bias do laser, mas revisões posteriores da SFF-8472 mudaram o fator de escala para 2 µA por contagem A/D ("Early versions of the digital diagnostic standard (SFF-8472), used a scale factor of 1μA/AD Count for interpreting laser bias current readings. SFF-8472 later changed the scale factor to 2μA/AD Count.", fonte: https://sup.xenya.si/sup/info/finisar/an-2030-finisar.pdf,acesso: 11/11/2026).

### Confirmar na empresa

- Comandos padrão utilizados pela equipe de operação em Boa Vista conforme os modelos de switches de subestação e roteadores de borda instalados (ex.: show interfaces transceiver detail em Cisco IOS/IOS-XE, display transceiver interface ... verbose em Huawei VRP, show interfaces diagnostics optics em Juniper Junos).
- Se o sistema de gerência/supervisão da distribuidora coleta automaticamente os alarmes de DOM/DDM via SNMP (snmp-server enable traps transceiver / High/Low Warn e High/Low Alarm) e qual margem de segurança em dB acima da sensibilidade mínima a engenharia exige no comissionamento de novos enlaces.
- Procedimento de uso de atenuadores ópticos fixos (ex.: 5 dB, 10 dB, 15 dB) quando transceptores de 40 km ou 80 km são usados em testes de bancada ou em trechos urbanos curtos em Boa Vista.

### Ideias de diagrama

- Termômetro horizontal em escala de dBm (de -30 dBm a +5 dBm) mostrando a "Zona de Operação Normal" de um módulo 10GBASE-ER (Rx entre -15,8 dBm e -1 dBm) e de um 10GBASE-ZR (Rx entre -24 dBm e -7 dBm), destacando à esquerda a zona de "Queda/Erros por sinal fraco (abaixo da sensibilidade)" e à direita a zona de "Saturação/Overload e Queima do fotodiodo (acima do Receiver Overload / Damage Threshold)".
- Tela anotada de saída de comando CLI (display transceiver interface ... verbose e show interfaces transceiver detail) apontando com setas o significado prático de cada linha: Temperature, Voltage, Bias Current, Tx Power, Rx Power e os marcadores --, -, +, ++.
- Fluxograma rápido de isolamento de falha com DDM: (1) Tx Power local fora da faixa → defeito no SFP local; (2) Tx Power local e remoto normais, mas Rx Power muito baixo (ex.: -31,54 dBm com limite de -16,98 dBm) → atenuador excessivo, conector sujo, cordão dobrado ou rompimento/fusão ruim na fibra externa; (3) Rx Power acima do Overload (ex.: -2 dBm num módulo ZR cujo limite máximo é -7 dBm) → falta de atenuador óptico.

### Ideias de questão (só o conceito testado, sem alternativas)

- Interpretação de números negativos em dBm (compreender que -8 dBm é um sinal óptico mais forte que -18 dBm, e que -31,54 dBm está abaixo do limite mínimo de -16,98 dBm).
- Diagnóstico de causa raiz a partir de uma leitura de switch onde Tx Power está normal (-5,01 dBm, dentro de -9,50 a 0,00 dBm), mas Rx Power está em alarme baixo (-31,54 dBm, abaixo do limiar de -16,98 dBm).
- Identificação de risco de saturação (Receiver Overload) ao ligar dois módulos de 80 km (10GBASE-ZR, Tx de 0 a +4 dBm e Rx Overload de -7 dBm) com um cordão óptico curto sem atenuador no bastidor.
- Diferença entre a leitura orientativa do DDM/DOM no switch (precisão de ±3 dB pela SFF-8472) e a medição certificada com Optical Power Meter na entrega de um enlace.

## Lição 3. VLAN no básico: para que serve e como aparece no pedido ou no contrato de um link


### Objetivo prático

Conferir e alinhar com o provedor de telecomunicações o modo de entrega da porta (Access/Untagged, Trunk 802.1Q com VLAN ID específico ou túnel transparente QinQ) na ativação de links corporativos, de subestações ou de interligação.


### Fatos


**L3-F01.** Uma VLAN (Virtual Local Area Network) é um agrupamento lógico que segmenta uma rede comutada (Camada 2) em múltiplos domínios de broadcast menores por função, equipe ou aplicação, independentemente da localização física dos equipamentos, isolando o tráfego e aumentando a segurança, a gerenciabilidade e o desempenho

- fonte: https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/vlan/vlan-configuration-guide/configure-vlan.html
- trecho: "A Virtual Local Area Network (VLAN) is a logical grouping that segments a network into smaller broadcast domains. VLANs allow you to separate network devices into distinct groups, even if those devices connect to the same physical switch or to different switches. This segmentation enhances network performance, security, and manageability."
- acesso: 11/11/2026

**L3-F02.** Como as VLANs fornecem isolamento em Camada 2 (cada VLAN opera como seu próprio domínio de broadcast), a comunicação entre VLANs diferentes exige sempre um equipamento de roteamento de Camada 3

- fonte: https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/vlan/vlan-configuration-guide/configure-vlan.html
- trecho: "Each VLAN operates as its own broadcast domain, which limits the scope of broadcast traffic and reduces network congestion." / "Inter-VLAN communication requires routing: VLANs provide Layer 2 isolation. Communication between different VLANs always requires a Layer 3 routing device."
- acesso: 11/11/2026

**L3-F03.** Uma porta de acesso (access port, configurada via switchport mode access) opera permanentemente em modo não-tronco (pertencendo a uma única VLAN sem tag), enquanto uma porta tronco (trunk port, configurada via switchport mode trunk) transporta o tráfego de duas ou mais VLANs sobre um mesmo enlace usando o método de encapsulamento/marcação IEEE 802.1Q

- fonte: https://www.cisco.com/en/US/docs/switches/datacenter/nexus5000/sw/configuration/guide/cli_rel_4_1/Cisco_Nexus_5000_Series_Switch_CLI_Software_Configuration_Guide_chapter8.pdf
- trecho: "The trunk port carries traffic for two or more VLANs. Figure 1: Devices in a Trunking Environment. In order to correctly deliver the traffic on a trunk port with several VLANs, the device uses the IEEE 802.1Q encapsulation or tagging method."
- acesso: 11/11/2026

**L3-F04.** O padrão IEEE 802.1Q utiliza um mecanismo de marcação interna que insere um campo (tag) de 4 bytes no próprio quadro Ethernet original, entre o campo Source Address (MAC de origem) e o campo Type/Length, recalculando o FCS (Frame Check Sequence) do quadro modificado

- fonte: https://www.cisco.com/c/en/us/support/docs/lan-switching/8021q/17056-741-4.html
- trecho: "IEEE 802.1Q uses an internal tagging mechanism which inserts a 4-byte tag field in the original Ethernet frame itself between the Source Address and Type/Length fields. Because the frame is altered, the trunking device recomputes the FCS on the modified frame."
- acesso: 11/11/2026

**L3-F05.** A tag IEEE 802.1Q de 4 bytes (32 bits) é composta por: TPID (Tag Protocol Identifier) de 16 bits fixado no valor 0x8100; campo Priority (IEEE 802.1p) de 3 bits com 8 níveis de prioridade de tráfego (0 a 7); campo CFI (Canonical Format Indicator) de 1 bit; e campo VID (VLAN Identifier) de 12 bits que identifica a VLAN com valores entre 0 e 4095

- fonte: https://www.cisco.com/c/en/us/support/docs/lan-switching/8021q/17056-741-4.html
- trecho: "The Tag Protocol Identifier is a 16-bit field. It is set to a value of 0x8100 in order to identify the frame as an IEEE 802.1Q-tagged frame." / "Also known as user priority, this 3-bit field refers to the IEEE 802.1p priority. The field indicates the frame priority level which can be used for the prioritization of traffic. The field can represent 8 levels (0 through 7)." / "The Canonical Format Indicator is a 1-bit field." / "The VLAN Identifier is a 12-bit field. It uniquely identifies the VLAN to which the frame belongs. The field can have a value between 0 and 4095."
- acesso: 11/11/2026

**L3-F06.** A faixa válida de VLAN IDs no padrão Ethernet IEEE 802.1Q vai de 1 a 4094 (sendo os valores 0 e 4095 reservados), e a VLAN 1 é a VLAN padrão criada na inicialização do sistema

- fonte: https://www.cisco.com/c/en/us/td/docs/routers/ncs6000/software/interfaces/command/reference/b-interfaces-cr-ncs6k/b_interfaces_cr50ncs_chapter_01001.pdf
- trecho: "Trunk interface ID. Range is from 1 to 4094 inclusive (0 and 4095 are reserved)."
- acesso: 11/11/2026

**L3-F07.** Em um enlace trunk IEEE 802.1Q, a Native VLAN (que por padrão é a VLAN 1) é a VLAN cujo tráfego é enviado e recebido sem tag (untagged), e seu ID deve ser obrigatoriamente o mesmo nas duas pontas do enlace tronco para evitar loops de Spanning Tree e falhas de tráfego

- fonte: https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-14/configuration_guide/vlan/b_1714_vlan_9500_cg/configuring_vlan_trunks.html
- trecho: "Make sure the native VLAN for an IEEE 802.1Q trunk is the same on both ends of the trunk link. If the native VLAN on one end of the trunk is different from the native VLAN on the other end, spanning-tree loops might result." / "A trunk port configured with IEEE 802.1Q tagging can receive both tagged and untagged traffic. By default, the device forwards untagged traffic in the native VLAN configured for the port. The native VLAN is VLAN 1 by default."
- acesso: 11/11/2026

**L3-F08.** Em interfaces de roteadores, uma subinterface VLAN IEEE 802.1Q precisa ter um VLAN ID configurado (entre 1 e 4094) para enviar e receber tráfego marcado; sem um VLAN ID atribuído, a subinterface permanece no estado down

- fonte: https://www.cisco.com/c/en/us/td/docs/routers/ncs6000/software/interfaces/command/reference/b-interfaces-cr-ncs6k/b_interfaces_cr50ncs_chapter_01001.pdf
- trecho: "The VLAN ID specifies where 802.1Q tagged packets are sent and received on a specified subinterface. An 802.1Q VLAN subinterface must have a configured VLAN ID to send and receive traffic; without a VLAN ID, the subinterface remains in the down state."
- acesso: 11/11/2026

**L3-F09.** Com a adição da tag 802.1Q de 4 bytes, o quadro Ethernet pode chegar a 1522 bytes; quando o provedor utiliza tunelamento QinQ (anexando uma tag VLAN externa adicional de 4 bytes para transportar múltiplas VLANs de clientes preservando os IDs originais), o tamanho do pacote aumenta em 4 bytes além da MTU padrão de 1500 bytes, recomendando-se uma MTU mínima de 1504 bytes nas interfaces da rede do provedor

- fonte: https://www.cisco.com/c/en/us/support/docs/lan-switching/8021q/17056-741-4.html
- trecho: "The 802.1Q tag is 4 bytes. Therefore, the resulting Ethernet frame can be as large as 1522 bytes. The minimum size of the Ethernet frame with 802.1Q tagging is 68 bytes. ... Frame Size. The default maximum transmission unit (MTU) of an interface is 1500 bytes. With an outer VLAN tag attached to an Ethernet frame, the packet size increases by 4 bytes. Therefore, it is advisable that you appropriately increase the MTU of each interface on the provider network. The recommended minimum MTU is 1504 bytes."
- acesso: 11/11/2026

**L3-F10.** Na especificação de serviços Layer 2 de provedores (RFC 4665), o serviço pode conter uma única VLAN ou múltiplas VLANs IEEE 802.1Q, e os VLAN IDs podem ser usados pelo provedor como delimitadores de serviço (service delimiters) na porta de acesso para separar e isolar o tráfego

- fonte: https://www.rfc-editor.org/info/rfc4665/
- trecho: "A VPLS can contain a single VLAN or multiple VLANs ([IEEE_802.1Q])." / "In case of VPLS, VLAN Ids MAY be used as service delimiters. When used in this manner, they MUST be honored and traffic separation MUST be provided."
- acesso: 11/11/2026

**L3-F11.** Nos contratos e checklists de ativação de links públicos no Brasil, exige-se que os roteadores/CPEs instalados tenham suporte ao padrão IEEE 802.1Q (VLAN) e, nos circuitos L2L (LAN-to-LAN), operem com transparência em Camada 2 permitindo a passagem nativa de múltiplas tags de VLAN (IEEE 802.1Q) e protocolos de controle (STP, VTP e LACP) de ponta a ponta sem interferência do provedor

- fonte: https://conter.gov.br/wp-content/uploads/2026/07/Edital-Pregao-no-04.2026_LINK-DEDICADO_republicado.pdf
- trecho: "Transparência de Rede (L2L): O circuito de conectividade de dados LAN-toLAN (L2L) de 300 Mbps deverá operar com total transparência em Camada 2 (Data Link) do modelo OSI, permitindo o tráfego, transporte e passagem nativa de múltiplas tags de VLAN (IEEE 802.1Q) e protocolos de controle do CONTER (como STP, VTP e LACP) de ponta a ponta, sem interferência de roteamento por parte do provedor."
- acesso: 11/11/2026

### Divergências

- Contagem de 4096 identificadores vs 4094 VLANs utilizáveis vs VLANs reservadas internamente: Como o campo VID possui 12 bits (2¹² = 4096 valores possíveis, de 0 a 4095) ("The VLAN Identifier is a 12-bit field. It uniquely identifies the VLAN to which the frame belongs. The field can have a value between 0 and 4095.", fonte: https://www.cisco.com/c/en/us/support/docs/lan-switching/8021q/17056-741-4.html,acesso: 11/11/2026), especificações contratuais frequentemente citam "com até 4096 identificadores, padrão IEEE 802.1Q, definindo interfaces virtuais por identificadores de VLAN (VLAN ID tag)." (fonte: https://portal.prodam.sp.gov.br/documents/d/guest/co-23-08-2025_telefonica-pdf,acesso: 11/11/2026); contudo, os valores 0 e 4095 são reservados pela norma, restando a faixa de 1 a 4094 ("Range is from 1 to 4094 inclusive (0 and 4095 are reserved).", fonte: https://www.cisco.com/c/en/us/td/docs/routers/ncs6000/software/interfaces/command/reference/b-interfaces-cr-ncs6k/b_interfaces_cr50ncs_chapter_01001.pdf,acesso: 11/11/2026). Além disso, equipamentos como a linha Cisco Nexus reservam por padrão as VLANs 3968 a 4047 para uso interno ("The default is to allow all VLANs on the trunk interface: 1 to 3967 and 4048 to 4094. VLANs 3968 to 4047 are the default VLANs reserved for internal use by default; this group of VLANs is configurable.", fonte: https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus3548/103x/configuration/layer-2-switching/cisco-nexus-3548-nx-os-layer-2-switching-configuration-guide-103x/m-configuring-access-and-trunk-interfaces.html, acesso: 11/11/2026).

### Confirmar na empresa

- Padrão de segmentação de VLANs nas subestações e regionais da distribuidora em Roraima (qual VLAN ID é usado para Teleproteção/Automação SCADA, Medição, CFTV/Voz, Corporativo e Gerência de switches).
- Como os provedores locais entregam os links no formulário de ativação: se entregam a porta LAN do CPE em modo access (untagged) quando há apenas um serviço, ou em modo trunk com um VLAN ID delimitador designado pela operadora (quando o mesmo enlace físico entrega mais de um circuito ou chega agregado no COD/Data Center).
- Se nos links L2L contratados pela distribuidora o provedor já entrega com QinQ (dot1q-tunnel) e MTU ≥ 1504 bytes habilitada para permitir que a equipe de redes da concessionária crie ou altere suas VLANs internas sem precisar abrir chamado na operadora.

### Ideias de diagrama

- Comparação entre Porta Access (quadro Ethernet saindo sem tag para um único roteador/computador) e Porta Trunk 802.1Q (quadros recebendo uma etiqueta colorida de 4 bytes com TPID 0x8100 + Priority 0-7 + VLAN ID 1-4094 para atravessar a mesma fibra carregando tráfego de Automação, Corporativo e Voz).
- Esquema de "Dupla Marcação (QinQ / 802.1Q Tunneling)": o quadro sai do switch da subestação da distribuidora com a tag interna do cliente (C-VLAN, ex.: VLAN 10 e VLAN 20), recebe na borda do provedor uma tag externa única do contrato (S-VLAN, ex.: VLAN 500, somando +4 bytes na MTU) e chega intacto ao Centro de Operação com as VLANs 10 e 20 preservadas.
- Ilustração de um formulário de ativação (Designação de Circuito) destacando o campo VLAN ID de Entrega: 305 (Tagged 802.1Q) e mostrando o erro de conectividade quando o técnico configura a interface física do roteador sem subinterface .305 (untagged) enquanto o provedor espera quadros marcados na VLAN 305.

### Ideias de questão (só o conceito testado, sem alternativas)

- Motivo pelo qual um link físico aparece com protocolo óptico up (luz normal no SFP), mas não pinga o gateway do provedor porque o formulário de ativação exige VLAN ID 250 (Tagged 802.1Q) e a porta da distribuidora foi configurada como porta de acesso (untagged).
- Função do requisito contratual de "Transparência de VLAN (QinQ / Layer 2)" em um link L2L entre uma subestação e a sede da distribuidora.
- Necessidade de ajuste de MTU (no mínimo +4 bytes por tag 802.1Q adicionada) na rede da operadora para evitar fragmentação ou descarte de pacotes grandes quando se utiliza encapsulamento 802.1Q/QinQ.
- Identificação dos limites válidos de VLAN ID no padrão IEEE 802.1Q (1 a 4094, sendo 0 e 4095 reservados).

## Lição 4. Endereço IP e máscara no básico: o suficiente para ler um formulário de ativação de link (IP fixo, bloco, gateway)


### Objetivo prático

Interpretar os dados de endereçamento IP (bloco WAN /30 ou /31, bloco LAN de IPs públicos fixos /29 ou /28, máscara e gateway) em um Termo/Formulário de Ativação de Link para configurar ou testar o roteador/firewall de borda.


### Fatos


**L4-F01.** Um endereço IPv4 é composto por 32 bits binários divididos em quatro octetos de 8 bits cada (1 octeto = 8 bits), sendo separado em uma porção de rede/sub-rede e uma porção de host por meio de uma máscara de sub-rede também de 32 bits

- fonte: https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html
- trecho: "An IP address is an address used in order to uniquely identify a device on an IP network. The address is made up of 32 binary bits, which can be divisible into a network portion and host portion with the help of a subnet mask. The 32 binary bits are broken into four octets (1 octet = 8 bits)." / "Subnet mask - A 32-bit combination used to describe which portion of an address refers to the subnet and which part refers to the host."
- acesso: 11/11/2026

**L4-F02.** Com o CIDR (Classless Inter-Domain Routing), a máscara de sub-rede pode ser representada tanto em formato decimal pontuado quanto na notação prefixo/comprimento (/length), onde o número após a barra indica a quantidade de bits fixados em 1 na máscara (ex.: 255.255.255.224 é representado como /27)

- fonte: https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html
- trecho: "...the mask of 255.255.255.224 can also be denoted as /27 as there are 27 bits that are set in the mask. This second method is used with classless interdomain routing (CIDR). With this method, one of these networks can be described with the notation prefix/length. For example, 192.168.5.32/27 denotes the network 192.168.5.32 255.255.255.224."
- acesso: 11/11/2026

**L4-F03.** Segundo o plano de endereçamento e agregação CIDR (RFC 4632 / BCP 122), o encaminhamento de pacotes na Internet é sempre feito com base no prefixo mais específico (longest-match basis), e blocos delegados a clientes são descritos pelo par rota/máscara (como /21 = 255.255.248.0, /22 = 255.255.252.0, /23 = 255.255.254.0)

- fonte: https://www.rfc-editor.org/info/rfc4632/
- trecho: "1. Forwarding in the Internet is done on a longest-match basis." / "This block of networks is described by the route 10.24.0.0/21 (mask 255.255.248.0)."
- acesso: 11/11/2026

**L4-F04.** Em sub-redes IPv4 convencionais, identificadores de host compostos por todos os bits em zero (endereço da rede/sub-rede) ou todos os bits em um (endereço de broadcast) não podem ser atribuídos a equipamentos, de modo que o total de hosts utilizáveis é sempre o total de endereços do bloco menos 2

- fonte: https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html
- trecho: "...host ids of all zeros or all ones are not allowed (it is very important to remember this)." / "*Host all zeroes and all ones excluded."
- acesso: 11/11/2026

**L4-F05.** Tabela de quantidades de sub-redes e hosts efetivos (utilizáveis) para divisões de uma rede Classe C (/24): /25 (255.255.255.128) = 126 hosts efetivos; /26 (255.255.255.192) = 62 hosts efetivos; /27 (255.255.255.224) = 30 hosts efetivos; /28 (255.255.255.240) = 14 hosts efetivos; /29 (255.255.255.248) = 6 hosts efetivos; /30 (255.255.255.252) = 2 hosts efetivos

- fonte: https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html
- trecho: "Class C # bits | Mask | Effective Subnets | Effective Hosts: 1 | 255.255.255.128 | 2 | 126 / 2 | 255.255.255.192 | 4 | 62 / 3 | 255.255.255.224 | 8 | 30 / 4 | 255.255.255.240 | 16 | 14 / 5 | 255.255.255.248 | 32 | 6 / 6 | 255.255.255.252 | 64 | 2"
- acesso: 11/11/2026

**L4-F06.** Em enlaces ponto a ponto (como o link WAN entre o roteador da operadora e o roteador do cliente), enquanto a máscara /30 (255.255.255.252) consome 4 endereços (2 hosts, 1 rede all-zeros e 1 broadcast all-ones), a norma RFC 3021 padroniza o uso da máscara de 31 bits (/31 ou 255.255.255.254), que deixa apenas 1 bit de host e determina que os 2 únicos endereços resultantes sejam interpretados como endereços de host válidos

- fonte: https://www.rfc-editor.org/rfc/rfc3021.txt
- trecho: "In current practice, numbered Internet subnets do not use longer than a 30-bit subnet mask (in most cases), which requires four addresses per link - two host addresses, one all-zeros network, and one all- ones broadcast." / "If a 31-bit subnet mask is assigned to a point-to-point link, it leaves the <Host-number> with only 1 bit. Consequently, only two possible addresses may result: {<Network-number>, 0} and {<Network-number>, -1} These addresses have historically been associated with network and broadcast addresses (see Section 2.2). In a point-to-point link with a 31-bit subnet mask, the two addresses above MUST be interpreted as host addresses."
- acesso: 11/11/2026

**L4-F07.** A RFC 1918 (BCP 5) e a RFC 5735 reservam três blocos de endereços IPv4 para redes privadas (que podem ser usados internamente sem coordenação com registros de Internet e não aparecem legitimamente na Internet pública): 10.0.0.0/8 (10.0.0.0 – 10.255.255.255), 172.16.0.0/12 (172.16.0.0 – 172.31.255.255) e 192.168.0.0/16 (192.168.0.0 – 192.168.255.255)

- fonte: https://www.rfc-editor.org/rfc/rfc1918.txt
- trecho: "10.0.0.0 - 10.255.255.255 (10/8 prefix) 172.16.0.0 - 172.31.255.255 (172.16/12 prefix) 192.168.0.0 - 192.168.255.255 (192.168/16 prefix)"
- acesso: 11/11/2026

**L4-F08.** Rotas padrão (default routes / gateway of last resort) direcionam pacotes destinados a redes que não constam explicitamente na tabela de roteamento: em equipamentos com roteamento IP desabilitado (ou switches Camada 2), define-se o gateway padrão com ip default-gateway; já em roteadores com roteamento IP habilitado, configura-se o gateway of last resort com a rota estática ip route 0.0.0.0 0.0.0.0 apontando para o IP do próximo salto

- fonte: https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/16448-default.html
- trecho: "A static route configured with the command ip route 0.0. 0.0 0.0. 0.0 is another way to set the gateway of last resort on a router." / "Use the ip default-gateway command when ip routing is disabled on a Cisco router. Use the ip default-network or ip route 0.0. 0.0 0.0. 0.0 commands to set the gateway of last resort on Cisco routers that have ip routing enabled."
- acesso: 11/11/2026

**L4-F09.** Em contratos e formulários de ativação de Link Dedicado de Internet no Brasil, a operadora fornece endereçamento público fixo e roteável exclusivo para a contratante — tipicamente um bloco IPv4 /29 (6 IPs utilizáveis), um bloco /28 (14 IPs utilizáveis) ou 1 IP público fixo, além de um bloco IPv6 (/64 ou /48) — com delegação de DNS reverso e designação nos cadastros pertinentes

- fonte: https://pncp.gov.br/pncp-api/v1/orgaos/42357483000126/compras/2026/37/arquivos/2
- trecho: "3.1. A CONTRATADA deverá fornecer, para uso exclusivo da CONTRATANTE, 1 (um) bloco de endereçamento público IPv4 /29 e 1 (um) bloco IPv6 /64, válidos, roteáveis e livres de qualquer restrição que impeça sua plena utilização." / "3.3. A CONTRATADA deverá realizar a delegação de DNS reverso dos blocos IP fornecidos, de forma a permitir seu gerenciamento pela CONTRATANTE."
- acesso: 11/11/2026

### Divergências

- Enlace WAN ponto a ponto com máscara /30 vs /31: Pela regra tradicional de sub-redes IPv4, os endereços de host todos 0 e todos 1 são proibidos ("...host ids of all zeros or all ones are not allowed (it is very important to remember this).", fonte: https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html, acesso: 11/11/2026), exigindo uma máscara /30 (255.255.255.252, 4 endereços por link para ter 2 utilizáveis). Já a RFC 3021 permite o uso de /31 (255.255.255.254, 2 endereços por link) em enlaces ponto a ponto interpretando ambos os endereços como hosts, mas ressalta que se apenas um dos lados suportar prefixos de 31 bits o enlace pode não operar corretamente ("In a point-to-point link with a 31-bit subnet mask, the two addresses above MUST be interpreted as host addresses." e "Note that a point-to-point link in which only one end supports the use of 31- bit prefixes may not operate correctly.", fonte: https://www.rfc-editor.org/rfc/rfc3021.txt, acesso: 11/11/2026).
- Tamanho do bloco IPv4 e IPv6 exigido em contratos públicos de Link Dedicado: Enquanto alguns editais exigem apenas 1 endereço IPv4 público fixo ("A CONTRATADA deverá disponibilizar 01 endereço IPV4 fixo e válido para provimento da solução de Internet.", fonte: https://www.camarauberlandia.mg.gov.br/cotacao-compras/011-tr-link-acesso-internet-ti.pdf/@@download/file, acesso: 11/11/2026), outros exigem no mínimo um bloco /29 (6 IPs utilizáveis) com IPv6 /64 ("1 (um) bloco de endereçamento público IPv4 /29 e 1 (um) bloco IPv6 /64", fonte: https://pncp.gov.br/pncp-api/v1/orgaos/42357483000126/compras/2026/37/arquivos/2, acesso: 11/11/2026) ou IPv6 /48 ("IP público: Bloco IPv4 /29" / "Bloco IPv6 /48 entregue", fonte: https://pncp.gov.br/pncp-api/v1/orgaos/07337989000172/compras/2025/2/arquivos/5, acesso: 11/11/2026), e contratos de maior porte exigem uma sub-rede /28 com 14 IPs utilizáveis ("uma sub-rede com endereços IP ́s /28 (14 IP’s), válidos para acesso à Internet", fonte: https://pncp.gov.br/pncp-api/v1/orgaos/04696490000163/compras/2026/85/arquivos/1, acesso: 11/11/2026).

### Confirmar na empresa

- Como os provedores de link dedicado em Roraima entregam o bloco público /29 ou /28 para os firewalls da distribuidora: se configuram o primeiro IP utilizável na porta LAN do CPE da operadora (servindo como Default Gateway e restando 5 IPs livres no /29 para o par de firewalls da distribuidora) ou se entregam uma WAN /30 (ou /31) e roteiam o bloco /29 inteiro de forma limpa para o IP WAN do firewall da concessionária.
- Se a distribuidora possui Sistema Autônomo (ASN próprio) com blocos IP próprios anunciados via BGP nos links do Data Center em Boa Vista, ou se utiliza os blocos /29 e /28 cedidos pelas operadoras contratadas.
- Qual faixa de IPs privados da RFC 1918 (10.0.0.0/8, 172.16.0.0/12 ou 192.168.0.0/16) é padronizada internamente para as subestações, agências de atendimento no interior do estado e enlaces WAN MPLS/L2L.

### Ideias de diagrama

- Mapa visual de um bloco /29 (8 endereços consecutivos, ex.: .0 a .7, máscara 255.255.255.248) mostrando por que existem 8 números mas apenas 6 são utilizáveis: .0 bloqueado (Endereço de Rede), .1 na porta LAN do CPE da operadora (Gateway), .2 a .6 livres para os Firewalls/VIPs da distribuidora (5 IPs livres para o cliente), e .7 bloqueado (Endereço de Broadcast).
- Comparativo de enlace ponto a ponto WAN entre PE (Operadora) e CE (Cliente): modelo /30 (255.255.255.252 com 4 endereços: Rede, IP Operadora, IP Cliente, Broadcast) versus modelo /31 da RFC 3021 (255.255.255.254 com apenas 2 endereços: IP Operadora e IP Cliente, sem desperdício).
- Régua de consulta rápida para formulário de ativação: /31 (2 IPs ponto a ponto RFC 3021, máscara .254), /30 (4 total / 2 utilizáveis, máscara .252), /29 (8 total / 6 utilizáveis, máscara .248), /28 (16 total / 14 utilizáveis, máscara .240), /27 (32 total / 30 utilizáveis, máscara .224), /26 (64 total / 62 utilizáveis, máscara .192) e /25 (128 total / 126 utilizáveis, máscara .128).

### Ideias de questão (só o conceito testado, sem alternativas)

- Cálculo de quantos IPs públicos efetivamente sobram para os equipamentos da distribuidora quando o provedor entrega um bloco /29 (255.255.255.248, 6 hosts utilizáveis) e utiliza 1 dos endereços utilizáveis na porta LAN do CPE como Default Gateway.
- Identificação de erro de preenchimento quando alguém tenta configurar o endereço de Rede (todos os bits de host em 0) ou o endereço de Broadcast (todos os bits de host em 1) de uma sub-rede /30 ou /29 na interface do firewall.
- Distinção entre um endereço IP privado da RFC 1918 (usado no link MPLS/L2L interno entre subestações) e um endereço IP público fixo roteável (usado na borda do Link Dedicado de Internet).
- Papel do endereço de Gateway informado na ficha de ativação do link e diferença entre ip default-gateway (Camada 2) e ip route 0.0.0.0 0.0.0.0 (Camada 3).

## Lição 5. MPLS, L2L e link de internet dedicado: o que cada um entrega, no nível de entender o que o fornecedor vende


### Objetivo prático

Distinguir tecnicamente e contratualmente o que o fornecedor entrega em um circuito L2L (Camada 2 ponto a ponto), em uma rede MPLS (VPN Camada 3 multiponto) e em um Link de Internet Dedicado (DIA), evitando contratar ou testar o serviço errado para subestações e escritórios.


### Fatos


**L5-F01.** Na arquitetura MPLS (Multiprotocol Label Switching, padronizada na RFC 3031), um roteador que suporta MPLS é chamado de LSR (Label Switching Router) e encaminha pacotes usando um rótulo (label) curto e de tamanho fixo que identifica a classe de equivalência de encaminhamento (FEC), podendo carregar múltiplos rótulos organizados em uma pilha (label stack) ao longo de um caminho comutado por rótulos (LSP)

- fonte: https://www.rfc-editor.org/info/rfc3031/
- trecho: "A router which supports MPLS is known as a "Label Switching Router", or LSR." / "A label is a short, fixed length, locally significant identifier which is used to identify a FEC. The label which is put on a particular packet represents the Forwarding Equivalence Class to which that packet is assigned." / "As we shall see, it is useful to have a more general model in which a labeled packet carries a number of labels, organized as a last-in, first-out stack. We refer to this as a "label stack"."
- acesso: 11/11/2026

**L5-F02.** Em uma VPN IP sobre BGP/MPLS (Camada 3 / L3VPN, padronizada na RFC 4364, que tornou obsoleta a RFC 2547), cada localidade (site) do cliente possui um ou mais dispositivos CE (Customer Edge, tipicamente roteadores) conectados por um circuito de acesso (attachment circuit) a um ou mais roteadores de borda do provedor chamados PE (Provider Edge), enquanto os roteadores do backbone da operadora que não se conectam a dispositivos CE são chamados de roteadores P

- fonte: https://www.rfc-editor.org/info/rfc4364/
- trecho: "Data packets are tunneled through the backbone, so that the core routers do not need to know the VPN routes. This document obsoletes RFC 2547 ." / "Each VPN site must contain one or more Customer Edge (CE) devices. Each CE device is attached, via some sort of attachment circuit, to one or more Provider Edge (PE) routers. Routers in the SP's network that do not attach to CE devices are known as "P routers"."
- acesso: 11/11/2026

**L5-F03.** Para manter o isolamento de rotas entre diferentes clientes que compartilham o mesmo backbone da operadora, cada roteador PE mantém múltiplas tabelas de encaminhamento independentes chamadas VRFs (VPN Routing and Forwarding tables), associando cada circuito de acesso PE/CE a uma VRF específica

- fonte: https://www.rfc-editor.org/info/rfc4364/
- trecho: "Each PE router maintains a number of separate forwarding tables. One of the forwarding tables is the "default forwarding table". The others are "VPN Routing and Forwarding tables", or "VRFs"." / "Every PE/CE attachment circuit is associated, by configuration, with one or more VRFs."
- acesso: 11/11/2026

**L5-F04.** Na modalidade de serviço com CE gerenciado (managed CE service), o provedor fornece e gerencia tanto o roteador PE quanto o roteador CE instalado no cliente, e os dispositivos CE e PE delimitam os domínios do cliente e do provedor, interconectados pelo Attachment Circuit (AC) em Camada 2 e/ou Camada 3

- fonte: https://www.rfc-editor.org/rfc/rfc9889.txt
- trecho: "A CE is a function that provides logical connectivity of a customer site (Section 3.3. 1) to the provider network (Section 3.3. 3). The logical connectivity is enforced at Layer 2 and/or Layer 3 and is denominated an Attachment Circuit (AC) (Section 3.3. 5)." / "An example of a distributed PE is the "managed CE service". For example, a provider delivers VPN services using CEs and PEs that are both managed by the provider (example (i) in Figure 5)."
- acesso: 11/11/2026

**L5-F05.** Em serviços de VPN de Camada 2 (L2VPN), o modelo VPWS (Virtual Private Wire Service, detalhado na RFC 4664) fornece conexões ponto a ponto entre pares de equipamentos CE, enquanto o modelo VPLS (Virtual Private LAN Service, RFC 4665) entrega um serviço multiponto em Camada 2 onde o roteador PE encaminha os quadros com base nas informações do cabeçalho de Camada 2, como o endereço MAC de destino

- fonte: https://www.rfc-editor.org/info/rfc6575/
- trecho: "The Virtual Private Wire Service (VPWS), detailed in RFC 4664 , provides point-to-point connections between pairs of Customer Edge (CE) devices."
- acesso: 11/11/2026

**L5-F06.** Nos contratos públicos de telecomunicações no Brasil, o circuito L2L (Lan-to-Lan / Clear Channel) consiste em um circuito privado ponto a ponto entregue em Camada 2 (Ethernet) com transparência de protocolo (permitindo passagem nativa de VLANs 802.1Q sem interferência de roteamento do provedor), ao passo que a Rede MPLS entrega uma VPN privativa multiponto em Camada 3 com roteamento inteligente e configuração de filas de prioridade (QoS) para tráfego crítico de voz, vídeo e dados

- fonte: https://pncp.gov.br/pncp-api/v1/orgaos/04696490000163/compras/2026/85/arquivos/1
- trecho: "O serviço consiste na disponibilização de um circuito privado e exclusivo de transporte de dados via fibra óptica, operando em topologia ponto-a-ponto (L2L) ou multiponto (MPLS)." / "Tecnologia: Entrega em Layer 2 (transparência de protocolo) ou Layer 3 (roteamento inteligente com MPLS)." / "L2L (Lan-to-Lan / Clear Channel): Entrega em Layer 2 (Ethernet)." / "MPLS (Multi-Protocol Label Switching): Ideal para redes VPN Layer 3, permitindo roteamento inteligente e priorização de tráfego (QoS)." / "Configuração de QoS (Quality of Service): Parametrização completa das filas de prioridade para tráfego crítico (voz, vídeo e dados), essencial em circuitos MPLS de 200 Mbps."
- acesso: 11/11/2026

**L5-F07.** O Link de Internet Dedicado (DIA - Dedicated Internet Access) entrega um circuito exclusivo e permanente (24 horas por dia, 7 dias por semana) entre o cliente e o backbone de Internet da operadora, diferenciando-se da banda larga comum por oferecer simetria total (100% da velocidade contratada para download e upload), banda não compartilhada (relação 1:1, sem oversubscription ou traffic shaping), bloco de IPs públicos fixos e SLA corporativo

- fonte: https://pncp.gov.br/pncp-api/v1/orgaos/04696490000126/compras/2026/85/arquivos/1
- trecho: "Fornecimento de solução de conectividade IP dedicada (Dedicated Internet Access - DIA), via fibra óptica terrestre, garantindo uma largura de banda de1Gbps (um Gigabits por segundo)." / "Simetria Total: Garantia de 100% da velocidade contratada tanto para download quanto para upload. Banda Não Compartilhada: Circuito exclusivo entre o Backbone da operadora e o Data Center do DER/RO, sem disputa de banda (oversubscription)." / "O acesso deverá ser permanente (24 horas por dia e 07 dias por semana, a partir de sua ativação), dedicado, exclusivo, ou seja, serviço determinístico na rede de acesso e com total conectividade IP;"
- acesso: 11/11/2026

### Divergências

- Termo "MPLS" na norma técnica (tecnologia de transporte que suporta L2 e L3) vs nos editais e contratos (serviço VPN Camada 3): Nas normas da IETF, uma rede MPLS (RFC 3031) transporta tanto circuitos ponto a ponto de Camada 2 (VPWS, RFC 4664) quanto VPNs roteadas de Camada 3 (BGP/MPLS IP VPN, RFC 4364, que tornou obsoleta a RFC 2547: "This document obsoletes RFC 2547 .", fonte: https://www.rfc-editor.org/info/rfc4364/, acesso: 11/11/2026). Já nos editais brasileiros, "L2L" designa a entrega privada ponto a ponto em Camada 2 e "MPLS" designa a VPN multiponto em Camada 3 (por vezes ainda referenciando a RFC 2547 obsoleta, como em "b) Utilização de redes privadas virtuais (VPN - Virtual Private Networks) sobre a tecnologia MPLS, de acordo com a RFC 2547.", fonte: https://pncp.gov.br/pncp-api/v1/orgaos/87612982000150/compras/2026/123/arquivos/2, acesso: 11/11/2026, ou agrupando ambos como "Comunicação de Dados Terrestre Dedicada (MPLS / L2L)" e diferenciando "L2L (Lan-to-Lan / Clear Channel): Entrega em Layer 2 (Ethernet)." vs "MPLS (Multi-Protocol Label Switching): Ideal para redes VPN Layer 3, permitindo roteamento inteligente e priorização de tráfego (QoS).", fonte: https://pncp.gov.br/pncp-api/v1/orgaos/04696490000163/compras/2026/85/arquivos/1, acesso: 11/11/2026).

### Confirmar na empresa

- Qual modalidade é usada para conectar as subestações e agências do interior de Roraima (ex.: Rorainópolis, Caracaraí, Mucajaí, Alto Alegre, Pacaraima) ao Centro de Operação (COD) em Boa Vista: se são circuitos L2L ponto a ponto (Camada 2, onde os switches/roteadores da própria distribuidora fecham VLANs e roteamento direto ponta a ponta) ou uma nuvem MPLS L3VPN (onde os roteadores da distribuidora trocam rotas com o PE da operadora e dependem de um Concentrador MPLS na sede).
- Se a distribuidora utiliza links de Internet Dedicados (DIA) ou conexões secundárias nas localidades remotas para fechar túneis criptografados (SD-WAN / IPsec) como contingência da rede MPLS/L2L principal.

### Ideias de diagrama

- Diagrama comparativo em três painéis mostrando a mesma distribuidora conectando a Sede (Boa Vista) e duas Subestações: 1. L2L (Lan-to-Lan / Camada 2): "Cabo Ethernet virtual" privado ponto a ponto ligando cada subestação diretamente à sede; passa VLANs 802.1Q de forma transparente; não acessa a Internet. 2. Rede MPLS (VPN Camada 3): Nuvem privativa multiponto onde cada unidade entrega pacotes IP ao roteador PE da operadora (isolado em uma VRF exclusiva da distribuidora), permitindo comunicação qualquer-para-qualquer com filas de QoS; não acessa a Internet diretamente. 3. Link de Internet Dedicado (DIA / Camada 3 Pública): Tubo exclusivo e simétrico (1:1) entre o Firewall da Sede e a Internet Pública Mundial, com bloco de IPs públicos fixos (/29 ou /28) e proteção anti-DDoS.
- Esquema da nomenclatura técnica CE – AC – PE – P – PE – AC – CE: mostrando onde fica o equipamento da distribuidora, o CPE gerenciado na sala de telecom, a fibra de última milha (Attachment Circuit) e os roteadores de borda (PE com VRF) e de núcleo (P) da operadora.

### Ideias de questão (só o conceito testado, sem alternativas)

- Escolha do serviço adequado quando a equipe de automação/redes precisa transportar múltiplas VLANs 802.1Q e protocolos de Camada 2 diretamente entre uma subestação e o Centro de Operação sem que a operadora faça roteamento IP no caminho (L2L vs MPLS L3VPN vs Link Dedicado de Internet).
- Diferença entre um Link de Internet Dedicado (DIA) e um plano de internet banda larga comum quanto à simetria de upload/download, garantia de 100% da banda sem compartilhamento e entrega de bloco de IPs públicos fixos.
- Função da VRF (VPN Routing and Forwarding) no roteador PE da operadora para garantir que o tráfego MPLS da distribuidora não se misture com o de outros clientes da mesma operadora.

## Lição 6. Como tudo isso aparece num contrato de link: banda, latência, perda de pacotes, disponibilidade e onde o fornecedor entrega o serviço


### Objetivo prático

Fiscalizar contratos de links de telecomunicações em Roraima, validando testes de ativação (banda simétrica, latência, perda de pacotes), calculando descontos/glosas por indisponibilidade mensal (SLA) e identificando o limite exato de responsabilidade física (PTR / DIO / porta LAN do CPE).


### Fatos


**L6-F01.** No Brasil, a prestação de links dedicados e circuitos corporativos de dados é enquadrada pela ANATEL como Serviço de Comunicação Multimídia (SCM), regido pelo Regulamento aprovado pela Resolução nº 614, de 28 de maio de 2013

- fonte: https://informacoes.anatel.gov.br/legislacao/index.php/component/content/article?id=813
- trecho: "CONSIDERANDO o Regulamento do Serviço de Comunicação Multimídia, aprovado pela Resolução nº 614, de 28 de maio de 2013;"
- acesso: 11/11/2026

**L6-F02.** A regulamentação da ANATEL define oficialmente o Ponto de Terminação de Rede (PTR) como o ponto de conexão da rede externa da operadora com a rede interna do assinante

- fonte: https://www.anatel.gov.br/Portal/verificaDocumentos/documento.asp?numeroPublicacao=116032
- trecho: "XIII - Ponto de Terminação de Rede (PTR): ponto de conexão da rede externa com a rede interna do assinante;"
- acesso: 11/11/2026

**L6-F03.** Na padronização internacional da UIT (ITU-T E.800 Series Supplement 8 e Recomendação ITU-T Y.1541), a interface física que interconecta a rede do cliente (roteador CE) e a rede de acesso do provedor (roteador PE) é denominada UNI (User-Network Interface) ou CPI (Customer to Provider Interface)

- fonte: https://www.itu.int/epublications/publication/itu-t-e-800-series-suppl-8-2009-11-guidelines-for-inter-provider-quality-of-service
- trecho: "2.1. 6 customer to provider interface (CPI): The interface where a physical link interconnects a customer's network and a single provider's access network. This may also be referred to as a CE to PE interface or CE-PE link interface. [ITU-T Y. 1541] refers to this interface as the UNI."
- acesso: 11/11/2026

**L6-F04.** A Recomendação ITU-T Y.1541 define os parâmetros normativos de desempenho de redes IP — IPTD (IP Packet Transfer Delay / atraso de transferência de pacote IP), IPDV (IP Packet Delay Variation / variação de atraso), IPLR (IP Packet Loss Ratio / taxa de perda de pacotes IP), IPER (IP Packet Error Ratio) e PIA (Percent IP service Availability) — sugerindo um campo de informação de pacote máximo de 1500 bytes para avaliação e um limite superior de perda de pacotes (IPLR) de 1 × 10–3 (0,1%) nas classes 0 e 1

- fonte: https://www.itu.int/epublications/publication/itu-t-y-1541-2011-12-network-performance-objectives-for-ip-based-services
- trecho: "IPLR. Upper bound on the packet loss probability. 1 × 10–3 (Note 4) 1 × 10–3 (Note 4) ... According to the definition of IPTD in [ITU-T Y. 1540], packet insertion time is included in the IPTD objective. This Recommendation suggests a maximum packet information field of 1500 bytes for evaluating these objectives."
- acesso: 11/11/2026

**L6-F05.** Nos contratos públicos de comunicação de dados, QoS (Quality of Service) abrange as especificações dos parâmetros de disponibilidade, perda de pacotes, latência, jitter e largura de banda, enquanto o SLA (Service Level Agreement / Acordo de Nível de Serviço) estabelece entre o prestador e o usuário os limites desses parâmetros de QoS, bem como o Tempo Médio de Reparo (TMR / MTTR) e o Tempo Médio Entre Falhas (MTBF)

- fonte: https://pncp.gov.br/pncp-api/v1/orgaos/49979255000137/compras/2026/51/arquivos/2
- trecho: "3.2.19. QoS (Quality of Service): é uma abstração sobre as especificações dos parâmetros de disponibilidade, perda de pacotes, latência, jitter e largura de banda de uma rede de comunicação de dados. Diz-se que uma rede de dados está configurada com QoS quando os valores medidos para os parâmetros acima não excedem os limites especificados." / "3.2.22. SLA (Service Level Agreement): é um acordo de nível de serviço (ANS) estabelecido entre um prestador e um usuário para estabelecer os limites dos parâmetros de QoS, bem como os valores do tempo médio de reparo (TMR) e do tempo médio entre falhas (MTBF), entre outros."
- acesso: 11/11/2026

**L6-F06.** O contrato define a Última Milha como o circuito dedicado entre o roteador de borda do provedor (PE) e o equipamento nas dependências do cliente (CPE), define o CPE (Customer Premises Equipment) como o equipamento ou conjunto de equipamentos instalados no ambiente físico do cliente para interconexão com o backbone do fornecedor, e fixa que o limite de atuação da contratada para manutenção, configuração, gerenciamento e garantia do SLA é a porta LAN dos seus roteadores ou switches (CPE)

- fonte: https://pncp.gov.br/pncp-api/v1/orgaos/49979255000137/compras/2026/51/arquivos/2
- trecho: "3.2.6. CPE (Customer Premises Equipment): é qualquer tipo de equipamento, ou conjunto de equipamentos, instalados no ambiente físico do cliente e necessários para promover a interconexão entre o ambiente de rede local e o backbone do fornecedor." / "3.2.26. Última milha: circuito dedicado entre o roteador de borda do provedor (PE) e o roteador ou switch existente nas dependências do cliente (CPE)." / "3.3.2. O limite de atuação da contratada para fins de manutenção, configuração e gerenciamento será a porta LAN de seus roteadores ou switches, de forma a garantir os níveis de serviço contratados."
- acesso: 11/11/2026

**L6-F07.** Na entrega física em fibra óptica, a contratada fornece em comodato o roteador/switch de borda (CPE) com portas elétricas RJ-45 (1000BASE-T) ou ópticas SFP+ (10 Gbps) conforme a necessidade do cliente, além do DIO (Distribuidor Interno Óptico), cabos e acessórios, sendo responsável exclusiva pela manutenção preventiva e corretiva até a porta LAN do CPE

- fonte: https://pncp.gov.br/pncp-api/v1/orgaos/04696490000163/compras/2026/85/arquivos/1
- trecho: "Equipamento de Borda (CPE): Fornecimento, em regime de comodato, de roteador/switch de alta performance com portas SFP+ (10 Gbps) para evitar gargalos na entrega do total de 2 links de 1Gbps." / "Conectividade: Entrega física via interface Ethernet (RJ45 ou Fibra) em equipamento de borda (CPE) gerenciado." / "MANUTENÇÃO: A CONTRATADA é a única responsável pela configuração, atualização de firmware, segurança lógica e manutenção física do equipamento (preventiva e corretiva)."
- acesso: 11/11/2026

**L6-F08.** Para a Largura de Banda, os contratos exigem 100% de garantia de banda downstream (download) e upstream (upload) em modo full-duplex simétrico, proibindo expressamente qualquer aplicação de traffic shaping, rate limit indevido ou degradação artificial do tráfego

- fonte: https://pncp.gov.br/pncp-api/v1/orgaos/42357483000126/compras/2026/37/arquivos/2
- trecho: "O serviço deverá operar sem aplicação de traffic shaping ou limitação de banda, garantindo entrega da velocidade contratada de forma simétrica." / "Não será permitido qualquer tipo de traffic shaping, rate limit indevido, bloqueio seletivo ou mecanismo de degradação artificial do tráfego da CONTRATANTE."
- acesso: 11/11/2026

**L6-F09.** Fórmula contratual de cálculo da Disponibilidade Mensal: Disponibilidade (%) = (Total de horas do período – horas de indisponibilidade) × 100 ÷ Total de horas do período (ou, quando calculado o percentual de minutos excedidos no mês, Vpd = (Te / (1.440 * Nd)) * 100, onde 1.440 é o total de minutos de um dia e Nd é o número de dias no mês)

- fonte: https://www.uchoa.sp.gov.br/images/licitacoes/anexo-i-termo-de-referencia-122026.pdf
- trecho: "A disponibilidade mínima mensal do serviço deverá ser de: 99,5% (noventa e nove vírgula cinco por cento). A disponibilidade será calculada mediante a fórmula: Disponibilidade (%) = (Total de horas do período – horas de indisponibilidade) × 100 ÷ Total de horas do período"
- acesso: 11/11/2026

**L6-F10.** Em contratos públicos no estado de Roraima (como no Termo de Referência de Link Dedicado da Prefeitura de Rorainópolis/RR em 2026), exige-se entrega via fibra óptica 100% terrestre, banda simétrica garantida (ex.: 500 Mbps de download e 500 Mbps de upload), IP fixo e válido, latência inferior a 50 ms para o backbone nacional, disponibilidade mínima de 99,5% ao mês, suporte técnico 24x7 com início do atendimento presencial em até 4 horas da abertura do chamado, fornecimento de roteador de borda em comodato e emissão de Termo de Ativação após testes de certificação de velocidade, latência e perda de pacotes

- fonte: https://pncp.gov.br/pncp-api/v1/orgaos/01613031000180/compras/2026/47/arquivos/1
- trecho: "O Link Dedicado deverá ser entregue por meio de fibra óptica 100% terrestre, com banda simétrica garantida, IP fixo e válido, latência inferior a 50 ms para o backbone nacional, disponibilidade mínima de 99,5% ao mês e suporte técnico 24 horas por dia, 7 dias por semana, com início do atendimento presencial em até 4 (quatro) horas da abertura do chamado." / "...realizar testes de certificação de velocidade, latência e perda de pacotes e emitir Termo de Ativação individualizado por ponto."
- acesso: 11/11/2026

**L6-F11.** Limites contratuais de Latência e Perda de Pacotes em termos de referência federais: latência máxima de 10 ms para redes metropolitanas e de 50 ms para redes nacionais, e taxa de perda de pacotes inferior a 1% (ou não superior a 1%) em condições normais de tráfego/operação

- fonte: https://pncp.gov.br/pncp-api/v1/orgaos/42357483000126/compras/2026/37/arquivos/2
- trecho: "c) Latência e Perda de Pacotes: a. Latência máxima de 10 ms para redes metropolitanas e 50 ms para redes nacionais. b. Perda de pacotes inferior a 1% em condições normais de tráfego."
- acesso: 11/11/2026

### Divergências

- Índices de Disponibilidade (SLA) entre diferentes contratos (99,5% vs 99,7% vs 99,8% vs separação entre acesso e backbone): Contratos padrão de link dedicado exigem 99,5% ao mês ("disponibilidade mínima de 99,5% ao mês", fonte: https://pncp.gov.br/pncp-api/v1/orgaos/01613031000180/compras/2026/47/arquivos/1, acesso: 11/11/2026, ou limite de até 4 horas de inoperância mensal com MTTR de 2 horas: "com SLA 99,5% de disponibilidade e MTTR de 02 horas." e "em um período mensal, não fique inoperante por um período superior a 4 (quatro) horas, considerando o somatório de todas as paralisações do mês.", fonte: https://www.camarauberlandia.mg.gov.br/cotacao-compras/011-tr-link-acesso-internet-ti.pdf/@@download/file, acesso: 11/11/2026); porém, outros contratos públicos exigem 99,7% ao mês ("Disponibilidade mínima mensal do serviço de 99,7%.", fonte: https://www.cofen.gov.br/wp-content/uploads/2013/11/termo-de-referencia_.pdf,acesso: 11/11/2026), 99,8% ao ano ("Disponibilidade (SLA): Índice de disponibilidade anual mínima de 99,8%, com suporte técnico 24x7x365.", fonte: https://pncp.gov.br/pncp-api/v1/orgaos/04696490000163/compras/2026/85/arquivos/1, acesso: 11/11/2026) ou diferenciam o SLA do acesso (última milha) e do backbone ("Disponibilidade mínima de 98,89% nos acessos e de 99,8% no backbone", fonte: https://anexos.portovelho.ro.gov.br/compras/7423/20145/Edital-Retificado-PE-044.2024-PROC.-14542.2023Assinado.pdf, acesso: 11/11/2026).
- Limite de Perda de Pacotes na norma ITU-T Y.1541 vs nos contratos públicos de link: Na Recomendação ITU-T Y.1541, o limite superior de probabilidade de perda de pacotes (IPLR) para classes de tráfego IP sensíveis a atraso (Classes 0 e 1) é de 1 × 10–3, equivalente a 0,1% ("IPLR. Upper bound on the packet loss probability. 1 × 10–3 (Note 4) 1 × 10–3 (Note 4)", fonte: https://www.itu.int/epublications/publication/itu-t-y-1541-2011-12-network-performance-objectives-for-ip-based-services, acesso: 11/11/2026), enquanto editais de links corporativos de internet adotam o limite de até 1% ("Perda de pacotes inferior a 1% em condições normais de tráfego.", fonte: https://pncp.gov.br/pncp-api/v1/orgaos/42357483000126/compras/2026/37/arquivos/2, acesso: 11/11/2026).
- Limites de Latência conforme o destino de medição e condição de mitigação DDoS: Contratos variam o limite de latência conforme o ponto de referência: até 5 ms para o Ponto de Troca de Tráfego local ("A latência não deverá ultrapassar 5ms para o Ponto de Troca", fonte: https://tramandai.rs.gov.br/editais/b9e648437d7e7ea9a5d4a0c42a160950.pdf,acesso: 11/11/2026), até 10 ms para redes metropolitanas e 50 ms para redes nacionais, até 20 ms para destinos nacionais principais em contratos do Sudeste ("até 20 ms para destinos nacionais principais;", fonte: https://www.uchoa.sp.gov.br/images/licitacoes/anexo-i-termo-de-referencia-122026.pdf, acesso: 11/11/2026), e admitem elevação para até 150 ms (centros de limpeza nacionais) ou 250 ms (centros internacionais) durante períodos de mitigação de ataques DDoS ("Nos períodos de ataque a latência do circuito deverá ser de no máximo 150ms (cento e cinquenta milissegundos) quando a mitigação se originar dos centros de limpeza nacionais e de no máximo 250ms (duzentos e cinquenta milissegundos) quando se originar dos centros internacionais;", fonte: https://pncp.gov.br/pncp-api/v1/orgaos/04696490000163/compras/2026/85/arquivos/1, acesso: 11/11/2026).

### Confirmar na empresa

- Quais são os valores exatos de SLA vigentes nos contratos da distribuidora em Roraima: disponibilidade mensal exigida (ex.: 99,5% ou 99,8%), prazo máximo de reparo (MTTR/TMR) na capital Boa Vista versus em subestações do interior ao longo da BR-174 e BR-210 (ex.: 2h, 4h ou 8h), e tetos de latência (considerando a distância óptica de Boa Vista até Manaus/PTT-SP) e perda de pacotes.
- Onde fica fisicamente o ponto de demarcação de responsabilidade nos contratos da concessionária: se o provedor entrega o CPE gerenciado dentro do bastidor da subestação/sede (demarcação na porta LAN RJ-45 ou SFP+ do CPE da operadora) ou se entrega apenas a fibra óptica iluminada no DIO/DGO (PTR) para conexão direta no roteador da própria distribuidora.
- Regra de abertura e fechamento de chamado para contagem de indisponibilidade (se o relógio do SLA conta a partir do registro do protocolo na central 0800/portal da operadora ou da detecção pelo monitoramento da distribuidora, e como são tratadas janelas de manutenção programada).

### Ideias de diagrama

- Desenho físico do "Caminho da Entrega e Demarcação de Responsabilidade": Poste na rua (Rede Externa da Operadora / Última Milha) → Entrada Subterrânea da Subestação → DIO (Distribuidor Interno Óptico no rack, onde ocorre a fusão e fica o PTR da rede óptica) → Cordão Óptico → Porta WAN (SFP) do Roteador CPE da Operadora → Porta LAN (RJ-45 1000BASE-T ou SFP+ 10G) do CPE (Limite de Responsabilidade / Ponto de Entrega do Serviço) → Firewall/Switch da Distribuidora.
- Infográfico de "Tradução da Porcentagem de Disponibilidade em Horas Paradas num mês de 30 dias (720 horas / 43.200 minutos)": mostrando visualmente que 99,0% permite 7h12min fora do ar; 99,5% permite 3h36min fora do ar; 99,7% permite 2h09min fora do ar; e 99,8% permite apenas 1h26min fora do ar no mês inteiro.
- Painel de um "Termo de Aceite / Homologação de Ativação de Link" mostrando os 5 cheques obrigatórios do técnico: (1) Banda Download = Upload = 100% contratado; (2) Latência dentro da meta (ex.: < 10 ms metro / < 50 ms nacional); (3) Perda de pacotes = 0% (limite < 1%); (4) Bloco IP / VLAN testados na porta LAN do CPE; (5) Nível óptico Rx/Tx dentro da ficha do SFP no DIO/CPE.

### Ideias de questão (só o conceito testado, sem alternativas)

- Cálculo prático da disponibilidade mensal percentual de um link de subestação que ficou inoperante por 6 horas em um mês de 30 dias (720 horas totais → (720 - 6) × 100 ÷ 720 = 99,16%) e verificação de violação de um SLA contratual de 99,5%.
- Identificação de quem é a responsabilidade de manutenção quando o link cai e o técnico verifica que o defeito está entre o DIO de entrada e a porta WAN do roteador CPE em comodato, versus quando o defeito está em um switch interno da distribuidora conectado após a porta LAN do CPE.
- Avaliação de um relatório de ativação de um link dedicado de 500 Mbps que entregou 500 Mbps de download, mas apenas 150 Mbps de upload e 2,5% de perda de pacotes, confrontando com as cláusulas de simetria (100% download/upload) e limite de perda de pacotes (< 1%).
- Diferença entre prazo de início de atendimento presencial (ex.: até 4 horas da abertura do chamado) e prazo de conclusão do reparo/restabelecimento do serviço (MTTR/TMR).

## Fontes

- Cisco Small Business 1 Gigabit Ethernet SFP Transceiver Modules Data Sheet (MGBLH1, MGBLX1, MGBSX1, MGBT1) | https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/small-business-network-accessories/datasheet-c78-741408.pdf | fabricante
- Cisco SFP and SFP+ Transceiver Module Installation Notes | https://www.cisco.com/c/en/us/td/docs/interfaces_modules/transceiver_modules/installation/note/78_15160.html | fabricante
- Cisco Network Convergence System 4200 Series Data Sheet | https://www.cisco.com/c/en/us/products/collateral/optical-networking/network-convergence-system-4200-series/datasheet-c78-737800.pdf/1000 | fabricante
- Cisco Network Convergence System 2000 Series Pluggable Optical Modules Data Sheet | https://www.cisco.com/c/en/us/products/collateral/optical-networking/network-convergence-system-2000-series/pluggable-optical-modules-ds.html | fabricante
- Cisco NCS 4200 Series Pluggable Optics Data Sheet | https://www.cisco.com/c/en/us/products/collateral/optical-networking/network-convergence-system-4200-series/datasheet-c78-738105.html | fabricante
- Cisco 10GBASE SFP+ Modules Data Sheet | https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/data_sheet_c78-455693.html | fabricante
- Cisco Nexus 7000 Series 10G SFP+ Data Sheet | https://www.cisco.com/c/en/us/products/collateral/switches/nexus-7000-series-switches/data_sheet_c78-605482.html | fabricante
- Cisco SFP Modules for Gigabit Ethernet Applications Data Sheet | https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/gigabit-ethernet-gbic-sfp-modules/datasheet-c78-366584.html | fabricante
- Cisco 25GBASE SFP28 Modules Data Sheet | https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/datasheet-c78-736950.html | fabricante
- Cisco 40GBASE QSFP Modules Data Sheet | https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/data_sheet_c78-660083.html | fabricante
- Cisco Nexus 7000 Series 40G QSFP+ Interface Module Data Sheet | https://www.cisco.com/c/en/us/products/collateral/switches/nexus-7000-series-switches/data_sheet_c78-728412.html | fabricante
- Cisco Catalyst 6500 Series Module Installation Guide | https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst6500/hardware/Module_Installation/Mod_Install_Guide/6500-emig.pdf | fabricante
- Cisco 100GBASE QSFP-100G Modules Data Sheet | https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/datasheet-c78-736282.html | fabricante
- Cisco Nexus 7000 Series 100G and 40G QSFP Data Sheet | https://www.cisco.com/c/en/us/products/collateral/switches/nexus-7000-series-switches/datasheet-c78-738175.html | fabricante
- FS.com - Overview of QSFP28 LR4 Optical Transceiver | https://www.fs.com/blog/overview-of-qsfp28-lr4-optical-transceiver-641.html | fabricante
- FS.com - 25GBASE-SR SFP28 850nm 100m Transceiver Module Specifications | https://www.fs.com/eu-en/products/67991.html | fabricante
- FS.com - SFP-10G-SR vs SFP-10G-LRM vs SFP-10G-LR | https://www.fs.com/blog/sfp10gsr-vs-sfp10glrm-vs-sfp10glr-which-to-choose-1177.html | fabricante
- FS.com - SFP, SFP+, SFP28, QSFP+, QSFP28: What Are the Differences? | https://www.fs.com/ca/blog/sfp-sfp-sfp28-qsfp-qsfp28-what-are-the-differences-386.html | fabricante
- FS.com Optical Transceiver Module Catalog | https://img-en.fs.com/file/catalog/optical-module.pdf | fabricante
- FS.com - SFP28 and SFP+ Port Compatibility | https://www.fs.com/jp/products_support/search.html?keyword=67993 | fabricante
- The Fiber Optic Association (FOA) - Reference Guide to Optical Fiber | https://www.thefoa.org/tech/ref/basic/fiber.html | norma
- The Fiber Optic Association (FOA) - Wavelength Bands Used For Fiber Optic Transmission | https://www.thefoa.org/tech/wavelength.htm | norma
- The Fiber Optic Association (FOA) - Lennie Lightwave's Guide To Fiber Optics | https://www.thefoa.org/Lennie/fiber.html | norma
- The Fiber Optic Association (FOA) - Nomenclature For Optical Fibers And Cross Reference To International Standards (ITU-T G.651, G.652, OM1-OM5, OS1-OS2) | https://www.thefoa.org/tech/smf.htm | norma
- The Fiber Optic Association (FOA) - Outside Plant Fiber Optic Cable | https://www.thefoa.org/tech/ref/OSP/fiber.html | norma
- SNIA / SFF Committee - SFF-8472 Specification for Diagnostic Monitoring Interface for Optical Transceivers | https://members.snia.org/document/dl/25916 | norma
- Finisar Application Note AN-2030: Digital Diagnostic Monitoring Interface for Optical Transceivers (SFF-8472) | https://sup.xenya.si/sup/info/finisar/an-2030-finisar.pdf | fabricante
- Nokia 7210 SAS-D, E, K Interface Configuration Guide - Digital Diagnostics Monitoring | https://documentation.nokia.com/sas/23-9/books/dk-interface-config/digital-diagnostics-monitor.html | fabricante
- Cisco ASR 901 Series Aggregation Services Router Software Configuration Guide - Digital Optical Monitoring (DOM) | https://www.cisco.com/c/en/us/td/docs/wireless/asr_901/Configuration/Guide/b_asr901-scg/b_asr901-scg_chapter_0101011.pdf | fabricante
- Cisco Support - Troubleshoot Fiber Links on Catalyst 9000 Switches | https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html | fabricante
- Huawei AR Router Troubleshooting - Optical Interface Cannot Go Up (display transceiver) | https://info.support.huawei.com/network/ptmngsys/Web/tsrev_ar/en/content/ar/16_edesk_optical_interface_cannot_up/edesk_optical_interface_cannot_up_edesk004.html | fabricante
- Juniper Networks Support - How to view the diagnostic detail (DOM) for the transceiver (show interfaces diagnostics optics) | https://supportportal.juniper.net/s/article/EX-How-to-view-the-diagnostic-detail-DOM-for-the-transceiver-on-the-10G-1G-VC-port | fabricante
- Juniper Networks ACX7100-32C Hardware Troubleshooting Guide | https://www.juniper.net/documentation/cn/zh/hardware/acx7100-32C/topics/topic-map/troubleshooting-acx7100-32C-router.html | fabricante
- Cisco Catalyst 2960-L VLAN Configuration Guide - Configuring VLAN Trunks | https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst2960l/software/15-2_7_e/configuration_guide/vlan/b_1527e_vlan_2960l_cg/m_vlan_vlan_trunks_cg.pdf | fabricante
- Cisco Nexus 5000 Series Switch CLI Software Configuration Guide - Configuring VLANs and Trunking | https://www.cisco.com/en/US/docs/switches/datacenter/nexus5000/sw/configuration/guide/cli_rel_4_1/Cisco_Nexus_5000_Series_Switch_CLI_Software_Configuration_Guide_chapter8.pdf | fabricante
- Cisco Catalyst 9500 Series VLAN Configuration Guide - Configuring VLAN Trunks | https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-14/configuration_guide/vlan/b_1714_vlan_9500_cg/configuring_vlan_trunks.html | fabricante
- Cisco Nexus 3548 NX-OS Layer 2 Switching Configuration Guide - Configuring Access and Trunk Interfaces | https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus3548/103x/configuration/layer-2-switching/cisco-nexus-3548-nx-os-layer-2-switching-configuration-guide-103x/m-configuring-access-and-trunk-interfaces.html | fabricante
- Cisco NCS 6000 Series Routers Interface Command Reference (dot1q native vlan / vlan-id) | https://www.cisco.com/c/en/us/td/docs/routers/ncs6000/software/interfaces/command/reference/b-interfaces-cr-ncs6k/b_interfaces_cr50ncs_chapter_01001.pdf | fabricante
- Cisco C9000 Series Layer 2 Forwarding VLAN Configuration Guide | https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/vlan/vlan-configuration-guide/configure-vlan.html | fabricante
- Cisco Catalyst 3850 Switch Configuration Guide - IEEE 802.1Q Tunneling (QinQ) | https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/lanswitch/configuration/xe-3se/3850/lnsw-ieee-8021q-tunneling.html | fabricante
- Cisco Support - Inter-Switch Link and IEEE 802.1Q Frame Format (Document ID 17056) | https://www.cisco.com/c/en/us/support/docs/lan-switching/8021q/17056-741-4.html | fabricante
- Cisco Support - Configure IP Addresses and Unique Subnets for New Users (Document ID 13788) | https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html | fabricante
- Cisco Support - Configuring a Gateway of Last Resort Using IP Commands (Document ID 16448) | https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/16448-default.html | fabricante
- IETF RFC 1918 - Address Allocation for Private Internets | https://www.rfc-editor.org/rfc/rfc1918.txt | norma
- IETF RFC 3021 - Using 31-Bit Prefixes on IPv4 Point-to-Point Links | https://www.rfc-editor.org/rfc/rfc3021.txt | norma
- IETF RFC 3031 - Multiprotocol Label Switching Architecture | https://www.rfc-editor.org/info/rfc3031/ | norma
- IETF RFC 4364 - BGP/MPLS IP Virtual Private Networks (VPNs) | https://www.rfc-editor.org/info/rfc4364/ | norma
- IETF RFC 4632 - Classless Inter-domain Routing (CIDR): The Internet Address Assignment and Aggregation Plan | https://www.rfc-editor.org/info/rfc4632/ | norma
- IETF RFC 4665 - Service Requirements for Layer 2 Provider-Provisioned Virtual Private Networks | https://www.rfc-editor.org/info/rfc4665/ | norma
- IETF RFC 5735 - Special Use IPv4 Addresses | https://www.rfc-editor.org/info/rfc5735/ | norma
- IETF RFC 6575 - Address Resolution Protocol (ARP) Mediation for IP Interworking of Layer 2 VPNs (VPWS RFC 4664) | https://www.rfc-editor.org/info/rfc6575/ | norma
- IETF RFC 9889 - 5G Network Slicing Integration in Transport Networks (CE, AC, PE Definitions) | https://www.rfc-editor.org/rfc/rfc9889.txt | norma
- ITU-T Recommendation Y.1541 (2011) - Network performance objectives for IP-based services | https://www.itu.int/epublications/publication/itu-t-y-1541-2011-12-network-performance-objectives-for-ip-based-services | norma
- ITU-T Recommendation Y.1541 (2002) - Network performance objectives for IP-based services | https://www.itu.int/rec/dologin_pub.asp?lang=e&id=T-REC-Y.1541-200205-S!!PDF-E&type=items | norma
- ITU-T E.800 Series Supplement 8 - Guidelines for inter-provider quality of service | https://www.itu.int/epublications/publication/itu-t-e-800-series-suppl-8-2009-11-guidelines-for-inter-provider-quality-of-service | norma
- ANATEL - Regulamento do Serviço de Comunicação Multimídia (Resolução nº 614/2013) | https://informacoes.anatel.gov.br/legislacao/index.php/component/content/article?id=813 | oficial
- ANATEL - Definição de Serviço de Comunicação Multimídia (SCM) | https://www.anatel.gov.br/legislacao/resolucoes/16-2001/5- | oficial
- ANATEL - Definição Oficial de Ponto de Terminação de Rede (PTR) | https://www.anatel.gov.br/Portal/verificaDocumentos/documento.asp?numeroPublicacao=116032 | oficial
- ANATEL - Glossário de Termos da Anatel (Ponto de Terminação de Rede - PTR) | https://informacoes.anatel.gov.br/legislacao/component/fsf/?amp;catid=21&catid=16&faqid=4319&view=faq | oficial
- Portal Nacional de Contratações Públicas (PNCP / CBTU) - Termo de Referência de Link Dedicado de Internet | https://pncp.gov.br/pncp-api/v1/orgaos/42357483000126/compras/2026/37/arquivos/2 | oficial
- Portal Nacional de Contratações Públicas (PNCP / DER-RO) - Termo de Referência de Rede MPLS, L2L e Link Dedicado | https://pncp.gov.br/pncp-api/v1/orgaos/04696490000163/compras/2026/85/arquivos/1 | oficial
- Portal Nacional de Contratações Públicas (PNCP / Prefeitura de Rorainópolis-RR) - Termo de Referência de Link Dedicado em Roraima | https://pncp.gov.br/pncp-api/v1/orgaos/01613031000180/compras/2026/47/arquivos/1 | oficial
- Portal Nacional de Contratações Públicas (PNCP) - Termo de Referência (Definições de QoS, SLA, CPE, Última Milha e Porta LAN) | https://pncp.gov.br/pncp-api/v1/orgaos/49979255000137/compras/2026/51/arquivos/2 | oficial
- Portal Nacional de Contratações Públicas (PNCP) - Checklist de Instalação Física e Ativação do Link | https://pncp.gov.br/pncp-api/v1/orgaos/07337989000172/compras/2025/2/arquivos/5 | oficial
- Portal Nacional de Contratações Públicas (PNCP) - Termo de Referência de VPN sobre MPLS | https://pncp.gov.br/pncp-api/v1/orgaos/87612982000150/compras/2026/123/arquivos/2 | oficial
- Conselho Nacional de Técnicos em Radiologia (CONTER) - Edital Pregão Eletrônico nº 04/2026 (Link Dedicado e L2L com Transparência 802.1Q) | https://conter.gov.br/wp-content/uploads/2026/07/Edital-Pregao-no-04.2026_LINK-DEDICADO_republicado.pdf | oficial
- Câmara Municipal de Uberlândia/MG - Termo de Referência de Link Dedicado de Acesso à Internet | https://www.camarauberlandia.mg.gov.br/cotacao-compras/011-tr-link-acesso-internet-ti.pdf/@@download/file | oficial
- Prefeitura Municipal de Uchoa/SP - Termo de Referência de Link Dedicado (Fórmula de Disponibilidade, Latência e Perda de Pacotes) | https://www.uchoa.sp.gov.br/images/licitacoes/anexo-i-termo-de-referencia-122026.pdf | oficial
- Conselho Federal de Enfermagem (COFEN) - Termo de Referência de Link Dedicado | https://www.cofen.gov.br/wp-content/uploads/2013/11/termo-de-referencia_.pdf | oficial
- Prefeitura Municipal de Porto Velho/RO - Edital PE 044/2024 (Disponibilidade em Acessos e Backbone) | https://anexos.portovelho.ro.gov.br/compras/7423/20145/Edital-Retificado-PE-044.2024-PROC.-14542.2023Assinado.pdf | oficial
- Prefeitura Municipal de Tramandaí/RS - Edital de Link Dedicado | https://tramandai.rs.gov.br/editais/b9e648437d7e7ea9a5d4a0c42a160950.pdf | oficial
- PRODAM-SP - Especificação Técnica de Interfaces VLAN IEEE 802.1Q | https://portal.prodam.sp.gov.br/documents/d/guest/co-23-08-2025_telefonica-pdf | oficial Referências citadas 1. Optical Module | FS, https://img-en.fs.com/file/catalog/optical-module.pdf 2. Cisco SFP-25G-SR-S Compatible 25GBASE-SR SFP28 Transceiver, https://www.fs.com/eu-en/products/67991.html 3. Overview of QSFP28 LR4 Optical Transceiver - FS.com, https://www.fs.com/blog/overview-of-qsfp28-lr4-optical-transceiver-641.html 4. Cisco SFP Modules for Gigabit Ethernet Applications Data Sheet, https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/gigabit-ethernet-gbic-sfp-modules/datasheet-c78-366584.html 5. AI Infrastructure, Data Centres, Enterprise Networking and Software, https://www.fs.com/jp/products_support/search.html?keyword=67993 6. Cisco MGE SFP Modules Cisco Small Business Network Accessories, https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/small-business-network-accessories/datasheet-c78-741408.pdf 7. Cisco SFP and SFP+ Transceiver Module Installation Notes, https://www.cisco.com/c/en/us/td/docs/interfaces_modules/transceiver_modules/installation/note/78_15160.html 8. Catalyst 6500 Series Ethernet Modules Installation Guide - Cisco, https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst6500/hardware/Module_Installation/Mod_Install_Guide/6500-emig.pdf 9. Cisco 10GBASE SFP+ Modules Data Sheet, https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/data_sheet_c78-455693.html 10. Cisco Nexus 7000 M1-Series 32-Port 10 Gigabit Ethernet Module, https://www.cisco.com/c/en/us/products/collateral/switches/nexus-7000-series-switches/data_sheet_c78-605482.html 11. Cisco 25GBASE SFP28 Modules Data Sheet, https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/datasheet-c78-736950.html 12. Cisco Nexus 7000 F3-Series 12-Port 40 Gigabit Ethernet Module, https://www.cisco.com/c/en/us/products/collateral/switches/nexus-7000-series-switches/data_sheet_c78-728412.html 13. Cisco Nexus 7700 M3-Series 100 Gigabit Ethernet Module Data Sheet, https://www.cisco.com/c/en/us/products/collateral/switches/nexus-7000-series-switches/datasheet-c78-738175.html 14. Understanding Wavelengths In Fiber Optics, https://www.thefoa.org/tech/wavelength.htm 15. The FOA Reference For Fiber Optics - Optical Fiber, https://www.thefoa.org/tech/ref/basic/fiber.html 16. Singlemode Fiber Types - The Fiber Optic Association, https://www.thefoa.org/tech/smf.htm 17. Optical Fiber for Outside Plant Networks, https://www.thefoa.org/tech/ref/OSP/fiber.html 18. Lennie Lightwave's Guide To Fiber Optics, https://www.thefoa.org/Lennie/fiber.html 19. Cisco NCS 4200 Series Network Convergence System Interface, https://www.cisco.com/c/en/us/products/collateral/optical-networking/network-convergence-system-4200-series/datasheet-c78-738105.html 20. Troubleshoot Fiber Links on Catalyst 9000 Series Switches - Cisco, https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html 21. Pluggable Optical Modules: Transceivers for the Cisco ONS Family, https://www.cisco.com/c/en/us/products/collateral/optical-networking/network-convergence-system-2000-series/pluggable-optical-modules-ds.html 22. SFF-8472 Specification for Management Interface for SFP+, https://members.snia.org/document/dl/25916 23. Digital Diagnostics Monitoring - Nokia Documentation Center, https://documentation.nokia.com/sas/23-9/books/dk-interface-config/digital-diagnostics-monitor.html 24. Digital Optical Monitoring - Cisco, https://www.cisco.com/c/en/us/td/docs/wireless/asr_901/Configuration/Guide/b_asr901-scg/b_asr901-scg_chapter_0101011.pdf 25. Checking Whether the Optical Module Works Properly, https://info.support.huawei.com/network/ptmngsys/Web/tsrev_ar/en/content/ar/16_edesk_optical_interface_cannot_up/edesk_optical_interface_cannot_up_edesk004.html 26. [EX] How to view the diagnostic detail (DOM) for the transceiver on, https://supportportal.juniper.net/s/article/EX-How-to-view-the-diagnostic-detail-DOM-for-the-transceiver-on-the-10G-1G-VC-port 27. ACX7100-32C 路由器故障排除|瞻博网络 - Juniper Networks, https://www.juniper.net/documentation/cn/zh/hardware/acx7100-32C/topics/topic-map/troubleshooting-acx7100-32C-router.html 28. SFP-10G-SR vs LRM vs LR: Which 10G Module Should You Choose?, https://www.fs.com/blog/sfp10gsr-vs-sfp10glrm-vs-sfp10glr-which-to-choose-1177.html 29. quick method (loop throw all interfaces with test) - Cisco Community, https://community.cisco.com/t5/network-management/show-interfaces-transceiver-quick-method-loop-throw-all/td-p/2988807 30. Cisco Network Convergence System 4201/4202 Series Data Sheet, https://www.cisco.com/c/en/us/products/collateral/optical-networking/network-convergence-system-4200-series/datasheet-c78-737800.pdf/1000 31. VLAN Configuration Guide - Configure VLAN [Cisco IOS XE 17], https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/vlan/vlan-configuration-guide/configure-vlan.html 32. Layer 2 Ethernet Switching Overview - Cisco, https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus5500/sw/layer2/7x/b_5500_Layer2_Config_7x/b_5500_Layer2_Config_7x_chapter_01.pdf 33. Configuring VLAN Trunks - Cisco, https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst2960l/software/15-2_7_e/configuration_guide/vlan/b_1527e_vlan_2960l_cg/m_vlan_vlan_trunks_cg.pdf 34. Configuring Access and Trunk Interfaces - Cisco, https://www.cisco.com/en/US/docs/switches/datacenter/nexus5000/sw/configuration/guide/cli_rel_4_1/Cisco_Nexus_5000_Series_Switch_CLI_Software_Configuration_Guide_chapter8.pdf 35. Inter-Switch Link and IEEE 802.1Q Frame Format - Cisco, https://www.cisco.com/c/en/us/support/docs/lan-switching/8021q/17056-741-4.html 36. VLAN Subinterface Commands - Cisco, https://www.cisco.com/c/en/us/td/docs/routers/ncs6000/software/interfaces/command/reference/b-interfaces-cr-ncs6k/b_interfaces_cr50ncs_chapter_01001.pdf 37. IEEE 802.1Q Tunneling - Cisco, https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/lanswitch/configuration/xe-3se/3850/lnsw-ieee-8021q-tunneling.html 38. RFC 4665: Service Requirements for Layer 2 Provider-Provisioned, https://www.rfc-editor.org/info/rfc4665/ 39. 1. Instalação Física e Ativação do Link 2. Configurações e Recursos, https://pncp.gov.br/pncp-api/v1/orgaos/07337989000172/compras/2025/2/arquivos/5 40. CO-23.08/2025 PROCESSO SEI Nº 7010.2025/0007989-0 ... - Prodam, https://portal.prodam.sp.gov.br/documents/d/guest/co-23-08-2025_telefonica-pdf 41. Cisco Nexus 3548 Switch NX-OS Layer 2 Switching Configuration, https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus3548/103x/configuration/layer-2-switching/cisco-nexus-3548-nx-os-layer-2-switching-configuration-guide-103x/m-configuring-access-and-trunk-interfaces.html 42. anexo ii - requisitos dos serviços integrados de comunicação ... - BNB, https://bnb.gov.br/documents/45839/3200557/Anexo%20II%20-%20Requisitos%20dos%20Servi%C3%A7os%20Integrados%20de%20Comunica%C3%A7%C3%A3o%20-%20RFP%202022-013.pdf/00d91f02-8ac1-1b78-fbed-0c5b3c06f11d 43. Estudo Técnico Preliminar 61/2024 - Portal Gov.br, https://www.gov.br/agricultura/pt-br/acesso-a-informacao/licitacoes-e-contratos/contratacoes-diretas-dispensas-e-inexigibilidades/mapa-sede-uasg-130005/inexigibilidade-de-licitacao/2024/08-2024/estudo-tecnico-preliminar.pdf 44. Configure IP Addresses and Unique Subnets for New Users - Cisco, https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html 45. RFC 4632: Classless Inter-domain Routing (CIDR): The Internet, https://www.rfc-editor.org/info/rfc4632/ 46. Solved: Understanding subneting - Cisco Community, https://community.cisco.com/t5/network-management/understanding-subneting/td-p/453317547. Using 31-Bit Prefixes on IPv4 Point-to-Point Links - RFC Editor, https://www.rfc-editor.org/rfc/rfc3021.txt 48. RFC 5735: Special Use IPv4 Addresses, https://www.rfc-editor.org/info/rfc5735/ 49. RFC 1918 Address Allocation for Private Internets February 1996, https://www.rfc-editor.org/rfc/rfc1918.txt 50. Configure a Gateway of Last Resort that Uses IP Commands - Cisco, https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/16448-default.html 51. Cisco - Configuring a Gateway of Last Resort Using IP Commands, https://community.cisco.com/kxiwq67737/attachments/kxiwq67737/5991-discussions-wan-routing-switching/28839/1/68159-Config_GW_of_Last_Resort.pdf 52. termo de referência, https://pncp.gov.br/pncp-api/v1/orgaos/04696490000163/compras/2026/85/arquivos/1 53. RFC 3031: Multiprotocol Label Switching Architecture, https://www.rfc-editor.org/info/rfc3031/ 54. RFC 4364: BGP/MPLS IP Virtual Private Networks (VPNs), https://www.rfc-editor.org/info/rfc4364/ 55. 5G network slicing - RFC Editor, https://www.rfc-editor.org/rfc/rfc9889.txt 56. RFCs about L2VPN - RFC Editor, https://www.rfc-editor.org/subjects/l2vpn/ 57. RFC 6575: Address Resolution Protocol (ARP) Mediation for IP, https://www.rfc-editor.org/info/rfc6575/ 58. SECRETARIA DE ADMINISTRAÇÃO DEFINIÇÃO DO OBJETO, https://pncp.gov.br/pncp-api/v1/orgaos/87612982000150/compras/2026/123/arquivos/2 59. Pregão/Concorrência Eletrônica - Governo de Rondônia, https://rondonia.ro.gov.br/wp-content/uploads/2024/01/ATA_merged.pdf 60. Governo do Estado de Mato Grosso - Sema-MT, https://www.sema.mt.gov.br/site/phocadownload/Aquisicoes/01%20-%20TERMO%20DE%20REFERNCIA%20LINK%20DE%20DADOS.pdf 61. Portaria nº 214, de 3 de março de 2015 - legislação da Anatel, https://informacoes.anatel.gov.br/legislacao/index.php/component/content/article?id=813 62. Resolução nº 272, de 9 de agosto de 2001 (REVOGADA) - Anatel, https://www.anatel.gov.br/legislacao/resolucoes/16-2001/5- 63. Glossário de Termos da Anatel, https://informacoes.anatel.gov.br/legislacao/component/fsf/?amp;catid=21&catid=16&faqid=4319&view=faq 64. anexo à resolução n.º 426, de 9 de dezembro de 2005 - arctel-cplp, https://www.anatel.gov.br/Portal/verificaDocumentos/documento.asp?numeroPublicacao=116032 65. Consulta Pública nº 41 - VisualizarTextoConsulta - Anatel, https://apps.anatel.gov.br/ParticipaAnatel/VisualizarTextoConsulta.aspx?TelaDeOrigem=3&ConsultaId=10021 66. Guidelines for inter-provider quality of service - ITU, https://www.itu.int/epublications/publication/itu-t-e-800-series-suppl-8-2009-11-guidelines-for-inter-provider-quality-of-service 67. Network performance objectives for IP-based services - ITU, https://www.itu.int/epublications/publication/itu-t-y-1541-2011-12-network-performance-objectives-for-ip-based-services 68. ITU-T Rec. Y.1541 (05/2002) Network performance objectives for IP, https://www.itu.int/rec/dologin_pub.asp?lang=e&id=T-REC-Y.1541-200205-S!!PDF-E&type=items 69. estado de roraima prefeitura municipal de rorainópolis setor de, https://pncp.gov.br/pncp-api/v1/orgaos/01613031000180/compras/2026/47/arquivos/1 70. Servidor - Cofen, https://www.cofen.gov.br/wp-content/uploads/2013/11/termo-de-referencia_.pdf 71. EDITAL RETIFICADO - Prefeitura de Porto Velho, https://anexos.portovelho.ro.gov.br/compras/7423/20145/Edital-Retificado-PE-044.2024-PROC.-14542.2023Assinado.pdf 72. prefeitura municipal de tramandaí, https://tramandai.rs.gov.br/editais/b9e648437d7e7ea9a5d4a0c42a160950.pdf
