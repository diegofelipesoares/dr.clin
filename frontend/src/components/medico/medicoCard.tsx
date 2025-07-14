import { Button } from '../../components/ui/button';
import { Calendar, Clock, BanknoteArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MedicoCardProps {
  id: number;
  nome: string;
  especialidade: string;
  foto: string;
  dias: string;
  horario: string;
  percentual: string;
}

export function MedicoCard({
  id,
  nome,
  especialidade,
  foto,
  dias,
  horario,
  percentual,
}: MedicoCardProps) {
  const navigate = useNavigate();

  //ORGANIZANDO P SEMANA APARECER EM ORDEM NO CARD
  // Ordem fixa dos dias da semana
  const ordemDias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  // Converte a string em array, remove espaços e filtra valores vazios
  const diasArray = dias
    .split(',')
    .map(d => d.trim())
    .filter(Boolean);

  // Ordena o array conforme a ordemDias
  diasArray.sort((a, b) => {
    const posA = ordemDias.indexOf(a);
    const posB = ordemDias.indexOf(b);
    // Se o dia não estiver na lista, coloca no final
    if (posA === -1) return 1;
    if (posB === -1) return -1;
    return posA - posB;
  });

  // Junta novamente em string
  const diasOrdenados = diasArray.join(', ');

  return (
    <div className='bg-white rounded-xl shadow p-4 flex flex-col gap-2 items-center w-[250px]'>
      <img
        loading='lazy'
        src={`http://localhost:8000/${foto}`}
        alt={nome}
        className='w-20 h-20 rounded-full object-cover object-top'
      />
      <div className='text-left w-full pl-3'>
        <h3 className='font-semibold'>{nome}</h3>
        <p className='text-gray-500 text-sm'>{especialidade}</p>
      </div>

      <div className='flex flex-col gap-1 text-sm text-black min-w-[2px] w-full'>
        <div className='flex items-center h-10 gap-2 px-3 py-1 bg-gray-100 rounded-xl w-full'>
          <Calendar size={16} /> {diasOrdenados}
        </div>
        <div className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-xl w-full'>
          <Clock size={16} /> {horario}
        </div>
        <div className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-xl w-full'>
          <BanknoteArrowDown size={16} /> {percentual} %
        </div>
      </div>
      <Button
        className='mt-auto w-full'
        onClick={() => navigate(`/medicos/${id}`)}
      >
        Ver detalhes
      </Button>
    </div>
  );
}
