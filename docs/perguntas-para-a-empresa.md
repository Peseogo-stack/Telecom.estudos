# Perguntas para a empresa — organizadas por onde achar a resposta

> Arquivo gerado a partir de `content/perguntas-empresa.json` (`npm run conteudo`). Edite o JSON, não este arquivo.
> O app já traz estas perguntas no **Meu caderno**, agrupadas na mesma ordem. As respostas ficam só no aparelho, **nunca** no GitHub.
> O bloco "Pergunte na empresa" de cada lição usa as mesmas perguntas e as mesmas quatro categorias.

| Categoria | Quando usar |
| --- | --- |
| **A. Eu vejo sozinho** | Está gravado no cabo, na tela do equipamento, na etiqueta ou no próprio software |
| **B. Documentos** | Está em contrato, anexo técnico, norma publicada no site ou na intranet da distribuidora |
| **C. Outras áreas** | Líder de TI, segurança do trabalho (SESMT), engenharia, almoxarifado, jurídico, compras |
| **D. Colega de telecom** | Só quem já trabalha na telecom da empresa sabe (prática, histórico, combinados com fornecedores) |

> Comece pela A e pela B: dá para avançar sem depender de ninguém.

---

## A. Eu vejo sozinho

| # | Pergunta | Onde olhar | Lição |
| --- | --- | --- | --- |
| a01 | Que cabo é este (tipo, vão AS, seco ou geleia, número de fibras, fabricante)? | Gravação na capa do cabo | 03-01, 02-02 |
| a02 | Os tubos são coloridos (padrão Furukawa) ou têm tubo piloto e direcional (padrão Prysmian)? | Abrir uma caixa de emenda acompanhado, foto do cabo, ficha do fabricante | 03-04 |
| a03 | Qual a marca e o modelo da máquina de fusão e do clivador? O alinhamento é por núcleo ou por casca? | Etiqueta e tela "Sobre" da máquina | 05-03 |
| a04 | Os conectores do DIO são azuis (UPC) ou verdes (APC)? SC ou LC? | Olhar o DIO e os cordões | 03-07 |
| a05 | Qual versão do QGIS está instalada? | QGIS ► Ajuda ► Sobre (Help ► About) | 08-01 |
| a06 | Qual o SRC (EPSG) do projeto e das camadas? | Canto inferior direito do QGIS; Propriedades da camada ► Informação | 08-03 |
| a07 | Que comprimentos de onda o OTDR tem? | Etiqueta e tela do OTDR | 02-05, 06-02, 06-05 |
| a08 | Que transceptores (SFP) estão nos switches? Eles têm leitura de potência (DOM)? | Etiqueta do SFP; leitura no switch, se tiver permissão | 11-03, 02-07 |
| a09 | Que padrão de plaqueta e de etiqueta aparece nos postes e no rack? | Observar em campo e no rack | 07-03 |
| a10 | Qual é a designação (ID do circuito) de cada link e onde ela está anotada? | Etiqueta no equipamento da operadora, fatura ou contrato | 09-06 |
| a11 | A baixa tensão dos postes onde vou trabalhar é nua ou isolada (multiplexada)? | Observar do chão, sem se aproximar; confirmar com a engenharia | 10-01 |
| a12 | Os cordões do rack e do DIO são amarelos (monomodo) ou laranja/água (multimodo)? | Cor da capa dos cordões e a gravação neles | 02-03 |
| a13 | Os cabos da nossa rede seguem o código de cores nacional (verde, amarela, branca, azul…) ou há cabos importados no padrão TIA-598 (azul, laranja, verde…)? E os pigtails do DIO, em que ordem vêm? | Gravação da capa, ficha do fabricante, cores ao abrir uma caixa acompanhado | 03-03 |
| a14 | Qual é a classe de laser e a potência gravadas na etiqueta da nossa caneta VFL, e que tipo de microscópio de inspeção a equipe usa (vídeo ou óptico com filtro IR)? | Etiqueta da caneta VFL e maleta de inspeção/limpeza | 10-03 |
| a15 | Abra um arquivo recebido de fornecedor no QGIS e veja o SRC em Propriedades ► Source: ele veio declarado? | Qualquer camada recebida de terceiros | 08-03 |
| a16 | Abra a tabela de atributos de uma camada de postes da empresa: quais campos existem e qual deles é o código do poste? (Anote só no Meu caderno; nada de dado da empresa no app.) | Camada de postes no QGIS da equipe | 08-02 |
| a17 | Abra Help ► About no computador de trabalho: qual é a versão do QGIS instalada? | No macOS: QGIS ► About QGIS | 08-01 |
| a18 | Pegue um shapefile recebido de fornecedor: vieram todos os arquivos (.shp, .shx, .dbf, .prj)? (Anote só no Meu caderno; nada de dado da empresa no app.) | Pasta com arquivos recebidos | 08-04 |

