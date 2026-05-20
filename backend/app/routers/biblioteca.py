import os
import json
from fastapi import APIRouter, HTTPException
# Importamos los nombres exactos de tus esquemas
from app.schemas import biblioteca_schema as schemas

router = APIRouter(
    prefix="/api/v1/biblioteca",
    tags=["Biblioteca"]
)

# Definimos la ruta hacia la carpeta de datos
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

@router.get("/catalogo", response_model=schemas.BibliotecaResponse)
def get_catalogo_biblioteca():
    """Lee el archivo biblioteca.json y devuelve el acervo de recursos legales."""
    ruta_archivo = os.path.join(DATA_DIR, "biblioteca.json")
    
    if not os.path.exists(ruta_archivo):
        raise HTTPException(
            status_code=404, 
            detail="El archivo biblioteca.json no fue encontrado en el servidor."
        )
        
    try:
        with open(ruta_archivo, "r", encoding="utf-8") as f:
            datos = json.load(f)
        
        # RETORNO CORRECTO: Envolvemos los datos en la llave "recursos"
        # para que coincida con tu clase BibliotecaResponse
        return {"recursos": datos}
        
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500, 
            detail="El archivo biblioteca.json tiene un formato JSON inválido."
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error interno al leer la biblioteca: {str(e)}"
        )