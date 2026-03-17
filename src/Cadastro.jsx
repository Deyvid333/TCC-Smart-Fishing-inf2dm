// ========== IMPORTAÇÕES ==========
// Importa estilos CSS
import './App.css';
// Importa componentes do React Router para navegação
import { Link, useNavigate } from 'react-router-dom';
// Importa hook useState para gerenciar estado
import { useState } from 'react';

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
    tipoUsuario: 'usuario' // Valor padrão
  });

  // ========== FUNÇÕES DE MANIPULAÇÃO ==========
  
  // Função para processar o cadastro do usuário
  const handleCadastro = () => {
    // Validação: verifica se todos os campos estão preenchidos
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    // Validação: verifica se as senhas coincidem
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    // Redireciona baseado no tipo de usuário selecionado
    if (formData.tipoUsuario === 'dono') {
      navigate('/admin'); // Vai para painel administrativo
    } else {
      navigate('/inicial'); // Vai para página inicial do usuário
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
    <div className="container">
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
        
        {/* Botão principal de cadastro */}
        <button type="button" onClick={handleCadastro}>Cadastrar-se</button>
        
        <div className="divider">
          <span>ou</span>
        </div>
        
        <div className="social-buttons">
          <button 
            type="button" 
            className="social-btn google-btn"
            onClick={() => handleSocialLogin('Google')}
          >
            <span className="social-icon">G</span>
            Entrar com Google
          </button>
          
          <button 
            type="button" 
            className="social-btn facebook-btn"
            onClick={() => handleSocialLogin('Facebook')}
          >
            Entrar com Facebook
          </button>
          
          <button 
            type="button" 
            className="social-btn apple-btn"
            onClick={() => handleSocialLogin('Apple')}
          >
            Entrar com Apple
          </button>
        </div>
        
        {/* ========== LINK PARA LOGIN ========== */}
        <h3 className="h2index">Já tem uma conta?</h3>
        <div className="register-link">
          {/* Link para página de login */}
          <Link to="/login">Fazer Login</Link>
        </div>
      </form>
    </div>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default Cadastro;