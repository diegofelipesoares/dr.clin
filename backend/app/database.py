#FUNÇÃO: Configuração do BANCO DE DADOS com SQLAlchemy e fornecendo sessões para uso em rotas

#IMPORTAÇÕES
from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv #importa função para carregar variáveis de ambiente do arquivo .env

load_dotenv() #carrega os dados do .env

# Recupera (get) o valor DATABASE_URL que está no .env de forma segura
DATABASE_URL = os.getenv("DATABASE_URL")
# Criar a conexão com o banco de dados PostgreSQL
# Usando a URL: DATABASE_URL 
engine = create_engine(DATABASE_URL)
# Criar uma fábrica de sessões para interagir com o banco de dados
SessionLocal = sessionmaker(
    autocommit=False, # Eu defino quando salvar no banco
    autoflush=False, # Eu defino quando atualizar os dados
    bind=engine) # Conecta a sessão ao banco de dados

#Cria a classe base para os modelos do banco de dados
Base = declarative_base()

#Garantge que a conexão com o banco de dados seja fechada após o uso
# Função para obter uma sessão do banco de dados
def get_db() -> Session:
    db = SessionLocal() # Cria uma nova sessão
    try:
        yield db # Entrega a sessão para uso (em rotas, por exemplo)
    finally:
        db.close() # Fecha a sessão depois do uso (boa prática!)
