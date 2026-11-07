// Leitura e compilação do conteúdo (lições em Markdown, questões e glossário em JSON).
// Usado por scripts/compilar-conteudo.mjs e scripts/validar-conteudo.mjs.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

export const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const PASTA_CONTEUDO = join(RAIZ, 'content');

/** Seções obrigatórias de toda lição, na ordem em que aparecem. */
export const SECOES = {
  'Explicação': 'explicacao',
  'Na prática': 'naPratica',
  'Erros comuns': 'errosComuns',
};

/** Onde achar a resposta de uma pergunta "Pergunte na empresa". */
export const ONDE = ['sozinho', 'documentos', 'outras-areas', 'colega'];

export function lerJson(caminho) {
  return JSON.parse(readFileSync(join(PASTA_CONTEUDO, caminho), 'utf-8'));
}

export function lerFontes() {
  return lerJson('fontes.json');
}
export function lerGlossario() {
  return lerJson('glossario.json');
}
export function lerCurriculo() {
  return lerJson('curriculo.json');
}
export function lerPlano() {
  return lerJson('plano.json');
}
export function lerChecklists() {
  const pasta = join(PASTA_CONTEUDO, 'checklists');
  if (!existsSync(pasta)) return [];
  return readdirSync(pasta)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(pasta, f), 'utf-8')));
}

/** Lê todos os arquivos .md de content/licoes e separa cabeçalho (YAML) e corpo. */
export function lerLicoes() {
  const pasta = join(PASTA_CONTEUDO, 'licoes');
  if (!existsSync(pasta)) return [];
  return readdirSync(pasta)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((arquivo) => {
      const bruto = readFileSync(join(pasta, arquivo), 'utf-8');
      const { data, content } = matter(bruto);
      return { arquivo, meta: data, corpo: content };
    });
}

/** Lê content/questoes/<id>.json (lista de questões da lição). */
export function lerQuestoes(idLicao) {
  const caminho = join(PASTA_CONTEUDO, 'questoes', `${idLicao}.json`);
  if (!existsSync(caminho)) return null;
  return JSON.parse(readFileSync(caminho, 'utf-8'));
}

/** Divide o corpo em seções "## Título". Retorna { titulo: textoMarkdown }. */
export function dividirSecoes(corpo) {
  const secoes = {};
  const partes = corpo.split(/^## +(.+)$/m);
  // partes = [antes, titulo1, texto1, titulo2, texto2, ...]
  if (partes[0].trim()) secoes['__antes__'] = partes[0];
  for (let i = 1; i < partes.length; i += 2) {
    secoes[partes[i].trim()] = partes[i + 1] ?? '';
  }
  return secoes;
}

/** Encontra as marcações especiais {{...}} de um texto. */
export function marcacoes(texto) {
  return [...texto.matchAll(/\{\{([a-z]+)(?::([^}|]+))?(?:\|([^}]+))?\}\}/g)].map((m) => ({
    tipo: m[1],
    id: m[2],
    rotulo: m[3],
    bruto: m[0],
  }));
}

function escaparHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Converte o Markdown de uma seção em HTML, trocando as marcações:
 *  {{fonte:id}}        -> número da fonte, na ordem do cabeçalho "fontes"
 *  {{confirmar}}       -> selo "Confirmar na empresa"
 *  {{termo:id|texto}}  -> link para o glossário
 *  {{diagrama}}        -> ponto onde entra o diagrama SVG
 */
export function markdownParaHtml(md, ordemFontes, glossarioPorId) {
  const comMarcas = md.replace(/\{\{([a-z]+)(?::([^}|]+))?(?:\|([^}]+))?\}\}/g, (bruto, tipo, id, rotulo) => {
    if (tipo === 'fonte') {
      const n = ordemFontes.indexOf(id) + 1;
      return `<sup class="ref" title="Fonte ${n}">[${n}]</sup>`;
    }
    if (tipo === 'confirmar') return '<span class="selo-confirmar">Confirmar na empresa</span>';
    if (tipo === 'termo') {
      const termo = glossarioPorId.get(id);
      const texto = rotulo ?? termo?.sigla ?? termo?.pt ?? id;
      return `<a class="termo" href="#/glossario?t=${encodeURIComponent(id)}">${escaparHtml(texto)}</a>`;
    }
    if (tipo === 'diagrama') return '\n\n<div data-diagrama></div>\n\n';
    return bruto;
  });
  let html = marked.parse(comMarcas, { async: false, gfm: true });
  // Tabelas rolam dentro de uma caixa, para a página não rolar para o lado no celular.
  html = html.replace(/<table>/g, '<div class="tabela" tabindex="0"><table>').replace(/<\/table>/g, '</table></div>');
  // Links externos abrem fora do app.
  html = html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
  return html;
}

export function htmlParaTexto(html) {
  return html
    .replace(/<sup class="ref"[^>]*>.*?<\/sup>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function contarPalavras(texto) {
  return texto.split(/\s+/).filter(Boolean).length;
}

/** Compila uma lição: HTML de cada seção, diagrama, perguntas e fontes resolvidas. */
export function compilarLicao({ meta, corpo }, fontesPorId, glossarioPorId) {
  const ordem = meta.fontes ?? [];
  const secoes = dividirSecoes(corpo);
  const html = {};
  for (const [titulo, chave] of Object.entries(SECOES)) {
    html[chave] = markdownParaHtml(secoes[titulo] ?? '', ordem, glossarioPorId);
  }
  // Explicação: o diagrama entra onde estiver {{diagrama}} (ou no começo).
  const [antes, depois] = html.explicacao.includes('<div data-diagrama></div>')
    ? html.explicacao.split('<div data-diagrama></div>')
    : ['', html.explicacao];
  return {
    id: String(meta.id),
    modulo: String(meta.modulo),
    titulo: meta.titulo,
    prioridade: meta.prioridade,
    duracaoMin: meta.duracao_min,
    objetivo: meta.objetivo,
    diagrama: meta.diagrama ?? null,
    diagramaDescricao: meta.diagrama_descricao ?? '',
    seguranca: Boolean(meta.seguranca),
    confirmarNaEmpresa: Boolean(meta.confirmar_na_empresa),
    revisadoEm: meta.revisado_em ?? null,
    explicacaoAntes: antes,
    explicacaoDepois: depois,
    naPratica: html.naPratica,
    errosComuns: html.errosComuns,
    perguntas: (meta.perguntas ?? []).map((p, i) => ({ id: `${meta.id}-p${i + 1}`, texto: p.texto, onde: p.onde })),
    fontes: ordem.map((id) => fontesPorId.get(id)).filter(Boolean),
  };
}
