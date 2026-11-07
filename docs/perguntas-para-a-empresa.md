# Perguntas para a empresa — organizadas por onde achar a resposta

> Versão 0.2 · 07/11/2026 · tiradas dos itens "confirmar na empresa" de `docs/pesquisa.md`
> As respostas vão para o **Meu caderno** do app (salvo só no aparelho), **nunca** para o GitHub.
> O bloco "Pergunte na empresa" de cada lição usa as mesmas quatro categorias, e o botão "Levar para o caderno" guarda a pergunta já classificada.

| Categoria | No app | Quando usar |
| --- | --- | --- |
| **A. Eu vejo sozinho** | 👁 Vejo sozinho | Está gravado no cabo, na tela do equipamento, na etiqueta ou no próprio software |
| **B. Documentos** | 📄 Documentos | Está em contrato, anexo técnico, norma publicada no site ou na intranet da distribuidora |
| **C. Outras áreas** | 👥 Outras áreas | Líder de TI, segurança do trabalho (SESMT), engenharia, almoxarifado, jurídico, compras |
| **D. Colega de telecom** | 🛠 Colega de telecom | Só quem já trabalha na telecom da empresa sabe (prática, histórico, combinados com fornecedores) |

> Comece pela A e pela B: dá para avançar sem depender de ninguém.

---

## A. Eu vejo sozinho

| Pergunta | Onde olhar | Lição |
| --- | --- | --- |
| Que cabo é este (tipo, vão AS, seco ou geleia, número de fibras, fabricante)? | Gravação na capa do cabo | 03-01 |
| Os tubos são coloridos (Furukawa) ou têm tubo piloto e direcional (Prysmian)? | Abrir uma CEO acompanhado, foto do cabo, ficha do fabricante | 03-04 |
| Qual a marca e o modelo da máquina de fusão e do clivador? Alinhamento por núcleo ou por casca? | Etiqueta e tela "Sobre" da máquina | 05-03 |
| Os conectores do DIO são azuis (UPC) ou verdes (APC)? SC ou LC? | Olhar o DIO e os cordões | 03-07 |
| Qual versão do QGIS está instalada? | QGIS ► Ajuda ► Sobre (*Help ► About*) | 08-01 |
| Qual o SRC (EPSG) do projeto e das camadas? | Canto inferior direito do QGIS; Propriedades da camada ► Informação | 08-03 |
| Que comprimentos de onda o OTDR tem? | Etiqueta e tela do OTDR | 06-05 |
| Que transceptores (SFP) estão nos switches? Têm DOM? | Etiqueta do SFP; leitura no switch, se tiver permissão | 11-03 |
| Que padrão de plaqueta e etiqueta aparece nos postes e no rack? | Observar em campo e no rack | 07-03 |

## B. Documentos (contratos, anexos técnicos, normas no site ou na intranet)

| Pergunta | Documento provável | Lição |
| --- | --- | --- |
| Qual a norma de compartilhamento de postes vigente (número e versão)? Há referência pública a uma "NT-002" (2020) e a uma possível "NT 06/2024". | Site da distribuidora, intranet | 07-01 |
| Faixa de ocupação, pontos por poste (urbano e rural), afastamentos, alturas, plaqueta, reserva, caixas, limite de drops | Mesma norma | 07-02 a 07-05 |
| SLA de cada link: % de disponibilidade, período (mensal ou anual), tempo de reparo, janela de manutenção | Contrato e anexo de nível de serviço | 09-01 |
| Regra de glosa: proporcional ao tempo parado, só o excesso ou por faixas? O relógio começa no chamado ou na falha? Teto de desconto? | Contrato (cláusula de SLA e penalidades) | 09-02 |
| Critério de aceite: perda máxima por fusão e por conector, dB/km, refletância, ORL; OTDR bidirecional? Em quais λ? | Anexo técnico do contrato de construção ou caderno de aceite | 09-05 |
| Formato do as built (DWG, KMZ, GeoPackage) e da entrega dos testes (.SOR, PDF) | Anexo técnico | 09-05 |
| Índice de reajuste (IST, IPCA, IGP-M) e data-base | Contrato | 09-04 |
| Prazo de garantia da obra e aceite provisório × definitivo | Contrato de construção | 09-05 |
| Contatos e matriz de escalonamento do fornecedor (central, NOC, gerente de contas) | Anexo do contrato ou cadastro do fornecedor | 09-06 |
| Ficha técnica do cabo comprado (G.652.D ou G.657, IOR, atenuação) | Anexo técnico, processo de compra | 02-04, 06-05 |
| Modelo do contrato de ocupação de postes (valor por ponto, prazos, multas) | Contrato-padrão de compartilhamento | 07-06 |
| Procedimento de trabalho em poste e modelo de APR / permissão de trabalho | Procedimentos de segurança (intranet) | 10-01 |

