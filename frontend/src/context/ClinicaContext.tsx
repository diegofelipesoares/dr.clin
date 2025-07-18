// src/context/ClinicaContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

type Clinica = {
  nome: string;
  logo: string;
};

type ContextType = {
  clinica: Clinica | null;
  loading: boolean;
};

const ClinicaContext = createContext<ContextType>({
  clinica: null,
  loading: true,
});

export function ClinicaProvider({ children }: { children: React.ReactNode }) {
  const [clinica, setClinica] = useState<Clinica | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const nomeClinica = location.pathname.split('/')[1]; // ex: /clinicanova/login → clinicanova

  useEffect(() => {
    axios
      .get(`http://localhost:8000/clinicas/${nomeClinica}`)
      .then(res => setClinica(res.data))
      .catch(() => setClinica(null))
      .finally(() => setLoading(false));
  }, [nomeClinica]);

  return (
    <ClinicaContext.Provider value={{ clinica, loading }}>
      {children}
    </ClinicaContext.Provider>
  );
}

export const useClinica = () => useContext(ClinicaContext);
