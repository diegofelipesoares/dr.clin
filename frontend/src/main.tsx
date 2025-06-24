import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
  </StrictMode>,
);
