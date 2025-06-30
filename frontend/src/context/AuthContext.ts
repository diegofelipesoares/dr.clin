//CRIANDO O CONTEXTO
//Cria o objeto do contexto (AuthContext) que será utilizado em toda a aplicação
import { createContext } from 'react';
import type { AuthContextType } from '../types/AuthContextType';

// Cria o contexto com tipo inicial `null` (antes de carregar o usuário)
export const AuthContext = createContext<AuthContextType | null>(null);
