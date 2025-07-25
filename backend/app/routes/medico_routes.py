from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import shutil, os, json

from app.database import get_db, SessionLocal
from app.models.medico_model import Medico
from app.models.clinica_model import Clinica
from app.dependencies.auth import get_current_user_com_clinica
from app.utils.image_utils import salvar_foto

router = APIRouter(prefix="/{clinica}/medicos")
UPLOAD_DIR = "uploads/medicos"

# 🔹 Listar médicos
@router.get("/")
def listar_medicos(
    clinica: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user_com_clinica)
):
    clinica_db = db.query(Clinica).filter(Clinica.dominio == clinica).first()
    if not clinica_db:
        raise HTTPException(status_code=404, detail="Clínica não encontrada")

    medicos = db.query(Medico).filter(Medico.clinica_id == clinica_db.id).all()

    resultado = [
        {
            "id": medico.id,
            "nome": medico.nome,
            "pronomeTratamento": medico.pronomeTratamento,
            "especialidade": medico.especialidade,
            "foto": medico.foto,
            "diasAtendimento": medico.diasAtendimento,
            "horarioInicio": medico.horarioInicio,
            "horarioFim": medico.horarioFim,
            "percentualRepasse": medico.percentualRepasse,
        }
        for medico in medicos
    ]

    return JSONResponse(content=resultado)

# 🔹 Criar médico
@router.post("/")
async def criar_medico(
    clinica: str,
    nome: str = Form(...),
    pronomeTratamento: str = Form(...),
    especialidade: str = Form(...),
    crm: str = Form(...),
    email: str = Form(...),
    telefone: str = Form(...),
    tipoContratacao: str = Form(...),
    cpfCnpj: str = Form(...),
    banco: str = Form(None),
    agencia: str = Form(None),
    conta: str = Form(None),
    tipoConta: str = Form(None),
    percentualRepasse: str = Form(None),
    diasAtendimento: str = Form(...),
    horarioInicio: str = Form(None),
    horarioFim: str = Form(None),
    intervalo: str = Form(None),
    foto: UploadFile = File(...),
    user=Depends(get_current_user_com_clinica),
    db: Session = Depends(get_db)
):
    try:
        diasAtendimento = json.loads(diasAtendimento)
        if not isinstance(diasAtendimento, list):
            raise ValueError()
    except Exception:
        raise HTTPException(status_code=400, detail="diasAtendimento deve ser uma lista JSON válida.")

    clinica_db = db.query(Clinica).filter(Clinica.dominio == clinica).first()
    if not clinica_db:
        raise HTTPException(status_code=404, detail="Clínica não encontrada")

    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

    foto_filename = foto.filename.replace(" ", "_")
    foto_path = os.path.join(UPLOAD_DIR, foto_filename)
    salvar_foto(foto, foto_path)

    novo_medico = Medico(
        nome=nome,
        pronomeTratamento=pronomeTratamento,
        especialidade=especialidade,
        crm=crm,
        email=email,
        telefone=telefone,
        tipoContratacao=tipoContratacao,
        cpfCnpj=cpfCnpj,
        banco=banco,
        agencia=agencia,
        conta=conta,
        tipoConta=tipoConta,
        percentualRepasse=percentualRepasse,
        diasAtendimento=diasAtendimento,
        horarioInicio=horarioInicio,
        horarioFim=horarioFim,
        intervalo=intervalo,
        foto=foto_path,
        clinica_id=clinica_db.id,
    )

    db.add(novo_medico)
    db.commit()
    db.refresh(novo_medico)

    return {"message": "Médico cadastrado com sucesso"}

# 🔹 Obter médico
@router.get("/{id}")
def obter_medico(
    clinica: str,
    id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user_com_clinica)
):
    medico = db.query(Medico).filter(Medico.id == id).first()
    if not medico:
        raise HTTPException(status_code=404, detail="Médico não encontrado")

    return {
        "id": medico.id,
        "nome": medico.nome,
        "pronomeTratamento": medico.pronomeTratamento,
        "especialidade": medico.especialidade,
        "crm": medico.crm,
        "email": medico.email,
        "telefone": medico.telefone,
        "tipoContratacao": medico.tipoContratacao,
        "cpfCnpj": medico.cpfCnpj,
        "banco": medico.banco,
        "agencia": medico.agencia,
        "conta": medico.conta,
        "tipoConta": medico.tipoConta,
        "percentualRepasse": medico.percentualRepasse,
        "diasAtendimento": medico.diasAtendimento,
        "horarioInicio": medico.horarioInicio,
        "horarioFim": medico.horarioFim,
        "intervalo": medico.intervalo,
        "foto": medico.foto,
    }

# 🔹 Atualizar médico
@router.put("/{id}")
async def atualizar_medico(
    clinica: str,
    id: int,
    nome: str = Form(...),
    pronomeTratamento: str = Form(...),
    especialidade: str = Form(...),
    crm: str = Form(...),
    email: str = Form(...),
    telefone: str = Form(...),
    tipoContratacao: str = Form(...),
    cpfCnpj: str = Form(...),
    banco: str = Form(None),
    agencia: str = Form(None),
    conta: str = Form(None),
    tipoConta: str = Form(None),
    percentualRepasse: str = Form(None),
    diasAtendimento: str = Form(...),
    horarioInicio: str = Form(None),
    horarioFim: str = Form(None),
    intervalo: str = Form(None),
    foto: UploadFile = File(None),
    user=Depends(get_current_user_com_clinica),
    db: Session = Depends(get_db)
):
    try:
        diasAtendimento = json.loads(diasAtendimento)
        if not isinstance(diasAtendimento, list):
            raise ValueError()
    except Exception:
        raise HTTPException(status_code=400, detail="diasAtendimento deve ser uma lista JSON válida.")

    medico = db.query(Medico).filter(Medico.id == id).first()
    if not medico:
        raise HTTPException(status_code=404, detail="Médico não encontrado")

    medico.nome = nome
    medico.pronomeTratamento = pronomeTratamento
    medico.especialidade = especialidade
    medico.crm = crm
    medico.email = email
    medico.telefone = telefone
    medico.tipoContratacao = tipoContratacao
    medico.cpfCnpj = cpfCnpj
    medico.banco = banco
    medico.agencia = agencia
    medico.conta = conta
    medico.tipoConta = tipoConta
    medico.percentualRepasse = percentualRepasse
    medico.diasAtendimento = diasAtendimento
    medico.horarioInicio = horarioInicio
    medico.horarioFim = horarioFim
    medico.intervalo = intervalo

    if foto:
        if not os.path.exists(UPLOAD_DIR):
            os.makedirs(UPLOAD_DIR)

        foto_filename = foto.filename.replace(" ", "_")
        foto_path = os.path.join(UPLOAD_DIR, foto_filename)
        salvar_foto(foto, foto_path)
        medico.foto = foto_path

    db.commit()
    return {"message": "Médico atualizado com sucesso"}

# 🔹 Deletar médico
@router.delete("/{id}")
def deletar_medico(
    clinica: str,
    id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user_com_clinica)
):
    medico = db.query(Medico).filter(Medico.id == id).first()
    if not medico:
        raise HTTPException(status_code=404, detail="Médico não encontrado")

    if medico.foto and os.path.exists(medico.foto):
        os.remove(medico.foto)

    db.delete(medico)
    db.commit()

    return {"message": "Médico excluído com sucesso"}
