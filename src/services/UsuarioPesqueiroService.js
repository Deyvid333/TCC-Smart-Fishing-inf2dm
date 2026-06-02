import http from '../../http-common';

const API_URL = 'api/v1/usuariopesqueiro';

const findAll = () => http.mainInstance.get(API_URL);

const criar = (data) => http.mainInstance.post(API_URL, data);

const findByUsuarioId = async (usuarioId) => {
  const response = await findAll();
  return response.data.find(
    (item) => item.usuarioId === usuarioId && item.statusUsuarioPesqueiro !== false
  );
};

const UsuarioPesqueiroService = { findAll, criar, findByUsuarioId };
export default UsuarioPesqueiroService;
