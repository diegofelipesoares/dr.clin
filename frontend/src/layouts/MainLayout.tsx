import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/sidebar/app-sidebar';
import { AppBreadcrumb } from '../components/BreadCrumb/app-breadcrumb'; // Importe o Breadcrumb
import { Outlet } from 'react-router-dom';
import { useSessaoExpirada } from '@/hooks/useSessaoExpirada';
import { UserMenu } from '@/components/navbar/UserMenu';

export function MainLayout() {
  useSessaoExpirada(); // ⏳ Monitora e redireciona após expiração do refresh_token
  return (
    <div className='flex min-h-screen'>
      <SidebarProvider>
        <AppSidebar />

        {/* Container principal para o cabeçalho e o conteúdo */}
        <div className='flex flex-col flex-1 overflow-hidden'>
          {/* Cabeçalho da aplicação: aqui o SidebarTrigger e o Breadcrumb ficarão lado a lado */}
          <header className='h-16 px-4 flex items-center justify-between bg-background'>
            <div className='flex items-center gap-4'>
              {/* SidebarTrigger: o botão para abrir/fechar o sidebar */}
              <SidebarTrigger />
              {/* AppBreadcrumb: ao lado do SidebarTrigger */}
              <AppBreadcrumb />
            </div>
            {/* Menu de perfil do usuário logado */}
            <UserMenu />
          </header>

          {/* Área principal de conteúdo das rotas */}
          <main className='flex-1 p-3 overflow-y-auto bg-background'>
            {/* <Outlet /> ou {children} - use um ou outro, dependendo da sua necessidade */}
            <Outlet /> {/* Recomendo usar Outlet para rotas aninhadas */}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
