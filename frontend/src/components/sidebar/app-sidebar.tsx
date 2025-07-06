// src/components/sidebar.tsx

// IMPORTAÇÕES
//Componentes Personalidados do Sidebar do Shadcn/ui
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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

//Hook de Contexto do Shadcn que fornece estado atual do sidebar (Expanded ou Collapsed)
import { useSidebar } from '../ui/sidebar';

//Importação dos ícones da biblioteca Lucide-react
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Users,
  Gem,
  ChevronDown,
} from 'lucide-react';

//Importação do logo da aplicação
import Logo from '../../assets/logo.svg';

//DEFINIÇÃO DOS ITENS DO MENU (Array de Objetos JS/TS)
// Aqui você define os itens do menu principal e outros itens que deseja exibir no sidebar
const menuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Agendamentos', path: '/agendamentos', icon: CalendarDays },
  { title: 'Pacientes', path: '/pacientes', icon: Users },
];

const outrosItems = [{ title: 'Planos', path: '/planos', icon: Gem }];

export function AppSidebar() {
  const { state } = useSidebar(); // ← detecta se o sidebar está aberto ou colapsado

  return (
    //Container Principal do Sidebar
    // Aqui você pode definir a largura, cor de fundo e outras propriedades do sidebar
    <Sidebar
      collapsible='icon'
      className='w-64 bg-sidebar-background text-sidebar-foreground'
    >
      {/* Cabeçalho do Sidebar */}
      {/* Aqui você pode colocar o logo, título da aplicação e outras informações */}
      <SidebarHeader>
        <div className='flex items-center gap-2 py-4 overflow-hidden'>
          <div className='shrink-0'>
            {/* O logo só será exibido quando o sidebar estiver expandido */}
            <img
              src={Logo}
              alt='Logo Dr.Clin'
              className={`object-contain shrink-0 transition-all duration-300 ${
                state === 'expanded' ? 'w-8 h-8' : 'w-6 h-6'
              }`}
              style={{ minWidth: 32 }}
            />
          </div>

          {/* Título da aplicação */}
          {/* O título só será exibido quando o sidebar estiver expandido */}
          {state === 'expanded' && (
            <span className='text-xl font-semibold whitespace-nowrap'>
              Dr.Clin
            </span>
          )}
        </div>
      </SidebarHeader>

      {/* Separador opcional entre o cabeçalho e o conteúdo do sidebar */}
      <SidebarSeparator />

      {/* Conteúdo do Sidebar */}
      {/* Aqui você pode colocar os grupos de menu e outros itens que deseja exibir */}
      <SidebarContent>
        <SidebarGroup>
          {/* Grupo - Menu principal */}
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Itens do menu principal via map */}
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

              {/* Meu Médicos com Collapsible */}
              <Collapsible className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className='flex items-center justify-between w-full focus:outline-none focus:ring-0 ring-0 hover:ring-0 group-hover:ring-0 border-none'>
                      <div className='flex items-center gap-2'>
                        <Stethoscope className='w-4 h-4' />
                        <span className='font-normal'>Médicos</span>
                      </div>
                      {/* Seta rotaciona ao expandir */}
                      <ChevronDown className='w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* Transição de abertura dos submenus */}
                  <CollapsibleContent className='overflow-hidden transition-all duration-300 data-[state=closed]:max-h-0 data-[state=open]:max-h-40'>
                    <SidebarMenu className='gap-0'>
                      <SidebarMenuItem className='pl-6 m-0'>
                        <SidebarMenuButton asChild>
                          <Link to='/medicos'>Listar</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem className='pl-6 m-0'>
                        <SidebarMenuButton asChild>
                          <Link to='/medicos/cadastrar'>Cadastrar</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {/* Grupo - Outros */}
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
        {state === 'expanded' && (
          <div className='px-4 py-4 text-sm text-muted-foreground mt-auto whitespace-nowrap'>
            <p>Clínica Araújo Falcão</p>
            <p>araujofalcao@gmail.com</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
