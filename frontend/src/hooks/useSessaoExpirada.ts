// Esse hook cuida do redirecionamento assim que a sessão termina.
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTokenTimer } from './useTokenTimer';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';

export function useSessaoExpirada() {
  const tempo = useTokenTimer();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { clinica } = useParams(); // 👈 pega o subdomínio lógico da rota

  useEffect(() => {
    if (tempo === 0) {
      toast.warning('Sua sessão expirou. Faça login novamente.');
      logout();
      if (clinica) {
        navigate(`/${clinica}/login`);
      } else {
        navigate('/entrar'); // fallback em caso raro - permite o usuário escolher a clínica para logar
      }
    }
  }, [tempo, logout, navigate, clinica]);
}
