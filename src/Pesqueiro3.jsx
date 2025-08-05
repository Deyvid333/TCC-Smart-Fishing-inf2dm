import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pesqueiro3 from './assets/pesqueiro3.png';
import bagre from './assets/bagre-africano.webp';
import tambaqui from './assets/Tambaqui.jpg';
import carpa from './assets/Carpa.jpg';
import './App.css';
import pesqueiroImg10 from './assets/pesqueiro10.jpg';
import pesqueiroImg11 from './assets/pesqueiro11.jpg';
import pesqueiroImg12 from './assets/pesqueiro12.jpg';

function Pesqueiro3() {
  return (
    <>
      <Navbar />

    <div>
      <div className="card w-100">
        <img src={pesqueiro3}  alt="Imagem do pesqueiro 3" />
      </div>

      <h2 className="text-center mt-4">Catálogo de Peixes</h2>

      <div className="container pb-5">
        <div className="row justify-content-center align-items-stretch g-4">

        
          <div className="col-md-4 d-flex">
            <div className="card w-100">
              <img src={bagre} className="card-img-top" alt="Bagre" height="190px" width="100%" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Bagre</h4>
                <p className="card-text">Horário ideal: Noite (18h às 2h)</p>
                <p className="card-text">Tamanho médio: 30 a 70 cm</p>
                <p className="card-text">Espinhas: Poucas, mas atenção: tem ferrões venenosos nas nadadeiras</p>
                <p className="card-text">Riscos à saúde: O ferrão pode causar dor e inchaço; deve ser manuseado com cuidado</p>
                <p className="card-text">Equipamento: Vara simples com linha média, isca de fundo (como pedaços de peixe ou carne)</p>
              </div>
            </div>
          </div>

         
          <div className="col-md-4 d-flex">
            <div className="card w-100">
              <img src={tambaqui} className="card-img-top" alt="Tambaqui" height="190px" width="100%" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Tambaqui</h4>
                <p className="card-text">Horário ideal: Meio da manhã e fim da tarde (10h às 12h e 16h às 18h)</p>
                <p className="card-text">Tamanho médio: 40 a 90 cm</p>
                <p className="card-text">Espinhas: Poucas e grandes, fáceis de remover</p>
                <p className="card-text">Riscos à saúde: Nenhum — é muito valorizado na culinária</p>
                <p className="card-text">Equipamento: Vara resistente, linha média ou grossa, e iscas como massas doces, frutas ou ração</p>
              </div>
            </div>
          </div>

          
          <div className="col-md-4 d-flex">
            <div className="card w-100">
              <img src={carpa} className="card-img-top" alt="Carpa Cabeçuda" height="190px" width="100%" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Carpa Cabeçuda</h4>
                <p className="card-text">Horário ideal: Início da manhã e fim da tarde (6h às 9h e 16h às 18h)</p>
                <p className="card-text">Tamanho médio: 60 a 90 cm</p>
                <p className="card-text">Espinhas: Bastantes espinhas pequenas — exige atenção no preparo</p>
                <p className="card-text">Riscos à saúde: Nenhum risco conhecido — carne branca e sabor suave</p>
                <p className="card-text">Equipamento: Vara forte, linha grossa, molinete resistente e iscas fermentadas ou milho</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex">
            <div className="card w-100">
              <img src="https://via.placeholder.com/300x190/8e44ad/ffffff?text=Piaucu" className="card-img-top" alt="Piaucu" height="190px" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Piaucu</h4>
                <p className="card-text">Horário ideal: Madrugada e início da manhã (4h às 8h)</p>
                <p className="card-text">Tamanho médio: 35 a 55 cm</p>
                <p className="card-text">Espinhas: Poucas, carne firme e saborosa</p>
                <p className="card-text">Riscos à saúde: Nenhum — muito apreciado na culinária</p>
                <p className="card-text">Equipamento: Vara média, iscas: frutas, sementes, massa</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex">
            <div className="card w-100">
              <img src="https://via.placeholder.com/300x190/16a085/ffffff?text=Jatuarana" className="card-img-top" alt="Jatuarana" height="190px" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Jatuarana</h4>
                <p className="card-text">Horário ideal: Tarde e início da noite (14h às 20h)</p>
                <p className="card-text">Tamanho médio: 25 a 40 cm</p>
                <p className="card-text">Espinhas: Médias, carne de sabor marcante</p>
                <p className="card-text">Riscos à saúde: Nenhum — peixe nativo muito valorizado</p>
                <p className="card-text">Equipamento: Vara leve, iscas artificiais ou naturais</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex">
            <div className="card w-100">
              <img src="https://via.placeholder.com/300x190/d35400/ffffff?text=Cascudo" className="card-img-top" alt="Cascudo" height="190px" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Cascudo</h4>
                <p className="card-text">Horário ideal: Noite (19h às 23h)</p>
                <p className="card-text">Tamanho médio: 20 a 35 cm</p>
                <p className="card-text">Espinhas: Poucas, mas tem couro resistente</p>
                <p className="card-text">Riscos à saúde: Nenhum — carne branca e macia</p>
                <p className="card-text">Equipamento: Vara simples, iscas de fundo como minhoca</p>
              </div>
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
            <img src={pesqueiroImg10} className="d-block w-100" alt="Pesqueiro 1" style={{height: '400px', objectFit: 'cover'}} />
          </div>
          <div className="carousel-item">
            <img src={pesqueiroImg11} className="d-block w-100" alt="Pesqueiro 2" style={{height: '400px', objectFit: 'cover'}} />
          </div>
          <div className="carousel-item">
            <img src={pesqueiroImg12} className="d-block w-100" alt="Pesqueiro 3" style={{height: '400px', objectFit: 'cover'}} />
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






      <div className="container mb-5">
        <form className='formspesqueiro'> 
        <h2>Informações e descrição sobre o pesqueiro</h2>
        <h3>🎣 Pesqueiro lago da rocha do norte</h3>
        <p>
          O mais tradicional da região, o Pesqueiro lago da rocha do norte nunca dorme! Aberto 24 horas por dia,
          é o destino ideal para pescadores noturnos ou para quem gosta de curtir a natureza a qualquer hora.
          Simples, mas muito funcional, o espaço conta com quiosques e estacionamento gratuito.
          Tudo isso por um valor simbólico de 15 reais por dia.
          Um lugar acolhedor que carrega histórias e memórias de gerações.
        </p>
        </form>
      </div>
    </div>
     
    </>
  );
}

export default Pesqueiro3;