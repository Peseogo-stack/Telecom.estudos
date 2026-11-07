# Revisão técnica — semana 1 (segurança e contratos)

Revisor independente (um agente separado, que não escreveu o conteúdo), 07/11/2026. Branch `ajustes-fase-2`, commit `c3c7a1f`. Os 20 arquivos revisados foram conferidos por md5 no início e no fim da revisão e não mudaram. Nenhum arquivo do repositório foi editado.

Escopo: lições 10-01, 10-05, 09-01, 09-02, 09-03, 09-05 e 09-06; 57 questões com 228 alternativas; os 40 termos do glossário; as 19 fontes de `content/fontes.json`; `calculo.ts` e `calculo.test.ts`; os diagramas ZonasPoste, Nr10LinhaDoTempo e DisponibilidadeBarra. Também olhei GestorFiscal, que repete a tabela da 09-03.

## Resumo

| Item | Quantidade |
| --- | --- |
| Afirmações achadas na fonte (números, itens, citações), além de todas as contas refeitas | cerca de 160 |
| Questões lidas | 57 (228 alternativas). Todas têm exatamente uma correta, e a correta é sempre a única defensável entre as opções. Dois enunciados e várias explicações pedem ajuste (E2, A6, A14, A22). |
| **ERROS** | **2** |
| **AJUSTES** | **26** |
| **SUGESTÕES** | **24** |
| **NÃO CONFERIDOS** | **6**: 2 bloqueados (Corning), 1 texto não público e 3 de apoio |
| Analogias com a rede elétrica | nenhuma |
| Nome da empresa do usuário | nenhum (regra D2 de `docs/decisoes.md` respeitada) |
| Dado pessoal | 1 suposição sobre o usuário (A7) e 1 fonte vinculada com nome e CPF de terceiro (A25) |

Pontos de segurança: o conteúdo nunca afrouxa regra. O único problema que pode induzir a um entendimento menos seguro é o desenho de zonas (E1). A1 e A2 são de enquadramento ou de omissão.

## Erros

| # | Arquivo e trecho | O que está escrito | O que a fonte diz (item + trecho) | Correção proposta |
| --- | --- | --- | --- | --- |
| E1 | `src/diagramas/ZonasPoste.tsx` e `diagrama_descricao` da 10-01 | O condutor de BT é desenhado como uma linha horizontal de ponta a ponta (x = 78 a 390). ZR e ZC são **círculos em volta de um só ponto** (230,150), com a legenda "Fora dos círculos: zona livre (ZL)". A cota "0,60 m" fica em x = 112, e a ponta dela fica **fora** do círculo tracejado, a 168 unidades do centro (raio 140), ao lado do rótulo "dentro da ZC". Só 46% do cabo de telecom desenhado fica dentro do círculo, e o trecho junto ao poste fica fora. O próprio condutor de BT perto do poste (x < 90) aparece "fora dos círculos", ou seja, em "zona livre". | NR-10 vigente, glossário 31: ZC é o "entorno de parte condutora energizada, não segregada, acessível". Anexo II, Fig. 1: "Distâncias no ar que delimitam radialmente as zonas", a partir do "PE = Ponto da instalação energizado". Cada ponto do condutor é ponto energizado, então em vista lateral a ZC é uma **faixa** de 0,70 m ao longo do cabo inteiro. O desenho contradiz o passo 3 da própria lição ("já está dentro da zona controlada") e sugere zona livre exatamente onde se trabalha, junto ao poste. | Desenhar ZR e ZC como faixas (±0,20 m e ±0,70 m) ao longo de toda a linha de BT, ou trocar por um corte transversal (condutor visto de ponta, sem a linha horizontal). Pôr a cota de 0,60 m dentro da faixa e mudar a legenda para "fora das faixas: zona livre". Ajustar a `diagrama_descricao`. |
| E2 | `content/questoes/09-03.json`: q2, alternativa "Aplicar multa na hora"; q6, alternativa "Aplicar a multa por conta própria" | q2: "Sanção é conduzida pelo gestor; o fiscal registra e informa." q6: "Sanção é coordenada pelo gestor (Decreto 11.246, art. 21, X)." | Decreto 11.246, art. 21, X: o gestor deve "tomar providências para a formalização de processo administrativo de responsabilização (...) a ser conduzido pela comissão de que trata o art. 158" ou "pelo agente ou pelo setor competente". | "O gestor pede a abertura do processo de sanção (art. 21, X), que é conduzido por comissão ou pelo setor competente. O fiscal registra e informa." |

## Ajustes

