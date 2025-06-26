import { Outlet } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';

export function PublicRoutes() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
