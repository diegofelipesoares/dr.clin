# app/routes/paciente_routes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.paciente_model import Paciente
from app.models.user_model import User
from app.schemas.paciente_schema import PacienteCreate, PacienteResponse
from app.dependencies.auth import get_current_user_com_clinica

router = APIRouter(prefix="/{clinica}/pacientes", tags=["Pacientes"])

# 🔹 Criar paciente (dados clínicos vinculados a user já existente)
@router.post("/", response_model=PacienteResponse)
def criar_paciente(
    paciente_data: PacienteCreate,
    current_user: User = Depends(get_current_user_com_clinica),
    db: Session = Depends(get_db)
):
    # Garante que o paciente ainda não foi criado para este usuário
    if db.query(Paciente).filter_by(user_id=current_user.id).first():
        raise HTTPException(status_code=400, detail="Paciente já cadastrado")

    paciente = Paciente(
        user_id=current_user.id,
        clinica_id=current_user.clinica_id,
        **paciente_data.dict()
    )

    db.add(paciente)
    db.commit()
    db.refresh(paciente)

    return paciente

# 🔹 Listar pacientes da clínica
@router.get("/", response_model=list[PacienteResponse])
def listar_pacientes(
    current_user: User = Depends(get_current_user_com_clinica),
    db: Session = Depends(get_db)
):
    pacientes = db.query(Paciente).filter_by(clinica_id=current_user.clinica_id).all()
    return pacientes

# 🔹 Obter paciente por ID
@router.get("/{id}", response_model=PacienteResponse)
def obter_paciente(
    id: int,
    current_user: User = Depends(get_current_user_com_clinica),
    db: Session = Depends(get_db)
):
    paciente = db.query(Paciente).filter_by(id=id, clinica_id=current_user.clinica_id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")
    return paciente

# 🔹 Atualizar paciente
@router.put("/{id}", response_model=PacienteResponse)
def atualizar_paciente(
    id: int,
    paciente_data: PacienteCreate,
    current_user: User = Depends(get_current_user_com_clinica),
    db: Session = Depends(get_db)
):
    paciente = db.query(Paciente).filter_by(id=id, clinica_id=current_user.clinica_id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")

    for key, value in paciente_data.dict().items():
        setattr(paciente, key, value)

    db.commit()
    db.refresh(paciente)
    return paciente

# 🔹 Deletar paciente
@router.delete("/{id}")
def deletar_paciente(
    id: int,
    current_user: User = Depends(get_current_user_com_clinica),
    db: Session = Depends(get_db)
):
    paciente = db.query(Paciente).filter_by(id=id, clinica_id=current_user.clinica_id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")
    db.delete(paciente)
    db.commit()
    return {"detail": "Paciente deletado com sucesso"}
