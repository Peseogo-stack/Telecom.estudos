# Revisão técnica — módulo 3 (cabos e componentes) e Código de cores

Revisão de 09/11/2026, branch `revisao-p1-parte2`. Substitui o relatório de 08/11/2026, feito fora do Claude Code.

**Escopo:**

- lições 03-01, 03-03, 03-04 e 03-07 e suas 32 questões;
- diagramas `GravacaoCabo`, `CoresBrTia`, `TubosPiloto` e `UpcApc`;
- os termos do glossário ligados ao módulo;
- a ferramenta Código de cores (`cores.ts` e `TelaCores.tsx`).

**Método:** o texto inteiro foi conferido contra as fichas:

- Prysmian: AS e duto;
- Transcend: AS;
- Furukawa: ET02719;
- FOA: cores, conectores e refletância;
- Fluke: APC × UPC;
- Intelbras: infográfico FTTH, CTO e DIO;
- Nazda: PTO.

As mudanças feitas fora do Claude Code em 08/11 (commit 2d9ce33) foram conferidas uma a uma.

## Resumo

| Severidade | Quantidade |
| --- | --- |
| ERRO | 3 |
| AJUSTE | 0 |

O resto do módulo confere com as fichas:

- **Gravação (03-01):** CFOA, SM, AS80, S/G, FO, NR/RC, DD e DDR, raio de 20 × e 10 × o diâmetro, cerca de 1% de fibra a mais.
- **Cores (03-03):** as 12 cores nacionais e a ordem TIA-598.
- **Tubos (03-04):** piloto e direcional, fibras por tubo na Prysmian, contas de 48 e 144 fibras, marcas a partir do 13º tubo.
- **Conectores (03-07):** SC, LC e FC; PC, UPC e APC (FOA); APC com UPC (Fluke); DIO, CEO e CTO.

Das mudanças de 08/11, estas estão certas:

- `xxxx` com os 4 últimos dígitos da ordem de produção (Prysmian);
- `012FO` e `72F`;
- DDR (Furukawa, cabo com proteção contra roedores);
- tubos 13 a 24 e fibras 13 a 24 com traços (Furukawa);
- zircônia (ficha Intelbras);
- cinza *slate* e rosa *rose* (FOA).

## Erros corrigidos

| # | Onde | Estava | O que a fonte diz | Correção |
| --- | --- | --- | --- | --- |
| E1 | 03-07 | "Em **cabos** multimodo mais novos, a FOA traz também preto para OM2, água para OM3/OM4 e verde-limão para OM5". | FOA, tabela *Connector Color Codes*: são cores de **conector** (corpo, capa e adaptador): 62,5/125 bege; 50/125 OM2 preto; OM3/OM4 água; OM5 verde-limão; monomodo azul; APC verde. | "Na tabela de cores de conector da FOA…". |
| E2 | 03-07 | PTO: "comporta até 12 fusões **ou** um splitter 1x8 e 8 adaptadores". | Nazda: bandeja giratória *"para emendas de até 12 fibras"* **e** lugar para *"1 divisor [...] PLC 1x8 e 1 adaptador SC [...] para entrada, além de 7 adaptadores SC [...] para saída"*. | "Bandeja para até 12 emendas e lugar para um splitter 1x8 com 8 adaptadores SC". |
| E3 | Ferramenta Código de cores | No esquema piloto, todo tubo a partir do 13º recebia a marcação "anéis", como regra do esquema. | Os anéis a partir do 13º tubo estão na ficha da Prysmian (cabo de duto). A Transcend, que também usa piloto e direcional, não define marcação acima de 12 tubos. | A marcação diz "anéis, na ficha Prysmian; confira a do seu cabo". O teste acompanha. |

## Lição 03-02 · Por dentro do cabo (11/11/2026)

Fontes lidas no PDF original: fichas Prysmian CFOA AS KP DRY-DRY (BR00_CFOA_AS_DRY_20250625) e CFOA-SM-DD-S (duto), Transcend Speed Star AS e Furukawa ET02719 v7 (duto com proteção contra roedores); FOA, segurança nas instalações.

| Ponto | Como ficou | Por quê |
| --- | --- | --- |
| Quem faz a tração | Aramida, citando a Prysmian ("elementos de tração") | A pesquisa só dizia "suporta a tração"; a ficha diz literalmente |
| Elemento central | "Prevenir os esforços de contração do cabo" (Transcend e Furukawa); os tubos são reunidos em volta dele (Prysmian) | A primeira redação dizia que ele servia "para os tubos se apoiarem", sem fonte |
| Tensão do vão | Carga do ensaio de tensão máxima de operação: 1,5 × o peso por km no vão de 80 m e 3,0 × no de 200 m | A primeira redação falava em "esforço que cresce com o vão"; o número é de ensaio, não de esforço real |
| Fio de rasgamento | "Corre junto da capa" | A Prysmian diz que a capa "contém" o fio; "logo abaixo" não está na ficha |
| Seco × gel | O "S" é o núcleo; o tubo pode ter gel (Transcend e duto Prysmian) ou não (Prysmian *dry*) | Evita o erro de achar que núcleo seco dispensa removedor de gel |
| Fibras por tubo | Tabela da Prysmian: 6 por tubo em 24 e 36; 12 de 48 a 144; no 12FO, 12 no AS80 e 2 no AS120 e AS200 | A pesquisa dava só parte dessa tabela |
| Ferragem metálica | Citada pela FOA (dois instaladores mortos) e ligada ao checklist do poste, com "confirmar na empresa" | Cabo dielétrico não deixa a ferragem segura |

Ficou de fora, sem fonte: o motivo da torção SZ, técnicas de abertura do cabo e qualquer regra de quanto cabo abrir na caixa (está na 05-01, pela FOA).

**Questões:** 8. Nas de "colega diz" (q5 e q8), duas alternativas concordam e duas discordam.

**Glossário:** 4 termos novos (fio de rasgamento, aramida, material hidroexpansível, elemento central); "tubo loose" passou a apontar também para a 03-02.

**Perguntas para a empresa:** a21 e b39.

**Vídeos:** 2 (Gatre, sobre a construção do cabo loose, com aviso; Cristiano Viana, sobre geleado, seco e totalmente seco).

## Lição 03-05 · Tipos de cabo e onde usar (11/11/2026)

Fontes lidas no PDF original: fichas Prysmian do autossustentado, do cabo de duto, do drop flat e do drop figura 8; Furukawa ET02719; T&D World (OPGW); Cemig ND-6.6 (exemplo); FOA (segurança).

| Ponto | Como ficou | Por quê |
| --- | --- | --- |
| Cabo de duto no vão | "A ficha não dá vão máximo"; no poste, só espinado na cordoalha | A primeira redação dizia "sem previsão para vão livre", sem fonte |
| Drop flat | "A ficha não lista metal" | A primeira redação dizia "todo dielétrico"; a ficha não usa a palavra |
| Drop figura 8 | Fio de aço de 1,30 mm; 100 N sem a sustentação; metal conduz (FOA); aceitação no poste "confirmar na empresa" | Ponto de segurança |
| OPGW | Assunto das linhas de transmissão (T&D World); pergunta a quem cuida | "Não é cabo de poste" não tinha fonte |

**Questões:** 8 (q3 e q8 com duas que concordam e duas que discordam). **Glossário:** espinado e LSZH. **Perguntas:** a22, b40, c24. **Vídeo:** 1 (OPGW, o mesmo da 01-06, com aviso).
