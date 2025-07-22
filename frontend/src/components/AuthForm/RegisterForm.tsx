import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { FormField } from './FormField';
import api from '../../lib/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
//import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'Nome e Sobrenome é obrigatório'),
    email: z
      .string()
      .trim()
      .email('E-mail inválido')
      .min(1, 'E-mail é obrigatório'),
    password: z
      .string()
      .trim()
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  })
  .refine(data => data.name.trim().split(' ').length >= 2, {
    path: ['name'],
    message: 'Digite seu nome completo',
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { clinica } = useParams();

  console.log('🔍 Subdomínio detectado:', clinica);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      // 1. Criação do usuário
      const response = await api.post(
        `/auth/clinicas/${clinica}/register`,
        data,
      );
      console.log('🔧 Usuário criado:', response.data);
      toast.success('Conta criada com sucesso!');

      // 2. Login automático
      const loginResponse = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      const token = loginResponse.data.access_token;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 3. Busca os dados do usuário
      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);

      // 4. Redirecionamento baseado no tipo de usuário
      if (userResponse.data.role === 'admin') {
        navigate(`/${clinica}/dashboard`);
      } else {
        navigate(`/${clinica}/agendamentos`);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Erro ao registrar:', error.response?.data);
        toast.error(error.response?.data?.detail || 'Erro ao registrar');
      } else {
        console.error('Erro desconhecido', error);
        toast.error('Erro inesperado ao registrar');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
      <FormField
        id='nome_cadastro'
        label='Nome'
        placeholder='Digite seu nome completo'
        register={register('name')}
        error={errors.name}
      />
      <FormField
        id='email_cadastro'
        label='Email'
        type='email'
        placeholder='Digite seu e-mail'
        register={register('email')}
        error={errors.email}
      />
      <FormField
        id='senha_cadastro'
        label='Senha'
        type='password'
        placeholder='Digite sua senha'
        register={register('password')}
        error={errors.password}
      />
      <Button type='submit' className='w-full' disabled={loading}>
        {loading ? 'Criando conta...' : 'Criar conta'}
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="w-full text-blue-600 hover:text-blue-800"
        onClick={() => navigate("/")}
      >
        Voltar para o início
      </Button>
    </form>
  );
}
