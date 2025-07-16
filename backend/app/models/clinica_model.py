# models/clinica_model.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.models.base import Base
import datetime

class Clinica(Base):
    __tablename__ = 'clinicas'

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    dominio = Column(String, unique=True, nullable=False)
    cnpj = Column(String, unique=True, nullable=False)
    telefone = Column(String)
    endereco = Column(String)
    data_criacao = Column(DateTime, default=datetime.datetime.utcnow)

    consultorios = relationship("Consultorio", back_populates="clinica")
    usuarios = relationship("User", back_populates="clinica")
    medicos = relationship("Medico", back_populates="clinica")
