import { PacienteFormValues } from '@/schemas/pacienteSchema';
import { PacienteLista } from '@/types/paciente';
import api from '@/lib/api';

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
export async function cadastrarPaciente(clinica: string, data: PacienteFormValues) {
  const formData = new FormData();

  function formatDateToISO(dataBR: string): string {
    const [dia, mes, ano] = dataBR.split('/');
    return `${ano}-${mes}-${dia}`; // yyyy-mm-dd
  }

  formData.append('nome', data.nome);
  formData.append('email', data.email);
  formData.append('cpf', data.cpf);
  formData.append('telefone', data.telefone);
  formData.append('data_nascimento', formatDateToISO(data.dataNascimento));
  formData.append('sexo', data.sexo);
  formData.append('endereco', data.endereco);

  if (data.convenio) formData.append('convenio', data.convenio);
  if (data.observacoes) formData.append('observacoes', data.observacoes);
  if (data.foto instanceof File) formData.append('foto', data.foto);

  const response = await api.post(`/${clinica}/pacientes/`, formData);
  return response.data;
}

// 🔹 PUT - Atualizar paciente
export async function atualizarPaciente(
  clinica: string,
  id: number,
  data: PacienteFormValues
) {
  const formData = new FormData();

  function formatDateToISO(dataBR: string): string {
    const [dia, mes, ano] = dataBR.split('/');
    return `${ano}-${mes}-${dia}`;
  }

  formData.append('telefone', data.telefone);
  formData.append('cpf', data.cpf);
  formData.append('sexo', data.sexo);
  formData.append('data_nascimento', formatDateToISO(data.dataNascimento));
  formData.append('endereco', data.endereco);
  formData.append('convenio', data.convenio ?? '');
  formData.append('observacoes', data.observacoes ?? '');

  if (data.foto instanceof File) {
    formData.append('foto', data.foto);
  }

  const response = await api.put(`/${clinica}/pacientes/${id}`, formData);
  return response.data;
}

// 🔹 DELETE - Excluir paciente
export const deletePaciente = async (clinica: string, id: number) => {
  await api.delete(`/${clinica}/pacientes/${id}`);
};
