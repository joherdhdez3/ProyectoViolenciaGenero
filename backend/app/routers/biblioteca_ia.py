from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import json
import traceback
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="/api/v1/biblioteca-ia",
    tags=["Biblioteca IA"]
)

# Inicialización segura con la API key del entorno
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# Definimos el esquema estricto que espera la petición desde Next.js
class ExplicarLeyRequest(BaseModel):
    titulo_ley: str

@router.post("/explicar")
def explicar_ley_con_ia(request: ExplicarLeyRequest):
    try:
        # ── REPLICAMOS LA RUTA EXACTA DE ELI SIN TOCAR SU ARCHIVO ──
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        DATA_DIR = os.path.join(BASE_DIR, "data")
        ruta_archivo = os.path.join(DATA_DIR, "biblioteca.json")
        
        if not os.path.exists(ruta_archivo):
            raise HTTPException(
                status_code=404, 
                detail="El archivo biblioteca.json no está disponible."
            )
            
        with open(ruta_archivo, "r", encoding="utf-8") as f:
            lista_recursos = json.load(f)

        # ── BÚSQUEDA INTELIGENTE DEL RECURSO LEGAL ──
        titulo_buscado = request.titulo_ley.strip().lower()
        recurso_encontrado = None
        
        for item in lista_recursos:
            titulo_item = item.get("titulo", "").strip().lower()
            # Validamos coincidencia exacta o por subcadena para evitar fallas por acentos o espacios
            if titulo_item == titulo_buscado or titulo_buscado in titulo_item or titulo_item in titulo_buscado:
                recurso_encontrado = item
                break
        
        if not recurso_encontrado:
            raise HTTPException(
                status_code=404, 
                detail=f"No se localizó correspondencia para: {request.titulo_ley}"
            )

        prompt_sistema = (
            "CONTEXTO DEL SISTEMA:\n"
            "Actúas como una abogada experta en perspectiva de género y en el marco legal electoral de la Ciudad de México (CDMX). "
            "Tu propósito es brindar orientación técnica, humana y directa a mujeres. Tu tono debe ser "
            "profesional, asertivo y seguro. Ve directo al grano sin preámbulos.\n\n"
            
            "REGLAS CRÍTICAS DE REDACCIÓN Y VOCABULARIO (CERO RELLENO DE IA):\n"
            "1. Queda estrictamente PROHIBIDO usar frases de transición o justificación de IA como: 'Explicado en palabras sencillas', "
            "'A continuación te explico', 'Aquí tienes los ejemplos', 'Como abogada experta', 'Según el recurso provisto', o 'En la CDMX esta normativa se aplica...'.\n"
            "2. No saludes, no te despidas, ni agregues introducciones o conclusiones a los encabezados. Inicia la respuesta directamente con el encabezado 1.\n"
            "3. Habla siempre en voz activa y con un enfoque práctico de defensa de derechos.\n\n"

            "REGLA DE UNIVERSALIDAD DE DEMARCACIÓN (SOLO CDMX GENERAL):\n"
            "Queda ESTRICTAMENTE PROHIBIDO mencionar nombres propios de alcaldías, demarcaciones territoriales o colonias específicas de la capital "
            "(por ejemplo, NO menciones Cuauhtémoc, Iztapalapa, Benito Juárez, etc.). En su lugar, usa términos neutros y universales "
            "como: 'tu alcaldía', 'la demarcación territorial', 'órganos locales', 'ayuntamientos/concejos de la CDMX' o 'tu distrito local'. "
            "La información debe ser idéntica y válida para cualquier mujer de la Ciudad de México, sin importar dónde resida.\n\n"

            "REGLA CRÍTICA DE VERACIDAD (CERO ALUCINACIONES):\n"
            "1. Basarás tu respuesta ÚNICAMENTE en la información fidedigna del recurso legal provisto abajo.\n"
            "2. Queda estrictamente PROHIBIDO inventar artículos, fracciones, fechas o sanciones que no vengan explitos en el texto de origen.\n"
            "3. Si el recurso provisto es muy breve y no menciona un dato específico, declara textualmente: "
            "'La normativa de consulta no especifica ese detalle en su ficha base' en lugar de suponerlo o inventarlo.\n\n"
            
            "REGLA DE JURISDICCIÓN ESTRICTA (SOLO CDMX):\n"
            "Este sistema opera exclusivamente en la Ciudad de México. Toda orientación o ruta debe alinearse "
            "al ámbito local de la CDMX. Haz referencia a las instituciones competentes de la capital cuando corresponda "
            "(Instituto Electoral de la Ciudad de México [IECM], Tribunal Electoral de la Ciudad de México [TECDMX], o la "
            "Fiscalía Especializada en Delitos Electorales de la CDMX). No menciones autoridades federales o de otros estados.\n\n"
            
            "DATOS COMPROBADOS DEL RECURSO LEGAL (TU ÚNICA FUENTE DE VERDAD):\n"
            f"• Tipo de Recurso: {recurso_encontrado.get('tipo', 'Normativa Local')}\n"
            f"• Año de Publicación/Vigencia: {recurso_encontrado.get('anio', 'N/A')}\n"
            f"• Nombre Oficial: {recurso_encontrado.get('titulo')}\n"
            f"• Síntesis Oficial Validada: {recurso_encontrado.get('desc')}\n\n"
            
            "ESTRUCTURA DE SALIDA OBLIGATORIA (REDACTA DIRECTAMENTE EL CONTENIDO):\n"
            "Debes estructurar la respuesta usando EXACTAMENTE los siguientes tres encabezados con sus respectivos emoticonos. No agregues texto libre entre ellos ni uses otras subdivisiones:\n\n"
            
            "📌 1. Alcance y propósito de la normativa\n"
            "Escribe un párrafo directo y fluido de máximo 4 líneas que explique qué protege, prohíbe o regula esta norma en el entorno local, usando un lenguaje claro pero formal.\n\n"
            
            "🔍 2. Situaciones de riesgo cubiertas en la CDMX\n"
            "Despliega de 2 a 3 ejemplos cotidianos, concretos e hipotéticos contextualizados en las instituciones o demarcaciones de la CDMX que correspondan estrictamente a lo que describe la síntesis legal. Redáctalos directo en formato de lista con viñeta de dos puntos (ejemplo: 'Bloqueo de funciones: Ocultar información o negar el acceso a las herramientas necesarias para ejercer un cargo en tu alcaldía').\n\n"
            
            "⚡ 3. Mecanismos y rutas locales para tu defensa\n"
            "Lista de forma directa las alternativas de protección o acciones legales específicas que otorga esta norma (ejemplo: 'Denuncia electoral: Presentar una queja o denuncia formal ante el IECM para activar procedimientos sancionadores'). Si la síntesis del recurso no detalla la ruta, usa la regla de veracidad."
        )
        
        # Llamada al motor de inferencia de Groq con un modelo vigente
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",  
            messages=[
                {"role": "system", "content": prompt_sistema},
                {"role": "user", "content": f"Explícame la relevancia de la normativa: {request.titulo_ley}"}
            ],
            temperature=0.2,
            max_tokens=1024
        )
        
        return {
            "titulo": request.titulo_ley,
            "explicacion_ia": completion.choices[0].message.content
        }

    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        print("====== ERROR DETECTADO EN ROUTER IA ======")
        traceback.print_exc()
        print("==========================================")
        raise HTTPException(status_code=500, detail=str(e))