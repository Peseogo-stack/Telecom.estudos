# Estado do trabalho

Atualizado em 11/11/2026. Este arquivo diz o que está pronto, o que ficou pela metade e qual é o próximo passo, para retomar sem depender da memória de ninguém.

## No ar (main)

- P1 completo e revisado: módulos 2, 3, 4, 5, 6, 9 e 10 (29 lições, 233 questões) e as ferramentas.
- Acabamento do P1 (questões equilibradas, diagramas, lições de até 700 palavras).
- Módulo 1 (telecom numa distribuidora): seis lições, 48 questões, diagramas e relatório em `docs/revisao-tecnica/modulo-01.md`. Entrou no main em 11/11/2026.
- Vídeos: a tela, o validador e o `npm run conferir-videos` estão no main. Toda lição tem termos de busca.
- Dados fictícios de QGIS em `public/dados-qgis/` (`npm run dados-qgis`).

## Trilha em 4 etapas (11/11/2026)

Branch `trilha-em-etapas` (D20). A Trilha agora agrupa os módulos em 4 etapas: 1 · Base (1, 10, 2, 3), 2 · Mão na massa (5, 6, 4), 3 · O trabalho na distribuidora (9, 7, 8) e 4 · Aprofundar (11, 12). Só mudou a exibição e a ordem do plano: os IDs são os mesmos, então progresso, revisões e links continuam valendo.

- As etapas ficam em `content/curriculo.json` (`etapas`). O validador confere que cada módulo está em uma etapa só e que o plano segue a ordem da Trilha.
- Plano: um módulo por semana (o 11 em duas), com novos marcos. A 01-01 abre o plano, como lição normal da semana 1 (D21).
- Cada módulo mostra "N de M prontas"; dentro dele, as lições que faltam ficam num bloco "Em construção" no fim.
- Lições que faltam na Etapa 1: 03-05 e 03-06. Os módulos 1, 2 e 10 estão completos.

## Etapa 1 completa (11/11/2026)

Uma lição por vez, com revisão técnica, `npm run verificar`, merge e push. Ordem: 10-02, 03-02, 03-05, 03-06.

| Lição | Fechada em | Questões | Vídeos | O que a revisão corrigiu |
| --- | --- | --- | --- | --- |
| 10-02 Altura: APR, PT e SPIQ | 11/11/2026 | 8 | 2 (com aviso) | PT: a nova NR-10 restringe ao turno, a NR-35 aceita a jornada; a lição manda não usar a jornada quando as duas valem. "Tem" absorvedor virou "deve ter"; 6 kN como critério de escolha; peça que segurou queda "sai de uso" |
| 03-02 Por dentro do cabo | 11/11/2026 | 8 | 2 (1 com aviso) | Tração pela aramida, citando a ficha; função do elemento central (contração) sem inventar outra; tensão do vão como carga de ensaio; "S" é o núcleo e o tubo pode ter gel |

## Vídeos do P1 e do módulo 1: conferidos em 11/11/2026

Método: título e canal pelo oEmbed; descrição, capítulos e duração pela YouTube Data API (`videos.list`). Sem transcrição: o que o vídeo fala e a descrição não mostra fica no `aviso`. Regras: no máximo 2 por lição; nada que contradiga a lição; vídeo de mais de 20 min sem capítulos fica de fora; propaganda forte ou assunto só pelo título também.

- 75 candidatos (66 vídeos diferentes) para 27 lições. Entraram 42 vídeos em 27 lições (39 em 24 lições do P1 e 3 em 3 lições do módulo 1). Com as do módulo 8, são 31 lições com vídeo no app.
- Ficaram de fora, por exemplo: o da Jrtreinamentos na 10-01 (a descrição trata a zona controlada como lugar seguro, e a lição diz que só entra trabalhador autorizado); três da nova NR-10 sem capítulos, com temas que a lição não confirma; o da Infortel na 03-07 (21:55 sem capítulos); o de 20 min sem capítulos na 04-05; e o da GOOSE Tecnologia na 04-05 (mistura sinal "ideal" com sensibilidade).
- Lições sem candidato, só com termos de busca: 01-01, 01-02, 01-05, 02-04, 03-01, 09-02, 10-03 e 10-04.
- 08-03: saiu o vídeo do Bruno Rech, que contradiz o manual do QGIS sobre a conversão entre SRCs. Ficou o outro.

## P2 de QGIS (módulo 8) e postes (módulo 7): concluído em 11/11/2026

Branch `p2-qgis-postes`. Uma lição por vez, fechada por inteiro (pesquisa na fonte, lição, diagrama, glossário, perguntas para a empresa, 8 questões, vídeos ou termos de busca, revisão técnica, `npm run verificar`, merge no main).

