import React, { useState, useEffect } from 'react';
import './App.css';
import UsuarioService from './services/UsuarioService';
import PesqueiroService from './services/PesqueiroService';
import UsuarioPesqueiroService from './services/UsuarioPesqueiroService';

const PEIXES_DISPONIVEIS = [
  'tilapia','dourado','carpa','pacu','tambaqui','pintado','traira',
  'curimbata','lambari','piau','patinga','jundia','matrinxa','tucunare',
  'tambacu','cachara','bicuda','trairao','catfish'
];

const parseInformacao = (informacao) => {
  if (!informacao) return { regrasPermitido: '', regrasProibido: '' };
  const partes = informacao.split('|');
  return {
    regrasPermitido: partes.find(p => p.startsWith('P:'))?.replace('P:', '') || '',
    regrasProibido: partes.find(p => p.startsWith('X:'))?.replace('X:', '') || '',
  };
};

const parseDescricao = (descricao) => {
  if (!descricao) return { descricaoTexto: '', informacoesRapidas: '', catalogoPeixes: '' };
  const partes = descricao.split(' | ');
  return {
    descricaoTexto: partes[0] || '',
    informacoesRapidas: partes.find(p => p.startsWith('Info:'))?.replace('Info:', '') || '',
    catalogoPeixes: partes.find(p => p.startsWith('F:'))?.replace('F:', '') || '',
  };
};

const buildInformacao = (regrasPermitido, regrasProibido) => {
  const partes = [
    regrasPermitido ? 'P:' + regrasPermitido.substring(0, 40) : '',
    regrasProibido ? 'X:' + regrasProibido.substring(0, 40) : '',
  ].filter(Boolean);
  return partes.join('|').substring(0, 100) || null;
};

