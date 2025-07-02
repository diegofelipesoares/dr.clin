// src/components/app-breadcrumb.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

// Defina um mapeamento para os caminhos de suas rotas para nomes de exibição
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

export function AppBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/dashboard">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = routeNames[to] || value.charAt(0).toUpperCase() + value.slice(1);

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