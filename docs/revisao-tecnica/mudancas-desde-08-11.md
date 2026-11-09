# Mudanças de 08/11/2026 nos módulos 2 e 9 e nas lições 10-01 e 10-05

Revisão de 09/11/2026, branch `revisao-p1-parte2`.

**Escopo:** só o que mudou a partir de 08/11/2026, quando outra ferramenta mexeu no repositório. Foi usado `git log --since=2026-11-08` e o diff contra o commit `6b99b9f`, o último antes de 08/11.

O diff cobre:

- lições e questões dos módulos 2 e 9 e das lições 10-01 e 10-05;
- os diagramas e as ferramentas desses módulos (orçamento, conversor, disponibilidade e glosa);
- as entradas do glossário, das fontes e do banco de perguntas ligadas a eles;
- `docs/decisoes.md` e `docs/especificacao.md`.

## O que mudou e o veredito

| Arquivo | Mudança | Veredito |
| --- | --- | --- |
| `content/licoes/09-03.md` (commit 6aef321) | "Como técnico, o mais provável é você apoiar a fiscalização técnica" virou "Na atuação em telecomunicações e TI, o mais provável…". | Só redação, sem conteúdo técnico; acompanha a mudança do público do app na especificação. Mantida. |
| `content/glossario.json` | Termos do módulo 2 e do módulo 9 (`orcamento-de-potencia`, `sensibilidade`, `sobrecarga`, `splitter`, `ganho-aparente`, `otdr` e `orcamento-de-perda`) ganharam ligação com lições dos módulos 4 e 5. As definições não mudaram. | Certo. |
| `content/perguntas-empresa.json` | As perguntas b16, c09 e d07 ganharam ligação com lições dos módulos 4 e 5. | Certo. |
| `content/fontes.json` | Observações de fontes também usadas pelos módulos 3, 6 e 10 foram completadas. | Conferidas nas revisões desses módulos. |
| `docs/decisoes.md`, `docs/especificacao.md` e `docs/pesquisa.md` | "Técnico de telecom" virou "profissional de TI e telecomunicações". | Só redação. |

**Nada mudou** nas lições e questões do módulo 2, nas 10-01 e 10-05, nos outros arquivos do módulo 9, nos diagramas e nas ferramentas desses módulos. O código de cores mudou, mas é do módulo 3 e está no relatório `modulo-03.md`.

**Resultado:** nenhum erro técnico.
