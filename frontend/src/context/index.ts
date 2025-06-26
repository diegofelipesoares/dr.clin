import { AuthProvider } from './AuthProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return AuthProvider({ children });
};
