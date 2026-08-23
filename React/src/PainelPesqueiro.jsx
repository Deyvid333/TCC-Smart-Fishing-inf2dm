import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import PesqueiroService from './services/PesqueiroService';
import UsuarioService from './services/UsuarioService';
import { redimensionarImagem, soBase64 } from './utils/imagem';
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
    const novos = selecionados.includes(peixe)
      ? selecionados.filter((p) => p !== peixe)
      : [...selecionados, peixe];
    setEditData({ ...editData, catalogoPeixes: novos.join(', ') });
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

      <div className="perfil-header">
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
                  Trocar foto
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFotoSelecionada} />
                </label>
              </div>

              <div className="perfil-field">
                <label className="perfil-field-label">Nome *</label>
                <input className="perfil-input" value={editData.nome} onChange={(e) => setEditData({ ...editData, nome: e.target.value })} />
                {erros.nome && <small style={{ color: '#a12626' }}>{erros.nome}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Telefone comercial *</label>
                <input className="perfil-input" value={editData.telefone} onChange={(e) => setEditData({ ...editData, telefone: e.target.value })} />
                {erros.telefone && <small style={{ color: '#a12626' }}>{erros.telefone}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">CNPJ *</label>
                <input className="perfil-input" value={editData.cnpj} onChange={(e) => setEditData({ ...editData, cnpj: e.target.value })} />
                {erros.cnpj && <small style={{ color: '#a12626' }}>{erros.cnpj}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Descrição *</label>
                <textarea className="painel-textarea" rows={3} value={editData.descricaoTexto} onChange={(e) => setEditData({ ...editData, descricaoTexto: e.target.value })} />
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
                <input className="perfil-input" value={editData.cep} onChange={(e) => setEditData({ ...editData, cep: e.target.value })} />
                {erros.cep && <small style={{ color: '#a12626' }}>{erros.cep}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Número *</label>
                <input className="perfil-input" value={editData.numero} onChange={(e) => setEditData({ ...editData, numero: e.target.value })} />
                {erros.numero && <small style={{ color: '#a12626' }}>{erros.numero}</small>}
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Complemento</label>
                <input className="perfil-input" value={editData.complemento} onChange={(e) => setEditData({ ...editData, complemento: e.target.value })} />
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Link do Google Maps</label>
                <input className="perfil-input" value={editData.linkMapa} onChange={(e) => setEditData({ ...editData, linkMapa: e.target.value })} />
              </div>

              <div className="painel-section-title">Regras</div>
              <div className="perfil-field">
                <label className="perfil-field-label" style={{ color: '#27ae60' }}>✓ Permitido</label>
                <textarea className="painel-textarea" rows={4} value={editData.regrasPermitido} onChange={(e) => setEditData({ ...editData, regrasPermitido: e.target.value })} />
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label" style={{ color: '#a12626' }}>✗ Proibido</label>
                <textarea className="painel-textarea" rows={4} value={editData.regrasProibido} onChange={(e) => setEditData({ ...editData, regrasProibido: e.target.value })} />
              </div>

              <div className="painel-section-title">Catálogo de peixes</div>
              <div className="painel-grid">
                {PEIXES_DISPONIVEIS.map((peixe) => (
                  <div key={peixe} className={`painel-chip ${peixesSelecionados.includes(peixe) ? 'is-active' : ''}`} onClick={() => togglePeixe(peixe)}>
                    {peixesSelecionados.includes(peixe) ? '✓ ' : ''}{peixe}
                  </div>
                ))}
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
