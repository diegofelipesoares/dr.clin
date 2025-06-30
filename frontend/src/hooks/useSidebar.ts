import { useContext } from 'react';
import { SidebarContext } from '../context/SidebarContext';

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar deve ser usado dentro de SidebarProvider');
  }
  return context;
}