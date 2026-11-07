// Busca simples, sem acento e sem diferenciar maiúsculas.
export interface ItemBusca {
  tipo: 'licao' | 'termo' | 'ferramenta' | 'checklist' | 'caderno';
  id: string;
  titulo: string;
  texto: string;
  rota: string;
}

export interface ResultadoBusca extends ItemBusca {
  trecho: string;
  pontos: number;
}

export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

function trechoEm(texto: string, termo: string, raio = 70): string {
  const i = normalizar(texto).indexOf(termo);
  if (i < 0) return texto.slice(0, raio * 2) + (texto.length > raio * 2 ? '…' : '');
  const ini = Math.max(0, i - raio);
  const fim = Math.min(texto.length, i + termo.length + raio);
  return (ini > 0 ? '…' : '') + texto.slice(ini, fim) + (fim < texto.length ? '…' : '');
}

/** Todas as palavras da consulta precisam aparecer no título ou no texto. Título vale mais. */
export function buscar(itens: ItemBusca[], consulta: string, limite = 40): ResultadoBusca[] {
  const termos = normalizar(consulta).split(/\s+/).filter((t) => t.length >= 2);
  if (termos.length === 0) return [];
  const resultados: ResultadoBusca[] = [];
  for (const item of itens) {
    const titulo = normalizar(item.titulo);
    const texto = normalizar(item.texto);
    let pontos = 0;
    let todos = true;
    for (const t of termos) {
      const noTitulo = titulo.includes(t);
      const noTexto = texto.includes(t);
      if (!noTitulo && !noTexto) {
        todos = false;
        break;
      }
      pontos += (noTitulo ? 10 : 0) + (noTexto ? 1 : 0);
      if (titulo.startsWith(t)) pontos += 5;
    }
    if (!todos) continue;
    if (item.tipo === 'termo') pontos += 2;
    resultados.push({ ...item, pontos, trecho: trechoEm(item.texto, termos[0]) });
  }
  return resultados.sort((a, b) => b.pontos - a.pontos || a.titulo.localeCompare(b.titulo)).slice(0, limite);
}
