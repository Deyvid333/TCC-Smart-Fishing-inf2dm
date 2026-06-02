// ========== IMPORTAÇÕES ==========
// Importa estilos CSS
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UsuarioService from './services/UsuarioService';
import PesqueiroService from './services/PesqueiroService';
import UsuarioPesqueiroService from './services/UsuarioPesqueiroService';

// ========== COMPONENTE DE CADASTRO ==========
function Cadastro() {
  // ========== HOOKS E ESTADOS ==========
  // Hook para navegação programática entre páginas
  const navigate = useNavigate();
  
  // Estado para armazenar todos os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: 'usuario',
    nomePesqueiro: '',
    descricaoPesqueiro: '',
    informacoesRapidas: '',
    regrasPermitido: '',
    regrasProibido: '',
    catalogoPeixes: '',
    cep: '',
    numero: '',
    complemento: '',
  });
  const [loading, setLoading] = useState(false);

  // ========== FUNÇÕES DE MANIPULAÇÃO ==========
  
  const formatInformacao = () => {
    return JSON.stringify({
      detalhamento: formData.informacoesRapidas || '',
      catalogoPeixes: (formData.catalogoPeixes || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      regrasPermitido: (formData.regrasPermitido || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      regrasProibido: (formData.regrasProibido || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  const validarFormulario = () => {
    if (!formData.nome.trim()) return 'Preencha seu nome completo.';
    if (!formData.email.trim()) return 'Preencha seu e-mail.';
    if (!formData.senha.trim()) return 'Preencha sua senha.';
    if (formData.senha !== formData.confirmarSenha) return 'As senhas não coincidem.';
    if (formData.tipoUsuario === 'dono') {
      if (!formData.nomePesqueiro.trim()) return 'Preencha o nome do pesqueiro.';
      if (!formData.descricaoPesqueiro.trim()) return 'Descreva seu pesqueiro.';
      if (!formData.informacoesRapidas.trim()) return 'Adicione informações do pesqueiro (preço, horário, área etc).';
      if (!formData.catalogoPeixes.trim()) return 'Liste pelo menos um tipo de peixe disponível.';
    }
    return '';
  };

  // Função para processar o cadastro do usuário
  const handleCadastro = async () => {
    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      alert(erroValidacao);
      return;
    }

    setLoading(true);
    try {
      await UsuarioService.cadastrar({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        nivelAcesso: formData.tipoUsuario === 'dono' ? 'admin' : 'usuario',
        statusUsuario: true,
      });

      const usuarioLogado = await UsuarioService.login(formData.email, formData.senha);

      if (formData.tipoUsuario === 'dono') {
        const novoPesqueiro = {
          nome: formData.nomePesqueiro,
          telefone: '',
          descricao: formData.descricaoPesqueiro,
          informacao: formatInformacao(),
          cep: formData.cep,
          numero: formData.numero,
          complemento: formData.complemento,
          statusPesqueiro: true,
          dataCadastro: new Date().toISOString().split('T')[0],
        };

        const response = await PesqueiroService.criar(novoPesqueiro);

        await UsuarioPesqueiroService.criar({
          usuarioId: usuarioLogado.id,
          pesqueiroId: response.data.id,
          statusUsuarioPesqueiro: true,
        });

        alert('Cadastro de proprietário concluído! Seu pesqueiro já foi registrado.');
        navigate('/admin');
        return;
      }

      alert('Cadastro realizado com sucesso!');
      navigate('/inicial');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para cadastro com redes sociais (simulação)
  const handleSocialLogin = (provider) => {
    console.log(`Login com ${provider}`); // Log para debug
    
    // Redireciona baseado no tipo de usuário selecionado
    if (formData.tipoUsuario === 'dono') {
      navigate('/admin');
    } else {
      navigate('/inicial');
    }
  };

  // Função para atualizar os dados do formulário
  const handleInputChange = (e) => {
    setFormData({
      ...formData, // Mantém os valores existentes
      [e.target.name]: e.target.value // Atualiza apenas o campo alterado
    });
  };

  // ========== RENDERIZAÇÃO DO COMPONENTE ==========
  return (
    <div className="form-wrapper">
      {/* Formulário principal de cadastro */}
      <form className="custom-form">
        <h1>Seja Bem Vindo à Smart Fishing</h1>
        
        {/* ========== CAMPO NOME ========== */}
        <input 
          name="nome" 
          type="text" 
          placeholder="Nome completo" 
          value={formData.nome} // Valor controlado pelo estado
          onChange={handleInputChange} // Atualiza o estado quando muda
          required
        />
        
        {/* ========== SEÇÃO DE SELEÇÃO DE TIPO DE USUÁRIO ========== */}
        <div className="user-type-selection">
          <label className="user-type-label">Tipo de cadastro:</label>
          <div className="user-type-options">
            {/* Opção: Usuário comum (pescador) */}
            <label className="user-type-option">
              <input 
                type="radio" 
                name="tipoUsuario" 
                value="usuario" 
                checked={formData.tipoUsuario === 'usuario'} // Verifica se está selecionado
                onChange={handleInputChange} // Atualiza o estado
              />
              <span className="user-type-text">
                <span className="user-type-icon">Pescador</span>
                <span className="user-type-title">Usuário</span>
                <span className="user-type-desc">Quero encontrar pesqueiros</span>
              </span>
            </label>
            
            {/* Opção: Dono de pesqueiro */}
            <label className="user-type-option">
              <input 
                type="radio" 
                name="tipoUsuario" 
                value="dono" 
                checked={formData.tipoUsuario === 'dono'}
                onChange={handleInputChange}
              />
              <span className="user-type-text">
                <span className="user-type-icon">Proprietário</span>
                <span className="user-type-title">Dono de Pesqueiro</span>
                <span className="user-type-desc">Quero cadastrar meu pesqueiro</span>
              </span>
            </label>
          </div>
        </div>
        
        {/* ========== CAMPOS DO FORMULÁRIO ========== */}
        {/* Campo de e-mail */}
        <input 
          name="email" 
          type="email" 
          placeholder="E-mail" 
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        
        {/* Campo de senha */}
        <input 
          name="senha" 
          type="password" 
          placeholder="Senha" 
          value={formData.senha}
          onChange={handleInputChange}
          required
        />
        
        {/* Campo de confirmação de senha */}
        <input 
          name="confirmarSenha" 
          type="password" 
          placeholder="Confirmar senha" 
          value={formData.confirmarSenha}
          onChange={handleInputChange}
          required
        />

        {formData.tipoUsuario === 'dono' && (
          <div className="owner-section">
            <h2>Dados do seu pesqueiro</h2>
            <input
              name="nomePesqueiro"
              type="text"
              placeholder="Nome do pesqueiro"
              value={formData.nomePesqueiro}
              onChange={handleInputChange}
            />
            <textarea
              name="descricaoPesqueiro"
              placeholder="Descrição do pesqueiro"
              value={formData.descricaoPesqueiro}
              onChange={handleInputChange}
              rows={3}
            />
            <textarea
              name="informacoesRapidas"
              placeholder="Informações rápidas (área, horário, preço, serviços, etc.)"
              value={formData.informacoesRapidas}
              onChange={handleInputChange}
              rows={4}
            />
            <textarea
              name="regrasPermitido"
              placeholder="Regras permitidas (uma por linha)"
              value={formData.regrasPermitido}
              onChange={handleInputChange}
              rows={3}
            />
            <textarea
              name="regrasProibido"
              placeholder="Regras proibidas (uma por linha)"
              value={formData.regrasProibido}
              onChange={handleInputChange}
              rows={3}
            />
            <input
              name="catalogoPeixes"
              type="text"
              placeholder="Catálogo de peixes (separado por vírgula)"
              value={formData.catalogoPeixes}
              onChange={handleInputChange}
            />
            <div className="row g-3">
              <div className="col-6">
                <input
                  name="cep"
                  type="text"
                  placeholder="CEP"
                  value={formData.cep}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-3">
                <input
                  name="numero"
                  type="text"
                  placeholder="Número"
                  value={formData.numero}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-3">
                <input
                  name="complemento"
                  type="text"
                  placeholder="Complemento"
                  value={formData.complemento}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Botão principal de cadastro */}
        <button type="button" onClick={handleCadastro} disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar-se'}
        </button>

        <h3 className="h2index">Já tem uma conta?</h3>
        <div className="register-link">
          <Link to="/login">Fazer Login</Link>
        </div>
      </form>
    </div>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default Cadastro;