## C. Outras áreas

| Pergunta | Para quem | Lição |
| --- | --- | --- |
| Para telecom em poste a 0,60 m da BT, que autorização NR-10 eu preciso (SEP? proximidade?) e quem emite a APR e a permissão de trabalho? | Segurança do trabalho (SESMT) | 10-01 |
| Como a empresa está se preparando para a nova NR-10 (junho de 2027): treinamento específico de compartilhamento (40 h), capacitação (24 h)? | SESMT / RH | 10-05 |
| Quais EPIs são exigidos para telecom em poste e na fusão? Plano de resgate em poste? | SESMT | 10-01, 10-04 |
| Quem é gestor e quem é fiscal de cada contrato? Qual a minha alçada? | Líder de TI | 09-03 |
| Qual sistema de chamados usamos e quem pode abrir chamado em nome da empresa? | Líder de TI | 09-06 |
| A rede é própria, contratada ou mista? Que protocolo SCADA usamos? Já há IEC 61850? | Engenharia / automação | 01-01 |
| Que requisitos de telecom do ONS valem depois da interligação ao SIN? | Engenharia | 01-06 |
| TI e TO são separadas? Quem cuida da telecom operativa? | Líder de TI | 01-01 |
| Que materiais temos em estoque (cabos, CEO, CTO, tubetes, SFP, cordões)? | Almoxarifado | 03-05, 04-06 |
| As operadoras aplicam o RGC aos nossos links ou só o SLA do contrato? | Jurídico | 09-02 |
| A empresa apoia algum curso ou certificação? | RH / líder de TI | 12-02 |

## D. Colega de telecom

| Pergunta | Lição |
| --- | --- |
| Como os fornecedores costumam mandar os relatórios e o que já foi devolvido por estar incompleto? | 09-05 |
| Quais chamados se repetem e com quais fornecedores? Que prazos eles cumprem de verdade? | 09-06 |
| Que reserva técnica e que padrão de identificação usamos na prática? | 03-06, 07-03 |
| Qual o critério de aceite por emenda que usamos no dia a dia (0,1? 0,15 dB?) | 05-04 |
| Quem faz o *arc check*, a troca de eletrodo e a limpeza da máquina? | 05-03 |
| Que faixa de sinal na ONU cobramos dos provedores, se cobramos? Que topologia eles usam aqui? | 04-05 |
| A rede para as unidades é ponto a ponto (SFP) ou tem PON? | 04-06 |
| Como é o fluxo para cabo clandestino (registro, retirada, guarda do material)? | 07-06 |
| Que nomes e campos usamos nas camadas do QGIS? Usamos QField? | 08-06, 08-07 |
| Plano de VLANs e se eu posso rodar comandos `show` | 11-04 |

---

### O que **não** levar para o app nem para o GitHub
Rotas, coordenadas, fotos, plantas, planilhas, nomes de pessoas, endereços de unidades, configurações e senhas. Usinas e subestações são infraestrutura crítica. As respostas ficam só no **Meu caderno**, no aparelho.
