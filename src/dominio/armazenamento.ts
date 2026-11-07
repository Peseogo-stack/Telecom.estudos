// Guarda o estado no localStorage do aparelho, com try/catch em toda leitura e escrita.
// Se o navegador bloquear o armazenamento (modo privado, por exemplo), o app continua funcionando
// e avisa que o progresso não será salvo.
import { ehDiaValido } from './datas';
import {
  type Ajustes,
  type Caderno,
  type Estado,
  type Nota,
  type Onde,
  type PerguntaCaderno,
  type ProgressoLicao,
  ESTADO_INICIAL,
} from './estado';
import type { EstadoRevisao, ItemRevisao } from './revisao';

export const CHAVE = 'fc:v1:estado';
export const ID_APP = 'fibra-em-campo';

/**
 * disponivel = false: o navegador bloqueou o armazenamento (o progresso não será salvo).
 * corrompido = true: havia dado salvo, mas ilegível (o app recomeça do zero sem quebrar).
 */
export function carregar(): { estado: Estado; disponivel: boolean; corrompido: boolean } {
  let bruto: string | null;
  try {
    bruto = window.localStorage.getItem(CHAVE);
  } catch {
    return { estado: ESTADO_INICIAL, disponivel: false, corrompido: false };
  }
  if (!bruto) return { estado: ESTADO_INICIAL, disponivel: true, corrompido: false };
  try {
    return { estado: normalizarEstado(JSON.parse(bruto)), disponivel: true, corrompido: false };
  } catch {
    return { estado: ESTADO_INICIAL, disponivel: true, corrompido: true };
  }
}

export function salvar(estado: Estado): boolean {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(estado));
    return true;
  } catch {
    return false;
  }
}

export function apagarTudo(): boolean {
  try {
    window.localStorage.removeItem(CHAVE);
    return true;
  } catch {
    return false;
  }
}

// ---------- Normalização: aceita dados antigos ou incompletos sem quebrar ----------

const ehObjeto = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);
const texto = (x: unknown, padrao = ''): string => (typeof x === 'string' ? x : padrao);
const ONDES: Onde[] = ['sozinho', 'documentos', 'outras-areas', 'colega'];

function normalizarProgresso(x: unknown): Estado['progresso'] {
  const licoes: Record<string, ProgressoLicao> = {};
  const diasEstudo: string[] = [];
  if (ehObjeto(x)) {
    if (ehObjeto(x.licoes)) {
      for (const [id, p] of Object.entries(x.licoes)) {
        if (!ehObjeto(p)) continue;
        const melhor = Number(p.melhor);
        const tentativas = Number(p.tentativas);
        licoes[id] = {
          melhor: Number.isFinite(melhor) ? Math.max(0, Math.min(5, melhor)) : 0,
          tentativas: Number.isFinite(tentativas) ? Math.max(0, tentativas) : 0,
          ...(ehDiaValido(texto(p.aprovadaEm)) ? { aprovadaEm: texto(p.aprovadaEm) } : {}),
          ...(ehDiaValido(texto(p.lidaEm)) ? { lidaEm: texto(p.lidaEm) } : {}),
        };
      }
    }
    if (Array.isArray(x.diasEstudo)) for (const d of x.diasEstudo) if (ehDiaValido(texto(d))) diasEstudo.push(d as string);
  }
  return { licoes, diasEstudo: [...new Set(diasEstudo)].sort() };
}

function normalizarRevisao(x: unknown): EstadoRevisao {
  const itens: Record<string, ItemRevisao> = {};
  const dominadas: string[] = [];
  if (ehObjeto(x)) {
    if (ehObjeto(x.itens)) {
      for (const [id, i] of Object.entries(x.itens)) {
        if (!ehObjeto(i) || !ehDiaValido(texto(i.vence))) continue;
        const etapa = Number(i.etapa);
        itens[id] = {
          etapa: Number.isInteger(etapa) && etapa >= 0 && etapa <= 3 ? etapa : 0,
          vence: texto(i.vence),
          erros: Math.max(1, Number(i.erros) || 1),
        };
      }
    }
    if (Array.isArray(x.dominadas)) for (const d of x.dominadas) if (typeof d === 'string') dominadas.push(d);
  }
  return { itens, dominadas: [...new Set(dominadas)] };
}

