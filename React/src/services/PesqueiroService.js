import http from '../../http-common';
const API_URL = 'api/v1/pesqueiro';

const findAll = () => http.mainInstance.get(API_URL);
const findById = (id) => http.mainInstance.get(`${API_URL}/${id}`);
const findPendentes = () => http.mainInstance.get(`${API_URL}/pendentes`);
const meus = () => http.mainInstance.get(`${API_URL}/meus`);
const criar = (data) => http.mainInstance.post(API_URL, data);
const update = (id, data) => http.mainInstance.put(`${API_URL}/${id}`, data);
const aprovar = (id) => http.mainInstance.put(`${API_URL}/${id}/aprovar`);
const negar = (id) => http.mainInstance.put(`${API_URL}/${id}/negar`);
const remove = (id) => http.mainInstance.delete(`${API_URL}/${id}`);

const PesqueiroService = { findAll, findById, findPendentes, meus, criar, update, aprovar, negar, remove };
export default PesqueiroService;
