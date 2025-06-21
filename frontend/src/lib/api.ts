//Cliente centralizado Axios para chamadas de API
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', //url do backend
  withCredentials: false, // Se você estiver usando cookies, defina isso como true
});

// Adiciona automaticamente o token JWT em cada requisição
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
