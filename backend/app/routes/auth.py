from typing import Any, Optional, List
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from fastapi_jwt_auth import AuthJWT
from passlib.hash import bcrypt
from app import schemas, models, database
from app.schemas.auth import UserCreate, UserLogin

router = APIRouter()

# 🔹 Registro de usuário
@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(database.SessionLocal)):
    # Verifica se o email já está cadastrado
    if db.query(models.user.User).filter_by(email=user.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    # Hash da senha
    hashed_pw = bcrypt.hash(user.password)
    db_user = models.user.User(name=user.name, email=user.email, hashed_password=hashed_pw)

    # Salva o usuário no banco
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Retorna uma mensagem simples de sucesso
    return {"msg": "Usuário registrado com sucesso"}

# 🔹 Login de usuário
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(database.SessionLocal), Authorize: AuthJWT = Depends()):
    db_user = db.query(models.user.User).filter_by(email=user.email).first()

    # Verifica credenciais
    if not db_user or not bcrypt.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")

    # Cria token JWT usando email como "subject"
    access_token = Authorize.create_access_token(subject=user.email)
    return {"access_token": access_token}
