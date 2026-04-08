import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pesqueiro from './assets/imagensPeixes/pesqueiro1home.jpg';
import pesqueiro2 from './assets/imagensPeixes/pesqueiro2home.jpg';
import pesqueiro3 from './assets/imagensPeixes/pesqueiro3home.jpg';

import { Link } from 'react-router-dom';
import './App.css';

function Home() {

  return (
    <>
      <Navbar />
      <div className="user-page-content">
      <div className="pesqueiros-hero">
        <div className="container text-center">
          <h1 className="hero-title">Explore os Pesqueiros</h1>
          <p className="hero-subtitle">Descubra os melhores locais para sua pescaria</p>
        </div>
      </div>

        {/* ========== SEÇÃO DE PESQUEIROS DISPONÍVEIS ========== */}
        <div className="pesqueiros-map-section">
          <div className="container">
            <h2 className="section-title text-center mb-5">Pesqueiros Disponíveis</h2>
            <div className="row g-4">
              {/* ========== ARRAY DE DADOS DOS PESQUEIROS ========== */}
              {/* Array com informações de cada pesqueiro */}
              {[
                {
                  nome: 'Pesqueiro Águas Claras',
                  imagem: pesqueiro,
                  avaliacao: '4.7',
                  horario: '8h às 22h30',
                  preco: 'R$18 (úteis) | R$25 (fins de semana)',
                  servicos: 'Restaurante, quiosque, estacionamento',
                  link: '/Pesqueiro' // Rota para navegação
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
              ].map((pesqueiro, index) => ( // Mapeia cada pesqueiro para criar um card
                // Card individual de cada pesqueiro
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="card h-100"> {/* h-100 garante altura igual para todos os cards */}
                    {/* Container da imagem com badge de avaliação */}
                    <div className="position-relative">
                      <img 
                        src={pesqueiro.imagem} 
                        className="card-img-top" 
                        alt={pesqueiro.nome} 
                        style={{height: '200px', objectFit: 'cover'}} // Altura fixa e corte proporcional
                      />
                      {/* Badge de avaliação posicionado no canto superior direito */}
                      <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                        {pesqueiro.avaliacao}
                      </span>
                    </div>
                    
                    {/* Corpo do card com informações */}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{pesqueiro.nome}</h5>
                      
                      {/* Informações do pesqueiro com ícones */}
                      <div className="mb-3 flex-grow-1"> {/* flex-grow-1 expande para empurrar botão para baixo */}
                        <p className="mb-2">{pesqueiro.horario}</p>
                        <p className="mb-2">{pesqueiro.preco}</p>
                        <p className="mb-0">{pesqueiro.servicos}</p>
                      </div>
                      
                      {/* Botão de navegação sempre no final do card */}
                      <Link to={pesqueiro.link} className="btn btn-primary mt-auto">
                        Explorar Pesqueiro
                      </Link>
                    </div>
                  </div>
                </div>
              )) // Fecha o map
              }
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default Home;