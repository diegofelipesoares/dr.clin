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

export default function EditarPaciente() {
  const { clinica, id } = useParams<{ clinica?: string; id?: string }>();
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    const clinicaId = clinica; // Agora é do tipo string
    const pacienteId = Number(id); // Agora é number

    async function fetchPaciente() {
      function formatDateToBR(isoDate: string): string {
        const [ano, mes, dia] = isoDate.split('-');
        return `${dia}/${mes}/${ano}`; // dd/mm/yyyy
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
          const urlFinal = paciente.fotoUrl.startsWith('http')
            ? paciente.fotoUrl
            : `${baseURL}/${paciente.fotoUrl}`;
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

    const clinicaId = clinica;
    const pacienteId = Number(id);

    try {
      await atualizarPaciente(clinicaId, pacienteId, data);
      toast.success('Paciente atualizado com sucesso!');
      navigate(`/${clinica}/pacientes`);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar paciente.');
    }
  }

  async function handleDelete() {
    if (!clinica || !id) return;
    const clinicaId = clinica;
    const pacienteId = Number(id);

    const confirm = window.confirm(
      'Tem certeza que deseja excluir este paciente?',
    );
    if (!confirm) return;

    try {
      await deletePaciente(clinicaId, pacienteId);
      toast.success('Paciente excluído com sucesso!');
      navigate(`/${clinica}/pacientes`);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir paciente.');
    }
  }

  // ⚠️ Verifica se os parâmetros ainda são indefinidos (após os hooks!)
  if (!clinica || !id) {
    return <div className='p-6 text-red-500'>Parâmetros inválidos na URL.</div>;
  }

  return (
    <PacienteForm
      form={form}
      preview={preview}
      setPreview={setPreview}
      fileInputRef={fileInputRef}
      onSubmit={onSubmit}
      onCancel={() => navigate(`/${clinica}/pacientes`)}
      onDelete={handleDelete}
      modo='editar'
    />
  );
}
