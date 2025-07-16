# app/models/base.py

from sqlalchemy.orm import DeclarativeBase

# Base central para ser usada em todos os models
class Base(DeclarativeBase):
    pass
