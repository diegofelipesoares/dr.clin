import { MedicoCard } from "./medicoCard";

const medicos = [
  {
    nome: "Dr. Camila Ferreira",
    especialidade: "Ginecologista",
    foto: "/img/camila.jpg",
    dias: "Segunda a Sexta",
    horario: "Das 8 às 17",
    preco: "R$200,00",
  },
  // ...outros médicos
];

export function MedicoList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {medicos.map((medico, index) => (
        <MedicoCard key={index} {...medico} />
      ))}
    </div>
  );
}
