#!/usr/bin/env python3
import json
import os
import re
import subprocess
import html
from html.parser import HTMLParser

os.makedirs('/tmp/auditoria-fontes', exist_ok=True)

class HTMLTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.result = []
        self.in_ignored_tag = False
        self.ignored_tags = {'script', 'style', 'noscript', 'meta', 'link'}

    def handle_starttag(self, tag, attrs):
        if tag.lower() in self.ignored_tags:
            self.in_ignored_tag = True
        elif tag.lower() in {'p', 'div', 'br', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'tr'}:
            self.result.append('\n')

    def handle_endtag(self, tag):
        if tag.lower() in self.ignored_tags:
            self.in_ignored_tag = False
        elif tag.lower() in {'p', 'div', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'tr'}:
            self.result.append('\n')

    def handle_data(self, data):
        if not self.in_ignored_tag:
            self.result.append(data)

    def get_text(self):
        text = ''.join(self.result)
        text = re.sub(r'[ \t]+', ' ', text)
        text = re.sub(r'\n\s*\n', '\n\n', text)
        return text.strip()

with open('content/fontes.json', 'r', encoding='utf-8') as f:
    todas_fontes = {item['id']: item for item in json.load(f)}

licoes_ids = ['10-03', '10-04', '05-01', '05-03', '05-04', '04-01', '04-03', '04-05']
fontes_alvo = set()

for lid in licoes_ids:
    path = f'content/licoes/{lid}.md'
    if os.path.exists(path):
        txt = open(path, 'r', encoding='utf-8').read()
        m = re.search(r'fontes:\s*(\[[^\]]+\])', txt)
        if m:
            for fid in json.loads(m.group(1)):
                fontes_alvo.add(fid)
        for fid in re.findall(r'\{\{fonte:([^}|]+)\}\}', txt):
            fontes_alvo.add(fid)

import glob
for chk_path in glob.glob('content/checklists/*.json'):
    data = json.load(open(chk_path, 'r', encoding='utf-8'))
    for it in data.get('itens', []):
        for fid in it.get('fontes', []):
            fontes_alvo.add(fid)

print(f"Total de fontes para auditar: {len(fontes_alvo)}")

relatorio = []

for fid in sorted(fontes_alvo):
    f_info = todas_fontes.get(fid)
    if not f_info:
        relatorio.append({"id": fid, "status": "FALHA", "motivo": "Fonte não existe em fontes.json"})
        continue

    url = f_info['url']
    saida_txt = f"/tmp/auditoria-fontes/{fid}.txt"
    raw_file = f"/tmp/auditoria-fontes/{fid}.raw"

    print(f"Baixando [{fid}]: {url}")
    cmd = [
        "curl", "-L", "-s", "-k",
        "--connect-timeout", "15",
        "--max-time", "45",
        "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        url,
        "-o", raw_file
    ]
    res = subprocess.run(cmd)

    if not os.path.exists(raw_file) or os.path.getsize(raw_file) == 0:
        relatorio.append({
            "id": fid,
            "url": url,
            "status": "ERRO_DOWNLOAD",
            "bytes": 0,
            "chars": 0,
            "tipo": "desconhecido",
            "observacao_projeto": f_info.get('observacao', '')
        })
        continue

    raw_bytes = open(raw_file, 'rb').read()
    is_pdf = raw_bytes.startswith(b'%PDF') or b'%PDF-' in raw_bytes[:1024]

    if is_pdf:
        # Extrai texto do PDF com pdftotext
        pdf_res = subprocess.run(["pdftotext", "-layout", raw_file, saida_txt])
        if os.path.exists(saida_txt):
            txt = open(saida_txt, 'r', encoding='utf-8', errors='ignore').read()
            # Conta páginas aproximadas com FF \x0c
            paginas = txt.count('\x0c') + 1
            relatorio.append({
                "id": fid,
                "url": url,
                "status": "SUCESSO_PDF",
                "paginas": paginas,
                "bytes": len(raw_bytes),
                "chars": len(txt),
                "tipo": "PDF",
                "amostra": txt[:300].replace('\n', ' ').strip(),
                "observacao_projeto": f_info.get('observacao', '')
            })
        else:
            relatorio.append({
                "id": fid,
                "url": url,
                "status": "ERRO_PDF_EXTRACAO",
                "bytes": len(raw_bytes),
                "chars": 0,
                "tipo": "PDF",
                "observacao_projeto": f_info.get('observacao', '')
            })
    else:
        # Processa como HTML / Texto
        raw_text = raw_bytes.decode('utf-8', errors='ignore')
        parser = HTMLTextExtractor()
        try:
            parser.feed(raw_text)
            extracted_text = parser.get_text()
        except Exception:
            extracted_text = re.sub(r'<[^>]+>', ' ', raw_text)

        with open(saida_txt, 'w', encoding='utf-8') as out_f:
            out_f.write(extracted_text)

        relatorio.append({
            "id": fid,
            "url": url,
            "status": "SUCESSO_HTML",
            "paginas": 1,
            "bytes": len(raw_bytes),
            "chars": len(extracted_text),
            "tipo": "HTML",
            "amostra": extracted_text[:300].replace('\n', ' ').strip(),
            "observacao_projeto": f_info.get('observacao', '')
        })

with open('/tmp/auditoria-fontes/relatorio.json', 'w', encoding='utf-8') as f_rel:
    json.dump(relatorio, f_rel, indent=2, ensure_ascii=False)

print(f"\nExtração concluída! Relatório salvo em /tmp/auditoria-fontes/relatorio.json")
