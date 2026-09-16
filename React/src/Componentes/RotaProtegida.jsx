import { Navigate, useLocation } from 'react-router-dom';
import UsuarioService from '../services/UsuarioService';

// So deixa passar quem estiver logado. Sem isso, apertar "voltar" no
// navegador depois de deslogar reexibia a pagina anterior como se
// desse pra navegar sem login (o React Router so re-renderiza a rota,
// nao recarrega a pagina, entao a checagem precisa acontecer aqui).
function RotaProtegida({ children }) {
  const usuario = UsuarioService.getCurrentUser();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RotaProtegida;
