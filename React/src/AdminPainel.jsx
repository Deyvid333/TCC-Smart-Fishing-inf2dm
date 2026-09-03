import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import PesqueiroService from './services/PesqueiroService';
import ComentarioService from './services/ComentarioService';
import DenunciaService from './services/DenunciaService';
import UsuarioService from './services/UsuarioService';
import { parseInformacao, parseDescricao, formatarInfoRapidaTexto } from './utils/pesqueiroFormato';
import './Perfil.css';
import './Painel.css';

const IconeSeta = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

function AdminPainel() {
  const navigate = useNavigate();
  const adminLogado = UsuarioService.getCurrentUser();
  const [aba, setAba] = useState('solicitacoes');
  const [pendentes, setPendentes] = useState([]);
  const [pesqueiros, setPesqueiros] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [banidos, setBanidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processandoId, setProcessandoId] = useState(null);
  const [expandido, setExpandido] = useState(null);

  useEffect(() => {
    const usuario = UsuarioService.getCurrentUser();
    if (!usuario || usuario.nivelAcesso?.toUpperCase() !== 'ADMIN') {
      navigate('/login');
      return;
    }
    carregarTudo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carregarTudo = () => {
    setLoading(true);
    Promise.all([
      PesqueiroService.findPendentes(),
      PesqueiroService.findAll(),
      DenunciaService.listar(),
      UsuarioService.findAll(),
    ]).then(([resPendentes, resPesqueiros, resDenuncias, resUsuarios]) => {
      setPendentes(resPendentes.data);
      setPesqueiros(resPesqueiros.data);
      setDenuncias(resDenuncias.data);
      setBanidos(resUsuarios.data.filter((u) => u.statusUsuario === false));
    }).catch((err) => console.error('Erro ao carregar dados do admin', err))
      .finally(() => setLoading(false));
  };

  const toggleExpandir = (chave) => setExpandido(expandido === chave ? null : chave);

  const handleAprovar = async (id) => {
    setProcessandoId(id);
    try {
      await PesqueiroService.aprovar(id);
      setPendentes((prev) => prev.filter((p) => p.id !== id));
      carregarTudo();
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

  const handleApagarPesqueiro = async (id) => {
    if (!confirm('Tem certeza que deseja apagar esse pesqueiro? Essa ação não pode ser desfeita.')) return;
    setProcessandoId(id);
    try {
      await PesqueiroService.remove(id);
      setPesqueiros((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao apagar pesqueiro. Tente novamente.');
    } finally {
      setProcessandoId(null);
    }
  };

  const handleApagarComentario = async (comentarioId) => {
    if (!confirm('Apagar esse comentário?')) return;
    setProcessandoId(comentarioId);
    try {
      await ComentarioService.remove(comentarioId);
      setDenuncias((prev) => prev.filter((d) => d.comentarioId !== comentarioId));
    } catch (err) {
      console.error(err);
      alert('Erro ao apagar comentário. Tente novamente.');
    } finally {
      setProcessandoId(null);
    }
  };

  const handleBanirUsuario = async (usuarioId, comentarioId) => {
    if (!confirm('Tem certeza que deseja banir esse usuário? Ele não vai mais conseguir logar.')) return;
    setProcessandoId(comentarioId);
    try {
      await UsuarioService.banir(usuarioId);
      carregarTudo();
      alert('Usuário banido com sucesso.');
    } catch (err) {
      console.error(err);
      alert('Erro ao banir usuário. Tente novamente.');
    } finally {
      setProcessandoId(null);
    }
  };

  const handleDispensarDenuncia = async (comentarioId) => {
    setProcessandoId(comentarioId);
    try {
      await DenunciaService.dispensar(comentarioId);
      setDenuncias((prev) => prev.filter((d) => d.comentarioId !== comentarioId));
    } catch (err) {
      console.error(err);
      alert('Erro ao dispensar denúncia. Tente novamente.');
    } finally {
      setProcessandoId(null);
    }
  };

  const handleDesbanirUsuario = async (usuarioId) => {
    setProcessandoId(usuarioId);
    try {
      await UsuarioService.desbanir(usuarioId);
      setBanidos((prev) => prev.filter((u) => u.id !== usuarioId));
    } catch (err) {
      console.error(err);
      alert('Erro ao desbanir usuário. Tente novamente.');
    } finally {
      setProcessandoId(null);
    }
  };

  const abas = [
    { chave: 'solicitacoes', label: 'Solicitações pendentes', total: pendentes.length },
    { chave: 'pesqueiros', label: 'Pesqueiros existentes', total: pesqueiros.length },
    { chave: 'denuncias', label: 'Comentários denunciados', total: denuncias.length },
    { chave: 'banidos', label: 'Usuários banidos', total: banidos.length },
  ];

  return (
    <div className="perfil-page">
      <Navbar />

      <div className="perfil-cover">
        <svg className="perfil-waves" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path fill="rgba(123,205,186,0.35)" d="M0 45c180-30 300 30 480 22s300-52 480-37 300 45 480 30v30H0z" />
          <path fill="#f4f8fb" d="M0 65c200-22 340 18 520 11s320-40 480-26 260 33 440 22v20H0z" />
        </svg>
      </div>

      <div className="painel-header">
        <h2 className="perfil-name">Painel de moderação</h2>
        <span className="perfil-badge">Gerencie pesqueiros, solicitações e comentários denunciados</span>
      </div>

      <div className="painel-layout">
        <aside className="painel-sidebar">
          {abas.map((item) => (
            <button
              key={item.chave}
              type="button"
              className={`painel-sidebar-btn ${aba === item.chave ? 'is-active' : ''}`}
              onClick={() => { setAba(item.chave); setExpandido(null); }}
            >
              <span>{item.label}</span>
              <span className="painel-sidebar-count">{item.total}</span>
            </button>
          ))}
        </aside>

        <main className="painel-main">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <>
              {aba === 'solicitacoes' && (
                pendentes.length === 0 ? (
                  <div className="perfil-card-inner text-center"><p className="mb-0">Nenhuma solicitação pendente no momento.</p></div>
                ) : pendentes.map((p) => {
                  const { regrasPermitido, regrasProibido } = parseInformacao(p.informacao);
                  const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(p.descricao);
                  const chave = `sol-${p.id}`;
                  const aberto = expandido === chave;
                  return (
                    <div key={p.id} className="painel-expand-card">
                      <div className="painel-expand-head" onClick={() => toggleExpandir(chave)}>
                        <div className="painel-expand-head-info">
                          {p.foto && <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} className="painel-row-photo" />}
                          <div>
                            <div className="painel-expand-title">{p.nome}</div>
                            <div className="painel-expand-sub">Enviado em {p.dataCadastro}</div>
                          </div>
                        </div>
                        <span className={`painel-expand-arrow ${aberto ? 'is-open' : ''}`}><IconeSeta /></span>
                      </div>
                      {aberto && (
                        <div className="painel-expand-body">
                          <div className="perfil-field"><span className="perfil-field-label">Telefone</span><span className="perfil-field-value">{p.telefone || '—'}</span></div>
                          <div className="perfil-field"><span className="perfil-field-label">CNPJ</span><span className="perfil-field-value">{p.cnpj || '—'}</span></div>
                          <div className="perfil-field"><span className="perfil-field-label">Endereço</span><span className="perfil-field-value">{p.cep || '—'} · {p.numero || '—'} · {p.complemento || '—'}</span></div>
                          {p.linkMapa && (
                            <div className="perfil-field">
                              <span className="perfil-field-label">Mapa</span>
                              <a href={p.linkMapa} target="_blank" rel="noopener noreferrer" className="painel-map-link">Conferir no Google Maps →</a>
                            </div>
                          )}
                          {descricaoTexto && <div className="perfil-field"><span className="perfil-field-label">Descrição</span><span className="perfil-field-value">{descricaoTexto}</span></div>}
                          {informacoesRapidas && <div className="perfil-field"><span className="perfil-field-label">Funcionamento</span><span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{formatarInfoRapidaTexto(informacoesRapidas)}</span></div>}
                          {catalogoPeixes && <div className="perfil-field"><span className="perfil-field-label">Peixes</span><span className="perfil-field-value">{catalogoPeixes}</span></div>}
                          {regrasPermitido && <div className="perfil-field"><span className="perfil-field-label">Permitido</span><span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{regrasPermitido}</span></div>}
                          {regrasProibido && <div className="perfil-field"><span className="perfil-field-label">Proibido</span><span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{regrasProibido}</span></div>}
                          <div className="perfil-actions">
                            <button className="perfil-btn perfil-btn-primary" disabled={processandoId === p.id} onClick={() => handleAprovar(p.id)}>Aprovar</button>
                            <button className="perfil-btn perfil-btn-danger" disabled={processandoId === p.id} onClick={() => handleNegar(p.id)}>Negar</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {aba === 'pesqueiros' && (
                pesqueiros.length === 0 ? (
                  <div className="perfil-card-inner text-center"><p className="mb-0">Nenhum pesqueiro aprovado ainda.</p></div>
                ) : pesqueiros.map((p) => {
                  const { regrasPermitido, regrasProibido } = parseInformacao(p.informacao);
                  const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(p.descricao);
                  const chave = `pes-${p.id}`;
                  const aberto = expandido === chave;
                  return (
                    <div key={p.id} className="painel-expand-card">
                      <div className="painel-expand-head" onClick={() => toggleExpandir(chave)}>
                        <div className="painel-expand-head-info">
                          {p.foto && <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} className="painel-row-photo" />}
                          <div>
                            <div className="painel-expand-title">{p.nome}</div>
                            <div className="painel-expand-sub">{p.telefone || 'Sem telefone'}</div>
                          </div>
                        </div>
                        <span className={`painel-expand-arrow ${aberto ? 'is-open' : ''}`}><IconeSeta /></span>
                      </div>
                      {aberto && (
                        <div className="painel-expand-body">
                          <div className="perfil-field"><span className="perfil-field-label">CNPJ</span><span className="perfil-field-value">{p.cnpj || '—'}</span></div>
                          <div className="perfil-field"><span className="perfil-field-label">Endereço</span><span className="perfil-field-value">{p.cep || '—'} · {p.numero || '—'} · {p.complemento || '—'}</span></div>
                          {p.linkMapa && (
                            <div className="perfil-field">
                              <span className="perfil-field-label">Mapa</span>
                              <a href={p.linkMapa} target="_blank" rel="noopener noreferrer" className="painel-map-link">Conferir no Google Maps →</a>
                            </div>
                          )}
                          {descricaoTexto && <div className="perfil-field"><span className="perfil-field-label">Descrição</span><span className="perfil-field-value">{descricaoTexto}</span></div>}
                          {informacoesRapidas && <div className="perfil-field"><span className="perfil-field-label">Funcionamento</span><span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{formatarInfoRapidaTexto(informacoesRapidas)}</span></div>}
                          {catalogoPeixes && <div className="perfil-field"><span className="perfil-field-label">Peixes</span><span className="perfil-field-value">{catalogoPeixes}</span></div>}
                          {regrasPermitido && <div className="perfil-field"><span className="perfil-field-label">Permitido</span><span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{regrasPermitido}</span></div>}
                          {regrasProibido && <div className="perfil-field"><span className="perfil-field-label">Proibido</span><span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{regrasProibido}</span></div>}
                          <div className="perfil-danger-zone">
                            <button className="perfil-btn perfil-btn-danger" style={{ flex: '0 0 auto', padding: '0 28px' }} disabled={processandoId === p.id} onClick={() => handleApagarPesqueiro(p.id)}>
                              Apagar pesqueiro
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {aba === 'denuncias' && (
                denuncias.length === 0 ? (
                  <div className="perfil-card-inner text-center"><p className="mb-0">Nenhum comentário denunciado no momento.</p></div>
                ) : denuncias.map((d) => {
                  const chave = `den-${d.comentarioId}`;
                  const aberto = expandido === chave;
                  return (
                    <div key={d.comentarioId} className="painel-expand-card">
                      <div className="painel-expand-head" onClick={() => toggleExpandir(chave)}>
                        <div className="painel-expand-head-info">
                          <div>
                            <div className="painel-expand-title">{d.autorNome} — {d.pesqueiroNome}</div>
                            <div className="painel-expand-sub">{d.quantidadeDenuncias} denúncia(s)</div>
                          </div>
                        </div>
                        <span className={`painel-expand-arrow ${aberto ? 'is-open' : ''}`}><IconeSeta /></span>
                      </div>
                      {aberto && (
                        <div className="painel-expand-body">
                          <div className="perfil-field"><span className="perfil-field-label">Comentário</span><span className="perfil-field-value">{d.descricao}</span></div>
                          <div className="perfil-field"><span className="perfil-field-label">Nota</span><span className="perfil-field-value">{d.nota ? `${d.nota} estrela(s)` : '—'}</span></div>
                          <div className="perfil-field"><span className="perfil-field-label">Data</span><span className="perfil-field-value">{d.dataCadastro || '—'}</span></div>
                          <div className="perfil-actions">
                            <button className="perfil-btn perfil-btn-ghost" disabled={processandoId === d.comentarioId} onClick={() => handleDispensarDenuncia(d.comentarioId)}>
                              Dispensar denúncia
                            </button>
                            <button className="perfil-btn perfil-btn-danger" disabled={processandoId === d.comentarioId} onClick={() => handleApagarComentario(d.comentarioId)}>
                              Apagar comentário
                            </button>
                          </div>
                          {d.autorId && d.autorId !== adminLogado?.id && (
                            <div className="perfil-danger-zone">
                              <p>Banir impede o usuário de fazer login novamente.</p>
                              <button className="perfil-btn perfil-btn-danger" style={{ flex: '0 0 auto', padding: '0 28px' }} disabled={processandoId === d.comentarioId} onClick={() => handleBanirUsuario(d.autorId, d.comentarioId)}>
                                Banir usuário
                              </button>
                            </div>
                          )}
                          {d.autorId && d.autorId === adminLogado?.id && (
                            <div className="perfil-danger-zone">
                              <p>Esse comentário é seu — você não pode banir a si mesmo.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {aba === 'banidos' && (
                banidos.length === 0 ? (
                  <div className="perfil-card-inner text-center"><p className="mb-0">Nenhum usuário banido no momento.</p></div>
                ) : banidos.map((u) => {
                  const chave = `ban-${u.id}`;
                  const aberto = expandido === chave;
                  return (
                    <div key={u.id} className="painel-expand-card">
                      <div className="painel-expand-head" onClick={() => toggleExpandir(chave)}>
                        <div className="painel-expand-head-info">
                          <div>
                            <div className="painel-expand-title">{u.nome}</div>
                            <div className="painel-expand-sub">{u.email}</div>
                          </div>
                        </div>
                        <span className={`painel-expand-arrow ${aberto ? 'is-open' : ''}`}><IconeSeta /></span>
                      </div>
                      {aberto && (
                        <div className="painel-expand-body">
                          <div className="perfil-field"><span className="perfil-field-label">Cadastrado em</span><span className="perfil-field-value">{u.dataCadastro || '—'}</span></div>
                          <div className="perfil-actions">
                            <button className="perfil-btn perfil-btn-primary" disabled={processandoId === u.id} onClick={() => handleDesbanirUsuario(u.id)}>
                              Desbanir usuário
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPainel;
