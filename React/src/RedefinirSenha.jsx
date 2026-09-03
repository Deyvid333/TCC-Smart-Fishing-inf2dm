import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import UsuarioService from './services/UsuarioService';
import AuthLayout, {
  IconeCadeado, IconeOlhoAberto, IconeOlhoFechado, IconeAlerta, IconeCheck,
} from './Componentes/Auth/AuthLayout';
import { validarSenha, SENHA_DICA, SENHA_MAX } from './Componentes/Auth/validacao';

function RedefinirSenha() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!token) {
      setErro('Link inválido. Solicite a recuperação de senha novamente.');
      return;
    }

    const erroSenha = validarSenha(senha);
    if (erroSenha) {
      setErro(erroSenha);
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      await UsuarioService.redefinirSenha(token, senha);
      setSucesso(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setErro(err.response?.data?.message || 'Não foi possível redefinir a senha. O link pode ter expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      titulo="Escolha uma"
      destaque="nova senha"
      texto="Defina uma nova senha para voltar a acessar sua conta."
    >
      <div className="auth-card-header">
        <h1>Redefinir senha</h1>
        <p className="auth-card-subtitle">Crie uma senha nova para sua conta.</p>
      </div>

      {sucesso ? (
        <div className="auth-alert is-success" role="status">
          <IconeCheck />
          <span>Senha redefinida com sucesso! Redirecionando para o login...</span>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          {!token && (
            <div className="auth-alert is-error" role="alert">
              <IconeAlerta />
              <span>Esse link está incompleto ou inválido. Peça um novo link na tela de recuperação.</span>
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="senha">Nova senha</label>
            <div className="auth-input has-toggle">
              <IconeCadeado />
              <input
                id="senha"
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Crie uma senha"
                autoComplete="new-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                maxLength={SENHA_MAX}
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

          <div className="auth-field">
            <label htmlFor="confirmarSenha">Confirmar nova senha</label>
            <div className="auth-input">
              <IconeCadeado />
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Repita a senha"
                autoComplete="new-password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                maxLength={SENHA_MAX}
                required
              />
            </div>
          </div>

          {erro && (
            <div className="auth-alert is-error" role="alert">
              <IconeAlerta />
              <span>{erro}</span>
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={loading || !token}>
            {loading ? 'Salvando...' : 'Redefinir senha'}
          </button>
        </form>
      )}

      <p className="auth-footer">
        <Link to="/login">Voltar para o login</Link>
      </p>
    </AuthLayout>
  );
}

export default RedefinirSenha;
