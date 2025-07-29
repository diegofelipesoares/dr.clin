# app/routes/auth_public.py
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi_jwt_auth import AuthJWT
from sqlalchemy.orm import Session
from passlib.hash import bcrypt

from app.database import get_db
from app.schemas.auth import UserCreate, UserLogin
from app.models.user_model import User
from app.models.clinica_model import Clinica

public_auth_router = APIRouter()

# Rota de registro (usada em /clinicas/:nome/register)
@public_auth_router.post("/clinicas/{nome}/register")
def register(nome: str, user: UserCreate, db: Session = Depends(get_db)):
    clinica = db.query(Clinica).filter_by(dominio=nome).first()
    if not clinica:
        raise HTTPException(status_code=404, detail="Clínica não encontrada")

    # Impede duplicação de e-mail na mesma clínica, mas permite em clínicas diferentes
    if db.query(User).filter_by(email=user.email, clinica_id=clinica.id).first():
        raise HTTPException(status_code=400, detail="Este e-mail já está em uso nesta clínica.")


    hashed_pw = bcrypt.hash(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pw,
        perfil="usuario",
        clinica_id=clinica.id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {"msg": "Usuário registrado com sucesso"}


# Rota de login
@public_auth_router.post("/clinicas/{subdominio}/auth/login")
def login(subdominio: str, user: UserLogin, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    # 🏥 Valida subdomínio
    clinica = db.query(Clinica).filter_by(dominio=subdominio).first()
    if not clinica:
        raise HTTPException(status_code=404, detail="Clínica não encontrada")

    # 👤 Busca usuário da clínica correta
    db_user = db.query(User).filter_by(email=user.email, clinica_id=clinica.id).first()
    if not db_user or not bcrypt.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")

    # 🔐 Cria token com clinica_id
    access_token = Authorize.create_access_token(
        subject=user.email,
        user_claims={"clinica_id": db_user.clinica_id}
    )

    return {
        "access_token": access_token,
        "clinica_dominio": clinica.dominio,
        "perfil": db_user.perfil,
        "name": db_user.name,
        "email": db_user.email
    }

