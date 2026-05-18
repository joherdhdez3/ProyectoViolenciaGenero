import os
import json
from fastapi import APIRouter, HTTPException
# Ajusta la importación según dónde guardaste tu archivo schemas.py
from app.schemas import CatalogoEvidenciasResponse 

router = APIRouter(
    prefix="/api/v1/evidencia",
    tags=["Evidencias"]
)

# Definimos la ruta de la carpeta de datos apuntando a app/data/
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

@router.get("/catalogo", response_model=CatalogoEvidenciasResponse)
def get_catalogo_evidencias():
    """Lee el archivo evidencias.json y devuelve las secciones con sus checklists."""
    ruta_archivo = os.path.join(DATA_DIR, "evidencias.json")
    
    if not os.path.exists(ruta_archivo):
        raise HTTPException(
            status_code=404, 
            detail="El archivo evidencias.json no fue encontrado en el servidor."
        )
        
    try:
        with open(ruta_archivo, "r", encoding="utf-8") as f:
            datos = json.load(f)
        return {"catalogo": datos}
        
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500, 
            detail="El archivo evidencias.json tiene un formato JSON inválido."
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error al leer el catálogo: {str(e)}"
        )