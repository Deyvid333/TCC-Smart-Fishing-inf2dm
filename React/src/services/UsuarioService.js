import http from '../../http-common';
const API_URL = 'api/v1/usuario';

const findAll = () => http.mainInstance.get(API_URL);

const findById = (id) => http.mainInstance.get(`${API_URL}/${id}`);

const cadastrar = (data) => http.mainInstance.post(API_URL, {
  ...data,
  dataCadastro: new Date().toISOString().split('T')[0],
});

const login = async (email, senha) => {
  const response = await http.mainInstance.get(API_URL);
  const usuarios = response.data;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) throw new Error('Email ou senha inválidos');
  localStorage.setItem('user', JSON.stringify(usuario));
  return usuario;
};

const logout = () => localStorage.removeItem('user');

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

const update = (id, data) => http.mainInstance.put(`${API_URL}/${id}`, data);

const remove = (id) => http.mainInstance.delete(`${API_URL}/${id}`);

const UsuarioService = { findAll, findById, cadastrar, login, logout, getCurrentUser, update, remove };

export default UsuarioService;
