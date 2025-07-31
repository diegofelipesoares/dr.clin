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
import { cn } from '@/lib/utils';

interface PacienteFormProps {
  form: UseFormReturn<PacienteFormValues>;
  onSubmit: (data: PacienteFormValues) => void;
  modo?: 'cadastrar' | 'editar'; // <-- aqui
  preview?: string | null;
  setPreview?: (url: string | null) => void;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  onDelete?: () => void;
  onCancel?: () => void; // <-- novo prop opcional
}

export function PacienteForm({
  form,
  onSubmit,
  modo,
  preview,
  setPreview,
  fileInputRef,
  onDelete,
  onCancel,
}: PacienteFormProps) {
  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>
        {modo === 'editar' ? 'Editar Paciente' : 'Cadastrar Paciente'}
      </h2>
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
                      <Input
                        {...field}
                        placeholder='Digite o nome do paciente'
                      />
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
                      <InputMaskControlled
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='(xx) xxxxx-xxxx'
                        name={field.name}
                        ref={field.ref}
                        className={cn(
                          'flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background',
                          'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        )}
                      />
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
                      <Input
                        {...field}
                        placeholder='Nome do plano ou convênio'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Observações */}
              <FormField
                control={form.control}
                name='observacoes'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder='Escreva observações relevantes do paciente...'
                        className='
                        bg-white 
                        text-gray-900 
                        focus-visible:ring-ring 
                        placeholder:text-muted-foreground 
                        w-full h-24 border border-input rounded-md px-3 py-2 text-sm shadow-sm resize-y'
                      />
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
                  <FormItem>
                    <FormLabel>Foto do Paciente</FormLabel>
                    <FormControl>
                      <div className='flex items-center gap-4'>
                        {/* Preview da imagem */}
                        <div className='w-24 h-24 rounded-full border overflow-hidden bg-gray-100 flex items-center justify-center text-sm text-muted-foreground'>
                          {preview ? (
                            <img
                              src={preview}
                              alt='Pré-visualização da foto'
                              className='w-full h-full object-cover object-top'
                            />
                          ) : (
                            'Prévia da Foto'
                          )}
                        </div>

                        {/* Botão de envio + input oculto */}
                        <div>
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => fileInputRef?.current?.click()}
                          >
                            Enviar / Alterar Foto
                          </Button>
                          <input
                            ref={fileInputRef}
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (!file.type.startsWith('image/')) {
                                  alert('Formato inválido. Envie uma imagem.');
                                  return;
                                }
                                setPreview?.(URL.createObjectURL(file));
                                field.onChange(file);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Botões */}
          <div className='flex justify-between items-center gap-4 px-1 mt-4'>
            {modo === 'editar' && (
              <div className='flex gap-2'>
                {onDelete && (
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={onDelete}
                  >
                    Excluir
                  </Button>
                )}
                <Button type='button' variant='secondary' onClick={onCancel}>
                  Cancelar
                </Button>
                <Button type='submit'>Salvar Alterações</Button>
              </div>
            )}

            {modo !== 'editar' && <Button type='submit'>Cadastrar</Button>}
          </div>
        </form>
      </Form>
    </div>
  );
}
