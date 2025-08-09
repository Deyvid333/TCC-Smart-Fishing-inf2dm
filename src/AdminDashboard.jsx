import React, { useState } from 'react';
import './App.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [pesqueiroData, setPesqueiroData] = useState({
    nome: 'Pesqueiro dos Vara Grande',
    endereco: 'Rua dos Pescadores, 123',
    telefone: '(11) 99999-9999',
    email: 'contato@varagrande.com',
    horario: '8h às 22h30',
    precoUtil: '18',
    precoFimSemana: '25',
    area: '15000',
    profundidade: '2.5',
    quiosques: '8',
    vagas: '50'
  });

  const [stats] = useState({
    visitasHoje: 45,
    visitasMes: 1250,
    avaliacaoMedia: 4.7,
    totalComentarios: 23,
    receitaMes: 22500,
    pescadoresAtivos: 156
  });

  const [recentComments] = useState([
    { id: 1, nome: 'Carlos Silva', rating: 5, texto: 'Excelente pesqueiro!', data: 'há 2 horas' },
    { id: 2, nome: 'Maria Santos', rating: 4, texto: 'Muito bom para família.', data: 'há 5 horas' },
    { id: 3, nome: 'João Pescador', rating: 5, texto: 'Sempre volto aqui!', data: 'há 1 dia' }
  ]);

  const [fishData, setFishData] = useState([
    { id: 1, nome: 'Tilápia', quantidade: 150, tamanhoMedio: '30cm', status: 'Abundante' },
    { id: 2, nome: 'Carpa', quantidade: 80, tamanhoMedio: '45cm', status: 'Moderado' },
    { id: 3, nome: 'Pintado', quantidade: 25, tamanhoMedio: '65cm', status: 'Baixo' }
  ]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Informações do pesqueiro atualizadas com sucesso!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setPesqueiroData({
      ...pesqueiroData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    window.location.href = '/inicial';
  };

  const renderDashboard = () => (
    <>
      {/* Estatísticas Expandidas */}
      <div className="row mb-5">
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-number">{stats.visitasHoje}</div>
            <div className="stat-label">Visitas Hoje</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-number">{stats.visitasMes}</div>
            <div className="stat-label">Visitas Este Mês</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">{stats.avaliacaoMedia}</div>
            <div className="stat-label">Avaliação Média</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-number">{stats.totalComentarios}</div>
            <div className="stat-label">Comentários</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-number">R${stats.receitaMes.toLocaleString()}</div>
            <div className="stat-label">Receita Mensal</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon">🎣</div>
            <div className="stat-number">{stats.pescadoresAtivos}</div>
            <div className="stat-label">Pescadores Ativos</div>
          </div>
        </div>
      </div>

      {/* Comentários Recentes */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card admin-main-card">
            <div className="card-body">
              <h4>💬 Comentários Recentes</h4>
              {recentComments.map(comment => (
                <div key={comment.id} className="comment-preview mb-3">
                  <div className="d-flex justify-content-between">
                    <strong>{comment.nome}</strong>
                    <span>{'⭐'.repeat(comment.rating)}</span>
                  </div>
                  <p className="mb-1">{comment.texto}</p>
                  <small className="text-muted">{comment.data}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card admin-main-card">
            <div className="card-body">
              <h4>🐟 Status dos Peixes</h4>
              {fishData.map(fish => (
                <div key={fish.id} className="fish-status-item mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{fish.nome}</strong>
                      <div className="small text-muted">
                        Quantidade: {fish.quantidade} | Tamanho: {fish.tamanhoMedio}
                      </div>
                    </div>
                    <span className={`badge ${fish.status === 'Abundante' ? 'bg-success' : fish.status === 'Moderado' ? 'bg-warning' : 'bg-danger'}`}>
                      {fish.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderSettings = () => (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card admin-main-card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>📋 Informações do Pesqueiro</h3>
              {!isEditing && (
                <button className="btn btn-primary" onClick={handleEdit}>
                  ✏️ Editar Informações
                </button>
              )}
            </div>

            <div className="row">
              <div className="col-md-6">
                <h5>🏢 Dados Básicos</h5>
                {isEditing ? (
                  <div>
                    <div className="mb-3">
                      <label className="form-label"><strong>Nome do Pesqueiro:</strong></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="nome"
                        value={pesqueiroData.nome}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label"><strong>Endereço:</strong></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="endereco"
                        value={pesqueiroData.endereco}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label"><strong>Telefone:</strong></label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        name="telefone"
                        value={pesqueiroData.telefone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label"><strong>Email:</strong></label>
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        value={pesqueiroData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p><strong>Nome:</strong> {pesqueiroData.nome}</p>
                    <p><strong>Endereço:</strong> {pesqueiroData.endereco}</p>
                    <p><strong>Telefone:</strong> {pesqueiroData.telefone}</p>
                    <p><strong>Email:</strong> {pesqueiroData.email}</p>
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <h5>⚙️ Configurações</h5>
                {isEditing ? (
                  <div>
                    <div className="mb-3">
                      <label className="form-label"><strong>Horário:</strong></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="horario"
                        value={pesqueiroData.horario}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="form-label"><strong>Preço (úteis):</strong></label>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="precoUtil"
                            value={pesqueiroData.precoUtil}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="form-label"><strong>Preço (fim de semana):</strong></label>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="precoFimSemana"
                            value={pesqueiroData.precoFimSemana}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p><strong>Horário:</strong> {pesqueiroData.horario}</p>
                    <p><strong>Preços:</strong> R${pesqueiroData.precoUtil} (úteis) | R${pesqueiroData.precoFimSemana} (fins de semana)</p>
                    <p><strong>Área:</strong> {pesqueiroData.area} m²</p>
                    <p><strong>Profundidade:</strong> {pesqueiroData.profundidade}m (média)</p>
                    <p><strong>Quiosques:</strong> {pesqueiroData.quiosques} unidades</p>
                    <p><strong>Estacionamento:</strong> {pesqueiroData.vagas} vagas</p>
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex gap-3 justify-content-center">
                    <button className="btn btn-success" onClick={handleSave}>
                      💾 Salvar Alterações
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      ❌ Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      {/* Header com navegação */}
      <div className="admin-header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h2 className="mb-0">🏢 {pesqueiroData.nome}</h2>
            <div className="admin-nav">
              <button 
                className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                onClick={() => setActiveTab('dashboard')}
              >
                📊 Dashboard
              </button>
              <button 
                className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ Configurações
              </button>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                🚪 Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container-fluid mt-4">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}

export default AdminDashboard;