import http from '../../http-common';
const API_URL = 'api/v1/favorito';

const listar = () => http.mainInstance.get(API_URL);
const favoritar = (pesqueiroId) => http.mainInstance.post(API_URL, { pesqueiroId });
const desfavoritar = (pesqueiroId) => http.mainInstance.delete(`${API_URL}/pesqueiro/${pesqueiroId}`);

const FavoritoService = { listar, favoritar, desfavoritar };
export default FavoritoService;
