// ==========================================================================
// SMART FISHING — Layout compartilhado das páginas de Login e Cadastro
// --------------------------------------------------------------------------
// O painel azul da esquerda (marca) é igual nas duas páginas, então fica aqui
// para não repetir código. Os ícones também são exportados daqui.
// ==========================================================================
import './Auth.css';

// ---------- Ícones (SVG inline, sem depender de biblioteca externa) --------

export const IconePeixe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12c3-4.5 6.5-6.5 10-6.5S18.5 8 21 12c-2.5 4-5.5 6.5-9 6.5S5 16.5 2 12z" />
    <path d="M21 12l-3.5-3v6l3.5-3z" />
    <circle cx="8.5" cy="11" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconeUsuario = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const IconeLoja = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l1.5-5h15L21 9" />
    <path d="M4 9v11h16V9" />
    <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

export const IconeEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const IconeCadeado = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

export const IconeOlhoAberto = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconeOlhoFechado = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3l18 18" />
    <path d="M10.6 6.1A9.9 9.9 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9" />
    <path d="M6.2 8.2A17 17 0 0 0 2 12s3.5 6 10 6a9.7 9.7 0 0 0 4-.8" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
);

export const IconeCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 13 4 4L19 7" />
  </svg>
);

export const IconeAlerta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v5" />
    <path d="M12 16.5h.01" />
  </svg>
);

// ---------- Layout ---------------------------------------------------------

/**
 * Estrutura de duas colunas: painel azul da marca + área do formulário.
 *
 * @param {string}  titulo      Título grande do painel azul
 * @param {string}  destaque    Parte do título pintada de verde-água
 * @param {string}  texto       Parágrafo de apoio do painel azul
 * @param {node}    children    Conteúdo do card do formulário
 */
function AuthLayout({ titulo, destaque, texto, children }) {
  return (
    <div className="auth-page">
      {/* ===== Painel da marca ===== */}
      <aside className="auth-brand">
        <div className="auth-logo">
          <div className="auth-logo-mark">
            <IconePeixe />
          </div>
          <div className="auth-logo-text">
            Smart Fishing
            <span>Pesque e solte</span>
          </div>
        </div>

        <h2 className="auth-brand-title">
          {titulo} <em>{destaque}</em>
        </h2>
        <p className="auth-brand-text">{texto}</p>

        <ul className="auth-highlights">
          <li><IconeCheck /> Pesqueiros da sua região em um só lugar</li>
          <li><IconeCheck /> Espécies, preços e regras de cada pesqueiro</li>
          <li><IconeCheck /> Avaliações e comentários de outros pescadores</li>
        </ul>

        {/* Ondas decorativas no rodapé do painel */}
        <svg className="auth-waves" viewBox="0 0 1440 120" preserveAspectRatio="none"
             aria-hidden="true">
          <path fill="rgba(123,205,186,0.35)"
                d="M0 60c180-40 300 40 480 30s300-70 480-50 300 60 480 40v40H0z" />
          <path fill="rgba(255,255,255,0.12)"
                d="M0 85c200-30 340 25 520 15s320-55 480-35 260 45 440 30v25H0z" />
        </svg>
      </aside>

      {/* ===== Área do formulário ===== */}
      <main className="auth-panel">
        <div className="auth-card">{children}</div>
      </main>
    </div>
  );
}

export default AuthLayout;