| # | Arquivo e trecho | O que está escrito | O que a fonte diz (item + trecho) | Correção proposta |
| --- | --- | --- | --- | --- |
| A1 | `questoes/10-05.json` q8 ("Pela nova NR-10, o que fazer?") e tabela da 10-05, linha "Antes de começar", na coluna "vale a partir de junho de 2027" | A obrigação de não iniciar e comunicar é apresentada como regra da nova NR-10, numa situação de hoje ("Ao chegar no poste"). | NR-10 **vigente**, 10.6.5: "deve suspender as atividades quando verificar situação ou condição de risco não prevista". 10.13.4, c: "comunicar, de imediato, (...) as situações que considerar de risco". 10.11.7: avaliação prévia antes do trabalho em equipe. | Tirar o "Pela nova NR-10" ou completar: "Hoje (10.6.5 e 10.13.4 c) e na nova NR-10 (10.7.4.2): não iniciar e comunicar." Na tabela, anotar que o texto atual já pede avaliação prévia (10.11.7). Assim o leitor não pensa que a regra só vale a partir de 2027. |
| A2 | 10-05, tabela "O que é novo"; q5, explicação da alternativa correta ("O que muda são treinamentos, procedimentos e regras de compartilhamento") | Não menciona arco elétrico. | Nova NR-10, 10.2.3: aplica-se "nas situações em que haja exposição ao risco de arco elétrico, ainda que não caracterizada a entrada na zona controlada". O Anexo I cria a "Distância segura contra os efeitos do arco elétrico". Pelo 10.11.2.4, a dispensa de EPI contra arco vale só "conforme indicado na análise de risco". | Acrescentar uma linha "Arco elétrico" na tabela. Na q5, dizer que a tabela do Anexo II não mudou, mas que surge outra distância, a do arco, definida por estudo de energia incidente. |
| A3 | 10-05 ("a cessão, paga, da capacidade que sobra (...) 'para a prestação de serviços de telecomunicações'"); glossário `compartilhamento-de-infraestrutura`; q3, alternativa correta | A definição foi cortada no meio. | Nova NR-10, Anexo I: "cessão, a título oneroso, de capacidade excedente da infraestrutura de suporte, para a prestação de serviços de telecomunicações **por prestadoras de outros grupos econômicos**". | Incluir "por prestadoras de outros grupos econômicos" e comentar: a rede de telecom da própria distribuidora, ou de empresa do mesmo grupo, não se encaixa na definição. A trilha de treinamento do técnico da distribuidora deve ser confirmada com a segurança do trabalho. |
| A4 | `Nr10LinhaDoTempo.tsx` e `diagrama_descricao` da 10-05 | O quadro "Hoje" mostra Básico 40 h + SEP 40 h, e o quadro "A partir de jun/2027" mostra "Compartilhamento: 40 h". Lado a lado, parece que o treinamento novo substitui o Básico e o SEP para todos. | Nova NR-10, Quadro I: mantém "1. Básico 40" e "2. Complementar do SEP 40". O 10.9.9 restringe o novo treinamento aos que trabalham "em proximidade (...) com o compartilhamento de infraestruturas do SEP". | Chamar o quadro da direita de "A partir de jun/2027, para quem trabalha com compartilhamento (ocupantes)" e acrescentar "SEP: Básico 40 h + SEP 40 h continuam". |
| A5 | 10-05, "E hoje?" ("item 10.8.8.2 e Anexo III"); q7, explicação da alternativa correta | O 10.8.8.2 é citado como base para exigir o Básico e o SEP. | NR-10 vigente, 10.8.8.2 trata só da **reciclagem** bienal. A exigência do curso SEP está no 10.7.2: "treinamento de segurança, específico em segurança no Sistema Elétrico de Potência (SEP) e em suas proximidades". O Básico está no 10.8.8 e no Anexo III. | Citar 10.7.2, 10.8.8 e Anexo III para os cursos, e 10.8.8.2 e 10.8.8.3 para a reciclagem. Vale avisar que os itens 10.7.1 e 10.7.2 estão no capítulo de alta tensão; para quem só trabalha perto da BT, a exigência do SEP vem da prática das empresas ({{confirmar}}). |
| A6 | `questoes/10-05.json` q4, enunciado | "uma tarefa de telecom que não está no procedimento escrito da empresa" | Nova NR-10, Anexo I: "Atividades rotineiras: atividades habituais, independente da frequência, que fazem parte do processo contínuo". Pelo 10.7.1, a rotineira exige procedimento. Uma tarefa de rotina sem procedimento pede procedimento, não permissão de trabalho. | Escrever "uma tarefa de telecom **não rotineira** (fora da rotina), perto da rede". |
| A7 | 10-05, "Na prática", 1º item | "Você já tem NR-10 com SEP." | `docs/decisoes.md`, D2: "os documentos não citam o nome da empresa nem dados pessoais". | Escrever "Se você já tem NR-10 com SEP, (...)". |
| A8 | Glossário `mt` | "Redes de distribuição como 13,8 kV e 34,5 kV", com a fonte nr10-vigente | A NR-10 vigente não define média tensão. No glossário dela, item 1, AT é "tensão superior a 1000 volts", o que põe 13,8 kV em AT. A nova NR-10 (Anexo I) define MT como "superior a 1000 Volts (...) e igual ou inferior a 36.200 Volts". | Trocar a fonte para nr10-portaria-737, usar essa definição e avisar que, no texto atual, 13,8 kV é "alta tensão". |
| A9 | Glossário `apr` | "Análise preliminar de risco" (APR), com a fonte nr10-portaria-737 | Nenhum dos dois textos da NR-10 usa "APR" nem "preliminar". O Anexo I da nova traz "Análise de risco: avaliação dos riscos potenciais da tarefa, suas causas, consequências e medidas de controle". | Termo "Análise de risco", com a nota "na empresa, muitas vezes chamada de APR". |
| A10 | Glossário `plh` | "Profissional com formação e registro no conselho de classe." | Nova NR-10, 10.8.2: "qualificado pelo Sistema Oficial de Ensino em curso específico na área elétrica e com registro no competente conselho de classe". | Acrescentar "em curso da área elétrica". |
| A11 | Glossário `permissao-de-trabalho` ("vale pelo turno"); tabela da 10-05 ("válida pelo turno (10.7.2.2)") | Validade simplificada. | 10.7.2.2: "validade limitada à duração da atividade, restrita ao turno de trabalho, podendo ser revalidada". | "Vale pela duração da atividade, no máximo o turno; pode ser revalidada." A q4 da 10-05 já está correta. |
| A12 | 09-02, "Quando o relógio começa" ("ou na primeira falha registrada {{fonte:trt7-tr-internet}}"); 09-06, "Por que o chamado vale dinheiro"; 09-01, "Na prática", item 4 | A regra "primeira falha registrada" é atribuída ao TRT-7. | Não está no TR nem nos anexos I a III do TRT-7. O TR, 7.4, conta o prazo de solução "a partir da abertura do chamado". O Anexo I, 5.7, diz que "o CONTRATANTE apurará os tempos de inoperância e indisponibilidade". | Tirar a atribuição. Uma opção: "em outros, pela apuração do próprio contratante (monitoramento), como no TRT-7 (Anexo I, 5.7)". Outra: achar uma fonte que diga "primeira falha". |
| A13 | 09-02, regras 1 e 2 (IF Sul de Minas) | As regras aparecem como alternativas, e o desconto proporcional sem condição. | ANS do IF Sul de Minas, 4.3: desconto "Sempre que forem apurados percentuais de disponibilidade (...) abaixo dos limites mínimos" (SLA de 98%, 4.1). 4.4: "Ficam **também** estabelecidos limites de tolerância (...) glosas específicas". | Dizer que nesse ANS o Dc só vale abaixo do SLA (e aí conta todo o Ti), e que as faixas de 50% e 100% vêm **além** dele. |
| A14 | `questoes/09-02.json` q1 (R$ 4.320, 100 min → R$ 10,00) | O enunciado não diz se o SLA foi descumprido nem se o desconto vale para todo minuto. | Com a regra do IF Sul de Minas (4.3, só abaixo do mínimo), 100 min dão D = 99,77%. Com o padrão da calculadora do app (`descontoSoSeDescumprir: true`, SLA 99,7%), o resultado é **R$ 0,00** (o próprio `calculo.test.ts`, linhas 50 a 52, testa isso). | Acrescentar ao enunciado: "o contrato desconta todo minuto parado, mesmo dentro do SLA". Ou montar um caso de descumprimento. |
| A15 | 09-06 ("trata pedidos de reparo de concessionárias de serviço público como demanda urgente"); observação de `anatel-rgc-manual` em fontes.json | O texto restringe a regra e não diz o que ela garante. | Manual do RGC, 2.5.1: são urgentes as demandas sobre "reparo, interrupção, suporte técnico e o regular funcionamento do serviço", de qualquer consumidor. Também são urgentes as demandas de "serviços de utilidade pública, independentemente do seu conteúdo", o que inclui "Concessionárias (...) de Serviços Públicos". O efeito é o atendente humano 24 h (art. 15, IV) e os prazos do art. 10. | "No Manual Operacional do RGC, todo pedido de reparo é demanda urgente. Qualquer demanda de concessionária de serviço público também é. Isso garante atendente humano 24 h (art. 15, IV)." |
| A16 | 09-06 ("Uma política pública baseada no ITIL 4 define: (...) Problema (...) Requisição"); glossário `requisicao` (fonte tjba) | Atribui ao TJBA definições que ele não traz. | O Capítulo II da política do TJBA define só Incidente, Incidente Grave, Solução de Contorno, Restauração, Escalonamento e Itens de Configuração. Problema só aparece pelo "Gerenciamento de Problemas: (...) incidentes recorrentes ou de alto impacto (...) causas-raiz". Requisição não é definida. | "A política do TJBA define incidente, solução de contorno e escalonamento; problema e requisição seguem o ITIL 4." Para requisição, usar outra fonte ou marcar como vocabulário ITIL. |
| A17 | 09-03, tabela (o provisório só com o fiscal técnico, o definitivo só com o gestor); `GestorFiscal.tsx`; glossário `fiscal-tecnico`, `fiscal-administrativo` e `gestor-do-contrato`; observação de `decreto-11246` | O fiscal administrativo aparece sem recebimento, e o definitivo só com o gestor. | Decreto 11.246, art. 25, com a redação do Decreto 13.031, de 17/06/2026: "O recebimento provisório ficará a cargo do fiscal técnico, administrativo ou setorial, e o recebimento definitivo (...) do gestor do contrato, do gestor setorial ou da comissão designada". Art. 23, VII: o fiscal administrativo faz o provisório "de caráter administrativo". | Incluir o art. 25 e o 23, VII na tabela, no diagrama e no glossário. A q1 da 09-03 continua certa entre as opções que oferece. |
| A18 | 09-03 ("Em obra (...) o mínimo é de 5 anos (art. 140, § 6º). É a lógica do aceite de obra óptica"); q5 | A regra dos 5 anos é aplicada a qualquer obra óptica. | Lei 14.133, art. 140, § 6º: "Em se tratando de obra (...) funcionalidade da construção, da reforma (...) do bem imóvel". O § 2º, que vale para obra ou serviço, fala em responsabilidade "nos limites estabelecidos pela lei ou pelo contrato". | Explicar que o § 6º é para obra em imóvel. Rede óptica contratada como serviço segue o § 2º e o contrato. Na empresa privada vale o Código Civil (art. 618, não conferido aqui) e a garantia contratual, a confirmar com o jurídico. |
| A19 | 09-05 ("Com os limites da TIA (cabo externo 0,5 dB/km, par de conectores 0,75 dB, emenda 0,3 dB) {{fonte:fluke-tia5683d}}"); q2, fontes; observação de `fluke-tia5683d` ("emenda 0,3 dB") | O artigo da Fluke é usado para sustentar os três limites. | O artigo da Fluke só traz o "standard-grade loss value of 0.75 dB". Os outros dois estão na FOA: emenda "0.3 max per EIA/TIA 568" e cabo "0.5 dB/km (...) for outside plant max per EIA/TIA 568". | Citar `foa-loss-budget` para 0,3 dB e 0,5 dB/km e corrigir a observação da Fluke em fontes.json. |
| A20 | 09-05, tabela, linha "Par de conectores", coluna "Comum em contrato: até 0,5 dB" | Valor sem fonte. | A Fluke cita ≤ 0,50 dB (monomodo) só para o par "reference-grade to standard-grade", isto é, o cordão de teste ligado ao enlace (ISO/IEC 14763-3). Não é valor de contrato. | Tirar o valor ou trocar por {{confirmar}}. Outra saída: explicar que esse é o limite para as pontas medidas com cordão de referência. |
| A21 | 09-05 ("Se a perda medida for maior que isso, algo está errado.") | A frase ignora a incerteza da medição. | FOA: "If the measured loss exceed the calculated loss by a significant amount (remembering the inherent uncertainty...)". No exemplo da FOA, 8,2 dB medidos contra 8,0 dB de orçamento: "no reason to reject this fiber". | "Se passar com folga (além da incerteza da medição), investigue trecho a trecho. O critério de aceite é o do contrato." |
| A22 | `questoes/09-05.json` q8, enunciado | "uma fusão aparece com +0,05 dB, como se ganhasse luz" | Yokogawa: "The loss of event 1 is -2 dB, which looks like the light is amplified". Na tabela de eventos do OTDR, o ganho aparente aparece como perda **negativa**. | "aparece com perda de −0,05 dB (como se ganhasse luz)". |
| A23 | Glossário: `as-built` (fonte lei-14133), `orl` (foa-loss-budget), `sor` (yokogawa), `memoria-de-calculo` (ifsuldeminas-ans); fonte da q6 da 09-02 | As fontes citadas não sustentam o termo. | "As built" não aparece na Lei 14.133 nem no Decreto 11.246. A página da FOA não fala de ORL. A da Yokogawa não fala de .SOR. O ANS do IF Sul de Minas fala em "relatório de disponibilidade" e "cálculos dos descontos", não em memória de cálculo. | Trocar por fontes que tratem do termo ou marcar como boa prática, sem fonte. |
| A24 | `fontes.json`, `trt7-tr-internet`, campo url | `https://www.trt7.jus.br/artefatos_tic/2022/` | Retorna HTTP 403 (listagem de diretório) em 07/11/2026. | Usar o link direto do Anexo I: `https://www.trt7.jus.br/artefatos_tic/2022/2022.TIC028.CITIC%20-%20Servi%C3%A7o%20de%20acesso%20a%20internet%20_%20nova%20contrata%C3%A7%C3%A3o%20%28FL%29/2022.TIC028.CITIC.TR.ANEXOI%20-%20Servi%C3%A7o%20de%20acesso%20a%20internet.pdf`. Considerar citar também o TR principal (itens 7.4 e 14.1). |
| A25 | 10-01 ("NBR 15214:2005") e `fontes.json`, `abnt-nbr15214-2005` | A edição de 2005 é tratada como vigente, e o link aponta para a cópia do SEESP. | A busca no catálogo da Target lista a edição de **05/2024 como vigente**, e a de 2005 provavelmente foi substituída (o catálogo da ABNT não foi conferido). A cópia do SEESP traz em todas as páginas "uso exclusivo de [nome] [CPF]": é a cópia licenciada de uma norma paga, com dado pessoal de terceiro. | Escrever "edição de 2005 (substituída em 2024; valor a confirmar na edição vigente)". Não vincular a cópia do SEESP; citar o registro da norma no catálogo da ABNT. |
| A26 | `src/ferramentas/disponibilidade/calculo.ts`, `formatarMinutos` (linhas 101 a 107) | Arredonda os minutos depois de separar as horas. | Refeito em Node com cópia fiel da função: 119,6 min → "**1 h 60 min**", 179,5 → "2 h 60 min", 239,7 → "3 h 60 min". Exemplo real: SLA de 99,723% num mês de 30 dias (119,664 min). O erro aparece no passo "parada permitida" da memória de cálculo. | Com h > 0, arredondar o total para minutos inteiros antes de dividir: `t = Math.round(min); h = Math.floor(t/60); m = t - 60*h`. Acrescentar um teste com 119,6. |

