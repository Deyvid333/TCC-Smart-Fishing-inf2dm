import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pacuImg from './assets/Pacu.jpeg';
import pintadoImg from './assets/pintado.jpg';
import trairaImg from './assets/Peixe-Traira.webp';
import pesqueiroImg from './assets/pesqueiro2.png';

function Pesqueiro2() {
  return (
    <>
      <Navbar />

    <div className="container mt-4">
      {/* Imagem principal */}
      <div className="card w-100 mb-4">
        <img src={pesqueiroImg} alt="Imagem do pesqueiro" />
      </div>

      {/* Título centralizado */}
      <h2 className="text-center mb-4">Catálogo de Peixes</h2>

      {/* Cards */}
      <div className="row justify-content-center align-items-stretch g-4">

        {/* Card 1 - Pacu */}
        <div className="col-md-4 d-flex">
          <div className="card w-100">
          <img src={pacuImg} alt="Pacu" width={355} height={230}/>
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Pacu</h4>
              <p className="card-text">Horário ideal: Durante o dia, especialmente à tarde (12h às 16h)</p>
              <p className="card-text">Tamanho médio: 30 a 60 cm</p>
              <p className="card-text">Espinhas: Tem espinhas, mas é fácil de limpar. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara reforçada, linha média e iscas como frutas ou massas doces</p>
            </div>
          </div>
        </div>

        {/* Card 2 - Pintado */}
        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src={pintadoImg} alt="Pintado"  width={355} height={230} />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Pintado</h4>
              <p className="card-text">Horário ideal: Noite e madrugadas (21h às 4h)</p>
              <p className="card-text">Tamanho médio: 60 cm até mais de 1 metro</p>
              <p className="card-text">Espinhas: Poucas, carne firme. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara pesada, linha forte e isca viva ou peixe pequeno</p>
            </div>
          </div>
        </div>

        {/* Card 3 - Traíra */}
        <div className="col-md-4 d-flex">
          <div className="card w-100">
           <img src={trairaImg} alt="Traíra"  width={355} height={230} />
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

      {/* Descrição final */}
      <div className="mt-5">
        <h2>Informações e descrição sobre o pesqueiro</h2>
        <h3>🎣 Pesqueiro Lago do Pescador</h3>
        <p>
          Localizado em uma área de natureza preservada, o Pesqueiro Lago do Pescador é conhecido por seu ambiente calmo e familiar.
          Aberto até as 19h, oferece um restaurante com peixes frescos direto do lago e infraestrutura pensada para o conforto dos visitantes.
          Com entrada a apenas 20 reais por dia, é a escolha perfeita para quem quer pescar e saborear boas refeições com vista para a água.
        </p>
      </div>
    </div>
     
    </>
  );
}

export default Pesqueiro2;