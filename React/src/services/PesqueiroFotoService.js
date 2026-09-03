import http from '../../http-common';
const API_URL = 'api/v1/pesqueiro';

const listar = (pesqueiroId) => http.mainInstance.get(`${API_URL}/${pesqueiroId}/fotos`);
const adicionar = (pesqueiroId, foto) => http.mainInstance.post(`${API_URL}/${pesqueiroId}/fotos`, { foto });
const remover = (fotoId) => http.mainInstance.delete(`${API_URL}/fotos/${fotoId}`);

const PesqueiroFotoService = { listar, adicionar, remover };
export default PesqueiroFotoService;
