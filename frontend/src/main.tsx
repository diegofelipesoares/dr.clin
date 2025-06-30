//É o ponto de entrada da aplicação React
//Ele renderiza o App dentro do div #root.

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import { AppProviders } from './context'; // Importa o Provider centralizado

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
  </StrictMode>,
);
