// src/components/ScrollToTop/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rolagem instantânea para o topo
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}