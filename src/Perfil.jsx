import React from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';

function Perfil() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-5">Meu Perfil</h2>
        
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <div className="profile-avatar mb-3">
                    <img src="https://via.placeholder.com/120" alt="Avatar" className="rounded-circle" width="120" height="120" />
                  </div>
                  <h4>João Pescador</h4>
                  <p className="text-muted">Pescador desde 2015</p>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <h5>📋 Informações Pessoais</h5>
                    <p><strong>Nome:</strong> João Silva</p>
                    <p><strong>Email:</strong> joao@email.com</p>
                    <p><strong>Telefone:</strong> (11) 99999-9999</p>
                    <p><strong>Cidade:</strong> São Paulo, SP</p>
                  </div>
                  <div className="col-md-6">
                    <h5>🎣 Estatísticas de Pesca</h5>
                    <p><strong>Pesqueiros visitados:</strong> 12</p>
                    <p><strong>Peixes capturados:</strong> 87</p>
                    <p><strong>Maior peixe:</strong> Tilápia 2.5kg</p>
                    <p><strong>Peixe favorito:</strong> Dourado</p>
                  </div>
                </div>

                <hr />

                <h5 className="mb-3">⚙️ Configurações da Conta</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-primary w-100">Editar Perfil</button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-outline-primary w-100">Alterar Senha</button>
                  </div>
                </div>

                <hr />

                <h5 className="mb-3">🏆 Conquistas Recentes</h5>
                <div className="row">
                  <div className="col-md-4 text-center mb-3">
                    <div className="achievement-badge">🥇</div>
                    <small>Primeiro Peixe</small>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <div className="achievement-badge">🎣</div>
                    <small>10 Pescarias</small>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <div className="achievement-badge">⭐</div>
                    <small>Pescador Experiente</small>
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

export default Perfil;