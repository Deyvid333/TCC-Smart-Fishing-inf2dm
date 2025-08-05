import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css'; 
import pesqueiroImg from './assets/pesqueiro.png';
import tilapiaImg from './assets/Tilapia.jpeg';
import douradoImg from './assets/PeixeDourado.jpeg';
import baiacuImg from './assets/Baiacu.jpeg';
import pesqueiroImg4 from './assets/pesqueiro4.jpeg';
import pesqueiroImg5 from './assets/pesqueiro5.jpg';
import pesqueiroImg6 from './assets/pesqueiro6.jpg';



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

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src="https://via.placeholder.com/300x190/4a90e2/ffffff?text=Carpa" className="card-img-top" alt="Carpa" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Carpa</h4>
              <p className="card-text">Aparece com frequência entre 6:00 e 22:00.</p>
              <p className="card-text">Tamanho médio: 40cm a 60cm.</p>
              <p className="card-text">Própria para consumo, carne saborosa e nutritiva.</p>
              <p className="card-text">Requer vara resistente. Iscas: milho, boilie, massa doce.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src="https://via.placeholder.com/300x190/2ecc71/ffffff?text=Pintado" className="card-img-top" alt="Pintado" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Pintado</h4>
              <p className="card-text">Aparece com frequência entre 18:00 e 6:00.</p>
              <p className="card-text">Tamanho médio: 50cm a 80cm.</p>
              <p className="card-text">Excelente para consumo, peixe nobre de água doce.</p>
              <p className="card-text">Vara pesada obrigatória. Iscas: peixe vivo, lambari, camarão.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src="https://via.placeholder.com/300x190/e74c3c/ffffff?text=Pacu" className="card-img-top" alt="Pacu" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Pacu</h4>
              <p className="card-text">Aparece com frequência entre 8:00 e 18:00.</p>
              <p className="card-text">Tamanho médio: 30cm a 45cm.</p>
              <p className="card-text">Próprio para consumo, sabor suave e delicado.</p>
              <p className="card-text">Vara média. Iscas: frutas, milho, ração, massas.</p>
            </div>
          </div>
        </div>


<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={pesqueiroImg4} className="d-block w-100" alt="Pesqueiro 1" style={{height: '400px', objectFit: 'cover'}} />
    </div>
    <div className="carousel-item">
      <img src={pesqueiroImg5} className="d-block w-100" alt="Pesqueiro 2" style={{height: '400px', objectFit: 'cover'}} />
    </div>
    <div className="carousel-item">
      <img src={pesqueiroImg6} className="d-block w-100" alt="Pesqueiro 3" style={{height: '400px', objectFit: 'cover'}} />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>






      </div>
      <div className="mt-5">
        <form className='formspesqueiro'>
        <h2>Informações e Descrição sobre o Pesqueiro</h2>
        <h3>🎣 Pesqueiro dos Vara Grande</h3>
        <p>
          Um dos favoritos da região, o Pesqueiro dos Vara Grande oferece uma experiência completa para quem ama relaxar e pescar com tranquilidade. 
          Com funcionamento estendido até às 22h30, o local conta com um belo lago, restaurante à beira d’água, quiosque para descanso e estacionamento gratuito. 
          Durante a semana, o custo é acessível e nos fins de semana continua em conta, ideal para toda a família. Um verdadeiro refúgio para pescadores apaixonados!
        </p>
        </form>
      </div>
    </div>
 
     
    </>
  );
}

export default Pesqueiro;