
import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';

function Sobre() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '30px', textAlign: 'center', marginTop: '100px' }}>
        <h1>Sobre Nós</h1>
        <p>Essa é a página de informações sobre o projeto Smart Fishing.</p>
      </div>
    </>
  );
}

export default Sobre;