---

## B. Documentos

| # | Pergunta | Documento provável | Lição |
| --- | --- | --- | --- |
| b01 | Qual é a norma de compartilhamento de postes vigente (número e versão)? Há referência pública a uma "NT-002" (2020) e a uma possível "NT 06/2024". | Site da distribuidora, intranet | 07-01 |
| b02 | O que a nossa norma manda sobre faixa de ocupação, pontos por poste (urbano e rural), afastamentos, alturas, plaqueta, reserva, caixas e limite de drops? | Norma de compartilhamento | 07-02, 07-03, 07-04, 07-05, 10-01 |
| b03 | Qual é o SLA de cada link: % de disponibilidade, período (mensal ou anual), tempo de reparo e janela de manutenção? | Contrato e anexo de nível de serviço | 09-01 |
| b04 | Qual é a regra de glosa de cada contrato (proporcional ao tempo parado, só o excesso ou por faixas)? Tem teto? O relógio começa no chamado ou na falha? | Contrato (cláusula de SLA e penalidades) | 09-02 |
| b05 | Qual é o critério de aceite das obras: perda máxima por fusão e por conector, dB/km, refletância, ORL? OTDR nos dois sentidos? Em quais comprimentos de onda? | Anexo técnico do contrato de construção ou caderno de aceite | 05-04, 06-01, 06-03, 09-05 |
| b06 | Em que formato o fornecedor entrega o as built (DWG, KMZ, GeoPackage) e os testes (.SOR, PDF)? | Anexo técnico | 09-05 |
| b07 | Qual é o índice de reajuste (IST, IPCA, IGP-M) e a data-base de cada contrato? | Contrato | 09-04 |
| b08 | Qual é o prazo de garantia da obra e como funcionam o aceite provisório e o definitivo? | Contrato de construção | 09-05 |
| b09 | Quais são os contatos e a matriz de escalonamento de cada fornecedor (central, NOC, gerente de contas)? | Anexo do contrato ou cadastro do fornecedor | 09-06 |
| b10 | O que diz a ficha técnica do cabo comprado (G.652.D ou G.657, IOR, atenuação)? | Anexo técnico, processo de compra | 02-04, 06-05, 09-05, 02-01, 02-02, 02-06 |
| b11 | Qual é o modelo do contrato de ocupação de postes (valor por ponto, prazos, multas)? | Contrato-padrão de compartilhamento | 07-01, 07-06 |
| b12 | Qual é o procedimento escrito para trabalho em poste com rede de telecom, e o modelo de APR e de permissão de trabalho? | Procedimentos de segurança (intranet) | 10-01 |
| b13 | O contrato conta o mês como 30 dias (43.200 min) ou pelos dias do calendário? | Cláusula de SLA | 09-01 |
| b14 | Latência alta, perda de pacotes ou velocidade abaixo do contratado contam como indisponibilidade no contrato? | Anexo de nível de serviço | 09-01 |
| b15 | Quais trabalhos de telecom em poste a empresa considera rotineiros (procedimento escrito) e quais exigem permissão de trabalho? | Procedimentos de segurança (intranet) | 10-05 |
| b16 | Que valores o projeto usa no orçamento de potência: atenuação da fibra (dB/km), perda por conector, por fusão e margem? | Projeto executivo ou memorial de cálculo da rede | 02-06, 02-07, 04-03, 04-05 |
| b17 | Qual método de referência de perda de inserção a empresa pede (1, 2 ou 3 cordões), em quais comprimentos de onda, e qual é o critério de aceite da perda total? | Especificação técnica de aceite de obra | 06-01, 09-05 |
| b18 | O contrato ou o padrão de entrega diz em que SRC o fornecedor tem de mandar os arquivos (as-built, KML, planilha de coordenadas)? | Contrato e padrão de entrega | 08-03 |
| b19 | O relatório de ocupação ou de vistoria pede contagens (postes por ocupante, pontos sem plaqueta)? De qual camada elas saem? | Modelo do relatório | 08-06 |
| b20 | Onde está publicado, no site da empresa, o Plano de Ocupação de Infraestrutura em vigor, e qual norma técnica o aprovou? | Site da distribuidora, página de compartilhamento de infraestrutura | 07-01 |
| b21 | Na norma técnica da empresa, qual é a altura da faixa de ocupação, a que distância do solo fica o topo dela e quantos pontos de fixação ela tem? | Norma técnica de compartilhamento e Plano de Ocupação, no site da empresa | 07-02 |
| b22 | Qual é o afastamento mínimo entre o cabo de telecom e a baixa tensão e a média tensão na norma da empresa? | Tabela de afastamentos da norma técnica | 07-02 |
| b23 | O contrato ou o padrão de as-built diz em que formato e com que campos o fornecedor entrega o cadastro? | Contrato, termo de referência ou padrão de as-built | 08-04 |
| b24 | Existe procedimento de cópia de segurança (backup) e de conferência das edições do cadastro? | Procedimento ou norma interna de gestão do cadastro | 08-05 |
| b25 | O procedimento de vistoria diz o que registrar em cada poste (fotos, campos obrigatórios)? | Procedimento de vistoria | 08-07 |
| b26 | Qual é o modelo de plaqueta na norma da empresa: tamanho, cor, o que precisa estar escrito e a que distância do poste? | Norma técnica de compartilhamento | 07-03 |
| b27 | O contrato prevê multa ou prazo para o ocupante identificar os cabos? | Contrato com o ocupante | 07-03 |
| b28 | Na norma da empresa, onde podem ficar a caixa de emenda e a reserva de cabo, e a que distância do poste? | Norma de compartilhamento: seção sobre caixa de emenda e reserva técnica | 07-04 |
| b29 | A norma permite caixa ou equipamento do ocupante no poste? Em quais postes é proibido (transformador, esquina, chave)? | Norma de compartilhamento: seção sobre equipamentos no poste | 07-04 |
| b30 | Quantos drops por vão a norma permite e de onde eles podem sair? | Norma de compartilhamento: seção sobre derivação para clientes | 07-04 |
| b31 | Na norma da empresa, quais são as alturas mínimas do cabo de telecom sobre rua, entrada de veículos e passagem de pedestres? | Norma de compartilhamento: tabela de distâncias mínimas ao solo | 07-05 |

