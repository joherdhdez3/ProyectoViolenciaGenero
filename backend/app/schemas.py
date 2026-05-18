from pydantic import BaseModel, Field
from typing import List, Optional

# ==========================================
# 1. ESQUEMAS PARA EL CATÁLOGO DE EVIDENCIAS
# ==========================================
# Se alinea con: export interface EvidenciaSeccion
class EvidenciaSeccionSchema(BaseModel):
    titulo: str = Field(..., description="Título de la sección de evidencias, ej. Pruebas Digitales")
    items: List[str] = Field(..., description="Lista de textos planos que describen cada evidencia requerida")

class CatalogoEvidenciasResponse(BaseModel):
    catalogo: List[EvidenciaSeccionSchema]


# ==========================================
# 2. ESQUEMAS PARA EL DIRECTORIO DE ALCALDÍAS
# ==========================================
# Se alinea con: export interface InstitucionDirectorio
class InstitucionDirectorioSchema(BaseModel):
    nombre: str = Field(..., description="Nombre oficial de la institución u oficina")
    area: str = Field(..., description="Área específica encargada de la atención")
    ambito: str = Field(..., description="Ámbito de competencia (Local, Federal, etc.)")
    tipo: str = Field(..., description="Tipo de apoyo u oficina")
    tel: str = Field(..., description="Teléfono de contacto directo")
    email: str = Field(..., description="Correo electrónico de atención")
    desc: str = Field(..., description="Dirección física, horarios o notas adicionales")

class DirectorioResponse(BaseModel):
    alcaldia: str
    oficinas: List[InstitucionDirectorioSchema]


# ==========================================
# 3. ESQUEMAS PARA LA BIBLIOTECA VIRTUAL
# ==========================================
# Se alinea con: export interface BibliotecaItem
class BibliotecaItemSchema(BaseModel):
    tipo: str = Field(..., description="Tipo de documento, ej. Ley, Protocolo, Guía")
    anio: str = Field(..., description="Año de publicación del documento")
    titulo: str = Field(..., description="Título oficial del recurso legal")
    desc: str = Field(..., description="Breve descripción o resumen del documento")

class BibliotecaResponse(BaseModel):
    recursos: List[BibliotecaItemSchema]


# ==========================================
# 4. ESQUEMAS PARA EL DIAGNÓSTICO E IA (DEV 3)
# ==========================================
# Entrada del formulario alineada con: export interface FormRelato
class FormRelatoRequest(BaseModel):
    cargo: str
    alcaldia: str
    autoridad: str
    fechaInicio: str
    fechaFin: str
    relato_usuario: str = Field(..., description="Narrativa detallada de los hechos de violencia")

# Salida alineada con: export interface InstitucionDiagnostico y la respuesta estructurada de la IA
class InstitucionDiagnosticoSchema(BaseModel):
    nombre: str
    desc: str

class AnalisisResponse(BaseModel):
    caso_id: str
    nivel_vpmrg: str = Field(..., description="Nivel determinado de violencia (Leve, Moderado, Alto)")
    conductas: List[str] = Field(..., description="Lista de conductas de violencia de género detectadas")
    derechos_vulnerados: List[str] = Field(..., description="Derechos político-electorales transgredidos")
    resumen_orientacion: str = Field(..., description="Explicación clara y empática sobre su situación")
    instituciones_sugeridas: List[InstitucionDiagnosticoSchema] = Field(..., description="Oficinas recomendadas según su caso")