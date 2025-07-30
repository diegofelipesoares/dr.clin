import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User, AuthContextType } from '../types/AuthContextType';
import api from '../lib/api';
import { decodeJwt } from 'jose'; // ✅ substituindo jwt-decode

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = decodeJwt(token) as { exp: number };
        const isExpired = Date.now() >= decoded.exp * 1000;

        if (isExpired) {
          logout();
        } else {
          api
            .get('/auth/me')
            .then(res => setUser(res.data))
            .catch(() => logout());
        }
      } catch (err) {
        console.error('Erro ao decodificar JWT:', err);
        logout();
      }
    }
  }, []);

  const contextValue: AuthContextType = {
    user,
    setUser,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
