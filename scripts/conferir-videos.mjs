// Refaz a consulta de cada vídeo de content/videos.json no oEmbed do YouTube e lista os links quebrados.
// Uso: npm run conferir-videos   (precisa de internet; não roda no build nem no CI)
import { lerVideos } from './lib/conteudo.mjs';

const ESPERA_MS = 300;
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/** Compara a resposta do oEmbed com o que está salvo; devolve o status e os campos que mudaram. */
export function compararOembed(video, resposta) {
  if (resposta.status !== 200) return { status: 'QUEBRADO', mudou: [] };
  const mudou = [];
  if (resposta.dados?.title !== video.titulo) mudou.push('título');
  if (resposta.dados?.author_name !== video.canal) mudou.push('canal');
  return { status: mudou.length ? 'MUDOU' : 'OK', mudou };
}

async function consultar(url) {
  const alvo = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  try {
    const r = await fetch(alvo, { signal: AbortSignal.timeout(20_000) });
    return { status: r.status, dados: r.status === 200 ? await r.json() : null };
  } catch (e) {
    return { status: 0, dados: null, erro: e.name };
  }
}

async function main() {
  const lista = lerVideos().flatMap((e) => (e.videos ?? []).map((v) => ({ licao: e.licao, video: v })));
  if (lista.length === 0) {
    console.log('Nenhum vídeo em content/videos.json (só termos de busca).');
    return;
  }
  let quebrados = 0;
  let mudaram = 0;
  for (const [i, { licao, video }] of lista.entries()) {
    if (i > 0) await espera(ESPERA_MS);
    const resposta = await consultar(video.url);
    const { status, mudou } = compararOembed(video, resposta);
    if (status === 'QUEBRADO') quebrados++;
    if (status === 'MUDOU') mudaram++;
    const atual = resposta.dados ? `"${resposta.dados.title}" — ${resposta.dados.author_name}` : `HTTP ${resposta.status || resposta.erro}`;
    console.log(`${licao}  ${status}${mudou.length ? ` (${mudou.join(', ')})` : ''}  ${atual}  ${video.url}`);
  }
  console.log(`\n${lista.length} vídeo(s): ${lista.length - quebrados - mudaram} ok, ${mudaram} mudou, ${quebrados} quebrado(s).`);
  if (quebrados) process.exitCode = 1;
}

if (process.argv[1]?.endsWith('conferir-videos.mjs')) await main();
