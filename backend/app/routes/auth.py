# backend/app/routes/auth.py
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi_jwt_auth import AuthJWT
from pydantic import BaseModel
from passlib.hash import bcrypt

router = APIRouter()

# ✅ Modelo dos dados que o frontend irá enviar
class LoginModel(BaseModel):
    email: str
    password: str

# ✅ Simulação de um "banco de dados"
fake_users_db = {
    "user@example.com": {
        "email": "user@example.com",
        "password": bcrypt.hash("123456"),  # senha já criptografada
    }
}

# ✅ Configuração da chave secreta para JWT
class Settings(BaseModel):
    authjwt_secret_key: str = "minha_chave_super_secreta"

@AuthJWT.load_config
def get_config():
    return Settings()

# ✅ Rota POST /login que valida usuário e gera JWT
@router.post("/login")
def login(user: LoginModel, Authorize: AuthJWT = Depends()):
    db_user = fake_users_db.get(user.email)

    # Valida se usuário existe e se senha está correta
    if not db_user or not bcrypt.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")

    # Gera token JWT com o email como subject
    access_token = Authorize.create_access_token(subject=user.email)
    return {"access_token": access_token}