## Sugestões

- **S1.** 10-01, tabela: trocar "De 10 a 15 kV" por "de 10 kV a menos de 15 kV", que é o "≥10 e <15" do Anexo II. Idem para 30 a 36 kV. Uma rede de 15 kV nominal já cai em "≥15 e <20", com Rc de 1,40 m.
- **S2.** 10-01, parágrafo da média tensão: trocar "uma rede de 15 kV" por "rede de 13,8 kV (classe 15 kV)". A Tabela 1 da Cemig diz "1 < U ≤ 15" → 1500 mm; a NBR 15214 e a Neoenergia trazem o mesmo valor.
- **S3.** 10-01, passo 4: "Poucos centímetros bastam" só vale para cabo perto de 0,60 m. Sugestão: "o alcance do braço e da ferramenta cruza com facilidade os 0,70 m".
- **S4.** 10-01, BT multiplexada: dá para reforçar o texto com a nova NR-10. O Anexo I diz "Partes vivas: (...) incluindo o condutor neutro", e o 10.6.2 separa "isolação das partes vivas" (a) de "barreiras ou invólucros" (b). Vale lembrar que, no cabo multiplexado, o neutro mensageiro costuma ser nu; confirmar na norma da distribuidora.
- **S5.** 10-05, "Pontos de data": citar também o art. 3º (a alínea "e" do 10.6.4 só entra 1 ano após a vigência, para instalações existentes) e o art. 4º (revoga as Portarias 598/2004 e 508/2016).
- **S6.** 10-05, tabela: citar o 10.7.1.1 (aprovação por PLH), o 10.7.4.2 ("anormalidade que afete a segurança dos trabalhadores") e o 10.9.11, d ("acidente grave ou fatal").
- **S7.** q3 da 10-05, alternativa "Equipamento segregado": a definição usada vem do texto vigente (item 9). A nova NR-10 não define "segregado".
- **S8.** 09-01 e q2 da 09-01: trocar "a base que a Anatel usa no regulamento do consumidor" por "no Manual Operacional do RGC (item 4.6.3), 'considerando-se 30 (trinta) dias'".
- **S9.** 09-01, "O que conta como parado": o TJAL também exige duas amostragens seguidas para a perda de pacotes (4.9.1.1). E escreve "2% (um por cento)", outro exemplo de número que não bate com o extenso.
- **S10.** 09-01, "Na prática", item 2: o TRT-7 serve de exemplo. Limita a parada a "5,04 horas por mês" (Anexo I, 1.2), o que equivale a 30 dias, mas apura do "primeiro dia" às "vinte e quatro horas do último dia do mês" (5.7).
- **S11.** 09-02: incluir a regra do TRT-7 (TR, 14.1): abaixo de 99,3%, desconto de "0,015% (...) para cada minuto de indisponibilidade". É 6,5 vezes a regra proporcional; com 300 min e R$ 3.000, dá R$ 135,00. Mostra bem que "a regra muda o valor".
- **S12.** 09-02 e q5 da 09-02, SUDAM: a manifestação só resume o TR 7.3.4 e não define V, D nem Vd. Escrever "se D for a disponibilidade do mês, em %". O SLA da SUDAM é de 98% ao mês.
- **S13.** 09-02, manutenção no TJAL: o 4.1.7 fala em paradas "agendadas, em comum acordo, com antecedência mínima de 15 (quinze) dias", não só em aviso. O mesmo TR tem outra regra no 4.9.4.3 (aviso de 7 dias, até 24 h por ano), mais um exemplo de contrato com regras que se contradizem.
- **S14.** 09-03: reforçar a frase "os contratos dela seguem o Código Civil" com a Lei 8.987/1995, art. 25, § 2º (contratos da concessionária com terceiros "reger-se-ão pelo direito privado"; não conferido no Planalto). Lembrar também que distribuidora estatal segue a Lei 13.303/2016: pela Lei 14.133, art. 1º, § 1º, "Não são abrangidas (...) as sociedades de economia mista".
- **S15.** 09-05, IOR: dizer "a ficha da Corning **SMF-28 Ultra**" em vez de "fibra comum". O valor muda conforme o fabricante e a versão da ficha.
- **S16.** Glossário `orl`: trocar "por reflexões" por "por reflexões e retroespalhamento".
- **S17.** Glossário `indisponibilidade`: trocar "ficou parado" por "ficou fora do ar ou degradado (latência, perda, vazão), conforme o contrato".
- **S18.** 09-06: no TJBA, "prazo estourando" é gatilho de escalonamento em geral (Seção IV, "risco de descumprimento dos níveis de serviço"). O hierárquico é para "impacto relevante (...), necessidade de decisão gerencial ou (...) Incidente Grave". Vale dizer também que a política do TJBA é interna e que o uso com fornecedor é uma adaptação.
- **S19.** q3 da 09-06: aumentar a velocidade costuma exigir aditivo contratual (art. 23, I). Dá para citar isso na explicação.
- **S20.** q7 da 09-06: trocar "Um encerramento sem conferir para o relógio do SLA antes da hora" por "Encerrar sem conferir faz o relógio do SLA parar antes da hora".
- **S21.** `DisponibilidadeBarra.tsx`: trocar o rótulo "min parados" por "min permitidos". A `diagrama_descricao` da 09-01 fala em uma barra, mas são três, e deveria avisar que as fatias estão ampliadas 20 vezes.
- **S22.** `calculo.ts`: o ano é fixo em 365 dias (ano bissexto tem 527.040 min). O passo "Paradas que contam (Ti)" mostra `tiContado` mesmo quando o valor é limitado a To. E não dá para combinar a regra proporcional com as faixas, como faz o IF Sul de Minas.
- **S23.** `fontes.json`: a busca indica que o título real da AN3060 é "Guidance for OTDR Assessment of Fusion Spliced Single-mode Fibers" (2014); não conferido. O título completo da DIS-NOR-056 é "Compartilhamento de Infraestrutura de Rede Elétrica com Redes de Telecomunicações" (rev. 01, 22/02/2022).
- **S24.** 09-03, tabela, e glossário `gestor-do-contrato`: trocar "abre o processo de sanção" por "pede a abertura do processo de sanção (art. 21, X)", para ficar coerente com E2.

