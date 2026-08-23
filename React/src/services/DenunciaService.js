import http from '../../http-common';
const API_URL = 'api/v1/denuncia';

const listar = () => http.mainInstance.get(API_URL);
const denunciar = (comentarioId) => http.mainInstance.post(API_URL, { comentarioId });
const dispensar = (comentarioId) => http.mainInstance.delete(`${API_URL}/comentario/${comentarioId}`);

const DenunciaService = { listar, denunciar, dispensar };
export default DenunciaService;
