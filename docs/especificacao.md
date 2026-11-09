# Especificação do app — "Fibra em Campo" (nome provisório)

> Versão 0.2 · 07/11/2026 · repositório `Peseogo-stack/Telecom.estudos`, publicado em `https://peseogo-stack.github.io/Telecom.estudos/` (base do Vite: `/Telecom.estudos/`)
> Público: profissional de TI e telecomunicações numa distribuidora de energia, que estuda no celular (Android) e no PC.

## 1. O que o app precisa fazer

1. Levar do zero a conversar de igual com a equipe, os fornecedores e os provedores em 90 dias, em pílulas de 10 a 15 minutos.
2. Servir de consulta rápida no poste, na caixa de emenda e na subestação, **sem sinal**.
3. Oferecer ferramentas de uso real: calculadoras, simuladores e checklists.
4. Ter código organizado e documentado para entrar no portfólio do GitHub.

**Fora do escopo:** login, servidor, sincronização em nuvem, dados reais da empresa, configuração de equipamentos.

## 2. Princípios

| Princípio | Como aparece no app |
| --- | --- |
| Conteúdo certo antes de tudo | Todo número tem `fonte` e `data de acesso`. O validador barra o build se faltar. |
| Varia por empresa | Selo **"Confirmar na empresa"** em cada valor que depende de padrão interno. Esses valores podem ser editados nas ferramentas e anotados no Caderno. |
| Segurança é lembrete | Faixa fixa no topo de toda tela de segurança e checklist de campo: "Lembrete. Não substitui treinamento, APR nem procedimento da empresa." |
| Nenhum dado real | Exercícios usam área e nomes fictícios. Dados da empresa só no Caderno, salvos no aparelho. |
| Leve e offline | Tudo pré-carregado depois da primeira visita. Meta: primeira carga ≤ 300 kB gzip de JS+CSS (sem conteúdo dos módulos, que é carregado por módulo). |
| Acessível | Contraste AA, alvo de toque ≥ 44 × 44 px, navegação por teclado, `prefers-reduced-motion`, textos alternativos nos diagramas. |
| Português simples | Termo em inglês entre parênteses na primeira vez. Sem analogias com a rede elétrica para explicar redes e telecom. |

## 3. Stack e arquitetura

- **React 18 + TypeScript + Vite.** Sem backend.
- **PWA:** `vite-plugin-pwa` (Workbox) com pré-cache de todo o app e do conteúdo; manifesto com ícones 192/512 e maskable; tela "Atualização disponível" quando sair versão nova.
- **Rotas:** `react-router-dom` com `HashRouter` (funciona no GitHub Pages sem configuração de servidor).
- **Estado:** React Context + `useReducer` para progresso e caderno; nada de biblioteca de estado externa.
- **Persistência:** `localStorage` com `try/catch` em toda leitura e escrita, chave versionada (`fc:v1:*`) e função de migração. Se o `localStorage` falhar (modo privado), o app funciona e avisa que o progresso não será salvo.
- **Conteúdo:** Markdown e JSON em `content/`, compilados por um script Node para `src/gerado/` no build (o celular não precisa interpretar Markdown).
- **Busca:** índice gerado no build (título, texto das lições, glossário, ferramentas), busca normalizada sem acento, no próprio app.
- **Publicação:** GitHub Actions → GitHub Pages, só depois da aprovação da Fase 4.
- **Testes:** Vitest (lógica: calculadoras, revisão espaçada, código de cores, armazenamento), Testing Library (componentes), Playwright (fluxos, prints em 390 e 1440 px, modo offline) e `axe-core` (acessibilidade).

### Estrutura de pastas proposta

