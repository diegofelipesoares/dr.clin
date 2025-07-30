// src/lib/api.ts

/* 
FUNÇÃO
Este arquivo centraliza a configuração do Axios no seu frontend React, para que:

Toda requisição já tenha:
- A baseURL do backend
-O token JWT incluído automaticamente no header Authorization
- Você possa aplicar interceptores (pré e pós-request)
- Evite duplicação de código em cada chamada de API
*/

import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// ✅ Intercepta a requisição e insere o token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Intercepta a resposta para tratar erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      toast.error('Sessão expirada. Faça login novamente.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
