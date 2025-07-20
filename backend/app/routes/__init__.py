#FUNÇÃO: agrupar as rotas da aplicação

#Importações Gerais
from fastapi import APIRouter #permite dividir as rotas em módulos

#importação das rotas criadas
from .auth import router as auth_router 
from .medico_routes import router as medico_router
from .registro_clinica import router as registro_router
from .validar_clinica import router as validar_clinica_router
from .clinica_router import router as clinica_router
from .paciente_routes import router as paciente_router


#instância principal: agrupa todas as rotas
router = APIRouter()

# Inclusão das ROTAS
router.include_router(auth_router, prefix="/auth", tags=["Auth"])
router.include_router(medico_router)
router.include_router(registro_router)
router.include_router(validar_clinica_router)
router.include_router(clinica_router)
router.include_router(paciente_router)
