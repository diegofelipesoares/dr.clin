//Centraliza as rotas
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import MedicosPage from '../pages/medicos/MedicosPage';
import CadastrarMedico from '../pages/medicos/CadastrarMedico';
import EditarMedico from '../pages/medicos/EditarMedico';
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
        <Route path='/medicos/cadastrar' element={<CadastrarMedico />} />
        <Route path='/medicos/:id' element={<EditarMedico />} />
      </Route>

      {/* Rota inválida → redireciona */}
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}
