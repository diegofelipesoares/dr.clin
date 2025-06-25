// src/components/ui/sidebar.tsx
import { Nav } from "../../components/ui/nav";
import { NavItem } from "../../components/ui/nav-item";
import {
  Home,
  Calendar,
  Stethoscope,
  Users,
  FileText,
} from "lucide-react";

export  function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-background p-4 flex flex-col">
      <h1 className="text-xl font-semibold mb-6">Dr.Clin</h1>

      <Nav>
        <NavItem to="/dashboard" icon={Home} label="Dashboard" />
        <NavItem to="/agendamentos" icon={Calendar} label="Agendamentos" />
        <NavItem to="/medicos" icon={Stethoscope} label="Médicos" />
        <NavItem to="/pacientes" icon={Users} label="Pacientes" />
        <NavItem to="/planos" icon={FileText} label="Planos" />
      </Nav>

      <div className="mt-auto text-sm text-muted-foreground pt-6">
        <p>Clínica Care</p>
        <p>mail@example.com</p>
      </div>
    </aside>
  );
}

