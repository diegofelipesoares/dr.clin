//Controla o SideBar
// frontend/src/layout/MainLayout.tsx
import { useLocation } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from "../sidebar/Sidebar" // ⬅ nome atualizado

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()

  const hideSidebarRoutes = ["/login"]
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {shouldShowSidebar ? (
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 p-6">
            <SidebarTrigger />
            {children}
          </div>
        </SidebarProvider>
      ) : (
        <main className="flex-1 p-6">{children}</main>
      )}
    </div>
  )
}
