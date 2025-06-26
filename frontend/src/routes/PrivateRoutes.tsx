import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MainLayout } from '../layouts/MainLayout';

export function PrivateRoutes() {
  const { user } = useAuth();

  if (!user) return <Navigate to='/login' />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
