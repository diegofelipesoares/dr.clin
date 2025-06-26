import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import MedicosPage from '../pages/medicos/MedicosPage';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />

      {/* Rotas públicas (sem autenticação) */}
      <Route element={<PublicRoutes />}>
        <Route path='/login' element={<LoginPage />} />
      </Route>

      {/* Rotas privadas (com layout e autenticação) */}
      <Route element={<PrivateRoutes />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/medicos' element={<MedicosPage />} />
      </Route>

      {/* Rota inválida → redireciona */}
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}
