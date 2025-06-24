import { Button } from "../../components/ui/button";
import { Calendar, Clock, DollarSign } from "lucide-react";

interface MedicoCardProps {
  nome: string;
  especialidade: string;
  foto: string;
  dias: string;
  horario: string;
  preco: string;
}

export function MedicoCard({ nome, especialidade, foto, dias, horario, preco }: MedicoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 items-center w-full max-w-xs">
      <img src={foto} alt={nome} className="w-20 h-20 rounded-full object-cover" />
      <div className="text-center">
        <h3 className="font-semibold">{nome}</h3>
        <p className="text-gray-500 text-sm">{especialidade}</p>
      </div>
      <div className="flex flex-col gap-1 text-sm text-gray-600">
        <div className="flex items-center gap-2"><Calendar size={16} /> {dias}</div>
        <div className="flex items-center gap-2"><Clock size={16} /> {horario}</div>
        <div className="flex items-center gap-2"><DollarSign size={16} /> {preco}</div>
      </div>
      <Button className="mt-2 w-full">Ver detalhes</Button>
    </div>
  );
}
