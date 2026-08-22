import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import PesqueiroService from './services/PesqueiroService';
import UsuarioService from './services/UsuarioService';
import {
  PEIXES_DISPONIVEIS, parseInformacao, parseDescricao, buildInformacao, buildDescricao, statusPesqueiro,
} from './utils/pesqueiroFormato';
import './App.css';

const FORM_VAZIO = {
  nomePesqueiro: '', descricaoPesqueiro: '', informacoesRapidas: '',
  regrasPermitido: '', regrasProibido: '', catalogoPeixes: '',
  cep: '', numero: '', complemento: '', telefone: '',
};

function IndiqueSeuPesqueiro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [meusPesqueiros, setMeusPesqueiros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState(FORM_VAZIO);
  const [mensagem, setMensagem] = useState('');

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

  const iniciarEdicao = (pesqueiro) => {
    const { regrasPermitido, regrasProibido } = parseInformacao(pesqueiro.informacao);
    const { descricaoTexto, informacoesRapidas, catalogoPeixes } = parseDescricao(pesqueiro.descricao);
    setFormData({
      nomePesqueiro: pesqueiro.nome || '',
      descricaoPesqueiro: descricaoTexto,
      informacoesRapidas,
      regrasPermitido,
      regrasProibido,
      catalogoPeixes,
      cep: pesqueiro.cep || '',
      numero: pesqueiro.numero || '',
      complemento: pesqueiro.complemento || '',
      telefone: pesqueiro.telefone || '',
    });
    setEditandoId(pesqueiro.id);
    setMensagem('');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData(FORM_VAZIO);
  };

  const handleSubmit = async () => {
    if (!formData.nomePesqueiro.trim()) {
      alert('Preencha o nome do pesqueiro.');
      return;
    }
    setSalvando(true);
    setMensagem('');
    try {
      const payload = {
        nome: formData.nomePesqueiro,
        telefone: formData.telefone || '',
        descricao: buildDescricao(formData.descricaoPesqueiro, formData.informacoesRapidas, formData.catalogoPeixes),
        informacao: buildInformacao(formData.regrasPermitido, formData.regrasProibido),
        cep: formData.cep ? formData.cep.replace(/\D/g, '').substring(0, 8) : null,
        numero: formData.numero ? formData.numero.substring(0, 10) : null,
        complemento: formData.complemento ? formData.complemento.substring(0, 50) : null,
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
    <div className="user-page-content">
      <Navbar />
      <div style={{ width: '90%', maxWidth: '900px', margin: '0 auto', paddingTop: '24px' }}>
        <h1 className="text-center mb-2 text-white">Indique seu pesqueiro</h1>
        <p className="text-center mb-5" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Envie as informações do seu pesqueiro para análise da nossa equipe.
        </p>

        {loading ? (
          <p className="text-center text-white">Carregando...</p>
        ) : (
          <>
            {aprovados.length > 0 && (
              <div className="card info-card mb-4">
                <div className="card-body p-4">
                  <h5 className="mb-3" style={{ color: '#112D4E' }}>Seus pesqueiros aprovados</h5>
                  {aprovados.map((p) => (
                    <div key={p.id} className="d-flex justify-content-between align-items-center p-3 mb-2" style={{ background: '#F9F7F7', borderRadius: '8px' }}>
                      <div>
                        <strong>{p.nome}</strong>
                        <span className="badge bg-success ms-2">Aprovado</span>
                      </div>
                      <a href={`/painel-pesqueiro/${p.id}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                        Administrar
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {naoAprovados.length > 0 && (
              <div className="card info-card mb-4">
                <div className="card-body p-4">
                  <h5 className="mb-3" style={{ color: '#112D4E' }}>Suas solicitações</h5>
                  {naoAprovados.map((p) => {
                    const status = statusPesqueiro(p.aprovado);
                    return (
                      <div key={p.id} className="d-flex justify-content-between align-items-center p-3 mb-2" style={{ background: '#F9F7F7', borderRadius: '8px' }}>
                        <div>
                          <strong>{p.nome}</strong>
                          <span className={`badge ${status.classe} ms-2`}>{status.texto}</span>
                        </div>
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => iniciarEdicao(p)}>
                          Editar
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {mensagem && (
              <div className="alert alert-success text-center">{mensagem}</div>
            )}

            {atingiuLimite ? (
              <div className="card info-card mb-4">
                <div className="card-body p-4 text-center">
                  <h5 style={{ color: '#112D4E' }}>Você atingiu o limite de solicitações pendentes</h5>
                  <p className="mb-0">Edite uma das solicitações acima ou aguarde a análise antes de enviar outra.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="card info-card mb-4">
                  <div className="card-body p-4">
                    <h5 className="mb-4" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '10px' }}>
                      {editandoId ? '✏️ Editando solicitação' : '📋 Informações Básicas'}
                    </h5>
                    <div className="row g-3">
                      <div className="col-md-8">
                        <label className="form-label fw-bold">Nome do Pesqueiro *</label>
                        <input className="form-control" name="nomePesqueiro" placeholder="Ex: Pesqueiro Águas Claras" value={formData.nomePesqueiro} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Telefone</label>
                        <input className="form-control" name="telefone" placeholder="(11) 99999-9999" value={formData.telefone} onChange={handleInputChange} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold">Descrição</label>
                        <textarea className="form-control" name="descricaoPesqueiro" placeholder="Descreva seu pesqueiro, diferenciais, ambiente..." value={formData.descricaoPesqueiro} onChange={handleInputChange} rows={3} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold">Informações Rápidas</label>
                        <textarea className="form-control" name="informacoesRapidas" placeholder="Ex: Aberto de seg a dom, das 6h às 18h. Valor: R$30/dia. Área: 5.000m²" value={formData.informacoesRapidas} onChange={handleInputChange} rows={2} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card info-card mb-4">
                  <div className="card-body p-4">
                    <h5 className="mb-4" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '10px' }}>📍 Endereço</h5>
                    <div className="row g-3">
                      <div className="col-md-5">
                        <label className="form-label fw-bold">CEP</label>
                        <input className="form-control" name="cep" placeholder="00000-000" value={formData.cep} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-bold">Número</label>
                        <input className="form-control" name="numero" placeholder="123" value={formData.numero} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Complemento</label>
                        <input className="form-control" name="complemento" placeholder="Referência, bairro..." value={formData.complemento} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card info-card mb-4">
                  <div className="card-body p-4">
                    <h5 className="mb-4" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '10px' }}>📜 Regras do Pesqueiro</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold" style={{ color: '#27ae60' }}>✓ O que é Permitido</label>
                        <textarea className="form-control" name="regrasPermitido" placeholder={'Uma regra por linha'} value={formData.regrasPermitido} onChange={handleInputChange} rows={5} style={{ borderLeft: '3px solid #27ae60' }} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold" style={{ color: '#e74c3c' }}>✗ O que é Proibido</label>
                        <textarea className="form-control" name="regrasProibido" placeholder={'Uma regra por linha'} value={formData.regrasProibido} onChange={handleInputChange} rows={5} style={{ borderLeft: '3px solid #e74c3c' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card info-card mb-5">
                  <div className="card-body p-4">
                    <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '10px' }}>🐟 Catálogo de Peixes</h5>
                    <div className="row g-2">
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
                  </div>
                </div>

                <div className="text-center mb-5 d-flex justify-content-center gap-2">
                  <button type="button" onClick={handleSubmit} disabled={salvando} className="btn btn-primary btn-lg px-5">
                    {salvando ? 'Enviando...' : editandoId ? '💾 Salvar edição' : '🎣 Enviar para análise'}
                  </button>
                  {editandoId && (
                    <button type="button" onClick={cancelarEdicao} className="btn btn-outline-secondary btn-lg px-4">
                      Cancelar
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default IndiqueSeuPesqueiro;
