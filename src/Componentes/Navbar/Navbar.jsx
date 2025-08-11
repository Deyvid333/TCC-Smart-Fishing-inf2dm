import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='header'>
      <Link to='#' className='logo'>Smart Fishing</Link>
      <nav className='navbar'>
        <input className='inputnav' placeholder='Buscar pesqueiros' />
        <Link to="/inicial">Inicial</Link>
        <Link to="/pesqueiros">Pesqueiros</Link>
        <Link to="/sobre">Sobre Nós</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/login">Login</Link>
     
      </nav>
    </header>
  );
};

export default Navbar;

