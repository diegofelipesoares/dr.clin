// src/lib/logout.ts
export function executarLogout(navigate: (path: string) => void) {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');

  const clinica = window.location.pathname.split('/')[1];
  const destino = clinica ? `/${clinica}/login` : '/entrar';

  navigate(destino);
}
