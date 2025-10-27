import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function Login() {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState('usuario');

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.form.email.value;
    const senha = e.target.form.senha.value;
    
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    // Redireciona baseado no tipo de usuário
    if (tipoUsuario === 'dono') {
      navigate('/admin');
    } else {
      navigate('/inicial');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login com ${provider}`);
    // Redireciona baseado no tipo de usuário selecionado
    if (tipoUsuario === 'dono') {
      navigate('/admin');
    } else {
      navigate('/inicial');
    }
  };

  const handleForgotPassword = () => {
    alert('Link de recuperação enviado para seu e-mail!');
  };

  return (
    <div className="container">
      <form className="custom-form">
        <h1>Seja Bem Vindo de Volta</h1>
        
        <div className="user-type-selection">
          <label className="user-type-label">Entrar como:</label>
          <div className="user-type-options">
            <label className="user-type-option">
              <input 
                type="radio" 
                name="tipoUsuario" 
                value="usuario" 
                checked={tipoUsuario === 'usuario'}
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              <span className="user-type-text">
                <span className="user-type-icon">🎣</span>
                <span className="user-type-title">Usuário</span>
                <span className="user-type-desc">Pescador</span>
              </span>
            </label>
            
            <label className="user-type-option">
              <input 
                type="radio" 
                name="tipoUsuario" 
                value="dono" 
                checked={tipoUsuario === 'dono'}
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              <span className="user-type-text">
                <span className="user-type-icon">🏢</span>
                <span className="user-type-title">Dono de Pesqueiro</span>
                <span className="user-type-desc">Proprietário</span>
              </span>
            </label>
          </div>
        </div>
        
        <input name="email" type="email" placeholder="E-mail" required />
        <input name="senha" type="password" placeholder="Senha" required />
        
        
        
        <button type="button" onClick={handleLogin}>Entrar</button>
        
        {/* Divisor visual */}
        <div className="divider">
          <span>ou</span>
        </div>
        
        {/* ========== BOTÕES DE LOGIN SOCIAL ========== */}
        <div className="social-buttons">
          {/* Botão Google */}
          <button 
            type="button" 
            className="social-btn google-btn"
            onClick={() => handleSocialLogin('Google')} // Chama função com parâmetro
          >
            <span className="social-icon">G</span>
            Entrar com Google
          </button>
          
          {/* Botão Facebook */}
          <button 
            type="button" 
            className="social-btn facebook-btn"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <span className="social-icon">📘</span>
            Entrar com Facebook
          </button>
          
          {/* Botão Apple */}
          <button 
            type="button" 
            className="social-btn apple-btn"
            onClick={() => handleSocialLogin('Apple')}
          >
            <span className="social-icon">🍎</span>
            Entrar com Apple
          </button>
        </div>
        
        {/* ========== LINK PARA CADASTRO ========== */}
        <h3 className="h2index">Não tem uma conta?</h3>
        <div className="register-link">
          {/* Link para página de cadastro */}
          <Link to="/cadastro">Cadastre-se!</Link>
        </div>
      </form>
    </div>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default Login;