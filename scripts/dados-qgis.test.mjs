import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { RAIZ } from './lib/conteudo.mjs';

// O Vite não resolve "node:sqlite" por import estático; createRequire pega o módulo nativo.
const { DatabaseSync } = createRequire(import.meta.url)('node:sqlite');

const PASTA = join(RAIZ, 'public', 'dados-qgis');
const gabarito = JSON.parse(readFileSync(join(PASTA, 'gabarito.json'), 'utf8'));
const db = new DatabaseSync(join(PASTA, 'rede-ficticia.gpkg'), { readOnly: true });
const todas = (sql) => db.prepare(sql).all();
const contar = (t) => todas(`SELECT COUNT(*) AS n FROM ${t}`)[0].n;
const caixa = gabarito.local.caixa_epsg31980;
const wgs = gabarito.local.caixa_wgs84;

/** Lê o ponto (E, N) de um blob GeoPackage: cabeçalho GP de 8 bytes + envelope XY de 32 + WKB (5 de cabeçalho). */
const ponto = (blob) => {
  const b = Buffer.from(blob);
  return [b.readDoubleLE(8 + 32 + 5), b.readDoubleLE(8 + 32 + 5 + 8)];
};

describe('dados fictícios de QGIS: GeoPackage', () => {
  it('é um GeoPackage 1.3 com as tabelas obrigatórias', () => {
    expect(todas('PRAGMA application_id')[0].application_id).toBe(0x47504b47);
    expect(todas('PRAGMA user_version')[0].user_version).toBe(10300);
    const nomes = todas("SELECT name FROM sqlite_master WHERE type = 'table'").map((l) => l.name);
    for (const t of ['gpkg_spatial_ref_sys', 'gpkg_contents', 'gpkg_geometry_columns', 'gpkg_extensions', 'gpkg_metadata', 'gpkg_metadata_reference',
      'postes', 'vaos', 'cabos', 'caixas', 'quadras', 'ocupantes', 'ocupacoes']) {
      expect(nomes).toContain(t);
    }
    const srs = todas('SELECT srs_id FROM gpkg_spatial_ref_sys').map((l) => l.srs_id);
    expect(srs).toEqual(expect.arrayContaining([-1, 0, 4326, 31980]));
    const camadas = todas("SELECT table_name, srs_id, description FROM gpkg_contents WHERE data_type = 'features'");
    expect(camadas).toHaveLength(5);
    for (const c of camadas) {
      expect(c.srs_id).toBe(31980);
      expect(c.description).toContain('DADOS FICTÍCIOS para exercício');
    }
    expect(todas("SELECT table_name FROM gpkg_contents WHERE data_type = 'attributes'")).toHaveLength(2);
  });

  it('as contagens batem com o gabarito', () => {
    for (const t of Object.keys(gabarito.totais).filter((k) => k !== 'pontos_no_csv')) {
      expect(contar(t), t).toBe(gabarito.totais[t]);
    }
  });

  it('todas as feições são fictícias e os blobs têm cabeçalho GP e envelope', () => {
    for (const t of ['postes', 'vaos', 'cabos', 'caixas', 'quadras', 'ocupantes', 'ocupacoes']) {
      expect(todas(`SELECT COUNT(*) AS n FROM ${t} WHERE ficticio IS NOT 1`)[0].n, t).toBe(0);
    }
    for (const t of ['postes', 'vaos', 'cabos', 'caixas', 'quadras']) {
      for (const { geom } of todas(`SELECT geom FROM ${t}`)) {
        const b = Buffer.from(geom);
        expect(b.toString('latin1', 0, 2)).toBe('GP');
        expect(b.readInt32LE(4)).toBe(31980);
      }
      const c = todas(`SELECT min_x, min_y, max_x, max_y FROM gpkg_contents WHERE table_name = '${t}'`)[0];
      expect(c.min_x).toBeLessThanOrEqual(c.max_x);
      expect(c.min_x).not.toBeNull();
    }
  });

  it('todo ponto cai dentro da caixa da área', () => {
    for (const t of ['postes', 'caixas']) {
      for (const { geom } of todas(`SELECT geom FROM ${t}`)) {
        const [e, n] = ponto(geom);
        expect(e).toBeGreaterThanOrEqual(caixa.min_e);
        expect(e).toBeLessThanOrEqual(caixa.max_e);
        expect(n).toBeGreaterThanOrEqual(caixa.min_n);
        expect(n).toBeLessThanOrEqual(caixa.max_n);
      }
    }
    expect(Math.round(gabarito.local.centro_epsg31980.n / 1000)).toBe(10376);
  });

  it('os achados plantados aparecem nos dados', () => {
    expect(gabarito.irregularidades.length).toBeGreaterThan(0);
    expect(todas("SELECT COUNT(*) AS n FROM ocupacoes WHERE plaqueta = 'nao'")[0].n).toBe(5);
    expect(todas('SELECT COUNT(*) AS n FROM postes WHERE ocupantes_qtd > 5')[0].n).toBe(3);
    expect(todas('SELECT COUNT(*) AS n FROM ocupacoes WHERE dist_bt_m < 0.6')[0].n).toBe(4);
    expect(todas('SELECT COUNT(*) AS n FROM caixas WHERE poste_cod NOT IN (SELECT cod_poste FROM postes)')[0].n).toBe(1);
    expect(todas('SELECT COUNT(*) AS n FROM vaos WHERE compr_m < 30 OR compr_m > 40')[0].n).toBe(0);
  });
});

describe('dados fictícios de QGIS: CSV sem SRC', () => {
  it('cada poste do CSV está 10.000.000 m ao sul (± desvio de até 4 m)', () => {
    const [cab, ...linhas] = readFileSync(join(PASTA, 'vistoria-utm-sem-src.csv'), 'utf8').trim().split('\n');
    expect(cab).toBe('cod_poste;x;y;data;obs');
    expect(linhas).toHaveLength(gabarito.totais.pontos_no_csv);
    const porCod = new Map();
    for (const { cod_poste, geom } of todas('SELECT cod_poste, geom FROM postes')) {
      porCod.set(cod_poste, [...(porCod.get(cod_poste) ?? []), ponto(geom)]);
    }
    for (const l of linhas) {
      const [cod, x, y] = l.split(';');
      const achou = porCod.get(cod).some(([e, n]) => Math.abs(n - 1e7 - Number(y)) <= 4.01 && Math.abs(e - Number(x)) <= 4.01);
      expect(achou, cod).toBe(true);
    }
  });
});

describe('dados fictícios de QGIS: KML', () => {
  it('tem um Placemark por poste, dentro da caixa', () => {
    const kml = readFileSync(join(PASTA, 'postes.kml'), 'utf8');
    expect(kml).toContain('DADOS FICTÍCIOS para exercício');
    const marcas = [...kml.matchAll(/<Placemark>[\s\S]*?<name>(.*?)<\/name>[\s\S]*?<coordinates>([-\d.]+),([-\d.]+),0<\/coordinates>/g)];
    expect(marcas).toHaveLength(contar('postes'));
    const codigos = todas('SELECT cod_poste FROM postes ORDER BY fid').map((l) => l.cod_poste);
    expect(marcas.map((m) => m[1])).toEqual(codigos);
    for (const [, , lon, lat] of marcas) {
      expect(Number(lon)).toBeGreaterThanOrEqual(wgs.lon_min);
      expect(Number(lon)).toBeLessThanOrEqual(wgs.lon_max);
      expect(Number(lat)).toBeGreaterThanOrEqual(wgs.lat_min);
      expect(Number(lat)).toBeLessThanOrEqual(wgs.lat_max);
    }
  });
});
