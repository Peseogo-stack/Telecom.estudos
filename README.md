# Fibra em Campo

App de estudo e de consulta em campo sobre **telecom numa distribuidora de energia**, com foco em fibra óptica, FTTH, postes, contratos e segurança. Feito para estudar em pílulas de 10 a 15 minutos no celular e funcionar **sem internet** depois da primeira visita.

> **Status:** em construção. Fase 1 (pesquisa e plano) concluída. Os documentos estão em [`docs/`](docs/).

## O que tem (planejado)

- **Trilha** de 12 módulos e 73 lições, cada uma com diagrama próprio em SVG, "na prática", erros comuns, "pergunte na empresa", fontes e 5 questões com explicação de cada alternativa.
- **Revisão espaçada** do que você errou (1, 3, 7 e 15 dias).
- **Ferramentas:** disponibilidade e glosa de SLA, orçamento de potência, conversor dBm ↔ mW, splitters, código de cores, leitor de OTDR, montador de rede PON, inspeção de poste.
- **Campo:** checklists offline e modo sol.
- **Glossário** com busca (sigla, português e inglês) e **Meu caderno** para anotar os padrões da empresa, salvo só no aparelho.

## Documentos

| Arquivo | Conteúdo |
| --- | --- |
| [`docs/pesquisa.md`](docs/pesquisa.md) | Pesquisa dos 12 blocos, com fonte e data de acesso de cada número |
| [`docs/curriculo.md`](docs/curriculo.md) | Módulos, lições, prioridades e plano de 90 dias |
| [`docs/especificacao.md`](docs/especificacao.md) | Telas, ferramentas, formato do conteúdo e critérios de "pronto" |
| [`docs/perguntas-para-a-empresa.md`](docs/perguntas-para-a-empresa.md) | O que confirmar no trabalho, organizado por onde achar a resposta |
| [`docs/decisoes.md`](docs/decisoes.md) | Registro de decisões |

## Princípios

- **Conteúdo certo antes de tudo:** cada número tem fonte e data. Onde a prática muda de empresa para empresa, o app avisa "confirmar na empresa".
- **Segurança é lembrete:** não substitui treinamento, APR nem procedimento da empresa.
- **Nenhum dado real:** exercícios usam dados fictícios; o que for da empresa fica só no aparelho de quem usa.

## Stack

React + TypeScript + Vite, PWA offline, sem backend, publicado no GitHub Pages.
