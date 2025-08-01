// src/components/app-sidebar.tsx

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
import { Link, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Users,
  Gem,
  ChevronDown,
  UserCog2,
} from 'lucide-react';

//Importação do logo da aplicação
import Logo from '../../assets/logo.svg';
import { useClinica } from '@/hooks/useClinica';

//contador de expiração da sessão
import { SessaoExpiraEm } from '@/components/ui/SessaoExpiraEm';

export function AppSidebar() {
  const { state } = useSidebar(); // ← detecta se o sidebar está aberto ou colapsado
  const nomeClinica = useClinica();
  const { clinica } = useParams();

  // Aqui você define os itens do menu e os path para rotas
  // Menu principal: Dashboard e Agendamentos
  const menuItems = [
    {
      title: 'Dashboard',
      path: `/${clinica}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      title: 'Agendamentos',
      path: `/${clinica}/agendamentos`,
      icon: CalendarDays,
    },
  ];

  // Menu de usuários: Pacientes, Médicos, Gestores
  const userItems = [
    {
      title: 'Pacientes',
      icon: Users,
      submenu: [
        { title: 'Listar', path: `/${clinica}/pacientes` },
        { title: 'Cadastrar', path: `/${clinica}/pacientes/cadastrar` },
      ],
    },
    {
      title: 'Médicos',
      icon: Stethoscope,
      submenu: [
        { title: 'Listar', path: `/${clinica}/medicos` },
        { title: 'Cadastrar', path: `/${clinica}/medicos/cadastrar` },
      ],
    },
    {
      title: 'Gestores',
      icon: UserCog2,
      submenu: [
        { title: 'Listar', path: `/${clinica}/gestores` },
        { title: 'Cadastrar', path: `/${clinica}/gestores/cadastrar` },
      ],
    },
  ];
  const outrosItems = [
    { title: 'Planos', path: `/${clinica}/planos`, icon: Gem },
  ];

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
              {nomeClinica || 'Carregando...'}
            </span>
          )}
        </div>
      </SidebarHeader>

      {/* Separador opcional entre o cabeçalho e o conteúdo do sidebar */}
      <SidebarSeparator />

      {/* Conteúdo do Sidebar */}
      {/* Aqui você pode colocar os grupos de menu e outros itens que deseja exibir */}
      <SidebarContent>
        {/* Grupo - Menu Principal */}
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

        {/* Grupo - Usuários */}
        <SidebarGroup>
          <SidebarGroupLabel>Usuários</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map(({ title, icon: Icon, submenu }) => (
                <Collapsible key={title} className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className='flex items-center justify-between w-full focus:outline-none'>
                        <div className='flex items-center gap-2'>
                          <Icon className='w-4 h-4' />
                          <span className='font-normal'>{title}</span>
                        </div>
                        <ChevronDown className='w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='overflow-hidden transition-all data-[state=closed]:max-h-0 data-[state=open]:max-h-40'>
                      <SidebarMenu className='gap-0'>
                        {submenu?.map(({ title: subTitle, path: subPath }) => (
                          <SidebarMenuItem key={subTitle} className='pl-6 m-0'>
                            <SidebarMenuButton asChild>
                              <Link to={subPath}>{subTitle}</Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grupo - Outros */}
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

      <SessaoExpiraEm />
      <SidebarSeparator />

      <SidebarFooter>
        {state === 'expanded' && (
          <>
            <div className='px-4 py-4 flex items-center gap-2 text-sm text-muted-foreground mt-auto'>
              <img
                src={Logo}
                alt='Logo Dr.Clin'
                className='w-6 h-6 object-contain'
              />
              <div className='flex flex-col leading-tight'>
                <span className='font-semibold'>Dr.Clin</span>
                <span className='text-xs text-muted-foreground'>
                  www.drclin.com.br
                </span>
              </div>
            </div>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
