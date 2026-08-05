// ==========================================================================
// SMART FISHING — Regras de validação de e-mail e senha
// --------------------------------------------------------------------------
// Usado por Login.jsx e Cadastro.jsx para manter a mesma regra nos dois
// lugares: e-mail precisa ser de um provedor autorizado e a senha precisa
// ter pelo menos 8 caracteres, 1 número e 1 caractere especial.
// ==========================================================================

export const DOMINIOS_PERMITIDOS = ['gmail.com', 'outlook.com', 'hotmail.com'];

const dominiosEscapados = DOMINIOS_PERMITIDOS.map((d) => d.replace('.', '\\.')).join('|');
export const EMAIL_REGEX = new RegExp(`^[^\\s@]+@(${dominiosEscapados})$`, 'i');

// Pelo menos 1 dígito, 1 caractere especial e 8 caracteres no total
export const SENHA_REGEX = /^(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;

export const SENHA_DICA = 'Mín. 8 caracteres, com 1 número e 1 caractere especial.';
export const EMAIL_DICA = `Use um e-mail ${DOMINIOS_PERMITIDOS.map((d) => `@${d}`).join(', ')}.`;

export function validarEmail(email) {
  const valor = email.trim();
  if (!valor) return 'Preencha seu e-mail.';
  if (!EMAIL_REGEX.test(valor)) return `E-mail inválido. ${EMAIL_DICA}`;
  return '';
}

export function validarSenha(senha) {
  if (!senha) return 'Preencha sua senha.';
  if (senha.length < 8) return 'A senha precisa ter pelo menos 8 caracteres.';
  if (!/\d/.test(senha)) return 'A senha precisa ter pelo menos 1 número.';
  if (!/[^A-Za-z0-9\s]/.test(senha)) return 'A senha precisa ter pelo menos 1 caractere especial (ex: ! @ # $ %).';
  return '';
}
