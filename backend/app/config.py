from typing import Any, Optional, List
from pydantic import BaseModel
from fastapi_jwt_auth import AuthJWT
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    authjwt_secret_key: str = os.getenv("SECRET_KEY")

@AuthJWT.load_config
def get_config() -> Settings:
    return Settings()
