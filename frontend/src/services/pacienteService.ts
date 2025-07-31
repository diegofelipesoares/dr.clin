import { PacienteFormValues } from '@/schemas/pacienteSchema';
import { PacienteLista } from '@/types/paciente';
import api from '@/lib/api';

// 🔧 Converte 'dd/mm/yyyy' para 'yyyy-mm-dd'
function formatDateToISO(dataBR?: string): string | undefined {
  if (!dataBR || !dataBR.includes('/')) return undefined;
  const [dia, mes, ano] = dataBR.split('/');
  if (!dia || !mes || !ano) return undefined;
  return `${ano}-${mes}-${dia}`;
}

// 🔹 GET - Buscar todos os pacientes
export async function getPacientes(clinica: string): Promise<PacienteLista[]> {
  const response = await api.get(`/${clinica}/pacientes`);
  return response.data;
}

// 🔹 GET - Buscar um paciente por ID
export async function getPacientePorId(clinica: string, id: number) {
  const response = await api.get(`/${clinica}/pacientes/${id}/detalhes`);
  return response.data;
}

// 🔹 POST - Cadastrar novo paciente
export async function cadastrarPaciente(
  clinica: string,
  data: PacienteFormValues,
) {
  const formData = new FormData();

  formData.append('nome', data.nome);
  formData.append('email', data.email);

  if (data.cpf) formData.append('cpf', data.cpf);
  if (data.telefone) formData.append('telefone', data.telefone);

  const dataISO = formatDateToISO(data.dataNascimento);
  if (dataISO) formData.append('data_nascimento', dataISO);

  if (data.sexo) formData.append('sexo', data.sexo);
  if (data.endereco) formData.append('endereco', data.endereco);
  if (data.convenio) formData.append('convenio', data.convenio);
  if (data.observacoes) formData.append('observacoes', data.observacoes);
  if (data.foto instanceof File) formData.append('foto', data.foto);

  console.log('[Cadastro Paciente] Dados sendo enviados:');
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  const response = await api.post(`/${clinica}/pacientes/`, formData);
  return response.data;
}

// 🔹 PUT - Atualizar paciente
export async function atualizarPaciente(
  clinica: string,
  id: number,
  data: PacienteFormValues,
) {
  const formData = new FormData();

  if (data.telefone) formData.append('telefone', data.telefone);
  if (data.cpf) formData.append('cpf', data.cpf);
  if (data.sexo) formData.append('sexo', data.sexo);

  const dataISO = formatDateToISO(data.dataNascimento);
  if (dataISO) formData.append('data_nascimento', dataISO);

  if (data.endereco) formData.append('endereco', data.endereco);
  if (data.convenio) formData.append('convenio', data.convenio);
  if (data.observacoes) formData.append('observacoes', data.observacoes);
  if (data.foto instanceof File) formData.append('foto', data.foto);

  const response = await api.put(`/${clinica}/pacientes/${id}`, formData);
  return response.data;
}

// 🔹 DELETE - Excluir paciente
export const deletePaciente = async (clinica: string, id: number) => {
  await api.delete(`/${clinica}/pacientes/${id}`);
};
