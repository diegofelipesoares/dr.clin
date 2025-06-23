#FUNÇÃO: testar a conexão com o banco de dados e criar tabelas

#Engine: motor de conexão com o banco de dados
#Base: classe base que registra dos os modelos de tabelas
from app.database import engine, Base
# Importa os modelos user para que ela seja criada
from app.models.user import User  

# Mensagem de inicio do processo
print("⏳ Criando tabelas no banco de dados...")
#Cria todas as tabelas associadas a base no banco de dados (no caso a user)
Base.metadata.create_all(bind=engine)
# Mensagem de sucesso
print("✅ Conexão bem-sucedida e tabelas criadas!")