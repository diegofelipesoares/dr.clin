# app/routes/validar_admin.py

# from fastapi import APIRouter, HTTPException, Depends
# from sqlalchemy.orm import Session
# from pydantic import BaseModel, EmailStr

# from app.database import get_db
# from app.models.clinica_model import Clinica
# from app.models.user_model import User

# router = APIRouter()

# class AdminValidationRequest(BaseModel):
#     email: EmailStr
#     dominio: str

# @router.post("/validar-admin")
# def validar_admin(data: AdminValidationRequest, db: Session = Depends(get_db)):
#     # Busca a clínica com o domínio informado
#     clinica = db.query(Clinica).filter(Clinica.dominio == data.dominio).first()

#     if not clinica:
#         raise HTTPException(status_code=400, detail="clinica_nao_encontrada")

#     # Verifica se o email já está cadastrado para essa clínica
#     usuario_existente = db.query(User).filter(
#         User.email == data.email,
#         User.clinica_id == clinica.id
#     ).first()

#     if usuario_existente:
#         raise HTTPException(status_code=400, detail="email_existente")

#     return {"valido": True}

