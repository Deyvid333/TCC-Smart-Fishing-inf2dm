import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import PesqueiroService from './services/PesqueiroService';
import UsuarioService from './services/UsuarioService';
import { parseInformacao, parseDescricao } from './utils/pesqueiroFormato';
import './Perfil.css';
import './Painel.css';

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

  return (
    <div className="perfil-page">
      <Navbar />

      <div className="perfil-cover">
        <svg className="perfil-waves" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path fill="rgba(123,205,186,0.35)" d="M0 45c180-30 300 30 480 22s300-52 480-37 300 45 480 30v30H0z" />
          <path fill="#f4f8fb" d="M0 65c200-22 340 18 520 11s320-40 480-26 260 33 440 22v20H0z" />
        </svg>
      </div>

      <div className="perfil-header">
        <h2 className="perfil-name">Moderação de pesqueiros</h2>
        <span className="perfil-badge">{pendentes.length} solicitação(ões) aguardando análise</span>
      </div>

      <div className="perfil-card" style={{ maxWidth: '760px' }}>
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : pendentes.length === 0 ? (
          <div className="perfil-card-inner text-center">
            <p className="mb-0">Nenhuma solicitação pendente no momento.</p>
          </div>
        ) : (
          pendentes.map((p) => {
            const { regrasPermitido, regrasProibido } = parseInformacao(p.informacao);
            const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(p.descricao);
            return (
              <div key={p.id} className="perfil-card-inner" style={{ marginBottom: '20px' }}>
                {p.foto && <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: '16px' }} />}

                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h4 style={{ color: 'var(--navy)', margin: 0 }}>{p.nome}</h4>
                  <div className="d-flex gap-2">
                    <button className="perfil-btn perfil-btn-primary" style={{ flex: 'none', padding: '0 20px' }} disabled={processandoId === p.id} onClick={() => handleAprovar(p.id)}>
                      Aprovar
                    </button>
                    <button className="perfil-btn perfil-btn-danger" style={{ flex: 'none', padding: '0 20px' }} disabled={processandoId === p.id} onClick={() => handleNegar(p.id)}>
                      Negar
                    </button>
                  </div>
                </div>

                <div className="perfil-field">
                  <span className="perfil-field-label">Telefone</span>
                  <span className="perfil-field-value">{p.telefone || '—'}</span>
                </div>
                <div className="perfil-field">
                  <span className="perfil-field-label">CNPJ</span>
                  <span className="perfil-field-value">{p.cnpj || '—'}</span>
                </div>
                <div className="perfil-field">
                  <span className="perfil-field-label">Endereço</span>
                  <span className="perfil-field-value">{p.cep || '—'} · {p.numero || '—'} · {p.complemento || '—'}</span>
                </div>
                {p.linkMapa && (
                  <div className="perfil-field">
                    <span className="perfil-field-label">Mapa</span>
                    <a href={p.linkMapa} target="_blank" rel="noopener noreferrer" className="painel-map-link">Ver no Google Maps</a>
                  </div>
                )}
                {descricaoTexto && (
                  <div className="perfil-field">
                    <span className="perfil-field-label">Descrição</span>
                    <span className="perfil-field-value">{descricaoTexto}</span>
                  </div>
                )}
                {informacoesRapidas && (
                  <div className="perfil-field">
                    <span className="perfil-field-label">Informações rápidas</span>
                    <span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{informacoesRapidas}</span>
                  </div>
                )}
                {catalogoPeixes && (
                  <div className="perfil-field">
                    <span className="perfil-field-label">Peixes</span>
                    <span className="perfil-field-value">{catalogoPeixes}</span>
                  </div>
                )}
                {regrasPermitido && (
                  <div className="perfil-field">
                    <span className="perfil-field-label">Permitido</span>
                    <span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{regrasPermitido}</span>
                  </div>
                )}
                {regrasProibido && (
                  <div className="perfil-field">
                    <span className="perfil-field-label">Proibido</span>
                    <span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{regrasProibido}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AdminModeracao;
