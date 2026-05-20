from pydantic import BaseModel, Field
from typing import List

class BibliotecaItemSchema(BaseModel):
    tipo: str = Field(..., description="Tipo de documento, ej. Ley, Protocolo, Guía")
    anio: str = Field(..., description="Año de publicación del documento")
    titulo: str = Field(..., description="Título oficial del recurso legal")
    desc: str = Field(..., description="Breve descripción o resumen del documento")

class BibliotecaResponse(BaseModel):
    recursos: List[BibliotecaItemSchema]