## Não conferidos (e por quê)

| # | O quê | Onde aparece | Por quê |
| --- | --- | --- | --- |
| N1 | Corning AN3060: fusão "até 0,10 dB na média dos dois sentidos" como exigência comum; glossário `mapa-de-fusao` (fonte AN3060) | 09-05, tabela; q3 da 09-05; glossário | **Bloqueado.** www.corning.com responde 403 "Access Denied" (curl e WebFetch). Pista da busca: a nota trata da avaliação de emendas por OTDR (2014), e a busca não achou o valor de 0,10 dB nem definição de mapa de fusão. Provavelmente é preciso outra fonte. |
| N2 | Corning SMF-28 Ultra PI-1424: IOR 1,4676 (1310 nm) e 1,4682 (1550 nm) | 09-05; q4 da 09-05; glossário `ior` | **Bloqueado.** csmedia.corning.com não resolve nesta sessão (fora da rede liberada) e www.corning.com responde 403. Pista da busca: a ficha atual traz os mesmos valores, e fichas antigas trazem 1,4691/1,4696. Para conferir, é preciso liberar csmedia.corning.com nas configurações de rede da sessão ou baixar a ficha à mão. |
| N3 | NBR 15214:2024: se os 600 mm mudaram | 10-01 | Texto não público; as páginas da Target e da normas.com.br respondem 403. |
| N4 | Lei 8.987/1995, art. 25, § 2º | S14 | planalto.gov.br não respondeu. O texto veio só de resultados de busca. |
| N5 | Código Civil, art. 618 | A18 | Não consultado; citado como pista. |
| N6 | Título literal da Energisa NDU-009 ("Critérios para compartilhamento de infraestrutura") | fontes.json | Não aparece no texto extraído (a capa deve ser imagem). Os valores de 600 mm foram conferidos. |

