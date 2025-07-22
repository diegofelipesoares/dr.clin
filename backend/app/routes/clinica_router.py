# app/routes/clinica_router.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.clinica_model import Clinica

router = APIRouter(prefix="/clinicas")  # <- adiciona prefixo para rotas organizadas

# Rota para obter uma clínica por domínio (já existente)
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

# 🆕 Rota para listar todas as clínicas
@router.get("/")
def listar_clinicas(db: Session = Depends(get_db)):
    clinicas = db.query(Clinica).all()
    return [
        {
            "id": c.id,
            "nome": c.nome,
            "dominio": c.dominio,
            "plano": c.plano,
            "forma_pagamento": c.forma_pagamento
        }
        for c in clinicas
    ]

# 🆕 Rota para listar planos disponíveis
@router.get("/planos")
def listar_planos_disponiveis():
    return [
        {"id": 1, "nome": "Essencial", "recursos": ["Consultas", "Pacientes"], "preco": 99.0},
        {"id": 2, "nome": "Profissional", "recursos": ["Consultas", "Pacientes", "Estoque", "Relatórios"], "preco": 199.0},
        {"id": 3, "nome": "Premium", "recursos": ["Tudo incluso + Suporte dedicado"], "preco": 299.0}
    ]
