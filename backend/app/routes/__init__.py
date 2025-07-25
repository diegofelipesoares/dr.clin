# app/routes/__init__.py
# FUNÇÃO: agrupar as rotas da aplicação

from fastapi import APIRouter

# ✅ Importações separadas de rotas públicas e protegidas de autenticação
from .auth_public import public_auth_router
from .auth_protected import protected_auth_router

# Demais rotas da aplicação
from .medico_routes import router as medico_router
from .registro_clinica import router as registro_router
from .validar_clinica import router as validar_clinica_router
from .clinica_router import router as clinica_router
from .paciente_routes import router as paciente_router

# Instância principal de rotas
router = APIRouter()

# ✅ Inclusão das rotas de autenticação (agora separadas)
router.include_router(public_auth_router)  # ex: /auth/login
router.include_router(protected_auth_router)  # ex: /{clinica}/auth/me

# Inclusão das demais rotas
router.include_router(medico_router)
router.include_router(registro_router)
router.include_router(validar_clinica_router)
router.include_router(clinica_router)
router.include_router(paciente_router)
