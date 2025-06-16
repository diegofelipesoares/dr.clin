from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router  # importa o router centralizado

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
# Isso permite que as rotas do 'auth.router' estejam acessíveis na API
app.include_router(router)

@app.get("/")
def root():
    return {"message": "Bem-vindo ao backend Dr.Clin"}