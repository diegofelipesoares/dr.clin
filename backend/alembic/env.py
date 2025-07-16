from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# Importar sua Base para que Alembic saiba onde estão os modelos
from app.models.base import Base  # <- ajustar conforme seu caminho real

# Configuração do arquivo alembic.ini
config = context.config

# Interpretar o arquivo alembic.ini e configurar logging
fileConfig(config.config_file_name)

# Definir a MetaData para 'autogenerate' (geração automática das migrations)
target_metadata = Base.metadata

# Configurar URL do banco de dados (pode sobrescrever a do alembic.ini)
# Exemplo com PostgreSQL, ajuste a string de conexão para seu banco
DATABASE_URL = "postgresql://postgres:270588@localhost:5432/drclin"

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = DATABASE_URL
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        url=DATABASE_URL  # Define explicitamente a URL
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
