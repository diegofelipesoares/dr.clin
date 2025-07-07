from pydantic import BaseModel
from typing import List, Optional

class MedicoCreate(BaseModel):
    nome: str
    pronomeTratamento: Optional[str]
    especialidade: str
    crm: str
    email: str
    telefone: str
    tipoContratacao: str
    cpfCnpj: str
    banco: Optional[str]
    agencia: Optional[str]
    conta: Optional[str]
    tipoConta: Optional[str]
    percentualRepasse: Optional[str]
    diasAtendimento: List[str]
    horarioInicio: Optional[str]
    horarioFim: Optional[str]
    intervalo: Optional[str]
    # foto será processada separadamente como arquivo
