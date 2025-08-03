import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css'; 
import pesqueiroImg from './assets/pesqueiro.png';
import tilapiaImg from './assets/Tilapia.jpeg';
import douradoImg from './assets/PeixeDourado.jpeg';
import baiacuImg from './assets/Baiacu.jpeg';

function Pesqueiro() {
  return (
    <>
      <Navbar />



    <div className="container mt-4">
     
      <div className="card w-100 mb-4">
        <img src={pesqueiroImg} className="card-img-top" alt="Imagem do pesqueiro" />
      </div>

   
      <h2 className="text-center mb-5">Catálogo de Peixes</h2>

     
      <div className="row justify-content-center align-items-stretch g-4">

        {/* Card Tilápia */}
        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src={tilapiaImg} className="card-img-top" alt="Tilápia" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Tilápia</h4>
              <p className="card-text">Aparece com frequência entre 8:00 e 20:00.</p>
              <p className="card-text">Tamanho médio: 28cm a 35cm.</p>
              <p className="card-text">Própria para consumo, sem espinhas ou riscos à saúde.</p>
              <p className="card-text">Recomendada vara resistente. Iscas comuns como minhocas funcionam bem.</p>
            </div>
          </div>
        </div>

       
        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src={douradoImg} className="card-img-top" alt="Peixe Dourado" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Peixe Dourado</h4>
              <p className="card-text">Aparece com frequência entre 12:00 e 18:00.</p>
              <p className="card-text">Tamanho médio: 15cm a 18cm.</p>
              <p className="card-text">Próprio para consumo, sem espinhas ou riscos à saúde.</p>
              <p className="card-text">Pode ser pescado com equipamento simples e iscas como minhocas.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src={baiacuImg} className="card-img-top" alt="Baiacu" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Baiacu</h4>
              <p className="card-text">Aparece com frequência entre 15:00 e 19:00.</p>
              <p className="card-text">Tamanho médio: 12cm a 15cm.</p>
              <p className="card-text text-danger">**Venenoso!** Não é seguro para consumo.</p>
              <p className="card-text">Pode ser pescado com equipamento simples e iscas normais como minhocas.</p>
            </div>
          </div>
        </div>

      </div>

     
      <div className="mt-5">
        <h2>Informações e Descrição sobre o Pesqueiro</h2>
        <h3>🎣 Pesqueiro dos Vara Grande</h3>
        <p>
          Um dos favoritos da região, o Pesqueiro dos Vara Grande oferece uma experiência completa para quem ama relaxar e pescar com tranquilidade. 
          Com funcionamento estendido até às 22h30, o local conta com um belo lago, restaurante à beira d’água, quiosque para descanso e estacionamento gratuito. 
          Durante a semana, o custo é acessível e nos fins de semana continua em conta, ideal para toda a família. Um verdadeiro refúgio para pescadores apaixonados!
        </p>
      </div>
    </div>
 
     
    </>
  );
}

export default Pesqueiro;