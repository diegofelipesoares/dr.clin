import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import AgendamentosPage from '../pages/agendamentos/AgendamentosPage';
import MedicosPage from '../pages/medicos/MedicosPage';
import CadastrarMedico from '../pages/medicos/CadastrarMedico';
import EditarMedico from '../pages/medicos/EditarMedico';
import PacientesPage from '@/pages/pacientes/PacientesPage';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import ValidarClinica from '../pages/clinicas/validarClinica';
import HomePage from '@/pages/portal/Home';
import CriarClinicaPage from '@/pages/portal/CriarClinica';
import AssinaturaPage from '@/pages/portal/Assinatura';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota principal → redireciona para portal */}
      <Route path='/' element={<HomePage />} />
      <Route path='/cadastro' element={<CriarClinicaPage />} />
      <Route path="/planos" element={<AssinaturaPage />} />

      {/* Valida qualquer nome de clínica digitado */}
      <Route path='/:clinica' element={<ValidarClinica />} />

      {/* Rotas da clínica validada */}
      <Route path='/:clinica'>
        {/* Rotas públicas */}
        <Route element={<PublicRoutes />}>
          <Route path='login' element={<LoginPage />} />
        </Route>

        {/* Rotas privadas (com autenticação) */}
        <Route element={<PrivateRoutes />}>
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='agendamentos' element={<AgendamentosPage />} />
          <Route path='pacientes' element={<PacientesPage />} />
          <Route path='medicos' element={<MedicosPage />} />
          <Route path='medicos/cadastrar' element={<CadastrarMedico />} />
          <Route path='medicos/:id' element={<EditarMedico />} />
        </Route>
      </Route>

      {/* Rota 404 inválida → portal */}
      <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  );
}
