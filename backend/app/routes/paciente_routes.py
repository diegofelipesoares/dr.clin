from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.paciente_model import Paciente
from app.models.user_model import User
from app.models.clinica_model import Clinica
from app.schemas.paciente_schema import PacienteCreate, PacienteResponse
from fastapi_jwt_auth import AuthJWT

router = APIRouter(prefix="/{clinica}/pacientes", tags=["Pacientes"])

# 🔹 Criar paciente (dados clínicos vinculados a user já existente)
@router.post("/", response_model=PacienteResponse)
def criar_paciente(
    clinica: str,
    paciente_data: PacienteCreate,
    Authorize: AuthJWT = Depends(),
    db: Session = Depends(get_db)
):
    Authorize.jwt_required()
    user_email = Authorize.get_jwt_subject()

    user = db.query(User).filter_by(email=user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    clinica_db = db.query(Clinica).filter_by(dominio=clinica).first()
    if not clinica_db:
        raise HTTPException(status_code=404, detail="Clínica não encontrada")

    # Garante que o paciente ainda não foi criado para este usuário
    if db.query(Paciente).filter_by(user_id=user.id).first():
        raise HTTPException(status_code=400, detail="Paciente já cadastrado")

    paciente = Paciente(
        user_id=user.id,
        clinica_id=clinica_db.id,
        **paciente_data.dict()
    )

    db.add(paciente)
    db.commit()
    db.refresh(paciente)

    return paciente

# 🔹 Listar pacientes da clínica
@router.get("/", response_model=list[PacienteResponse])
def listar_pacientes(clinica: str, db: Session = Depends(get_db)):
    clinica_db = db.query(Clinica).filter_by(dominio=clinica).first()
    if not clinica_db:
        raise HTTPException(status_code=404, detail="Clínica não encontrada")

    pacientes = db.query(Paciente).filter_by(clinica_id=clinica_db.id).all()
    return pacientes

# 🔹 Obter paciente por ID
@router.get("/{id}", response_model=PacienteResponse)
def obter_paciente(clinica: str, id: int, db: Session = Depends(get_db)):
    paciente = db.query(Paciente).filter_by(id=id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")
    return paciente

# 🔹 Atualizar paciente
@router.put("/{id}", response_model=PacienteResponse)
def atualizar_paciente(
    clinica: str,
    id: int,
    paciente_data: PacienteCreate,
    db: Session = Depends(get_db)
):
    paciente = db.query(Paciente).filter_by(id=id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")

    for key, value in paciente_data.dict().items():
        setattr(paciente, key, value)

    db.commit()
    db.refresh(paciente)
    return paciente
