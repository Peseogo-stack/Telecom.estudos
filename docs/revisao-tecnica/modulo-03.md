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
