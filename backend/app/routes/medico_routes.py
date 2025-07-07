from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.models.medico_model import Medico
from app.database import SessionLocal
import shutil
import os

router = APIRouter(prefix="/medicos")

@router.get("/")
def listar_medicos():
    db = SessionLocal()
    medicos = db.query(Medico).all()

    # Converte para dicionário serializável (evita erro com objetos SQLAlchemy)
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

@router.post("/")
async def criar_medico(
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
    diasAtendimento: list[str] = Form(...),
    horarioInicio: str = Form(None),
    horarioFim: str = Form(None),
    intervalo: str = Form(None),
    foto: UploadFile = File(...)
):
    db = SessionLocal()

    foto_path = f"uploads/{foto.filename}"
    with open(foto_path, "wb") as buffer:
        shutil.copyfileobj(foto.file, buffer)

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
        foto=foto_path
    )

    db.add(novo_medico)
    db.commit()
    db.refresh(novo_medico)

    return {"message": "Médico cadastrado com sucesso"}
