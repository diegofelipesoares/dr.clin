from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.clinica_model import Clinica
from app.schemas.clinica_schema import ClinicaOut

router = APIRouter(prefix="/clinicas")

# Rota para obter uma clínica por domínio
@router.get("/{dominio}")
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

# ✅ Rota profissional com response_model
@router.get("/", response_model=List[ClinicaOut])
def listar_clinicas(db: Session = Depends(get_db)):
    return db.query(Clinica).all()

# Rota para planos disponíveis
@router.get("/planos")
def listar_planos_disponiveis():
    return [
        {"id": 1, "nome": "Essencial", "recursos": ["Consultas", "Pacientes"], "preco": 99.0},
        {"id": 2, "nome": "Profissional", "recursos": ["Consultas", "Pacientes", "Estoque", "Relatórios"], "preco": 199.0},
        {"id": 3, "nome": "Premium", "recursos": ["Tudo incluso + Suporte dedicado"], "preco": 299.0}
    ]
