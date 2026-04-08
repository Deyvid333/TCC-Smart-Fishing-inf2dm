import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import UsuarioService from './services/UsuarioService';

function Login() {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState('usuario');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      const usuario = await UsuarioService.login(email, senha);
      if (tipoUsuario === 'dono' && usuario.nivelAcesso !== 'admin') {
        alert('Essa conta não é de dono de pesqueiro!');
        return;
      }
      if (tipoUsuario === 'usuario' && usuario.nivelAcesso === 'admin') {
        alert('Essa conta é de dono de pesqueiro. Selecione a opção correta!');
        return;
      }
      if (usuario.nivelAcesso === 'admin') {
        navigate('/admin');
      } else {
        navigate('/inicial');
      }
    } catch (err) {
      alert('Email ou senha inválidos!');
    } finally {
      setLoading(false);
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
                <span className="user-type-icon">Pescador</span>
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
                <span className="user-type-icon">Proprietário</span>
                <span className="user-type-title">Dono de Pesqueiro</span>
                <span className="user-type-desc">Proprietário</span>
              </span>
            </label>
          </div>
        </div>
        
        <input name="email" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input name="senha" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />

        <button type="button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        
        <h3 className="h2index">Não tem uma conta?</h3>
        <div className="register-link">
          <Link to="/cadastro">Cadastre-se!</Link>
        </div>
      </form>
    </div>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default Login;