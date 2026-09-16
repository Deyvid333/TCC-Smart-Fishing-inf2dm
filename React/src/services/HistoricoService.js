import http from '../../http-common';
const API_URL = 'api/v1/historico';

const listar = () => http.mainInstance.get(API_URL);
const registrar = (pesqueiroId) => http.mainInstance.post(API_URL, { pesqueiroId });
const limparTudo = () => http.mainInstance.delete(API_URL);
const remover = (pesqueiroId) => http.mainInstance.delete(`${API_URL}/${pesqueiroId}`);

const HistoricoService = { listar, registrar, limparTudo, remover };
export default HistoricoService;
