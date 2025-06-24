import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { MainLayout } from "./components/layout/MainLayout";
import PrivateRoute from './routes/PrivateRoute';

import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import MedicosPage from './pages/medicos/MedicosPage';

// 👉 Importações necessárias do toast
// O Toast fica no App.tsx porque só deve ser carregado uma única vez
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <BrowserRouter>
      {/* Utilizando as rotas criadas */}
      <Routes>
        {/* Redirecionamento da raiz para o login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Página de login (sem Sidebar/Layout) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas privadas protegidas por autenticação */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/medicos"
          element={
            <PrivateRoute>
              <MainLayout>
                <MedicosPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Qualquer outra rota redireciona para o dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* Container de Toasts que deve estar presente uma vez no app */}
      <ToastContainer
        position='top-center' // posição da notificação
        autoClose={5000} // tempo até desaparecer (em ms)
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme='light' // ou "dark" ou "light", se usar tema escuro
      />
    </BrowserRouter>
    
  );
}

export default App;
