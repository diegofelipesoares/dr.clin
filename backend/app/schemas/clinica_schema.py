from pydantic import BaseModel

class ClinicaOut(BaseModel):
    nome: str
    dominio: str

    class Config:
        orm_mode = True
