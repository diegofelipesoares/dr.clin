// src/components/app-breadcrumb.tsx
import React from 'react';

import { useLocation, Link } from 'react-router-dom';
//useLocation - Hook que retorna a URL atual
//Link - usado para navegação interna das páginas

//Importação dos componentes do Shadcn
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

// Mapeamento para das rotas para nomes de exibição
const routeNames: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/agendamentos': 'Agendamentos',
  '/medicos': 'Médicos',
  '/pacientes': 'Pacientes',
  '/planos': 'Planos',
  // Adicione mais conforme necessário para sua aplicação
  // Exemplo para rotas aninhadas:
  // '/dashboard/analytics': 'Análises',
};

//Função Principal:
export function AppBreadcrumb() {
  const location = useLocation(); //obtem caminho atual
  const pathnames = location.pathname.split('/').filter(x => x); //Quebra URL em partes

  //Renderização
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            {/* Link raiz fixo */}
            <Link to="/dashboard">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* Monta a URL até o ponto atual */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          // Verifica se é o último item (a página atual)
          const isLast = index === pathnames.length - 1;
          // Busca o nome legível definido na const routeNames
          const displayName = routeNames[to] || value.charAt(0).toUpperCase() + value.slice(1);

          // Exibição condicional do item
          return (
            <React.Fragment key={to}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{displayName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}