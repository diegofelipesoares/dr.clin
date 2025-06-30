//CENTRALIZA OS PROVIDERS
// src/context/index.ts
import React from 'react';
import { AuthProvider} from './AuthProvider';
import { SidebarProvider } from './SidebarProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </AuthProvider>
  );
};
