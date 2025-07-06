import { MedicoCard } from './medicoCard';

//recebe os dados dos médicos
// você pode substituir por uma chamada de API ou props
// para obter os dados dinamicamente
// aqui estamos usando um array estático como exemplo
const medicos = [
  {
    nome: 'Dr. Lucas Araújo',
    especialidade: 'Bucomaxilofacial',
    foto: '/img/DrLucas.jpg',
    dias: 'Segunda a Sexta',
    horario: 'Das 8 às 17',
    preco: '200.00',
  },
  {
    nome: 'Dra. Letícia Soares',
    especialidade: 'Ortodontia',
    foto: '/img/DraLeticia.jpg',
    dias: 'Segunda a Sexta',
    horario: 'Das 8 às 17',
    preco: '200.00',
  },
  // ...outros médicos
];

export function MedicoList() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-12'>
      {medicos.map((medico, index) => (
        <MedicoCard key={index} {...medico} />
      ))}
    </div>
  );
}
