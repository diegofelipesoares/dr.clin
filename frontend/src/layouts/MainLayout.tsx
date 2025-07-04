import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/sidebar/app-sidebar';
import { AppBreadcrumb } from '../components/BreadCrumb/app-breadcrumb'; // Importe o Breadcrumb
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className='flex min-h-screen'>
      <SidebarProvider>
        <AppSidebar />

        {/* Container principal para o cabeçalho e o conteúdo */}
        <div className='flex flex-col flex-1 overflow-hidden'>
          {/* Cabeçalho da aplicação: aqui o SidebarTrigger e o Breadcrumb ficarão lado a lado */}
          <header className='h-10 pt-4 flex items-center px-4 bg-background z-10'>
            {/* SidebarTrigger: o botão para abrir/fechar o sidebar */}
            <SidebarTrigger className='mr-4' />

            {/* AppBreadcrumb: ao lado do SidebarTrigger */}
            <AppBreadcrumb />

            {/* Você pode adicionar outros elementos aqui, como um título ou um menu de usuário */}
          </header>

          {/* Área principal de conteúdo das rotas */}
          <main className='flex-1 p-3 overflow-y-auto bg-background'>
            {/* <Outlet /> ou {children} - use um ou outro, dependendo da sua necessidade */}
            <Outlet /> {/* Recomendo usar Outlet para rotas aninhadas */}
            {/* {children} */}{' '}
            {/* Se você precisar passar componentes diretamente, mantenha este */}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