## Conferidos (lista curta por arquivo)

- **10-01**
  - Tabela do Anexo II (BT 0,20/0,70; ≥10 e <15 kV 0,38/1,38; ≥30 e <36 kV 0,58/1,58): igual no texto vigente e na Portaria 737, com as 19 faixas comparadas uma a uma.
  - Glossário da NR-10 vigente: item 28 (citação literal), itens 30 e 31 ("não segregada") e item 9 ("por meio de invólucro ou barreira").
  - NR-10 vigente: 10.6.2 ("procedimentos específicos"); legenda do Anexo II ("restrita a trabalhadores autorizados"); Figura 2 e a superfície isolante (SI); 10.6.3 ("suspensos de imediato"); 10.8.8.1 (a empresa concede a autorização); 10.8.7 e 10.8.8 (exame de saúde e treinamento).
  - Nova NR-10, 10.6.2: isolação é proteção básica.
  - 600 mm entre telecom e BT em NBR 15214:2005 (8.2, Tabela 1), Cemig ND-6.6 (seção 7, Tabela 1), Energisa NDU-009 v4.0 (8.2, Tabela 01, e 8.3, Tabela 02) e Neoenergia DIS-NOR-056 (6.2.2, Tabela 2). Nenhuma delas diferencia BT nua de multiplexada.
  - 1500 mm entre telecom e MT até 15 kV (Cemig, NBR, Neoenergia); 1,50 − 1,38 = 0,12 m.