```
Telecom.estudos/
├─ content/
│  ├─ fontes.json            # todas as fontes, com id, URL e data de acesso
│  ├─ glossario.json
│  ├─ dados/                 # tabelas usadas pelas ferramentas (splitters, cores, classes PON, valores de poste)
│  ├─ modulos/
│  │  └─ 02-fibra/
│  │     ├─ modulo.json
│  │     ├─ licoes/02-01-como-a-luz-viaja.md
│  │     ├─ questoes/02-01.json
│  │     └─ cartoes.json
│  ├─ checklists/*.json
│  └─ qgis/                  # dados fictícios (.gpkg, .kml) e exercícios
├─ public/                   # ícones, manifest, arquivos para download
├─ scripts/
│  ├─ compilar-conteudo.mjs
│  └─ validar-conteudo.mjs
├─ src/
│  ├─ app/                   # rotas, layout, provedores de contexto
│  ├─ telas/                 # Hoje, Trilha, Lição, Quiz, Revisão, Ferramentas, Campo, Glossário, Busca, Caderno, Plano, Ajustes
│  ├─ ferramentas/           # cada ferramenta: lógica pura (.ts) + tela (.tsx) + testes
│  ├─ diagramas/             # componentes SVG próprios
│  ├─ componentes/           # botões, cartões, selos, abas
│  ├─ dominio/               # revisão espaçada, progresso, armazenamento
│  └─ estilos/
├─ tests/e2e/
└─ docs/
```

> **Decidido (07/11/2026):** o app vive na raiz do repositório público `Telecom.estudos`. Por ser público, nenhum documento cita o nome da empresa nem dados pessoais; fala-se em "uma distribuidora de energia em Roraima".

## 4. Telas

### 4.1 Hoje (tela inicial)
- Saudação curta e **sequência de dias** estudados.
- Cartão **"Revisão de hoje"**: número de questões que venceram, botão "Revisar (≈ X min)". Se não houver nada: "Nada para revisar hoje".
- Cartão **"Próxima lição"**: módulo, título, duração e objetivo, botão "Começar".
- Cartão **"Semana do plano de 90 dias"**: meta da semana e progresso.
- Atalhos: Ferramentas, Campo (checklists) e Busca.
- **Pronto quando:** abre em menos de 1 s depois de instalado; mostra a revisão correta conforme a data do aparelho; funciona em modo avião.

### 4.2 Trilha
- Lista de módulos com barra de progresso, prioridade (P1/P2) e selo "Novo"/"Concluído".
- Dentro do módulo: lições na ordem, com estado (não iniciada, em andamento, aprovada ≥ 80%, reprovada).
- Lições P2 ficam visíveis e abertas (sem bloqueio rígido), com aviso "recomendado depois de …".
- **Pronto quando:** o progresso persiste depois de fechar e abrir o app.

### 4.3 Lição
Estrutura fixa (vinda do Markdown):
1. **Objetivo** (uma frase).
2. **Explicação** curta com **diagrama SVG** próprio.
3. **Na prática** (como isso aparece no trabalho).
4. **Erros comuns.**
5. **Pergunte na empresa**, com cada pergunta classificada por onde achar a resposta: 👁 **Vejo sozinho**, 📄 **Documentos**, 👥 **Outras áreas** ou 🛠 **Colega de telecom**. Um toque leva a pergunta, já classificada, para o Caderno.
6. **Fontes** (título, organização, link, data de acesso).
7. Botão **"Fazer as 5 questões"**.
- Tempo de leitura estimado ≤ 8 min; com as questões, 10 a 15 min.
- Selo "Confirmar na empresa" ao lado de cada valor que varia.
- **Pronto quando:** cabe no celular sem rolagem horizontal; diagrama tem `title`/`desc`; links abrem fora do app; funciona offline.

### 4.4 Quiz da lição
- 5 questões de múltipla escolha (4 alternativas), embaralhando a ordem das alternativas.
- Depois de responder: marca certa/errada e mostra a **explicação de cada alternativa**, não só da certa.
- Resultado: aprovado com **4 de 5 (80%)**. Abaixo disso, oferece refazer a lição ou as questões.
- Toda questão errada entra na revisão espaçada.
- **Pronto quando:** dá para responder só com teclado (1–4 e Enter); leitor de tela anuncia acerto/erro.

### 4.5 Revisão espaçada
- Regra: questão errada volta em **1, 3, 7 e 15 dias**.
  - Acertou na revisão → sobe para o próximo intervalo; depois de acertar no de 15 dias, sai da fila ("dominada").
  - Errou na revisão → volta para o intervalo de 1 dia.
- Revisões vencidas acumulam (não se perdem se pular um dia). Mostra no máximo 20 por sessão, as mais atrasadas primeiro.
- Cartões (flashcards) de cada módulo também podem entrar na fila (opcional, Fase 3).
- **Pronto quando:** testes unitários cobrem os quatro intervalos, erro na revisão, atraso e mudança de fuso/data.

