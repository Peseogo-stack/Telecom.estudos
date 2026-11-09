# Revisão técnica — módulo 6 (testes ópticos) e Leitor de OTDR

Revisão de 09/11/2026, branch `revisao-p1-parte2`. Substitui o relatório de 08/11/2026, feito fora do Claude Code.

**Escopo:**

- lições 06-01, 06-02 e 06-03 e suas 24 questões;
- diagramas `Referencia1Cordao`, `OtdrComoEnxerga` e `OtdrEventos`;
- os termos do glossário ligados ao módulo;
- a ferramenta Leitor de OTDR (`traco.ts`, `TracoSvg.tsx` e `TelaLeitorOtdr.tsx`).

**Método:** cada número e cada regra foram comparados com o trecho da fonte:

- FOA: OFSTP-14 (perda de inserção), *OTDRs*, *dB* e medidores PON;
- Fluke: método de 1 cordão;
- EXFO: AN 194;
- VIAVI: tabela de valores típicos;
- Yokogawa: medição nos dois sentidos.

Os 23 links das fontes dos módulos 3 e 6 respondem (HTTP 200).

## Resumo

| Severidade | Quantidade |
| --- | --- |
| ERRO | 1 |
| AJUSTE | 3 |

O módulo estava, no geral, correto.

- **06-01:** referência de 1 cordão, 5 minutos para a fonte estabilizar, variação de 0,1 dB, acoplador cerâmico ou metálico, incerteza de ±10%, cordão de 0,2 dB (trocar acima de 0,5 dB).
- **06-02:** retroespalhamento e Fresnel, zona morta medida a −1,5 dB e a 0,5 dB, faixa dinâmica de 5 a 8 dB acima da maior perda, cerca de 1% de fibra a mais e OTDR mais útil acima de cerca de 250 m.
- **06-03:** a tabela da VIAVI e o ganho aparente. As contas das questões foram refeitas.

## Erro corrigido

| # | Onde | Estava | O que a fonte diz | Correção |
| --- | --- | --- | --- | --- |
| E1 | 06-03 (tabela e texto), questão 06-03-q5, simulador (`traco.ts`) e a explicação da correção no Leitor | A quebra reflete "menos **ou nada**"; o simulador gerava quebra **sem pico** em 30% dos casos. | VIAVI: *"Fiber Break or cut: −30 to −48 dB"* e *"Reflections occur at connector pairs, mechanical splices and the fiber end or break"*. A EXFO também lista *"fiber breaks"* entre os eventos que refletem. Nenhuma das fontes fala de quebra sem reflexão. | A quebra sempre reflete, de −30 a −48 dB (menos que um conector UPC aberto). O simulador e a explicação seguem a VIAVI. |

## Ajustes

| # | Onde | Ajuste |
| --- | --- | --- |
| A1 | 06-01 e questão 06-01-q4 | A FOA diz que o OTDR não deve medir perda de inserção e que muitas normas não aceitam só o OTDR, mas também que *"For many OSP cables, OTDR testing is considered sufficient"*. A lição e a questão agora dizem isso: o contrato manda ("confirmar"). |
| A2 | Questão 06-03-q7 | O distrator "quebra irregular sem reflexão" virou "quebra da fibra", e a explicação dá a refletância da quebra pela VIAVI (−30 a −48 dB). |
| A3 | Relatório anterior | Os ajustes que ele registrava foram conferidos e estão certos: os dois casos de fantasma, a convenção do dB no visor, o método A1 da IEC e as condições da zona morta e da faixa dinâmica. |

## Leitor de OTDR

Nos traços do simulador, as faixas de valores conferem com as fontes:

- conector: perda de 0,2 a 0,5 dB e reflexão de −59 a −50 dB (VIAVI: 0,15 a 0,5 dB; −50 a −59 dB);
- fusão: de 0,10 a 0,30 dB, quase igual nas duas λ (VIAVI; EXFO: *"almost wavelength independent"*);
- curvatura: 5,5 a 9,5 vezes maior em 1550 nm (VIAVI: 5 a 10 vezes);
- fim de fibra: em 1,01 × o comprimento do projeto (FOA: cerca de 1% de fibra a mais), com −14 a −20 dB (VIAVI);
- fantasma: no dobro da distância do fim (FOA).

Os 12 testes do simulador passam; os traços de cada nível continuam reproduzíveis.
