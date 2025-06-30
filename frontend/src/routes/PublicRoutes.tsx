//Aplica layout para rotas públicas (que não precisam de login)
import { Outlet } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';

export function PublicRoutes() {
  return (
    //aplica layout para rotas públicas
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
