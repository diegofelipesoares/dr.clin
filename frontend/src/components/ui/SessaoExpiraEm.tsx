// src/components/ui/SessaoExpiraEm.tsx
//Componente que exibe o contador de expiração da sessão formatado como HH:MM:SS

import { useTokenTimer } from '@/hooks/useTokenTimer';

function formatarTempo(segundos: number) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(
    s,
  ).padStart(2, '0')}`;
}

export function SessaoExpiraEm() {
  const tempo = useTokenTimer();

  if (tempo === null || tempo <= 0 || tempo > 300) return null;

  return (
    <div className='text-xs text-muted-foreground px-6 pb-2 text-left'>
      <span>Sessão expira em: </span>
      <span className='font-mono'>{formatarTempo(tempo)}</span>
    </div>
  );
}
