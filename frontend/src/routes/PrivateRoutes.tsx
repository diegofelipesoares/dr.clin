//Gerencia acesso e aplica layout para rotas privadas.
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MainLayout } from '../layouts/MainLayout';

export function PrivateRoutes() {
  //Recebe true e false para saber se o usuário está logado
  const { user } = useAuth();

  //Se o usuário não estiver logado, retorna a página de login.
  if (!user) return <Navigate to='/login' />;

  //Aplica Layout e indica conteúdo da rota filha
  return (
    <MainLayout>
      <Outlet /> 
    </MainLayout>
  );
}
