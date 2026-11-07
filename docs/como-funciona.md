# Como funciona o Fibra em Campo

> Para quem está começando em React. Leia de cima para baixo: cada seção usa o que a anterior explicou.

## 1. A ideia geral em uma figura

```
content/ (Markdown + JSON)          você escreve o conteúdo aqui
   │
   │  npm run validar   → confere fontes, questões, seções (barra erros)
   │  npm run conteudo  → transforma em JSON pronto (src/gerado/)
   ▼
src/ (React + TypeScript)           o app lê o JSON e desenha as telas
   │
   │  npm run build     → Vite junta tudo em dist/ + service worker (offline)
   ▼
dist/  → GitHub Pages               o celular baixa uma vez e guarda tudo
```

Não existe servidor. Tudo o que o usuário faz (progresso, revisão, caderno) fica no **localStorage** do próprio aparelho.

## 2. As pastas

| Pasta | O que tem |
| --- | --- |
| `content/` | Conteúdo: `licoes/*.md`, `questoes/*.json`, `glossario.json`, `fontes.json`, `curriculo.json`, `plano.json` |
| `scripts/` | Programas Node que rodam no seu PC: validar e compilar o conteúdo, gerar ícones |
| `src/dominio/` | **Regras puras** em TypeScript, sem React: revisão espaçada, datas, armazenamento, busca, plano. Fáceis de testar |
| `src/ferramentas/` | Cada ferramenta: a conta (`calculo.ts`) separada da tela (`Tela*.tsx`) |
| `src/conteudo/` | Tipos do conteúdo e funções para carregar o JSON gerado |
| `src/app/` | O "esqueleto": rotas, layout (cabeçalho e menu), estado global |
| `src/telas/` | Uma tela por arquivo: Hoje, Trilha, Lição, Revisão, Glossário… |
| `src/componentes/` | Peças reaproveitadas: cartão de questão, ícones, importar/exportar |
| `src/diagramas/` | Desenhos SVG próprios, um componente por diagrama |
| `tests/e2e/` | Testes que abrem o app num navegador de verdade (Playwright) |

Regra que vale a pena copiar em qualquer projeto: **lógica fora da tela**. `src/dominio/revisao.ts` não sabe o que é React; a tela só chama as funções. Por isso dá para testar a revisão espaçada em milissegundos (`revisao.test.ts`).

## 3. React em 5 conceitos (com exemplos daqui)

**Componente** é uma função que devolve o que aparece na tela (JSX, que parece HTML):

```tsx
export function SeloConfirmar() {
  return <span className="selo-confirmar">Confirmar na empresa</span>;
}
```

**Props** são os parâmetros de um componente. `QuestaoCard` recebe a questão e o que fazer quando a pessoa responde:

```tsx
<QuestaoCard questao={q} numero={1} total={5} onResponder={(acertou) => ...} onProxima={...} rotuloProxima="Próxima" />
```

**Estado (`useState`)** é uma memória do componente que, quando muda, faz a tela redesenhar. Em `QuestaoCard`, `escolhida` guarda a alternativa marcada:

```tsx
const [escolhida, setEscolhida] = useState<number | null>(null);
```

**Efeito (`useEffect`)** é código que roda *depois* de desenhar, para falar com o "mundo de fora" (localStorage, título da aba, foco). Em `EstadoApp.tsx`, toda mudança de estado é gravada no aparelho:

```tsx
useEffect(() => { salvar(estado); }, [estado]);
```

**`key`** diz ao React se um componente é "o mesmo" ou "outro". Nas questões usamos `key={q.id}`: ao trocar de questão o React cria um cartão novo, com a resposta zerada. (Antes, um efeito zerava a resposta e um clique rápido podia ser perdido; o teste de ponta a ponta pegou esse erro.)

## 4. Estado global: `useReducer` + Context

Progresso, revisão, caderno e ajustes são usados em várias telas. Em vez de passar props por todo lado, `src/app/EstadoApp.tsx` cria um **Context** (uma "caixa" acessível de qualquer tela) com um **reducer**:

- O reducer é uma função `reduzir(estado, acao) → novoEstado`. Cada mudança tem um nome (`quizConcluido`, `campoCaderno`…). Isso deixa claro *o que* pode mudar e facilita testar.
- Qualquer tela faz `const { estado, despachar } = useEstado();` e chama `despachar({ tipo: 'quizConcluido', ... })`.

