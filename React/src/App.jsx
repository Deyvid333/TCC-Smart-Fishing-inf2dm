// ========== IMPORTAÇÕES ==========
// Importa componentes do React Router para navegação entre páginas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa todos os componentes/páginas da aplicação
import Login from './Login';
import Cadastro from './Cadastro';
import Inicial from './Inicial';
import Home from './Home';
import Perfil from './Perfil';
import AdminModeracao from './AdminModeracao';
import IndiqueSeuPesqueiro from './IndiqueSeuPesqueiro';
import PainelPesqueiro from './PainelPesqueiro';
import PesqueiroDinamico from './PesqueiroDinamico';
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
        {/* ========== ROTAS PÚBLICAS ========== */}
        {/* Rota inicial - página de entrada */}
        <Route path="/" element={<Login />} />
        <Route path="/inicial" element={<Inicial />} />
        
        {/* Rotas de autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* ========== ROTAS DO USUÁRIO ========== */}
        {/* Página principal com lista de pesqueiros */}
        <Route path="/pesqueiros" element={<Home />} />
        
        {/* ========== ROTAS PRIVADAS ========== */}
        {/* Página do perfil do usuário */}
        <Route path="/perfil" element={<Perfil />} />
        
        {/* Painel de moderação, restrito a contas com nivelAcesso ADMIN */}
        <Route path="/admin" element={<AdminModeracao />} />
        {/* Tela onde qualquer usuário logado indica/edita um pesqueiro pendente de análise */}
        <Route path="/indique-pesqueiro" element={<IndiqueSeuPesqueiro />} />
        {/* Painel de um pesqueiro específico, só acessível pelo dono */}
        <Route path="/painel-pesqueiro/:id" element={<PainelPesqueiro />} />
        <Route path="/pesqueiro-dinamico" element={<PesqueiroDinamico />} />
      </Routes>
    </Router>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default App;


