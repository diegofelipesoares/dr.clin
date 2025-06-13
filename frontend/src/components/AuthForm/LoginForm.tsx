// src/components/AuthForm/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { FormField } from './FormField';

const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
      <FormField
        id='email_login'
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email}
      />
      <FormField
        id='senha_login'
        label='Senha'
        type='password'
        register={register('password')}
        error={errors.password}
      />
      <Button type='submit' className='w-full'>
        Entrar
      </Button>
    </form>
  );
}
