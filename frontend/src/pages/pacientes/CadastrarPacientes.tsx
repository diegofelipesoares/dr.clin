import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { PacienteForm } from '@/components/paciente/PacienteForm';
import { PacienteFormValues, pacienteSchema } from '@/schemas/pacienteSchema';
import { cadastrarPaciente } from '@/services/pacienteService';

export default function CadastrarPaciente() {
  const { clinica } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<PacienteFormValues>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      dataNascimento: '',
      sexo: 'Masculino', // valor inicial obrigatório para evitar erro de tipagem
      endereco: '',
      convenio: '',
      foto: undefined,
    },
  });

  async function onSubmit(data: PacienteFormValues) {
    try {
      if (!clinica) {
        toast.error('Clínica não encontrada na URL.');
        return;
      }

      await cadastrarPaciente(clinica, data); // ✅ uso do service
      toast.success('Paciente cadastrado com sucesso!');
      navigate(`/${clinica}/dashboard`);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error('Erro ao cadastrar paciente:', axiosError);
      console.log(
        '❌ Detalhes da resposta do erro:',
        axiosError.response?.data,
      );
      toast.error('Erro ao cadastrar paciente. Verifique os dados.');
    }
  }

  return (
    <PacienteForm
      form={form}
      onSubmit={onSubmit}
      preview={preview}
      setPreview={setPreview}
      fileInputRef={fileInputRef}
    />
  );
}
