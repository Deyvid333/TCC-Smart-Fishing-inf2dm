import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  return (
    <div className='container'>
      <form>
        <h1>Seja Bem Vindo de Volta</h1>
        <input name='email' type='email' placeholder='E-mail' />
        <input name='senha' type='password' placeholder='Senha' />
        <button type='button' onClick={handleLogin}>Login</button>
        <h3 className='h2index'>Não tem uma conta?</h3>
        <div className="register-link">
          <Link to="/cadastro">Cadastre-se!</Link>
        </div>
      </form>
    </div>
  );
}

export default Login