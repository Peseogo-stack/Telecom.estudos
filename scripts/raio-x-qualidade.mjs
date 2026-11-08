import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const RAIZ = process.cwd();
const PASTA_LICOES = join(RAIZ, 'content', 'licoes');
const PASTA_QUESTOES = join(RAIZ, 'content', 'questoes');

const BLOCO_OPUS = new Set([
  '02-01', '02-02', '02-03', '02-04', '02-05', '02-06', '02-07',
  '03-01', '03-03', '03-04', '03-07',
  '06-01', '06-02', '06-03',
  '09-01', '09-02', '09-03', '09-05', '09-06',
  '10-01', '10-05'
]);

const BLOCO_FLASH = new Set([
  '10-03', '10-04',
  '05-01', '05-03', '05-04',
  '04-01', '04-03', '04-05'
]);

const TODAS_P1 = [...BLOCO_OPUS, ...BLOCO_FLASH].sort();

function contarPalavras(texto) {
  return (texto.match(/[\p{L}\p{N}]+(?:[-'/\p{L}\p{N}]+)*/gu) ?? []).length;
}

const relatorioLicoes = [];
const questoesSuspeitas = [];

for (const id of TODAS_P1) {
  const arqLicao = join(PASTA_LICOES, `${id}.md`);
  const arqQuestao = join(PASTA_QUESTOES, `${id}.json`);

  const brutoLicao = readFileSync(arqLicao, 'utf-8');
  const { data: meta, content: corpo } = matter(brutoLicao);

  const palavrasTotal = contarPalavras(corpo);
  const secoes = (corpo.match(/^##\s+.+$/gm) ?? []).length;
  const tabelas = (corpo.match(/\|[\s-]+\|/g) ?? []).length;

  const marcacoesFonte = (corpo.match(/\{\{fonte:[^}|]+\}\}/g) ?? []).length;
  const marcacoesTermo = (corpo.match(/\{\{termo:[^}|]+(?:\|[^}]+)?\}\}/g) ?? []).length;
  const marcacoesFerramenta = (corpo.match(/\{\{ferramenta:[^}|]+(?:\|[^}]+)?\}\}/g) ?? []).length;
  const totalRefs = marcacoesFonte + marcacoesTermo + marcacoesFerramenta;

  const dadosQ = JSON.parse(readFileSync(arqQuestao, 'utf-8'));
  let totalCharsEnunciado = 0;
  let totalCharsExplicacao = 0;
  let qtdQuestoes = dadosQ.length;
  let certasMaisLongas = 0;
  let certasMaisLongas25 = 0;

  for (const q of dadosQ) {
    totalCharsEnunciado += q.enunciado.length;
    const correta = q.alternativas.find((a) => a.correta);
    const incorretas = q.alternativas.filter((a) => !a.correta);

    for (const a of q.alternativas) {
      totalCharsExplicacao += (a.explicacao ?? '').length;
    }

    const tamCerta = correta.texto.length;
    const mediaIncorretas = incorretas.reduce((acc, a) => acc + a.texto.length, 0) / incorretas.length;
    const maxIncorreta = Math.max(...incorretas.map((a) => a.texto.length));

    const ehMaiorAbsoluta = tamCerta > maxIncorreta;
    const ehMaisLonga25 = tamCerta > 1.25 * mediaIncorretas;

    if (ehMaiorAbsoluta) certasMaisLongas++;
    if (ehMaisLonga25) {
      certasMaisLongas25++;
      questoesSuspeitas.push({
        licao: id,
        bloco: BLOCO_FLASH.has(id) ? 'FLASH' : 'OPUS',
        idQuestao: q.id,
        enunciado: q.enunciado,
        textoCorreta: correta.texto,
        tamCorreta: tamCerta,
        mediaIncorretas: Math.round(mediaIncorretas),
        razao: (tamCerta / mediaIncorretas).toFixed(2),
      });
    }
  }

  relatorioLicoes.push({
    id,
    bloco: BLOCO_FLASH.has(id) ? 'FLASH' : 'OPUS',
    palavras: palavrasTotal,
    secoes,
    tabelas,
    fontes: marcacoesFonte,
    termos: marcacoesTermo,
    ferramentas: marcacoesFerramenta,
    totalRefs,
    mediaEnunciadoChars: Math.round(totalCharsEnunciado / qtdQuestoes),
    mediaExplicacaoChars: Math.round(totalCharsExplicacao / (qtdQuestoes * 4)),
    certasMaisLongas,
    certasMaisLongas25,
  });
}

// Estatísticas dos Blocos
function media(arr, campo) {
  return arr.reduce((acc, x) => acc + x[campo], 0) / arr.length;
}

const opusLicoes = relatorioLicoes.filter((l) => l.bloco === 'OPUS');
const flashLicoes = relatorioLicoes.filter((l) => l.bloco === 'FLASH');

const statsOpus = {
  palavras: Math.round(media(opusLicoes, 'palavras')),
  fontes: Number(media(opusLicoes, 'fontes').toFixed(1)),
  termos: Number(media(opusLicoes, 'termos').toFixed(1)),
  totalRefs: Number(media(opusLicoes, 'totalRefs').toFixed(1)),
  mediaEnunciado: Math.round(media(opusLicoes, 'mediaEnunciadoChars')),
  mediaExplicacao: Math.round(media(opusLicoes, 'mediaExplicacaoChars')),
};

const statsFlash = {
  palavras: Math.round(media(flashLicoes, 'palavras')),
  fontes: Number(media(flashLicoes, 'fontes').toFixed(1)),
  termos: Number(media(flashLicoes, 'termos').toFixed(1)),
  totalRefs: Number(media(flashLicoes, 'totalRefs').toFixed(1)),
  mediaEnunciado: Math.round(media(flashLicoes, 'mediaEnunciadoChars')),
  mediaExplicacao: Math.round(media(flashLicoes, 'mediaExplicacaoChars')),
};

const saidaFinal = {
  statsOpus,
  statsFlash,
  relatorioLicoes,
  questoesSuspeitas,
};

import { writeFileSync } from 'node:fs';
writeFileSync('/tmp/raio-x-qualidade.json', JSON.stringify(saidaFinal, null, 2));
console.log('Raio-X de qualidade salvo em /tmp/raio-x-qualidade.json');
