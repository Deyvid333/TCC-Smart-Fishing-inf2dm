import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PesqueiroService from './services/PesqueiroService';
import UsuarioService from './services/UsuarioService';
import { parseInformacao, parseDescricao } from './utils/pesqueiroFormato';
import './App.css';

function AdminModeracao() {
  const navigate = useNavigate();
  const [pendentes, setPendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processandoId, setProcessandoId] = useState(null);

  useEffect(() => {
    const usuario = UsuarioService.getCurrentUser();
    if (!usuario || usuario.nivelAcesso?.toUpperCase() !== 'ADMIN') {
      navigate('/login');
      return;
    }
    carregarPendentes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carregarPendentes = () => {
    setLoading(true);
    PesqueiroService.findPendentes()
      .then((res) => setPendentes(res.data))
      .catch((err) => console.error('Erro ao carregar pendentes', err))
      .finally(() => setLoading(false));
  };

  const handleAprovar = async (id) => {
    setProcessandoId(id);
    try {
      await PesqueiroService.aprovar(id);
      setPendentes((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao aprovar. Tente novamente.');
    } finally {
      setProcessandoId(null);
    }
  };

  const handleNegar = async (id) => {
    if (!confirm('Tem certeza que deseja negar essa solicitação?')) return;
    setProcessandoId(id);
    try {
      await PesqueiroService.negar(id);
      setPendentes((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao negar. Tente novamente.');
    } finally {
      setProcessandoId(null);
    }
  };

  const handleLogout = () => {
    UsuarioService.logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <h2 className="mb-1">Moderação de Pesqueiros</h2>
              <p className="text-muted mb-0">{pendentes.length} solicitação(ões) aguardando análise</p>
            </div>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Sair</button>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {loading ? (
              <p className="text-center py-5">Carregando...</p>
            ) : pendentes.length === 0 ? (
              <div className="card admin-main-card">
                <div className="card-body text-center py-5">
                  <h4>Nenhuma solicitação pendente no momento.</h4>
                </div>
              </div>
            ) : (
              pendentes.map((p) => {
                const { regrasPermitido, regrasProibido } = parseInformacao(p.informacao);
                const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(p.descricao);
                return (
                  <div key={p.id} className="card admin-main-card mb-3">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h4>{p.nome}</h4>
                        <div className="d-flex gap-2">
                          <button className="btn btn-success" disabled={processandoId === p.id} onClick={() => handleAprovar(p.id)}>
                            ✓ Aprovar
                          </button>
                          <button className="btn btn-danger" disabled={processandoId === p.id} onClick={() => handleNegar(p.id)}>
                            ✗ Negar
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Telefone:</strong> {p.telefone || '—'}</p>
                          <p><strong>CEP:</strong> {p.cep || '—'}</p>
                          <p><strong>Número:</strong> {p.numero || '—'}</p>
                          <p><strong>Complemento:</strong> {p.complemento || '—'}</p>
                          <p><strong>Cadastrado em:</strong> {p.dataCadastro || '—'}</p>
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
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminModeracao;
