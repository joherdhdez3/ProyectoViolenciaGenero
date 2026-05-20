from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat
from app.routers.analisis import router as router_analisis
from app.routers import biblioteca
from app.routers import biblioteca_ia

app = FastAPI(
    title="Esperanza API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(router_analisis)
app.include_router(biblioteca.router)
app.include_router(biblioteca_ia.router)

@app.get("/")
def root():
    return {"message": "Back funcionando"}