# app/dependencies/auth.py

from fastapi import Depends, HTTPException, Request
from fastapi_jwt_auth import AuthJWT
from sqlalchemy.orm import Session

from app.models.user_model import User
from app.models.clinica_model import Clinica
from app.database import get_db

def get_current_user_com_clinica(
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends(),
    request: Request = None
) -> User:
    Authorize.jwt_required()

    email = Authorize.get_jwt_subject()
    subdominio = request.headers.get("x-clinica-subdominio")

    if not subdominio:
        raise HTTPException(status_code=400, detail="Cabeçalho de subdomínio ausente")

    user = db.query(User).filter_by(email=email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    clinica = db.query(Clinica).filter_by(id=user.clinica_id).first()
    if not clinica or clinica.dominio != subdominio:
        raise HTTPException(status_code=403, detail="Usuário não pertence à clínica informada")

    return user
