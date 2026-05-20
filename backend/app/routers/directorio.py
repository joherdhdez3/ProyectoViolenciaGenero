import json
from fastapi import APIRouter
from pathlib import Path

router = APIRouter(prefix="/api/v1/directorio", tags=["Directorio"])

@router.get("/")
def get_directorio():
    file_path = Path("app/data/directorio_cdmx.json")
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data