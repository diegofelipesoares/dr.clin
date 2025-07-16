# FUNÇÃO: Configuração do BANCO DE DADOS com SQLAlchemy e fornecendo sessões para uso em rotas

# IMPORTAÇÕES
from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv
from app.models.base import Base  # ✅ Base centralizada

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Recupera a URL do banco de dados do .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Cria o engine do SQLAlchemy (conexão com o banco)
engine = create_engine(DATABASE_URL)

# Cria a fábrica de sessões
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Função para fornecer uma sessão de banco de dados nas rotas
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
