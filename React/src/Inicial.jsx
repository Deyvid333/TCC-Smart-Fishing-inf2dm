import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Inicial.css';

const IconePeixe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12c3-4.5 6.5-6.5 10-6.5S18.5 8 21 12c-2.5 4-5.5 6.5-9 6.5S5 16.5 2 12z" />
    <path d="M21 12l-3.5-3v6l3.5-3z" />
    <circle cx="8.5" cy="11" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconePin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const IconeEstrela = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5l2.6 5.4 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.5z" />
  </svg>
);

function Inicial() {
  return (
    <div className="landing-page">
      <Navbar />

      {/* ===== Hero ===== */}
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-logo">
            <div className="landing-logo-mark">
              <IconePeixe />
            </div>
            <div className="landing-logo-text">
              Smart Fishing
              <span>Pesque e solte</span>
            </div>
          </div>

          <h1>Descubra os melhores <em>pesqueiros</em> da região</h1>
          <p className="landing-hero-subtitle">Sua próxima pescaria começa aqui</p>
          <p className="landing-hero-description">
            Encontre informações detalhadas sobre pesqueiros, tipos de peixes,
            horários ideais e muito mais para tornar sua pescaria inesquecível!
          </p>

          <div className="landing-hero-buttons">
            <Link to="/pesqueiros" className="landing-btn landing-btn-primary">
              Explorar Pesqueiros
            </Link>
            <Link to="/cadastro" className="landing-btn landing-btn-ghost">
              Criar conta grátis
            </Link>
          </div>
        </div>

        <svg className="landing-waves" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path fill="rgba(123,205,186,0.35)"
                d="M0 60c180-40 300 40 480 30s300-70 480-50 300 60 480 40v40H0z" />
          <path fill="#f4f8fb"
                d="M0 85c200-30 340 25 520 15s320-55 480-35 260 45 440 30v25H0z" />
        </svg>
      </section>

      {/* ===== Diferenciais ===== */}
      <section className="landing-features">
        <span className="landing-section-eyebrow">Por que o Smart Fishing</span>
        <h2 className="landing-section-title">Tudo que você precisa para escolher o pesqueiro certo</h2>

        <div className="landing-feature-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-icon"><IconePin /></div>
            <h4>Localização Precisa</h4>
            <p>Encontre pesqueiros próximos com informações detalhadas de localização e acesso.</p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon"><IconePeixe /></div>
            <h4>Catálogo de Peixes</h4>
            <p>Conheça os tipos de peixes disponíveis, horários ideais e dicas de pesca.</p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon"><IconeEstrela /></div>
            <h4>Avaliações Reais</h4>
            <p>Leia avaliações de outros pescadores e compartilhe suas experiências.</p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="landing-cta">
        <h2>Pronto para sua próxima pescaria?</h2>
        <p>Junte-se a milhares de pescadores que já descobriram os melhores spots!</p>
        <Link to="/pesqueiros" className="landing-btn landing-btn-primary">Começar Agora</Link>
      </section>
    </div>
  );
}

export default Inicial;