Ordem: 08-03, 08-02, 08-06, 07-01, 07-02; depois 08-01, 08-04, 08-05, 08-07, 07-03 a 07-07.

As fichas de fatos de todas as lições (o que foi conferido na fonte, com os trechos) estão no branch `fichas-p2`, em `docs/fichas-p2/`. Lição que ainda não aparece na tabela abaixo já tem ficha pronta: falta redigir, revisar e publicar.

| Lição | Fechada em | Questões | Vídeos | O que a revisão corrigiu |
| --- | --- | --- | --- | --- |
| 08-03 SRC, UTM 20S e o erro de 10.000 km | 10/11/2026 | 8 | 1 (o do Bruno Rech saiu em 11/11) | Destino do ponto com o falso norte trocado (perto do Polo Norte, não "some"); "oficial desde 2005" virou a frase da resolução; regra dos dígitos só ao norte do Equador; separador do CSV; lição enxugada para 700 palavras |
| 08-02 Vetor, raster, feição e atributo | 10/11/2026 | 8 | 1 | "Dois tipos de dado" virou "principalmente"; fonte para "camada = mesmo tipo de geometria"; "várias camadas" só para o GeoPackage; novidade da 4.x (duplo clique dá zoom) descrita como diferença entre manuais |
| 08-06 Filtrar, selecionar e contar | 10/11/2026 | 8 | 1 (o mesmo da 08-02) | "Existem no projeto" virou "ficam disponíveis"; botão Clear para tirar o filtro; explicação da questão 8 citava uma contagem que não batia com o arquivo |
| 07-01 Quem manda no poste | 11/11/2026 | 8 | 0 (só termos de busca) | Órgãos de cada resolução conjunta; data da notícia tratada como data do parecer da AGU; duas definições do glossário além do que a norma diz; fontes oficiais bloqueadas (li cópias integrais e disse isso na fonte) |
| 07-02 Anatomia do poste e faixa de ocupação | 11/11/2026 | 8 | 0 (só termos de busca) | A proibição do braço que estende o poste aparecia como regra geral e é do exemplo da Cemig; a Figura 2 da Cemig foi lida como imagem para conferir as cotas |
| 08-01 O que é o QGIS e qual versão eu tenho | 11/11/2026 | 8 | 0 (só termos de busca) | Faltava a data numa afirmação sobre o manual; o termo "complemento" tinha definição imprecisa e fonte errada |
| 08-04 Formatos de arquivo | 11/11/2026 | 8 | 0 (só termos de busca) | A regra "CSV sem arquivo de tipos vem todo como texto" era do driver da GDAL, não do QGIS (erro da minha ficha): lição, questão 7 e glossário corrigidos para a opção Detect field types; "5 arquivos" virou "pelo menos" |
| 08-05 Editar com segurança | 11/11/2026 | 8 | 0 (só termos de busca) | Nada a corrigir; conferidos os dois pontos sensíveis (o que o Undo garante e quem edita o cadastro da empresa) |
| 08-07 Campo com QField | 11/11/2026 | 8 | 1 (com aviso) | Area of Interest leva as feições que tocam ou cruzam a área; mapa de fundo descrito como no manual; questão 8 reescrita (SRC errado desloca todos os pontos, não um só) |
| 07-03 Plaqueta e identificação | 11/11/2026 | 8 | 0 (só termos de busca) | Frase atribuída à REN sem estar nela; "vale para todos" virou "todo ocupante"; 200–400 mm e 300 mm não "divergem"; distrator com conta errada |
| 07-04 Reserva, CEO, CTO e drops | 11/11/2026 | 8 | 0 (só termos de busca) | O que o exemplo da Cemig permite no poste com transformador (a rede passa direto e só se deriva para clientes; não "só o drop") |
| 07-05 Alturas ao solo | 11/11/2026 | 8 | 0 (só termos de busca) | "Poste mais alto que o meio do vão" só vale em terreno plano; a tabela da Energisa descrita como é (Tabela 03, por tensão de energia) |
| 07-06 Fiscalizar, notificar, retirar | 11/11/2026 | 8 | 0 (só termos de busca) | A norma diz que o detentor "pode" pedir à Comissão e "pode" retirar; a lição e o diagrama diziam que ele pede e retira |
| 07-07 Riscos em Roraima e o novo regulamento | 11/11/2026 | 8 | 0 (só termos de busca) | O decreto já manda ceder; o que falta é a regulação conjunta (preço, faixa, regularização); ressalva dos sites fora do ar; a regra de parar ganhou a fonte (NR-10, 10.6.3) |
