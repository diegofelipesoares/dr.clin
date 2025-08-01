// src/pages/pacientes/EditarPaciente.tsx
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { pacienteSchema, PacienteFormValues } from '@/schemas/pacienteSchema';
import {
  getPacientePorId,
  atualizarPaciente,
  deletePaciente,
} from '@/services/pacienteService';
import { PacienteForm } from '@/components/paciente/PacienteForm';

import {
  AlertDialog,
  //AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

//import { Button } from '@/components/ui/button';

export default function EditarPaciente() {
  const { clinica, id } = useParams<{ clinica?: string; id?: string }>();
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const form = useForm<PacienteFormValues>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      sexo: 'Masculino',
      cpf: '',
      dataNascimento: '',
      endereco: '',
      convenio: '',
      observacoes: '',
    },
  });

  useEffect(() => {
    if (!clinica || !id) return;
    const clinicaId = clinica;
    const pacienteId = Number(id);

    async function fetchPaciente() {
      function formatDateToBR(isoDate: string): string {
        const [ano, mes, dia] = isoDate.split('-');
        return `${dia}/${mes}/${ano}`;
      }

      try {
        const paciente = await getPacientePorId(clinicaId, pacienteId);
        form.reset({
          ...paciente,
          dataNascimento: paciente.dataNascimento
            ? formatDateToBR(paciente.dataNascimento)
            : '',
        });

        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        if (paciente.fotoUrl) {
          const urlBase = paciente.fotoUrl.startsWith('http')
            ? paciente.fotoUrl
            : `${baseURL}/${paciente.fotoUrl}`;

          const urlFinal = `${urlBase}?v=${Date.now()}`;
          setPreview(urlFinal);
        }
      } catch (error) {
        console.error(error);
        toast.error('Erro ao carregar paciente');
      }
    }

    fetchPaciente();
  }, [clinica, id, form]);

  async function onSubmit(data: PacienteFormValues) {
    if (!clinica || !id) return;

    try {
      await atualizarPaciente(clinica, Number(id), data);
      toast.success('Paciente atualizado com sucesso!');
      navigate(`/${clinica}/pacientes`);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar paciente.');
    }
  }

  async function handleDelete() {
    if (!clinica || !id) return;

    try {
      await deletePaciente(clinica, Number(id));
      toast.success('Paciente excluído com sucesso!');
      navigate(`/${clinica}/pacientes`);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir paciente.');
    }
  }

  if (!clinica || !id) {
    return <div className='p-6 text-red-500'>Parâmetros inválidos na URL.</div>;
  }

  return (
    <>
      <PacienteForm
        form={form}
        preview={preview}
        setPreview={setPreview}
        fileInputRef={fileInputRef}
        onSubmit={onSubmit}
        onCancel={() => navigate(`/${clinica}/pacientes`)}
        onDelete={() => setConfirmOpen(true)}
        modo='editar'
      />

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este paciente? Essa ação não poderá
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmOpen(false);
                handleDelete();
              }}
            >
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
