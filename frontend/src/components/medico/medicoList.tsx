import { MedicoCard } from './medicoCard';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useParams } from 'react-router-dom';

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
  const { clinica } = useParams(); // ✅ useParams aqui no topo
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicos(clinica: string | undefined) {
      if (!clinica) return;

      try {
        const response = await api.get(`/${clinica}/medicos`);

        setMedicos(response.data);
      } catch (error) {
        console.error('Erro ao buscar médicos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMedicos(clinica); // ✅ passa clinica como parâmetro
  }, [clinica]);

  function getPrimeiroEUltimoNome(nomeCompleto: string) {
    const partes = nomeCompleto.trim().split(' ');
    if (partes.length === 1) return partes[0];
    const primeiro = partes[0];
    const ultimo = partes[partes.length - 1];
    return `${primeiro} ${ultimo}`;
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <div className='w-4 h-4 border-2 border-t-transparent border-primary rounded-full animate-spin' />
          <span>Carregando médicos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-wrap gap-6 pb-12'>
      {medicos.map(medico => (
        <MedicoCard
          key={medico.id}
          id={medico.id}
          nome={`${medico.pronomeTratamento} ${getPrimeiroEUltimoNome(
            medico.nome,
          )}`}
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