### 4.6 Ferramentas
Cada ferramenta tem: lógica pura em TypeScript com testes, tela com valores padrão **com fonte**, valores editáveis, botão "Restaurar padrão" e link "De onde vem esse número?".

**Regra dos valores padrão:** todo valor padrão mostra **de onde vem** (documento, item ou página, data de acesso). Quando as fontes divergem, o app mostra as duas ou separa por caso (ex.: pontos por poste: urbano 9 e rural 5 na Cemig ND-6.6, itens 5.9–5.10; Energisa NDU-009 v4.0: 4 + 1). Usar o limite da norma ou o valor **máximo** de ficha de fabricante (conservador), nunca o "típico". Faixas de prática de mercado (ex.: sinal "ideal" na ONU de −15 a −25 dBm) aparecem separadas e rotuladas como prática, não como norma. Valores da empresa, quando você os anotar no Caderno, podem virar o padrão no aparelho.

| Ferramenta | Entradas | Saída | Pronto quando |
| --- | --- | --- | --- |
| **Orçamento de potência** (PON e ponto a ponto) | Tipo (GPON B+/C+, XGS-PON N1/N2, P2P com SFP), potência de TX, sensibilidade de RX, distância, λ, atenuação/km, nº de conectores e fusões, splitters, margem | Perda total, potência que chega, margem restante, **PASSA / NÃO PASSA** e o item que mais pesa | Exemplo resolvido da lição bate com a ferramenta; testes com casos-limite (margem exatamente zero) |
| **Conversor dBm ↔ mW e splitters** | dBm ou mW; tipo e razão do splitter (1:2…1:64; desbalanceado 1/99…50/50) | Conversão; perda das pernas | Conversão exata com 2 casas; tabela de splitters tem fonte por linha |
| **Comprimento de cabo** | Vãos (lista ou nº × média), reservas técnicas (quantidade × metros), subidas/descidas, folga % | Metros totais e por item | Soma conferida em teste |
| **Código de cores** | Padrão (Brasil/ABNT — ficha Furukawa; TIA-598); fibras por tubo; nº da fibra **ou** tubo + cor | Tubo e cor (ou nº da fibra), com amostra de cor e nome por extenso | Ida e volta para 1…288 fibras nos dois padrões; **modo treino**; aviso sobre tubo piloto e direcional; não depende só da cor (texto sempre presente, para daltonismo e tela ao sol) |
| **Leitor de OTDR** | Nível (fácil/médio/difícil) | Traço SVG gerado com eventos; eu marco o tipo e a posição; correção explicada | Pelo menos 30 traços; eventos: conector, fusão, curvatura (com 1310 × 1550), quebra, ganho aparente, fim de fibra, fantasma no difícil |
| **Montador de rede PON** | OLT (potência), cabos, splitters em cascata (balanceados e desbalanceados), CTOs | Árvore em SVG com potência em cada CTO, cor verde/amarelo/vermelho por faixa | Recalcula ao vivo; exporta/importa a montagem em JSON; testes do cálculo em cascata |
| **Disponibilidade e glosa** (P1, entra na Fase 2) | % de SLA, período (mês de 30 dias, mês do calendário ou ano), paradas (lista com duração e motivo; motivos excluídos não contam), valor mensal, regra de glosa (proporcional ao tempo total, só o excesso, por faixas), teto opcional | Parada permitida, minutos que contam, disponibilidade medida, **CUMPRIU / NÃO CUMPRIU**, desconto e a memória de cálculo para copiar | Tabela 99,5/99,7/99,9% bate com `pesquisa.md` (bloco 9); exemplos das lições batem com a ferramenta; regra de glosa marcada "confirmar na empresa" |
| **Inspeção de poste** | Cenário (vários desenhos) | Eu toco nas irregularidades; correção com a regra e a fonte | Valores da norma editáveis (exemplos Cemig ND-6.6 e Energisa NDU 009 marcados como **exemplo**); funciona por teclado (lista de áreas) |

