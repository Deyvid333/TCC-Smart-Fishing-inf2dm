import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import Paginacao from './Componentes/Paginacao';
import PesqueiroService from './services/PesqueiroService';
import PesqueiroFotoService from './services/PesqueiroFotoService';
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
  const [usuarios, setUsuarios] = useState([]);
  const [buscaUsuario, setBuscaUsuario] = useState('');
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [confirmandoNivelId, setConfirmandoNivelId] = useState(null);
  const [confirmandoBanimentoId, setConfirmandoBanimentoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processandoId, setProcessandoId] = useState(null);
  const [expandido, setExpandido] = useState(null);
  const [galerias, setGalerias] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);
  const ITENS_POR_PAGINA = 8;

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
      setUsuarios(resUsuarios.data);
    }).catch((err) => console.error('Erro ao carregar dados do admin', err))
      .finally(() => setLoading(false));
  };

  const toggleExpandir = (chave, pesqueiroId) => {
    const abrindo = expandido !== chave;
    setExpandido(abrindo ? chave : null);
    if (abrindo && pesqueiroId && !galerias[pesqueiroId]) {
      PesqueiroFotoService.listar(pesqueiroId)
        .then((res) => setGalerias((prev) => ({ ...prev, [pesqueiroId]: res.data })))
        .catch((err) => console.error('Erro ao carregar fotos do pesqueiro', err));
    }
  };

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

  const handleAlterarNivelAcesso = async (usuario) => {
    const novoNivel = usuario.nivelAcesso?.toUpperCase() === 'ADMIN' ? 'USUARIO' : 'ADMIN';
    if (confirmandoNivelId !== usuario.id) {
      setConfirmandoNivelId(usuario.id);
      setTimeout(() => setConfirmandoNivelId((atual) => (atual === usuario.id ? null : atual)), 3000);
      return;
    }
    setConfirmandoNivelId(null);
    setProcessandoId(usuario.id);
    try {
      await UsuarioService.alterarNivelAcesso(usuario.id, novoNivel);
      setUsuarios((prev) => prev.map((u) => (u.id === usuario.id ? { ...u, nivelAcesso: novoNivel } : u)));
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Erro ao alterar nível de acesso. Tente novamente.';
      alert(msg);
    } finally {
      setProcessandoId(null);
    }
  };

  const handleDesbanirUsuario = async (usuarioId) => {
    setProcessandoId(usuarioId);
    try {
      await UsuarioService.desbanir(usuarioId);
      setBanidos((prev) => prev.filter((u) => u.id !== usuarioId));
      setUsuarios((prev) => prev.map((u) => (u.id === usuarioId ? { ...u, statusUsuario: true } : u)));
    } catch (err) {
      console.error(err);
      alert('Erro ao desbanir usuário. Tente novamente.');
    } finally {
      setProcessandoId(null);
    }
  };

  const handleBanirUsuarioTab = async (usuario) => {
    if (confirmandoBanimentoId !== usuario.id) {
      setConfirmandoBanimentoId(usuario.id);
      setTimeout(() => setConfirmandoBanimentoId((atual) => (atual === usuario.id ? null : atual)), 3000);
      return;
    }
    setConfirmandoBanimentoId(null);
    setProcessandoId(usuario.id);
    try {
      await UsuarioService.banir(usuario.id);
      setUsuarios((prev) => prev.map((u) => (u.id === usuario.id ? { ...u, statusUsuario: false } : u)));
      setBanidos((prev) => (prev.some((u) => u.id === usuario.id) ? prev : [...prev, { ...usuario, statusUsuario: false }]));
    } catch (err) {
      console.error(err);
      alert('Erro ao banir usuário. Tente novamente.');
    } finally {
      setProcessandoId(null);
    }
  };

  const abas = [
    { chave: 'solicitacoes', label: 'Solicitações pendentes', total: pendentes.length },
    { chave: 'pesqueiros', label: 'Pesqueiros existentes', total: pesqueiros.length },
    { chave: 'denuncias', label: 'Comentários denunciados', total: denuncias.length },
    { chave: 'banidos', label: 'Usuários banidos', total: banidos.length },
    { chave: 'usuarios', label: 'Usuários', total: usuarios.length },
  ];

  const usuariosFiltrados = usuarios.filter((u) => {
    const combinaBusca = !buscaUsuario.trim()
      || u.nome?.toLowerCase().includes(buscaUsuario.trim().toLowerCase())
      || u.email?.toLowerCase().includes(buscaUsuario.trim().toLowerCase());
    const nivel = u.nivelAcesso?.toUpperCase();
    const combinaNivel = filtroNivel === 'todos' || nivel === filtroNivel;
    return combinaBusca && combinaNivel;
  });

  const paginar = (lista) => {
    const totalPaginas = Math.max(1, Math.ceil(lista.length / ITENS_POR_PAGINA));
    const paginaSegura = Math.min(paginaAtual, totalPaginas);
    const itens = lista.slice((paginaSegura - 1) * ITENS_POR_PAGINA, paginaSegura * ITENS_POR_PAGINA);
    return { itens, totalPaginas };
  };

  const { itens: pendentesPagina, totalPaginas: totalPaginasPendentes } = paginar(pendentes);
  const { itens: pesqueirosPagina, totalPaginas: totalPaginasPesqueiros } = paginar(pesqueiros);
  const { itens: denunciasPagina, totalPaginas: totalPaginasDenuncias } = paginar(denuncias);
  const { itens: banidosPagina, totalPaginas: totalPaginasBanidos } = paginar(banidos);
  const { itens: usuariosPagina, totalPaginas: totalPaginasUsuarios } = paginar(usuariosFiltrados);

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
              onClick={() => { setAba(item.chave); setExpandido(null); setPaginaAtual(1); }}
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
                <>
                {pendentes.length === 0 ? (
                  <div className="perfil-card-inner text-center"><p className="mb-0">Nenhuma solicitação pendente no momento.</p></div>
                ) : pendentesPagina.map((p) => {
                  const { regrasPermitido, regrasProibido } = parseInformacao(p.informacao);
                  const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(p.descricao);
                  const chave = `sol-${p.id}`;
                  const aberto = expandido === chave;
                  return (
                    <div key={p.id} className="painel-expand-card">
                      <div className="painel-expand-head" onClick={() => toggleExpandir(chave, p.id)}>
                        <div className="painel-expand-head-info">
                          {p.foto && <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} className="painel-row-photo" />}
                          <div style={{ minWidth: 0 }}>
                            <div className="painel-expand-title">{p.nome}</div>
                            <div className="painel-expand-sub">Enviado em {p.dataCadastro}</div>
                          </div>
                        </div>
                        <span className={`painel-expand-arrow ${aberto ? 'is-open' : ''}`}><IconeSeta /></span>
                      </div>
                      {aberto && (
                        <div className="painel-expand-body">
                          {p.foto && (
                            <div className="perfil-field">
                              <span className="perfil-field-label">Foto de capa</span>
                              <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: 'var(--radius)', marginTop: '6px' }} />
                            </div>
                          )}
                          {galerias[p.id]?.length > 0 && (
                            <div className="perfil-field">
                              <span className="perfil-field-label">Carrossel de fotos ({galerias[p.id].length})</span>
                              <div className="painel-grid" style={{ marginTop: '6px' }}>
                                {galerias[p.id].map((f) => (
                                  <img key={f.id} src={`data:image/jpeg;base64,${f.foto}`} alt="Foto do pesqueiro" style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                                ))}
                              </div>
                            </div>
                          )}
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
                })}
                {pendentes.length > 0 && (
                  <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginasPendentes} onMudarPagina={setPaginaAtual} />
                )}
                </>
              )}

              {aba === 'pesqueiros' && (
                <>
                {pesqueiros.length === 0 ? (
                  <div className="perfil-card-inner text-center"><p className="mb-0">Nenhum pesqueiro aprovado ainda.</p></div>
                ) : pesqueirosPagina.map((p) => {
                  const { regrasPermitido, regrasProibido } = parseInformacao(p.informacao);
                  const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(p.descricao);
                  const chave = `pes-${p.id}`;
                  const aberto = expandido === chave;
                  return (
                    <div key={p.id} className="painel-expand-card">
                      <div className="painel-expand-head" onClick={() => toggleExpandir(chave, p.id)}>
                        <div className="painel-expand-head-info">
                          {p.foto && <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} className="painel-row-photo" />}
                          <div style={{ minWidth: 0 }}>
                            <div className="painel-expand-title">{p.nome}</div>
                            <div className="painel-expand-sub">{p.telefone || 'Sem telefone'}</div>
                          </div>
                        </div>
                        <span className={`painel-expand-arrow ${aberto ? 'is-open' : ''}`}><IconeSeta /></span>
                      </div>
                      {aberto && (
                        <div className="painel-expand-body">
                          {p.foto && (
                            <div className="perfil-field">
                              <span className="perfil-field-label">Foto de capa</span>
                              <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: 'var(--radius)', marginTop: '6px' }} />
                            </div>
                          )}
                          {galerias[p.id]?.length > 0 && (
                            <div className="perfil-field">
                              <span className="perfil-field-label">Carrossel de fotos ({galerias[p.id].length})</span>
                              <div className="painel-grid" style={{ marginTop: '6px' }}>
                                {galerias[p.id].map((f) => (
                                  <img key={f.id} src={`data:image/jpeg;base64,${f.foto}`} alt="Foto do pesqueiro" style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="perfil-field"><span className="perfil-field-label">CNPJ</span><span className="perfil-field-value">{p.cnpj || '—'}</span></div>
                          <div className="perfil-field"><span className="perfil-field-label">Status</span><span className="perfil-field-value">{p.aprovado === true ? 'Aprovado' : p.aprovado === false ? 'Negado' : 'Pendente'}</span></div>
                          <div className="perfil-field"><span className="perfil-field-label">Cadastrado em</span><span className="perfil-field-value">{p.dataCadastro || '—'}</span></div>
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
                })}
                {pesqueiros.length > 0 && (
                  <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginasPesqueiros} onMudarPagina={setPaginaAtual} />
                )}
                </>
              )}

              {aba === 'denuncias' && (
                <>
                {denuncias.length === 0 ? (
                  <div className="perfil-card-inner text-center"><p className="mb-0">Nenhum comentário denunciado no momento.</p></div>
                ) : denunciasPagina.map((d) => {
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
                })}
                {denuncias.length > 0 && (
                  <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginasDenuncias} onMudarPagina={setPaginaAtual} />
                )}
                </>
              )}

              {aba === 'banidos' && (
                <>
                {banidos.length === 0 ? (
                  <div className="perfil-card-inner text-center"><p className="mb-0">Nenhum usuário banido no momento.</p></div>
                ) : banidosPagina.map((u) => {
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
                })}
                {banidos.length > 0 && (
                  <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginasBanidos} onMudarPagina={setPaginaAtual} />
                )}
                </>
              )}

              {aba === 'usuarios' && (
                <>
                  <div className="perfil-card-inner" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        className="perfil-input"
                        placeholder="Buscar por nome ou e-mail..."
                        value={buscaUsuario}
                        onChange={(e) => { setBuscaUsuario(e.target.value); setPaginaAtual(1); }}
                        style={{ flex: '1 1 220px' }}
                      />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {[
                          { chave: 'todos', label: 'Todos' },
                          { chave: 'ADMIN', label: 'Admins' },
                          { chave: 'USUARIO', label: 'Usuários' },
                        ].map((opcao) => (
                          <button
                            key={opcao.chave}
                            type="button"
                            className={`painel-chip ${filtroNivel === opcao.chave ? 'is-active' : ''}`}
                            onClick={() => { setFiltroNivel(opcao.chave); setPaginaAtual(1); }}
                          >
                            {opcao.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {usuariosFiltrados.length === 0 ? (
                    <div className="perfil-card-inner text-center"><p className="mb-0">Nenhum usuário encontrado.</p></div>
                  ) : usuariosPagina.map((u) => {
                    const ehAdmin = u.nivelAcesso?.toUpperCase() === 'ADMIN';
                    const souEu = u.id === adminLogado?.id;
                    const banido = u.statusUsuario === false;
                    const chave = `usr-${u.id}`;
                    const aberto = expandido === chave;
                    return (
                      <div key={u.id} className="painel-expand-card">
                        <div className="painel-expand-head" onClick={() => toggleExpandir(chave)}>
                          <div className="painel-expand-head-info">
                            {u.foto && <img src={`data:image/jpeg;base64,${u.foto}`} alt={u.nome} className="painel-row-photo" />}
                            <div style={{ minWidth: 0 }}>
                              <div className="painel-expand-title">{u.nome}</div>
                              <div className="painel-expand-sub">{u.email}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                            <span className="painel-badge" style={{ background: ehAdmin ? 'rgba(54, 133, 181, 0.16)' : 'var(--line)', color: ehAdmin ? 'var(--navy)' : 'var(--text-soft)' }}>
                              {ehAdmin ? 'Admin' : 'Usuário'}
                            </span>
                            {banido && <span className="painel-badge is-negado">Banido</span>}
                            <span className={`painel-expand-arrow ${aberto ? 'is-open' : ''}`}><IconeSeta /></span>
                          </div>
                        </div>
                        {aberto && (
                          <div className="painel-expand-body">
                            <div className="perfil-field"><span className="perfil-field-label">E-mail</span><span className="perfil-field-value">{u.email}</span></div>
                            <div className="perfil-field"><span className="perfil-field-label">Nível de acesso</span><span className="perfil-field-value">{ehAdmin ? 'Administrador' : 'Usuário comum'}</span></div>
                            <div className="perfil-field"><span className="perfil-field-label">Status</span><span className="perfil-field-value">{banido ? 'Banido' : 'Ativo'}</span></div>
                            <div className="perfil-field"><span className="perfil-field-label">Cadastrado em</span><span className="perfil-field-value">{u.dataCadastro || '—'}</span></div>

                            {souEu ? (
                              <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem' }}>Essa é a sua própria conta — você não pode alterar seu nível de acesso nem se banir.</p>
                            ) : (
                              <div className="perfil-actions">
                                <button
                                  type="button"
                                  className={`perfil-btn ${ehAdmin ? 'perfil-btn-danger' : 'perfil-btn-primary'}`}
                                  style={{ background: confirmandoNivelId === u.id ? '#a12626' : undefined }}
                                  disabled={processandoId === u.id}
                                  onClick={() => handleAlterarNivelAcesso(u)}
                                >
                                  {confirmandoNivelId === u.id ? 'Confirmar?' : ehAdmin ? 'Remover admin' : 'Promover a admin'}
                                </button>
                              </div>
                            )}

                            {!souEu && (
                              <div className="perfil-danger-zone">
                                <p>{banido ? 'Desbanir permite que o usuário volte a fazer login.' : 'Banir impede o usuário de fazer login novamente.'}</p>
                                {banido ? (
                                  <button className="perfil-btn perfil-btn-primary" style={{ flex: '0 0 auto', padding: '0 28px' }} disabled={processandoId === u.id} onClick={() => handleDesbanirUsuario(u.id)}>
                                    Desbanir usuário
                                  </button>
                                ) : (
                                  <button
                                    className="perfil-btn perfil-btn-danger"
                                    style={{ flex: '0 0 auto', padding: '0 28px', background: confirmandoBanimentoId === u.id ? '#7a1919' : undefined }}
                                    disabled={processandoId === u.id}
                                    onClick={() => handleBanirUsuarioTab(u)}
                                  >
                                    {confirmandoBanimentoId === u.id ? 'Confirmar banimento?' : 'Banir usuário'}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {usuariosFiltrados.length > 0 && (
                    <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginasUsuarios} onMudarPagina={setPaginaAtual} />
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPainel;
