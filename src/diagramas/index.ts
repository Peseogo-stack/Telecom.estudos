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
import { ZonasUtmRoraima } from './ZonasUtmRoraima';
import { FeicaoETabela } from './FeicaoETabela';
import { FiltrarXSelecionar } from './FiltrarXSelecionar';

export const DIAGRAMAS: Record<string, ComponentType<PropsDiagrama>> = {
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
};


