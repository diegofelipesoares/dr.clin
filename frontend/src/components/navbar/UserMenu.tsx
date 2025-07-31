// src/components/navbar/UserMenu.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src={user?.fotoUrl ?? ''} alt={user?.name} />
          <AvatarFallback>
            <User className='h-5 w-5 text-muted-foreground' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 mt-2' align='end'>
        <div className='px-3 py-2 text-sm'>
          <p className='font-medium'>{user?.name}</p>
          <p className='text-muted-foreground'>{user?.email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => console.log('Ir para perfil')}>
          <User className='mr-2 h-4 w-4' />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Ir para config')}>
          <Settings className='mr-2 h-4 w-4' />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Ir para tema')}>
          🎨 Tema
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Trocar conta')}>
          🔄 Trocar de conta
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>
          <LogOut className='mr-2 h-4 w-4' />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
