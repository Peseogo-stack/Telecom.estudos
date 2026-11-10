// Conferência de vídeos do YouTube sem assistir (fora do Git).
// - oEmbed: confirma que o vídeo existe e dá título e canal (método pedido pelo usuário).
// - YouTube Data API v3 (chave injetada pelo proxy no cabeçalho X-Goog-Api-Key): descrição, capítulos, duração, idioma.
// Uso:
//   node yt.mjs info <id|url> [...]            → ficha de cada vídeo (JSON em stdout)
//   node yt.mjs busca "<consulta>" [n=8]       → busca em português/BR (custa 100 unidades da cota) + ficha de cada resultado
const API = 'https://www.googleapis.com/youtube/v3';

export function idDe(x) {
  const m = String(x).match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/) ?? String(x).match(/^([A-Za-z0-9_-]{11})$/);
  return m ? m[1] : null;
}

export function duracaoIso(iso) {
  const m = String(iso).match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return null;
  const [h, mi, s] = [Number(m[1] ?? 0), Number(m[2] ?? 0), Number(m[3] ?? 0)];
  const ss = String(s).padStart(2, '0');
  return h ? `${h}:${String(mi).padStart(2, '0')}:${ss}` : `${mi}:${ss}`;
}

export function capitulos(descricao) {
  return String(descricao ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^(\(?\d{1,2}:\d{2}(?::\d{2})?\)?)\s*[-–—:]?\s*\S/.test(l));
}

async function oembed(id) {
  const url = `https://www.youtube.com/watch?v=${id}`;
  try {
    const r = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`, { signal: AbortSignal.timeout(20000) });
    if (r.status !== 200) return { status: r.status };
    const j = await r.json();
    return { status: 200, titulo: j.title, canal: j.author_name, urlCanal: j.author_url };
  } catch (e) {
    return { status: 0, erro: e.name };
  }
}

async function api(caminho, params) {
  const q = new URLSearchParams(params).toString();
  const r = await fetch(`${API}/${caminho}?${q}`, { signal: AbortSignal.timeout(20000) });
  const j = await r.json();
  if (j.error) throw new Error(`API ${j.error.code}: ${j.error.message}`);
  return j;
}

export async function fichas(ids) {
  const limpos = ids.map(idDe).filter(Boolean);
  const porId = new Map();
  for (let i = 0; i < limpos.length; i += 50) {
    const j = await api('videos', { part: 'snippet,contentDetails,status', id: limpos.slice(i, i + 50).join(','), maxResults: '50' });
    for (const it of j.items ?? []) porId.set(it.id, it);
  }
  const saida = [];
  for (const id of limpos) {
    const o = await oembed(id);
    const it = porId.get(id);
    saida.push({
      id,
      url: `https://www.youtube.com/watch?v=${id}`,
      oembed: o,
      titulo: it?.snippet?.title ?? null,
      canal: it?.snippet?.channelTitle ?? null,
      publicado: it?.snippet?.publishedAt?.slice(0, 10) ?? null,
      idioma: it?.snippet?.defaultAudioLanguage ?? it?.snippet?.defaultLanguage ?? null,
      duracao: it ? duracaoIso(it.contentDetails?.duration) : null,
      incorporavel: it?.status?.embeddable ?? null,
      privacidade: it?.status?.privacyStatus ?? null,
      capitulos: capitulos(it?.snippet?.description),
      descricao: (it?.snippet?.description ?? '').slice(0, 1500),
    });
    await new Promise((r) => setTimeout(r, 150));
  }
  return saida;
}

export async function busca(consulta, n = 8) {
  const j = await api('search', { part: 'snippet', q: consulta, type: 'video', relevanceLanguage: 'pt', regionCode: 'BR', maxResults: String(n), safeSearch: 'strict' });
  return fichas((j.items ?? []).map((x) => x.id.videoId));
}

const [cmd, ...resto] = process.argv.slice(2);
if (cmd === 'info') console.log(JSON.stringify(await fichas(resto), null, 1));
else if (cmd === 'busca') console.log(JSON.stringify(await busca(resto[0], Number(resto[1] ?? 8)), null, 1));
else if (cmd) console.error('uso: node yt.mjs info <ids...> | busca "<consulta>" [n]');
