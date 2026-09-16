import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import ContadorCaracteres from './Componentes/ContadorCaracteres';
import PesqueiroService from './services/PesqueiroService';
import PesqueiroFotoService from './services/PesqueiroFotoService';
import PeixeCustomizadoService from './services/PeixeCustomizadoService';
import UsuarioService from './services/UsuarioService';
import { redimensionarImagem, soBase64 } from './utils/imagem';
import { mascararCnpj, mascararCep, mascararTelefone, somenteDigitos } from './utils/mascaras';
import {
  PEIXES_DISPONIVEIS, DIAS_SEMANA, parseInformacao, parseDescricao, parseInfoRapida,
  buildInformacao, buildDescricao, buildInfoRapida, statusPesqueiro,
} from './utils/pesqueiroFormato';
import './Perfil.css';
import './Painel.css';

const FORM_VAZIO = {
  nomePesqueiro: '', descricaoPesqueiro: '', diasAbertos: [], precoSemana: '', precoFimSemana: '',
  regrasPermitido: '', regrasProibido: '', catalogoPeixes: '',
  cep: '', numero: '', complemento: '', telefone: '', cnpj: '', linkMapa: '',
};

function IndiqueSeuPesqueiro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [meusPesqueiros, setMeusPesqueiros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState(FORM_VAZIO);
  const [foto, setFoto] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});
  const [galeria, setGaleria] = useState([]);
  const [enviandoFotoGaleria, setEnviandoFotoGaleria] = useState(false);
  const [aba, setAba] = useState(null);
  const [peixesCustom, setPeixesCustom] = useState([]);
  const [peixesCustomPendentes, setPeixesCustomPendentes] = useState([]);
  const [confirmandoRemocaoId, setConfirmandoRemocaoId] = useState(null);
  const [editandoPeixeId, setEditandoPeixeId] = useState(null);
  const novoPeixeNomeRef = useRef(null);
  const novoPeixeDescricaoRef = useRef(null);
  const [novoPeixeNomeLen, setNovoPeixeNomeLen] = useState(0);
  const [novoPeixeDescricaoLen, setNovoPeixeDescricaoLen] = useState(0);
  const [novoPeixeFoto, setNovoPeixeFoto] = useState(null);
  const [enviandoPeixeCustom, setEnviandoPeixeCustom] = useState(false);

  useEffect(() => {
    const usuarioAtual = UsuarioService.getCurrentUser();
    if (!usuarioAtual) {
      navigate('/login');
      return;
    }
    setUsuario(usuarioAtual);
    carregarMeusPesqueiros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carregarMeusPesqueiros = () => {
    setLoading(true);
    PesqueiroService.meus()
      .then((res) => {
        setMeusPesqueiros(res.data);
        setAba((abaAtual) => abaAtual ?? (res.data.length > 0 ? 'meus' : 'nova'));
      })
      .catch((err) => console.error('Erro ao carregar seus pesqueiros', err))
      .finally(() => setLoading(false));
  };

  const aprovados = meusPesqueiros.filter((p) => p.aprovado === true);
  const naoAprovados = meusPesqueiros.filter((p) => p.aprovado !== true);
  const limite = aprovados.length > 0 ? 5 : 1;
  const atingiuLimite = naoAprovados.length >= limite && editandoId === null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;
    if (name === 'telefone') valorFormatado = mascararTelefone(value);
    else if (name === 'cnpj') valorFormatado = mascararCnpj(value);
    else if (name === 'cep') valorFormatado = mascararCep(value);
    else if (name === 'numero') valorFormatado = somenteDigitos(value);
    setFormData({ ...formData, [name]: valorFormatado });
  };

  const togglePeixe = (peixe) => {
    const selecionados = formData.catalogoPeixes
      ? formData.catalogoPeixes.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean)
      : [];
    const removendo = selecionados.includes(peixe);
    const novos = removendo
      ? selecionados.filter((p) => p !== peixe)
      : [...selecionados, peixe];
    setFormData({ ...formData, catalogoPeixes: novos.join(', ') });

    if (removendo && editandoId) {
      const overrideExistente = peixesCustom.find((p) => p.nome.trim().toLowerCase() === peixe);
      if (overrideExistente) {
        PeixeCustomizadoService.remover(overrideExistente.id)
          .then(() => setPeixesCustom((prev) => prev.filter((p) => p.id !== overrideExistente.id)))
          .catch((err) => console.error('Erro ao remover foto personalizada do peixe desmarcado', err));
      }
    }
  };

  const toggleDia = (dia) => {
    const novos = formData.diasAbertos.includes(dia)
      ? formData.diasAbertos.filter((d) => d !== dia)
      : [...formData.diasAbertos, dia];
    setFormData({ ...formData, diasAbertos: novos });
  };

  const handleFotoSelecionada = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const dataUrl = await redimensionarImagem(file);
      setFoto(dataUrl);
    } catch (err) {
      console.error(err);
      alert('Não foi possível carregar essa imagem. Tente outra.');
    }
  };

  const iniciarEdicao = (pesqueiro) => {
    const { regrasPermitido, regrasProibido } = parseInformacao(pesqueiro.informacao);
    const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(pesqueiro.descricao);
    const { diasAbertos, precoSemana, precoFimSemana } = parseInfoRapida(informacoesRapidas);
    setFormData({
      nomePesqueiro: pesqueiro.nome || '',
      descricaoPesqueiro: descricaoTexto,
      diasAbertos,
      precoSemana,
      precoFimSemana,
      regrasPermitido,
      regrasProibido,
      catalogoPeixes,
      cep: pesqueiro.cep || '',
      numero: pesqueiro.numero || '',
      complemento: pesqueiro.complemento || '',
      telefone: pesqueiro.telefone || '',
      cnpj: pesqueiro.cnpj || '',
      linkMapa: pesqueiro.linkMapa || '',
    });
    setFoto(pesqueiro.foto ? `data:image/jpeg;base64,${pesqueiro.foto}` : null);
    setEditandoId(pesqueiro.id);
    setMensagem('');
    setErros({});
    carregarGaleria(pesqueiro.id);
    carregarPeixesCustom(pesqueiro.id);
    setPeixesCustomPendentes([]);
    if (novoPeixeNomeRef.current) novoPeixeNomeRef.current.value = '';
    if (novoPeixeDescricaoRef.current) novoPeixeDescricaoRef.current.value = '';
    setNovoPeixeFoto(null);
    setEditandoPeixeId(null);
    setNovoPeixeNomeLen(0);
    setNovoPeixeDescricaoLen(0);
    setAba('nova');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData(FORM_VAZIO);
    setFoto(null);
    setErros({});
    setGaleria([]);
    setPeixesCustom([]);
    setPeixesCustomPendentes([]);
    if (novoPeixeNomeRef.current) novoPeixeNomeRef.current.value = '';
    if (novoPeixeDescricaoRef.current) novoPeixeDescricaoRef.current.value = '';
    setNovoPeixeFoto(null);
    setEditandoPeixeId(null);
    setNovoPeixeNomeLen(0);
    setNovoPeixeDescricaoLen(0);
    if (meusPesqueiros.length > 0) setAba('meus');
  };

  const carregarGaleria = (pesqueiroId) => {
    PesqueiroFotoService.listar(pesqueiroId)
      .then((res) => setGaleria(res.data))
      .catch((err) => console.error('Erro ao carregar galeria', err));
  };

  const handleAdicionarFotoGaleria = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !editandoId) return;
    if (galeria.length >= 5) {
      alert('Você atingiu o limite de 5 fotos no carrossel.');
      return;
    }
    setEnviandoFotoGaleria(true);
    try {
      const dataUrl = await redimensionarImagem(file, 800, 0.75);
      await PesqueiroFotoService.adicionar(editandoId, soBase64(dataUrl));
      carregarGaleria(editandoId);
    } catch (err) {
      console.error('Erro ao adicionar foto na galeria', err);
      alert('Não foi possível adicionar essa foto. Tente novamente.');
    } finally {
      setEnviandoFotoGaleria(false);
    }
  };

  const carregarPeixesCustom = (pesqueiroId) => {
    PeixeCustomizadoService.listar(pesqueiroId)
      .then((res) => setPeixesCustom(res.data))
      .catch((err) => console.error('Erro ao carregar peixes personalizados', err));
  };

  const handleFotoPeixeCustomSelecionada = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const dataUrl = await redimensionarImagem(file, 400, 0.75);
      setNovoPeixeFoto(dataUrl);
    } catch (err) {
      console.error(err);
      alert('Não foi possível carregar essa imagem. Tente outra.');
    }
  };

  const handleIniciarEdicaoPeixe = (peixe) => {
    setEditandoPeixeId(peixe.id);
    setNovoPeixeFoto(null);
    if (novoPeixeNomeRef.current) novoPeixeNomeRef.current.value = peixe.nome || '';
    if (novoPeixeDescricaoRef.current) novoPeixeDescricaoRef.current.value = peixe.descricao || '';
    setNovoPeixeNomeLen((peixe.nome || '').length);
    setNovoPeixeDescricaoLen((peixe.descricao || '').length);
  };

  const handleCancelarEdicaoPeixe = () => {
    setEditandoPeixeId(null);
    setNovoPeixeFoto(null);
    if (novoPeixeNomeRef.current) novoPeixeNomeRef.current.value = '';
    if (novoPeixeDescricaoRef.current) novoPeixeDescricaoRef.current.value = '';
    setNovoPeixeNomeLen(0);
    setNovoPeixeDescricaoLen(0);
  };

  const handleAdicionarPeixeCustom = async () => {
    const nome = novoPeixeNomeRef.current?.value.trim() || '';
    if (!nome) {
      alert('Informe o nome do peixe.');
      return;
    }
    const descricao = novoPeixeDescricaoRef.current?.value.trim() || null;
    const foto = novoPeixeFoto ? soBase64(novoPeixeFoto) : null;

    if (!editandoId) {
      const jaExiste = peixesCustomPendentes.some(
        (p) => p.nome.trim().toLowerCase() === nome.toLowerCase() && p.id !== editandoPeixeId
      );
      if (jaExiste) {
        alert('Você já adicionou um peixe com esse nome.');
        return;
      }
      if (peixesCustomPendentes.length >= 20 && !editandoPeixeId) {
        alert('Você atingiu o limite de 20 peixes personalizados por pesqueiro.');
        return;
      }
      if (editandoPeixeId) {
        setPeixesCustomPendentes((prev) => prev.map((p) => (
          p.id === editandoPeixeId ? { ...p, nome, descricao, foto: foto || p.foto } : p
        )));
      } else {
        setPeixesCustomPendentes((prev) => [...prev, { id: `pendente-${Date.now()}-${Math.random()}`, nome, descricao, foto }]);
      }
      if (novoPeixeNomeRef.current) novoPeixeNomeRef.current.value = '';
      if (novoPeixeDescricaoRef.current) novoPeixeDescricaoRef.current.value = '';
      setNovoPeixeFoto(null);
      setEditandoPeixeId(null);
      setNovoPeixeNomeLen(0);
      setNovoPeixeDescricaoLen(0);
      return;
    }

    setEnviandoPeixeCustom(true);
    try {
      if (editandoPeixeId) {
        await PeixeCustomizadoService.atualizar(editandoPeixeId, nome, foto, descricao);
      } else {
        await PeixeCustomizadoService.adicionar(editandoId, nome, foto, descricao);
      }
      if (novoPeixeNomeRef.current) novoPeixeNomeRef.current.value = '';
      if (novoPeixeDescricaoRef.current) novoPeixeDescricaoRef.current.value = '';
      setNovoPeixeFoto(null);
      setEditandoPeixeId(null);
      setNovoPeixeNomeLen(0);
      setNovoPeixeDescricaoLen(0);
      carregarPeixesCustom(editandoId);
    } catch (err) {
      console.error('Erro ao salvar peixe personalizado', err);
      const msg = err.response?.data?.message || 'Não foi possível salvar esse peixe. Tente novamente.';
      alert(msg);
    } finally {
      setEnviandoPeixeCustom(false);
    }
  };

  const handleRemoverPeixeCustom = async (peixeId) => {
    if (confirmandoRemocaoId !== peixeId) {
      setConfirmandoRemocaoId(peixeId);
      setTimeout(() => setConfirmandoRemocaoId((atual) => (atual === peixeId ? null : atual)), 3000);
      return;
    }
    setConfirmandoRemocaoId(null);

    if (!editandoId) {
      setPeixesCustomPendentes((prev) => prev.filter((p) => p.id !== peixeId));
      if (editandoPeixeId === peixeId) handleCancelarEdicaoPeixe();
      return;
    }

    try {
      await PeixeCustomizadoService.remover(peixeId);
      setPeixesCustom((prev) => prev.filter((p) => p.id !== peixeId));
      if (editandoPeixeId === peixeId) handleCancelarEdicaoPeixe();
    } catch (err) {
      console.error('Erro ao remover peixe personalizado', err);
      alert('Não foi possível remover esse peixe.');
    }
  };

  const handleRemoverFotoGaleria = async (fotoId) => {
    if (!confirm('Remover essa foto do carrossel?')) return;
    try {
      await PesqueiroFotoService.remover(fotoId);
      setGaleria((prev) => prev.filter((f) => f.id !== fotoId));
    } catch (err) {
      console.error('Erro ao remover foto da galeria', err);
      alert('Não foi possível remover essa foto.');
    }
  };

  const validar = () => {
    const novosErros = {};
    if (!formData.nomePesqueiro.trim()) novosErros.nomePesqueiro = 'Informe o nome do pesqueiro.';
    if (!formData.telefone.trim()) novosErros.telefone = 'Informe o telefone comercial.';
    if (!formData.cnpj.trim()) novosErros.cnpj = 'Informe o CNPJ do pesqueiro.';
    if (!formData.descricaoPesqueiro.trim()) novosErros.descricaoPesqueiro = 'Descreva o pesqueiro.';
    if (!formData.cep.trim()) novosErros.cep = 'Informe o CEP.';
    if (!formData.numero.trim()) novosErros.numero = 'Informe o número.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async () => {
    if (!validar()) {
      alert('Preencha todos os campos obrigatórios (destacados em vermelho).');
      return;
    }
    setSalvando(true);
    setMensagem('');
    try {
      const payload = {
        nome: formData.nomePesqueiro,
        telefone: formData.telefone,
        cnpj: formData.cnpj,
        linkMapa: formData.linkMapa || null,
        descricao: buildDescricao(formData.descricaoPesqueiro, buildInfoRapida(formData.diasAbertos, formData.precoSemana, formData.precoFimSemana), formData.catalogoPeixes),
        informacao: buildInformacao(formData.regrasPermitido, formData.regrasProibido),
        cep: formData.cep.replace(/\D/g, '').substring(0, 8),
        numero: formData.numero.substring(0, 10),
        complemento: formData.complemento ? formData.complemento.substring(0, 50) : null,
        foto: foto ? soBase64(foto) : null,
        statusPesqueiro: true,
        dataCadastro: new Date().toISOString().split('T')[0],
      };

      if (editandoId) {
        await PesqueiroService.update(editandoId, payload);
        setMensagem('Solicitação atualizada! Está novamente em análise.');
      } else {
        const resp = await PesqueiroService.criar(payload);
        const novoId = resp.data.id;
        for (const pendente of peixesCustomPendentes) {
          try {
            await PeixeCustomizadoService.adicionar(novoId, pendente.nome, pendente.foto, pendente.descricao);
          } catch (erroPeixe) {
            console.error('Erro ao salvar peixe personalizado pendente', erroPeixe);
          }
        }
        setMensagem('Solicitação enviada! Está em análise.');
      }
      setEditandoId(null);
      setFormData(FORM_VAZIO);
      setFoto(null);
      setErros({});
      setGaleria([]);
      setPeixesCustom([]);
      setPeixesCustomPendentes([]);
      if (novoPeixeNomeRef.current) novoPeixeNomeRef.current.value = '';
      if (novoPeixeDescricaoRef.current) novoPeixeDescricaoRef.current.value = '';
      setNovoPeixeFoto(null);
      setEditandoPeixeId(null);
      setNovoPeixeNomeLen(0);
      setNovoPeixeDescricaoLen(0);
      setAba('meus');
      carregarMeusPesqueiros();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Erro ao enviar solicitação. Tente novamente.';
      alert(msg);
    } finally {
      setSalvando(false);
    }
  };

  const peixesSelecionados = formData.catalogoPeixes
    ? formData.catalogoPeixes.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean)
    : [];

  const peixesCustomExibidos = editandoId ? peixesCustom : peixesCustomPendentes;

  if (!usuario) return null;

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
        <h2 className="perfil-name">Indique seu pesqueiro</h2>
        <span className="perfil-badge">Envie as informações para análise da nossa equipe</span>
      </div>

      <div className="perfil-card">
        {!loading && meusPesqueiros.length > 0 && (
          <div className="painel-tabs">
            <button
              type="button"
              className={`painel-tab-btn ${aba === 'meus' ? 'is-active' : ''}`}
              onClick={() => setAba('meus')}
            >
              Meus pesqueiros
            </button>
            <button
              type="button"
              className={`painel-tab-btn ${aba === 'nova' ? 'is-active' : ''}`}
              onClick={() => { if (!editandoId) setAba('nova'); }}
              disabled={atingiuLimite && !editandoId}
              title={atingiuLimite && !editandoId ? 'Você atingiu o limite de solicitações pendentes' : undefined}
            >
              Indicar novo pesqueiro
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <>
            {aba === 'meus' && aprovados.length > 0 && (
              <div className="perfil-card-inner" style={{ marginBottom: '20px' }}>
                <div className="painel-section-title">Seus pesqueiros aprovados</div>
                {aprovados.map((p) => (
                  <div key={p.id} className="painel-row">
                    <div className="painel-row-info">
                      {p.foto && <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} className="painel-row-photo" style={{ marginRight: '14px' }} />}
                      <span className="painel-row-name">{p.nome}</span>
                      <span className="painel-badge is-aprovado">Aprovado</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/painel-pesqueiro/${p.id}`)}
                      className="perfil-btn perfil-btn-primary"
                      style={{ flex: 'none', padding: '0 20px' }}
                    >
                      Administrar
                    </button>
                  </div>
                ))}
              </div>
            )}

            {aba === 'meus' && naoAprovados.length > 0 && (
              <div className="perfil-card-inner" style={{ marginBottom: '20px' }}>
                <div className="painel-section-title">Suas solicitações</div>
                {naoAprovados.map((p) => {
                  const status = statusPesqueiro(p.aprovado);
                  return (
                    <div key={p.id} className="painel-row">
                      <div className="painel-row-info">
                        {p.foto && <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} className="painel-row-photo" style={{ marginRight: '14px' }} />}
                        <span className="painel-row-name">{p.nome}</span>
                        <span className={`painel-badge is-${status.chave}`}>{status.texto}</span>
                      </div>
                      <button type="button" className="perfil-btn perfil-btn-ghost" style={{ flex: 'none', padding: '0 20px' }} onClick={() => iniciarEdicao(p)}>
                        Editar
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {aba === 'nova' && mensagem && <div className="painel-alert is-success">{mensagem}</div>}

            {aba === 'nova' && (atingiuLimite ? (
              <div className="perfil-card-inner text-center">
                <h5 style={{ color: 'var(--navy)' }}>Você atingiu o limite de solicitações pendentes</h5>
                <p className="perfil-field-value" style={{ marginTop: '8px' }}>
                  Vá em "Meus pesqueiros" pra editar uma solicitação existente, ou aguarde a análise antes de enviar outra.
                </p>
              </div>
            ) : (
              <div className="perfil-card-inner">
                <div className="painel-section-title">
                  {editandoId ? 'Editando solicitação' : 'Informações do pesqueiro'}
                </div>

                <div className="painel-photo-upload" style={{ marginBottom: '20px' }}>
                  {foto ? (
                    <img src={foto} alt="Prévia" className="painel-photo-preview" />
                  ) : (
                    <div className="painel-photo-preview" />
                  )}
                  <label className="perfil-btn perfil-btn-ghost" style={{ flex: 'none', padding: '0 20px', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    Escolher foto de capa
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFotoSelecionada} />
                  </label>
                </div>

                {editandoId ? (
                  <>
                    <div className="painel-section-title">Carrossel de fotos ({galeria.length}/5)</div>
                    <div className="painel-grid" style={{ marginBottom: '16px' }}>
                      {galeria.map((f) => (
                        <div key={f.id} style={{ position: 'relative' }}>
                          <img src={`data:image/jpeg;base64,${f.foto}`} alt="Foto do pesqueiro" style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                          <button
                            type="button"
                            onClick={() => handleRemoverFotoGaleria(f.id)}
                            title="Remover"
                            style={{
                              position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: '#fff',
                              border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', lineHeight: 1,
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    {galeria.length < 5 && (
                      <label className="perfil-btn perfil-btn-ghost" style={{ flex: 'none', padding: '0 20px', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', marginBottom: '20px' }}>
                        {enviandoFotoGaleria ? 'Enviando...' : 'Adicionar foto ao carrossel'}
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAdicionarFotoGaleria} disabled={enviandoFotoGaleria} />
                      </label>
                    )}
                  </>
                ) : (
                  <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem', marginBottom: '16px' }}>
                    Depois de enviar essa solicitação, você poderá voltar aqui pra adicionar mais fotos ao carrossel.
                  </p>
                )}

                <div className="perfil-field">
                  <label className="perfil-field-label">Nome do Pesqueiro *</label>
                  <input className="perfil-input" name="nomePesqueiro" placeholder="Ex: Pesqueiro Águas Claras" value={formData.nomePesqueiro} onChange={handleInputChange} maxLength={255} />
                  <ContadorCaracteres atual={formData.nomePesqueiro.length} max={255} />
                  {erros.nomePesqueiro && <small style={{ color: '#a12626' }}>{erros.nomePesqueiro}</small>}
                </div>

                <div className="perfil-field">
                  <label className="perfil-field-label">Telefone comercial do pesqueiro *</label>
                  <input className="perfil-input" name="telefone" placeholder="(11) 99999-9999" value={formData.telefone} onChange={handleInputChange} />
                  {erros.telefone && <small style={{ color: '#a12626' }}>{erros.telefone}</small>}
                </div>

                <div className="perfil-field">
                  <label className="perfil-field-label">CNPJ *</label>
                  <input className="perfil-input" name="cnpj" placeholder="00.000.000/0001-00" value={formData.cnpj} onChange={handleInputChange} />
                  {erros.cnpj && <small style={{ color: '#a12626' }}>{erros.cnpj}</small>}
                </div>

                <div className="perfil-field">
                  <label className="perfil-field-label">Descrição *</label>
                  <textarea className="painel-textarea" name="descricaoPesqueiro" placeholder="Descreva seu pesqueiro, diferenciais, ambiente..." value={formData.descricaoPesqueiro} onChange={handleInputChange} rows={3} maxLength={400} />
                  <ContadorCaracteres atual={formData.descricaoPesqueiro.length} max={400} />
                  {erros.descricaoPesqueiro && <small style={{ color: '#a12626' }}>{erros.descricaoPesqueiro}</small>}
                </div>

                <div className="perfil-field">
                  <label className="perfil-field-label">Dias de funcionamento</label>
                  <div className="painel-grid">
                    {DIAS_SEMANA.map((dia) => (
                      <div key={dia} className={`painel-chip ${formData.diasAbertos.includes(dia) ? 'is-active' : ''}`} onClick={() => toggleDia(dia)}>
                        {formData.diasAbertos.includes(dia) ? '✓ ' : ''}{dia}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="perfil-field">
                  <label className="perfil-field-label">Preço dia de semana (R$)</label>
                  <input className="perfil-input" type="number" min="0" name="precoSemana" placeholder="30" value={formData.precoSemana} onChange={handleInputChange} />
                </div>
                <div className="perfil-field">
                  <label className="perfil-field-label">Preço fim de semana (R$)</label>
                  <input className="perfil-input" type="number" min="0" name="precoFimSemana" placeholder="50" value={formData.precoFimSemana} onChange={handleInputChange} />
                </div>

                <div className="painel-section-title">Localização</div>

                <div className="perfil-field">
                  <label className="perfil-field-label">CEP *</label>
                  <input className="perfil-input" name="cep" placeholder="00000-000" value={formData.cep} onChange={handleInputChange} />
                  {erros.cep && <small style={{ color: '#a12626' }}>{erros.cep}</small>}
                </div>
                <div className="perfil-field">
                  <label className="perfil-field-label">Número *</label>
                  <input className="perfil-input" name="numero" placeholder="123" value={formData.numero} onChange={handleInputChange} maxLength={10} />
                  <ContadorCaracteres atual={formData.numero.length} max={10} />
                  {erros.numero && <small style={{ color: '#a12626' }}>{erros.numero}</small>}
                </div>
                <div className="perfil-field">
                  <label className="perfil-field-label">Complemento</label>
                  <input className="perfil-input" name="complemento" placeholder="Referência, bairro..." value={formData.complemento} onChange={handleInputChange} maxLength={50} />
                  <ContadorCaracteres atual={formData.complemento.length} max={50} />
                </div>
                <div className="perfil-field">
                  <label className="perfil-field-label">Link do Google Maps</label>
                  <input className="perfil-input" name="linkMapa" placeholder="Cole aqui o link de compartilhamento do Google Maps" value={formData.linkMapa} onChange={handleInputChange} />
                  <small style={{ color: 'var(--text-soft)' }}>No Google Maps, toque em "Compartilhar" e cole o link aqui.</small>
                </div>

                <div className="painel-section-title">Regras do pesqueiro</div>

                <div className="perfil-field">
                  <label className="perfil-field-label" style={{ color: '#27ae60' }}>✓ O que é permitido</label>
                  <textarea className="painel-textarea" name="regrasPermitido" placeholder={'Uma regra por linha'} value={formData.regrasPermitido} onChange={handleInputChange} rows={4} maxLength={80} />
                  <ContadorCaracteres atual={formData.regrasPermitido.length} max={80} />
                </div>
                <div className="perfil-field">
                  <label className="perfil-field-label" style={{ color: '#a12626' }}>✗ O que é proibido</label>
                  <textarea className="painel-textarea" name="regrasProibido" placeholder={'Uma regra por linha'} value={formData.regrasProibido} onChange={handleInputChange} rows={4} maxLength={80} />
                  <ContadorCaracteres atual={formData.regrasProibido.length} max={80} />
                </div>

                <div className="painel-section-title">Catálogo de peixes</div>
                <div className="painel-grid">
                  {PEIXES_DISPONIVEIS.map((peixe) => (
                    <div key={peixe} className={`painel-chip ${peixesSelecionados.includes(peixe) ? 'is-active' : ''}`} onClick={() => togglePeixe(peixe)}>
                      {peixesSelecionados.includes(peixe) ? '✓ ' : ''}{peixe}
                    </div>
                  ))}
                </div>

                <>
                    <div className="painel-section-title">Fotos e peixes personalizados</div>
                    <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem', marginBottom: '16px' }}>
                      Aqui embaixo é diferente do catálogo acima: cada peixe personalizado é um item à parte, com foto e descrição próprias.
                      Se o nome que você digitar for igual ao de um peixe já marcado no catálogo acima (ex: "carpa"), a foto e a descrição substituem as padrão dele só no seu pesqueiro — e se você desmarcar aquele peixe lá em cima, a substituição é removida automaticamente.
                      {!editandoId && ' Como o pesqueiro ainda não foi enviado, esses peixes só serão salvos de verdade quando você enviar o formulário.'}
                    </p>

                    {peixesCustomExibidos.length > 0 && (
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>
                          Já adicionados ({peixesCustomExibidos.length}/20)
                        </div>
                        <div className="painel-grid">
                          {peixesCustomExibidos.map((peixe) => (
                            <div key={peixe.id} style={{ position: 'relative', textAlign: 'center', minWidth: 0, overflow: 'hidden' }}>
                              {peixe.foto ? (
                                <img src={`data:image/jpeg;base64,${peixe.foto}`} alt={peixe.nome} style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                              ) : (
                                <div style={{ width: '100%', height: '90px', borderRadius: 'var(--radius)', background: 'var(--surface)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🐟</div>
                              )}
                              <span title={peixe.nome} style={{ display: 'block', fontSize: '0.8rem', marginTop: '4px', color: 'var(--text)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{peixe.nome}</span>
                              {peixe.descricao && (
                                <span title={peixe.descricao} style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.72rem', color: 'var(--text-soft)', overflowWrap: 'anywhere' }}>{peixe.descricao}</span>
                              )}
                              <button
                                type="button"
                                onClick={() => handleIniciarEdicaoPeixe(peixe)}
                                title="Editar"
                                style={{
                                  position: 'absolute', top: '4px', right: '30px', background: 'rgba(0,0,0,0.6)', color: '#fff',
                                  border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', lineHeight: 1, fontSize: '0.75rem',
                                }}
                              >
                                ✎
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoverPeixeCustom(peixe.id)}
                                title={confirmandoRemocaoId === peixe.id ? 'Clique de novo para confirmar' : 'Remover'}
                                style={{
                                  position: 'absolute', top: '4px', right: '4px',
                                  background: confirmandoRemocaoId === peixe.id ? '#a12626' : 'rgba(0,0,0,0.6)', color: '#fff',
                                  border: 'none', borderRadius: confirmandoRemocaoId === peixe.id ? '999px' : '50%',
                                  width: confirmandoRemocaoId === peixe.id ? 'auto' : '22px', height: '22px',
                                  padding: confirmandoRemocaoId === peixe.id ? '0 8px' : 0,
                                  fontSize: confirmandoRemocaoId === peixe.id ? '0.65rem' : '1rem',
                                  cursor: 'pointer', lineHeight: 1, whiteSpace: 'nowrap',
                                }}
                              >
                                {confirmandoRemocaoId === peixe.id ? 'Confirmar?' : '×'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ background: editandoPeixeId ? 'rgba(54, 133, 181, 0.08)' : 'var(--surface)', border: editandoPeixeId ? '1.5px solid var(--blue)' : '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '16px' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '10px' }}>
                        {editandoPeixeId ? 'Editando peixe' : 'Adicionar peixe personalizado'}
                      </div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
                        <input
                          className="perfil-input"
                          type="text"
                          placeholder="Nome do peixe"
                          ref={novoPeixeNomeRef}
                          defaultValue=""
                          autoComplete="off"
                          onChange={(e) => setNovoPeixeNomeLen(e.target.value.length)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdicionarPeixeCustom(); } }}
                          style={{ flex: '1 1 180px' }}
                          maxLength={60}
                        />
                        <label className="perfil-btn perfil-btn-ghost" style={{ flex: 'none', padding: '0 16px', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                          {novoPeixeFoto ? 'Foto escolhida' : editandoPeixeId ? 'Trocar foto' : 'Escolher foto'}
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFotoPeixeCustomSelecionada} />
                        </label>
                      </div>
                      <ContadorCaracteres atual={novoPeixeNomeLen} max={60} />
                      {editandoPeixeId && !novoPeixeFoto && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-soft)', marginTop: '-6px', marginBottom: '10px' }}>
                          Deixe em branco pra manter a foto atual.
                        </p>
                      )}
                      <input
                        className="perfil-input"
                        type="text"
                        placeholder="Descrição do peixe (opcional)"
                        ref={novoPeixeDescricaoRef}
                        defaultValue=""
                        autoComplete="off"
                        onChange={(e) => setNovoPeixeDescricaoLen(e.target.value.length)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdicionarPeixeCustom(); } }}
                        style={{ width: '100%', marginBottom: '2px' }}
                        maxLength={200}
                      />
                      <ContadorCaracteres atual={novoPeixeDescricaoLen} max={200} />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          type="button"
                          className="perfil-btn perfil-btn-primary"
                          style={{ padding: '0 20px' }}
                          onClick={handleAdicionarPeixeCustom}
                          disabled={enviandoPeixeCustom}
                        >
                          {enviandoPeixeCustom ? 'Salvando...' : editandoPeixeId ? 'Salvar alterações' : 'Adicionar peixe'}
                        </button>
                        {editandoPeixeId && (
                          <button type="button" className="perfil-btn perfil-btn-ghost" style={{ padding: '0 20px' }} onClick={handleCancelarEdicaoPeixe}>
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                </>

                <div className="perfil-actions">
                  <button type="button" onClick={handleSubmit} disabled={salvando} className="perfil-btn perfil-btn-primary">
                    {salvando ? 'Enviando...' : editandoId ? 'Salvar edição' : 'Enviar para análise'}
                  </button>
                  {editandoId && (
                    <button type="button" onClick={cancelarEdicao} className="perfil-btn perfil-btn-ghost">
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default IndiqueSeuPesqueiro;
