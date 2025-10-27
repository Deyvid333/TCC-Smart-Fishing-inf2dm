// ========== IMPORTAÇÕES ==========
// Importa componentes do React Router para navegação entre páginas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa todos os componentes/páginas da aplicação
import Login from './Login';
import Cadastro from './Cadastro';
import Inicial from './Inicial';
import Home from './Home';
import Sobre from './Sobre';
import Contato from './Contato';
import Perfil from './Perfil';
import Pesqueiro from './Pesqueiro';
import Pesqueiro2 from './Pesqueiro2';
import Pesqueiro3 from './Pesqueiro3';
import AdminDashboard from './AdminDashboard';
import Conscientizacao from './Conscientizacao';
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
        <Route path="/" element={<Inicial />} />
        <Route path="/inicial" element={<Inicial />} />
        
        {/* Rotas de autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* ========== ROTAS DO USUÁRIO ========== */}
        {/* Página principal com lista de pesqueiros */}
        <Route path="/pesqueiros" element={<Home />} />
        
        {/* Páginas dos pesqueiros individuais */}
        <Route path="/Pesqueiro" element={<Pesqueiro />} />
        <Route path="/Pesqueiro2" element={<Pesqueiro2 />} />
        <Route path="/Pesqueiro3" element={<Pesqueiro3 />} />
        
        {/* Páginas institucionais */}
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/conscientizacao" element={<Conscientizacao />} />
        
        {/* ========== ROTAS PRIVADAS ========== */}
        {/* Página do perfil do usuário */}
        <Route path="/perfil" element={<Perfil />} />
        
        {/* Painel administrativo */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default App;

// Log para debug - indica que o App foi carregado
console.log("App carregou");


