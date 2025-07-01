//Criando Context API para Sidebar

import { createContext } from 'react';

export type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  state: 'expanded' | 'collapsed';
};

export const SidebarContext = createContext<SidebarContextType | null>(null);