function normalizarCaderno(x: unknown): Caderno {
  const caderno: Caderno = { campos: {}, notas: [], perguntas: [] };
  if (!ehObjeto(x)) return caderno;
  if (ehObjeto(x.campos)) for (const [k, v] of Object.entries(x.campos)) if (typeof v === 'string') caderno.campos[k] = v;
  if (Array.isArray(x.notas)) {
    for (const n of x.notas) {
      if (!ehObjeto(n) || typeof n.id !== 'string') continue;
      caderno.notas.push({ id: n.id, titulo: texto(n.titulo), texto: texto(n.texto), atualizadoEm: texto(n.atualizadoEm) } satisfies Nota);
    }
  }
  if (Array.isArray(x.perguntas)) {
    for (const p of x.perguntas) {
      if (!ehObjeto(p) || typeof p.id !== 'string' || typeof p.texto !== 'string') continue;
      caderno.perguntas.push({
        id: p.id,
        texto: p.texto,
        onde: ONDES.includes(p.onde as Onde) ? (p.onde as Onde) : 'colega',
        ...(typeof p.licao === 'string' ? { licao: p.licao } : {}),
        resposta: texto(p.resposta),
        resolvida: p.resolvida === true,
        criadaEm: texto(p.criadaEm),
      } satisfies PerguntaCaderno);
    }
  }
  return caderno;
}

function normalizarAjustes(x: unknown): Ajustes {
  const a = { ...ESTADO_INICIAL.ajustes };
  if (!ehObjeto(x)) return a;
  if (x.tema === 'claro' || x.tema === 'escuro' || x.tema === 'sistema') a.tema = x.tema;
  a.sol = x.sol === true;
  a.inicioPlano = ehDiaValido(texto(x.inicioPlano)) ? texto(x.inicioPlano) : null;
  a.diasSoRevisao = Array.isArray(x.diasSoRevisao)
    ? [...new Set(x.diasSoRevisao.filter((d): d is number => Number.isInteger(d) && d >= 0 && d <= 6))].sort()
    : [];
  a.soRevisaoAte = ehDiaValido(texto(x.soRevisaoAte)) ? texto(x.soRevisaoAte) : null;
  return a;
}

export function normalizarEstado(x: unknown): Estado {
  if (!ehObjeto(x)) return ESTADO_INICIAL;
  return {
    versao: 1,
    progresso: normalizarProgresso(x.progresso),
    revisao: normalizarRevisao(x.revisao),
    caderno: normalizarCaderno(x.caderno),
    ajustes: normalizarAjustes(x.ajustes),
    ferramentas: ehObjeto(x.ferramentas) ? x.ferramentas : {},
  };
}

// ---------- Exportar e importar ----------

export type Escopo = 'tudo' | 'caderno';

export function exportar(estado: Estado, escopo: Escopo, agora = new Date()): string {
  const dados = escopo === 'caderno' ? { caderno: estado.caderno } : estado;
  return JSON.stringify({ app: ID_APP, escopo, versao: 1, exportadoEm: agora.toISOString(), dados }, null, 2);
}

export type ResultadoLeitura =
  | { ok: true; escopo: Escopo; dados: Partial<Estado> & { caderno: Caderno } }
  | { ok: false; erro: string };

/** Lê um arquivo exportado. Nunca altera o estado: só valida e normaliza. */
export function lerImportacao(textoArquivo: string): ResultadoLeitura {
  let bruto: unknown;
  try {
    bruto = JSON.parse(textoArquivo);
  } catch {
    return { ok: false, erro: 'O arquivo não é um JSON válido.' };
  }
  if (!ehObjeto(bruto) || bruto.app !== ID_APP) return { ok: false, erro: 'Este arquivo não foi exportado pelo Fibra em Campo.' };
  if (bruto.versao !== 1) return { ok: false, erro: `Versão de arquivo não suportada (${String(bruto.versao)}).` };
  if (!ehObjeto(bruto.dados)) return { ok: false, erro: 'O arquivo não tem dados.' };
  if (bruto.escopo === 'caderno') {
    return { ok: true, escopo: 'caderno', dados: { caderno: normalizarCaderno(bruto.dados.caderno) } };
  }
  if (bruto.escopo === 'tudo') {
    return { ok: true, escopo: 'tudo', dados: normalizarEstado(bruto.dados) };
  }
  return { ok: false, erro: 'Escopo desconhecido no arquivo.' };
}

