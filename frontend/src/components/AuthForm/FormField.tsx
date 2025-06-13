// src/components/AuthForm/FormField.tsx
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { cn } from '../../lib/utils';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  error?: FieldError;
  register: UseFormRegisterReturn; // função gerada pelo useForm().register
}

export function FormField({
  id,
  label,
  type = 'text',
  error,
  register,
}: FormFieldProps) {
  return (
    <div className='text-left'>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        {...register}
        className={cn(
          'w-full',
          error &&
            'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500',
        )}
      />
      {error && <p className='text-red-500 text-sm'>{error.message}</p>}
    </div>
  );
}
