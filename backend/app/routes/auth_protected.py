# app/routes/auth_protected.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
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

# Rota para renovar access token usando refresh token
@protected_auth_router.post("/refresh-token")
def refresh_token(Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_refresh_token_required()
    except AuthJWTException:
        raise HTTPException(status_code=401, detail="Refresh token inválido ou expirado")

    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user)
    return {"access_token": new_access_token}