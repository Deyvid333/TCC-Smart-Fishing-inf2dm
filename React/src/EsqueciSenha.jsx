import { Link } from 'react-router-dom';
import { useState } from 'react';
import UsuarioService from './services/UsuarioService';
import AuthLayout, { IconeEmail, IconeAlerta, IconeCheck } from './Componentes/Auth/AuthLayout';
import { validarEmail, EMAIL_DICA } from './Componentes/Auth/validacao';

function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    const erroEmail = validarEmail(email);
    if (erroEmail) {
      setErro(erroEmail);
      return;
    }

    setLoading(true);
    try {
      await UsuarioService.esqueciSenha(email);
      setEnviado(true);
    } catch (err) {
      console.error('Erro ao solicitar recuperação de senha', err);
      setErro('Não foi possível enviar o e-mail agora. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      titulo="Esqueceu sua senha?"
      destaque="Sem problema"
      texto="Informe o e-mail da sua conta e mandamos um link para você escolher uma senha nova."
    >
      <div className="auth-card-header">
        <h1>Recuperar senha</h1>
        <p className="auth-card-subtitle">Você vai receber um link por e-mail.</p>
      </div>

      {enviado ? (
        <div className="auth-alert is-success" role="status">
          <IconeCheck />
          <span>Se esse e-mail estiver cadastrado, você vai receber as instruções em instantes. Confira também a caixa de spam.</span>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
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

          {erro && (
            <div className="auth-alert is-error" role="alert">
              <IconeAlerta />
              <span>{erro}</span>
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar link de recuperação'}
          </button>
        </form>
      )}

      <p className="auth-footer">
        Lembrou a senha? <Link to="/login">Fazer login</Link>
      </p>
    </AuthLayout>
  );
}

export default EsqueciSenha;
