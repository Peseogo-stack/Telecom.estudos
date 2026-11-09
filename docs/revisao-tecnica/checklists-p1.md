# Revisão técnica — checklists de campo do P1

Revisão de 09/11/2026, branch `revisao-p1`. Substitui o relatório de 08/11/2026, que registrava "0 erros" sem ter conferido os itens contra as normas.

**Escopo:** os quatro checklists de `content/checklists/`:

- antes de subir no poste;
- antes da fusão;
- inspeção de CEO e CTO;
- aceite de obra.

**Método:** cada "por quê" foi lido contra o texto da fonte, baixado de novo nesta revisão:

- NR-10 vigente (Portarias 598/2004, 508/2016 e 915/2019);
- nova NR-10 (Portaria MTE 737/2026, em vigor em junho de 2027);
- NR-35 consolidada (até a Portaria MTE 1.259/2026), com o Anexo III (escadas);
- NR-21 e NR-33;
- FOA (segurança, fusão, limpeza, deliverables, loss budget, TIA-568 e restauração);
- fichas IEC 60825-2 AMD1, TREND, FDS do isopropanol, LPS, Fujikura e Tempo;
- normas de compartilhamento de exemplo (Cemig ND-6.6 e Neoenergia DIS-NOR-056).

Regra da revisão: nada pode afrouxar uma regra de segurança. Quando a prática varia, o item ganha o selo "Confirmar na empresa", que agora existe por item na tela do checklist e no texto copiado.

## Resumo

| Checklist | Itens | Erros corrigidos | Itens com "confirmar" |
| --- | --- | --- | --- |
| Antes de subir no poste | 13 (1 novo) | 9 | 7 |
| Antes da fusão | 10 (1 novo) | 6 | 1 |
| Inspeção de CEO e CTO | 9 | 5 | 3 |
| Aceite de obra | 10 | 4 | 5 |

## Antes de subir no poste

| # | Item | Estava | O que a fonte diz | Correção |
| --- | --- | --- | --- | --- |
| P1 | zonas | "A zona controlada da BT **inicia** a 0,70 m do condutor". | NR-10, Anexo II: BT com Rr = 0,20 m e Rc = 0,70 m; a zona controlada fica **entre** Rr e Rc. | "Vai até 0,70 m". O raciocínio 0,60 < 0,70 segue a lição 10-01. |
| P2 | autorização | NR-10 "item 10.8.8" e NR-35 "35.4.1" para o ASO. | NR-10, 10.8.4: autorizados, *"com anuência formal da empresa"*. NR-35 vigente: 35.4.1 (autorização) e 35.4.4.1 (aptidão no ASO). | Itens certos; mais a nova NR-10, 10.10.2 b (trabalho em proximidade). |
| P3 | APR e PT | "NR-35 itens 35.4.4 e 35.4.7"; "APR assinada por toda a equipe". | NR-35 vigente: 35.5.5 (análise de risco), 35.5.6 (rotina no procedimento) e 35.5.7 (PT para atividade não rotineira). Nada sobre quem assina. | Itens renumerados; a assinatura vira "confirmar". |
| P4 | clima | "A NR-35 (35.4.4.1) e a NR-10 **proíbem** trabalho sob intempéries". | NR-35, 35.5.5.1 d: a análise de risco considera as condições meteorológicas adversas. NR-10, 10.6.3: suspensão de imediato na iminência de perigo. | Texto pelas duas normas. A regra continua: tempo firme para subir. |
| P5 | escada | "Escadas devem ser de material não condutor [...] (NR-35 Anexo III)". | O Anexo III da NR-35 exige inspeção antes do uso (5.2.2.7.2), sapatas e piso estável (5.2.2.5), fixação da extensível (5.2.2.8.1) e três pontos de apoio (5.2.2.1.2). Não exige material isolante. | Requisitos do Anexo III; o material isolante vira regra da empresa ("confirmar"). |
| P6 | SPIQ | "Capacete classe B oferece isolamento elétrico" (NR-35 35.5.2). | NR-35 vigente: 35.6.6.2 (inspeção antes do início), 35.6.6.5 (descarte), 35.6.9 e 35.6.9.1.1 (talabarte com absorvedor). A NR-35 não trata de capacete classe B. | Itens certos; o capacete fica com a empresa ("confirmar"). |
| P7 | ancoragem | "Nunca conecte um talabarte no outro", sem item. | NR-35, 35.6.11 a (conectado o tempo todo) e 35.6.11.1.1 (proibido talabarte em outro talabarte, elemento de ligação ou extensor, ou com nós). | Itens citados. |
| P8 | cordoalha | Teste de tensão com fontes NR-10 e Neoenergia, que não falam disso. | FOA: ferragem conduz; dois instaladores morreram quando suportes metálicos encostaram na alta tensão. | Fonte trocada; detector e método: "confirmar". |
| P9 | integridade do poste | Fonte ABNT NBR 15214 (norma paga, sem o texto conferido). | NR-35, 35.3.1 e e h (avaliação prévia; suspensão diante de risco não previsto); nova NR-10, 10.7.4. | Fontes trocadas; critério de condenar poste: "confirmar". |
| Novo | sem adornos | — | NR-10, 10.2.9.3: vedado o uso de adornos pessoais; nova NR-10, 10.7.8. | Item novo. |

