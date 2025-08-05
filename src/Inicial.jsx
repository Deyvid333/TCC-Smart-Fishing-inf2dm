import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './App.css';

function Inicial() {
  return (
    <>
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🎣 Smart Fishing</h1>
          <p className="hero-subtitle">Descubra os melhores pesqueiros da região</p>
          <p className="hero-description">
            Encontre informações detalhadas sobre pesqueiros, tipos de peixes, 
            horários ideais e muito mais para tornar sua pescaria inesquecível!
          </p>
          <div className="hero-buttons">
            <Link to="/pesqueiros" className="btn btn-hero-primary">Explorar Pesqueiros</Link>
            <Link to="/sobre" className="btn btn-hero-secondary">Saiba Mais</Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="text-center mb-5">Por que escolher o Smart Fishing?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🗺️</div>
                <h4>Localização Precisa</h4>
                <p>Encontre pesqueiros próximos com informações detalhadas de localização e acesso.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🐟</div>
                <h4>Catálogo de Peixes</h4>
                <p>Conheça os tipos de peixes disponíveis, horários ideais e dicas de pesca.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">⭐</div>
                <h4>Avaliações Reais</h4>
                <p>Leia avaliações de outros pescadores e compartilhe suas experiências.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container text-center">
          <h2>Pronto para sua próxima pescaria?</h2>
          <p>Junte-se a milhares de pescadores que já descobriram os melhores spots!</p>
          <Link to="/pesqueiros" className="btn btn-cta">Começar Agora</Link>
        </div>
      </div>
    </>
  );
}

export default Inicial;