---

## C. Outras áreas

| # | Pergunta | Para quem | Lição |
| --- | --- | --- | --- |
| c01 | Para trabalhar no cabo de telecom de um poste com baixa tensão (a 0,60 m dela), que autorização NR-10 eu preciso e quem emite a APR e a permissão de trabalho? | Segurança do trabalho (SESMT) | 10-01 |
| c02 | Como a empresa vai se preparar para a nova NR-10 (junho de 2027)? Quem faz telecom em poste terá o treinamento específico de compartilhamento (40 h) ou o Básico + Complementar do SEP? | SESMT / RH | 10-05 |
| c03 | Quais EPIs são exigidos para telecom em poste e na fusão? Qual é o plano de resgate em poste? | SESMT | 10-01, 10-04 |
| c04 | Quem é gestor e quem é fiscal de cada contrato de telecom? Qual é o meu papel e a minha alçada? | Líder de TI | 09-03 |
| c05 | Qual sistema de chamados usamos e quem pode abrir chamado em nome da empresa? | Líder de TI | 09-06 |
| c06 | A rede é própria, contratada ou mista? Que protocolo SCADA usamos? Já há IEC 61850? | Engenharia / automação | 01-01 |
| c07 | Que requisitos de telecom do ONS valem depois da interligação ao SIN? | Engenharia | 01-06 |
| c08 | TI e TO (tecnologia da operação) são separadas? Quem cuida da telecom operativa? | Líder de TI | 01-01 |
| c09 | Que materiais temos em estoque (cabos, CEO, CTO, tubetes, SFP, cordões)? | Almoxarifado | 03-05, 04-01, 04-03, 04-06, 02-04, 03-07, 05-01 |
| c10 | As operadoras aplicam o RGC da Anatel aos nossos links ou só o SLA do contrato? | Jurídico | 09-02 |
| c11 | A empresa apoia algum curso ou certificação? | RH / líder de TI | 12-02 |
| c12 | Quando a baixa tensão é isolada (multiplexada), a empresa trata as zonas da NR-10 do mesmo jeito que na rede nua? Quem avalia se o isolamento está íntegro? | Segurança do trabalho (SESMT) | 10-01 |
| c13 | Quando vence a minha reciclagem da NR-10 e quantas horas ela terá? | SESMT / RH | 10-05 |
| c14 | Quem calcula e quem aprova a glosa antes do pagamento? | Líder de TI / financeiro | 09-02 |
| c15 | Que tensões existem nos postes onde vou trabalhar (baixa tensão, 13,8 kV, 34,5 kV)? | Engenharia / operação | 10-01 |
| c16 | Há fibra multimodo nos racks das subestações ou do data center? Em quais equipamentos? | Engenharia / TI de infraestrutura | 02-03 |
| c17 | Quem na empresa acompanha o novo regulamento da ANEEL e da Anatel para os postes, e a empresa já se prepara para uma eventual cessão da exploração dos postes? | Área regulatória ou de compartilhamento | 07-01 |
| c18 | Quem instala e atualiza o QGIS nos computadores da empresa (TI)? Posso instalar por conta própria? | TI ou o setor responsável pelos computadores | 08-01 |
| c19 | Posso levar dados da rede no celular? É celular da empresa ou pessoal? O que a TI e a segurança da informação exigem? | TI e segurança da informação | 08-07 |
| c20 | Para travessia de rodovia, que órgão autoriza e quem na empresa cuida disso? | Área de projetos ou de compartilhamento de postes | 07-05 |

