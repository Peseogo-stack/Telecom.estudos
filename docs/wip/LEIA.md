# Trabalho pela metade (não vai para o main)

Esta pasta existe só no branch `modulo-01-e-videos`. Apague-a antes do merge.

- `videos-candidatos.json`: candidatos a vídeo por lição, levantados por um agente com o oEmbed e a YouTube Data API (título, canal, duração, capítulos e trecho da descrição). Nenhum foi conferido por mim contra a lição. Só entra no `content/videos.json` depois dessa conferência.
- `consultar-youtube.mjs`: script de trabalho que gerou as fichas. Uso: `NODE_USE_ENV_PROXY=1 node docs/wip/consultar-youtube.mjs info <id>`. A chave da API não está no arquivo: fica no segredo de rede do ambiente (host `www.googleapis.com`, cabeçalho `X-Goog-Api-Key`) e nunca vai para o Git.

O estado completo e o próximo passo estão em `docs/estado-trabalho.md`, no main.
