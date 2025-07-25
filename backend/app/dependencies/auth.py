from fastapi import Depends, HTTPException, Request
from fastapi_jwt_auth import AuthJWT
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user_model import User
from app.models.clinica_model import Clinica

def get_current_user_com_clinica(
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends(),
    request: Request = None
) -> User:
    Authorize.jwt_required()

    # Recupera subdomínio da URL (ex: /clinicanova/medicos)
    subdominio = request.path_params.get("clinica")
    if not subdominio:
        raise HTTPException(status_code=400, detail="Subdomínio ausente na URL")

    # Recupera claims do token
    claims = Authorize.get_raw_jwt()
    clinica_id_token = claims.get("clinica_id")
    email = Authorize.get_jwt_subject()

    # Valida clínica
    clinica = db.query(Clinica).filter_by(dominio=subdominio).first()
    if not clinica or clinica.id != clinica_id_token:
        raise HTTPException(status_code=403, detail="Usuário não pertence à clínica informada")

    # Busca o usuário
    user = db.query(User).filter_by(email=email, clinica_id=clinica.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    return user
