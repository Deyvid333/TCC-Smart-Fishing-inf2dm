import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import PesqueiroService from './services/PesqueiroService';
import UsuarioPesqueiroService from './services/UsuarioPesqueiroService';
import UsuarioService from './services/UsuarioService';

const PEIXES_DISPONIVEIS = [
  'tilapia','dourado','carpa','pacu','tambaqui','pintado','traira',
  'curimbata','lambari','piau','patinga','jundia','matrinxa','tucunare',
  'tambacu','cachara','bicuda','trairao','catfish'
];

function CadastroPesqueiro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePesqueiro: '',
    descricaoPesqueiro: '',
    informacoesRapidas: '',
    regrasPermitido: '',
    regrasProibido: '',
    catalogoPeixes: '',
    cep: '',
    numero: '',
    complemento: '',
    telefone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePeixe = (peixe) => {
    const selecionados = formData.catalogoPeixes
      ? formData.catalogoPeixes.split(',').map(p => p.trim().toLowerCase()).filter(Boolean)
      : [];
    const novos = selecionados.includes(peixe)
      ? selecionados.filter(p => p !== peixe)
      : [...selecionados, peixe];
    setFormData({ ...formData, catalogoPeixes: novos.join(', ') });
  };

  const handleSubmit = async () => {
    if (!formData.nomePesqueiro.trim()) {
      alert('Preencha o nome do pesqueiro.');
      return;
    }
    setLoading(true);
    try {
      const usuario = UsuarioService.getCurrentUser();
      if (!usuario) {
        alert('Usuário não autenticado. Faça login novamente.');
        navigate('/login');
        return;
      }

      // Construir descrição com catálogo de peixes
      const partesDescricao = [
        formData.descricaoPesqueiro,
        formData.informacoesRapidas ? 'Info:' + formData.informacoesRapidas : '',
        formData.catalogoPeixes ? 'F:' + formData.catalogoPeixes : '',
      ].filter(Boolean);

      // Construir informação com regras
      const partesInformacao = [
        formData.regrasPermitido ? 'P:' + formData.regrasPermitido.substring(0, 80) : '',
        formData.regrasProibido ? 'X:' + formData.regrasProibido.substring(0, 80) : '',
      ].filter(Boolean);

      const novoPesqueiro = {
        nome: formData.nomePesqueiro,
        telefone: formData.telefone || null,
        descricao: partesDescricao.join(' | ').substring(0, 600) || null,
        informacao: partesInformacao.join('|').substring(0, 100) || null,
        cep: formData.cep ? formData.cep.replace(/\D/g, '').substring(0, 8) : null,
        numero: formData.numero ? formData.numero.substring(0, 10) : null,
        complemento: formData.complemento ? formData.complemento.substring(0, 50) : null,
        statusPesqueiro: true,
        dataCadastro: new Date().toISOString().split('T')[0],
      };

      const responsePesqueiro = await PesqueiroService.criar(novoPesqueiro);

      await UsuarioPesqueiroService.criar({
        usuarioId: usuario.id,
        pesqueiroId: responsePesqueiro.data.id,
        statusUsuarioPesqueiro: true,
      });

      alert('Pesqueiro cadastrado com sucesso!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar pesqueiro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-page-content">
      <div style={{ width: '90%', maxWidth: '900px', margin: '0 auto' }}>
        <h1 className="text-center mb-2 text-white">Cadastrar Pesqueiro</h1>
        <p className="text-center mb-5" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Preencha as informações do seu estabelecimento
        </p>

        {/* SEÇÃO 1 - Informações Básicas */}
        <div className="card info-card mb-4">
          <div className="card-body p-4">
            <h5 className="mb-4" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '10px' }}>
              📋 Informações Básicas
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

        {/* SEÇÃO 2 - Endereço */}
        <div className="card info-card mb-4">
          <div className="card-body p-4">
            <h5 className="mb-4" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '10px' }}>
              📍 Endereço
            </h5>
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

        {/* SEÇÃO 3 - Regras */}
        <div className="card info-card mb-4">
          <div className="card-body p-4">
            <h5 className="mb-4" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '10px' }}>
              📜 Regras do Pesqueiro
            </h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold" style={{ color: '#27ae60' }}>✓ O que é Permitido</label>
                <textarea
                  className="form-control"
                  name="regrasPermitido"
                  placeholder={'Uma regra por linha\nEx:\nEntrada de crianças\nCooler próprio\nEquipamentos de pesca'}
                  value={formData.regrasPermitido}
                  onChange={handleInputChange}
                  rows={5}
                  style={{ borderLeft: '3px solid #27ae60' }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold" style={{ color: '#e74c3c' }}>✗ O que é Proibido</label>
                <textarea
                  className="form-control"
                  name="regrasProibido"
                  placeholder={'Uma regra por linha\nEx:\nEntrada de animais\nBebidas alcoólicas\nPesca com rede'}
                  value={formData.regrasProibido}
                  onChange={handleInputChange}
                  rows={5}
                  style={{ borderLeft: '3px solid #e74c3c' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO 4 - Catálogo */}
        <div className="card info-card mb-5">
          <div className="card-body p-4">
            <h5 className="mb-3" style={{ color: '#112D4E', borderBottom: '2px solid #DBE2EF', paddingBottom: '10px' }}>
              🐟 Catálogo de Peixes
            </h5>
            <small className="text-muted d-block mb-3">
              Clique para selecionar os peixes disponíveis no seu pesqueiro:
            </small>
            <div className="row g-2">
              {PEIXES_DISPONIVEIS.map(peixe => {
                const peixesSelecionados = formData.catalogoPeixes
                  ? formData.catalogoPeixes.split(',').map(p => p.trim().toLowerCase()).filter(Boolean)
                  : [];
                const marcado = peixesSelecionados.includes(peixe);
                return (
                  <div key={peixe} className="col-6 col-md-3">
                    <div
                      onClick={() => togglePeixe(peixe)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: marcado ? '2px solid #3F72AF' : '2px solid #DBE2EF',
                        background: marcado ? '#DBE2EF' : '#F9F7F7',
                        fontWeight: marcado ? '600' : '400',
                        color: marcado ? '#112D4E' : '#666',
                        textTransform: 'capitalize',
                        userSelect: 'none',
                        transition: 'all 0.2s ease',
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

        <div className="text-center mb-5">
          <button type="button" onClick={handleSubmit} disabled={loading} className="btn btn-primary btn-lg px-5">
            {loading ? 'Cadastrando...' : '🎣 Cadastrar Pesqueiro'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CadastroPesqueiro;
