// Mapa: id do diagrama (cabeçalho da lição) -> componente SVG.
// O validador de conteúdo confere se o id usado na lição existe aqui.
import type { ComponentType } from 'react';
import type { PropsDiagrama } from './Diagrama';
import { ZonasPoste } from './ZonasPoste';
import { Nr10LinhaDoTempo } from './Nr10LinhaDoTempo';
import { DisponibilidadeBarra } from './DisponibilidadeBarra';
import { GlosaFluxo } from './GlosaFluxo';
import { GestorFiscal } from './GestorFiscal';
import { Escalonamento } from './Escalonamento';
import { RelatorioAceite } from './RelatorioAceite';
import { FibraReflexao } from './FibraReflexao';
import { FibraCamadas } from './FibraCamadas';
import { SmMm } from './SmMm';
import { RaiosCurvatura } from './RaiosCurvatura';
import { EspectroBandas } from './EspectroBandas';
import { CausasPerda } from './CausasPerda';
import { EscadaDbm } from './EscadaDbm';
import { Referencia1Cordao } from './Referencia1Cordao';
import { OtdrComoEnxerga } from './OtdrComoEnxerga';
import { OtdrEventos } from './OtdrEventos';
import { GravacaoCabo } from './GravacaoCabo';
import { CoresBrTia } from './CoresBrTia';
import { TubosPiloto } from './TubosPiloto';
import { UpcApc } from './UpcApc';
import { LuzInvisivel } from './LuzInvisivel';
import { BancadaLimpa } from './BancadaLimpa';
import { PreparoFusao } from './PreparoFusao';
import { DentroMaquina } from './DentroMaquina';
import { EstimadoRealFusao } from './EstimadoRealFusao';
import { AnatomiaFtth } from './AnatomiaFtth';
import { SplittersBalanceados } from './SplittersBalanceados';
import { OrcamentoPon } from './OrcamentoPon';
import { ServicosPrazos } from './ServicosPrazos';
import { PropriaOperadora } from './PropriaOperadora';
import { PilhaProtocolos } from './PilhaProtocolos';
import { GooseMulticast } from './GooseMulticast';
import { AnelNoves } from './AnelNoves';
import { MeiosTransporte } from './MeiosTransporte';
import { CaminhoNr35 } from './CaminhoNr35';
import { CorteCabo } from './CorteCabo';
import { TiposCabo } from './TiposCabo';
import { ZonasUtmRoraima } from './ZonasUtmRoraima';
import { FeicaoETabela } from './FeicaoETabela';
import { FiltrarXSelecionar } from './FiltrarXSelecionar';
import { DetentorOcupante } from './DetentorOcupante';
import { AnatomiaPoste } from './AnatomiaPoste';
import { VersoesQgis } from './VersoesQgis';
import { FormatosArquivo } from './FormatosArquivo';
import { CicloDeEdicao } from './CicloDeEdicao';
import { CicloQfield } from './CicloQfield';
import { PlaquetaIdentificacao } from './PlaquetaIdentificacao';
import { OndeFicaCadaCoisa } from './OndeFicaCadaCoisa';
import { AlturasAoSolo } from './AlturasAoSolo';
import { FluxoFiscalizacao } from './FluxoFiscalizacao';
import { CalendarioRiscosRr } from './CalendarioRiscosRr';

export const DIAGRAMAS: Record<string, ComponentType<PropsDiagrama>> = {
  'servicos-prazos': ServicosPrazos,
  'propria-x-operadora': PropriaOperadora,
  'pilha-protocolos': PilhaProtocolos,
  'goose-multicast': GooseMulticast,
  'anel-noves': AnelNoves,
  'meios-transporte': MeiosTransporte,
  'caminho-nr35': CaminhoNr35,
  'corte-cabo': CorteCabo,
  'tipos-cabo': TiposCabo,
  'zonas-poste': ZonasPoste,
  'nr10-linha-do-tempo': Nr10LinhaDoTempo,
  'disponibilidade-barra': DisponibilidadeBarra,
  'glosa-fluxo': GlosaFluxo,
  'gestor-fiscal': GestorFiscal,
  'escalonamento': Escalonamento,
  'relatorio-aceite': RelatorioAceite,
  'fibra-reflexao': FibraReflexao,
  'fibra-camadas': FibraCamadas,
  'sm-mm': SmMm,
  'raios-curvatura': RaiosCurvatura,
  'espectro-bandas': EspectroBandas,
  'causas-perda': CausasPerda,
  'escada-dbm': EscadaDbm,
  'referencia-1-cordao': Referencia1Cordao,
  'otdr-como-enxerga': OtdrComoEnxerga,
  'otdr-eventos': OtdrEventos,
  'gravacao-cabo': GravacaoCabo,
  'cores-br-tia': CoresBrTia,
  'tubos-piloto': TubosPiloto,
  'upc-apc': UpcApc,
  'luz-invisivel': LuzInvisivel,
  'bancada-limpa': BancadaLimpa,
  'preparo-fusao': PreparoFusao,
  'dentro-maquina': DentroMaquina,
  'estimado-real-fusao': EstimadoRealFusao,
  'anatomia-ftth': AnatomiaFtth,
  'splitters-balanceados': SplittersBalanceados,
  'orcamento-pon': OrcamentoPon,
  'zonas-utm-roraima': ZonasUtmRoraima,
  'feicao-e-tabela': FeicaoETabela,
  'filtrar-x-selecionar': FiltrarXSelecionar,
  'detentor-ocupante': DetentorOcupante,
  'anatomia-poste': AnatomiaPoste,
  'versoes-qgis': VersoesQgis,
  'formatos-arquivo': FormatosArquivo,
  'ciclo-de-edicao': CicloDeEdicao,
  'ciclo-qfield': CicloQfield,
  'plaqueta-identificacao': PlaquetaIdentificacao,
  'onde-fica-cada-coisa': OndeFicaCadaCoisa,
  'alturas-ao-solo': AlturasAoSolo,
  'fluxo-fiscalizacao': FluxoFiscalizacao,
  'calendario-riscos-rr': CalendarioRiscosRr,
};


