import http from '../../http-common';
const API_URL = 'api/v1/pesqueiro';

const listar = (pesqueiroId) => http.mainInstance.get(`${API_URL}/${pesqueiroId}/peixes-customizados`);
const adicionar = (pesqueiroId, nome, foto, descricao) => http.mainInstance.post(`${API_URL}/${pesqueiroId}/peixes-customizados`, { nome, foto, descricao });
const atualizar = (peixeId, nome, foto, descricao) => http.mainInstance.put(`${API_URL}/peixes-customizados/${peixeId}`, { nome, foto, descricao });
const remover = (peixeId) => http.mainInstance.delete(`${API_URL}/peixes-customizados/${peixeId}`);

const PeixeCustomizadoService = { listar, adicionar, atualizar, remover };
export default PeixeCustomizadoService;
