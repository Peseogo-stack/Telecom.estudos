# Estado do trabalho

Atualizado em 10/11/2026. Este arquivo diz o que está pronto, o que ficou pela metade e qual é o próximo passo, para retomar sem depender da memória de ninguém.

## No ar (main)

- P1 completo e revisado: módulos 2, 3, 4, 5, 6, 9 e 10 (29 lições, 233 questões) e as ferramentas.
- Acabamento do P1 (questões equilibradas, diagramas, lições de até 700 palavras).
- Vídeos: a tela, o validador e o `npm run conferir-videos` estão no main. Toda lição tem termos de busca; as do P1 ainda não têm vídeo conferido.
- Dados fictícios de QGIS em `public/dados-qgis/` (`npm run dados-qgis`).

## Pela metade, fora do main

### Branch `modulo-01-e-videos` (módulo 1: telecom numa distribuidora)

Pronto e conferido:

- 19 fontes, seis lições (01-01 a 01-06), 24 termos de glossário e 7 perguntas para a empresa;
- a 01-01 como "comece por aqui" opcional no plano;
- as 16 questões de 01-01 e 01-02.

Falta (está no commit "WIP"):

1. **Questões de 01-03 a 01-06.** Passam no validador; falta a revisão frase a frase. Li as de 01-03 e 01-04 e anotei:
   - 01-04-q5, q6 e q8 (e a 01-01-q5): três alternativas concordam com o colega ("Certo: …") e só a correta discorda. Quem não sabe a matéria acerta por exclusão. Reescrever com duas que concordam e duas que discordam.
   - 01-04-q8 e a lição 01-04: a lição diz que não há valor-padrão de prioridade na norma e que o 4 é só exemplo da SEL. Pelo que conheço, a IEC 61850-8-1 indica prioridade 4 como padrão do GOOSE. Achar uma fonte aberta e corrigir a lição e a questão; sem fonte, tirar a afirmação.
   - 01-04-q4: trocar "nem certificado" por "segundo a SEL, sem autenticação nativa".
   - 01-03-q5: dizer na explicação que levar GOOSE para fora da LAN exige solução própria (Cisco).
   - 01-05 e 01-06: não li.
2. **Diagramas.** Os seis estão desenhados (agente), medidos nos três temas e compilam. Falta a minha conferência dos números contra as lições e atualizar o `diagrama_descricao` de cada lição para bater com o desenho. O agente avisou que o CSS `.diagrama svg { max-height: 420px }` encolhe desenhos com mais de uns 500 de altura.
3. **Teste e2e** `tests/e2e/modulo-01.spec.ts` e o relatório `docs/revisao-tecnica/modulo-01.md` (rascunho, sem as partes de questões e diagramas).
4. Depois: apagar `docs/wip/`, rodar `npm run verificar` num worktree limpo, merge no main.

### Vídeos (conferência dos candidatos)

- `docs/wip/videos-candidatos.json` (no branch `modulo-01-e-videos`): candidatos para 27 das 35 lições, levantados por agente com o oEmbed e a YouTube Data API. Nenhum foi conferido por mim contra a lição.
- Próximo passo: para cada lição, na ordem semanas 1 e 2, módulo 1 e depois o resto, ler a descrição e os capítulos do candidato, comparar com a lição (valores de perda, regras de segurança) e só então gravar em `content/videos.json`. Vídeo longo sem capítulos fica de fora.
- A consulta usa a YouTube Data API (`videos.list`, 1 unidade por chamada; `search.list` custa 100). A chave fica só no segredo de rede do ambiente (host `www.googleapis.com`, cabeçalho `X-Goog-Api-Key`). Ela não está no Git nem em nenhum documento.
- Lições sem candidato até agora: 01-01, 01-02, 01-05, 02-04, 03-01, 09-02, 10-03 e 10-04.

## Em andamento: P2 de QGIS (módulo 8) e postes (módulo 7)

Branch `p2-qgis-postes`. Uma lição por vez, fechada por inteiro (pesquisa na fonte, lição, diagrama, glossário, perguntas para a empresa, 8 questões, vídeos ou termos de busca, revisão técnica, `npm run verificar`, merge no main).

Ordem: 08-03, 08-02, 08-06, 07-01, 07-02; depois 08-01, 08-04, 08-05, 08-07, 07-03 a 07-07.

As fichas de fatos de todas as lições (o que foi conferido na fonte, com os trechos) estão no branch `fichas-p2`, em `docs/fichas-p2/`. Lição que ainda não aparece na tabela abaixo já tem ficha pronta: falta redigir, revisar e publicar.

| Lição | Fechada em | Questões | Vídeos | O que a revisão corrigiu |
| --- | --- | --- | --- | --- |
| 08-03 SRC, UTM 20S e o erro de 10.000 km | 10/11/2026 | 8 | 2 (1 com aviso) | Destino do ponto com o falso norte trocado (perto do Polo Norte, não "some"); "oficial desde 2005" virou a frase da resolução; regra dos dígitos só ao norte do Equador; separador do CSV; lição enxugada para 700 palavras |
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
