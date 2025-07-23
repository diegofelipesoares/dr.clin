// src/components/paciente/PacienteForm.tsx
// UI - shadcn
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

// Formulários e tipos
import { UseFormReturn } from 'react-hook-form';
import { RefObject } from 'react';
import { PacienteFormValues } from '@/schemas/pacienteSchema';

// Componentes customizados com máscaras
import CpfMaskInput from '@/components/Form/CpfMaskInput';
import InputMaskControlled from '@/components/Form/InputMaskControlled';
import DataMaskInput from '@/components/Form/DataMaskInput';

interface PacienteFormProps {
  form: UseFormReturn<PacienteFormValues>;
  onSubmit: (data: PacienteFormValues) => void;
  isEdit?: boolean;
  preview?: string | null;
  setPreview?: (url: string | null) => void;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  onDelete?: () => void;
}

export function PacienteForm({
  form,
  onSubmit,
  isEdit = false,
  preview,
  setPreview,
  fileInputRef,
  onDelete,
}: PacienteFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <Card>
          <CardContent className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Nome */}
            <FormField
              control={form.control}
              name='nome'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Digite o nome do paciente' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* E-mail */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      {...field}
                      placeholder='exemplo@email.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CPF */}
            <FormField
              control={form.control}
              name='cpf'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <CpfMaskInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefone */}
            <FormField
              control={form.control}
              name='telefone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <InputMaskControlled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data de nascimento */}
            <FormField
              control={form.control}
              name='dataNascimento'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de nascimento</FormLabel>
                  <FormControl>
                    <DataMaskInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sexo */}
            <FormField
              control={form.control}
              name='sexo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione o sexo' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Masculino'>Masculino</SelectItem>
                      <SelectItem value='Feminino'>Feminino</SelectItem>
                      <SelectItem value='Outro'>Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Endereço */}
            <FormField
              control={form.control}
              name='endereco'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Rua, número, bairro, cidade...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Convênio / Plano */}
            <FormField
              control={form.control}
              name='convenio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Convênio / Plano</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Nome do plano ou convênio' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload de foto */}
            <FormField
              control={form.control}
              name='foto'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Foto</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // ✅ Validação de tipo
                            if (!file.type.startsWith('image/')) {
                              alert(
                                'Formato de imagem inválido. Selecione um arquivo de imagem.',
                              );
                              return;
                            }

                            field.onChange(file);

                            // Pré-visualização
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreview?.(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        ref={fileInputRef}
                      />

                      {/* Pré-visualização */}
                      {preview ? (
                        <img
                          src={preview}
                          alt='Prévia da foto'
                          className='mt-2 h-24 w-24 rounded-full object-cover border'
                        />
                      ) : (
                        <div className='mt-2 h-24 w-24 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground'>
                          Sem imagem
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Botões */}
        <div className='flex justify-between px-1 mt-4'>
          {isEdit && (
            <Button type='button' variant='destructive' onClick={onDelete}>
              Excluir
            </Button>
          )}
          <Button type='submit'>
            {isEdit ? 'Salvar Alterações' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
