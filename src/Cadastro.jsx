import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: 'usuario'
  });

  const handleCadastro = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    // Redireciona baseado no tipo de usuário
    if (formData.tipoUsuario === 'dono') {
      navigate('/admin');
    } else {
      navigate('/inicial');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login com ${provider}`);
    // Redireciona baseado no tipo de usuário selecionado
    if (formData.tipoUsuario === 'dono') {
      navigate('/admin');
    } else {
      navigate('/inicial');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <form className="custom-form">
        <h1>Seja Bem Vindo à Smart Fishing</h1>
        
        <input 
          name="nome" 
          type="text" 
          placeholder="Nome completo" 
          value={formData.nome}
          onChange={handleInputChange}
          required
        />
        
        <div className="user-type-selection">
          <label className="user-type-label">Tipo de cadastro:</label>
          <div className="user-type-options">
            <label className="user-type-option">
              <input 
                type="radio" 
                name="tipoUsuario" 
                value="usuario" 
                checked={formData.tipoUsuario === 'usuario'}
                onChange={handleInputChange}
              />
              <span className="user-type-text">
                <span className="user-type-icon">🎣</span>
                <span className="user-type-title">Usuário</span>
                <span className="user-type-desc">Quero encontrar pesqueiros</span>
              </span>
            </label>
            
            <label className="user-type-option">
              <input 
                type="radio" 
                name="tipoUsuario" 
                value="dono" 
                checked={formData.tipoUsuario === 'dono'}
                onChange={handleInputChange}
              />
              <span className="user-type-text">
                <span className="user-type-icon">🏢</span>
                <span className="user-type-title">Dono de Pesqueiro</span>
                <span className="user-type-desc">Quero cadastrar meu pesqueiro</span>
              </span>
            </label>
          </div>
        </div>
        
        <input 
          name="email" 
          type="email" 
          placeholder="E-mail" 
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        
        <input 
          name="senha" 
          type="password" 
          placeholder="Senha" 
          value={formData.senha}
          onChange={handleInputChange}
          required
        />
        
        <input 
          name="confirmarSenha" 
          type="password" 
          placeholder="Confirmar senha" 
          value={formData.confirmarSenha}
          onChange={handleInputChange}
          required
        />
        
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
            <span className="social-icon">📘</span>
            Entrar com Facebook
          </button>
          
          <button 
            type="button" 
            className="social-btn apple-btn"
            onClick={() => handleSocialLogin('Apple')}
          >
            <span className="social-icon">🍎</span>
            Entrar com Apple
          </button>
        </div>
        
        <h3 className="h2index">Já tem uma conta?</h3>
        <div className="register-link">
          <Link to="/login">Fazer Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;