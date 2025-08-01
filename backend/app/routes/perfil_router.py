# app/routes/perfil_router.py

from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user_model import User
from app.models.paciente_model import Paciente
from app.models.medico_model import Medico
from app.dependencies.auth import get_current_user_com_clinica

perfil_router = APIRouter(prefix="/{clinica}/perfil", tags=["Perfil"])

@perfil_router.get("/")
def get_perfil(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_com_clinica)
):
    dados = {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "perfil": current_user.perfil,
    }

    # Paciente
    if current_user.perfil == "paciente":
        print("🧪 Buscando paciente com user_id:", current_user.id)
        paciente = db.query(Paciente).filter_by(user_id=current_user.id).first()
        print("🔍 Paciente encontrado:", paciente)
        if paciente:
            dados.update({
                "telefone": paciente.telefone,
                "sexo": paciente.sexo,
                "data_nascimento": paciente.data_nascimento,
                "cpf": paciente.cpf,
                "fotoUrl": f"{request.base_url}{paciente.foto_path}" if paciente.foto_path else None
            })

    # Médico
    elif current_user.perfil == "medico":
        medico = db.query(Medico).filter_by(email=current_user.email).first()
        if medico:
            dados.update({
                "telefone": medico.telefone,
                "especialidade": medico.especialidade,
                "crm": medico.crm,
                "fotoUrl": f"{request.base_url}{medico.foto}" if medico.foto else None
            })

    return dados
