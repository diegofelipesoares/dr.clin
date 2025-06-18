from typing import Any, List, Optional, Dict, Union
#AGRUPADOR DE ROTAS DA APLICAÇÃO

#Importações
from fastapi import APIRouter
from .auth import router as auth_router


router = APIRouter()

# ROTAS
router.include_router(auth_router, prefix="/auth", tags=["Auth"])


