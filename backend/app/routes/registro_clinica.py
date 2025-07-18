# app/routes/registro_clinica.py

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.clinica_model import Clinica
from app.models.user_model import User
from passlib.hash import bcrypt

router = APIRouter()

# ----- SCHEMAS DE ENTRADA -----
class ClinicaData(BaseModel):
    nome: str
    cnpj: Optional[str]
    dominio: str

class AdminData(BaseModel):
    nome: str
    email: EmailStr
    senha: str

class RegistroRequest(BaseModel):
    plano: str
    formaPagamento: str
    clinica: ClinicaData
    admin: AdminData

# ----- ENDPOINT -----
@router.post("/registro-clinica")
def registrar_clinica(payload: RegistroRequest, db: Session = Depends(get_db)):
    # 🔒 Verifica se já existe subdomínio em uso
    if db.query(Clinica).filter(Clinica.dominio == payload.clinica.dominio).first():
        raise HTTPException(status_code=400, detail="Subdomínio já está em uso")

    # 🔒 Verifica se já existe nome de clínica
    if db.query(Clinica).filter(Clinica.nome == payload.clinica.nome).first():
        raise HTTPException(status_code=400, detail="Nome da clínica já está em uso")

    # 🔒 Verifica se CNPJ já está cadastrado (se foi fornecido)
    if payload.clinica.cnpj:
        if db.query(Clinica).filter(Clinica.cnpj == payload.clinica.cnpj).first():
            raise HTTPException(status_code=400, detail="CNPJ já cadastrado")

    # ✅ Cria a nova clínica
    nova_clinica = Clinica(
        nome=payload.clinica.nome,
        cnpj=payload.clinica.cnpj,
        dominio=payload.clinica.dominio,
        plano=payload.plano,
        forma_pagamento=payload.formaPagamento,
    )
    db.add(nova_clinica)
    db.commit()
    db.refresh(nova_clinica)

    # 🔒 Verifica se já existe um administrador com mesmo e-mail nessa clínica
    admin_existente = (
        db.query(User)
        .filter(User.email == payload.admin.email, User.clinica_id == nova_clinica.id)
        .first()
    )
    if admin_existente:
        raise HTTPException(status_code=400, detail="Este e-mail já está em uso nesta clínica.")

    # ✅ Cria o novo administrador
    hashed_senha = bcrypt.hash(payload.admin.senha)

    novo_admin = User(
        name=payload.admin.nome,
        email=payload.admin.email,
        hashed_password=hashed_senha,
        clinica_id=nova_clinica.id,
        perfil="admin",
    )
    db.add(novo_admin)
    db.commit()

    return {"subdominio": payload.clinica.dominio}
