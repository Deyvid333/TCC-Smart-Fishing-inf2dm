import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pesqueiro from './assets/pesqueiro1home.jpg';
import pesqueiro2 from './assets/pesqueiro2home.jpg';
import pesqueiro3 from './assets/pesqueiro3home.jpg';

import { Link } from 'react-router-dom';
import './App.css';

function Home() {

  return (
    <>
      <Navbar />

      <div className="pesqueiros-hero">
        <div className="container text-center">
          <h1 className="hero-title">🎣 Explore os Pesqueiros</h1>
          <p className="hero-subtitle">Descubra os melhores locais para sua pescaria</p>
        </div>
      </div>

      {/* Mapa dos Pesqueiros */}
      <div className="pesqueiros-map-section">
        <div className="container">
          <h2 className="section-title text-center mb-5">📍 Pesqueiros Disponíveis</h2>
          <div className="row justify-content-center align-items-stretch g-4">
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="pesqueiro-card">
                <div className="pesqueiro-image">
                  <img src={pesqueiro} className="card-img-top" alt="Pesqueiro Vara Grande" />
                  <div className="pesqueiro-badge">⭐ 4.7</div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h4 className="pesqueiro-title">Pesqueiro Águas Claras</h4>
                  <div className="pesqueiro-info flex-grow-1">
                    <p><i className="icon">🕐</i> 8h às 22h30</p>
                    <p><i className="icon">💰</i> R$18 (úteis) | R$25 (fins de semana)</p>
                    <p><i className="icon">🍽️</i> Restaurante, quiosque, estacionamento</p>
                  </div>
                  <Link to="/Pesqueiro" className="btn-pesqueiro mt-auto">Explorar Pesqueiro</Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex">
              <div className="pesqueiro-card">
                <div className="pesqueiro-image">
                  <img src={pesqueiro2} className="card-img-top" alt="Lago do Pescador" />
                  <div className="pesqueiro-badge">⭐ 4.3</div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h4 className="pesqueiro-title">Pesqueiro Lago do Pescador</h4>
                  <div className="pesqueiro-info flex-grow-1">
                    <p><i className="icon">🕐</i> 8h às 19h</p>
                    <p><i className="icon">💰</i> R$20 por dia</p>
                    <p><i className="icon">🍽️</i> Restaurante, peixes frescos</p>
                  </div>
                  <Link to="/Pesqueiro2" className="btn-pesqueiro mt-auto">Explorar Pesqueiro</Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex">
              <div className="pesqueiro-card">
                <div className="pesqueiro-image">
                  <img src={pesqueiro3} className="card-img-top" alt="Lago da Rocha" />
                  <div className="pesqueiro-badge">⭐ 4.7</div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h4 className="pesqueiro-title">Lago da Rocha do Norte</h4>
                  <div className="pesqueiro-info flex-grow-1">
                    <p><i className="icon">🕐</i> Aberto 24h</p>
                    <p><i className="icon">💰</i> R$15 por dia</p>
                    <p><i className="icon">🍽️</i> Quiosque, estacionamento</p>
                  </div>
                  <Link to="/Pesqueiro3" className="btn-pesqueiro mt-auto">Explorar Pesqueiro</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Home;