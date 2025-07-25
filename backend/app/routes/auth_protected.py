# app/routes/auth_protected.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.user_model import User
from app.dependencies.auth import get_current_user_com_clinica

protected_auth_router = APIRouter(prefix="/{clinica}/auth", tags=["Auth"])

# Rota protegida para obter o usuário autenticado
@protected_auth_router.get("/me")
def get_me(current_user: User = Depends(get_current_user_com_clinica)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "perfil": current_user.perfil,
    }
