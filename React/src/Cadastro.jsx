// ========== IMPORTAÇÕES ==========
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UsuarioService from './services/UsuarioService';
import AuthLayout, {
  IconeUsuario,
  IconeLoja,
  IconeEmail,
  IconeCadeado,
  IconeOlhoAberto,
  IconeOlhoFechado,
  IconeAlerta,
  IconeCheck,
} from './Componentes/Auth/AuthLayout';

// ========== COMPONENTE DE CADASTRO ==========
function Cadastro() {
  // ========== HOOKS E ESTADOS ==========
  const navigate = useNavigate();

  // Estado para armazenar os dados básicos do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: 'usuario',
  });
  const [loading, setLoading] = useState(false);
  // Mensagens exibidas dentro do formulário (no lugar do alert)
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  // Controla se as senhas aparecem como texto ou como pontinhos
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // ========== FUNÇÕES DE MANIPULAÇÃO ==========

  const validarFormulario = () => {
    if (!formData.nome.trim()) return 'Preencha seu nome completo.';
    if (!formData.email.trim()) return 'Preencha seu e-mail.';
    if (!formData.senha.trim()) return 'Preencha sua senha.';
    if (formData.senha.length < 6) return 'A senha precisa ter pelo menos 6 caracteres.';
    if (formData.senha !== formData.confirmarSenha) return 'As senhas não coincidem.';
    return '';
  };

  // Função para processar o cadastro do usuário
  const handleCadastro = async () => {
    setErro('');
    setSucesso('');

    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setLoading(true);
    try {
      await UsuarioService.cadastrar({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        nivelAcesso: formData.tipoUsuario === 'dono' ? 'admin' : 'usuario',
        statusUsuario: true,
      });

      await UsuarioService.login(formData.email, formData.senha);

      if (formData.tipoUsuario === 'dono') {
        // após cadastro, levar o dono para página separada de cadastro do pesqueiro
        navigate('/cadastro-pesqueiro');
        return;
      }

      setSucesso('Cadastro realizado com sucesso! Redirecionando...');
      navigate('/inicial');
    } catch (err) {
      console.error(err);
      setErro('Erro ao cadastrar. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar os dados do formulário
  const handleInputChange = (e) => {
    setFormData({
      ...formData, // Mantém os valores existentes
      [e.target.name]: e.target.value, // Atualiza apenas o campo alterado
    });
  };

  // Permite cadastrar apertando Enter em qualquer campo
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCadastro();
  };

  // ========== RENDERIZAÇÃO DO COMPONENTE ==========
  return (
    <AuthLayout
      titulo="Sua próxima pescaria"
      destaque="começa aqui"
      texto="Crie sua conta gratuita e descubra os melhores pesqueiros perto de você — ou cadastre o seu e receba mais pescadores."
    >
      <div className="auth-card-header">
        <h1>Criar minha conta</h1>
        <p className="auth-card-subtitle">Leva menos de um minuto. É gratuito.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* ===== Tipo de cadastro ===== */}
        <div>
          <span className="auth-segment-label">Tipo de cadastro</span>
          <div className="auth-segment">
            <label className="auth-segment-option">
              <input
                type="radio"
                name="tipoUsuario"
                value="usuario"
                checked={formData.tipoUsuario === 'usuario'}
                onChange={handleInputChange}
              />
              <span className="auth-segment-face">
                <IconeUsuario />
                <span className="auth-segment-title">Pescador</span>
                <span className="auth-segment-desc">Quero encontrar pesqueiros</span>
              </span>
            </label>

            <label className="auth-segment-option">
              <input
                type="radio"
                name="tipoUsuario"
                value="dono"
                checked={formData.tipoUsuario === 'dono'}
                onChange={handleInputChange}
              />
              <span className="auth-segment-face">
                <IconeLoja />
                <span className="auth-segment-title">Proprietário</span>
                <span className="auth-segment-desc">Quero cadastrar meu pesqueiro</span>
              </span>
            </label>
          </div>
        </div>

        {/* ===== Nome ===== */}
        <div className="auth-field">
          <label htmlFor="nome">Nome completo</label>
          <div className="auth-input">
            <IconeUsuario />
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Como podemos te chamar?"
              autoComplete="name"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* ===== E-mail ===== */}
        <div className="auth-field">
          <label htmlFor="email">E-mail</label>
          <div className="auth-input">
            <IconeEmail />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* ===== Senhas (lado a lado no desktop) ===== */}
        <div className="auth-row">
          <div className="auth-field">
            <label htmlFor="senha">Senha</label>
            <div className="auth-input has-toggle">
              <IconeCadeado />
              <input
                id="senha"
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
                value={formData.senha}
                onChange={handleInputChange}
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
          </div>

          <div className="auth-field">
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <div className="auth-input">
              <IconeCadeado />
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Repita a senha"
                autoComplete="new-password"
                value={formData.confirmarSenha}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Se for proprietário, os dados do pesqueiro são preenchidos
            na página seguinte, logo após o cadastro */}

        {/* ===== Mensagens ===== */}
        {erro && (
          <div className="auth-alert is-error" role="alert">
            <IconeAlerta />
            <span>{erro}</span>
          </div>
        )}
        {sucesso && (
          <div className="auth-alert is-success" role="status">
            <IconeCheck />
            <span>{sucesso}</span>
          </div>
        )}

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Criar conta'}
        </button>

        {formData.tipoUsuario === 'dono' && (
          <p className="auth-terms">
            Na próxima etapa você cadastra as informações do seu pesqueiro.
          </p>
        )}
      </form>

      <p className="auth-footer">
        Já tem uma conta? <Link to="/login">Fazer login</Link>
      </p>
    </AuthLayout>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default Cadastro;
