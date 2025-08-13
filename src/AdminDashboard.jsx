import React, { useState } from 'react';
import FishAnimation from './Componentes/FishAnimation/FishAnimation';
import './App.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [pesqueiroData, setPesqueiroData] = useState({
    nome: 'Pesqueiro Águas Claras',
    endereco: 'Rua dos Pescadores, 123',
    telefone: '(11) 99999-9999',
    email: 'contato@aguasclaras.com',
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
  const [editingFish, setEditingFish] = useState(null);
  const [newFish, setNewFish] = useState({ nome: '', quantidade: '', tamanhoMedio: '', status: 'Abundante' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [reservas] = useState([
    { id: 1, nome: 'Carlos Silva', data: '2025-06-15', horario: '08:00', pessoas: 2, telefone: '(11) 99999-1111', status: 'Confirmada' },
    { id: 2, nome: 'Maria Santos', data: '2025-06-15', horario: '14:00', pessoas: 4, telefone: '(11) 99999-2222', status: 'Pendente' },
    { id: 3, nome: 'João Pescador', data: '2025-06-16', horario: '06:00', pessoas: 1, telefone: '(11) 99999-3333', status: 'Confirmada' },
    { id: 4, nome: 'Ana Costa', data: '2025-06-16', horario: '10:00', pessoas: 3, telefone: '(11) 99999-4444', status: 'Cancelada' },
    { id: 5, nome: 'Roberto Lima', data: '2025-06-17', horario: '07:00', pessoas: 2, telefone: '(11) 99999-5555', status: 'Pendente' }
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
    if (confirm('Tem certeza que deseja sair do painel administrativo?')) {
      window.location.href = '/login';
    }
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleAddFish = () => {
    if (newFish.nome && newFish.quantidade && newFish.tamanhoMedio) {
      const fish = {
        id: Math.max(...fishData.map(f => f.id)) + 1,
        ...newFish,
        quantidade: parseInt(newFish.quantidade)
      };
      setFishData([...fishData, fish]);
      setNewFish({ nome: '', quantidade: '', tamanhoMedio: '', status: 'Abundante' });
      setShowAddForm(false);
      alert('Peixe adicionado com sucesso!');
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const handleEditFish = (fish) => {
    setEditingFish({ ...fish });
  };

  const handleSaveFish = () => {
    setFishData(fishData.map(f => f.id === editingFish.id ? editingFish : f));
    setEditingFish(null);
    alert('Peixe atualizado com sucesso!');
  };

  const handleDeleteFish = (id) => {
    if (confirm('Tem certeza que deseja excluir este peixe?')) {
      setFishData(fishData.filter(f => f.id !== id));
      alert('Peixe excluído com sucesso!');
    }
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>🐟 Status dos Peixes</h4>
                <button className="btn btn-success btn-sm" onClick={() => setShowAddForm(true)}>
                  ➕ Adicionar
                </button>
              </div>
              
              {showAddForm && (
                <div className="mb-3 p-3 border rounded">
                  <h6>Adicionar Novo Peixe</h6>
                  <div className="row g-2">
                    <div className="col-6">
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        placeholder="Nome" 
                        value={newFish.nome}
                        onChange={(e) => setNewFish({...newFish, nome: e.target.value})}
                      />
                    </div>
                    <div className="col-6">
                      <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        placeholder="Quantidade" 
                        value={newFish.quantidade}
                        onChange={(e) => setNewFish({...newFish, quantidade: e.target.value})}
                      />
                    </div>
                    <div className="col-6">
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        placeholder="Tamanho" 
                        value={newFish.tamanhoMedio}
                        onChange={(e) => setNewFish({...newFish, tamanhoMedio: e.target.value})}
                      />
                    </div>
                    <div className="col-6">
                      <select 
                        className="form-select form-select-sm" 
                        value={newFish.status}
                        onChange={(e) => setNewFish({...newFish, status: e.target.value})}
                      >
                        <option value="Abundante">Abundante</option>
                        <option value="Moderado">Moderado</option>
                        <option value="Baixo">Baixo</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-success btn-sm me-2" onClick={handleAddFish}>
                        ✅ Salvar
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setShowAddForm(false)}>
                        ❌ Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {fishData.map(fish => (
                <div key={fish.id} className="fish-status-item mb-3">
                  {editingFish && editingFish.id === fish.id ? (
                    <div className="p-2 border rounded">
                      <div className="row g-2 mb-2">
                        <div className="col-6">
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            value={editingFish.nome}
                            onChange={(e) => setEditingFish({...editingFish, nome: e.target.value})}
                          />
                        </div>
                        <div className="col-6">
                          <input 
                            type="number" 
                            className="form-control form-control-sm" 
                            value={editingFish.quantidade}
                            onChange={(e) => setEditingFish({...editingFish, quantidade: parseInt(e.target.value)})}
                          />
                        </div>
                        <div className="col-6">
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            value={editingFish.tamanhoMedio}
                            onChange={(e) => setEditingFish({...editingFish, tamanhoMedio: e.target.value})}
                          />
                        </div>
                        <div className="col-6">
                          <select 
                            className="form-select form-select-sm" 
                            value={editingFish.status}
                            onChange={(e) => setEditingFish({...editingFish, status: e.target.value})}
                          >
                            <option value="Abundante">Abundante</option>
                            <option value="Moderado">Moderado</option>
                            <option value="Baixo">Baixo</option>
                          </select>
                        </div>
                      </div>
                      <button className="btn btn-success btn-sm me-2" onClick={handleSaveFish}>
                        ✅ Salvar
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingFish(null)}>
                        ❌ Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{fish.nome}</strong>
                        <div className="small text-muted">
                          Quantidade: {fish.quantidade} | Tamanho: {fish.tamanhoMedio}
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className={`badge ${fish.status === 'Abundante' ? 'bg-success' : fish.status === 'Moderado' ? 'bg-warning' : 'bg-danger'}`}>
                          {fish.status}
                        </span>
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditFish(fish)}>
                          ✏️
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteFish(fish.id)}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}
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
              <div>
                <h3>📋 Gerenciar Estabelecimento</h3>
                <p className="text-muted mb-0">Mantenha as informações sempre atualizadas para atrair mais pescadores</p>
              </div>
              {!isEditing ? (
                <button className="btn btn-primary btn-lg" onClick={handleEdit}>
                  ✏️ Editar Dados
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-success" onClick={handleSave}>
                    ✅ Salvar
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    ❌ Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <h5>🏢 Informações Básicas</h5>
                  <small className="text-muted">Dados principais do seu pesqueiro</small>
                </div>
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
                <div className="mb-3">
                  <h5>⚙️ Configurações Operacionais</h5>
                  <small className="text-muted">Horários, preços e estrutura</small>
                </div>
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
              <div className="alert alert-warning mt-4">
                <strong>⚠️ Atenção:</strong> Lembre-se de salvar suas alterações antes de sair desta página.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReservas = () => (
    <div className="row">
      <div className="col-12">
        <div className="card admin-main-card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3>📅 Gerenciar Reservas</h3>
                <p className="text-muted mb-0">Acompanhe e gerencie as reservas dos pescadores</p>
              </div>
              <div className="d-flex gap-2">
                <span className="badge bg-success">Confirmadas: {reservas.filter(r => r.status === 'Confirmada').length}</span>
                <span className="badge bg-warning">Pendentes: {reservas.filter(r => r.status === 'Pendente').length}</span>
                <span className="badge bg-danger">Canceladas: {reservas.filter(r => r.status === 'Cancelada').length}</span>
              </div>
            </div>
            
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Nome</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Pessoas</th>
                    <th>Telefone</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map(reserva => (
                    <tr key={reserva.id}>
                      <td><strong>{reserva.nome}</strong></td>
                      <td>{new Date(reserva.data).toLocaleDateString('pt-BR')}</td>
                      <td>{reserva.horario}</td>
                      <td>{reserva.pessoas} pessoa{reserva.pessoas > 1 ? 's' : ''}</td>
                      <td>{reserva.telefone}</td>
                      <td>
                        <span className={`badge ${
                          reserva.status === 'Confirmada' ? 'bg-success' :
                          reserva.status === 'Pendente' ? 'bg-warning' : 'bg-danger'
                        }`}>
                          {reserva.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          {reserva.status === 'Pendente' && (
                            <>
                              <button className="btn btn-success" title="Confirmar">
                                ✅
                              </button>
                              <button className="btn btn-danger" title="Cancelar">
                                ❌
                              </button>
                            </>
                          )}
                          <button className="btn btn-outline-primary" title="Contatar">
                            📞
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {reservas.length === 0 && (
              <div className="text-center py-4">
                <p className="text-muted">Nenhuma reserva encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      <FishAnimation />
      {/* Header melhorado */}
      <div className="admin-header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <h2 className="mb-1">🏢 Painel do Proprietário</h2>
              <p className="text-muted mb-0">Gerenciando: <strong>{pesqueiroData.nome}</strong></p>
              <small className="text-success">✅ Sistema Online</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-info btn-sm" onClick={toggleHelp}>
                ❓ Ajuda
              </button>
              <div className="admin-nav">
                <button 
                  className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                  onClick={() => setActiveTab('dashboard')}
                  title="Ver estatísticas e resumo"
                >
                  📊 Painel Principal
                </button>
                <button 
                  className={`btn ${activeTab === 'reservas' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                  onClick={() => setActiveTab('reservas')}
                  title="Gerenciar reservas dos pescadores"
                >
                  📅 Reservas
                </button>
                <button 
                  className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                  onClick={() => setActiveTab('settings')}
                  title="Editar informações do pesqueiro"
                >
                  ⚙️ Gerenciar Dados
                </button>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  🚪 Sair do Painel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ajuda rápida */}
      {showHelp && (
        <div className="container-fluid">
          <div className="alert alert-info mb-4">
            <h6>💡 Guia Rápido:</h6>
            <div className="row">
              <div className="col-md-6">
                <ul className="mb-0">
                  <li><strong>Painel Principal:</strong> Veja visitantes, avaliações e receita em tempo real</li>
                  <li><strong>Comentários:</strong> Acompanhe o que os pescadores estão falando</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="mb-0">
                  <li><strong>Gerenciar Dados:</strong> Atualize preços, horários e informações</li>
                  <li><strong>Status dos Peixes:</strong> Monitore o estoque disponível</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="container-fluid mt-4">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'reservas' && renderReservas()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}

export default AdminDashboard;