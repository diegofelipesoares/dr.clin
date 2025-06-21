#FUNÇÃO: agrupar as rotas da aplicação

#Importações Gerais
from fastapi import APIRouter #permite dividir as rotas em módulos

#importação das rotas criadas
from .auth import router as auth_router 

#instância principal: agrupa todas as rotas
router = APIRouter()

# Inclusão das ROTAS
router.include_router(auth_router, prefix="/auth", tags=["Auth"])