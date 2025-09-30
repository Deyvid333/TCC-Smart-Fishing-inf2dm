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
      <div className="user-page-content">
      <div className="pesqueiros-hero">
        <div className="container text-center">
          <h1 className="hero-title">🎣 Explore os Pesqueiros</h1>
          <p className="hero-subtitle">Descubra os melhores locais para sua pescaria</p>
        </div>
      </div>

      {/* Pesqueiros Simples */}
      <div className="pesqueiros-map-section">
        <div className="container">
          <h2 className="section-title text-center mb-5">📍 Pesqueiros Disponíveis</h2>
          <div className="row g-4">
            {[
              {
                nome: 'Pesqueiro Águas Claras',
                imagem: pesqueiro,
                avaliacao: '4.7',
                horario: '8h às 22h30',
                preco: 'R$18 (úteis) | R$25 (fins de semana)',
                servicos: 'Restaurante, quiosque, estacionamento',
                link: '/Pesqueiro'
              },
              {
                nome: 'Pesqueiro Lago do Pescador',
                imagem: pesqueiro2,
                avaliacao: '4.3',
                horario: '8h às 19h',
                preco: 'R$20 por dia',
                servicos: 'Restaurante, peixes frescos',
                link: '/Pesqueiro2'
              },
              {
                nome: 'Lago da Rocha do Norte',
                imagem: pesqueiro3,
                avaliacao: '4.7',
                horario: 'Aberto 24h',
                preco: 'R$15 por dia',
                servicos: 'Quiosque, estacionamento',
                link: '/Pesqueiro3'
              }
            ].map((pesqueiro, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="card h-100">
                  <div className="position-relative">
                    <img src={pesqueiro.imagem} className="card-img-top" alt={pesqueiro.nome} style={{height: '200px', objectFit: 'cover'}} />
                    <span className="position-absolute top-0 end-0 m-2 badge bg-primary">⭐ {pesqueiro.avaliacao}</span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{pesqueiro.nome}</h5>
                    <div className="mb-3 flex-grow-1">
                      <p className="mb-2">🕐 {pesqueiro.horario}</p>
                      <p className="mb-2">💰 {pesqueiro.preco}</p>
                      <p className="mb-0">🍽️ {pesqueiro.servicos}</p>
                    </div>
                    <Link to={pesqueiro.link} className="btn btn-primary mt-auto">Explorar Pesqueiro</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

    </>
  );
}

export default Home;