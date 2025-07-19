// pages/CadastrarMedico.tsx
// frontend/src/pages/medicos/CadastrarMedico.tsx

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { MedicoForm } from '../../components/medico/medicoForm';
import { medicoSchema, MedicoFormValues } from '@/schemas/medicoSchema';

export default function CadastrarMedico() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { clinica } = useParams();

  const form = useForm<MedicoFormValues>({
    resolver: zodResolver(medicoSchema),
    defaultValues: {
      nome: '',
      pronomeTratamento: 'Dr.',
      especialidade: '',
      crm: '',
      email: '',
      telefone: '',
      tipoContratacao: 'CLT',
      cpfCnpj: '',
      banco: '',
      agencia: '',
      conta: '',
      tipoConta: 'Corrente',
      percentualRepasse: '',
      diasAtendimento: [],
      horarioInicio: '',
      horarioFim: '',
      intervalo: '',
      foto: undefined,
    },
  });

  async function onSubmit(data: MedicoFormValues) {
    const formData = new FormData();
    formData.append('nome', data.nome || '');
    formData.append('pronomeTratamento', data.pronomeTratamento || '');
    formData.append('especialidade', data.especialidade || '');
    formData.append('crm', data.crm || '');
    formData.append('email', data.email || '');
    formData.append('telefone', data.telefone || '');
    formData.append('tipoContratacao', data.tipoContratacao || '');
    formData.append('cpfCnpj', data.cpfCnpj || '');
    formData.append('banco', data.banco || '');
    formData.append('agencia', data.agencia || '');
    formData.append('conta', data.conta || '');
    formData.append('tipoConta', data.tipoConta || '');
    formData.append('percentualRepasse', data.percentualRepasse || '');
    formData.append('horarioInicio', data.horarioInicio || '');
    formData.append('horarioFim', data.horarioFim || '');
    formData.append('intervalo', data.intervalo || '');

    // Converta corretamente diasAtendimento para string JSON
    formData.append(
      'diasAtendimento',
      JSON.stringify(data.diasAtendimento || []),
    );

    if (data.foto && data.foto instanceof File) {
      formData.append('foto', data.foto);
    }

    try {
      await axios.post(`http://localhost:8000/${clinica}/medicos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Médico cadastrado com sucesso!');
      navigate(`/${clinica}/medicos`);
    } catch (error) {
      console.error('Erro ao cadastrar médico:', error);
      toast.error(
        'Erro ao cadastrar médico. Verifique os dados e tente novamente.',
      );
    }
  }

  return (
    <MedicoForm
      form={form}
      onSubmit={onSubmit}
      isEdit={false}
      preview={preview}
      setPreview={setPreview}
      fileInputRef={fileInputRef}
    />
  );
}
