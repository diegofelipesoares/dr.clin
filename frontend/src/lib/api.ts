import axios from 'axios';
import { toast } from 'react-toastify';
import { decodeJwt } from 'jose'; // ✅ substituindo jwt-decode

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(async (config) => {
  const rawToken = localStorage.getItem('token');

  if (rawToken) {
    try {
      const decoded = decodeJwt(rawToken) as { exp: number };
      const isExpired = Date.now() >= decoded.exp * 1000;

      if (isExpired) {
        const refreshToken = localStorage.getItem('refresh_token');
        const pathname = window.location.pathname;
        const clinicaSub = pathname.split('/')[1];

        try {
          const response = await axios.post(
            `http://localhost:8000/${clinicaSub}/auth/refresh-token`,
            null,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const newToken = response.data.access_token;
          localStorage.setItem('token', newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          console.error('Erro ao renovar token:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          toast.error('Sessão expirada. Faça login novamente.');
          window.location.href = '/login';
        }
      } else {
        config.headers.Authorization = `Bearer ${rawToken}`;
      }
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      localStorage.removeItem('token');
    }
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      toast.error('Sessão expirada. Faça login novamente.');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
