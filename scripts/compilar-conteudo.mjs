// Compila content/ para src/gerado/:
//  - indice.json: currículo, plano, glossário, fontes, checklists e índice de busca (carregado na abertura)
//  - modulos/<id>.json: lições e questões de cada módulo (carregado só quando precisa)
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import {
  RAIZ,
  lerFontes,
  lerGlossario,
  lerCurriculo,
  lerPlano,
  lerChecklists,
  lerPerguntasEmpresa,
  gerarDocPerguntas,
  lerLicoes,
  lerQuestoes,
  compilarLicao,
  htmlParaTexto,
} from './lib/conteudo.mjs';

const SAIDA = join(RAIZ, 'src', 'gerado');
rmSync(SAIDA, { recursive: true, force: true });
mkdirSync(join(SAIDA, 'modulos'), { recursive: true });

const fontes = lerFontes();
const fontesPorId = new Map(fontes.map((f) => [f.id, f]));
const glossario = lerGlossario();
const glossarioPorId = new Map(glossario.map((t) => [t.id, t]));
const curriculo = lerCurriculo();
const plano = lerPlano();
const checklists = lerChecklists();
const perguntasEmpresa = lerPerguntasEmpresa();
const perguntasPorId = new Map(perguntasEmpresa.map((p) => [p.id, p]));

// O documento de perguntas é gerado do mesmo banco que o app usa.
writeFileSync(join(RAIZ, 'docs', 'perguntas-para-a-empresa.md'), gerarDocPerguntas(perguntasEmpresa));

const licoes = lerLicoes().map((l) => compilarLicao(l, fontesPorId, glossarioPorId, perguntasPorId));
const disponiveis = new Set(licoes.map((l) => l.id));

// Lições e questões agrupadas por módulo.
const porModulo = new Map();
for (const licao of licoes) {
  const questoes = lerQuestoes(licao.id) ?? [];
  if (!porModulo.has(licao.modulo)) porModulo.set(licao.modulo, { licoes: {}, questoes: {} });
  const m = porModulo.get(licao.modulo);
  m.licoes[licao.id] = licao;
  for (const q of questoes) m.questoes[q.id] = q;
}
for (const [id, dados] of porModulo) {
  writeFileSync(join(SAIDA, 'modulos', `${id}.json`), JSON.stringify(dados));
}

// Índice de busca: lições, termos do glossário, ferramentas e checklists.
const busca = [
  ...licoes.map((l) => ({
    tipo: 'licao',
    id: l.id,
    titulo: `${l.id} · ${l.titulo}`,
    texto: [l.objetivo, htmlParaTexto(l.explicacaoAntes + l.explicacaoDepois), htmlParaTexto(l.naPratica), htmlParaTexto(l.errosComuns)].join(' '),
    rota: `/licao/${l.id}`,
  })),
  ...glossario.map((t) => ({
    tipo: 'termo',
    id: t.id,
    titulo: [t.sigla, t.pt].filter(Boolean).join(' — '),
    texto: [t.en, t.definicao].filter(Boolean).join(' '),
    rota: `/glossario?t=${encodeURIComponent(t.id)}`,
  })),
  {
    tipo: 'ferramenta',
    id: 'disponibilidade',
    titulo: 'Disponibilidade e glosa de SLA',
    texto: 'calculadora SLA disponibilidade minutos parados glosa desconto contrato link 99,7 99,5 99,9 indisponibilidade',
    rota: '/ferramentas/disponibilidade',
  },
  {
    tipo: 'ferramenta',
    id: 'orcamento',
    titulo: 'Orçamento de potência',
    texto: 'power budget link budget PON GPON XGS-PON ponto a ponto SFP LX BX ZX sensibilidade sobrecarga splitter perda fibra conector fusão margem dBm',
    rota: '/ferramentas/orcamento',
  },
  {
    tipo: 'ferramenta',
    id: 'cores',
    titulo: 'Código de cores',
    texto: 'cor fibra tubo loose ABNT Furukawa TIA-598 piloto direcional verde amarela branca azul número da fibra',
    rota: '/ferramentas/cores',
  },
  {
    tipo: 'ferramenta',
    id: 'conversor',
    titulo: 'dBm ↔ mW e splitters',
    texto: 'conversor dBm mW microwatt potência splitter balanceado desbalanceado PLC FBT 1:8 1:16 10/90 perda',
    rota: '/ferramentas/conversor',
  },
  ...checklists.map((c) => ({
    tipo: 'checklist',
    id: c.id,
    titulo: c.titulo,
    texto: c.itens.map((i) => i.texto).join(' '),
    rota: `/campo/${c.id}`,
  })),
];

// Marca no currículo quais lições já têm conteúdo.
const curriculoMarcado = {
  modulos: curriculo.modulos.map((m) => ({
    ...m,
    licoes: m.licoes.map((l) => ({ ...l, disponivel: disponiveis.has(l.id) })),
  })),
};

const indice = { geradoEm: new Date().toISOString(), curriculo: curriculoMarcado, plano, glossario, fontes, checklists, perguntasEmpresa, busca };
writeFileSync(join(SAIDA, 'indice.json'), JSON.stringify(indice));

console.log(
  `Conteúdo compilado: ${licoes.length} lições em ${porModulo.size} módulos, ${glossario.length} termos, ${fontes.length} fontes, ${checklists.length} checklists.`,
);
