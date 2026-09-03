import http from '../../http-common';
const API_URL = 'api/v1/comentario';

const findByPesqueiro = (pesqueiroId) => http.mainInstance.get(`${API_URL}/pesqueiro/${pesqueiroId}`);
const medias = () => http.mainInstance.get(`${API_URL}/medias`);
const criar = (data) => http.mainInstance.post(API_URL, data);
const remove = (id) => http.mainInstance.delete(`${API_URL}/${id}`);

const ComentarioService = { findByPesqueiro, medias, criar, remove };
export default ComentarioService;
