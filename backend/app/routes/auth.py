from __future__ import annotations  # ✅ PRIMEIRA LINHA SEMPRE

from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from fastapi_jwt_auth import AuthJWT
from passlib.hash import bcrypt

from app.database import get_db
from app.schemas.auth import UserCreate, UserLogin
from app.models.user import User  # ✅ Importando diretamente o modelo

router = APIRouter()

# 🔹 Registro de usuário
@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter_by(email=user.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    hashed_pw = bcrypt.hash(user.password)
    db_user = User(name=user.name, email=user.email, hashed_password=hashed_pw)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {"msg": "Usuário registrado com sucesso"}

# 🔹 Login de usuário
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    db_user = db.query(User).filter_by(email=user.email).first()  # ✅ Aqui também usa `User` direto

    if not db_user or not bcrypt.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")

    access_token = Authorize.create_access_token(subject=user.email)
    return {"access_token": access_token}
