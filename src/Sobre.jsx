
import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';

function Sobre() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center mb-5">Sobre Nós</h1>
                
                <div className="row mb-5">
                  <div className="col-md-6">
                    <h3>Nossa Missão</h3>
                    <p>
                      O Smart Fishing nasceu com o objetivo de conectar pescadores aos melhores pesqueiros da região. 
                      Queremos facilitar a vida de quem ama pescar, oferecendo informações detalhadas e confiáveis 
                      sobre locais, peixes e condições de pesca.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h3>Nossa Visão</h3>
                    <p>
                      Ser a principal plataforma de referência para pescadores, promovendo o turismo de pesca 
                      sustentável e conectando pessoas que compartilham a paixão pela pescaria em águas doces.
                    </p>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-12">
                    <h3 className="text-center mb-4">O que Oferecemos</h3>
                    <div className="row">
                      <div className="col-md-4 text-center mb-3">
                        <div className="feature-icon" style={{fontSize: '3rem', marginBottom: '15px'}}></div>
                        <h5>Localização Precisa</h5>
                        <p>Informações detalhadas sobre localização, acesso e infraestrutura dos pesqueiros.</p>
                      </div>
                      <div className="col-md-4 text-center mb-3">
                        <div className="feature-icon" style={{fontSize: '3rem', marginBottom: '15px'}}></div>
                        <h5>Catálogo de Peixes</h5>
                        <p>Informações sobre espécies, horários ideais, iscas e técnicas de pesca.</p>
                      </div>
                      <div className="col-md-4 text-center mb-3">
                        <div className="feature-icon" style={{fontSize: '3rem', marginBottom: '15px'}}></div>
                        <h5>Preços e Horários</h5>
                        <p>Informações atualizadas sobre valores, horários de funcionamento e serviços.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 text-center">
                    <h3 className="mb-4">Nossa Equipe</h3>
                    <p className="lead">
                      Somos um time apaixonado por pesca e tecnologia, dedicado a criar a melhor 
                      experiência para pescadores de todos os níveis. Nosso objetivo é tornar cada 
                      pescaria uma aventura inesquecível!
                    </p>
                    <div className="mt-4">
                      <p><strong>Entre em contato conosco:</strong></p>
                      <p>contato@smartfishing.com | (11) 99999-9999</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sobre;
