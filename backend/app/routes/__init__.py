from typing import Any, Optional, List
#AGRUPADOR DE ROTAS DA APLICAÇÃO

#Importações
from fastapi import APIRouter
from .auth import router as auth_router


router = APIRouter()

# ROTAS
router.include_router(auth.router, prefix="/auth", tags=["Auth"])

