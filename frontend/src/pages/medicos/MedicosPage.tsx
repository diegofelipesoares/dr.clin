import { Button } from '../../components/ui/button';
import { MedicoList } from '../../components/medico/medicoList';

export default function MedicosPage() {
  return (
    <div className='flex'>
      {/* <Sidebar /> */}
      <main className='flex-1 p-2 bg-gray-50 min-h-screen'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h2 className='text-2xl font-bold'>Médicos</h2>
            <p className='text-gray-600'>
              Acesse os detalhes dos profissionais da clínica
            </p>
          </div>
          <Button>+ Adicionar médico</Button>
        </div>
        <MedicoList />
      </main>
    </div>
  );
}
