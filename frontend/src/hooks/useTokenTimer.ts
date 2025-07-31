// src/hooks/useTokenTimer.ts
//Hook que calcula e monitora expiração do token JWT
// Aviso 5 minutos antes da expiração
// Retorna o tempo restante em segundos
// Se o token expirar, retorna 0

import { useEffect, useState } from 'react';
import { decodeJwt } from 'jose';
import { toast } from 'react-toastify';

export function useTokenTimer() {
  const [tempoRestante, setTempoRestante] = useState<number | null>(null);
  const [avisado, setAvisado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('refresh_token'); // 'token' para ver o tempo de expiração a cada hora.
    if (!token) return;

    const { exp } = decodeJwt(token);
    const expSec = exp as number;
    const agoraSec = Math.floor(Date.now() / 1000);
    const segundosRestantes = expSec - agoraSec;

    setTempoRestante(segundosRestantes);

    const interval = setInterval(() => {
      setTempoRestante(prev => {
        if (prev === null) return null;
        const novoValor = prev - 1;

        // Aviso 5 minutos antes
        if (novoValor === 300 && !avisado) {
          toast.info('Sua sessão irá expirar em 5 minutos.');
          setAvisado(true);
        }

        if (novoValor <= 0) {
          clearInterval(interval);
          return 0;
        }

        return novoValor;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return tempoRestante;
}
