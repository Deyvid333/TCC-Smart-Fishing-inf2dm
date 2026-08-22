import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PesqueiroService from './services/PesqueiroService';
import UsuarioService from './services/UsuarioService';
import {
  PEIXES_DISPONIVEIS, parseInformacao, parseDescricao, buildInformacao, buildDescricao,
} from './utils/pesqueiroFormato';
import './App.css';

function PainelPesqueiro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pesqueiro, setPesqueiro] = useState(null);
  const [autorizado, setAutorizado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({
    nome: '', telefone: '', descricaoTexto: '', informacoesRapidas: '',
    regrasPermitido: '', regrasProibido: '', catalogoPeixes: '',
    cep: '', numero: '', complemento: '',
  });

  useEffect(() => {
    const usuario = UsuarioService.getCurrentUser();
    if (!usuario) {
      navigate('/login');
      return;
    }
    Promise.all([PesqueiroService.findById(id), PesqueiroService.meus()])
      .then(([respPesqueiro, respMeus]) => {
        const souDono = respMeus.data.some((p) => String(p.id) === String(id));
        setAutorizado(souDono);
        if (souDono) {
          setPesqueiro(respPesqueiro.data);
          popularEditData(respPesqueiro.data);
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar pesqueiro', err);
        setAutorizado(false);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const popularEditData = (p) => {
    const { regrasPermitido, regrasProibido } = parseInformacao(p.informacao);
    const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(p.descricao);
    setEditData({
      nome: p.nome || '', telefone: p.telefone || '',
      descricaoTexto, informacoesRapidas, regrasPermitido, regrasProibido, catalogoPeixes,
      cep: p.cep || '', numero: p.numero || '', complemento: p.complemento || '',
    });
  };

  const togglePeixe = (peixe) => {
    const selecionados = editData.catalogoPeixes
      ? editData.catalogoPeixes.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean)
      : [];
    const novos = selecionados.includes(peixe)
      ? selecionados.filter((p) => p !== peixe)
      : [...selecionados, peixe];
    setEditData({ ...editData, catalogoPeixes: novos.join(', ') });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const atualizado = {
        ...pesqueiro,
        nome: editData.nome,
        telefone: editData.telefone || '',
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
      alert('Pesqueiro atualizado com sucesso! Se ele já estava aprovado, a edição volta para análise.');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('⚠️ ATENÇÃO: Tem certeza que deseja DELETAR este pesqueiro? Esta ação não pode ser desfeita!')) return;
    if (!confirm('Confirma novamente? Todos os dados do pesqueiro serão perdidos permanentemente.')) return;
    try {
      setSaving(true);
      await PesqueiroService.remove(pesqueiro.id);
      alert('Pesqueiro deletado com sucesso!');
      window.close();
    } catch (err) {
      console.error('Erro ao deletar pesqueiro:', err);
      alert('Erro ao deletar pesqueiro. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const peixesSelecionados = editData.catalogoPeixes
    ? editData.catalogoPeixes.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean)
    : [];

  if (loading) {
    return <div className="admin-layout"><p className="text-center py-5">Carregando...</p></div>;
  }

  if (!autorizado) {
    return (
      <div className="admin-layout">
        <div className="container-fluid py-5 text-center">
          <h4>Você não tem permissão para administrar este pesqueiro.</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <h2 className="mb-1">Painel do Pesqueiro</h2>
              <p className="text-muted mb-0">Gerenciando: <strong>{pesqueiro?.nome}</strong></p>
            </div>
            {!isEditing ? (
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Editar Dados</button>
            ) : (
              <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={handleSave} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
                <button className="btn btn-secondary" onClick={() => { setIsEditing(false); popularEditData(pesqueiro); }}>Cancelar</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card admin-main-card">
              <div className="card-body p-4">
                {isEditing ? (
                  <div>
                    <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '8px' }}>📋 Informações Básicas</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-8">
                        <label className="form-label fw-bold">Nome</label>
                        <input className="form-control" value={editData.nome} onChange={(e) => setEditData({ ...editData, nome: e.target.value })} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Telefone</label>
                        <input className="form-control" value={editData.telefone} onChange={(e) => setEditData({ ...editData, telefone: e.target.value })} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold">Descrição</label>
                        <textarea className="form-control" rows={3} value={editData.descricaoTexto} onChange={(e) => setEditData({ ...editData, descricaoTexto: e.target.value })} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold">Informações Rápidas</label>
                        <textarea className="form-control" rows={4} value={editData.informacoesRapidas} onChange={(e) => setEditData({ ...editData, informacoesRapidas: e.target.value })} />
                      </div>
                    </div>

                    <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '8px' }}>📍 Endereço</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-5">
                        <label className="form-label fw-bold">CEP</label>
                        <input className="form-control" value={editData.cep} onChange={(e) => setEditData({ ...editData, cep: e.target.value })} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-bold">Número</label>
                        <input className="form-control" value={editData.numero} onChange={(e) => setEditData({ ...editData, numero: e.target.value })} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Complemento</label>
                        <input className="form-control" value={editData.complemento} onChange={(e) => setEditData({ ...editData, complemento: e.target.value })} />
                      </div>
                    </div>

                    <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '8px' }}>📜 Regras</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold" style={{ color: '#27ae60' }}>✓ Permitido</label>
                        <textarea className="form-control" rows={4} value={editData.regrasPermitido} onChange={(e) => setEditData({ ...editData, regrasPermitido: e.target.value })} style={{ borderLeft: '3px solid #27ae60' }} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold" style={{ color: '#e74c3c' }}>✗ Proibido</label>
                        <textarea className="form-control" rows={4} value={editData.regrasProibido} onChange={(e) => setEditData({ ...editData, regrasProibido: e.target.value })} style={{ borderLeft: '3px solid #e74c3c' }} />
                      </div>
                    </div>

                    <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '8px' }}>🐟 Catálogo de Peixes</h5>
                    <div className="row g-2 mb-4">
                      {PEIXES_DISPONIVEIS.map((peixe) => {
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

                    <div className="mt-5 pt-4" style={{ borderTop: '2px solid #e74c3c' }}>
                      <h5 className="mb-3" style={{ color: '#e74c3c' }}>⚠️ Zona de Perigo</h5>
                      <div className="alert alert-danger">Deletar o pesqueiro é permanente e não pode ser desfeito.</div>
                      <button className="btn btn-danger" onClick={handleDelete} disabled={saving}>
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
                      <p><strong>Status:</strong> <span className="badge bg-success">Aprovado</span></p>
                    </div>
                    <div className="col-md-6">
                      {editData.descricaoTexto && <p><strong>Descrição:</strong> {editData.descricaoTexto}</p>}
                      {editData.informacoesRapidas && <p><strong>Informações:</strong><br /><span style={{ whiteSpace: 'pre-wrap' }}>{editData.informacoesRapidas}</span></p>}
                      {editData.catalogoPeixes && <p><strong>Peixes:</strong> {editData.catalogoPeixes}</p>}
                      {editData.regrasPermitido && <p><strong>Permitido:</strong><br /><span style={{ whiteSpace: 'pre-wrap' }}>{editData.regrasPermitido}</span></p>}
                      {editData.regrasProibido && <p><strong>Proibido:</strong><br /><span style={{ whiteSpace: 'pre-wrap' }}>{editData.regrasProibido}</span></p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PainelPesqueiro;
