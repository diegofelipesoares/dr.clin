from typing import Any, List, Optional, Dict, Union
from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(128))

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email})>"