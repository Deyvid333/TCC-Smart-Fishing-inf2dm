import http from '../../http-common';
const API_URL = 'api/v1/pesqueiro';

const findAll = () => http.mainInstance.get(API_URL);
const findById = (id) => http.mainInstance.get(`${API_URL}/${id}`);
const criar = (data) => http.mainInstance.post(API_URL, data);
const update = (id, data) => http.mainInstance.put(`${API_URL}/${id}`, data);
const remove = (id) => http.mainInstance.delete(`${API_URL}/${id}`);

const PesqueiroService = { findAll, findById, criar, update, remove };
export default PesqueiroService;
