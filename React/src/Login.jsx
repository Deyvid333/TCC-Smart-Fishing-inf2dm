// ========== IMPORTAÇÕES ==========
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UsuarioService from './services/UsuarioService';
import AuthLayout, {
  IconeEmail,
  IconeCadeado,
  IconeOlhoAberto,
  IconeOlhoFechado,
  IconeAlerta,
} from './Componentes/Auth/AuthLayout';
import { validarEmail, validarSenha, SENHA_DICA, EMAIL_DICA } from './Componentes/Auth/validacao';

// ========== COMPONENTE DE LOGIN ==========
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  // Mensagem de erro exibida no próprio formulário (no lugar do alert)
  const [erro, setErro] = useState('');
  // Controla se a senha aparece como texto ou como pontinhos
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async () => {
    setErro('');

    const erroEmail = validarEmail(email);
    if (erroEmail) {
      setErro(erroEmail);
      return;
    }

    const erroSenha = validarSenha(senha);
    if (erroSenha) {
      setErro(erroSenha);
      return;
    }

    setLoading(true);
    try {
      const usuario = await UsuarioService.login(email, senha);

      // Dispara evento customizado para notificar mudança no localStorage
      window.dispatchEvent(new Event('storage'));

      if (usuario.nivelAcesso?.toUpperCase() === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/inicial');
      }
    } catch (err) {
      const mensagemServidor = err.response?.data?.message;
      setErro(mensagemServidor === 'Senha incorreta' || mensagemServidor === 'Email não encontrado'
        ? 'E-mail ou senha inválidos.'
        : mensagemServidor || 'E-mail ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setErro('');
    alert('Link de recuperação enviado para seu e-mail!');
  };

  // Permite entrar apertando Enter em qualquer campo
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  // ========== RENDERIZAÇÃO ==========
  return (
    <AuthLayout
      titulo="O melhor pesqueiro"
      destaque="está esperando você"
      texto="Entre na sua conta para acompanhar seus pesqueiros favoritos, ver as espécies disponíveis e conferir o que outros pescadores estão dizendo."
    >
      <div className="auth-card-header">
        <h1>Bem-vindo de volta</h1>
        <p className="auth-card-subtitle">Entre com seus dados para continuar.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* ===== E-mail ===== */}
        <div className="auth-field">
          <label htmlFor="email">E-mail</label>
          <div className="auth-input">
            <IconeEmail />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seuemail@gmail.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <p className="auth-hint">{EMAIL_DICA}</p>
        </div>

        {/* ===== Senha ===== */}
        <div className="auth-field">
          <label htmlFor="senha">Senha</label>
          <div className="auth-input has-toggle">
            <IconeCadeado />
            <input
              id="senha"
              name="senha"
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button
              type="button"
              className="auth-toggle-eye"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? <IconeOlhoFechado /> : <IconeOlhoAberto />}
            </button>
          </div>
          <p className="auth-hint">{SENHA_DICA}</p>
        </div>

        <button type="button" className="auth-forgot" onClick={handleForgotPassword}>
          Esqueci minha senha
        </button>

        {/* ===== Mensagem de erro ===== */}
        {erro && (
          <div className="auth-alert is-error" role="alert">
            <IconeAlerta />
            <span>{erro}</span>
          </div>
        )}

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="auth-footer">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </AuthLayout>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default Login;
