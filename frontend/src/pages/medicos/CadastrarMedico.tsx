// frontend/src/pages/medicos/CadastrarMedico.tsx

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputMaskControlled from '@/components/Form/InputMaskControlled';
import CpfMaskInput from '@/components/Form/CpfMaskInput';
import CrmMaskInput from '@/components/Form/CrmMaskInput';

const formSchema = z.object({
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
  diasAtendimento: z
    .array(z.enum(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']))
    .nonempty('Selecione pelo menos um dia'),
  horarioInicio: z.string(),
  horarioFim: z.string(),
  intervalo: z.string(),
  foto: z.any().refine(file => file instanceof File && file.size > 0, {
    message: 'A foto é obrigatória',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CadastrarMedico() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      pronomeTratamento: 'Dr.',
      especialidade: '',
      crm: '',
      email: '',
      telefone: '',
      tipoContratacao: 'CLT',
      cpfCnpj: '',
      banco: '',
      agencia: '',
      conta: '',
      tipoConta: 'Corrente',
      percentualRepasse: '',
      diasAtendimento: [],
      horarioInicio: '',
      horarioFim: '',
      intervalo: '',
      foto: undefined,
    },
  });

  async function onSubmit(data: FormValues) {
    const formData = new FormData();

    formData.append('nome', data.nome);
    formData.append('pronomeTratamento', data.pronomeTratamento);
    formData.append('especialidade', data.especialidade);
    formData.append('crm', data.crm);
    formData.append('email', data.email);
    formData.append('telefone', data.telefone);
    formData.append('tipoContratacao', data.tipoContratacao);
    formData.append('cpfCnpj', data.cpfCnpj);
    formData.append('banco', data.banco);
    formData.append('agencia', data.agencia);
    formData.append('conta', data.conta);
    formData.append('tipoConta', data.tipoConta);
    formData.append('percentualRepasse', data.percentualRepasse);
    formData.append('horarioInicio', data.horarioInicio);
    formData.append('horarioFim', data.horarioFim);
    formData.append('intervalo', data.intervalo);

    formData.append('diasAtendimento', JSON.stringify(data.diasAtendimento));

    if (data.foto) {
      formData.append('foto', data.foto);
    }

    try {
      await axios.post('http://localhost:8000/medicos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Médico cadastrado com sucesso!');
      navigate('/medicos');
    } catch (error) {
      console.error('Erro ao cadastrar médico:', error);
      toast.error(
        'Erro ao cadastrar médico. Verifique os dados e tente novamente.',
      );
    }
  }

  const diasDaSemana = [
    { label: 'Segunda', value: 'Seg' },
    { label: 'Terça', value: 'Ter' },
    { label: 'Quarta', value: 'Qua' },
    { label: 'Quinta', value: 'Qui' },
    { label: 'Sexta', value: 'Sex' },
    { label: 'Sábado', value: 'Sab' },
    { label: 'Domingo', value: 'Dom' },
  ] as const;

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Cadastrar Médico</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Dados Gerais */}
          <Card>
            <CardContent className='p-6 space-y-4'>
              <h3 className='text-lg font-semibold'>Dados Gerais</h3>
              <FormField
                control={form.control}
                name='nome'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Henrique dos Santos Soares'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='pronomeTratamento'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pronome de tratamento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecione' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Dr.'>Dr.</SelectItem>
                          <SelectItem value='Dra.'>Dra.</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='especialidade'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidade</FormLabel>
                      <FormControl>
                        <Input placeholder='Cardiologista' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name="crm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CRM</FormLabel>
                      <FormControl>
                        <CrmMaskInput
                          value={field.value}
                          onChange={field.onChange}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <InputMaskControlled
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="(XX) XXXXX-XXXX"
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder='email@dominio.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='foto'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto do Médico</FormLabel>
                    <FormControl>
                      <div className='flex items-center gap-4'>
                        {/* Área de Preview */}
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

                        {/* Botão para selecionar/alterar foto */}
                        <div>
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => fileInputRef.current?.click()}
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
                                setPreview(URL.createObjectURL(file));
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

          {/* Dados para Pagamento */}
          <Card>
            <CardContent className='p-6 space-y-4'>
              <h3 className='text-lg font-semibold'>Dados para Pagamento</h3>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name="cpfCnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <CpfMaskInput
                          value={field.value}
                          onChange={field.onChange}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tipoContratacao'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Contratação</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecione' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='CLT'>CLT</SelectItem>
                          <SelectItem value='PJ'>PJ</SelectItem>
                          <SelectItem value='Autônomo'>Autônomo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='banco'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banco</FormLabel>
                      <FormControl>
                        <Input placeholder='Nubank' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='agencia'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agência</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='conta'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conta</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tipoConta'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Conta</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecione' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Corrente'>Corrente</SelectItem>
                          <SelectItem value='Poupança'>Poupança</SelectItem>
                          <SelectItem value='Pagamento'>Pagamento</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='percentualRepasse'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>% de Repasse</FormLabel>
                    <FormControl>
                      <Input placeholder='60' type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Dados para Administração da Agenda */}
          <Card>
            <CardContent className='p-6 space-y-4'>
              <h3 className='text-lg font-semibold'>Administração da Agenda</h3>
              <FormField
                control={form.control}
                name='diasAtendimento'
                render={() => (
                  <FormItem>
                    <FormLabel>Dias de Atendimento</FormLabel>
                    <div className='grid grid-cols-2 gap-4'>
                      {/* Coluna 1: segunda a sexta */}
                      <div className='flex flex-col gap-2'>
                        {diasDaSemana
                          .filter(d =>
                            [
                              'Seg',
                              'Ter',
                              'Quar',
                              'Qui',
                              'Sex',
                            ].includes(d.value),
                          )
                          .map(dia => (
                            <FormField
                              key={dia.value}
                              control={form.control}
                              name='diasAtendimento'
                              render={({ field }) => (
                                <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(dia.value)}
                                      onCheckedChange={checked => {
                                        const isChecked = checked === true;
                                        const newValue = isChecked
                                          ? [...(field.value || []), dia.value]
                                          : field.value?.filter(
                                              v => v !== dia.value,
                                            );
                                        field.onChange(newValue);
                                      }}
                                    />
                                  </FormControl>
                                  <Label className='text-sm font-normal'>
                                    {dia.label}
                                  </Label>
                                </FormItem>
                              )}
                            />
                          ))}
                      </div>

                      {/* Coluna 2: sábado e domingo */}
                      <div className='flex flex-col gap-2'>
                        {diasDaSemana
                          .filter(d => ['Sab', 'Dom'].includes(d.value))
                          .map(dia => (
                            <FormField
                              key={dia.value}
                              control={form.control}
                              name='diasAtendimento'
                              render={({ field }) => (
                                <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(dia.value)}
                                      onCheckedChange={checked => {
                                        const isChecked = checked === true;
                                        const newValue = isChecked
                                          ? [...(field.value || []), dia.value]
                                          : field.value?.filter(
                                              v => v !== dia.value,
                                            );
                                        field.onChange(newValue);
                                      }}
                                    />
                                  </FormControl>
                                  <Label className='text-sm font-normal'>
                                    {dia.label}
                                  </Label>
                                </FormItem>
                              )}
                            />
                          ))}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name='horarioInicio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora de início do expediente</FormLabel>
                      <FormControl>
                        <Input type='time' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='horarioFim'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora do fim do expediente</FormLabel>
                      <FormControl>
                        <Input type='time' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='intervalo'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intervalo entre atendimentos (min)</FormLabel>
                      <FormControl>
                        <Input type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              className='bg-muted-foreground border-none hover:bg-gray-800'
              onClick={() => navigate('/medicos')}
            >
              Cancelar
            </Button>
            <Button type='submit'>Cadastrar Médico</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
