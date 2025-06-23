//Componente FormField para uso em formulários de autenticação

// Importa os componente de input e label estilizados
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

// Função utilitária para combinar classes condicionalmente
import { cn } from '../../lib/utils';

// Tipos do react-hook-form para tratar erros e registro de campos
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// Interface que define as props esperadas pelo componente FormField
interface FormFieldProps {
  id: string; // ID do campo (também usado no htmlFor do label)
  label: string; // Texto do rótulo exibido acima do input
  type?: string; // Tipo do input (ex: "text", "password", etc.), opcional com valor padrão
  placeholder?: string; //Tipo para texto padrão do input
  error?: FieldError; // Objeto de erro retornado pelo react-hook-form, se houver
  register: UseFormRegisterReturn; // Registro do campo feito pelo useForm().register
}

// Componente reutilizável de campo de formulário com rótulo, input e mensagem de erro
export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  register,
}: FormFieldProps) {
  return (
    <div className='text-left'>
      {/* Rótulo associado ao input pelo htmlFor */}
      <Label htmlFor={id}>{label}</Label>

      {/* Campo de entrada (input), que aplica estilos de erro se necessário */}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register} // Conecta o input ao controle do react-hook-form
        className={cn(
          'w-full', // largura total
          error && // se houver erro, aplica estilos vermelhos
            'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500',
        )}
      />

      {/* Se houver erro, exibe a mensagem abaixo do input */}
      {error && <p className='text-red-500 text-sm'>{error.message}</p>}
    </div>
  );
}
