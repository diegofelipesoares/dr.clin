//Componente Formulário de Login usando React Hook Form e Zod

// Importa o hook de formulário do react-hook-form
import { useForm } from 'react-hook-form';

// Importa o adaptador que permite usar validações do Zod no react-hook-form
import { zodResolver } from '@hookform/resolvers/zod';

// Importa o Zod, biblioteca para validação de esquemas
import { z } from 'zod';

// Importa o botão estilizado
import { Button } from '../../components/ui/button';

// Importa o componente de campo de formulário reutilizável
import { FormField } from './FormField';

// Importa a API centralizada para chamadas de backend
import api from '../../lib/api';

//Adiciona useState para controle de carregamento.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // se quiser redirecionar após login

// Importa o Axios
import axios from 'axios';

// Define o esquema de validação com Zod para o formulário de login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório') // campo obrigatório
    .email('Email inválido'), // formato de e-mail válido
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'), // senha mínima de 6 caracteres
});

// Define o tipo TypeScript baseado no schema do Zod
type LoginFormData = z.infer<typeof loginSchema>;

// Componente do formulário de login
export function LoginForm() {
  // Usa o hook useForm do react-hook-form com o esquema de validação do Zod
  const {
    register, // função para registrar os campos
    handleSubmit, // função que trata o envio do formulário
    formState: { errors }, // objeto que contém os erros de validação
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // conecta o esquema de validação Zod
    mode: 'onChange', // ativa validação a cada mudança de campo
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // para redirecionar após login

  // Função chamada ao submeter o formulário com dados válidos
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      const token = response.data.access_token;

      // Armazena o token no localStorage
      localStorage.setItem('token', token);

      alert('Login realizado com sucesso!');
      navigate('/dashboard'); // ou para onde quiser redirecionar
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        alert(error.response?.data?.detail || 'Erro ao fazer login');
      } else {
        alert('Erro inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Formulário com layout em grid
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
      {/* Campo de email com validação e exibição de erro */}
      <FormField
        id='email_login' // ID único (importante se houver mais de um formulário na página)
        label='Email'
        type='email'
        register={register('email')} // conecta ao react-hook-form
        error={errors.email} // passa o erro de validação, se houver
      />

      {/* Campo de senha com validação e exibição de erro */}
      <FormField
        id='senha_login'
        label='Senha'
        type='password'
        register={register('password')}
        error={errors.password}
      />

      {/* Botão de envio do formulário com controle de carregamento */}
      <Button type='submit' className='w-full' disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}
