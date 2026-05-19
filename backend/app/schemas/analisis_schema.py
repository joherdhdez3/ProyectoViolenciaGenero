from pydantic import BaseModel, Field

# ── F02: Diagnóstico VPMRG ───────────────────────────────────────────────────

class RelatoRequest(BaseModel):
    relato_usuario: str = Field(..., min_length=10)

class AnalisisResponse(BaseModel):
    caso_id: str
    nivel_vpmrg: str
    conductas: list[str]
    derechos_vulnerados: list[str]
    resumen_orientacion: str

# ── F04: Ruta institucional ───────────────────────────────────────────────────

class PasoRuta(BaseModel):
    orden: int
    institucion: str
    accion: str
    plazo: str

class RutaResponse(BaseModel):
    pasos: list[PasoRuta]

# ── F05/F06: Relato formal ────────────────────────────────────────────────────

class DatosQuejosa(BaseModel):
    nombre_completo: str
    cargo_funcion: str
    municipio_alcaldia: str
    autoridad_denunciada: str

class RelatoFormalRequest(BaseModel):
    caso_id: str
    datos_quejosa: DatosQuejosa

class RelatoFormalResponse(BaseModel):
    proemio: str
    antecedentes: str
    hechos_ordenados: str
    url_pdf: str