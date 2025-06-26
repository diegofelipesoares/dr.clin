import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppProviders } from './context';
import { AppRoutes } from './routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme='light'
        />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
