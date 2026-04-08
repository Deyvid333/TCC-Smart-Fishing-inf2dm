// ========== IMPORTAÇÕES ==========
// Importa React e hook useState para gerenciar estados
import React, { useState } from 'react';
// Importa estilos CSS
import './App.css';

// ========== COMPONENTE DO PAINEL ADMINISTRATIVO ==========
function AdminDashboard() {
  // ========== ESTADOS PRINCIPAIS ==========
  // Estado para controlar qual aba está ativa no painel
  const [activeTab, setActiveTab] = useState('dashboard');
  // Estado para controlar se está editando informações do pesqueiro
  const [isEditing, setIsEditing] = useState(false);
  // Estado com dados do pesqueiro (editáveis)
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

  // ========== DADOS ESTATÍSTICOS ==========
  // Estatísticas do pesqueiro (dados simulados)
  const [stats] = useState({
    visitasHoje: 45,
    visitasMes: 1250,
    avaliacaoMedia: 4.7,
    totalComentarios: 23,
    receitaMes: 22500
  });

  // Comentários recentes (dados de exemplo)
  const [recentComments] = useState([
    { id: 1, nome: 'Carlos Silva', rating: 5, texto: 'Excelente pesqueiro!', data: 'há 2 horas' },
    { id: 2, nome: 'Maria Santos', rating: 4, texto: 'Muito bom para família.', data: 'há 5 horas' },
    { id: 3, nome: 'João Pescador', rating: 5, texto: 'Sempre volto aqui!', data: 'há 1 dia' }
  ]);

  const [fishData, setFishData] = useState(['Tilápia', 'Carpa', 'Pintado']);
  const [newFishName, setNewFishName] = useState('');
  // ========== ESTADOS PARA RESERVAS ==========
  // Lista de reservas de pesca
  const [reservas, setReservas] = useState([
    { id: 1, nome: 'Carlos Silva', data: '2025-06-15', horario: '08:00', pessoas: 2, telefone: '(11) 99999-1111', status: 'Confirmada', tipo: 'pesca' },
    { id: 2, nome: 'Maria Santos', data: '2025-06-15', horario: '14:00', pessoas: 4, telefone: '(11) 99999-2222', status: 'Pendente', tipo: 'pesca' },
    { id: 3, nome: 'João Pescador', data: '2025-06-16', horario: '06:00', pessoas: 1, telefone: '(11) 99999-3333', status: 'Confirmada', tipo: 'pesca' },
    { id: 4, nome: 'Ana Costa', data: '2025-06-16', horario: '10:00', pessoas: 3, telefone: '(11) 99999-4444', status: 'Cancelada', tipo: 'pesca' },
    { id: 5, nome: 'Roberto Lima', data: '2025-06-17', horario: '07:00', pessoas: 2, telefone: '(11) 99999-5555', status: 'Pendente', tipo: 'pesca' }
  ]);

  // Lista de reservas do restaurante
  const [reservasRestaurante, setReservasRestaurante] = useState([
    { id: 1, nome: 'Patricia Oliveira', data: '2025-06-15', horario: '12:30', pessoas: 4, telefone: '(11) 88888-1111', status: 'Confirmada', ocasiao: 'aniversario', observacoes: 'Mesa com vista para o lago' },
    { id: 2, nome: 'Fernando Costa', data: '2025-06-15', horario: '19:00', pessoas: 2, telefone: '(11) 88888-2222', status: 'Pendente', ocasiao: 'encontro', observacoes: '' },
    { id: 3, nome: 'Família Silva', data: '2025-06-16', horario: '13:00', pessoas: 6, telefone: '(11) 88888-3333', status: 'Confirmada', ocasiao: 'familia', observacoes: 'Criança com alergia a frutos do mar' }
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
  const handleConfirmarReserva = (id, tipo) => {
    if (tipo === 'restaurante') {
      setReservasRestaurante(reservasRestaurante.map(r => 
        r.id === id ? { ...r, status: 'Confirmada' } : r
      ));
    } else {
      setReservas(reservas.map(r => 
        r.id === id ? { ...r, status: 'Confirmada' } : r
      ));
    }
    alert('Reserva confirmada com sucesso!');
  };

  const handleCancelarReserva = (id, tipo) => {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
      if (tipo === 'restaurante') {
        setReservasRestaurante(reservasRestaurante.map(r => 
          r.id === id ? { ...r, status: 'Cancelada' } : r
        ));
      } else {
        setReservas(reservas.map(r => 
          r.id === id ? { ...r, status: 'Cancelada' } : r
        ));
      }
      alert('Reserva cancelada!');
    }
  };
  const handleAddFish = () => {
    const nome = newFishName.trim();
    if (!nome) return;
    if (fishData.includes(nome)) { alert('Peixe já está na lista!'); return; }
    setFishData([...fishData, nome]);
    setNewFishName('');
  };

  const handleDeleteFish = (nome) => {
    setFishData(fishData.filter(f => f !== nome));
  };
  const renderDashboard = () => (
    <>
      {/* Estatísticas Expandidas */}
      <div className="row mb-5 justify-content-center">
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon"></div>
            <div className="stat-number">{stats.visitasHoje}</div>
            <div className="stat-label">Visitas Hoje</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon"></div>
            <div className="stat-number">{stats.visitasMes}</div>
            <div className="stat-label">Visitas Este Mês</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon"></div>
            <div className="stat-number">{stats.avaliacaoMedia}</div>
            <div className="stat-label">Avaliação Média</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon"></div>
            <div className="stat-number">{stats.totalComentarios}</div>
            <div className="stat-label">Comentários</div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="admin-stat-card">
            <div className="stat-icon"></div>
            <div className="stat-number">R${stats.receitaMes.toLocaleString()}</div>
            <div className="stat-label">Receita Mensal</div>
          </div>
        </div>
      </div>

      {/* Comentários Recentes */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card admin-main-card">
            <div className="card-body">
              <h4>Comentários Recentes</h4>
              {recentComments.map(comment => (
                <div key={comment.id} className="comment-preview mb-3">
                  <div className="d-flex justify-content-between">
                    <strong>{comment.nome}</strong>
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
              <h4 className="mb-3">Peixes Disponíveis</h4>
              <div className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nome do peixe"
                  value={newFishName}
                  onChange={(e) => setNewFishName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddFish()}
                />
                <button className="btn btn-success btn-sm" onClick={handleAddFish}>Adicionar</button>
              </div>
              <ul className="list-group">
                {fishData.map((nome) => (
                  <li key={nome} className="list-group-item d-flex justify-content-between align-items-center">
                    {nome}
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteFish(nome)}>Remover</button>
                  </li>
                ))}
              </ul>
              {fishData.length === 0 && <p className="text-muted mt-2">Nenhum peixe cadastrado.</p>}
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
                <h3> Gerenciar Estabelecimento</h3>
                <p className="text-muted mb-0">Mantenha as informações sempre atualizadas para atrair mais pescadores</p>
              </div>
              {!isEditing ? (
                <button className="btn btn-primary btn-lg" onClick={handleEdit}>
                   Editar Dados
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-success" onClick={handleSave}>
                     Salvar
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                     Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <h5> Informações Básicas</h5>
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
                  <h5> Configurações Operacionais</h5>
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
                <strong> Atenção:</strong> Lembre-se de salvar suas alterações antes de sair desta página.
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
                <h3> Reservas de Pesca</h3>
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
                              <button 
                                className="btn btn-success" 
                                onClick={() => handleConfirmarReserva(reserva.id, 'pesca')}
                              >
                                Aceitar
                              </button>
                              <button 
                                className="btn btn-danger" 
                                onClick={() => handleCancelarReserva(reserva.id, 'pesca')}
                              >
                                Recusar
                              </button>
                            </>
                          )}
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

  const renderReservasRestaurante = () => (
    <div className="row">
      <div className="col-12">
        <div className="card admin-main-card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3> Reservas do Restaurante</h3>
                <p className="text-muted mb-0">Gerencie as reservas de mesa do restaurante</p>
              </div>
              <div className="d-flex gap-2">
                <span className="badge bg-success">Confirmadas: {reservasRestaurante.filter(r => r.status === 'Confirmada').length}</span>
                <span className="badge bg-warning">Pendentes: {reservasRestaurante.filter(r => r.status === 'Pendente').length}</span>
                <span className="badge bg-danger">Canceladas: {reservasRestaurante.filter(r => r.status === 'Cancelada').length}</span>
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
                    <th>Ocasião</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasRestaurante.map(reserva => (
                    <tr key={reserva.id}>
                      <td>
                        <strong>{reserva.nome}</strong>
                        {reserva.observacoes && (
                          <div className="small text-muted">
                             {reserva.observacoes}
                          </div>
                        )}
                      </td>
                      <td>{new Date(reserva.data).toLocaleDateString('pt-BR')}</td>
                      <td>{reserva.horario}</td>
                      <td>{reserva.pessoas} pessoa{reserva.pessoas > 1 ? 's' : ''}</td>
                      <td>{reserva.telefone}</td>
                      <td>
                        {reserva.ocasiao && (
                          <span className="badge bg-info">
                            {reserva.ocasiao === 'aniversario' ? ' Aniversário' :
                             reserva.ocasiao === 'encontro' ? ' Encontro' :
                             reserva.ocasiao === 'familia' ? ' Família' :
                             reserva.ocasiao === 'negocios' ? ' Negócios' :
                             reserva.ocasiao === 'comemoracao' ? ' Comemoração' : reserva.ocasiao}
                          </span>
                        )}
                      </td>
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
                              <button 
                                className="btn btn-success" 
                                onClick={() => handleConfirmarReserva(reserva.id, 'restaurante')}
                              >
                                Aceitar
                              </button>
                              <button 
                                className="btn btn-danger" 
                                onClick={() => handleCancelarReserva(reserva.id, 'restaurante')}
                              >
                                Recusar
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {reservasRestaurante.length === 0 && (
              <div className="text-center py-4">
                <p className="text-muted">Nenhuma reserva de restaurante encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      {/* Header melhorado */}
      <div className="admin-header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <h2 className="mb-1"> Painel do Proprietário</h2>
              <p className="text-muted mb-0">Gerenciando: <strong>{pesqueiroData.nome}</strong></p>
              <small className="text-success"> Sistema Online</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="admin-nav">
                <button 
                  className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                  onClick={() => setActiveTab('dashboard')}
                  title="Ver estatísticas e resumo"
                >
                   Painel Principal
                </button>
                <button 
                  className={`btn ${activeTab === 'reservas' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                  onClick={() => setActiveTab('reservas')}
                  title="Gerenciar reservas dos pescadores"
                >
                   Reservas Pesca
                </button>
                <button 
                  className={`btn ${activeTab === 'restaurante' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                  onClick={() => setActiveTab('restaurante')}
                  title="Gerenciar reservas do restaurante"
                >
                   Reservas Restaurante
                </button>
                <button 
                  className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                  onClick={() => setActiveTab('settings')}
                  title="Editar informações do pesqueiro"
                >
                   Gerenciar Dados
                </button>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                   Sair do Painel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Conteúdo principal */}
      <div className="container-fluid mt-4">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'reservas' && renderReservas()}
        {activeTab === 'restaurante' && renderReservasRestaurante()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}

export default AdminDashboard;