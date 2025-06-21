from typing import Any, List, Optional, Dict, Union
from pydantic import BaseModel
from fastapi_jwt_auth import AuthJWT
import os
from dotenv import load_dotenv

# Carrega o arquivo .env
load_dotenv()

# Configuração do FastAPI JWT Auth'
class Settings(BaseModel):
    authjwt_secret_key: str = os.getenv("SECRET_KEY") # Chave secreta para assinatura do token
    authjwt_access_token_expires: int = 3600  # 1h expiração do token
    authjwt_algorithm: str = "HS256" # Algoritmo de assinatura do token

#
@AuthJWT.load_config
def get_config() -> Settings:
    return Settings()
