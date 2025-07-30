// src/pages/pacientes/PacientesListPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPacientes } from '@/services/pacienteService';
import { PacienteLista } from '@/types/paciente';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { toast } from 'react-toastify';

export default function PacientesListPage() {
  const { clinica } = useParams<{ clinica: string }>();
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<PacienteLista[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!clinica) return;
        const data = await getPacientes(clinica);
        setPacientes(data);
      } catch (err) {
        console.log(err)
        toast.error('Erro ao carregar pacientes.');
      }
    }
    fetchData();
  }, [clinica]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Pacientes</h2>
          <p className="text-muted-foreground text-sm">
            Acesse os detalhes de cada paciente
          </p>
        </div>
        <Button onClick={() => navigate(`/${clinica}/pacientes/cadastrar`)}>
          + Adicionar paciente
        </Button>
      </div>

      <div className="rounded-md border bg-white p-5">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50 text-xs uppercase text-muted-foreground font-semibold border-none">
              <TableHead className="rounded-l-lg bg-blue-50 px-4 py-3">Nome</TableHead>
              <TableHead className="bg-blue-50 px-4 py-3">E-mail</TableHead>
              <TableHead className="bg-blue-50 px-4 py-3">Número de celular</TableHead>
              <TableHead className="bg-blue-50 px-4 py-3">Sexo</TableHead>
              <TableHead className="bg-blue-50 px-4 py-3">Perfil</TableHead>
              <TableHead className="rounded-r-lg bg-blue-50 w-10 px-4 py-3">Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id} className="hover:bg-muted transition">
                <TableCell className="px-4">{paciente.nome}</TableCell>
                <TableCell className="px-4">{paciente.email}</TableCell>
                <TableCell className="px-4">{paciente.telefone}</TableCell>
                <TableCell className="px-4">{paciente.sexo}</TableCell>
                <TableCell className="px-4">{paciente.perfil}</TableCell>
                <TableCell className="px-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/${clinica}/pacientes/${paciente.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
