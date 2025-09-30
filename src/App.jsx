import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './App.css';



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Inicial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/inicial" element={<Inicial />} />
        <Route path="/pesqueiros" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/Pesqueiro3" element={<Pesqueiro3 />} />
        <Route path="/Pesqueiro2" element={<Pesqueiro2 />} />
        <Route path="/Pesqueiro" element={<Pesqueiro />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/conscientizacao" element={<Conscientizacao />} />
     
      </Routes>
    </Router>
  );
}

export default App;

console.log("App carregou");


