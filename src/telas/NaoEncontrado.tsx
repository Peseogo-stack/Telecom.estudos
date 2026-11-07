import { Link } from 'react-router-dom';
import { useTitulo } from '../componentes/Comuns';

export function NaoEncontrado() {
  useTitulo('Não encontrado');
  return (
    <>
      <h1>Página não encontrada</h1>
      <p>O endereço não existe ou o conteúdo ainda não foi publicado.</p>
      <Link to="/" className="botao">
        Voltar para Hoje
      </Link>
    </>
  );
}
