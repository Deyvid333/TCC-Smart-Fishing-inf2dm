import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import PesqueiroService from './services/PesqueiroService';
import UsuarioService from './services/UsuarioService';
import { redimensionarImagem, soBase64 } from './utils/imagem';
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
      .then((res) => setMeusPesqueiros(res.data))
      .catch((err) => console.error('Erro ao carregar seus pesqueiros', err))
      .finally(() => setLoading(false));
  };

  const aprovados = meusPesqueiros.filter((p) => p.aprovado === true);
  const naoAprovados = meusPesqueiros.filter((p) => p.aprovado !== true);
  const limite = aprovados.length > 0 ? 5 : 1;
  const atingiuLimite = naoAprovados.length >= limite && editandoId === null;

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePeixe = (peixe) => {
    const selecionados = formData.catalogoPeixes
      ? formData.catalogoPeixes.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean)
      : [];
    const novos = selecionados.includes(peixe)
      ? selecionados.filter((p) => p !== peixe)
      : [...selecionados, peixe];
    setFormData({ ...formData, catalogoPeixes: novos.join(', ') });
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
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData(FORM_VAZIO);
    setFoto(null);
    setErros({});
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
        await PesqueiroService.criar(payload);
        setMensagem('Solicitação enviada! Está em análise.');
      }
      setEditandoId(null);
      setFormData(FORM_VAZIO);
      setFoto(null);
      setErros({});
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

      <div className="perfil-header">
        <h2 className="perfil-name">Indique seu pesqueiro</h2>
        <span className="perfil-badge">Envie as informações para análise da nossa equipe</span>
      </div>

      <div className="perfil-card">
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <>
            {aprovados.length > 0 && (
              <div className="perfil-card-inner" style={{ marginBottom: '20px' }}>
                <div className="painel-section-title">Seus pesqueiros aprovados</div>
                {aprovados.map((p) => (
                  <div key={p.id} className="painel-row">
                    <div className="painel-row-info">
                      {p.foto && <img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nome} className="painel-row-photo" style={{ marginRight: '14px' }} />}
                      <span className="painel-row-name">{p.nome}</span>
                      <span className="painel-badge is-aprovado">Aprovado</span>
                    </div>
                    <a href={`/painel-pesqueiro/${p.id}`} target="_blank" rel="noopener noreferrer" className="perfil-btn perfil-btn-primary" style={{ flex: 'none', padding: '0 20px' }}>
                      Administrar
                    </a>
                  </div>
                ))}
              </div>
            )}

            {naoAprovados.length > 0 && (
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

            {mensagem && <div className="painel-alert is-success">{mensagem}</div>}

            {atingiuLimite ? (
              <div className="perfil-card-inner text-center">
                <h5 style={{ color: 'var(--navy)' }}>Você atingiu o limite de solicitações pendentes</h5>
                <p className="perfil-field-value" style={{ marginTop: '8px' }}>
                  Edite uma das solicitações acima ou aguarde a análise antes de enviar outra.
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
                    Escolher foto
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFotoSelecionada} />
                  </label>
                </div>

                <div className="perfil-field">
                  <label className="perfil-field-label">Nome do Pesqueiro *</label>
                  <input className="perfil-input" name="nomePesqueiro" placeholder="Ex: Pesqueiro Águas Claras" value={formData.nomePesqueiro} onChange={handleInputChange} />
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
                  <textarea className="painel-textarea" name="descricaoPesqueiro" placeholder="Descreva seu pesqueiro, diferenciais, ambiente..." value={formData.descricaoPesqueiro} onChange={handleInputChange} rows={3} />
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
                  <input className="perfil-input" name="numero" placeholder="123" value={formData.numero} onChange={handleInputChange} />
                  {erros.numero && <small style={{ color: '#a12626' }}>{erros.numero}</small>}
                </div>
                <div className="perfil-field">
                  <label className="perfil-field-label">Complemento</label>
                  <input className="perfil-input" name="complemento" placeholder="Referência, bairro..." value={formData.complemento} onChange={handleInputChange} />
                </div>
                <div className="perfil-field">
                  <label className="perfil-field-label">Link do Google Maps</label>
                  <input className="perfil-input" name="linkMapa" placeholder="Cole aqui o link de compartilhamento do Google Maps" value={formData.linkMapa} onChange={handleInputChange} />
                  <small style={{ color: 'var(--text-soft)' }}>No Google Maps, toque em "Compartilhar" e cole o link aqui.</small>
                </div>

                <div className="painel-section-title">Regras do pesqueiro</div>

                <div className="perfil-field">
                  <label className="perfil-field-label" style={{ color: '#27ae60' }}>✓ O que é permitido</label>
                  <textarea className="painel-textarea" name="regrasPermitido" placeholder={'Uma regra por linha'} value={formData.regrasPermitido} onChange={handleInputChange} rows={4} />
                </div>
                <div className="perfil-field">
                  <label className="perfil-field-label" style={{ color: '#a12626' }}>✗ O que é proibido</label>
                  <textarea className="painel-textarea" name="regrasProibido" placeholder={'Uma regra por linha'} value={formData.regrasProibido} onChange={handleInputChange} rows={4} />
                </div>

                <div className="painel-section-title">Catálogo de peixes</div>
                <div className="painel-grid">
                  {PEIXES_DISPONIVEIS.map((peixe) => (
                    <div key={peixe} className={`painel-chip ${peixesSelecionados.includes(peixe) ? 'is-active' : ''}`} onClick={() => togglePeixe(peixe)}>
                      {peixesSelecionados.includes(peixe) ? '✓ ' : ''}{peixe}
                    </div>
                  ))}
                </div>

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
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default IndiqueSeuPesqueiro;
