//Criando o provider (Informação q vai dentro do CONTEXT)
//É o elemento que será compartilhado para toda a aplicação.
//Permite que toda a aplicação veja se o usuário está ou não logado.

import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../types/AuthContextType';
import api from '../lib/api';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
