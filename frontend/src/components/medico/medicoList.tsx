import { MedicoCard } from './medicoCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

//recebe os dados dos médicos
// você pode substituir por uma chamada de API ou props
// para obter os dados dinamicamente
// aqui estamos usando um array estático como exemplo
type Medico = {
  id: number;
  nome: string;
  pronomeTratamento: string;
  especialidade: string;
  foto: string;
  diasAtendimento: string[];
  horarioInicio: string;
  horarioFim: string;
  percentualRepasse: string;
};

export function MedicoList() {
  const [medicos, setMedicos] = useState<Medico[]>([]);

  useEffect(() => {
    async function fetchMedicos() {
      try {
        const response = await axios.get('http://localhost:8000/medicos');
        setMedicos(response.data);
      } catch (error) {
        console.error('Erro ao buscar médicos:', error);
      }
    }
    fetchMedicos();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-12'>
      {medicos.map(medico => (
        <MedicoCard
          key={medico.id}
          id={medico.id}
          nome={`${medico.pronomeTratamento} ${medico.nome}`}
          especialidade={medico.especialidade}
          foto={medico.foto}
          dias={medico.diasAtendimento.join(', ')}
          horario={`${medico.horarioInicio} às ${medico.horarioFim}`}
          percentual={medico.percentualRepasse}
        />
      ))}
    </div>
  );
}
