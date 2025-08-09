import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.form.email.value;
    const senha = e.target.form.senha.value;
    
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    navigate('/inicial');
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login com ${provider}`);
    navigate('/inicial');
  };

  const handleForgotPassword = () => {
    alert('Link de recuperação enviado para seu e-mail!');
  };

  return (
    <div className="container">
      <form className="custom-form">
        <h1>Seja Bem Vindo de Volta</h1>
        <input name="email" type="email" placeholder="E-mail" required />
        <input name="senha" type="password" placeholder="Senha" required />
        
        
        
        <button type="button" onClick={handleLogin}>Entrar</button>
        
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
            <span className="social-icon">f</span>
            Entrar com Facebook
          </button>
          
          <button 
            type="button" 
            className="social-btn apple-btn"
            onClick={() => handleSocialLogin('Apple')}
          >
            <span className="social-icon"></span>
            Entrar com Apple
          </button>
        </div>
        
        <h3 className="h2index">Não tem uma conta?</h3>
        <div className="register-link">
          <Link to="/cadastro">Cadastre-se!</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
