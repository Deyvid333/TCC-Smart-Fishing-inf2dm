import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  buildInformacao, buildDescricao, buildInfoRapida, formatarInfoRapidaTexto,
} from './utils/pesqueiroFormato';
import './Perfil.css';
import './Painel.css';

function PainelPesqueiro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pesqueiro, setPesqueiro] = useState(null);
  const [autorizado, setAutorizado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [foto, setFoto] = useState(null);
  const [erros, setErros] = useState({});
  const [galeria, setGaleria] = useState([]);
  const [enviandoFotoGaleria, setEnviandoFotoGaleria] = useState(false);
  const [peixesCustom, setPeixesCustom] = useState([]);
  const [confirmandoRemocaoId, setConfirmandoRemocaoId] = useState(null);
  const [editandoPeixeId, setEditandoPeixeId] = useState(null);
  const novoPeixeNomeRef = useRef(null);
  const novoPeixeDescricaoRef = useRef(null);
  const [novoPeixeNomeLen, setNovoPeixeNomeLen] = useState(0);
  const [novoPeixeDescricaoLen, setNovoPeixeDescricaoLen] = useState(0);
  const [novoPeixeFoto, setNovoPeixeFoto] = useState(null);
  const [enviandoPeixeCustom, setEnviandoPeixeCustom] = useState(false);
  const [editData, setEditData] = useState({
    nome: '', telefone: '', cnpj: '', linkMapa: '', descricaoTexto: '',
    diasAbertos: [], precoSemana: '', precoFimSemana: '',
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
          carregarGaleria();
          carregarPeixesCustom();
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar pesqueiro', err);
        setAutorizado(false);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const carregarGaleria = () => {
    PesqueiroFotoService.listar(id)
      .then((res) => setGaleria(res.data))
      .catch((err) => console.error('Erro ao carregar galeria', err));
  };

  const handleAdicionarFotoGaleria = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (galeria.length >= 5) {
      alert('Você atingiu o limite de 5 fotos no carrossel.');
      return;
    }
    setEnviandoFotoGaleria(true);
    try {
      const dataUrl = await redimensionarImagem(file, 800, 0.75);
      await PesqueiroFotoService.adicionar(id, soBase64(dataUrl));
      carregarGaleria();
    } catch (err) {
      console.error('Erro ao adicionar foto na galeria', err);
      alert('Não foi possível adicionar essa foto. Tente novamente.');
    } finally {
      setEnviandoFotoGaleria(false);
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

  const carregarPeixesCustom = () => {
    PeixeCustomizadoService.listar(id)
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
    setEnviandoPeixeCustom(true);
    try {
      const descricao = novoPeixeDescricaoRef.current?.value.trim() || null;
      const foto = novoPeixeFoto ? soBase64(novoPeixeFoto) : null;
      if (editandoPeixeId) {
        await PeixeCustomizadoService.atualizar(editandoPeixeId, nome, foto, descricao);
      } else {
        await PeixeCustomizadoService.adicionar(id, nome, foto, descricao);
      }
      if (novoPeixeNomeRef.current) novoPeixeNomeRef.current.value = '';
      if (novoPeixeDescricaoRef.current) novoPeixeDescricaoRef.current.value = '';
      setNovoPeixeFoto(null);
      setEditandoPeixeId(null);
      setNovoPeixeNomeLen(0);
      setNovoPeixeDescricaoLen(0);
      carregarPeixesCustom();
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
    try {
      await PeixeCustomizadoService.remover(peixeId);
      setPeixesCustom((prev) => prev.filter((p) => p.id !== peixeId));
      if (editandoPeixeId === peixeId) handleCancelarEdicaoPeixe();
    } catch (err) {
      console.error('Erro ao remover peixe personalizado', err);
      alert('Não foi possível remover esse peixe.');
    }
  };

  const popularEditData = (p) => {
    const { regrasPermitido, regrasProibido } = parseInformacao(p.informacao);
    const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(p.descricao);
    const { diasAbertos, precoSemana, precoFimSemana } = parseInfoRapida(informacoesRapidas);
    setEditData({
      nome: p.nome || '', telefone: p.telefone || '', cnpj: p.cnpj || '', linkMapa: p.linkMapa || '',
      descricaoTexto, diasAbertos, precoSemana, precoFimSemana, regrasPermitido, regrasProibido, catalogoPeixes,
      cep: p.cep || '', numero: p.numero || '', complemento: p.complemento || '',
    });
    setFoto(p.foto ? `data:image/jpeg;base64,${p.foto}` : null);
  };

  const togglePeixe = (peixe) => {
    const selecionados = editData.catalogoPeixes
      ? editData.catalogoPeixes.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean)
      : [];
    const removendo = selecionados.includes(peixe);
    const novos = removendo
      ? selecionados.filter((p) => p !== peixe)
      : [...selecionados, peixe];
    setEditData({ ...editData, catalogoPeixes: novos.join(', ') });

    if (removendo) {
      const overrideExistente = peixesCustom.find((p) => p.nome.trim().toLowerCase() === peixe);
      if (overrideExistente) {
        PeixeCustomizadoService.remover(overrideExistente.id)
          .then(() => setPeixesCustom((prev) => prev.filter((p) => p.id !== overrideExistente.id)))
          .catch((err) => console.error('Erro ao remover foto personalizada do peixe desmarcado', err));
      }
    }
  };

  const toggleDia = (dia) => {
    const novos = editData.diasAbertos.includes(dia)
      ? editData.diasAbertos.filter((d) => d !== dia)
      : [...editData.diasAbertos, dia];
    setEditData({ ...editData, diasAbertos: novos });
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

  const validar = () => {
    const novosErros = {};
    if (!editData.nome.trim()) novosErros.nome = 'Informe o nome do pesqueiro.';
    if (!editData.telefone.trim()) novosErros.telefone = 'Informe o telefone comercial.';
    if (!editData.cnpj.trim()) novosErros.cnpj = 'Informe o CNPJ do pesqueiro.';
    if (!editData.descricaoTexto.trim()) novosErros.descricaoTexto = 'Descreva o pesqueiro.';
    if (!editData.cep.trim()) novosErros.cep = 'Informe o CEP.';
    if (!editData.numero.trim()) novosErros.numero = 'Informe o número.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSave = async () => {
    if (!validar()) {
      alert('Preencha todos os campos obrigatórios (destacados em vermelho).');
      return;
    }
    setSaving(true);
    try {
      const atualizado = {
        ...pesqueiro,
        nome: editData.nome,
        telefone: editData.telefone,
        cnpj: editData.cnpj,
        linkMapa: editData.linkMapa || null,
        descricao: buildDescricao(editData.descricaoTexto, buildInfoRapida(editData.diasAbertos, editData.precoSemana, editData.precoFimSemana), editData.catalogoPeixes),
        informacao: buildInformacao(editData.regrasPermitido, editData.regrasProibido),
        cep: editData.cep.replace(/\D/g, '').substring(0, 8),
        numero: editData.numero.substring(0, 10),
        complemento: editData.complemento ? editData.complemento.substring(0, 50) : null,
        foto: foto ? soBase64(foto) : null,
      };
      const resp = await PesqueiroService.update(pesqueiro.id, atualizado);
      setPesqueiro(resp.data);
      popularEditData(resp.data);
      setIsEditing(false);
      setErros({});
      alert('Pesqueiro atualizado com sucesso!');
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
    return (
      <div className="perfil-page">
        <Navbar />
        <p className="text-center" style={{ paddingTop: '60px' }}>Carregando...</p>
      </div>
    );
  }

  if (!autorizado) {
    return (
      <div className="perfil-page">
        <Navbar />
        <div className="perfil-card">
          <div className="perfil-card-inner text-center">
            <p className="mb-0">Você não tem permissão para administrar este pesqueiro.</p>
          </div>
        </div>
      </div>
    );
  }

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
        <h2 className="perfil-name">{pesqueiro?.nome}</h2>
        <span className="perfil-badge">Painel do pesqueiro</span>
      </div>

      <div className="perfil-card">
        <div className="perfil-card-inner">
          <div className="d-flex justify-content-end mb-3">
            {!isEditing ? (
              <button className="perfil-btn perfil-btn-primary" style={{ flex: 'none', padding: '0 24px' }} onClick={() => setIsEditing(true)}>Editar dados</button>
            ) : (
              <div className="d-flex gap-2">
                <button className="perfil-btn perfil-btn-primary" style={{ flex: 'none', padding: '0 24px' }} onClick={handleSave} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
                <button className="perfil-btn perfil-btn-ghost" style={{ flex: 'none', padding: '0 24px' }} onClick={() => { setIsEditing(false); popularEditData(pesqueiro); setErros({}); }}>Cancelar</button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div>
              <div className="painel-photo-upload" style={{ marginBottom: '20px' }}>
                {foto ? <img src={foto} alt="Prévia" className="painel-photo-preview" /> : <div className="painel-photo-preview" />}
                <label className="perfil-btn perfil-btn-ghost" style={{ flex: 'none', padding: '0 20px', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                  Trocar foto de capa
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFotoSelecionada} />
                </label>
              </div>

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

              <div className="perfil-field">
                <label className="perfil-field-label">Nome *</label>
                <input className="perfil-input" value={editData.nome} onChange={(e) => setEditData({ ...editData, nome: e.target.value })} maxLength={255} />
                <ContadorCaracteres atual={editData.nome.length} max={255} />
                {erros.nome && <small style={{ color: '#a12626' }}>{erros.nome}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Telefone comercial *</label>
                <input className="perfil-input" value={editData.telefone} onChange={(e) => setEditData({ ...editData, telefone: mascararTelefone(e.target.value) })} />
                {erros.telefone && <small style={{ color: '#a12626' }}>{erros.telefone}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">CNPJ *</label>
                <input className="perfil-input" value={editData.cnpj} onChange={(e) => setEditData({ ...editData, cnpj: mascararCnpj(e.target.value) })} />
                {erros.cnpj && <small style={{ color: '#a12626' }}>{erros.cnpj}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Descrição *</label>
                <textarea className="painel-textarea" rows={3} value={editData.descricaoTexto} onChange={(e) => setEditData({ ...editData, descricaoTexto: e.target.value })} maxLength={400} />
                <ContadorCaracteres atual={editData.descricaoTexto.length} max={400} />
                {erros.descricaoTexto && <small style={{ color: '#a12626' }}>{erros.descricaoTexto}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Dias de funcionamento</label>
                <div className="painel-grid">
                  {DIAS_SEMANA.map((dia) => (
                    <div key={dia} className={`painel-chip ${editData.diasAbertos.includes(dia) ? 'is-active' : ''}`} onClick={() => toggleDia(dia)}>
                      {editData.diasAbertos.includes(dia) ? '✓ ' : ''}{dia}
                    </div>
                  ))}
                </div>
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Preço dia de semana (R$)</label>
                <input className="perfil-input" type="number" min="0" value={editData.precoSemana} onChange={(e) => setEditData({ ...editData, precoSemana: e.target.value })} />
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Preço fim de semana (R$)</label>
                <input className="perfil-input" type="number" min="0" value={editData.precoFimSemana} onChange={(e) => setEditData({ ...editData, precoFimSemana: e.target.value })} />
              </div>

              <div className="painel-section-title">Localização</div>
              <div className="perfil-field">
                <label className="perfil-field-label">CEP *</label>
                <input className="perfil-input" value={editData.cep} onChange={(e) => setEditData({ ...editData, cep: mascararCep(e.target.value) })} />
                {erros.cep && <small style={{ color: '#a12626' }}>{erros.cep}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Número *</label>
                <input className="perfil-input" value={editData.numero} onChange={(e) => setEditData({ ...editData, numero: somenteDigitos(e.target.value) })} maxLength={10} />
                <ContadorCaracteres atual={editData.numero.length} max={10} />
                {erros.numero && <small style={{ color: '#a12626' }}>{erros.numero}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Complemento</label>
                <input className="perfil-input" value={editData.complemento} onChange={(e) => setEditData({ ...editData, complemento: e.target.value })} maxLength={50} />
                <ContadorCaracteres atual={editData.complemento.length} max={50} />
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Link do Google Maps</label>
                <input className="perfil-input" value={editData.linkMapa} onChange={(e) => setEditData({ ...editData, linkMapa: e.target.value })} />
              </div>

              <div className="painel-section-title">Regras</div>
              <div className="perfil-field">
                <label className="perfil-field-label" style={{ color: '#27ae60' }}>✓ Permitido</label>
                <textarea className="painel-textarea" rows={4} value={editData.regrasPermitido} onChange={(e) => setEditData({ ...editData, regrasPermitido: e.target.value })} maxLength={80} />
                <ContadorCaracteres atual={editData.regrasPermitido.length} max={80} />
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label" style={{ color: '#a12626' }}>✗ Proibido</label>
                <textarea className="painel-textarea" rows={4} value={editData.regrasProibido} onChange={(e) => setEditData({ ...editData, regrasProibido: e.target.value })} maxLength={80} />
                <ContadorCaracteres atual={editData.regrasProibido.length} max={80} />
              </div>

              <div className="painel-section-title">Catálogo de peixes</div>
              <div className="painel-grid">
                {PEIXES_DISPONIVEIS.map((peixe) => (
                  <div key={peixe} className={`painel-chip ${peixesSelecionados.includes(peixe) ? 'is-active' : ''}`} onClick={() => togglePeixe(peixe)}>
                    {peixesSelecionados.includes(peixe) ? '✓ ' : ''}{peixe}
                  </div>
                ))}
              </div>

              <div className="painel-section-title">Fotos e peixes personalizados</div>
              <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem', marginBottom: '16px' }}>
                Aqui embaixo é diferente do catálogo acima: cada peixe personalizado é um item à parte, com foto e descrição próprias.
                Se o nome que você digitar for igual ao de um peixe já marcado no catálogo acima (ex: "carpa"), a foto e a descrição substituem as padrão dele só no seu pesqueiro — e se você desmarcar aquele peixe lá em cima, a substituição é removida automaticamente.
              </p>

              {peixesCustom.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>
                    Já adicionados ({peixesCustom.length}/20)
                  </div>
                  <div className="painel-grid">
                    {peixesCustom.map((peixe) => (
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

              <div style={{ background: editandoPeixeId ? 'rgba(54, 133, 181, 0.08)' : 'var(--surface)', border: editandoPeixeId ? '1.5px solid var(--blue)' : '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '16px', marginBottom: '20px' }}>
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

              <div className="perfil-danger-zone">
                <p>Deletar o pesqueiro é permanente e não pode ser desfeito.</p>
                <button className="perfil-btn perfil-btn-danger" style={{ flex: '0 0 auto', padding: '0 28px' }} onClick={handleDelete} disabled={saving}>
                  {saving ? 'Deletando...' : 'Deletar pesqueiro permanentemente'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {foto && <img src={foto} alt={pesqueiro.nome} style={{ width: '100%', maxHeight: '260px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: '20px' }} />}
              <div className="perfil-field">
                <span className="perfil-field-label">Telefone</span>
                <span className="perfil-field-value">{editData.telefone || '—'}</span>
              </div>
              <div className="perfil-field">
                <span className="perfil-field-label">CNPJ</span>
                <span className="perfil-field-value">{editData.cnpj || '—'}</span>
              </div>
              <div className="perfil-field">
                <span className="perfil-field-label">CEP / Número / Complemento</span>
                <span className="perfil-field-value">{editData.cep || '—'} · {editData.numero || '—'} · {editData.complemento || '—'}</span>
              </div>
              {editData.linkMapa && (
                <div className="perfil-field">
                  <span className="perfil-field-label">Mapa</span>
                  <a href={editData.linkMapa} target="_blank" rel="noopener noreferrer" className="painel-map-link">Ver no Google Maps</a>
                </div>
              )}
              {editData.descricaoTexto && (
                <div className="perfil-field">
                  <span className="perfil-field-label">Descrição</span>
                  <span className="perfil-field-value">{editData.descricaoTexto}</span>
                </div>
              )}
              {(editData.diasAbertos.length > 0 || editData.precoSemana || editData.precoFimSemana) && (
                <div className="perfil-field">
                  <span className="perfil-field-label">Funcionamento</span>
                  <span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>
                    {formatarInfoRapidaTexto(buildInfoRapida(editData.diasAbertos, editData.precoSemana, editData.precoFimSemana))}
                  </span>
                </div>
              )}
              {editData.catalogoPeixes && (
                <div className="perfil-field">
                  <span className="perfil-field-label">Peixes</span>
                  <span className="perfil-field-value">{editData.catalogoPeixes}</span>
                </div>
              )}
              {editData.regrasPermitido && (
                <div className="perfil-field">
                  <span className="perfil-field-label">Permitido</span>
                  <span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{editData.regrasPermitido}</span>
                </div>
              )}
              {editData.regrasProibido && (
                <div className="perfil-field">
                  <span className="perfil-field-label">Proibido</span>
                  <span className="perfil-field-value" style={{ whiteSpace: 'pre-wrap' }}>{editData.regrasProibido}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PainelPesqueiro;
