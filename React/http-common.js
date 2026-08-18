import axios from "axios";

const getApiUrl = () => {
  const { hostname } = window.location;
  if (hostname.endsWith(".app.github.dev")) {
    return `https://${hostname.replace(/-\d+\.app\.github\.dev$/, "-8080.app.github.dev")}/`;
  }
  return "http://localhost:8080/";
};

const API_URL = getApiUrl();

const mainInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const multipartInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "multipart/form-data"
  }
});

const apiCep = axios.create( {
  baseURL: `https://viacep.com.br/ws/`,
  headers: {
    "Content-type": "application/json"
  }
});

const anexarToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

mainInstance.interceptors.request.use(anexarToken);
multipartInstance.interceptors.request.use(anexarToken);


const httpCommom = {
  mainInstance,
  multipartInstance,
  apiCep,
};

export default httpCommom;