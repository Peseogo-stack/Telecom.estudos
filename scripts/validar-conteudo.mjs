// Valida todo o conteúdo. Falha (código 1) se houver erro; mostra avisos sem falhar.
// Uso: node scripts/validar-conteudo.mjs            (rápido, sem internet)
//      node scripts/validar-conteudo.mjs --links    (também confere se os links das fontes respondem)
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  RAIZ,
  PASTA_CONTEUDO,
  SECOES,
  FERRAMENTAS,
  ONDE,
  lerFontes,
  lerGlossario,
  lerCurriculo,
  lerPlano,
  lerLicoes,
  lerQuestoes,
  lerPerguntasEmpresa,
  gerarDocPerguntas,
  dividirSecoes,
  marcacoes,
  compilarLicao,
  htmlParaTexto,
  contarPalavras,
} from './lib/conteudo.mjs';

export function validar({ hoje = new Date() } = {}) {
  const erros = [];
  const avisos = [];
  const erro = (onde, msg) => erros.push(`${onde}: ${msg}`);
  const aviso = (onde, msg) => avisos.push(`${onde}: ${msg}`);

  // ---- Fontes ----
  const fontes = lerFontes();
  const fontesPorId = new Map();
  const TIPOS = ['norma', 'regulador', 'legislacao', 'fabricante', 'associacao', 'documentacao', 'curso', 'noticia'];
  for (const f of fontes) {
    const onde = `fontes.json[${f.id ?? '?'}]`;
    if (!f.id) erro(onde, 'fonte sem id');
    if (fontesPorId.has(f.id)) erro(onde, 'id repetido');
    fontesPorId.set(f.id, f);
    if (!f.titulo) erro(onde, 'sem título');
    if (!f.organizacao) erro(onde, 'sem organização');
    if (!/^https?:\/\//.test(f.url ?? '')) erro(onde, 'sem URL válida');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(f.acessadoEm ?? '')) erro(onde, 'sem data de acesso (AAAA-MM-DD)');
    if (!TIPOS.includes(f.tipo)) erro(onde, `tipo inválido "${f.tipo}"`);
    if (f.acessadoEm) {
      const dias = (hoje - new Date(f.acessadoEm)) / 86_400_000;
      if (dias > 365) aviso(onde, `acessada há mais de 12 meses (${f.acessadoEm})`);
    }
  }

  // ---- Glossário ----
  const glossario = lerGlossario();
  const glossarioPorId = new Map();
  const chaves = new Set();
  for (const t of glossario) {
    const onde = `glossario.json[${t.id ?? '?'}]`;
    if (!t.id) erro(onde, 'termo sem id');
    if (glossarioPorId.has(t.id)) erro(onde, 'id repetido');
    glossarioPorId.set(t.id, t);
    if (!t.pt) erro(onde, 'sem nome em português');
    if (!t.definicao) erro(onde, 'sem definição');
    const chave = `${(t.sigla ?? '').toLowerCase()}|${t.pt?.toLowerCase()}`;
    if (chaves.has(chave)) erro(onde, 'termo duplicado (mesma sigla e nome)');
    chaves.add(chave);
    if (!Array.isArray(t.fontes) || t.fontes.length === 0) erro(onde, 'sem fonte');
    for (const id of t.fontes ?? []) if (!fontesPorId.has(id)) erro(onde, `fonte inexistente "${id}"`);
  }

  // ---- Currículo e plano ----
  const curriculo = lerCurriculo();
  const idsCurriculo = new Set(curriculo.modulos.flatMap((m) => m.licoes.map((l) => l.id)));
  // Os textos do currículo aparecem sem passar pelo Markdown: asterisco ou crase sairiam literais na tela.
  for (const m of curriculo.modulos) {
    for (const [campo, texto] of Object.entries(m)) if (typeof texto === 'string' && /[*`]/.test(texto)) erro(`curriculo.json[${m.id}]`, `${campo} com Markdown (*, \`): o texto aparece sem formatação`);
    for (const l of m.licoes)
      for (const [campo, texto] of Object.entries(l)) if (typeof texto === 'string' && /[*`]/.test(texto)) erro(`curriculo.json[${l.id}]`, `${campo} com Markdown (*, \`): o texto aparece sem formatação`);
  }
  const plano = lerPlano();
  const noPlano = plano.semanas.flatMap((s) => s.licoes);
  for (const id of noPlano) if (!idsCurriculo.has(id)) erro('plano.json', `lição ${id} não existe no currículo`);
  if (new Set(noPlano).size !== noPlano.length) erro('plano.json', 'lição repetida no plano');
  for (const id of idsCurriculo) if (!noPlano.includes(id)) erro('plano.json', `lição ${id} fora do plano`);

  // ---- Banco de perguntas para a empresa ----
  const perguntasEmpresa = lerPerguntasEmpresa();
  const perguntasPorId = new Map();
  const LETRA = { sozinho: 'a', documentos: 'b', 'outras-areas': 'c', colega: 'd' };
  for (const p of perguntasEmpresa) {
    const onde = `perguntas-empresa.json[${p.id ?? '?'}]`;
    if (!p.id) erro(onde, 'pergunta sem id');
    if (perguntasPorId.has(p.id)) erro(onde, 'id repetido');
    perguntasPorId.set(p.id, p);
    if (!ONDE.includes(p.onde)) erro(onde, `"onde" inválido: ${p.onde}`);
    else if (!p.id?.startsWith(LETRA[p.onde])) erro(onde, `o id deve começar com "${LETRA[p.onde]}" (categoria ${p.onde})`);
    if (!p.texto) erro(onde, 'sem texto');
    if (p.onde !== 'colega' && !p.dica) erro(onde, 'sem dica de onde achar');
    if (!Array.isArray(p.licoes) || p.licoes.length === 0) erro(onde, 'sem lição ligada');
    for (const l of p.licoes ?? []) if (!idsCurriculo.has(l)) erro(onde, `lição ${l} não existe no currículo`);
  }
  const caminhoDoc = join(RAIZ, 'docs', 'perguntas-para-a-empresa.md');
  if (!existsSync(caminhoDoc) || readFileSync(caminhoDoc, 'utf-8') !== gerarDocPerguntas(perguntasEmpresa)) {
    erro('docs/perguntas-para-a-empresa.md', 'desatualizado em relação a content/perguntas-empresa.json (rode npm run conteudo)');
  }

  // ---- Diagramas disponíveis no código ----
  const pastaDiagramas = join(RAIZ, 'src', 'diagramas');
  const indiceDiagramas = existsSync(join(pastaDiagramas, 'index.ts'))
    ? readFileSync(join(pastaDiagramas, 'index.ts'), 'utf-8')
    : '';

  // ---- Lições ----
  const licoes = lerLicoes();
  const idsLicoes = new Set();
  for (const licao of licoes) {
    const { meta, corpo, arquivo } = licao;
    const onde = `licoes/${arquivo}`;
    const id = String(meta.id ?? '');
    if (!id) {
      erro(onde, 'sem id no cabeçalho');
      continue;
    }
    if (`${id}.md` !== arquivo) erro(onde, `o nome do arquivo deve ser ${id}.md`);
    if (idsLicoes.has(id)) erro(onde, 'id repetido');
    idsLicoes.add(id);
    if (!idsCurriculo.has(id)) erro(onde, 'lição não está no currículo');
    for (const campo of ['modulo', 'titulo', 'prioridade', 'duracao_min', 'objetivo', 'revisado_em']) {
      if (meta[campo] === undefined || meta[campo] === '') erro(onde, `cabeçalho sem "${campo}"`);
    }
    if (meta.duracao_min && (meta.duracao_min < 10 || meta.duracao_min > 15)) erro(onde, 'duração fora de 10 a 15 min');
    if (!Array.isArray(meta.fontes) || meta.fontes.length === 0) erro(onde, 'lição sem fontes');
    for (const f of meta.fontes ?? []) if (!fontesPorId.has(f)) erro(onde, `fonte inexistente "${f}"`);
    if (!meta.diagrama) erro(onde, 'lição sem diagrama');
    else {
      if (!indiceDiagramas.includes(`'${meta.diagrama}'`)) erro(onde, `diagrama "${meta.diagrama}" não existe em src/diagramas/index.ts`);
      if (!meta.diagrama_descricao) erro(onde, 'diagrama sem descrição (texto alternativo)');
    }
    const perguntas = meta.perguntas ?? [];
    if (perguntas.length === 0) erro(onde, 'sem "Pergunte na empresa" (campo perguntas, com ids de content/perguntas-empresa.json)');
    for (const idP of perguntas) {
      const p = perguntasPorId.get(idP);
      if (!p) erro(onde, `pergunta "${idP}" não existe em content/perguntas-empresa.json`);
      else if (!p.licoes.includes(id)) erro(onde, `a pergunta ${idP} não lista a lição ${id} no banco`);
    }

    const secoes = dividirSecoes(corpo);
    for (const titulo of Object.keys(SECOES)) {
      if (!secoes[titulo]?.trim()) erro(onde, `falta a seção "## ${titulo}"`);
    }
    for (const titulo of Object.keys(secoes)) {
      if (titulo !== '__antes__' && !(titulo in SECOES)) erro(onde, `seção desconhecida "## ${titulo}"`);
    }
    if (secoes['__antes__']) erro(onde, 'texto antes da primeira seção');

    const usadas = new Set();
    for (const m of marcacoes(corpo)) {
      if (m.tipo === 'fonte') {
        if (!(meta.fontes ?? []).includes(m.id)) erro(onde, `{{fonte:${m.id}}} não está na lista "fontes" do cabeçalho`);
        usadas.add(m.id);
      } else if (m.tipo === 'termo') {
        if (!glossarioPorId.has(m.id)) erro(onde, `{{termo:${m.id}}} não existe no glossário`);
      } else if (m.tipo === 'ferramenta') {
        if (!FERRAMENTAS.includes(m.id)) erro(onde, `{{ferramenta:${m.id}}} não é uma ferramenta do app (${FERRAMENTAS.join(', ')})`);
        if (!m.rotulo) erro(onde, `${m.bruto} precisa de texto: {{ferramenta:${m.id}|Nome da ferramenta}}`);
      } else if (!['confirmar', 'diagrama'].includes(m.tipo)) {
        erro(onde, `marcação desconhecida ${m.bruto}`);
      }
    }
    for (const f of meta.fontes ?? []) if (!usadas.has(f)) aviso(onde, `fonte "${f}" listada mas não citada no texto`);
    if (meta.confirmar_na_empresa && !corpo.includes('{{confirmar}}')) aviso(onde, 'marcada como "confirmar na empresa" mas sem selo {{confirmar}} no texto');

    const compilada = compilarLicao(licao, fontesPorId, glossarioPorId, perguntasPorId);
    const palavras = contarPalavras(
      htmlParaTexto(compilada.explicacaoAntes + compilada.explicacaoDepois + compilada.naPratica + compilada.errosComuns),
    );
    if (palavras > 900) aviso(onde, `${palavras} palavras (o ideal é até 900 para caber em 10–15 min)`);

    // ---- Questões da lição ----
    const questoes = lerQuestoes(id);
    if (!questoes) {
      erro(onde, `falta content/questoes/${id}.json`);
      continue;
    }
    if (questoes.length < 5) erro(`questoes/${id}.json`, `só ${questoes.length} questões (mínimo 5)`);
    const idsQ = new Set();
    for (const q of questoes) {
      const ondeQ = `questoes/${id}.json[${q.id ?? '?'}]`;
      if (!q.id?.startsWith(`${id}-q`)) erro(ondeQ, `id deve começar com "${id}-q"`);
      if (idsQ.has(q.id)) erro(ondeQ, 'id repetido');
      idsQ.add(q.id);
      if (q.licao !== id) erro(ondeQ, `campo "licao" deve ser "${id}"`);
      if (!q.enunciado) erro(ondeQ, 'sem enunciado');
      if (!Array.isArray(q.alternativas) || q.alternativas.length !== 4) erro(ondeQ, 'precisa de exatamente 4 alternativas');
      const certas = (q.alternativas ?? []).filter((a) => a.correta === true).length;
      if (certas !== 1) erro(ondeQ, `precisa de exatamente 1 alternativa correta (tem ${certas})`);
      (q.alternativas ?? []).forEach((a, i) => {
        if (!a.texto) erro(ondeQ, `alternativa ${i + 1} sem texto`);
        if (!a.explicacao || a.explicacao.length < 10) erro(ondeQ, `alternativa ${i + 1} sem explicação`);
      });
      const textos = (q.alternativas ?? []).map((a) => a.texto);
      if (new Set(textos).size !== textos.length) erro(ondeQ, 'alternativas repetidas');
      if (!Array.isArray(q.fontes) || q.fontes.length === 0) erro(ondeQ, 'questão sem fonte');
      for (const f of q.fontes ?? []) if (!fontesPorId.has(f)) erro(ondeQ, `fonte inexistente "${f}"`);
      if (![1, 2, 3].includes(q.dificuldade)) erro(ondeQ, 'dificuldade deve ser 1, 2 ou 3');
    }
  }

  // Questões sem lição
  const pastaQ = join(PASTA_CONTEUDO, 'questoes');
  if (existsSync(pastaQ)) {
    for (const f of readdirSync(pastaQ)) {
      const id = f.replace('.json', '');
      if (!idsLicoes.has(id)) erro(`questoes/${f}`, 'não há lição com esse id');
    }
  }

  // Termos citados nas lições que apontam para lições inexistentes
  for (const t of glossario) {
    for (const l of t.licoes ?? []) if (!idsCurriculo.has(l)) erro(`glossario.json[${t.id}]`, `lição ${l} não existe`);
  }

  // ---- Checklists ----
  const pastaChecklists = join(PASTA_CONTEUDO, 'checklists');
  if (existsSync(pastaChecklists)) {
    const arquivosC = readdirSync(pastaChecklists).filter((f) => f.endsWith('.json'));
    for (const f of arquivosC) {
      const ondeC = `checklists/${f}`;
      let c;
      try {
        c = JSON.parse(readFileSync(join(pastaChecklists, f), 'utf-8'));
      } catch (e) {
        erro(ondeC, `JSON inválido: ${e.message}`);
        continue;
      }
      if (!c.id) erro(ondeC, 'sem id');
      if (`${c.id}.json` !== f) erro(ondeC, `o nome do arquivo deve ser ${c.id}.json`);
      if (!c.titulo) erro(ondeC, 'sem título');
      if (!c.aviso) erro(ondeC, 'sem aviso de segurança/procedimento');
      if (!Array.isArray(c.itens) || c.itens.length < 5) erro(ondeC, 'deve ter pelo menos 5 itens');
      const idsItens = new Set();
      for (const item of c.itens ?? []) {
        if (!item.id) erro(ondeC, 'item sem id');
        if (idsItens.has(item.id)) erro(ondeC, `item com id repetido "${item.id}"`);
        idsItens.add(item.id);
        if (!item.texto?.trim()) erro(ondeC, `item ${item.id} sem texto`);
        if (!item.porque?.trim()) erro(ondeC, `item ${item.id} sem "porque"`);
        if (!Array.isArray(item.fontes) || item.fontes.length === 0) erro(ondeC, `item ${item.id} sem fontes`);
        for (const fo of item.fontes ?? []) {
          if (!fontesPorId.has(fo)) erro(ondeC, `item ${item.id} cita fonte inexistente "${fo}"`);
        }
      }
    }
  }

  // Lista local de palavras proibidas (dados reais). Fica fora do Git: .palavras-proibidas.txt
  const arquivoProibidas = join(RAIZ, '.palavras-proibidas.txt');
  if (existsSync(arquivoProibidas)) {
    const proibidas = readFileSync(arquivoProibidas, 'utf-8')
      .split('\n')
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s && !s.startsWith('#'));
    const tudo = [
      ...licoes.map((l) => [`licoes/${l.arquivo}`, JSON.stringify(l.meta) + l.corpo]),
      ['glossario.json', JSON.stringify(glossario)],
      ['fontes.json', JSON.stringify(fontes)],
    ];
    if (existsSync(pastaQ)) for (const f of readdirSync(pastaQ)) tudo.push([`questoes/${f}`, readFileSync(join(pastaQ, f), 'utf-8')]);
    if (existsSync(pastaChecklists)) for (const f of readdirSync(pastaChecklists)) tudo.push([`checklists/${f}`, readFileSync(join(pastaChecklists, f), 'utf-8')]);
    for (const [onde, texto] of tudo) {
      const baixo = texto.toLowerCase();
      for (const p of proibidas) if (baixo.includes(p)) erro(onde, `contém palavra da lista de dados reais: "${p}"`);
    }
  }

  return { erros, avisos, fontes };
}

async function conferirLinks(fontes) {
  const quebrados = [];
  for (const f of fontes) {
    try {
      const r = await fetch(f.url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(20_000) });
      if (r.status >= 400) quebrados.push(`${f.id}: HTTP ${r.status} — ${f.url}`);
    } catch (e) {
      quebrados.push(`${f.id}: ${e.name} — ${f.url}`);
    }
  }
  return quebrados;
}

const rodandoDireto = process.argv[1]?.endsWith('validar-conteudo.mjs');
if (rodandoDireto) {
  const { erros, avisos, fontes } = validar();
  for (const a of avisos) console.log(`AVISO  ${a}`);
  for (const e of erros) console.log(`ERRO   ${e}`);
  if (process.argv.includes('--links')) {
    console.log('Conferindo links (precisa de internet)...');
    const quebrados = await conferirLinks(fontes);
    for (const q of quebrados) console.log(`LINK   ${q}`);
    console.log(`${fontes.length - quebrados.length}/${fontes.length} links responderam.`);
  }
  console.log(`\nValidação: ${erros.length} erro(s), ${avisos.length} aviso(s).`);
  process.exit(erros.length ? 1 : 0);
}
