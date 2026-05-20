# backend/app/routers/directorio.py
from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/directorio", tags=["Directorio"])

# Aquí pones tus datos verídicos o la lógica de tu directorio
@router.get("/")
def get_directorio():
    return {
        "alcaldias": [
            {"nombre": "Álvaro Obregón", "tel": "55-5483-3800", "email": "distrito18@iecm.mx"}
            # ... tus datos aquí
        ]
    }