Não usamos biblioteca de estado (Redux, Zustand): para este tamanho, o React sozinho resolve.

## 5. Rotas: `HashRouter`

Os endereços ficam como `.../Telecom.estudos/#/licao/09-01`. Tudo depois do `#` é tratado pelo navegador, não pelo servidor. Como o GitHub Pages só entrega arquivos, isso garante que qualquer link abra o `index.html`. As rotas estão em `src/app/App.tsx`.

## 6. Conteúdo: do Markdown à tela

1. A lição é um `.md` com um cabeçalho YAML (id, título, fontes, perguntas "pergunte na empresa") e três seções fixas: `## Explicação`, `## Na prática`, `## Erros comuns`.
2. Marcações especiais: `{{fonte:id}}` vira o número da fonte; `{{confirmar}}` vira o selo "Confirmar na empresa"; `{{termo:id|texto}}` vira link para o glossário; `{{diagrama}}` marca onde entra o SVG.
3. `scripts/compilar-conteudo.mjs` transforma tudo em HTML **no seu PC**, antes de publicar. O celular não precisa interpretar Markdown (mais leve).
4. `scripts/validar-conteudo.mjs` barra o build se faltar fonte, explicação de alternativa, seção, diagrama etc. Para conferir os links das fontes (precisa de internet): `npm run validar:links`.

Cada módulo vira um arquivo separado (`src/gerado/modulos/09.json`). O Vite só baixa o módulo quando a pessoa abre uma lição dele (`import.meta.glob` em `src/conteudo/carregar.ts`).

## 7. Revisão espaçada

`src/dominio/revisao.ts`:

- Errou → a questão vence amanhã (etapa 0).
- Acertou na revisão → sobe de etapa: volta em 3, depois 7, depois 15 dias.
- Acertou na etapa de 15 dias → "dominada", sai da fila.
- Errou na revisão → volta para amanhã.

Datas são guardadas como texto `"AAAA-MM-DD"` no fuso do aparelho (`datas.ts`), para "hoje" ser o dia do calendário de quem usa, sem confusão de fuso.

## 8. Funcionar sem internet (PWA)

`vite-plugin-pwa` gera um **service worker** (`sw.js`): um programa que o navegador instala e que guarda uma cópia de todos os arquivos do app (inclusive o conteúdo de todos os módulos). Na segunda visita, mesmo em modo avião, tudo abre. Quando sai versão nova, aparece "Nova versão disponível" (`AvisoAtualizacao.tsx`).

## 9. Guardar no aparelho com segurança

`src/dominio/armazenamento.ts`:

- Todo acesso ao `localStorage` está dentro de `try/catch`. Se o navegador bloquear (modo privado), o app funciona e avisa.
- Ao ler, `normalizarEstado` aceita dados antigos ou estragados sem quebrar.
- Exportar gera um `.json`; importar **mostra o que vai mudar antes** e **nunca apaga** o que já existe (mescla).

## 10. Testes

| Comando | O que roda |
| --- | --- |
| `npm test` | Vitest: regras puras (revisão, calculadora, armazenamento, busca, plano), o cartão de questão e o validador de conteúdo |
| `npm run test:e2e` | Playwright: abre o app compilado no Chromium, faz uma lição inteira, revisão, calculadora, caderno, modo offline, e roda o axe (acessibilidade) nos temas claro, escuro e sol |
| `npm run verificar` | Tudo acima, na ordem |

## 11. Como rodar no seu PC

```bash
npm install
npm run dev        # abre em http://localhost:5173/Telecom.estudos/
npm run verificar  # build + todos os testes
```

## 12. Como acrescentar uma lição

1. Crie `content/licoes/02-01.md` copiando uma lição pronta (o id precisa existir em `content/curriculo.json`).
2. Crie `content/questoes/02-01.json` com pelo menos 5 questões (4 alternativas, 1 certa, explicação em todas, fonte em todas).
3. Toda fonte nova entra em `content/fontes.json` com URL e data de acesso.
4. Se a lição tiver um diagrama novo, crie o componente em `src/diagramas/` e registre em `src/diagramas/index.ts`.
5. `npm run validar` até dar 0 erro. Depois `npm run dev` para ver.
