import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';

function Contato() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-5">Entre em Contato</h2>
        
        <div className="row g-4">
          {/* Formulário de Informações de Contato */}
          <div className="col-md-6">
            <div className="card contact-info-card">
              <div className="card-body">
                <h4 className="card-title mb-4">Informações de Contato</h4>
                
                <div className="contact-info-item">
                  <div className="contact-icon">Endereço</div>
                  <div className="contact-details">
                    <h5>Endereço</h5>
                    <p>Rua dos Pescadores, 123<br/>
                    Bairro Lago Azul<br/>
                    CEP: 12345-678</p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <div className="contact-icon">Telefone</div>
                  <div className="contact-details">
                    <h5>Telefone</h5>
                    <p>(11) 99999-9999</p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <div className="contact-icon">Email</div>
                  <div className="contact-details">
                    <h5>Email</h5>
                    <p>contato@smartfishing.com</p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <div className="contact-icon">Horário</div>
                  <div className="contact-details">
                    <h5>Horário de Atendimento</h5>
                    <p>Segunda a Sexta: 8h às 18h<br/>
                    Sábados: 8h às 14h</p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <div className="contact-icon">Redes Sociais</div>
                  <div className="contact-details">
                    <h5>Redes Sociais</h5>
                    <p>@smartfishing<br/>
                    Facebook | Instagram | Twitter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulário de Envio de Mensagem */}
          <div className="col-md-6">
            <div className="card contact-form-card">
              <div className="card-body">
                <h4 className="card-title mb-4">Envie sua Mensagem</h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nome Completo</label>
                    <input type="text" className="form-control" placeholder="Seu nome completo" required />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="seu@email.com" required />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Telefone (opcional)</label>
                    <input type="tel" className="form-control" placeholder="(11) 99999-9999" />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Assunto</label>
                    <select className="form-control" required>
                      <option value="">Selecione um assunto</option>
                      <option value="duvida">Dúvida sobre pesqueiros</option>
                      <option value="sugestao">Sugestão</option>
                      <option value="problema">Reportar problema</option>
                      <option value="parceria">Parceria</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Mensagem</label>
                    <textarea className="form-control" rows="6" placeholder="Escreva sua mensagem aqui..." required></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100">Enviar Mensagem</button>
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