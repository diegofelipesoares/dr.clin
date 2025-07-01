//Provider SideBar
import { useState } from 'react';
import { SidebarContext } from './SidebarContext';


//Criando provider do SideBar
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleSidebar() {
    setIsOpen(prev => !prev);
  }

  const state = isOpen ? 'expanded' : 'collapsed'; // ✅ controle de exibição

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, state }}>
      {children}
    </SidebarContext.Provider>
  );
}