export const somenteDigitos = (valor) => valor.replace(/\D/g, '');

export const mascararCnpj = (valor) => {
  const digitos = somenteDigitos(valor).substring(0, 14);
  return digitos
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

export const mascararCep = (valor) => {
  const digitos = somenteDigitos(valor).substring(0, 8);
  return digitos.replace(/^(\d{5})(\d)/, '$1-$2');
};

export const mascararTelefone = (valor) => {
  const digitos = somenteDigitos(valor).substring(0, 11);
  if (digitos.length <= 10) {
    return digitos
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return digitos
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};
