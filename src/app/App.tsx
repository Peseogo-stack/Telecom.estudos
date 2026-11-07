import { HashRouter, Route, Routes } from 'react-router-dom';
import { ProvedorEstado } from './EstadoApp';
import { Layout } from './Layout';
import { Hoje } from '../telas/Hoje';
import { Modulo, Trilha } from '../telas/Trilha';
import { Licao, Quiz } from '../telas/Licao';
import { Revisao } from '../telas/Revisao';
import { Ferramentas } from '../telas/Ferramentas';
import { TelaDisponibilidade } from '../ferramentas/disponibilidade/TelaDisponibilidade';
import { TelaOrcamento } from '../ferramentas/optica/TelaOrcamento';
import { TelaConversor } from '../ferramentas/optica/TelaConversor';
import { TelaCores } from '../ferramentas/cores/TelaCores';
import { TelaLeitorOtdr } from '../ferramentas/otdr/TelaLeitorOtdr';
import { Glossario } from '../telas/Glossario';
import { Busca } from '../telas/Busca';
import { Caderno } from '../telas/Caderno';
import { Plano } from '../telas/Plano';
import { Ajustes } from '../telas/Ajustes';
import { NaoEncontrado } from '../telas/NaoEncontrado';

// HashRouter: os endereços ficam como .../Telecom.estudos/#/trilha.
// Assim o GitHub Pages (que só serve arquivos) sempre entrega o index.html.
export function App() {
  return (
    <ProvedorEstado>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Hoje />} />
            <Route path="/trilha" element={<Trilha />} />
            <Route path="/trilha/:id" element={<Modulo />} />
            <Route path="/licao/:id" element={<Licao />} />
            <Route path="/licao/:id/questoes" element={<Quiz />} />
            <Route path="/revisao" element={<Revisao />} />
            <Route path="/ferramentas" element={<Ferramentas />} />
            <Route path="/ferramentas/disponibilidade" element={<TelaDisponibilidade />} />
            <Route path="/ferramentas/orcamento" element={<TelaOrcamento />} />
            <Route path="/ferramentas/conversor" element={<TelaConversor />} />
            <Route path="/ferramentas/cores" element={<TelaCores />} />
            <Route path="/ferramentas/otdr" element={<TelaLeitorOtdr />} />
            <Route path="/glossario" element={<Glossario />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/caderno" element={<Caderno />} />
            <Route path="/plano" element={<Plano />} />
            <Route path="/ajustes" element={<Ajustes />} />
            <Route path="*" element={<NaoEncontrado />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ProvedorEstado>
  );
}
