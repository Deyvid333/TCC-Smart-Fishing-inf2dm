import http from '../../http-common';
const API_URL = 'api/v1/historico';

const listar = () => http.mainInstance.get(API_URL);
const registrar = (pesqueiroId) => http.mainInstance.post(API_URL, { pesqueiroId });

const HistoricoService = { listar, registrar };
export default HistoricoService;
