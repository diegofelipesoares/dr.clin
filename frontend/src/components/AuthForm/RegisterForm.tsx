// Componente: Formulário de registro de usuário

import { useState } from 'react';

// Hook para gerenciamento de formulários no React
import { useForm } from 'react-hook-form';

// Integração do Zod com o react-hook-form para validação de esquemas
import { zodResolver } from '@hookform/resolvers/zod';

// Biblioteca para validação de dados
import { z } from 'zod';

// Componente de botão reutilizável
import { Button } from '../../components/ui/button';

// Componente de campo de formulário reutilizável
import { FormField } from './FormField';

//Importando api axios
import api from '../../lib/api';

//Importando AxiosError para tratamento de erros
import { AxiosError } from 'axios';

// Define o esquema de validação para o cadastro de usuário
const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome e Sobrenome é obrigatório'), // campo obrigatório
    email: z.string().email('Email inválido'), // valida formato de e-mail
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'), // senha mínima de 6 caracteres
  })
  .refine(data => data.name.trim().split(' ').length >= 2, {
    // Validação adicional: exige pelo menos dois nomes (nome completo)
    path: ['name'], // associa a mensagem ao campo 'name'
    message: 'Digite seu nome completo',
  });

// Define o tipo TypeScript com base no esquema Zod
type RegisterFormData = z.infer<typeof registerSchema>;

// Componente do formulário de registro de usuário
export function RegisterForm() {
  const [loading, setLoading] = useState(false); // estado para controle de carregamento
  // Inicializa o formulário com validação Zod
  const {
    register, // função para registrar campos no formulário
    handleSubmit, // função que lida com o envio do formulário
    formState: { errors }, // objeto que armazena os erros de validação
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema), // integra o schema de validação
    mode: 'onChange', // valida enquanto o usuário digita
  });

  // Função chamada quando o formulário é submetido com dados válidos
  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true); // 🟡 começa carregamento
    try {
      const response = await api.post('/auth/register', data);
      console.log('✅ Registro feito com sucesso:', response.data);
      alert('Conta criada com sucesso!');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Erro ao registrar:', error.response?.data);
        alert(error.response?.data?.detail || 'Erro ao registrar');
      } else {
        console.error('Erro desconhecido', error);
        alert('Erro inesperado ao registrar');
      }
    } finally {
      setLoading(false); // 🔵 encerra carregamento
    }
  };

  return (
    // Formulário com layout em grid
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
      {/* Campo para nome completo */}
      <FormField
        id='nome_cadastro' // ID único para acessibilidade
        label='Nome completo'
        register={register('name')} // conecta o campo ao react-hook-form
        error={errors.name} // exibe o erro de validação, se houver
      />

      {/* Campo para email */}
      <FormField
        id='email_cadastro'
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email}
      />

      {/* Campo para senha */}
      <FormField
        id='senha_cadastro'
        label='Senha'
        type='password'
        register={register('password')}
        error={errors.password}
      />

      {/* Botão de envio do formulário */}
      <Button type='submit' className='w-full' disabled={loading}>
        {loading ? 'Criando conta...' : 'Criar conta'}
      </Button>
    </form>
  );
}
