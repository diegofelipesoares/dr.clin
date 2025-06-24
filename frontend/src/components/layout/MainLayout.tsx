//Controla o SideBar
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();

  const hideSidebarRoutes = ["/login"];
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {shouldShowSidebar && <Sidebar />}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
