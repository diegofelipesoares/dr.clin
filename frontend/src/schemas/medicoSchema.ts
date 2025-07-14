// src/schemas/medicoSchema.ts
import { z } from 'zod';

export const medicoSchema = z.object({
  nome: z.string().min(3, 'Nome é obrigatório'),
  pronomeTratamento: z.enum(['Dr.', 'Dra.']),
  especialidade: z.string().min(2, 'Especialidade é obrigatória'),
  crm: z.string().min(4, 'CRM é obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(8, 'Telefone é obrigatório'),
  tipoContratacao: z.enum(['CLT', 'PJ', 'Autônomo']),
  cpfCnpj: z.string().min(11, 'CPF/CNPJ inválido'),
  banco: z.string(),
  agencia: z.string(),
  conta: z.string(),
  tipoConta: z.enum(['Corrente', 'Poupança', 'Pagamento']),
  percentualRepasse: z.string(),
  diasAtendimento: z.array(z.enum(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'])).nonempty('Selecione pelo menos um dia'),
  horarioInicio: z.string(),
  horarioFim: z.string(),
  intervalo: z.string(),
  foto: z.any(), // ou `z.instanceof(File)` se quiser mais estrito
});

export type MedicoFormValues = z.infer<typeof medicoSchema>;
