# Fibra em Campo

App de estudo e de consulta em campo sobre **telecom numa distribuidora de energia**, com foco em fibra óptica, FTTH, postes, contratos e segurança. Feito para estudar em pílulas de 10 a 15 minutos no celular e funcionar **sem internet** depois da primeira visita.

**Prévia:** https://peseogo-stack.github.io/Telecom.estudos/ (conteúdo em revisão) · [Como instalar no Android e usar sem internet](docs/instalar-no-android.md)

> **Status:** em construção. Fases 1 e 2 concluídas. A prévia traz a semana 1 (segurança e contratos), o módulo 2 (fibra óptica, com orçamento de potência, dBm ↔ mW, splitters e código de cores), o módulo 6 (testes ópticos: power meter, OTDR e leitor de OTDR), o módulo 3 (cabos, cores, conectores e caixas), o módulo 10 completo (segurança elétrica, altura, óptica e química), o módulo 5 (fusão óptica: preparo, máquina e perdas) e o módulo 4 (FTTH e PON: arquitetura, splitters e orçamento de potência), cada um já com a revisão técnica aplicada ([semana 1](docs/revisao-tecnica/semana-1.md), [módulo 2](docs/revisao-tecnica/modulo-02.md), [módulo 6](docs/revisao-tecnica/modulo-06.md), [módulo 3](docs/revisao-tecnica/modulo-03.md), [módulo 10](docs/revisao-tecnica/modulo-10.md), [módulo 5](docs/revisao-tecnica/modulo-05.md), [módulo 4](docs/revisao-tecnica/modulo-04.md)). Os módulos seguintes entram depois de passar pela mesma revisão. Os documentos estão em [`docs/`](docs/).

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

React + TypeScript + Vite, PWA offline, sem backend, publicado no GitHub Pages. Como o código está organizado: [`docs/como-funciona.md`](docs/como-funciona.md).

## Rodar no PC

```bash
npm install
npm run dev        # http://localhost:5173/Telecom.estudos/
npm run verificar  # valida o conteúdo, compila e roda todos os testes
```

## Publicar

A cada push no `main`, o GitHub Actions valida o conteúdo, compila, roda os testes e grava o site pronto no branch `gh-pages` ([`.github/workflows/publicar.yml`](.github/workflows/publicar.yml)). No GitHub, em **Settings → Pages → Build and deployment**, a fonte precisa ser **Deploy from a branch → `gh-pages` → `/ (root)`**. Com `main`, o Pages publica o código-fonte, e o app não abre.
