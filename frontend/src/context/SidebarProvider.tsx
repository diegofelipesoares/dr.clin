//Provider SideBar
import { useState, ReactNode } from 'react';
import { SidebarContext } from './SidebarContext';


//Criando provider do SideBar
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleSidebar() {
    setIsOpen(prev => !prev);
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}