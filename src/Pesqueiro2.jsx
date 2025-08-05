import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pacuImg from './assets/Pacu.jpeg';
import pintadoImg from './assets/pintado.jpg';
import trairaImg from './assets/Peixe-Traira.webp';
import pesqueiroImg from './assets/pesqueiro2.png';
import pesqueiroImg7 from './assets/pesqueiro7.jpg';
import pesqueiroImg8 from './assets/pesqueiro8.jpg';
import pesqueiroImg9 from './assets/pesqueiro9.jpg';
import './App.css'

function Pesqueiro2() {
  return (
    <>
      <Navbar />

    <div className="container mt-4">
     
      <div className="card w-100 mb-4">
        <img src={pesqueiroImg} alt="Imagem do pesqueiro" />
      </div>

     
      <h2 className="text-center mb-4">Catálogo de Peixes</h2>

     
      <div className="row justify-content-center align-items-stretch g-4">

        
        <div className="col-md-4 d-flex">
          <div className="card w-100">
          <img src={pacuImg}  className="card-img-top" alt="Pacu"  width="190px" height="100%" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Pacu</h4>
              <p className="card-text">Horário ideal: Durante o dia, especialmente à tarde (12h às 16h)</p>
              <p className="card-text">Tamanho médio: 30 a 60 cm</p>
              <p className="card-text">Espinhas: Tem espinhas, mas é fácil de limpar. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara reforçada, linha média e iscas como frutas ou massas doces</p>
            </div>
          </div>
        </div>

      
        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src={pintadoImg}  className="card-img-top" alt="Pintado" width="190px" height="100%" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Pintado</h4>
              <p className="card-text">Horário ideal: Noite e madrugadas (21h às 4h)</p>
              <p className="card-text">Tamanho médio: 60 cm até mais de 1 metro</p>
              <p className="card-text">Espinhas: Poucas, carne firme. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara pesada, linha forte e isca viva ou peixe pequeno</p>
            </div>
          </div>
        </div>

      
        <div className="col-md-4 d-flex">
          <div className="card w-100">
           <img src={trairaImg}  className="card-img-top" alt="Traíra"   width="190px" height="100%" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Traíra</h4>
              <p className="card-text">Horário ideal: Início da manhã e fim de tarde</p>
              <p className="card-text">Tamanho médio: 20 a 50 cm</p>
              <p className="card-text">Espinhas: Muitas e finas. Riscos à saúde: Deve ser bem limpa</p>
              <p className="card-text">Equipamento: Vara comum ou molinete, iscas artificiais funcionam bem</p>
            </div>
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
            <img src={pesqueiroImg7} className="d-block w-100" alt="Pesqueiro 1" width="300px" height="500px" />
          </div>
          <div className="carousel-item">
            <img src={pesqueiroImg8} className="d-block w-100" alt="Pesqueiro 2" width="300px" height="500px" />
          </div>
          <div className="carousel-item">
            <img src={pesqueiroImg9} className="d-block w-100" alt="Pesqueiro 3" width="300px" height="500px" />
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



      <div className="mt-5">
        <form className='formspesqueiro'>
        <h2>Informações e descrição sobre o pesqueiro</h2>
        <h3>🎣 Pesqueiro Lago do Pescador</h3>
        <p>
          Localizado em uma área de natureza preservada, o Pesqueiro Lago do Pescador é conhecido por seu ambiente calmo e familiar.
          Aberto até as 19h, oferece um restaurante com peixes frescos direto do lago e infraestrutura pensada para o conforto dos visitantes.
          Com entrada a apenas 20 reais por dia, é a escolha perfeita para quem quer pescar e saborear boas refeições com vista para a água.
        </p>
        </form>
      </div>
    </div>
     
    </>
  );
}

export default Pesqueiro2;