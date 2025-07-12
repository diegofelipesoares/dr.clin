# backend/app/utils/image_utils.py

from PIL import Image
from fastapi import UploadFile
import os

def salvar_foto(upload_file: UploadFile, destino: str):
    try:
        imagem = Image.open(upload_file.file)
        imagem = imagem.convert("RGB")
        imagem.thumbnail((300, 300))  # Limita tamanho máximo a 300x300px
        imagem.save(destino, "JPEG", quality=85)  # Salva com compressão
    except Exception as e:
        raise Exception(f"Erro ao processar imagem: {str(e)}")
