import React from 'react';
import Navbar from './Componentes/Navbar/Navbar.jsx';

function Home() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '30px', textAlign: 'center', marginTop: '100px' }}>
        <h1>Smart Fishing</h1>
        <h2>pesqueiros proximos:</h2>
      </div>
    </>
  );
}

export default Home;
