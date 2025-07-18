# app/routes/clinica_router.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.clinica_model import Clinica

router = APIRouter()

@router.get("/clinicas/{dominio}")
def obter_clinica_por_dominio(dominio: str, db: Session = Depends(get_db)):
    clinica = db.query(Clinica).filter_by(dominio=dominio).first()
    if not clinica:
        raise HTTPException(status_code=404, detail="Clínica não encontrada")
    return {
        "id": clinica.id,
        "nome": clinica.nome,
        "dominio": clinica.dominio,
        "plano": clinica.plano,
        "forma_pagamento": clinica.forma_pagamento
    }

