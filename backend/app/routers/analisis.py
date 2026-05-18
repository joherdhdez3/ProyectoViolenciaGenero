from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import uuid, os, json
from groq import Groq
from dotenv import load_dotenv

from app.schemas.analisis_schema import (
    RelatoRequest, AnalisisResponse,
    RutaResponse,
    RelatoFormalRequest, RelatoFormalResponse,
)
from app.prompts.diagnostico_prompt import PROMPT_DIAGNOSTICO, PROMPT_RUTA, PROMPT_RELATO_FORMAL
from app.utils.pdf import generate_pdf

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Almacén en memoria — suficiente para el hackathon
_casos: dict = {}

# ── Helper ────────────────────────────────────────────────────────────────────

def _llamar_ia(system_prompt: str, user_message: str) -> dict:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_message},
        ],
    )
    return json.loads(response.choices[0].message.content)

def _data_path() -> str:
    return os.path.join(os.path.dirname(__file__), "..", "data")


# ══════════════════════════════════════════════════════════════════════════════
# POST /api/v1/analisis  — F02: Diagnóstico VPMRG
# ══════════════════════════════════════════════════════════════════════════════
router = APIRouter(prefix="/api/v1", tags=["Análisis"])

@router.post("/analisis", response_model=AnalisisResponse)
def analizar_relato(body: RelatoRequest):
    try:
        resultado = _llamar_ia(PROMPT_DIAGNOSTICO, body.relato_usuario)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error IA: {e}")

    caso_id = str(uuid.uuid4())
    _casos[caso_id] = {
        "relato_usuario": body.relato_usuario,
        "analisis": resultado,
    }
    return AnalisisResponse(caso_id=caso_id, **resultado)


@router.get("/caso/{caso_id}", response_model=AnalisisResponse)
def obtener_caso(caso_id: str):
    caso = _casos.get(caso_id)
    if not caso:
        raise HTTPException(status_code=404, detail="Caso no encontrado")
    return AnalisisResponse(caso_id=caso_id, **caso["analisis"])


# ══════════════════════════════════════════════════════════════════════════════
# GET /api/v1/caso/{caso_id}/ruta  — F04: Ruta institucional
# ══════════════════════════════════════════════════════════════════════════════
@router.get("/caso/{caso_id}/ruta", response_model=RutaResponse)
def obtener_ruta(caso_id: str):
    caso = _casos.get(caso_id)
    if not caso:
        raise HTTPException(status_code=404, detail="Caso no encontrado")

    contexto = json.dumps(caso["analisis"], ensure_ascii=False)
    try:
        resultado = _llamar_ia(PROMPT_RUTA, f"Análisis del caso:\n{contexto}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error IA: {e}")

    return RutaResponse(**resultado)


# ══════════════════════════════════════════════════════════════════════════════
# POST /api/v1/relato-formal  — F05/F06: Relato jurídico + PDF
# ══════════════════════════════════════════════════════════════════════════════
@router.post("/relato-formal", response_model=RelatoFormalResponse)
def generar_relato_formal(body: RelatoFormalRequest):
    caso = _casos.get(body.caso_id)
    if not caso:
        raise HTTPException(status_code=404, detail="Caso no encontrado")

    contexto = (
        f"Relato original: {caso['relato_usuario']}\n"
        f"Nombre completo: {body.datos_quejosa.nombre_completo}\n"
        f"Cargo o función: {body.datos_quejosa.cargo_funcion}\n"
        f"Municipio/Alcaldía: {body.datos_quejosa.municipio_alcaldia}\n"
        f"Autoridad denunciada: {body.datos_quejosa.autoridad_denunciada}"
    )

    try:
        resultado = _llamar_ia(PROMPT_RELATO_FORMAL, contexto)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error IA: {e}")

    _casos[body.caso_id]["relato_formal"] = resultado
    _casos[body.caso_id]["datos_quejosa"] = body.datos_quejosa.model_dump()

    pdf_nombre = f"relato_{body.caso_id}.pdf"
    try:
        generate_pdf(
            user_message=caso["relato_usuario"],
            ai_response=caso["analisis"],
            relato_formal=resultado,
            datos_quejosa=body.datos_quejosa.model_dump(),
            pdf_path=pdf_nombre,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando PDF: {e}")

    return RelatoFormalResponse(
        **resultado,
        url_pdf=f"/api/v1/descargar-pdf/{pdf_nombre}",
    )


@router.get("/descargar-pdf/{nombre_archivo}")
def descargar_pdf(nombre_archivo: str):
    if not os.path.exists(nombre_archivo):
        raise HTTPException(status_code=404, detail="PDF no encontrado")
    return FileResponse(
        nombre_archivo,
        media_type="application/pdf",
        filename="reporte_vpmrg.pdf",
    )


# ══════════════════════════════════════════════════════════════════════════════
# GET /api/v1/evidencia/catalogo  — Catálogo de evidencias
# ══════════════════════════════════════════════════════════════════════════════
@router.get("/evidencia/catalogo")
def catalogo_evidencia():
    ruta = os.path.join(_data_path(), "evidencias.json")
    with open(ruta, encoding="utf-8") as f:
        return json.load(f)


# ══════════════════════════════════════════════════════════════════════════════
# GET /api/v1/directorio  — Directorio por alcaldía
# ══════════════════════════════════════════════════════════════════════════════
@router.get("/directorio")
def obtener_directorio(alcaldia: str = ""):
    ruta = os.path.join(_data_path(), "directorio_cdmx.json")
    with open(ruta, encoding="utf-8") as f:
        directorio = json.load(f)

    if not alcaldia:
        return {"alcaldias_disponibles": list(directorio.keys())}

    oficinas = directorio.get(alcaldia)
    if oficinas is None:
        raise HTTPException(
            status_code=404,
            detail=f"Alcaldía '{alcaldia}' no encontrada. Disponibles: {list(directorio.keys())}",
        )
    return {"alcaldia": alcaldia, "oficinas": oficinas}