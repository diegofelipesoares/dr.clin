import { Button } from '../../components/ui/button';
import { MedicoList } from '../../components/medico/medicoList';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function MedicosPage() {
  const navigate = useNavigate();
  const { clinica } = useParams();

  return (
    <div className='flex'>
      {/* <Sidebar /> */}
      <main className='flex-1 p-2 bg-background min-h-screen'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h2 className='text-2xl font-bold'>Médicos</h2>
            <p className='text-gray-600'>
              Acesse os detalhes dos profissionais da clínica
            </p>
          </div>
          <Button onClick={() => navigate(`/${clinica}/medicos/cadastrar`)}>
            + Adicionar médico
          </Button>
        </div>
        <MedicoList />
      </main>
    </div>
  );
}
