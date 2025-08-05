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

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src="https://via.placeholder.com/300x190/9b59b6/ffffff?text=Tambaqui" className="card-img-top" alt="Tambaqui" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Tambaqui</h4>
              <p className="card-text">Horário ideal: Manhã e tarde (7h às 17h)</p>
              <p className="card-text">Tamanho médio: 40 a 70 cm</p>
              <p className="card-text">Espinhas: Poucas, carne saborosa. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara resistente, iscas: frutas, milho, ração</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src="https://via.placeholder.com/300x190/f39c12/ffffff?text=Surubim" className="card-img-top" alt="Surubim" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Surubim</h4>
              <p className="card-text">Horário ideal: Noite e madrugada (20h às 5h)</p>
              <p className="card-text">Tamanho médio: 60 a 100 cm</p>
              <p className="card-text">Espinhas: Poucas, carne nobre. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara pesada, linha forte, isca viva</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src="https://via.placeholder.com/300x190/27ae60/ffffff?text=Curimba" className="card-img-top" alt="Curimbá" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Curimbá</h4>
              <p className="card-text">Horário ideal: Manhã cedo e final da tarde (6h às 9h, 16h às 18h)</p>
              <p className="card-text">Tamanho médio: 25 a 40 cm</p>
              <p className="card-text">Espinhas: Médias, carne saborosa. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara leve, iscas: minhoca, massa, milho</p>
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
            <img src={pesqueiroImg7} className="d-block w-100" alt="Pesqueiro 1" style={{height: '400px', objectFit: 'cover'}} />
          </div>
          <div className="carousel-item">
            <img src={pesqueiroImg8} className="d-block w-100" alt="Pesqueiro 2" style={{height: '400px', objectFit: 'cover'}} />
          </div>
          <div className="carousel-item">
            <img src={pesqueiroImg9} className="d-block w-100" alt="Pesqueiro 3" style={{height: '400px', objectFit: 'cover'}} />
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