function mesclarCaderno(atual: Caderno, novo: Caderno): Caderno {
  const campos = { ...atual.campos };
  for (const [k, v] of Object.entries(novo.campos)) if (v.trim()) campos[k] = v;
  const notas = new Map(atual.notas.map((n) => [n.id, n]));
  for (const n of novo.notas) {
    const existente = notas.get(n.id);
    if (!existente || n.atualizadoEm >= existente.atualizadoEm) notas.set(n.id, n);
  }
  const perguntas = new Map(atual.perguntas.map((p) => [p.id, p]));
  for (const p of novo.perguntas) {
    const existente = perguntas.get(p.id);
    perguntas.set(p.id, existente ? { ...existente, resposta: p.resposta || existente.resposta, resolvida: p.resolvida || existente.resolvida } : p);
  }
  return { campos, notas: [...notas.values()], perguntas: [...perguntas.values()] };
}

/** Descreve, em frases, o que a importação vai mudar (mostrado antes de aplicar). */
export function resumirImportacao(atual: Estado, leitura: Extract<ResultadoLeitura, { ok: true }>): string[] {
  const linhas: string[] = [];
  const novo = leitura.dados.caderno;
  const camposAlterados = Object.entries(novo.campos).filter(([k, v]) => v.trim() && atual.caderno.campos[k] !== v).length;
  const idsNotas = new Set(atual.caderno.notas.map((n) => n.id));
  const notasNovas = novo.notas.filter((n) => !idsNotas.has(n.id)).length;
  const notasAtualizadas = novo.notas.filter((n) => {
    const e = atual.caderno.notas.find((x) => x.id === n.id);
    return e && n.atualizadoEm > e.atualizadoEm;
  }).length;
  const idsPerg = new Set(atual.caderno.perguntas.map((p) => p.id));
  const perguntasNovas = novo.perguntas.filter((p) => !idsPerg.has(p.id)).length;
  linhas.push(`Caderno: ${camposAlterados} campo(s) alterado(s), ${notasNovas} nota(s) nova(s), ${notasAtualizadas} nota(s) atualizada(s), ${perguntasNovas} pergunta(s) nova(s).`);
  if (leitura.escopo === 'tudo') {
    const licoes = Object.keys(leitura.dados.progresso?.licoes ?? {}).length;
    const revisao = Object.keys(leitura.dados.revisao?.itens ?? {}).length;
    linhas.push(`Progresso: ${licoes} lição(ões) no arquivo (fica a melhor nota de cada).`);
    linhas.push(`Revisão: ${revisao} questão(ões) na fila do arquivo (somadas às suas).`);
    linhas.push('Ajustes: os do arquivo substituem os atuais.');
  }
  linhas.push('Nada do que você já tem é apagado.');
  return linhas;
}

/** Aplica a importação mesclando (nunca apaga o que já existe). */
export function aplicarImportacao(atual: Estado, leitura: Extract<ResultadoLeitura, { ok: true }>): Estado {
  const caderno = mesclarCaderno(atual.caderno, leitura.dados.caderno);
  if (leitura.escopo === 'caderno') return { ...atual, caderno };
  const d = leitura.dados as Estado;
  const licoes = { ...atual.progresso.licoes };
  for (const [id, p] of Object.entries(d.progresso.licoes)) {
    const e = licoes[id];
    licoes[id] = e
      ? {
          melhor: Math.max(e.melhor, p.melhor),
          tentativas: Math.max(e.tentativas, p.tentativas),
          aprovadaEm: [e.aprovadaEm, p.aprovadaEm].filter(Boolean).sort()[0],
          lidaEm: [e.lidaEm, p.lidaEm].filter(Boolean).sort()[0],
        }
      : p;
    if (!licoes[id].aprovadaEm) delete licoes[id].aprovadaEm;
    if (!licoes[id].lidaEm) delete licoes[id].lidaEm;
  }
  const itens = { ...atual.revisao.itens };
  for (const [id, item] of Object.entries(d.revisao.itens)) {
    const e = itens[id];
    itens[id] = !e || item.vence < e.vence ? item : e;
  }
  return {
    ...atual,
    progresso: { licoes, diasEstudo: [...new Set([...atual.progresso.diasEstudo, ...d.progresso.diasEstudo])].sort() },
    revisao: { itens, dominadas: [...new Set([...atual.revisao.dominadas, ...d.revisao.dominadas])].filter((id) => !itens[id]) },
    caderno,
    ajustes: d.ajustes,
  };
}
