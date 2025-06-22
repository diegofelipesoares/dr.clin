//Type para Contexto de Autenticação

// Define o tipo do usuário autenticado
export type User = {
  name: string;
  email: string;
};

// Define o tipo do contexto de autenticação usado em toda a aplicação
export type AuthContextType = {
  user: {
    name: string;
    email: string;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{ name: string; email: string } | null>
  >;
};
