import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Home from './Home';
import Sobre from './Sobre';
import Pesqueiro from './Pesqueiro';
import Pesqueiro2 from './Pesqueiro2';
import Pesqueiro3 from './Pesqueiro3';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/Pesqueiro3" element={<Pesqueiro3 />} />
        <Route path="/Pesqueiro2" element={<Pesqueiro2 />} />
        <Route path="/Pesqueiro" element={<Pesqueiro />} />
      </Routes>
    </Router>
  );
}

export default App;

console.log("App carregou");


