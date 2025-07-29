import axios from '@/lib/api';
import { PacienteFormValues } from '@/schemas/pacienteSchema';

export async function cadastrarPaciente(
  clinica: string,
  data: PacienteFormValues
) {
  const formData = new FormData();

  //transform the date from dd/mm/yyyy to yyyy-mm-dd
  // This is necessary because the backend expects the date in ISO format
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

  if (data.convenio) {
    formData.append('convenio', data.convenio);
  }

  if (data.observacoes) {
    formData.append('observacoes', data.observacoes);
  }

  if (data.foto && data.foto instanceof File) {
    formData.append('foto', data.foto);
  }

  const response = await axios.post(`/${clinica}/pacientes/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
}