- **10-05**
  - Portaria de 29/05/2026, DOU de 01/06/2026; art. 5º (1 ano); retificação de 24/06/2026, que passou as alíneas do 10.8.4 de "a" e "d" para "d" e "e".
  - 10.14.1; Quadro I (40 h para compartilhamento; 8 h para específico e pontual); 10.9.4, 10.9.5, 10.9.8 e 10.9.9; 10.8.4, e (24 h).
  - 10.9.13 (prática presencial); 10.9.10 (16 h bienal); 10.9.11 (90 dias, acidente).
  - 10.7.1 e 10.7.1.1; 10.7.2 e 10.7.2.2; 10.7.4 e 10.7.4.2; 10.7.9.
  - Anexo II sem mudança; Anexo III, item 6 (redes de telecom e de energia, iluminação pública, distâncias, indução, descargas, sinalização, resgate).
  - Texto vigente: Básico 40 h, SEP 40 h, reciclagem bienal sem carga mínima (10.8.8.2 e 10.8.8.3).
- **09-01**
  - Fórmula D (TRT-7, Anexo I, 5.3; IF Sul de Minas, 4.2); 99,3% e 5,04 h (TRT-7, 1.2); 43.200 min (Manual do RGC, 4.6.3).
  - Todos os valores da tabela refeitos: 432; 302,4; 216; 129,6; 43,2 min; 87,6; 61,3; 43,8; 26,3; 8,76 h; 8 h 46 min; 44.640; 525.600.
  - Degradação no TJAL (4.9.2.1, 4.9.1.1, 4.1.9) e "99,5% (noventa e nove vírgulas sete por cento)" (4.1.4).
