from fastapi import FastAPI
from app import routes

app = FastAPI()

app.include_router(routes.router)

@app.get("/")
def root():
    return {"message": "Bem-vindo ao backend Dr.Clin"}