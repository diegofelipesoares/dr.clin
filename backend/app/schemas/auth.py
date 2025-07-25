# Schema do FastAPI para Validar dados e garantir formatação correta.

#  Essa linha permite o uso de anotações de tipos entre aspas ("UserCreate") para evitar erros de importação circular.
from __future__ import annotations
# Importa base de modelo Pydantic para validação automatica
#BaseModel para todos os sistemas
#EmailStr para validação automatica de emails em formato correto
from pydantic import BaseModel, EmailStr

#Schema de Criação de usúario
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

# Schema de Login de usuário
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Configuração do AuthJWT
class Settings(BaseModel):
    authjwt_secret_key: str = "w4hNz2UJk_3P7mw0qQx6vNf1U5dSL9YoM3ChF9aXE14Q"  # pode pegar do .env

    class Config:
        env_file = ".env"
