# importação necessária para evitar erros de importação circular
from __future__ import annotations  # ✅ PRIMEIRA LINHA SEMPRE

# Importações necessárias para o FastAPI e autenticação JWT
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi_jwt_auth import AuthJWT

# Importação do bcrypt para hash de senhas
from passlib.hash import bcrypt

#Importações relativas ao banco de dados e modelos
from app.database import get_db
from sqlalchemy.orm import Session
from app.schemas.auth import UserCreate, UserLogin
from app.models.user_model import User  # ✅ Importando diretamente o modelo
from app.models.clinica_model import Clinica  # ✅ Importando o modelo de Clínica

# Criação do roteador para as rotas de autenticação
router = APIRouter()

# Criação das rotas
# 🔹 Rota de Registro de usuário
@router.post("/clinicas/{nome}/register")
def register(nome: str, user: UserCreate, db: Session = Depends(get_db)):

    # Verifica se a clínica existe
    clinica = db.query(Clinica).filter_by(dominio=nome).first()
    if not clinica:
        raise HTTPException(status_code=404, detail="Clínica não encontrada")

    # Verifica se o email já foi cadastrado
    if db.query(User).filter_by(email=user.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    # Cria o novo usuário vinculado à clínica
    hashed_pw = bcrypt.hash(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pw,
        perfil="paciente",
        clinica_id=clinica.id
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {"msg": "Usuário registrado com sucesso"}

# 🔹 Rota de Login de usuário
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    db_user = db.query(User).filter_by(email=user.email).first()

    if not db_user or not bcrypt.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")

    access_token = Authorize.create_access_token(subject=user.email)

    # 🔹 Busca o domínio da clínica associada ao usuário
    clinica = db.query(Clinica).filter(Clinica.id == db_user.clinica_id).first()

    return {
        "access_token": access_token,
        "clinica_dominio": clinica.dominio,  # ← esse valor deve ser usado no frontend para redirecionar
        "perfil": db_user.perfil,
        "name": db_user.name,
        "email": db_user.email
    }


# 🔹 Rota para obter o usuário autenticado (GET /auth/me)
@router.get("/me")
def get_me(Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    try:
        Authorize.jwt_required()  # Garante que o token está presente e válido
        email = Authorize.get_jwt_subject()  # Extrai o email do token
        user = db.query(User).filter_by(email=email).first()

        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")


