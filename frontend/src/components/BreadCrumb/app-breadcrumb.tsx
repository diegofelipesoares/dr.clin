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

const routeNames: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/agendamentos': 'Agendamentos',
  '/medicos': 'Médicos',
  '/pacientes': 'Pacientes',
  '/planos': 'Planos',
};

export function AppBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to='/dashboard'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          // Lógica especial para rotas como /medicos/:id
          let displayName = routeNames[to];

          if (!displayName) {
            // Se não encontrar nome fixo, verifica se é uma rota de edição
            if (
              pathnames[0] === 'medicos' &&
              pathnames.length === 2 &&
              index === 1
            ) {
              displayName = 'Editar Médico';
            } else {
              displayName = value.charAt(0).toUpperCase() + value.slice(1);
            }
          }

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