---

## D. Colega de telecom

| # | Pergunta | Lição |
| --- | --- | --- |
| d01 | Como os fornecedores costumam mandar os relatórios, e o que já foi devolvido por estar incompleto? | 09-05 |
| d02 | Quais chamados se repetem e com quais fornecedores? Que prazos eles cumprem de verdade? | 09-06 |
| d03 | Que reserva técnica e que padrão de identificação usamos na prática? | 03-06, 07-03, 07-04 |
| d04 | Qual é o critério de aceite por emenda que usamos no dia a dia (0,1? 0,15 dB?) | 05-04, 06-03 |
| d05 | Quem faz o arc check, a troca de eletrodo e a limpeza da máquina de fusão? | 05-03 |
| d06 | Que faixa de sinal na ONU cobramos dos provedores, se cobramos? Que topologia eles usam aqui? | 04-05 |
| d07 | A rede para as unidades é ponto a ponto (SFP) ou tem PON? | 04-01, 04-06, 02-05 |
| d08 | Como é o fluxo para cabo clandestino (registro, retirada, guarda do material)? | 07-01, 07-06 |
| d09 | Que nomes e campos usamos nas camadas do QGIS? Usamos QField? | 08-06, 08-07 |
| d10 | Qual é o plano de VLANs, e eu posso rodar comandos de consulta (show) nos switches? | 11-04 |
| d11 | Como os fornecedores costumam contestar uma glosa, e o que já foi aceito ou recusado? | 09-02 |
| d12 | Existe um registro de ocorrências (livro, planilha, sistema) para cada contrato? Onde fica? | 09-03 |
| d13 | Que potências (dBm) costumamos ver nos equipamentos dos links, e a partir de quanto a equipe considera alarme? | 02-07 |
| d14 | Que equipamentos de teste a equipe tem (OTDR, power meter, medidor PON seletivo, VFL) e que cabos de lançamento e de recepção usamos (comprimento, conector UPC ou APC)? | 06-01, 06-02, 10-03 |
| d15 | Quando o mapa de fusão liga cabos de padrões de cor diferentes, ele casa as fibras por número ou por cor? Como a equipe anota? | 03-03 |
| d16 | Que álcool isopropílico (pureza) e que removedor de geleia a equipe usa na bancada, e como fazemos o descarte do pote de fragmentos de fibra? | 10-04, 05-01 |
| d17 | Qual é o SRC do projeto de QGIS da equipe e das camadas de postes e cabos: 31980, 4674 ou outro? | 08-03 |
| d18 | A equipe usa a zona 20 para o estado todo ou muda para a zona 21 a leste de 60°O? | 08-03 |
| d19 | Quais camadas a equipe usa no dia a dia (postes, cabos, caixas…) e de que tipo é cada uma: ponto, linha ou polígono? | 08-02 |
| d20 | Em que formato os dados ficam guardados: GeoPackage, Shapefile, banco de dados? | 08-02 |
| d21 | A equipe usa imagem de satélite de fundo? De onde ela vem? | 08-02 |
| d22 | Quais consultas a equipe mais faz nas camadas de postes e cabos (por ocupante, por situação, por data de vistoria)? | 08-06 |
| d23 | As camadas do projeto da equipe já vêm com algum filtro ligado? Qual e por quê? | 08-06 |
| d24 | Como a equipe cadastra a ocupação dos pontos de fixação (sistema, planilha, QGIS)? | 07-01 |
| d25 | Como a equipe confere essas medidas em campo: do solo, com que instrumento, e quem pode fazer? | 07-02 |
| d26 | Onde podem ficar os equipamentos dos ocupantes (caixas, fontes) no poste, segundo a norma da empresa? | 07-02 |
| d27 | A equipe usa a LTR ou a versão mais nova do QGIS? Quem decide quando trocar de versão? | 08-01 |
| d28 | Quais complementos (plugins) a equipe usa, e quem testa se eles funcionam antes de uma troca de versão? | 08-01 |
| d29 | Em que formato a equipe guarda os dados e em que formato manda para fornecedores e outras áreas? | 08-04 |
| d30 | Posso mandar KML da rede para fora da empresa ou abrir no Google Earth? Quem autoriza? | 08-04 |
| d31 | Quem pode editar o cadastro de postes e cabos da empresa, e em que arquivo ou sistema? | 08-05 |
| d32 | Quando acho um erro de cadastro em campo, como registro e para quem mando? | 08-05 |
| d33 | A equipe edita direto no arquivo compartilhado ou cada um trabalha numa cópia? | 08-05 |
| d34 | A equipe usa algum aplicativo de coleta em campo (QField ou outro)? Em que aparelho? | 08-07 |
| d35 | Quem recebe e confere o que foi coletado em campo antes de entrar no cadastro? | 08-07 |
| d36 | Como registro um cabo sem plaqueta ou com plaqueta ilegível: formulário, foto, sistema? | 07-03 |
| d37 | Depois de quantos avisos, e por quem, um cabo sem dono identificado passa a ser tratado como clandestino? | 07-03 |
| d38 | Quais dessas irregularidades (reserva ou caixa no poste, drop no meio do vão) a equipe mais encontra e como costuma registrar? | 07-04 |
| d39 | Como a equipe mede a altura de um cabo com segurança: com que instrumento e quem pode medir? | 07-05 |
| d40 | Qual é o procedimento ao encontrar um cabo baixo sobre a via: a quem avisar e como sinalizar? | 07-05 |

---

### O que **não** levar para o app nem para o GitHub
Rotas, coordenadas, fotos, plantas, planilhas, nomes de pessoas, endereços de unidades, configurações e senhas. Usinas e subestações são infraestrutura crítica. As respostas ficam só no **Meu caderno**, no aparelho.
