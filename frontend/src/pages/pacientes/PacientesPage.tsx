import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { PacienteForm } from '@/components/paciente/PacienteForm';
import { PacienteFormValues, pacienteSchema } from '@/schemas/pacienteSchema';

export default function PacientesPage() {
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
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('email', data.email);
    formData.append('cpf', data.cpf);
    formData.append('telefone', data.telefone);
    formData.append('dataNascimento', data.dataNascimento);
    formData.append('sexo', data.sexo);
    formData.append('endereco', data.endereco);

    if (data.convenio) {
      formData.append('convenio', data.convenio);
    }

    if (data.foto && data.foto instanceof File) {
      formData.append('foto', data.foto);
    }

    try {
      await axios.post(
        `http://localhost:8000/${clinica}/pacientes/`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      toast.success('Paciente cadastrado com sucesso!');
      navigate(`/${clinica}/dashboard`);
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
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
