# app/models/paciente_model.py

from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class Paciente(Base):
    __tablename__ = "pacientes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    clinica_id = Column(Integer, ForeignKey("clinicas.id"))

    telefone = Column(String, nullable=True)
    sexo = Column(String, nullable=True)
    data_nascimento = Column(Date, nullable=True)
    cpf = Column(String, nullable=True)
    observacoes = Column(String, nullable=True)

    user = relationship("User", back_populates="paciente")
    clinica = relationship("Clinica", back_populates="pacientes")
