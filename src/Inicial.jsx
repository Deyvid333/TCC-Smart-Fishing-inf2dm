// ========== IMPORTAÇÕES ==========
// Importa React (sem hooks pois é um componente estático)
import React from 'react';
// Importa componente de navegação
import Navbar from './Componentes/Navbar/Navbar';
// Importa Link para navegação entre páginas
import { Link } from 'react-router-dom';
// Importa estilos CSS
import './App.css';

// ========== COMPONENTE DA PÁGINA INICIAL ==========
function Inicial() {
  // ========== RENDERIZAÇÃO DO COMPONENTE ==========
  return (
    <>
      {/* Componente de navegação fixo */}
      <Navbar />
      
      {/* ========== SEÇÃO HERO (PRINCIPAL) ========== */}
      <div className="hero-section">
        <div className="hero-content">
          {/* Título principal da aplicação */}
          <h1 className="hero-title">🎣 Smart Fishing</h1>
          {/* Subtítulo */}
          <p className="hero-subtitle">Descubra os melhores pesqueiros da região</p>
          {/* Descrição detalhada */}
          <p className="hero-description">
            Encontre informações detalhadas sobre pesqueiros, tipos de peixes, 
            horários ideais e muito mais para tornar sua pescaria inesquecível!
          </p>
          {/* Botões de ação */}
          <div className="hero-buttons">
            {/* Botão primário - leva para lista de pesqueiros */}
            <Link to="/pesqueiros" className="btn btn-hero-primary">Explorar Pesqueiros</Link>
            {/* Botão secundário - leva para página sobre */}
            <Link to="/sobre" className="btn btn-hero-secondary">Saiba Mais</Link>
          </div>
        </div>
      </div>

      {/* ========== SEÇÃO DE FUNCIONALIDADES ========== */}
      <div className="features-section">
        <div className="container">
          <h2 className="text-center mb-5">Por que escolher o Smart Fishing?</h2>
          <div className="row g-4">
            {/* Funcionalidade 1: Localização */}
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🗺️</div>
                <h4>Localização Precisa</h4>
                <p>Encontre pesqueiros próximos com informações detalhadas de localização e acesso.</p>
              </div>
            </div>
            
            {/* Funcionalidade 2: Catálogo de Peixes */}
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🐟</div>
                <h4>Catálogo de Peixes</h4>
                <p>Conheça os tipos de peixes disponíveis, horários ideais e dicas de pesca.</p>
              </div>
            </div>
            
            {/* Funcionalidade 3: Avaliações */}
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

      {/* ========== SEÇÃO CALL TO ACTION (CHAMADA PARA AÇÃO) ========== */}
      <div className="cta-section">
        <div className="container text-center">
          <h2>Pronto para sua próxima pescaria?</h2>
          <p>Junte-se a milhares de pescadores que já descobriram os melhores spots!</p>
          {/* Botão final que leva para os pesqueiros */}
          <Link to="/pesqueiros" className="btn btn-cta">Começar Agora</Link>
        </div>
      </div>
    </>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default Inicial;