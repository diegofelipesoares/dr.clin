# app/routes/auth_protected.py
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from sqlalchemy.orm import Session

from app.models.user_model import User
from app.dependencies.auth import get_current_user_com_clinica

protected_auth_router = APIRouter(prefix="/{clinica}/auth", tags=["Auth"])

# Rota protegida para obter o usuário autenticado
@protected_auth_router.get("/me")
def get_me(request: Request, current_user: User = Depends(get_current_user_com_clinica)):
    foto_url = None
    if current_user.foto:
        foto_url = f"{request.base_url}static/users/{current_user.id}/{current_user.foto}"
        #foto_url = request.url_for("static", path=f"pacientes/{current_user.id}/{current_user.foto}")

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "perfil": current_user.perfil,
        "fotoUrl": foto_url
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