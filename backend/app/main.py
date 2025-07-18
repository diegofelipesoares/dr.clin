# backend/app/main.py
# Este é o ponto de entrada principal para o backend da aplicação Dr.Clin

# Importa o módulo de logging para registrar eventos e erros
# Isso é útil para depuração e monitoramento da aplicação
import logging
logging.basicConfig(level=logging.DEBUG)


#classe principal do FastAPI
from fastapi import FastAPI 
#Permite React se comunicar com o backend
from fastapi.middleware.cors import CORSMiddleware 
from app.routes import router as api_router # importa o router centralizado
#Base: define modelos de tabelas e engine: motor de conexão com o banco de dados
from app.database import Base, engine 
# StaticFiles: permite servir arquivos estáticos (como imagens, CSS, JS)
from fastapi.staticfiles import StaticFiles
# precisa importar para JWT funcionar, mesmo sem usar diretamente
import app.config 

# ⚠️ Importa o model para que a tabela seja reconhecida
from app.models import medico_model
from app.models import user_model
from app.models import clinica_model
from app.models import consultorio_model

# Cria todas as tabelas automaticamente com base nos modelos definidos
Base.metadata.create_all(bind=engine)

# Instância principal do FastAPI //todo backend roda a partir daqui
app = FastAPI()

# 🧩 CORS: permite que o frontend em React se comunique com o backend
# Necessário quando back roda em um domínio diferente do front (ex: localhost:8000 vs localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # domínio permitido para comunicação com a API (React em desenvolvimento) (Vercel mais tarde)
    allow_credentials=True, # permite envio de cookies/autenticação
    allow_methods=["*"], # permitem todos os métodos.
    allow_headers=["*"], # permitem todos os cabeçalhos.
)
# RETORNA AS IMAGENS SALVAS DOS MÉDICOS CADASTRADOS
# Configura o diretório de uploads para servir arquivos estáticos
# Isso permite acessar arquivos enviados pelo usuário (como fotos de médicos) via URL
# Exemplo de acesso: http://localhost:8000/uploads/nome_da_foto.jpg
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Registra as rotas importadas via api_router
app.include_router(api_router, prefix="/api")

# Rota raiz: retorna uma mensagem de boas-vindas'
# Esta rota é acessível em http://localhost:8000/
@app.get("/")
def root():
    return {"message": "Bem-vindo ao backend Dr.Clin"}