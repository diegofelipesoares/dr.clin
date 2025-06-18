from typing import Any, List, Optional, Dict, Union
from database import engine, Base
from models.user import User  # ajuste o nome da pasta conforme necessário

print("⏳ Criando tabelas no banco de dados...")
Base.metadata.create_all(bind=engine)
print("✅ Conexão bem-sucedida e tabelas criadas!")