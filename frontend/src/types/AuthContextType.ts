//Type para Contexto de Autenticação

// Type para o usuário autenticado, já incluindo perfil e id (mais campos que seu backend devolve)
export type User = {
  id: number;
  name: string;
  email: string;
  perfil: 'paciente' | 'medico' | 'ajudante' | 'secretario' | 'admin';
  clinica_id?: number | null;
};

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  isAuthenticated: boolean;
};
