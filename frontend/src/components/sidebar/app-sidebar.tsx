// src/components/sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '../ui/sidebar';

import { useSidebar } from '../ui/sidebar';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Users,
  Gem,
} from 'lucide-react';
import Logo from '../../assets/logo.svg'; // <- ou use "public/logo.svg" com <img src="/logo.svg" />

const menuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Agendamentos', path: '/agendamentos', icon: CalendarDays },
  { title: 'Médicos', path: '/medicos', icon: Stethoscope },
  { title: 'Pacientes', path: '/pacientes', icon: Users },
];

const outrosItems = [{ title: 'Planos', path: '/planos', icon: Gem }];

export function AppSidebar() {
  const { state } = useSidebar(); // ← detecta se o sidebar está aberto ou colapsado

  return (
    <Sidebar
      collapsible='icon'
      className='w-64 bg-sidebar-background text-sidebar-foreground'
    >
      <SidebarHeader>
        <div className='flex items-center gap-2 py-4 overflow-hidden'>
          <div className='shrink-0'>
            <img
              src={Logo}
              alt='Logo Dr.Clin'
              className={`object-contain shrink-0 transition-all duration-300 ${
                state === 'expanded' ? 'w-8 h-8' : 'w-6 h-6'
              }`}
              style={{ minWidth: 32 }}
            />
          </div>

          {state === 'expanded' && (
            <span className='text-xl font-semibold whitespace-nowrap'>
              Dr.Clin
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ title, path, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <Link to={path} className='flex items-center gap-2'>
                      <Icon className='w-5 h-5' />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Outros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {outrosItems.map(({ title, path, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <Link to={path} className='flex items-center gap-2'>
                      <Icon className='w-5 h-5' />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className='px-4 py-4 text-sm text-muted-foreground mt-auto'>
          <p>Clínica Araújo Falcão</p>
          <p>araujofalcao@gmail.com</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