- **09-02**
  - Dc (IF Sul de Minas, 4.3); faixas de 90% → 50% e 80% → 100% (4.4); Vd e teto de 20% (SUDAM, 2.2).
  - Exclusões no TJAL: 4.1.7 (2 por ano, 4 h, 15 dias), 4.1.6 (menos de 3 h) e 4.9.3.1.4.1 e 4.1.8 (falta de energia no cliente); relógio a partir do chamado (4.1.5.1.1 e 4.9.4.1).
  - Exemplo refeito: 129,6 min; 99,31%; R$ 20,83; R$ 11,83.
  - Decreto, art. 23, I (glosas); fórmula de ressarcimento do RGC (Manual, 4.6.3).
- **09-03**
  - Lei 14.133: art. 8º, § 3º (nomes "fiscais e gestores"); art. 117, §§ 1º e 2º (citações literais); art. 140, I, a e b, § 2º e § 6º; art. 118 (preposto); art. 1º (Administração Pública).
  - Decreto: art. 21, I, II, IV, IX e X; art. 22, I a IV, VII e X; art. 23, I.
- **09-05**
  - FOA: fórmula do orçamento; 0,15 dB por fusão; limites TIA de 0,75 dB, 0,3 dB e 0,5 dB/km; exigência de teste de perda de inserção.
  - Fluke: 0,75 dB por par de conectores.
  - Yokogawa: média dos dois sentidos e ganho aparente (gainer).
  - 9,3 dB e todas as contas das alternativas (6,0; 7,5; 11,1; 1,5 dB); Lei 14.133, art. 140.
- **09-06**
  - TJBA: definições de incidente, solução de contorno e escalonamento; escalonamento funcional e hierárquico (Seção IV); problemas = incidentes recorrentes e causa-raiz; ITIL 4.
  - TJAL: relógio a partir do chamado.
- **Questões**: as 57 têm exatamente uma correta, e a correta é sempre a única defensável entre as opções. Todas as contas foram refeitas e conferem. As explicações das alternativas erradas estão certas, exceto E2, A2 e S20.
- **Glossário, 28 de 40 conferidos sem reparo**: zona-de-risco, zona-controlada, zona-livre, rr, rc, trabalho-em-proximidade, sep, infraestrutura-de-suporte, bt, sla, disponibilidade, indisponibilidade, glosa, gestor-do-contrato, fiscal-tecnico, fiscal-administrativo, recebimento-provisorio, recebimento-definitivo, incidente, problema, solucao-de-contorno, escalonamento, itil, rgc, otdr, db, orcamento-de-perda, ganho-aparente. Os três termos de papéis (gestor e fiscais) estão certos, mas incompletos; ver A17. Outros 10 estão em A3, A8, A9, A10, A11, A16 e A23, e 2 em N1 e N2.
- **fontes.json**: títulos, organizações e observações conferem, exceto TRT-7 (URL, A24), Fluke (observação, A19), RGC (observação, A15), NBR (edição, A25) e as duas Corning (N1, N2). Todas as outras URLs responderam em 07/11/2026. Algumas falharam na primeira tentativa por instabilidade do proxy e responderam na seguinte.
- **calculo.ts e calculo.test.ts**: fórmulas certas. D = (To − Ti)/To × 100; permitido = To × (100 − SLA)/100; Dc = Cm × Ti/To, aplicado só abaixo do SLA quando a opção está marcada, igual ao IF Sul de Minas; "só o excesso" marcada como sem fonte; faixas com "<", como em "inferiores a"; teto pelo mínimo; tolerância de 1e-9 no limite. Os valores esperados dos testes conferem: 432; 302,4; 216; 129,6; 43,2; 525,6; 44.640; 99,3056%; R$ 20,83; R$ 11,83; R$ 10,00; faixas 1000, 2000 e 0; teto de 500 para 200.
- **Diagramas**
  - Nr10LinhaDoTempo: datas (01/06/2026, 24/06/2026, jun/2027) e cargas horárias conferem; enquadramento em A4.
  - DisponibilidadeBarra: 43,2, 129,6 e 216 min conferem; fatias de 6,8, 20,4 e 34 px, ou seja, 20 vezes, como avisa o desenho.
  - ZonasPoste: escala e valores (0,20, 0,60 e 0,70 m) conferem; a geometria está errada (E1).

## Fontes consultadas (todas em 07/11/2026)

- NR-10 vigente e Portaria MTE 737/2026 com a retificação (gov.br), Lei 14.133 e Decreto 11.246 atualizados (Câmara dos Deputados), política de incidentes do TJBA (v1.0, 18/03/2026), Cemig ND-6.6 (12/2024), Neoenergia DIS-NOR-056 rev. 01: cópias locais dos textos oficiais, com as URLs de `content/fontes.json`.
- NBR 15214:2005: cópia licenciada que traz dados pessoais de terceiro; usada só para conferir o valor, sem link público (ver A25).
- Baixados na revisão: Energisa NDU-009 v4.0 (anexo de contrato publicado pela UFGD), TRT-7 2022.TIC028 (TR e Anexos I a III, pelos links diretos), ANS do IF Sul de Minas (Pregão 20/2019), TR do TJAL, manifestação da SUDAM de 27/07/2026, Manual Operacional do RGC v4 (jun/2025), páginas da FOA (loss budget), da Fluke (TIA-568.3-D) e da Yokogawa (medição bidirecional).
- Corning AN3060 e PI-1424: bloqueadas (403 e falha de DNS).
- Buscas na web, usadas só como pista: edição 05/2024 da NBR 15214, valores e título das fichas Corning, Lei 8.987 (art. 25, § 2º).
- Arquivos do repositório: `docs/pesquisa.md`, `docs/decisoes.md` e os prints da Fase 2 (para conferir a geometria do E1).

