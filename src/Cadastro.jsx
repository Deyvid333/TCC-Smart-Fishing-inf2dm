
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

function Cadastro() {
  const navigate = useNavigate();

  const handleCadastro = () => {

    navigate('/home'); 
  };

  return (
    <div className='container'>
      <form >
        <h1>Seja Bem Vindo à Smart Fishing</h1>
        <input name='email' type='email' placeholder='E-mail' />
        <input name='senha' type='password' placeholder='Senha' />
        <button type='button' onClick={handleCadastro}>Cadastrar-se</button>
        <h3 className='h2index'>Já tem uma conta?</h3>
        <div className="register-link">
          <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
