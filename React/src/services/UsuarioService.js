import http from '../../http-common';
const API_URL = 'api/v1/usuario';

const findAll = () => http.mainInstance.get(API_URL);

const findById = (id) => http.mainInstance.get(`${API_URL}/${id}`);

const cadastrar = (data) => {
  const hoje = new Date();
  return http.mainInstance.post(API_URL, {
    ...data,
    dataCadastro: `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`,
  });
};

const login = async (email, senha) => {
  const response = await http.mainInstance.post(`${API_URL}/login`, { email, senha });
  const { token, usuario } = response.data;
  localStorage.setItem('user', JSON.stringify(usuario));
  if (token) localStorage.setItem('token', token);
  return usuario;
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

const update = (id, data) => http.mainInstance.put(`${API_URL}/${id}`, data);

const remove = (id) => http.mainInstance.delete(`${API_URL}/${id}`);

const banir = (id) => http.mainInstance.put(`${API_URL}/${id}/banir`);
const desbanir = (id) => http.mainInstance.put(`${API_URL}/${id}/desbanir`);

const esqueciSenha = (email) => http.mainInstance.post(`${API_URL}/esqueci-senha`, { email });
const redefinirSenha = (token, novaSenha) => http.mainInstance.post(`${API_URL}/redefinir-senha`, { token, novaSenha });

const UsuarioService = {
  findAll, findById, cadastrar, login, logout, getCurrentUser, update, remove, banir, desbanir,
  esqueciSenha, redefinirSenha,
};

export default UsuarioService;