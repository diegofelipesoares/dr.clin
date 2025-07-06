from sqlalchemy import Column, Integer, String, Enum, Float, ARRAY
from app.database import Base

class Medico(Base):
    __tablename__ = "medicos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    especialidade = Column(String, nullable=False)
    crm = Column(String, nullable=False)
    email = Column(String, nullable=False)
    telefone = Column(String, nullable=False)
    tipoContratacao = Column(Enum("CLT", "PJ", "Autônomo", name="tipos_contratacao"), nullable=False)
    cpfCnpj = Column(String, nullable=False)
    banco = Column(String)
    agencia = Column(String)
    conta = Column(String)
    tipoConta = Column(Enum("Corrente", "Poupança", "Pagamento", name="tipos_conta"))
    percentualRepasse = Column(String)
    diasAtendimento = Column(ARRAY(String))
    horarioInicio = Column(String)
    horarioFim = Column(String)
    duracaoConsulta = Column(String)
    intervalo = Column(String)
    preco = Column(String)
    foto = Column(String)  # caminho do arquivo salvo
