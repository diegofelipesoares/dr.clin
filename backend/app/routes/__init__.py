#AGRUPADOR DE ROTAS DA APLICAÇÃO

#Importando os routers de cada módulo
from .auth import router as auth_router
from fastapi import APIRouter
#from .pacientes import router as pacientes_router
#from .agendamentos import router as agendamentos_router

router = APIRouter()

# Agrupa todas as rotas da aplicação
router.include_router(auth_router, prefix="/auth", tags=["Autenticação"])
#router.include_router(pacientes_router, prefix="/pacientes", tags=["Pacientes"])
#router.include_router(agendamentos_router, prefix="/agendamentos", tags=["Agendamentos"])
