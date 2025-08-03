import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pesqueiro from './assets/Pesqueiro.png';
import pesqueiro2 from './assets/Pesqueiro2.png';
import pesqueiro3 from './assets/Pesqueiro3.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Navbar />

      <div className="container text-center my-5">
        <h1>Smart Fishing</h1>
        <h2 className="mt-3">Pesqueiros perto de você</h2>
      </div>

      <div className="container pb-5">
        <div className="row justify-content-center align-items-stretch g-4">

          {/* Pesqueiro 1 */}
          <div className="col-md-4 d-flex">
            <div className="card w-100">
              <img src={pesqueiro} className="card-img-top" alt="Imagem do pesqueiro 1" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Pesqueiro dos Vara Grande</h4>
                <p className="card-text">Horário: 8h às 22h30</p>
                <p className="card-text">R$18 dias úteis | R$25 finais de semana</p>
                <p className="card-text">Restaurante, quiosque (R$5/h), estacionamento gratuito</p>
                <Link to="/Pesqueiro" className="btn btn-primary mt-auto">Ver mais</Link>
              </div>
            </div>
          </div>

          {/* Pesqueiro 2 */}
          <div className="col-md-4 d-flex">
            <div className="card w-100">
              <img src={pesqueiro2} className="card-img-top" alt="Imagem do pesqueiro 2" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Pesqueiro Lago do Pescador</h4>
                <p className="card-text">Horário: 8h às 19h</p>
                <p className="card-text">R$20 por dia</p>
                <p className="card-text">Restaurante com peixes frescos, estacionamento gratuito</p>
                <Link to="/Pesqueiro2" className="btn btn-primary mt-auto">Ver mais</Link>
              </div>
            </div>
          </div>

          {/* Pesqueiro 3 */}
          <div className="col-md-4 d-flex">
            <div className="card w-100">
              <img src={pesqueiro3} className="card-img-top" alt="Imagem do pesqueiro 3" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Pesqueiro do Seu Zé</h4>
                <p className="card-text">Aberto 24h</p>
                <p className="card-text">R$15 por dia</p>
                <p className="card-text">Quiosque e estacionamento gratuito</p>
                <Link to="/Pesqueiro3" className="btn btn-primary mt-auto">Ver mais</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
