// ========== IMPORTAÇÕES ==========
// Importa componentes do React Router para navegação entre páginas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa todos os componentes/páginas da aplicação
import Login from './Login';
import Cadastro from './Cadastro';
import EsqueciSenha from './EsqueciSenha';
import RedefinirSenha from './RedefinirSenha';
import Inicial from './Inicial';
import Home from './Home';
import Perfil from './Perfil';
import AdminPainel from './AdminPainel';
import IndiqueSeuPesqueiro from './IndiqueSeuPesqueiro';
import PainelPesqueiro from './PainelPesqueiro';
import PesqueiroDinamico from './PesqueiroDinamico';
import RotaProtegida from './Componentes/RotaProtegida';
// Importa estilos globais da aplicação
import './App.css';

// ========== COMPONENTE PRINCIPAL DA APLICAÇÃO ==========
// Este é o componente raiz que gerencia todas as rotas da aplicação
function App() {
  // ========== RENDERIZAÇÃO DAS ROTAS ==========
  return (
    // Router: Habilita navegação por URL na aplicação
    <Router>
      {/* Routes: Container para todas as rotas */}
      <Routes>
        {/* ========== ROTAS PÚBLICAS ==========
            So essas nao exigem login: entrar, criar conta e recuperar senha.
            Todo o resto do site exige estar logado (regra de negocio). */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />

        {/* ========== ROTAS PRIVADAS (exigem login) ========== */}
        <Route path="/inicial" element={<RotaProtegida><Inicial /></RotaProtegida>} />
        <Route path="/pesqueiros" element={<RotaProtegida><Home /></RotaProtegida>} />
        <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
        {/* Painel de moderação, restrito a contas com nivelAcesso ADMIN (checagem extra dentro do componente) */}
        <Route path="/admin" element={<RotaProtegida><AdminPainel /></RotaProtegida>} />
        {/* Tela onde qualquer usuário logado indica/edita um pesqueiro pendente de análise */}
        <Route path="/indique-pesqueiro" element={<RotaProtegida><IndiqueSeuPesqueiro /></RotaProtegida>} />
        {/* Painel de um pesqueiro específico, só acessível pelo dono */}
        <Route path="/painel-pesqueiro/:id" element={<RotaProtegida><PainelPesqueiro /></RotaProtegida>} />
        <Route path="/pesqueiro-dinamico" element={<RotaProtegida><PesqueiroDinamico /></RotaProtegida>} />
      </Routes>
    </Router>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default App;