const buildDescricao = (descricaoTexto, informacoesRapidas, catalogoPeixes) => {
  const partes = [
    descricaoTexto,
    informacoesRapidas ? 'Info:' + informacoesRapidas : '',
    catalogoPeixes ? 'F:' + catalogoPeixes : '',
  ].filter(Boolean);
  return partes.join(' | ').substring(0, 600) || null;
};

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pesqueiro, setPesqueiro] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({
    nome: '', telefone: '', descricaoTexto: '', informacoesRapidas: '',
    regrasPermitido: '', regrasProibido: '', catalogoPeixes: '',
    cep: '', numero: '', complemento: '',
  });

  useEffect(() => {
    const carregarPesqueiro = async () => {
      try {
        const usuario = UsuarioService.getCurrentUser();
        if (!usuario) return;
        const relacoes = await UsuarioPesqueiroService.findAll();
        const minhaRelacao = relacoes.data.find(r =>
          r.usuarioId === usuario.id || r.usuario?.id === usuario.id
        );
        if (minhaRelacao) {
          const pesqueiroId = minhaRelacao.pesqueiroId || minhaRelacao.pesqueiro?.id;
          const resp = await PesqueiroService.findById(pesqueiroId);
          setPesqueiro(resp.data);
          popularEditData(resp.data);
        }
      } catch (err) {
        console.error('Erro ao carregar pesqueiro:', err);
      } finally {
        setLoading(false);
      }
    };
    carregarPesqueiro();
  }, []);

  const popularEditData = (p) => {
    const { regrasPermitido, regrasProibido } = parseInformacao(p.informacao);
    const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(p.descricao);
    setEditData({
      nome: p.nome || '',
      telefone: p.telefone || '',
      descricaoTexto,
      informacoesRapidas,
      regrasPermitido,
      regrasProibido,
      catalogoPeixes,
      cep: p.cep || '',
      numero: p.numero || '',
      complemento: p.complemento || '',
    });
  };

  const togglePeixe = (peixe) => {
    const selecionados = editData.catalogoPeixes
      ? editData.catalogoPeixes.split(',').map(p => p.trim().toLowerCase()).filter(Boolean)
      : [];
    const novos = selecionados.includes(peixe)
      ? selecionados.filter(p => p !== peixe)
      : [...selecionados, peixe];
    setEditData({ ...editData, catalogoPeixes: novos.join(', ') });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const atualizado = {
        ...pesqueiro,
        nome: editData.nome,
        telefone: editData.telefone || null,
        descricao: buildDescricao(editData.descricaoTexto, editData.informacoesRapidas, editData.catalogoPeixes),
        informacao: buildInformacao(editData.regrasPermitido, editData.regrasProibido),
        cep: editData.cep ? editData.cep.replace(/\D/g, '').substring(0, 8) : null,
        numero: editData.numero ? editData.numero.substring(0, 10) : null,
        complemento: editData.complemento ? editData.complemento.substring(0, 50) : null,
      };
      const resp = await PesqueiroService.update(pesqueiro.id, atualizado);
      setPesqueiro(resp.data);
      popularEditData(resp.data);
      setIsEditing(false);
      alert('Pesqueiro atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('⚠️ ATENÇÃO: Tem certeza que deseja DELETAR este pesqueiro? Esta ação não pode ser desfeita!')) {
      return;
    }
    if (!confirm('Confirma novamente? Todos os dados do pesqueiro serão perdidos permanentemente.')) {
      return;
    }
    
    try {
      setSaving(true);
      await PesqueiroService.remove(pesqueiro.id);
      alert('Pesqueiro deletado com sucesso!');
      UsuarioService.logout();
      window.location.href = '/login';
    } catch (err) {
      console.error('Erro ao deletar pesqueiro:', err);
      alert('Erro ao deletar pesqueiro. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      UsuarioService.logout();
      window.location.href = '/login';
    }
  };

  const { regrasPermitido, regrasProibido } = parseInformacao(pesqueiro?.informacao);
  const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(pesqueiro?.descricao);
  const peixesSelecionados = editData.catalogoPeixes
    ? editData.catalogoPeixes.split(',').map(p => p.trim().toLowerCase()).filter(Boolean)
    : [];

  const renderDashboard = () => (
    <div className="row justify-content-center">
      <div className="col-md-10">
        {loading ? (
          <div className="text-center py-5"><p>Carregando seu pesqueiro...</p></div>
        ) : !pesqueiro ? (
          <div className="card admin-main-card">
            <div className="card-body text-center py-5">
              <h4>Você ainda não tem um pesqueiro cadastrado.</h4>
              <a href="/cadastro-pesqueiro" className="btn btn-primary mt-3">Cadastrar Pesqueiro</a>
            </div>
          </div>
        ) : (
          <div className="card admin-main-card">
            <div className="card-body p-4">
              <h3 className="mb-4">🎣 {pesqueiro.nome}</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <p><strong>Telefone:</strong> {pesqueiro.telefone || '—'}</p>
                  <p><strong>CEP:</strong> {pesqueiro.cep || '—'}</p>
                  <p><strong>Número:</strong> {pesqueiro.numero || '—'}</p>
                  <p><strong>Complemento:</strong> {pesqueiro.complemento || '—'}</p>
                  <p><strong>Cadastrado em:</strong> {pesqueiro.dataCadastro || '—'}</p>
                  <p><strong>Status:</strong> <span className={`badge ${pesqueiro.statusPesqueiro ? 'bg-success' : 'bg-danger'}`}>{pesqueiro.statusPesqueiro ? 'Ativo' : 'Inativo'}</span></p>
                </div>
                <div className="col-md-6">
                  {descricaoTexto && <p><strong>Descrição:</strong> {descricaoTexto}</p>}
                  {informacoesRapidas && <p><strong>Informações:</strong> <span style={{ whiteSpace: 'pre-wrap' }}>{informacoesRapidas}</span></p>}
                  {catalogoPeixes && <p><strong>Peixes:</strong> {catalogoPeixes}</p>}
                  {regrasPermitido && <p><strong>Permitido:</strong> <span style={{ whiteSpace: 'pre-wrap' }}>{regrasPermitido}</span></p>}
                  {regrasProibido && <p><strong>Proibido:</strong> <span style={{ whiteSpace: 'pre-wrap' }}>{regrasProibido}</span></p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="row justify-content-center">
      <div className="col-md-10">
        {loading ? (
          <div className="text-center py-5"><p>Carregando...</p></div>
        ) : !pesqueiro ? (
          <div className="card admin-main-card">
            <div className="card-body text-center py-5">
              <h4>Nenhum pesqueiro encontrado.</h4>
              <a href="/cadastro-pesqueiro" className="btn btn-primary mt-3">Cadastrar Pesqueiro</a>
            </div>
          </div>
        ) : (
          <div className="card admin-main-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Gerenciar Pesqueiro</h3>
                {!isEditing ? (
                  <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Editar Dados</button>
                ) : (
                  <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={handleSave} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
                    <button className="btn btn-secondary" onClick={() => { setIsEditing(false); popularEditData(pesqueiro); }}>Cancelar</button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div>
                  <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '8px' }}>📋 Informações Básicas</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-8">
                      <label className="form-label fw-bold">Nome</label>
                      <input className="form-control" value={editData.nome} onChange={e => setEditData({...editData, nome: e.target.value})} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Telefone</label>
                      <input className="form-control" value={editData.telefone} onChange={e => setEditData({...editData, telefone: e.target.value})} />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Descrição</label>
                      <textarea className="form-control" rows={3} value={editData.descricaoTexto} onChange={e => setEditData({...editData, descricaoTexto: e.target.value})} />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Informações Rápidas</label>
                      <small className="text-muted d-block mb-1">Pode usar Enter para separar em tópicos</small>
                      <textarea className="form-control" rows={4} placeholder={"Horário: 6h às 18h\nPreço: R$30/dia\nÁrea: 5.000m²"} value={editData.informacoesRapidas} onChange={e => setEditData({...editData, informacoesRapidas: e.target.value})} />
                    </div>
                  </div>

                  <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '8px' }}>📍 Endereço</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-5">
                      <label className="form-label fw-bold">CEP</label>
                      <input className="form-control" value={editData.cep} onChange={e => setEditData({...editData, cep: e.target.value})} />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold">Número</label>
                      <input className="form-control" value={editData.numero} onChange={e => setEditData({...editData, numero: e.target.value})} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Complemento</label>
                      <input className="form-control" value={editData.complemento} onChange={e => setEditData({...editData, complemento: e.target.value})} />
                    </div>
                  </div>

                  <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '8px' }}>📜 Regras</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold" style={{ color: '#27ae60' }}>✓ Permitido</label>
                      <small className="text-muted d-block mb-1">Uma regra por linha</small>
                      <textarea className="form-control" rows={4} value={editData.regrasPermitido} onChange={e => setEditData({...editData, regrasPermitido: e.target.value})} style={{ borderLeft: '3px solid #27ae60' }} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold" style={{ color: '#e74c3c' }}>✗ Proibido</label>
                      <small className="text-muted d-block mb-1">Uma regra por linha</small>
                      <textarea className="form-control" rows={4} value={editData.regrasProibido} onChange={e => setEditData({...editData, regrasProibido: e.target.value})} style={{ borderLeft: '3px solid #e74c3c' }} />
                    </div>
                  </div>

                  <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '8px' }}>🐟 Catálogo de Peixes</h5>
                  <small className="text-muted d-block mb-3">Clique para selecionar os peixes disponíveis no seu pesqueiro:</small>
                  <div className="row g-2">
                    {PEIXES_DISPONIVEIS.map(peixe => {
                      const marcado = peixesSelecionados.includes(peixe);
                      return (
                        <div key={peixe} className="col-6 col-md-3">
                          <div
                            onClick={() => togglePeixe(peixe)}
                            style={{
                              padding: '8px 12px', borderRadius: '8px', cursor: 'pointer',
                              border: marcado ? '2px solid #3F72AF' : '2px solid #DBE2EF',
                              background: marcado ? '#DBE2EF' : '#F9F7F7',
                              fontWeight: marcado ? '600' : '400',
                              color: marcado ? '#112D4E' : '#666',
                              textTransform: 'capitalize',
                              userSelect: 'none',
                            }}
                          >
                            {marcado ? '✓ ' : ''}{peixe}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Zona de Perigo - Deletar Pesqueiro */}
                  <div className="mt-5 pt-4" style={{ borderTop: '2px solid #e74c3c' }}>
                    <h5 className="mb-3" style={{ color: '#e74c3c' }}>⚠️ Zona de Perigo</h5>
                    <div className="alert alert-danger" role="alert">
                      <strong>Atenção!</strong> Deletar o pesqueiro é uma ação permanente e não pode ser desfeita. Todos os dados serão perdidos.
                    </div>
                    <button 
                      className="btn btn-danger" 
                      onClick={handleDelete}
                      disabled={saving}
                    >
                      {saving ? 'Deletando...' : '🗑️ Deletar Pesqueiro Permanentemente'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Nome:</strong> {pesqueiro.nome}</p>
                    <p><strong>Telefone:</strong> {pesqueiro.telefone || '—'}</p>
                    <p><strong>CEP:</strong> {pesqueiro.cep || '—'}</p>
                    <p><strong>Número:</strong> {pesqueiro.numero || '—'}</p>
                    <p><strong>Complemento:</strong> {pesqueiro.complemento || '—'}</p>
                  </div>
                  <div className="col-md-6">
                    {descricaoTexto && <p><strong>Descrição:</strong> {descricaoTexto}</p>}
                    {informacoesRapidas && <p><strong>Informações:</strong><br /><span style={{ whiteSpace: 'pre-wrap' }}>{informacoesRapidas}</span></p>}
                    {catalogoPeixes && <p><strong>Peixes:</strong> {catalogoPeixes}</p>}
                    {regrasPermitido && <p><strong>Permitido:</strong><br /><span style={{ whiteSpace: 'pre-wrap' }}>{regrasPermitido}</span></p>}
                    {regrasProibido && <p><strong>Proibido:</strong><br /><span style={{ whiteSpace: 'pre-wrap' }}>{regrasProibido}</span></p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <h2 className="mb-1">Painel do Proprietário</h2>
              <p className="text-muted mb-0">Gerenciando: <strong>{pesqueiro?.nome || 'Carregando...'}</strong></p>
              <small className="text-success">Sistema Online</small>
            </div>
            <div className="admin-nav">
              <button className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'} me-2`} onClick={() => setActiveTab('dashboard')}>Painel Principal</button>
              <button className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline-primary'} me-2`} onClick={() => setActiveTab('settings')}>Gerenciar Dados</button>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Sair</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-4">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}

export default AdminDashboard;
