import { Home, Calendar, Stethoscope, Users, FileText } from "lucide-react";
import { cn } from "../../lib/utils"
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: <Home />, path: "/dashboard" },
  { name: "Agendamentos", icon: <Calendar />, path: "/agendamentos" },
  { name: "Médicos", icon: <Stethoscope />, path: "/medicos" },
  { name: "Pacientes", icon: <Users />, path: "/pacientes" },
  { name: "Planos", icon: <FileText />, path: "/planos" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white border-r p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-6">Dr.Clin</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 transition",
                location.pathname === item.path ? "bg-blue-100 text-blue-600" : ""
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="text-sm text-gray-500">
        <p>Clínica Care</p>
        <p>mail@example.com</p>
      </div>
    </aside>
  );
}
