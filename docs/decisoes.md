# Registro de decisões

> Cada decisão tem data, o que foi decidido e o porquê. Quando uma decisão mudar, a antiga fica riscada e a nova entra com a data.

## Fase 1 — aprovada em 07/11/2026, com ajustes

| # | Data | Decisão | Por quê |
| --- | --- | --- | --- |
| D1 | 07/11/2026 | O app fica no repositório **público** `Peseogo-stack/Telecom.estudos`, na raiz. Base do Vite: `/Telecom.estudos/` (T maiúsculo e ponto). Endereço: `https://peseogo-stack.github.io/Telecom.estudos/`. | Repositório próprio fica melhor no portfólio. |
| D2 | 07/11/2026 | Por ser público, os documentos não citam o nome da empresa nem dados pessoais (rotina, equipe, agenda). Fala-se em "uma distribuidora de energia em Roraima". Normas, regulação e fontes públicas podem ficar; links cujo endereço traz o nome da empresa foram omitidos. | Privacidade e segurança (infraestrutura crítica). |
| D3 | 06/11/2026 | Nome do app: **Fibra em Campo** (provisório). | Curto e diz o uso. |
| D4 | 07/11/2026 | ~~P1 começa por segurança e fibra~~ → ~~**Semana 1 = segurança + contratos** (SLA, glosa, gestor × fiscal, chamados e escalonamento, conferir relatório do fornecedor). Semana 2 = fibra básica (dB, dBm, perdas) e power meter/OTDR.~~ Substituída pela D20. | Contratos são a primeira atividade da função e devem cair na mão do profissional de TI e telecomunicações nas próximas semanas. |
| D5 | 07/11/2026 | A calculadora de **disponibilidade e glosa** passa de P2 para **P1** e entra na Fase 2. | Ferramenta da semana 1. |
| D6 | 07/11/2026 | O módulo de fibra (com orçamento de potência e código de cores) abre a **Fase 3**. | A Fase 2 entrega a semana 1 do novo plano. |
| D7 | 07/11/2026 | "Pergunte na empresa" (nas lições e em `perguntas-para-a-empresa.md`) é classificado por onde achar a resposta: **Vejo sozinho**, **Documentos**, **Outras áreas**, **Colega de telecom**. | Dá para avançar sem depender de uma pessoa só. |
| D8 | 07/11/2026 | Todo valor padrão mostra de onde vem. Quando as fontes divergem, mostra as duas ou separa por caso. Ex.: pontos por poste ~~5~~ → **urbano 9 e rural 5** (Cemig ND-6.6, itens 5.9–5.10), com a Energisa NDU-009 v4.0 (4 + 1) ao lado. | O "5" anterior vinha de uma citação na imprensa, não de norma. |
| D9 | 07/11/2026 | Lição 10-01 mostra o raciocínio da zona controlada (0,60 m de afastamento mínimo telecom–BT nas normas de exemplo < 0,70 m de Rc da BT na NR-10) e manda confirmar autorização e APR na empresa antes de qualquer trabalho em poste. | Pedido explícito; é inferência, por isso o raciocínio fica à vista. |
| D10 | 07/11/2026 | Nova lição **10-05 "Nova NR-10: o que muda para telecom em poste"**, com a Portaria MTE nº 737/2026 (texto oficial no gov.br, com a retificação de 24/06/2026) como fonte. | Nova NR-10 confirmada; vigência em junho de 2027. |
| D11 | 07/11/2026 | Enquanto as perguntas à empresa não forem respondidas, o app usa os valores padrão marcados "confirmar na empresa"; o usuário preenche o Meu caderno conforme descobre. | Permite seguir sem esperar as respostas. |
| D12 | 06/11/2026 | Valores padrão das ferramentas: limite da norma ou máximo de ficha (conservador), nunca o "típico". Prática de mercado aparece separada e rotulada. | Evitar aprovar algo que não passa. |
| D13 | 06/11/2026 | Código de cores: padrão brasileiro (ficha Furukawa) primeiro, TIA-598 opcional; tubos coloridos e piloto/direcional suportados. | Os dois aparecem nos cabos do mercado. |
| D14 | 06/11/2026 | Inspeção de poste usa Cemig ND-6.6 e Energisa NDU-009 como **exemplos** marcados e editáveis. | A norma local ainda não foi lida. |
| D15 | 06/11/2026 | QGIS: 3.44 LTR principal, 4.2 em aba. Dados de treino numa área inventada, conferida em mapa antes de publicar. | A 4.2 não virou LTR; nenhum dado real. |
| D16 | 06/11/2026 | Revisão espaçada: erro volta em 1, 3, 7 e 15 dias; erro na revisão volta para 1 dia; acerto no de 15 dias = dominada; no máximo 20 por sessão. | Pedido + simplicidade. |
| D17 | 06/11/2026 | Técnica: conteúdo compilado no build (Markdown → HTML por script Node), `HashRouter`, sem biblioteca de estado, `vite-plugin-pwa`, testes com Vitest + Playwright + axe. | Leve no celular e fácil de entender. |
| D18 | 07/11/2026 | Fluxo de Git: documentos no `main`; a Fase 2 é feita no branch `fase-2` e só entra no `main` depois da aprovação. A prévia no GitHub Pages sai do `main` com a faixa "Conteúdo em revisão". | Nada vai ao ar sem aprovação. |
| D19 | 07/11/2026 | O plano não guarda rotina pessoal no repositório: em Ajustes o usuário marca data de início e dias só de revisão; isso fica só no aparelho. | Privacidade (D2). |
| D20 | 11/11/2026 | **Trilha em 4 etapas, na ordem de aprendizado:** 1 · Base (módulos 1, 10, 2, 3), 2 · Mão na massa (5, 6, 4), 3 · O trabalho na distribuidora (9, 7, 8), 4 · Aprofundar (11, 12). Só muda a exibição e a ordem do plano (um módulo por semana); IDs de módulos e lições ficam iguais. ~~A 01-01 continua como "comece por aqui" opcional.~~ (ver D21) Cada módulo mostra "N de M prontas", e as lições que faltam ficam num bloco "Em construção". | Pedido explícito; aprender a base antes do trabalho na distribuidora, sem perder progresso, revisões nem links. |
| D21 | 11/11/2026 | A 01-01 deixa de ser opcional: entra na semana 1 como lição normal e abre o plano. Sai o cartão "comece por aqui" das telas Hoje e Plano. | Pedido explícito; com a Trilha em etapas, a Etapa 1 já é o "comece aqui". |
