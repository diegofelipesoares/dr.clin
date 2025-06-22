import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login/LoginPage';

// 👉 Importações necessárias do toast
// O Toast fica no App.tsx porque só deve ser carregado uma única vez
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './routes/PrivateRoute';

// Temporariamente, enquanto não tem Dashboard, use um componente simples
const DashboardPlaceholder = () => <h2>Dashboard ainda não implementado</h2>;

function App() {
  return (
    <>
      {/* Utilizando as rotas criadas */}
      <Routes>
        {/* Path='/' rediciona para o path'/login' */}
        <Route path='/' element={<Navigate to='/login' />} />
        {/* Path='/login' rota pública, acessa a tela de login */}
        <Route path='/login' element={<LoginPage />} />
        {/* Path='/dashboard' rota privada, acessa somente usuário logado */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <DashboardPlaceholder />
            </PrivateRoute>
          }
        />
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
    </>
  );
}

export default App;
