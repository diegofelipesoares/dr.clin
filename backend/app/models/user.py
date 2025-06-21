#Molde Python para criar e manipular registro da tabela users.
from sqlalchemy import Column, Integer, String # Importando tipos de dados do SQLAlchemy
from app.database import Base # Importando a base declarativa criada em database.py

class User(Base): #Classe user como tabela baseada na classe Base do SQLAlchemy
    __tablename__ = "users"

    #colunas da tabela users
    id = Column(Integer, primary_key=True, index=True) #pk identifica unicamente cada usuário
    name = Column(String(100)) #nome de usuário com até 100 caracteres
    email = Column(String(100), unique=True, index=True) #index para busca rápida, email único
    hashed_password = Column(String(128)) #campo para senha 128 caracteres para armazenar hash

    # Representação do objeto User no terminal, útil para debugs
    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email})>"