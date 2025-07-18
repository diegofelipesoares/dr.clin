//Gerencia acesso e aplica layout para rotas privadas.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MainLayout } from '../layouts/MainLayout';
import { useClinica } from '../context/ClinicaContext';

export function PrivateRoutes() {
  //Recebe true e false para saber se o usuário está logado
  const { user } = useAuth();
  const { clinica, loading } = useClinica();

  if (loading) return <div>Carregando clínica...</div>;
  if (!clinica) return <div>Clínica não encontrada.</div>;
  //Se o usuário não estiver logado, retorna a página de login.
  if (!user) return <Navigate to='/login' />;

  //Aplica Layout e indica conteúdo da rota filha
  return <MainLayout />;
}
