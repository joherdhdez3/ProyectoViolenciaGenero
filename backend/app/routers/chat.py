from fastapi import APIRouter
from pydantic import BaseModel
from app.services.openai_service import get_chat_response
from app.utils.pdf import generate_pdf

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

class ChatRequest(BaseModel):
    mensaje: str

@router.post("/")
def chat(request: ChatRequest):
    
    try: 
    
       # respuesta = get_chat_response(
        #   request.mensaje
        #)
        respuesta = "mensaje de prueba ya que no tengo tokens"
        pdf_path = generate_pdf(
            request.mensaje,
            respuesta
        )
        
        return{
            "respuesta": respuesta,
            "pdf": pdf_path
        }
    except Exception as e:
        return{
            "error": str(e)
        }