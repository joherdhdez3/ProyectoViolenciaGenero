import os
import json
from fastapi import APIRouter, HTTPException
from pathlib import Path

router = APIRouter(
    prefix="/api/v1/directorio",
    tags=["Directorio"]
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

@router.get("/")
def get_directorio():
    ruta_archivo = os.path.join(DATA_DIR, "directorio_cdmx.json")
    
    if not os.path.exists(ruta_archivo):
        raise HTTPException(
            status_code=404,
            detail="El archivo directorio_cdmx.json no fue encontrado"
        )
    
    with open(ruta_archivo, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    return data