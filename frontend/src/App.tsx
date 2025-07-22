//Componente raiz da amplicação, sendo chamado pleo main.tsx
//Faz o carregamento das rotas
//ponde conter Providers Globais

import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes/AppRoutes';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { AppProviders } from './context'; // ✅ Usa AppProviders centralizado
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AppProviders>
        <ScrollToTop />
        <AppRoutes />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme='light'
        />
    </AppProviders>
  );
}

export default App;