### 4.7 Campo (checklists)
- Checklists: **antes de subir no poste**, **antes da fusão**, **inspeção de CEO e CTO**, **aceite de obra**, **fiscalização de ocupação**.
- Cada item: texto curto, "por quê" expansível e fonte.
- Marcar itens, adicionar observação, ver data/hora. Histórico salvo só no aparelho; botão "Copiar como texto" para colar num relatório.
- **Modo sol:** alto contraste (preto/branco/amarelo), fonte 125–150%, botões maiores. Liga em qualquer tela pelo cabeçalho.
- Faixa de lembrete de segurança fixa.
- **Pronto quando:** funciona em modo avião desde a primeira visita; marcações sobrevivem a fechar o app; modo sol passa contraste AAA nos textos principais.

### 4.8 QGIS
- Guia passo a passo com caminhos de menu na **3.44 LTR** (principal) e na **4.2** (aba). Em 06/11/2026 a 3.44 é a LTR e a próxima LTR será a 4.4 (prevista para 03/2027); a 4.2 **não** virou LTR (ver `pesquisa.md`, bloco 8). A versão da empresa entra no Caderno e define a aba padrão.
- Dados fictícios para baixar: `postes.gpkg`, `cabos.gpkg`, `caixas.gpkg`, `ocupantes.gpkg` e versões KML, numa **área inventada** (sem infraestrutura real).
- Exercícios com resposta conferível (ex.: "quantos postes têm mais de 5 ocupantes?" → número exato).
- Aviso de SRC: SIRGAS 2000 (EPSG:4674), UTM 20N (EPSG:31974) × 20S (EPSG:31980), e o erro de 10.000 km.

### 4.9 Glossário
- Busca por sigla, nome em português e termo em inglês, sem acento.
- Cada termo: definição curta, lições onde aparece, fonte.
- **Pronto quando:** ≥ 150 termos no fim da Fase 3; sem duplicatas (validador).

### 4.10 Busca
- Uma caixa no topo que procura em lições, glossário, ferramentas, checklists e Caderno.
- Resultados agrupados por tipo, com trecho destacado.

### 4.11 Meu caderno
- Seções sugeridas: máquina de fusão, OTDR (modelo, IOR, bobina), código de cores usado, identificação/etiquetas, SRC do projeto QGIS, versão do QGIS, critérios de aceite, norma de poste, sistema de chamados, contatos (só função, sem nome se preferir).
- Texto livre e campos rápidos. Salvo **só no aparelho**.
- **Exportar/Importar** JSON para passar do PC para o celular (com aviso: "este arquivo pode conter dados da empresa; não publique").
- **Pronto quando:** importar um arquivo inválido não apaga o que existe; a importação mostra o que vai mudar antes de aplicar.

### 4.12 Plano de 90 dias
- 13 semanas com metas (lições e ferramentas), na ordem de `docs/curriculo.md` (semana 1: segurança e contratos).
- Data de início editável (padrão: o dia do primeiro uso). Em Ajustes, marcar **dias só de revisão** (ex.: noites com curso) com data de término; a tela Hoje respeita isso. Tudo salvo só no aparelho.

### 4.13 Ajustes
- Tema claro/escuro/sistema, modo sol, data de início do plano, dias só de revisão, exportar/importar **tudo** (progresso + caderno), apagar dados, sobre e licenças.

## 5. Formato do conteúdo

### 5.1 Lição (Markdown com cabeçalho YAML)

```markdown
---
id: "02-03"
modulo: "02"
titulo: "Janelas de comprimento de onda"
prioridade: P1
duracao_min: 12
objetivo: "Saber para que serve cada comprimento de onda usado na rede."
diagrama: "janelas-espectro"        # componente em src/diagramas/
fontes: ["itu-g652", "itu-gsup39", "furukawa-ficha-g652d"]
confirmar_na_empresa: false
perguntas:
  - texto: "Que fibra os nossos cabos usam?"
    onde: documentos        # sozinho | documentos | outras-areas | colega
revisado_em: "2026-11-20"
---

## Explicação
...

## Na prática
...

## Erros comuns
...

## Fontes
(gerado automaticamente a partir de `fontes`)
```

Marcações especiais no texto:
- `{{fonte:itu-g652}}` → número de rodapé com link.
- `{{confirmar}}` → selo "Confirmar na empresa".
- `{{termo:OTDR}}` → link para o glossário.

### 5.2 Questões (JSON)

