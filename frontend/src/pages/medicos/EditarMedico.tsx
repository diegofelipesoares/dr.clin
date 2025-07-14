// frontend/src/pages/medicos/EditarMedico.tsx

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { MedicoForm } from '../../components/medico/medicoForm';
import { medicoSchema, MedicoFormValues } from '@/schemas/medicoSchema';

export default function EditarMedico() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetchMedico() {
      try {
        const response = await axios.get(`http://localhost:8000/medicos/${id}`);
        const dados = response.data;
        form.reset(dados);
        if (dados.foto) {
          setPreview(`http://localhost:8000/${dados.foto}`);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do médico:', error);
        toast.error('Erro ao carregar dados do médico.');
        setLoading(false);
      }
    }

    fetchMedico();
  }, [id, form]);

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

  // JSON.stringify garante compatibilidade com FastAPI
  formData.append('diasAtendimento', JSON.stringify(data.diasAtendimento || []));

  // Foto: só adiciona se for um File
  if (data.foto && data.foto instanceof File) {
    formData.append('foto', data.foto);
  }

  // Debug: veja exatamente o que está sendo enviado
  console.log('FormData enviado:');
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

    try {
      await axios.put(`http://localhost:8000/medicos/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Cadastro alterado com sucesso!');
      navigate('/medicos');
    } catch (error) {
      console.error('Erro ao editar médico:', error);
      toast.error('Erro ao editar médico. Verifique os dados e tente novamente.');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-4 h-4 border-2 border-t-transparent border-primary rounded-full animate-spin" />
          <span>Carregando dados do médico...</span>
        </div>
      </div>
    );
  }

  return (
    <MedicoForm
      form={form}
      onSubmit={onSubmit}
      isEdit
      preview={preview}
      setPreview={setPreview}
      fileInputRef={fileInputRef}
    />
  );
}
