from typing import List, Optional, Dict, Union
from pydantic import BaseModel
from fastapi_jwt_auth import AuthJWT
import os
from dotenv import load_dotenv
from datetime import timedelta

# Carrega o arquivo .env
load_dotenv()

# Configuração do FastAPI JWT Auth'
class Settings(BaseModel):
    authjwt_secret_key: str = os.getenv("SECRET_KEY")  # 🔐 Chave para assinatura do token
    authjwt_access_token_expires: timedelta = timedelta(minutes=60)  # ⏱️ Access token: 1 hora
    authjwt_refresh_token_expires: timedelta = timedelta(days=7)     # 🔁 Refresh token: 7 dias
    #Diminuindo tempo para teste do timer de expiração do token
    #authjwt_refresh_token_expires: timedelta = timedelta(minutes=2) 
    authjwt_algorithm: str = "HS256"

@AuthJWT.load_config
def get_config() -> Settings:
    return Settings()
