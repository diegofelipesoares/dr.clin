from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
from datetime import date
import os

from app.database import get_db
from app.models.paciente_model import Paciente
from app.models.user_model import User
from app.schemas.paciente_schema import PacienteResponse
from app.dependencies.auth import get_current_user_com_clinica
from app.utils.image_utils import salvar_foto  # 👈 reutilizando o utilitário já usado em médicos

router = APIRouter(prefix="/{clinica}/pacientes", tags=["Pacientes"])

@router.post("/", response_model=PacienteResponse)
def criar_paciente(
    nome: str = Form(...),
    email: str = Form(...),
    telefone: Optional[str] = Form(None),
    sexo: Optional[str] = Form(None),
    data_nascimento: Optional[date] = Form(None),
    cpf: Optional[str] = Form(None),
    endereco: Optional[str] = Form(None),
    convenio: Optional[str] = Form(None),
    observacoes: Optional[str] = Form(None),
    foto: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_user_com_clinica),
    db: Session = Depends(get_db),
):
    # 🔎 Verifica se já existe usuário com esse e-mail e mesma clínica
    usuario = db.query(User).filter(
        User.email == email,
        User.clinica_id == current_user.clinica_id
    ).first()

    if usuario:
        # Se for um usuário comum, atualiza o perfil para paciente
        if usuario.perfil == "usuario":
            usuario.perfil = "paciente"
            db.commit()

        user_id = usuario.id
    else:
        # ➕ Cria novo usuário com perfil "paciente"
        novo_usuario = User(
            name=nome,
            email=email,
            hashed_password="",  # ainda sem senha
            perfil="paciente",
            clinica_id=current_user.clinica_id
        )
        db.add(novo_usuario)
        db.commit()
        db.refresh(novo_usuario)
        user_id = novo_usuario.id

        # TODO: Enviar e-mail com link para criação de senha

    # 🚫 Verifica se já existe paciente vinculado a esse user_id
    if db.query(Paciente).filter_by(user_id=user_id).first():
        raise HTTPException(status_code=400, detail="Paciente já está cadastrado.")

    # 🩺 Cria o paciente associado ao usuário encontrado ou criado
    paciente = Paciente(
        user_id=user_id,
        clinica_id=current_user.clinica_id,
        telefone=telefone,
        sexo=sexo,
        data_nascimento=data_nascimento,
        cpf=cpf,
        observacoes=observacoes,
        endereco=endereco,
        convenio=convenio,
    )
    db.add(paciente)
    db.commit()
    db.refresh(paciente)

    # 📷 Salva foto, se enviada
    if foto:
        pasta_destino = f"static/pacientes/{paciente.id}"
        os.makedirs(pasta_destino, exist_ok=True)
        caminho_arquivo = os.path.join(pasta_destino, "foto.jpg")
        salvar_foto(foto, caminho_arquivo)
        paciente.foto_path = caminho_arquivo
        db.commit()

    return paciente

@router.put("/{id}", response_model=PacienteResponse)
def atualizar_paciente(
    id: int,
    telefone: Optional[str] = Form(None),
    sexo: Optional[str] = Form(None),
    data_nascimento: Optional[date] = Form(None),
    cpf: Optional[str] = Form(None),
    endereco: Optional[str] = Form(None),
    convenio: Optional[str] = Form(None),
    observacoes: Optional[str] = Form(None),
    foto: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_user_com_clinica),
    db: Session = Depends(get_db),
):
    paciente = db.query(Paciente).filter_by(id=id, clinica_id=current_user.clinica_id).first()

    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")

    # Atualiza dados preenchidos
    paciente.telefone = telefone
    paciente.sexo = sexo
    paciente.data_nascimento = data_nascimento
    paciente.cpf = cpf
    paciente.observacoes = observacoes
    paciente.endereco = endereco
    paciente.convenio = convenio

    # Se veio nova imagem, substitui
    if foto:
        pasta_destino = f"static/pacientes/{paciente.id}"
        os.makedirs(pasta_destino, exist_ok=True)
        caminho_arquivo = os.path.join(pasta_destino, "foto.jpg")
        salvar_foto(foto, caminho_arquivo)
        paciente.foto_path = caminho_arquivo

    db.commit()
    db.refresh(paciente)

    return paciente