from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
from sqlalchemy.orm import Session
from fastapi_jwt_auth import AuthJWT

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


# ----- ENDPOINT DE REGISTRO COMPLETO COM TOKEN -----
@router.post("/registro-clinica")
def registrar_clinica(
    payload: RegistroRequest,
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends()  # usado apenas para gerar o token
):
    # 🔒 Verifica se subdomínio está em uso
    if db.query(Clinica).filter(Clinica.dominio == payload.clinica.dominio).first():
        raise HTTPException(status_code=400, detail="Subdomínio já está em uso")

    # 🔒 Verifica se nome de clínica está em uso
    if db.query(Clinica).filter(Clinica.nome == payload.clinica.nome).first():
        raise HTTPException(status_code=400, detail="Nome da clínica já está em uso")

    # 🔒 Verifica se CNPJ está em uso
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

    # 🔒 Verifica se e-mail do admin já existe para esta clínica
    admin_existente = (
        db.query(User)
        .filter(User.email == payload.admin.email, User.clinica_id == nova_clinica.id)
        .first()
    )
    if admin_existente:
        raise HTTPException(status_code=400, detail="Este e-mail já está em uso nesta clínica.")

    # ✅ Cria o admin
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
    db.refresh(novo_admin)

    # ✅ Gera o token JWT — sem exigir token de entrada!
    access_token = Authorize.create_access_token(
    subject=novo_admin.email,
    user_claims={"clinica_id": nova_clinica.id}
)

    # ✅ Retorna token + subdomínio + dados do admin
    return {
        "access_token": access_token,
        "subdominio": nova_clinica.dominio,
        "user": {
            "id": novo_admin.id,
            "nome": novo_admin.name,
            "email": novo_admin.email,
            "perfil": novo_admin.perfil,
        }
    }
