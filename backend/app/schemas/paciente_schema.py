# app/schemas/paciente_schema.py

from pydantic import BaseModel
from typing import Optional
from datetime import date

from pydantic import BaseModel, EmailStr, constr

class PacienteCreate(BaseModel):
    nome: constr(min_length=3, max_length=100)
    email: EmailStr
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

class PacienteListaResponse(BaseModel):
    id: int
    nome: str
    email: str
    telefone: Optional[str]
    sexo: Optional[str]
    perfil: str

    class Config:
        orm_mode = True
