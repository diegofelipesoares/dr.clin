// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false,
});

api.interceptors.request.use(config => {
  // Adiciona o token JWT, se existir
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Extrai o nome da clínica da URL, ex: /clinicanova/dashboard
  const pathSegments = window.location.pathname.split('/');
  const subdominio = pathSegments[1]; // "clinicanova"
  /* if (clinica) {
    config.headers['x-clinica-subdominio'] = clinica;
  } */
  if (subdominio) {
    config.headers['x-clinica-subdominio'] = subdominio;
  }

  return config;
});

export default api;
