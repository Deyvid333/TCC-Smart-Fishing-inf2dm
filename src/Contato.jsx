import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';

function Contato() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-5">Entre em Contato</h2>
        
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">📞 Informações de Contato</h4>
                
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h5>📍 Endereço</h5>
                    <p>Rua dos Pescadores, 123<br/>
                    Bairro Lago Azul<br/>
                    CEP: 12345-678</p>
                  </div>
                  <div className="col-md-6">
                    <h5>📱 Telefone</h5>
                    <p>(11) 99999-9999</p>
                    
                    <h5>✉️ Email</h5>
                    <p>contato@smartfishing.com</p>
                  </div>
                </div>

                <hr />

                <h4 className="mb-4">💬 Envie sua Mensagem</h4>
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Nome</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" required />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Assunto</label>
                    <input type="text" className="form-control" required />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Mensagem</label>
                    <textarea className="form-control" rows="5" required></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Enviar Mensagem</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contato;