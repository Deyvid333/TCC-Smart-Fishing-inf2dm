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

  const [playerData] = useState({
    level: 15,
    xp: 2350,
    xpToNext: 2500,
    title: 'Pescador Experiente',
    rank: 3,
    totalPlayers: 1247
  });

  const [achievements] = useState([
    { id: 1, name: 'Primeiro Peixe', description: 'Capture seu primeiro peixe', icon: '', unlocked: true, xp: 50 },
    { id: 2, name: 'Pescador Dedicado', description: 'Visite 10 pesqueiros diferentes', icon: '', unlocked: true, xp: 100 },
    { id: 3, name: 'Mestre dos Lagos', description: 'Capture 100 peixes', icon: '', unlocked: false, xp: 200 },
    { id: 4, name: 'Gigante dos Rios', description: 'Capture um peixe de mais de 5kg', icon: '', unlocked: false, xp: 150 },
    { id: 5, name: 'Madrugador', description: 'Pesque antes das 6h da manhã', icon: '', unlocked: true, xp: 75 },
    { id: 6, name: 'Noturno', description: 'Pesque depois das 22h', icon: '', unlocked: false, xp: 75 }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: 'Carlos Mestre', level: 28, xp: 8450, title: 'Lenda dos Lagos', avatar: '' },
    { rank: 2, name: 'Ana Pescadora', level: 22, xp: 6200, title: 'Rainha dos Rios', avatar: '' },
    { rank: 3, name: 'João Silva', level: 15, xp: 2350, title: 'Pescador Experiente', avatar: '' },
    { rank: 4, name: 'Maria Costa', level: 12, xp: 1890, title: 'Pescadora Ativa', avatar: '' },
    { rank: 5, name: 'Pedro Santos', level: 10, xp: 1450, title: 'Pescador Iniciante', avatar: '' }
  ]);

  const getLevelIcon = (level) => {
    if (level >= 25) return 'Lv.25+';
    if (level >= 20) return 'Lv.20+';
    if (level >= 15) return 'Lv.15+';
    if (level >= 10) return 'Lv.10+';
    if (level >= 5) return 'Lv.5+';
    return 'Lv.1';
  };

  const getLevelTitle = (level) => {
    if (level >= 25) return 'Lenda dos Lagos';
    if (level >= 20) return 'Mestre Pescador';
    if (level >= 15) return 'Pescador Experiente';
    if (level >= 10) return 'Pescador Ativo';
    if (level >= 5) return 'Pescador Iniciante';
    return 'Novato';
  };

  const getXPPercentage = () => {
    const currentLevelXP = playerData.xp - (playerData.level - 1) * 100;
    const xpForThisLevel = 100;
    return (currentLevelXP / xpForThisLevel) * 100;
  };

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



  return (
    <>
      <Navbar />
      <div className="user-page-content">
        <div className="container mt-4">
          <h2 className="text-center mb-5">Meu Perfil</h2>
          
          <div className="row">
            {/* Formulário 1 - Perfil Pessoal */}
            <div className="col-md-6">
              <div className="card admin-main-card">
                <div className="card-body">
                  <h3 className="mb-4">Perfil Pessoal</h3>
                  
                  <div className="text-center mb-4">
                    <div className="player-avatar mb-3">
                      <span className="level-icon">{getLevelIcon(playerData.level)}</span>
                      <div className="level-badge">Lv. {playerData.level}</div>
                    </div>
                    <h4>{profileData.apelido}</h4>
                    <p className="player-title">{playerData.title}</p>
                    <p className="text-muted">Pescador desde {profileData.anoInicio}</p>
                    
                    {/* Barra de XP */}
                    <div className="xp-section mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <small>XP: {playerData.xp}</small>
                        <small>Próximo: {playerData.xpToNext}</small>
                      </div>
                      <div className="progress xp-bar">
                        <div 
                          className="progress-bar" 
                          style={{width: `${getXPPercentage()}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Ranking */}
                    <div className="ranking-badge">
                      <span className="rank-number">#{playerData.rank}</span>
                      <span className="rank-text"> no ranking</span>
                    </div>
                  </div>

                  {/* Informações Pessoais */}
                  <div className="mb-4">
                    <h6><strong>Informações Pessoais:</strong></h6>
                    {isEditing ? (
                      <form>
                        <div className="mb-3">
                          <label className="form-label"><strong>Nome:</strong></label>
                          <input type="text" className="form-control" defaultValue={profileData.nome} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label"><strong>Email:</strong></label>
                          <input type="email" className="form-control" defaultValue={profileData.email} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label"><strong>Telefone:</strong></label>
                          <input type="tel" className="form-control" defaultValue={profileData.telefone} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label"><strong>Cidade:</strong></label>
                          <input type="text" className="form-control" defaultValue={profileData.cidade} />
                        </div>
                      </form>
                    ) : (
                      <div>
                        <p><strong>Nome:</strong> {profileData.nome}</p>
                        <p><strong>Email:</strong> {profileData.email}</p>
                        <p><strong>Telefone:</strong> {profileData.telefone}</p>
                        <p><strong>Cidade:</strong> {profileData.cidade}</p>
                      </div>
                    )}
                  </div>

                  {/* Estatísticas de Pesca */}
                  <div className="mb-4">
                    <h6><strong>Estatísticas de Pesca:</strong></h6>
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

                  {/* Botões de ação */}
                  <div className="row">
                    {isEditing ? (
                      <>
                        <div className="col-6">
                          <button className="btn btn-success w-100" onClick={handleSave}>Salvar</button>
                        </div>
                        <div className="col-6">
                          <button className="btn btn-secondary w-100" onClick={handleCancel}>Cancelar</button>
                        </div>
                      </>
                    ) : (
                      <div className="col-12">
                        <button className="btn btn-primary w-100" onClick={handleEdit}>Editar Perfil</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário 2 - Conquistas e Ranking */}
            <div className="col-md-6">
              <div className="card admin-main-card">
                <div className="card-body">
                  <h3 className="mb-4">Conquistas & Ranking</h3>
                  
                  {/* Conquistas Concluídas */}
                  <div className="mb-4">
                    <h6><strong>Conquistas Concluídas:</strong></h6>
                    <div className="achievements-grid">
                      {achievements.filter(achievement => achievement.unlocked).map(achievement => (
                        <div key={achievement.id} className="achievement-card unlocked">
                          <div className="achievement-icon">{achievement.icon}</div>
                          <div className="achievement-info">
                            <h6>{achievement.name}</h6>
                            <p>{achievement.description}</p>
                            <small>+{achievement.xp} XP</small>
                          </div>
                        </div>
                      ))}
                    </div>
                    {achievements.filter(achievement => achievement.unlocked).length === 0 && (
                      <p className="text-muted text-center">Nenhuma conquista desbloqueada ainda.</p>
                    )}
                  </div>

                  {/* Conquistas Não Concluídas */}
                  <div className="mb-4">
                    <h6><strong>Conquistas Pendentes:</strong></h6>
                    <div className="achievements-grid">
                      {achievements.filter(achievement => !achievement.unlocked).map(achievement => (
                        <div key={achievement.id} className="achievement-card locked">
                          <div className="achievement-icon">-</div>
                          <div className="achievement-info">
                            <h6>{achievement.name}</h6>
                            <p>{achievement.description}</p>
                            <small>+{achievement.xp} XP</small>
                          </div>
                        </div>
                      ))}
                    </div>
                    {achievements.filter(achievement => !achievement.unlocked).length === 0 && (
                      <p className="text-success text-center">Todas as conquistas desbloqueadas!</p>
                    )}
                  </div>

                  {/* Ranking dos Melhores Pescadores */}
                  <div className="leaderboard">
                    <h6><strong>Top Pescadores:</strong></h6>
                    {leaderboard.map(player => (
                      <div key={player.rank} className={`leaderboard-item ${player.rank === playerData.rank ? 'current-player' : ''}`}>
                        <div className="rank-position">#{player.rank}</div>
                        <div className="player-avatar-small">{player.avatar}</div>
                        <div className="player-info">
                          <strong>{player.name}</strong>
                          <div className="player-stats">
                            <span>Lv. {player.level}</span>
                            <span>{player.xp} XP</span>
                          </div>
                          <small className="player-title-small">{player.title}</small>
                        </div>
                      </div>
                    ))}
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