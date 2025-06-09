from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Paciente

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/pacientes")
def listar_pacientes(db: Session = Depends(get_db)):
    return db.query(Paciente).all()