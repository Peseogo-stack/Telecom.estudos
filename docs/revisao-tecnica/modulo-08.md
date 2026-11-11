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

## 08-01 — O que é o QGIS e qual versão eu tenho (11/11/2026)

**Fontes abertas em 11/11/2026:** página de versões do QGIS (roadmap), o arquivo `version.txt` do projeto, os dois posts do blog do QGIS (03/10 e 04/11/2026) e o manual 3.44.

**Status no dia:** LTR 3.44.15; latest 4.2.3; a 4.2 não virou LTR; a 4.4.0, prevista para 30/10/2026, atrasou e não tem data; a 4.4.4 está prevista para virar LTR em 05/03/2027.

**Não deu para conferir:** a página de changelog das versões 4.0 e 4.2 estava fora do ar (HTTP 410). Por isso a lição não diz o que mudou ou deixou de funcionar na série 4.x; só que ela é a passagem de Qt5 para Qt6 e que o atraso vem de regressões, como diz o blog.

| Estava | Fonte | Ficou |
| --- | --- | --- |
| "`latest` não leva ao manual da LTR", sem data | Redirecionamento visto em 10 e 11/11/2026 | "em 11/11/2026, `latest` não leva…" |
| Termo "complemento" definido como "extensão instalada à parte", com a página de versões como fonte | Manual, "QGIS Plugins": há complementos do núcleo e externos | Definição nova e fonte própria (`qgis-complementos`) |

**Vídeos:** nenhum entrou. Os de 2026 em português tratam de instalação e de tema escuro; os sobre a série 4.x e o Qt6 estão em outros idiomas.

## 08-04 — Formatos de arquivo (11/11/2026)

**Fontes abertas em 11/11/2026:** páginas dos drivers da GDAL (KML, Shapefile, GeoPackage, CSV e DXF) e o manual do QGIS 3.44 e 4.x (abrir dados, criar camadas).

**Teste meu com a GDAL sobre os dados fictícios:** a camada `postes` salva como Shapefile virou `.shp`, `.shx`, `.dbf`, `.prj` e `.cpg`, com `ocupantes_qtd` cortado para `ocupantes_`, `esforco_dan` para `esforco_da` e `data_vistoria` para `data_visto`; salva como KML, saiu em EPSG:4326.

| Estava | Fonte | Ficou |
| --- | --- | --- |
| "Sem arquivo de tipos (.csvt), todas as colunas vêm como texto" (erro da minha ficha: é o comportamento do driver da GDAL) | Manual do QGIS: ao abrir como texto delimitado, "Detect field types" reconhece o tipo; desmarcada, tudo vem como texto | A lição, a questão 7 e o glossário passaram a falar da opção do QGIS |
| "São 5 arquivos" no Shapefile exportado | O teste foi com a GDAL; o QGIS pode gravar mais algum arquivo junto | "vários arquivos (pelo menos .shp, .shx, .dbf, .prj e .cpg)" |
| "A GDAL lê o DXF inteiro como uma camada" | GDAL: "By default" | "Por padrão…" |
| Questão 1 citava o `.csvt`, que saiu da lição | — | Distrator trocado por um erro de caminho de menu |

**Não conferido, e dito na lição:** se o DXF guarda SRC ("confira com quem desenhou").

**Vídeos:** nenhum entrou. O mais direto (23 segundos) chama o Shapefile de "defasado" e o GeoPackage de "substituto", e ainda divulga um guia; os outros estão marcados como português de Portugal, pedem Pix ou só têm link de curso.
