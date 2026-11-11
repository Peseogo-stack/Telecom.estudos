# Conferência da pesquisa do módulo 11

Feita em 11/11/2026 sobre `modulo-11.md` (74 fatos em 6 lições). Regra combinada: conferir todos os itens de segurança e 20% dos demais, sorteados; se mais de 1 item da amostra tiver erro, link quebrado ou trecho que não está na fonte, parar e devolver a lista sem corrigir.

**Resultado: não passou.** 21 itens conferidos; 8 com problema. As lições do módulo 11 não foram escritas.

## Como foi feita

- **Segurança (7 itens, todos conferidos).** A pesquisa não tem nenhum fato sobre segurança do laser (classe do laser, olhar para a ponta da fibra ou para a porta do módulo). Entraram como segurança os itens em que um erro pode danificar equipamento: L1-F06 (SFP+ em porta SFP), L1-F18 (APC e distância mínima), L2-F09, L2-F10 e L2-F11 (limites de potência e sobrecarga do receptor), L2-F12 (atenuador obrigatório) e L2-F13 (faixa de temperatura).
- **Sorteio (14 de 67 itens, 20% arredondado para cima).** `random.sample` do Python com semente 20261111: L1-F05, L1-F09, L1-F13, L2-F01, L3-F01, L3-F06, L3-F09, L4-F02, L4-F05, L4-F09, L5-F03, L6-F01, L6-F08, L6-F11.
- **Leitura.** Abri cada link e procurei o trecho citado. As páginas da Cisco e da FS bloqueiam download direto; li pelo leitor de páginas. Os PDFs da Cisco, da Finisar e do PNCP foram baixados e lidos como texto.

## Problemas (8)

| Item | O que a pesquisa diz | O que a fonte diz | Tipo |
| --- | --- | --- | --- |
| L1-F05 | QSFP28 com "103,125 Gbps (4x 25,78 Gbps)", com uma tabela entre aspas | A página da FS não tem essa tabela nem o número 103,125 Gbps; fala em quatro sinais de 25 Gbps e alcance de 10 km | Trecho que não está na fonte |
| L1-F09 | ZX chega "a até 100 km sobre fibra monomodo" | A frase continua: "by using dispersion-shifted SMF or low-attenuation SMF; the actual distance depends on the fiber quality…". Outra ficha da Cisco (c78-366584) dá cerca de 70 km em monomodo padrão | O fato tira a condição da frase |
| L2-F10 | Tabela de potência TX e sensibilidade do SR, LR e LRM | A página da FS não mostra essa tabela; só comprimento de onda e alcance no texto | Trecho que não está na fonte (segurança) |
| L2-F13 | "Faixas padronizadas" de temperatura: estendida de −10 a +85 °C | Na mesma página da Cisco, módulos CWDM "Ext Temp" vão de 0 a +85 °C; na ficha c78-366584, a estendida (EXT) vai de −5 a +85 °C. O −10 vale para aqueles módulos, não é padrão | Generaliza além da fonte (segurança) |
| L4-F09 | Contratos dão "tipicamente" /29, /28 ou 1 IP fixo, e IPv6 /64 ou /48 | O termo de referência citado (CBTU) pede só /29 e /64. Não há /28, IP único nem /48 | Fato diz mais que a fonte |
| L6-F01 | Links dedicados são enquadrados pela Anatel como SCM (Res. 614/2013) | O link abre uma página de "manutenção programada" da Anatel. E o trecho citado só diz "CONSIDERANDO o Regulamento do SCM…"; não diz que link dedicado é SCM | Link fora do ar e trecho que não sustenta o fato |
| L6-F08 | "Os contratos exigem 100% de garantia de banda … em full-duplex simétrico" | O TR citado diz "velocidade contratada de forma simétrica" e proíbe traffic shaping. Não fala em "100% de garantia" nem em full-duplex, e é um contrato só | Fato diz mais que a fonte |
| L3-F06 | IDs de 1 a 4094, 0 e 4095 reservados, "e a VLAN 1 é a VLAN padrão criada na inicialização" | A faixa confere. A parte da VLAN 1 não está no documento citado (referência de comandos do NCS 6000) | Metade do fato sem fonte |

## Passaram com ressalva (2)

- **L1-F06:** o sentido confere, mas as frases entre aspas não são as da página. Ex.: a página diz "SFP+ ports can accept SFP optics but at a reduced speed of 1 Gbit/s"; a pesquisa cita "…but they will operate at a reduced speed of 1 Gbps".
- **L2-F12:** a Cisco fala do caso do GLC-GE-DR-LX com 100BASE-LX10 ("A 5dB attenuator is needed…"). A pesquisa transforma o caso numa regra geral. A mesma ficha manda atenuador de 10 dB no ZX quando a perda do enlace é menor que 8 dB, o que apoia a ideia, mas a regra geral não está escrita.

## Passaram (11)

L1-F13, L1-F18, L2-F01, L2-F09, L2-F11, L3-F01, L3-F09, L4-F02, L4-F05, L5-F03, L6-F11.

## O que falta para seguir

A decisão é sua. Antes de escrever as lições, a pesquisa precisa de:

1. Corrigir os 8 itens acima (ou tirá-los).
2. Um bloco de segurança do laser com fonte (classe do laser na ficha do módulo, não olhar para a porta nem para a ponta da fibra). Hoje não há nenhum.
3. Uma nova amostra depois da correção, porque 8 de 21 (38%) indica que outros itens não sorteados devem ter o mesmo tipo de erro, principalmente os de contrato (lição 6), que generalizam a partir de um termo de referência só.
