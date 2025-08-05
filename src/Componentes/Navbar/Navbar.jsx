import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='header'>
      <Link to='#' className='logo'>Smart Fishing</Link>

      <nav className='navbar'>
        <input className='inputnav' placeholder='Bucar pesqueiros' />
        <Link to="/home">Home</Link>
        <Link to="/sobre">Sobre Nós</Link>
        <Link to="/">Login</Link>
        
        
      </nav>
    </header>
  );
};

export default Navbar;

