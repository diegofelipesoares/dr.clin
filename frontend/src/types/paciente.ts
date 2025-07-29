// src/types/paciente.ts
export interface PacienteLista {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  sexo?: string;
  perfil: string;
}
