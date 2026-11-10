# Revisão técnica do módulo 8: QGIS

Cada lição é escrita a partir de uma ficha com o trecho literal de cada fonte, aberta no dia. Depois eu confiro a lição, o glossário, as perguntas, as questões e o diagrama frase a frase contra a ficha. Os caminhos de menu são conferidos no manual da 3.44 (LTR) e no da versão em desenvolvimento (4.x, `docs.qgis.org/testing`).

## 08-03 — SRC, UTM 20S e o erro de 10.000 km (10/11/2026)

**Fontes abertas:** registro EPSG (CRS 31980, 31974, 31981 e 4674, com as áreas de uso e as conversões UTM), IBGE R.PR 1/2005, manual do QGIS 3.44 e 4.x (projeções, abrir dados, criar camadas) e OpenStreetMap (longitude das sedes).

**O que o registro EPSG confirma:** a 31980 (20S) vale para o Brasil "northern and southern hemispheres"; a área registrada da 31974 (20N) é "north of approximately 4°N". As duas só diferem no falso norte (10.000.000 m e 0 m).

**Exemplo:** calculado com o pyproj para um ponto fictício em 3,40° N, 61,65° O. N = 10.375.911 m (20S) e 375.911 m (20N). O N da 20N lido como 20S cai em 86,4° S.

| Estava | Fonte | Ficou |
| --- | --- | --- |
| N da 20S aberto como 20N "vai parar além do Polo Norte e some do mapa" (erro da minha ficha) | Conta com o pyproj: o ponto fica 10.000 km ao norte, perto de 86° N | "10.000 km ao norte, na região do Polo Norte" (lição e questão 7) |
| SIRGAS 2000 "é o sistema geodésico oficial do Brasil desde" 2005 | R.PR 1/2005: "fica estabelecido como novo sistema de referência geodésico" | "A R.PR 1/2005 estabeleceu o SIRGAS 2000 como sistema de referência geodésico do Brasil" (lição e glossário) |
| "N de 8 dígitos começando com 10 indica 20S" | Só vale ao norte do Equador | "Ao norte do Equador…"; ao sul, o N da 20S fica abaixo de 10.000.000 |
| "Projeto novo começa em WGS 84" | Manual: é o padrão, e pode ser mudado | "Por padrão…" (lição e glossário) |
| "O QGIS não adivinha" o SRC | Manual: tenta determinar e às vezes não consegue | "não descobre sozinho" |
| Passo do CSV sem o separador | Manual: Custom delimiters (o arquivo usa ponto e vírgula) | Passo completo |
| Citação do manual em inglês no meio do texto | — | Em português |
| Sem menção às versões | Manuais da 3.44 e da 4.x conferidos | "Caminhos iguais nos manuais da 3.44 LTR e da 4.x em desenvolvimento" |
| Glossário: SIRGAS 2000 "em UTM, as zonas 20S e 21S" | Há outras zonas no país | "em UTM, Roraima cai nas zonas 20S e 21S" |

A lição passou de 700 palavras com as correções e foi enxugada para caber.

**Vídeos:** dois conferidos pelo oEmbed e pela descrição (YouTube Data API). O de Bruno Rech entra com aviso: a descrição diz que a conversão temporária entre SRCs "deve ser evitada", e o manual do QGIS a trata como funcionamento normal. Ficaram de fora um vídeo de 33 min sem capítulos e dois com divulgação na descrição.

**Validador:** o limite de palavras por lição passou de 900 para 700 no aviso (a regra já valia no texto, não no código deste branch).

## 08-02 — Vetor, raster, feição e atributo (10/11/2026)

**Fontes abertas:** "A Gentle Introduction to GIS" do QGIS 3.44 (dados vetoriais e raster) e o manual do QGIS 3.44 e 4.x (tabela de atributos, abrir dados, ferramentas gerais). As contagens do exercício (66 postes, 12 cabos, 6 quadras, 6 ocupantes, o poste PF-0007) foram conferidas direto no GeoPackage fictício.

| Estava | Fonte | Ficou |
| --- | --- | --- |
| "Um SIG guarda o mundo em dois tipos de dado" | O QGIS lê outros tipos além de vetor e raster | "trabalha, principalmente, com dois tipos de dado" |
| "Uma camada reúne feições do mesmo tipo de geometria", sem fonte | Gentle Introduction, 3.5: "Features in a layer have the same geometry type" | Frase com a fonte |
| "Um arquivo pode ter várias camadas" | Vale para o GeoPackage (contêiner de camadas), não para qualquer formato | "Um arquivo GeoPackage pode ter várias camadas" |
| Raster "serve de fundo", como fato do manual | O manual fala de informação contínua, satélite e foto aérea | A frase do manual com a fonte; "costuma ir no fundo do mapa" fica como uso comum |
| "Show Features Visible on Map" | Manual: "Show Features visible on map" | Como no manual |
| Identify Features "com um cabo no mapa" | Manual: clicar numa feição da camada ativa | "Com a camada cabos ativa" |
| "Só na 4.x… Essa frase não está no manual da 3.44" | Manual da versão em desenvolvimento | "Novidade no manual da 4.x em desenvolvimento (10/11/2026)… O manual da 3.44 LTR não traz isso" |
| Questão 2: "um arquivo tem poucas camadas" | Sem fonte | "Cada poste é uma feição dentro da camada, não uma camada" |

**Diferença entre versões achada nesta lição:** no manual da 4.x, o duplo clique no cabeçalho da linha da tabela dá zoom na feição. Os outros caminhos são iguais.

**Vídeos:** um conferido (Geotecnologias na rede, 12:02; a descrição lista abrir dados, tabela de atributos e ponto, linha e polígono). Ficaram de fora um corte de live com divulgação de curso, um vídeo de 2019 que chama o GeoPackage de "substituto" do Shapefile e uma aula marcada como português de Portugal com descrição vaga.

## 08-06 — Perguntas à camada: filtrar, selecionar e contar (10/11/2026)

**Fontes abertas:** manual do QGIS 3.44 e 4.x (Query Builder, ferramentas de seleção, tabela de atributos, expressões e lista de funções). Todas as contagens do exercício foram conferidas com consultas diretas no GeoPackage fictício. Os comprimentos do cabo CB-01 foram calculados com o pyproj sobre a geometria do arquivo: 434,31 m no elipsoide GRS80 e 434,26 m no plano da projeção.

| Estava | Fonte | Ficou |
| --- | --- | --- |
| Com filtro, só as feições do resultado "existem no projeto" | Manual: "are available in the project" | "ficam disponíveis no projeto" |
| "Tire o filtro", sem dizer como | Manual: o botão Clear apaga a consulta e devolve a camada ao estado original | "tire o filtro com Clear" |
| Questão 8: `"altura_m" = 9` "acha 2 postes de madeira" | No arquivo, `"altura_m" = 9` sozinho acha 17 postes; os 2 são com o material junto | A explicação cita a expressão completa da lição |

**Diferença entre versões achada nesta lição:** o manual da 4.x cita o Filter… também no menu de contexto da camada e diz que o filtro é feito no provedor de dados, então a sintaxe depende dele.

**Vídeos:** nenhum dos quatro candidatos novos entrou (um divulga curso pago; os outros são de 2013 a 2018, de versões antigas). Entrou o mesmo vídeo da 08-02, cuja descrição lista seleção e filtros.
