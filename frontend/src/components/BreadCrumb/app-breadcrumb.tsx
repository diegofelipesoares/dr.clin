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

          // Tenta obter nome direto por rota
          let displayName = routeNames[to];

          if (!displayName) {
            // 🛠 Corrigido: se for ID de médico, mostra "Editar Médico"
            if (
              pathnames.includes('medicos') &&
              !isNaN(Number(value)) // se for número
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
