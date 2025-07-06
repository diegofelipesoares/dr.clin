import { Button } from '../../components/ui/button';
import { Calendar, Clock } from 'lucide-react';

interface MedicoCardProps {
  nome: string;
  especialidade: string;
  foto: string;
  dias: string;
  horario: string;
  preco: string;
}

export function MedicoCard({
  nome,
  especialidade,
  foto,
  dias,
  horario,
  preco,
}: MedicoCardProps) {
  return (
    <div className='bg-white rounded-xl shadow p-4 flex flex-col gap-2 items-center w-full max-w-xl'>
      <img
        src={foto}
        alt={nome}
        className='w-20 h-20 rounded-full object-cover object-top'
      />
      <div className='text-left w-full pl-3'>
        <h3 className='font-semibold'>{nome}</h3>
        <p className='text-gray-500 text-sm'>{especialidade}</p>
      </div>

      <div className='flex flex-col gap-1 text-sm text-black'>
        <div className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-xl w-full'>
          <Calendar size={16} /> {dias}
        </div>
        <div className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-xl'>
          <Clock size={16} /> {horario}
        </div>
        <div className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-xl'>
          <span className='font-semibold text-sm'>R$</span>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(preco))}
        </div>
      </div>
      <Button className='mt-2 w-full'>Ver detalhes</Button>
    </div>
  );
}