## O que foi feito com cada item (07/11/2026)

| Item | Resolução |
| --- | --- |
| E1 | `ZonasPoste` redesenhado: ZR e ZC são faixas de ±0,20 m e ±0,70 m ao longo de todo o condutor, inclusive junto ao poste; a cota de 0,60 m fica dentro da faixa; legenda "fora das faixas: zona livre"; descrição do diagrama atualizada. |
| E2 | 09-03 q2 e q6: "o gestor pede a abertura do processo de sanção (art. 21, X), conduzido por comissão ou pelo setor competente". Tabela, diagrama e glossário seguem a mesma redação (S24). |
| A1 | 10-05 q8 e tabela: a obrigação já existe no texto atual (10.6.5, 10.13.4 c, 10.11.7) e continua na nova (10.7.4.2). |
| A2 | 10-05: nova linha "Arco elétrico" (10.2.3, distância segura contra o arco, 10.11.2.4); q5 cita a distância contra o arco. |
| A3 | Definição completa ("por prestadoras de outros grupos econômicos") na lição, na q3 e no glossário, com o comentário sobre a rede da própria distribuidora. |
| A4 | `Nr10LinhaDoTempo`: "Básico 40 h + SEP 40 h" continuam; o de compartilhamento aparece como alternativa, com nota (10.9.4, 10.9.5 e 10.9.9). |
| A5 | 10-05 "E hoje?" e q7: 10.8.8 e Anexo III (Básico), 10.7.2 e Anexo III (SEP), 10.8.8.2 e 10.8.8.3 (reciclagem), com "confirmar na empresa" para quem só trabalha perto da BT. |
| A6 | 10-05 q4: "tarefa não rotineira (fora da rotina)". |
| A7 | "Se você já tem NR-10 com SEP, ...". |
| A8 a A11 | Glossário: MT pela nova NR-10 (e aviso de que no texto atual é alta tensão); "Análise de risco" (na empresa, APR); PLH "em curso da área elétrica"; permissão de trabalho "pela duração da atividade, no máximo o turno, pode ser revalidada" (também na tabela da 10-05). |
| A12 | "Primeira falha registrada" removida de 09-01, 09-02 e 09-06; no lugar, a apuração pelo próprio contratante (TRT-7, Anexo I, 5.7). |
| A13 | 09-02: no ANS do IF Sul de Minas, o Dc só vale abaixo do SLA de 98%, e as faixas vêm além dele. A calculadora ganhou a opção "somar também a glosa por faixas". |
| A14 | 09-02 q1: "o contrato desconta todo minuto parado, mesmo dentro do SLA". |
| A15 | 09-06 e `fontes.json`: todo pedido de reparo é demanda urgente, e qualquer demanda de concessionária também; atendente humano 24 h (art. 15, IV). |
| A16 | Nova fonte: Portaria SETIM 62/2026 do TJBA (política de requisições, ITIL 4), que define requisição, incidente e problema (art. 3º). |
| A17 | Art. 25 e art. 23, VII na tabela da 09-03, no diagrama, na q1 e no glossário. |
| A18 | 09-03 e q5: § 2º para obra ou serviço; os 5 anos do § 6º só para obra de imóvel; empresa privada segue o contrato ("confirmar na empresa"). |
| A19 | 09-05: 0,3 dB e 0,5 dB/km citados pela FOA; observação da Fluke corrigida. |
| A20 | Coluna "comum em contrato" trocada pelas especificações "razoáveis" da FOA (página de entrega da obra), com fonte. |
| A21 | "Se passar com folga, além da incerteza da medição, investigue; o critério de aceite é o do contrato." |
| A22 | 09-05 q8: "perda de −0,05 dB". |
| A23 | Novas fontes: FOA (reflectância e ORL; entrega da obra; guia de restauração), Yokogawa AQ7932 (.sor: GR-196 e SR-4731) e TJAL 9.2 ("memórias de cálculo dos descontos"). |
| A24 | Links diretos do TR e do Anexo I do TRT-7. |
| A25 | NBR 15214 citada como edição de 2005, substituída em 2024, sem o link da cópia com dados de terceiro (também em `docs/pesquisa.md`). |
| A26 | `formatarMinutos` arredonda antes de separar as horas; testes com 119,6, 179,5, 239,7 e 59,96 min. |
| S1 a S24 | Aplicadas, com duas exceções. S14: entrou a Lei 13.303 (conferida no art. 1º, § 1º, da Lei 14.133), mas não a Lei 8.987, que não foi conferida no texto oficial. S22: a calculadora ganhou ano bissexto, Ti limitado ao período na memória de cálculo e as regras "taxa por minuto" (TRT-7) e "proporcional + faixas" (IF Sul de Minas). |
| N1 | Resolvido com a FOA: especificação de emenda (média de 0,1 dB, rejeitar acima de 0,2 dB) e medição nos dois sentidos com média. A AN3060 deixou de ser citada direto. |
| N2 | O site da Corning segue bloqueado; os valores de IOR foram conferidos no trecho indexado das fichas de fev/2024 e jul/2025, e isso está anotado na fonte. A lição diz "SMF-28 Ultra, por exemplo" e pede conferir a ficha do cabo comprado. |
| N3 a N6 | Seguem como "confirmar": edição de 2024 da NBR, Lei 8.987, Código Civil e título da NDU-009. |
