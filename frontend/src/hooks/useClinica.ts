import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';

export function useClinica() {
  const { clinica } = useParams();
  const [nomeClinica, setNomeClinica] = useState<string | null>(null);

  useEffect(() => {
    if (clinica) {
      api
        .get(`/clinicas/${clinica}`)
        .then(response => setNomeClinica(response.data.nome))
        .catch(() => setNomeClinica(null));
    }
  }, [clinica]);

  return nomeClinica;
}
