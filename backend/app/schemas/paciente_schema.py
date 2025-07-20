# app/schemas/paciente_schema.py

from pydantic import BaseModel
from typing import Optional
from datetime import date

class PacienteCreate(BaseModel):
    telefone: Optional[str]
    sexo: Optional[str]
    data_nascimento: Optional[date]
    cpf: Optional[str]
    observacoes: Optional[str]

class PacienteResponse(BaseModel):
    id: int
    telefone: Optional[str]
    sexo: Optional[str]
    data_nascimento: Optional[date]
    cpf: Optional[str]
    observacoes: Optional[str]

    class Config:
        orm_mode = True
