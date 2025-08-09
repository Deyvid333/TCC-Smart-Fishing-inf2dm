import React, { useState } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';

function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData] = useState({
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    cidade: 'São Paulo, SP',
    apelido: 'João Pescador',
    anoInicio: '2015'
  });

  const [fishingStats, setFishingStats] = useState({
    pesqueirosVisitados: '12',
    peixesCapturados: '87',
    maiorPeixe: 'Tilápia 2.5kg',
    peixeFavorito: 'Dourado'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Estatísticas atualizadas com sucesso!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleStatsChange = (e) => {
    setFishingStats({
      ...fishingStats,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = () => {
    alert('Redirecionando para alteração de senha...');
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-5">Meu Perfil</h2>
        
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-11">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <h4>{profileData.apelido}</h4>
                  <p className="text-muted">Pescador desde {profileData.anoInicio}</p>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <h5>📋 Informações Pessoais</h5>
                    <div>
                      <p><strong>Nome:</strong> {profileData.nome}</p>
                      <p><strong>Email:</strong> {profileData.email}</p>
                      <p><strong>Telefone:</strong> {profileData.telefone}</p>
                      <p><strong>Cidade:</strong> {profileData.cidade}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h5>🎣 Estatísticas de Pesca</h5>
                    {isEditing ? (
                      <div>
                        <div className="mb-3">
                          <label className="form-label"><strong>Pesqueiros visitados:</strong></label>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="pesqueirosVisitados"
                            value={fishingStats.pesqueirosVisitados}
                            onChange={handleStatsChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label"><strong>Peixes capturados:</strong></label>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="peixesCapturados"
                            value={fishingStats.peixesCapturados}
                            onChange={handleStatsChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label"><strong>Maior peixe:</strong></label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="maiorPeixe"
                            value={fishingStats.maiorPeixe}
                            onChange={handleStatsChange}
                            placeholder="Ex: Tilápia 2.5kg"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label"><strong>Peixe favorito:</strong></label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="peixeFavorito"
                            value={fishingStats.peixeFavorito}
                            onChange={handleStatsChange}
                            placeholder="Ex: Dourado"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p><strong>Pesqueiros visitados:</strong> {fishingStats.pesqueirosVisitados}</p>
                        <p><strong>Peixes capturados:</strong> {fishingStats.peixesCapturados}</p>
                        <p><strong>Maior peixe:</strong> {fishingStats.maiorPeixe}</p>
                        <p><strong>Peixe favorito:</strong> {fishingStats.peixeFavorito}</p>
                      </div>
                    )}
                  </div>
                </div>

                <hr />

                <h5 className="mb-3">⚙️ Configurações da Conta</h5>
                <div className="row">
                  {isEditing ? (
                    <>
                      <div className="col-md-4 mb-3">
                        <button className="btn btn-success w-100" onClick={handleSave}>Salvar Estatísticas</button>
                      </div>
                      <div className="col-md-4 mb-3">
                        <button className="btn btn-secondary w-100" onClick={handleCancel}>Cancelar</button>
                      </div>
                      <div className="col-md-4 mb-3">
                        <button className="btn btn-outline-primary w-100" onClick={handlePasswordChange}>Alterar Senha</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-md-6 mb-3">
                        <button className="btn btn-primary w-100" onClick={handleEdit}>Editar Estatísticas</button>
                      </div>
                      <div className="col-md-6 mb-3">
                        <button className="btn btn-outline-primary w-100" onClick={handlePasswordChange}>Alterar Senha</button>
                      </div>
                    </>
                  )}
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