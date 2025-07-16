# models/consultorio_model.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class Consultorio(Base):
    __tablename__ = 'consultorios'

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    clinica_id = Column(Integer, ForeignKey('clinicas.id'))

    clinica = relationship("Clinica", back_populates="consultorios")