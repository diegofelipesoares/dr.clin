import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/sidebar/app-sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen bg-background'>
      <SidebarProvider>
        <AppSidebar />
        <main className='flex-1 p-6 overflow-auto'>
          <SidebarTrigger /> {/* abre e fecha sidebar */}
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
