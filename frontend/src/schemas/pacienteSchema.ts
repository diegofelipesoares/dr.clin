// src/schemas/pacienteSchema.ts
import { z } from 'zod';

// Expressão regular para validar datas no formato dd/mm/aaaa
const dataRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/]\d{4}$/;

export const pacienteSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  cpf: z
    .string()
    .min(14, 'CPF inválido')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido'),
  telefone: z
    .string()
    .min(14, 'Telefone inválido')
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato de telefone inválido'),
  dataNascimento: z.string().regex(dataRegex, 'Data de nascimento inválida'),
  sexo: z.enum(['Masculino', 'Feminino', 'Outro'], {
    required_error: 'Sexo é obrigatório',
  }),
  endereco: z.string().min(5, 'Endereço deve conter pelo menos 5 caracteres'),
  convenio: z.string().optional(),

  // Foto pode ser opcional e nula (como File ou undefined)
  foto: z
    .any()
    .refine(
      file => !file || file instanceof File,
      'A foto deve ser um arquivo válido',
    )
    .optional(),
});

export type PacienteFormValues = z.infer<typeof pacienteSchema>;