```json
{
  "id": "02-03-q1",
  "licao": "02-03",
  "enunciado": "Num enlace GPON, em que comprimento de onda a OLT transmite para a ONU?",
  "alternativas": [
    { "texto": "1310 nm", "correta": false, "explicacao": "1310 nm é o sentido de subida (ONU → OLT) no GPON." },
    { "texto": "1490 nm", "correta": true,  "explicacao": "A descida do GPON usa 1490 nm (ITU-T G.984.2)." },
    { "texto": "1550 nm", "correta": false, "explicacao": "1550 nm fica para vídeo RF (overlay) no GPON." },
    { "texto": "850 nm",  "correta": false, "explicacao": "850 nm é usado em multimodo de curta distância." }
  ],
  "fontes": ["itu-g984-2"],
  "dificuldade": 1
}
```

Cada lição tem **no mínimo 5 questões** (o ideal é 8 a 10, para variar ao refazer).

### 5.3 Fontes (`content/fontes.json`)

```json
{ "id": "itu-g652", "titulo": "G.652: Characteristics of a single-mode optical fibre and cable",
  "organizacao": "ITU-T", "tipo": "norma", "url": "https://www.itu.int/rec/T-REC-G.652",
  "acessado_em": "2026-11-06", "observacao": "" }
```
`tipo`: `norma`, `regulador`, `legislacao`, `fabricante`, `associacao`, `documentacao`, `curso`, `noticia`.

### 5.4 Glossário, cartões, dados das ferramentas e checklists
- Glossário: `{ id, sigla, pt, en, definicao, fontes, licoes }`.
- Cartões: `{ id, licao, frente, verso, fontes }`.
- Dados das ferramentas (`content/dados/*.json`): cada linha de tabela tem `fonte` e, quando for o caso, `confirmar_na_empresa: true`.
- Checklists: `{ id, titulo, aviso, itens: [{ id, texto, porque, fontes }] }`.

### 5.5 Validador (`npm run validar`)
Falha o build quando:
- questão sem 4 alternativas, sem exatamente 1 correta ou com alternativa sem `explicacao`;
- explicação da correta que não começa com "Certo", ou de uma errada que começa (marca de correta trocada);
- lição com menos de 5 questões, sem `fontes`, sem alguma das seções obrigatórias ou com `{{fonte:x}}` inexistente;
- fonte sem `url` ou `acessado_em`, ou id repetido;
- termo de glossário duplicado (sigla + pt);
- diagrama citado que não existe;
- linha de tabela de ferramenta sem fonte;
- texto com palavras proibidas da lista de dados reais (nomes de unidades, por exemplo — lista local, fora do Git).

Avisa (sem falhar):
- lição com mais de 900 palavras;
- fonte acessada há mais de 12 meses;
- `--links`: confere os links (HEAD/GET) e lista os quebrados (precisa de internet; roda à parte).

## 6. Visual
- Cores: azul royal `#1F4FD8` (ação), azul-marinho `#0B1F4B` (cabeçalho e títulos), fundo `#F6F8FC`, texto `#0F172A`, sucesso `#15803D`, alerta `#B45309`, erro `#B91C1C`. Tema escuro equivalente. Todas as combinações testadas para AA.
- Tipografia do sistema (sem baixar fontes), 16 px base.
- Diagramas SVG próprios, com `currentColor` para funcionar nos dois temas; nada copiado de fabricante.
- As cores das fibras no código de cores usam amostra **e** nome escrito.

## 7. Critérios gerais de "pronto"
- `npm run validar`, `npm test`, `npm run build` e os testes Playwright passam.
- Lighthouse (celular): Desempenho ≥ 90, Acessibilidade ≥ 95, PWA instalável.
- Funciona em modo avião depois da primeira visita (teste automatizado).
- Prints em 390 px e 1440 px de cada tela nova.
- `docs/como-funciona.md` atualizado quando entra um componente novo.
- Nenhum dado real da empresa no repositório.

## 8. Prévia publicada
- Depois da aprovação da Fase 2 e da revisão técnica do conteúdo da semana 1, o app é publicado no GitHub Pages como **prévia**, com uma faixa fixa "Conteúdo em revisão" em todas as telas.
- A faixa sai só quando o conteúdo publicado tiver passado pela revisão técnica (Fase 4) e você aprovar.
