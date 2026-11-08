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
};