Também: o calor e o sol passaram a citar a NR-21 (21.2), e o resgate cita a NR-35 (35.7.1 e 35.5.5.1 k). O endereço da NR-35 citado no app dava 404 e foi trocado.

## Antes da fusão

| # | Item | Estava | O que a fonte diz | Correção |
| --- | --- | --- | --- | --- |
| F1 | fibra ativa | Infravermelho "pode causar queimaduras irreversíveis na **retina**". | FOA: de 1300 a 1550 nm, *"unlikely to damage your retina, but might harm the cornea or lens"*. | Texto pela FOA. A regra (medir antes de olhar) continua. |
| F2 | microscópio | Lupa "focaliza o laser sobre a **fóvea**". | FOA: o microscópio *"can efficiently focus all the light into your eye"* e precisa de filtro infravermelho. | Texto pela FOA, com a etiqueta 1M/2M da IEC 60825-2. |
| F3 | VFL | "Laser de 1 a 10 mW"; "usar óculos de segurança" contra laser. | TREND: até 1 mW, Classe 2; 10 a 50 mW, Classe 3B. FOA: olhar de lado, a pelo menos 6 polegadas. Óculos de segurança comuns não são proteção contra laser. | Classes corretas; o óculos fica num item próprio, contra cacos. |
| F4 | cacos | Cacos "entram na **corrente sanguínea**". | FOA: entram na pele e quebram; engolidos, podem causar hemorragia interna. | Texto pela FOA. |
| F5 | tapete escuro | Atribuído à FOA, com "fita adesiva" e "antiestática". | A FOA manda guardar os pedaços em lugar seguro e limpar a área; não fala de tapete. | Regras da FOA; o tapete escuro fica como dica lógica (vidro transparente). |
| F6 | arco | Calibração por "temperatura, umidade e pressão". | Tempo: calibrar *"at the beginning of a splicing session"*. Fujikura (90R): ranhuras em V todo dia. | Texto pelas fontes. |
| Novo | óculos | — | FOA: *"Always wear safety glasses with side shields"*. | Item novo. |

## Inspeção de CEO e CTO

| # | Item | Estava | O que a fonte diz | Correção |
| --- | --- | --- | --- | --- |
| C1 | bandeja | "Sobras de **fibra nua**". | FOA: cerca de 1 m de fibra na bandeja (fibra com revestimento). | "Sobra de fibra". |
| C2 | limpeza | Sujeira "eleva a perda em 0,5 a 2,0 dB"; "ORL > 55 dB" (fontes Fluke e SENKO). | Nenhuma das duas traz esses números. VIAVI: inspecionar antes de conectar; FOA: limpar sempre antes de acoplar. | Números saem; fontes certas. |
| C3 | raio | "Raio superior a 30 mm" como regra. | A G.652.D é especificada com 100 voltas de 30 mm de raio (até 0,1 dB em 1625 nm); não é raio mínimo de instalação. | Seguir as guias da caixa; o 30 mm aparece como referência da norma. |
| C4 | vedação | Insetos que "corroem acrilato". | Sem fonte. | Sai; vedação pelo grau IP 55 da ficha. |
| C5 | plaqueta | Fonte NBR 15214 (não conferida). | Cemig ND-6.6: plaqueta com tipo do cabo, contato e nome, a 200–400 mm do poste. Neoenergia: 100 × 50 mm, polimérica. | Normas de exemplo, com "confirmar". |

## Aceite de obra

| # | Item | Estava | O que a fonte diz | Correção |
| --- | --- | --- | --- | --- |
| A1 | perdas | "Fusões típico ≤ 0,10 a 0,15 dB; conectores ≤ 0,30 a 0,50 dB". | FOA (Deliverables): fusão com média de 0,1 dB, rejeitar acima de 0,2 dB; conexão com média de 0,3 dB, rejeitar acima de 0,5 dB. TIA-568: 0,3 dB por emenda; 0,75 dB por par de conectores. | Referências com fonte; o critério do contrato vem antes ("confirmar"). |
| A2 | postes | "Fora da faixa de 50 cm [...] multas". | O "50 cm" não está nas fontes citadas; a faixa de ocupação é definida por cada distribuidora (Cemig 4.16; Neoenergia, Tabela 1). | Sem número; "confirmar". |
| A3 | OTDR | "1310 e 1550 nm para 100% das fibras" como regra. | É critério de contrato; a média bidirecional vem da FOA, EXFO e Yokogawa. | Comprimentos de onda e cobertura: "confirmar". |
| A4 | recebimento | "Início do período de observação e testes de carga". | Lei 14.133, art. 140: provisório quando as exigências técnicas são atendidas; definitivo quando o contrato todo é atendido. | Texto pela lei, como na lição 09-05. |

## Não conferido

- **ABNT NBR 15214 (edição vigente de 2024).** A norma é paga; os checklists deixaram de citá-la. As normas de exemplo da Cemig e da Neoenergia foram lidas.
