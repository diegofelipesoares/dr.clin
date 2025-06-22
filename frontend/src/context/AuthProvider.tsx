//Define componente que envolve a aplicação e fornece o estado do usuário logado a componentes filhos
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../types/AuthContextType';
import api from '../lib/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
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

  //LOGOUT para quando tiver a página de dashboard
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   navigate("/login");
  // };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
