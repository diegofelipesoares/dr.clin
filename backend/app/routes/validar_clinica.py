# app/routes/validar_clinica.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.clinica_model import Clinica
from pydantic import BaseModel

router = APIRouter()

class ClinicaCheck(BaseModel):
    nome: str
    cnpj: str | None = None
    dominio: str

@router.post("/validar-clinica")
def validar_clinica(dados: ClinicaCheck, db: Session = Depends(get_db)):
    if db.query(Clinica).filter(Clinica.nome == dados.nome).first():
        raise HTTPException(status_code=400, detail="nome")

    if dados.cnpj and db.query(Clinica).filter(Clinica.cnpj == dados.cnpj).first():
        raise HTTPException(status_code=400, detail="cnpj")

    if db.query(Clinica).filter(Clinica.dominio == dados.dominio).first():
        raise HTTPException(status_code=400, detail="dominio")

    return {"valido": True}
