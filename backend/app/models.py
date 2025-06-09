# Aqui você colocará os modelos de dados (SQLAlchemy)
from sqlalchemy import Column, Integer, String
from .database import Base

class Paciente(Base):
    __tablename__ = "pacientes"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    email = Column(String, unique=True, index=True)