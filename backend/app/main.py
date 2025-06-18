from typing import Any, List, Optional, Dict, Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as api_router # importa o router centralizado
from app.database import Base, engine
import app.config  # precisa importar para JWT funcionar

# Cria as tabelas automaticamente
Base.metadata.create_all(bind=engine)

app = FastAPI()

# 🧩 CORS: permite que o frontend em React se comunique com o backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # domínio permitido (React em desenvolvimento) (Vercel mais tarde)
    allow_credentials=True, # permite envio de cookies/autenticação
    allow_methods=["*"], # permite envio de cookies/autenticação
    allow_headers=["*"], # permite envio de cookies/autenticação
)

# Registra as rotas de autenticação
# Usa as rotas centralizadas
app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "Bem-vindo ao backend Dr.Clin"}