#Molde Python para criar e manipular registro da tabela users.
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint # Importando tipos de dados do SQLAlchemy
from sqlalchemy.orm import relationship # Importando relacionamento entre tabelas
from app.models.base import Base

class User(Base): #Classe user como tabela baseada na classe Base do SQLAlchemy
    __tablename__ = "users"

    #colunas da tabela users
    id = Column(Integer, primary_key=True, index=True) #pk identifica unicamente cada usuário
    name = Column(String(100)) #nome de usuário com até 100 caracteres
    email = Column(String(100), index=True, nullable=False) #index para busca rápida
    hashed_password = Column(String, nullable=False) #campo para senha 256 caracteres para armazenar hash

    perfil = Column(String, nullable=False)  # paciente, medico, ajudante, secretario, admin
    clinica_id = Column(Integer, ForeignKey("clinicas.id"))

    clinica = relationship("Clinica", back_populates="usuarios")  # Relacionamento com a tabela Clinica

    __table_args__ = (
            UniqueConstraint("email", "clinica_id", name="uix_email_clinica"),
        )

    # Representação do objeto User no terminal, útil para debugs
    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email})>"