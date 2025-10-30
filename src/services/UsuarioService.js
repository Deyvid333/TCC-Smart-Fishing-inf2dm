import http from '../common/http-common';
const API_URL = "api/v1/usuario/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'listar');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `buscar/${id}`);
};

const signin = async (email, senha) => {
    const response = await http.mainInstance
        .post(API_URL + "logar", {
            email,
            senha,
        });
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("Usuario");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("Usuario"));
};

const update = (id, data) => {
    return http.multipartInstance.put(API_URL + `atualizar/${id}`, data);
};

const inativar = (id) => {
    return http.multipartInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
    return http.multipartInstance.put(API_URL + `reativar/${id}`);
};

const cadastrar = () => {
    return http.multipartInstance.post(API_URL + `/cadastrar`);
};

const alterarSenha = (id, data) => {
    const formData = new FormData();
    formData.append('senha', data.senha);
 
    return http.mainInstance.put(API_URL + `alterarSenha/${id}`, formData);
};

const findByNome = nome => {
    return http.mainInstance.get(API_URL + `findByNome?nome=${nome}`);
};


const UsuarioService = {
    findAll,
    findById,
    signin,
    logout,
    getCurrentUser,
    update,
    inativar,
    reativar,
    alterarSenha,
    findByNome,
    cadastrar,
}

export default UsuarioService;