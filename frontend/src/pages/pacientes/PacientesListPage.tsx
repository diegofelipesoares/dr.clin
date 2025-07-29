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
            Access a detailed overview of key metrics and patient outcomes
          </p>
        </div>
        <Button onClick={() => navigate(`/${clinica}/pacientes/novo`)}>
          + Adicionar paciente
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NOME</TableHead>
              <TableHead>E-MAIL</TableHead>
              <TableHead>NÚMERO DE CELULAR</TableHead>
              <TableHead>SEXO</TableHead>
              <TableHead>PERFIL</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell>{paciente.nome}</TableCell>
                <TableCell>{paciente.email}</TableCell>
                <TableCell>{paciente.telefone}</TableCell>
                <TableCell>{paciente.sexo}</TableCell>
                <TableCell>{paciente.perfil}</TableCell>
                <TableCell>
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
