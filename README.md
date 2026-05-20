# 🟣 Plataforma VPMRG — Sistema de Orientación para Mujeres Víctimas de Violencia Política en Razón de Género

<div align="center">

![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-blueviolet?style=for-the-badge)
![Versión](https://img.shields.io/badge/Versión-1.0.0-purple?style=for-the-badge)
![Licencia](https://img.shields.io/badge/Licencia-MIT-violet?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)

**Proyecto Universitario · Desarrollo Web · CDMX, México**

</div>

---

## 📋 Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Objetivo del Proyecto](#-objetivo-del-proyecto)
3. [Vista de la Plataforma](#-vista-de-la-plataforma)
4. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
5. [Arquitectura General del Sistema](#-arquitectura-general-del-sistema)
6. [Estructura de Carpetas](#-estructura-de-carpetas)
7. [Instalación y Configuración](#-instalación-y-configuración)
8. [Variables de Entorno](#-variables-de-entorno)
9. [Ejecución del Proyecto](#-ejecución-del-proyecto)
10. [Endpoints Principales de la API](#-endpoints-principales-de-la-api)
11. [Flujo de Funcionamiento](#-flujo-de-funcionamiento)
12. [Ejemplos de Requests y Responses](#-ejemplos-de-requests-y-responses)
13. [Generación de PDF](#-generación-de-pdf)
14. [Integración de Inteligencia Artificial](#-integración-de-inteligencia-artificial)
15. [Uso de Git y Ramas](#-uso-de-git-y-ramas)
16. [Convenciones del Proyecto](#-convenciones-del-proyecto)
17. [Problemas Comunes y Soluciones](#-problemas-comunes-y-soluciones)
18. [Estado Actual del Proyecto](#-estado-actual-del-proyecto)
19. [Mejoras Futuras](#-mejoras-futuras)
20. [Equipo](#-equipo)
21. [Licencia](#-licencia)
22. [Conclusiones](#-conclusiones)

---

## 📖 Descripción General

**Plataforma VPMRG** (Violencia Política en Razón de Género) es una aplicación web de acceso anónimo diseñada para brindar orientación jurídica inicial a mujeres que han sido víctimas de violencia política en razón de género en la Ciudad de México.

La plataforma combina inteligencia artificial (LLM sobre API de Groq con el modelo `llama-3.3-70b-versatile`), procesamiento de lenguaje natural en español y generación de documentos PDF con lenguaje jurídico formal, todo desde un entorno completamente seguro y sin almacenamiento persistente de datos sensibles.

> ⚠️ **Aviso importante**: Esta plataforma es una herramienta de orientación inicial. No reemplaza el asesoramiento jurídico profesional ni representa a ninguna autoridad gubernamental.

---

## 🎯 Objetivo del Proyecto

Desarrollar una plataforma web que permita a mujeres que ejercen o han ejercido funciones políticas y han sufrido violencia en razón de su género:

- **Diagnosticar** si la situación vivida califica como VPMRG mediante análisis con IA.
- **Identificar** conductas y derechos vulnerados según la legislación electoral de la CDMX.
- **Recibir orientación jurídica básica** de manera automatizada y empática.
- **Generar un relato formal** en lenguaje jurídico listo para presentar ante autoridades.
- **Descargar un PDF oficial** con toda la documentación estructurada.
- **Consultar** un directorio de instituciones de apoyo por alcaldía en la CDMX.

---

## 🖥️ Vista de la Plataforma

```
┌─────────────────────────────────────────────────────────────────┐
│  🟣  Plataforma VPMRG                            [Emergencia 🚨] │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│  🏠 Inicio   │      Diagnóstico Inicial                         │
│  📋 Diagnós. │  ┌──────────────────────────────────────────┐   │
│  📄 Relato   │  │ Describe con tus propias palabras lo      │   │
│  🗺️  Ruta    │  │ que ha sucedido...                        │   │
│  🔍 Eviden.  │  │                                           │   │
│  📚 Bibliot. │  └──────────────────────────────────────────┘   │
│  📍 Direct.  │                            [Analizar con IA →]  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

**Módulos de la plataforma:**

| Módulo | Ruta | Descripción |
|---|---|---|
| 🏠 Inicio | `/` | Presentación de la plataforma y acceso rápido |
| 🤖 Diagnóstico | `/diagnostico` | Análisis del relato por IA |
| 📝 Relato Formal | `/relato` | Generación de relato jurídico + PDF |
| 🗺️ Ruta Institucional | `/ruta` | Pasos cronológicos para denuncia |
| 🔍 Evidencias | `/evidencia` | Catálogo de tipos de evidencia |
| 📚 Biblioteca | `/biblioteca` | Recursos jurídicos y normativos |
| 📍 Directorio | `/directorio` | Instituciones por alcaldía en CDMX |

---

## 🛠️ Tecnologías Utilizadas

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.6 | Framework React con App Router |
| [React](https://react.dev/) | 19.2.4 | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Tipado estático |
| [TailwindCSS](https://tailwindcss.com/) | ^4 | Estilos utilitarios |
| [shadcn/ui](https://ui.shadcn.com/) | ^4.7.0 | Componentes de UI accesibles |
| [lucide-react](https://lucide.dev/) | ^1.16.0 | Iconografía |
| [radix-ui](https://www.radix-ui.com/) | ^1.4.3 | Primitivas de UI |

### Backend

| Tecnología | Versión | Propósito |
|---|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | 0.136.1 | Framework web asíncrono |
| [Python](https://www.python.org/) | 3.11+ | Lenguaje del servidor |
| [Uvicorn](https://www.uvicorn.org/) | 0.47.0 | Servidor ASGI |
| [Pydantic](https://docs.pydantic.dev/) | 2.13.4 | Validación de datos y esquemas |
| [python-dotenv](https://github.com/theskumar/python-dotenv) | 1.2.2 | Gestión de variables de entorno |

### Inteligencia Artificial

| Tecnología | Propósito |
|---|---|
| [Groq API](https://groq.com/) | Proveedor de inferencia LLM de alta velocidad |
| `llama-3.3-70b-versatile` | Modelo LLM para análisis jurídico en español |
| [OpenAI SDK](https://pypi.org/project/openai/) | SDK alternativo (modo compatibilidad) |
## Uso de Inteligencia Artificial en el Proyecto

Durante el desarrollo de este proyecto se utilizaron herramientas de Inteligencia Artificial como apoyo complementario en distintas etapas del proceso de desarrollo de software, incluyendo plataformas como ChatGPT y Claude.

La IA fue empleada principalmente para:

- Generación y mejora de documentación técnica.
- Asistencia en la estructuración del proyecto frontend y backend.
- Resolución de dudas relacionadas con errores y problemas de implementación.
- Mejora de redacción, formalización y claridad en textos académicos y técnicos.
- Apoyo en la optimización y corrección de fragmentos de código.
- Orientación sobre buenas prácticas de desarrollo web.
- Apoyo en la integración entre tecnologías como Next.js, FastAPI y APIs de IA.
- Asistencia en la generación de ejemplos de endpoints, estructuras JSON y flujos de trabajo.
- Ayuda en la organización del proyecto mediante Git y GitHub.
- Generación de ideas para arquitectura, modularización y flujo general del sistema.

El uso de estas herramientas tuvo como finalidad complementar el aprendizaje, agilizar procesos de desarrollo y mejorar la calidad técnica del proyecto, manteniendo en todo momento la supervisión, validación y adaptación del contenido por parte del equipo de desarrollo.

### Generación de Documentos

| Tecnología | Versión | Propósito |
|---|---|---|
| [ReportLab](https://www.reportlab.com/) | 4.5.1 | Generación de PDFs desde Python |
| [Pillow](https://python-pillow.org/) | 12.2.0 | Procesamiento de imágenes para PDF |

---

## 🏗️ Arquitectura General del Sistema

```
┌──────────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Navegador)                          │
│                      Next.js 16 + React + TS                         │
│  /diagnostico  /relato  /ruta  /evidencia  /biblioteca  /directorio  │
└───────────────────────────┬──────────────────────────────────────────┘
                            │  HTTP REST (JSON)
                            │  fetch() con NEXT_PUBLIC_API_URL
                            ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     BACKEND (FastAPI + Uvicorn)                      │
│                        localhost:8000                                │
│                                                                      │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────────┐  │
│  │  Router Análisis │  │ Router Directorio │  │  Router Biblioteca │  │
│  │  /api/v1/analisis│  │ /api/v1/directorio│  │ /api/v1/biblioteca │  │
│  └────────┬────────┘  └──────────────────┘  └────────────────────┘  │
│           │                                                           │
│           │  Groq Client (HTTP)                                       │
│           ▼                                                           │
│  ┌────────────────────────────────┐   ┌──────────────────────────┐  │
│  │       GROQ API (Externa)       │   │   ReportLab (PDF Utils)  │  │
│  │  llama-3.3-70b-versatile       │   │   generate_pdf()         │  │
│  │  Prompts jurídicos en español  │   │   relato_<uuid>.pdf      │  │
│  └────────────────────────────────┘   └──────────────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │               Almacén en Memoria (_casos: dict)               │   │
│  │         caso_id → { relato_usuario, analisis, relato_formal } │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

**Comunicación Frontend → Backend:**

El frontend realiza peticiones HTTP desde el archivo `frontend/lib/api.ts` usando `fetch()` nativo de Next.js. La URL base se configura con la variable de entorno `NEXT_PUBLIC_API_URL`. El backend responde con JSON estructurado validado por schemas Pydantic.

---

## 📁 Estructura de Carpetas

```
ProyectoViolenciaGenero-main/
│
├── 📂 backend/                         # Servidor FastAPI
│   ├── .gitignore
│   ├── requirements.txt                # Dependencias Python (UTF-16)
│   └── 📂 app/
│       ├── main.py                     # Punto de entrada FastAPI + CORS
│       │
│       ├── 📂 data/                    # Datos estáticos en JSON
│       │   ├── biblioteca.json         # Recursos jurídicos y normativos
│       │   ├── directorio_cdmx.json    # Instituciones por alcaldía CDMX
│       │   └── evidencias.json         # Catálogo de tipos de evidencia
│       │
│       ├── 📂 prompts/                 # Prompts de sistema para el LLM
│       │   └── diagnostico_prompt.py   # Prompts: DIAGNÓSTICO, RUTA, RELATO FORMAL
│       │
│       ├── 📂 routers/                 # Endpoints REST organizados por módulo
│       │   ├── analisis.py             # POST /analisis, GET /ruta, POST /relato-formal
│       │   ├── biblioteca.py           # GET /biblioteca
│       │   ├── biblioteca_ia.py        # Búsqueda IA en biblioteca jurídica
│       │   ├── chat.py                 # POST /chat (diagnóstico conversacional)
│       │   └── directorio.py           # GET /directorio
│       │
│       ├── 📂 schemas/                 # Modelos Pydantic (validación de datos)
│       │   ├── analisis_schema.py      # RelatoRequest, AnalisisResponse, etc.
│       │   └── biblioteca_schema.py    # Schemas para recursos de biblioteca
│       │
│       ├── 📂 services/                # Lógica de negocio y servicios externos
│       │   └── openai_service.py       # Cliente Groq, get_chat_response()
│       │
│       └── 📂 utils/                   # Utilidades compartidas
│           └── pdf.py                  # generate_pdf() con ReportLab
│
├── 📂 frontend/                        # Aplicación Next.js
│   ├── .gitignore
│   ├── package.json                    # Dependencias Node.js
│   ├── next.config.ts                  # Configuración Next.js
│   ├── postcss.config.mjs              # Configuración PostCSS/Tailwind
│   ├── components.json                 # Configuración shadcn/ui
│   │
│   ├── 📂 app/                         # App Router de Next.js (páginas)
│   │   ├── layout.tsx                  # Layout raíz con navegación
│   │   ├── page.tsx                    # Página principal /
│   │   ├── globals.css                 # Estilos globales + variables CSS
│   │   ├── 📂 diagnostico/page.tsx     # Módulo diagnóstico VPMRG con IA
│   │   ├── 📂 relato/page.tsx          # Generación relato formal + descarga PDF
│   │   ├── 📂 ruta/page.tsx            # Ruta institucional cronológica
│   │   ├── 📂 evidencia/page.tsx       # Catálogo de evidencias sugeridas
│   │   ├── 📂 biblioteca/page.tsx      # Biblioteca jurídica con búsqueda IA
│   │   └── 📂 directorio/page.tsx      # Directorio institucional por alcaldía
│   │
│   ├── 📂 components/                  # Componentes reutilizables
│   │   ├── 📂 layout/
│   │   │   └── Nav.tsx                 # Navegación lateral
│   │   └── 📂 ui/
│   │       ├── Chat.tsx                # Widget de chat con IA
│   │       ├── EmergencyButton.tsx     # Botón de emergencia flotante
│   │       ├── Breadcrumb.tsx          # Migas de pan
│   │       ├── Navbar.tsx              # Barra de navegación superior
│   │       ├── Sidebar.tsx             # Menú lateral
│   │       └── [button, card, input, textarea, scroll-area].tsx
│   │
│   ├── 📂 context/
│   │   └── RelatoContext.tsx           # Contexto global: caso_id y datos del relato
│   │
│   └── 📂 lib/
│       ├── api.ts                      # Funciones HTTP hacia el backend
│       ├── constants.ts                # Constantes y textos de la app
│       └── utils.ts                    # Utilidades (cn para clsx+tailwind)
│
└── .gitignore                          # Reglas globales de Git
```

---

## ⚙️ Instalación y Configuración

### Requisitos previos

| Herramienta | Versión mínima | Verificación |
|---|---|---|
| Python | 3.11+ | `python --version` |
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | Cualquiera | `git --version` |

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ProyectoViolenciaGenero.git
cd ProyectoViolenciaGenero
```

---

### 2. Configuración del Backend (FastAPI + Python)

#### 2.1 Crear y activar el entorno virtual

**Windows (PowerShell):**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Linux / macOS:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

> ✅ El prompt del terminal mostrará `(venv)` cuando el entorno esté activo.

#### 2.2 Instalar dependencias Python

```bash
pip install -r requirements.txt
```

> ⚠️ **Nota**: El archivo `requirements.txt` está codificado en UTF-16. Si obtienes un error de encoding, instala las dependencias manualmente:

```bash
pip install fastapi uvicorn groq python-dotenv reportlab pydantic pillow openai
```

---

### 3. Configuración del Frontend (Next.js)

```bash
cd ../frontend
npm install
```

---

## 🔑 Variables de Entorno

### Backend — `backend/.env`

Crea el archivo `backend/.env` con el siguiente contenido:

```env
# API Key de Groq (requerida)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# (Opcional) API Key de OpenAI si se usa como fallback
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> 🔐 Obtén tu clave de Groq gratis en [console.groq.com](https://console.groq.com)

### Frontend — `frontend/.env.local`

Crea el archivo `frontend/.env.local`:

```env
# URL del backend FastAPI
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

> ⚠️ Nunca subas los archivos `.env` o `.env.local` al repositorio. Ya están incluidos en `.gitignore`.

---

## 🚀 Ejecución del Proyecto

### Backend (FastAPI)

Con el entorno virtual activado:

```bash
cd backend

# Opción 1: Uvicorn directo (recomendado para desarrollo)
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Opción 2: Con módulo Python
python -m uvicorn app.main:app --reload
```

**Salida esperada:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [12345]
INFO:     Started server process [12346]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

📄 Documentación interactiva disponible en:
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

### Frontend (Next.js)

```bash
cd frontend

# Desarrollo con hot reload
npm run dev

# Producción
npm run build && npm run start
```

**Salida esperada:**
```
  ▲ Next.js 16.2.6
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Starting...
 ✓ Ready in 1234ms
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

### Levantar el proyecto completo (ambos servicios simultáneamente)

**Linux / macOS:**
```bash
# Terminal 1 — Backend
cd backend && source venv/bin/activate && uvicorn app.main:app --reload

# Terminal 2 — Frontend
cd frontend && npm run dev
```

**Windows (PowerShell, dos terminales):**
```powershell
# Terminal 1
cd backend; .\venv\Scripts\Activate.ps1; uvicorn app.main:app --reload

# Terminal 2
cd frontend; npm run dev
```

---

## 📡 Endpoints Principales de la API

Base URL: `http://127.0.0.1:8000`

| Método | Ruta | Descripción | Autenticación |
|---|---|---|---|
| `GET` | `/` | Health check del servidor | ❌ |
| `POST` | `/api/v1/analisis` | Diagnóstico VPMRG con IA | ❌ |
| `GET` | `/api/v1/caso/{caso_id}` | Consultar análisis guardado | ❌ |
| `GET` | `/api/v1/caso/{caso_id}/ruta` | Ruta institucional personalizada | ❌ |
| `POST` | `/api/v1/relato-formal` | Generar relato jurídico + PDF | ❌ |
| `GET` | `/api/v1/descargar-pdf/{nombre}` | Descargar PDF generado | ❌ |
| `GET` | `/api/v1/evidencia/catalogo` | Catálogo de evidencias | ❌ |
| `GET` | `/api/v1/directorio` | Directorio institucional CDMX | ❌ |
| `POST` | `/chat/` | Chat conversacional diagnóstico | ❌ |

> 💡 La plataforma no requiere autenticación para garantizar acceso anónimo.

---

## 🔄 Flujo de Funcionamiento

```
USUARIA
   │
   │  1. Escribe su relato en lenguaje natural
   ▼
[/diagnostico]
   │
   │  POST /api/v1/analisis
   │  { "relato_usuario": "..." }
   ▼
[FastAPI → _llamar_ia(PROMPT_DIAGNOSTICO, relato)]
   │
   │  Groq API → llama-3.3-70b-versatile
   │  Responde con JSON estructurado
   ▼
   │  { nivel_vpmrg, conductas, derechos_vulnerados, resumen_orientacion }
   │  Se guarda en _casos[caso_id]
   ▼
[/ruta] — La usuaria consulta la ruta de acción
   │
   │  GET /api/v1/caso/{caso_id}/ruta
   ▼
[FastAPI → _llamar_ia(PROMPT_RUTA, análisis_previo)]
   │
   │  Devuelve pasos cronológicos con instituciones CDMX
   ▼
[/relato] — La usuaria proporciona sus datos formales
   │
   │  POST /api/v1/relato-formal
   │  { caso_id, datos_quejosa: { nombre, cargo, municipio, autoridad } }
   ▼
[FastAPI → _llamar_ia(PROMPT_RELATO_FORMAL, contexto_completo)]
   │
   │  IA genera: proemio + antecedentes + hechos_ordenados
   │  ReportLab genera: relato_{caso_id}.pdf
   ▼
[USUARIA] — Descarga PDF con url_pdf
   │
   │  GET /api/v1/descargar-pdf/relato_{caso_id}.pdf
   ▼
[PDF descargado] — Documento jurídico listo para presentar
```

---

## 💡 Ejemplos de Requests y Responses

### 1. Diagnóstico inicial (`POST /api/v1/analisis`)

**Request:**
```json
{
  "relato_usuario": "Soy regidora del municipio. En la última sesión de cabildo, el presidente municipal me interrumpió constantemente, ignoró mis propuestas y frente a todos dijo que las mujeres no entienden de finanzas. Me excluyeron del grupo de WhatsApp oficial donde se toman decisiones."
}
```

**Response:**
```json
{
  "caso_id": "a3f7c291-4d2e-4b88-9c1a-0e5f8b3c7d92",
  "nivel_vpmrg": "alto",
  "conductas": [
    "Interrupción sistemática en sesión oficial",
    "Exclusión de comunicaciones institucionales",
    "Declaraciones públicas denigrantes por razón de género",
    "Impedimento al ejercicio de funciones"
  ],
  "derechos_vulnerados": [
    "Derecho a la participación política en condiciones de igualdad",
    "Derecho a ejercer el cargo sin discriminación",
    "Derecho a la información institucional",
    "Derecho a la dignidad e integridad"
  ],
  "resumen_orientacion": "Lo que describes constituye violencia política en razón de género en su forma institucional y simbólica. Tienes derecho a denunciar estos hechos ante el IECM y la Fiscalía Electoral. No estás sola en este proceso."
}
```

---

### 2. Ruta institucional (`GET /api/v1/caso/{caso_id}/ruta`)

**Response:**
```json
{
  "pasos": [
    {
      "orden": 1,
      "institucion": "Instituto Electoral de la Ciudad de México (IECM)",
      "accion": "Presentar queja formal por violencia política de género ante la Unidad Técnica de Igualdad de Género y No Discriminación",
      "plazo": "Inmediato, dentro de los 4 días siguientes a los hechos"
    },
    {
      "orden": 2,
      "institucion": "Tribunal Electoral de la Ciudad de México (TECDMX)",
      "accion": "Interponer juicio para la protección de los derechos político-electorales de la ciudadana",
      "plazo": "4 días hábiles después de la resolución del IECM"
    },
    {
      "orden": 3,
      "institucion": "Fiscalía Especializada para la Atención de Delitos Electorales (FEPADE)",
      "accion": "Denunciar penalmente las conductas de violencia política",
      "plazo": "Puede realizarse de forma simultánea"
    }
  ]
}
```

---

### 3. Relato formal + PDF (`POST /api/v1/relato-formal`)

**Request:**
```json
{
  "caso_id": "a3f7c291-4d2e-4b88-9c1a-0e5f8b3c7d92",
  "datos_quejosa": {
    "nombre_completo": "María González Hernández",
    "cargo_funcion": "Regidora del H. Ayuntamiento",
    "municipio_alcaldia": "Iztapalapa",
    "autoridad_denunciada": "Presidente Municipal Lic. Juan Pérez López"
  }
}
```

**Response:**
```json
{
  "proemio": "La suscrita María González Hernández, en mi carácter de Regidora del H. Ayuntamiento de Iztapalapa, con fundamento en los artículos 20 Bis de la Ley General de Acceso de las Mujeres a una Vida Libre de Violencia...",
  "antecedentes": "Que fui electa democráticamente como Regidora en el proceso electoral ordinario, ejerciendo mis funciones constitucionales desde la fecha de mi toma de posesión...",
  "hechos_ordenados": "PRIMERO. Con fecha del presente mes, durante la sesión ordinaria de Cabildo, el C. Presidente Municipal me interrumpió sistemáticamente al hacer uso de la voz... SEGUNDO. En dicha sesión, el denunciado realizó manifestaciones públicas de carácter discriminatorio...",
  "url_pdf": "/api/v1/descargar-pdf/relato_a3f7c291-4d2e-4b88-9c1a-0e5f8b3c7d92.pdf"
}
```

---

### 4. Descarga del PDF

```bash
# Con curl
curl -O http://127.0.0.1:8000/api/v1/descargar-pdf/relato_a3f7c291-4d2e-4b88-9c1a-0e5f8b3c7d92.pdf

# Desde el navegador
http://127.0.0.1:8000/api/v1/descargar-pdf/relato_a3f7c291-4d2e-4b88-9c1a-0e5f8b3c7d92.pdf
```

---

## 📄 Generación de PDF

La generación de PDFs se realiza en `backend/app/utils/pdf.py` usando la biblioteca **ReportLab**.

### Proceso de generación

```python
# Llamada desde el router analisis.py
generate_pdf(
    user_message=caso["relato_usuario"],   # Relato original de la usuaria
    ai_response=caso["analisis"],           # Análisis JSON de la IA
    relato_formal=resultado,                # Proemio, antecedentes, hechos
    datos_quejosa=body.datos_quejosa.model_dump(),  # Datos personales formales
    caso_id=body.caso_id,                   # Para generar folio anónimo
    pdf_path=pdf_nombre,                    # Nombre del archivo de salida
)
```

### Contenido del PDF generado

El PDF incluye las siguientes secciones estructuradas:

1. **Encabezado institucional** con folio anónimo
2. **Proemio** — Identificación formal de la quejosa
3. **Antecedentes** — Contexto del cargo y funciones
4. **Hechos ordenados** — Narración cronológica en lenguaje jurídico
5. **Diagnóstico VPMRG** — Nivel, conductas y derechos vulnerados
6. **Orientación jurídica** — Resumen de la orientación proporcionada

### Descarga desde el frontend

```typescript
// frontend/app/relato/page.tsx
const response = await enviarRelatoFormal(payload);
// response.url_pdf = "/api/v1/descargar-pdf/relato_uuid.pdf"

window.open(`${process.env.NEXT_PUBLIC_API_URL}${response.url_pdf}`, '_blank');
```

> 🔒 **Privacidad**: El endpoint de descarga incluye validación contra path traversal. Solo permite archivos con nombre `relato_*.pdf`.

---

## 🤖 Integración de Inteligencia Artificial

### Proveedor y modelo

La plataforma utiliza **Groq API** como proveedor de inferencia y el modelo `llama-3.3-70b-versatile`, que ofrece excelente comprensión del español jurídico con latencia muy baja.

### Patrón de integración

Todos los módulos que usan IA pasan por la función auxiliar `_llamar_ia()`:

```python
# backend/app/routers/analisis.py
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def _llamar_ia(system_prompt: str, user_message: str) -> dict:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_message},
        ],
    )
    return json.loads(response.choices[0].message.content)
```

### Los tres prompts del sistema

| Prompt | Constante | Módulo | Output |
|---|---|---|---|
| Diagnóstico VPMRG | `PROMPT_DIAGNOSTICO` | `/analisis` | `nivel_vpmrg`, `conductas`, `derechos_vulnerados`, `resumen_orientacion` |
| Ruta institucional | `PROMPT_RUTA` | `/ruta` | `pasos[]` con institución, acción y plazo |
| Relato jurídico | `PROMPT_RELATO_FORMAL` | `/relato-formal` | `proemio`, `antecedentes`, `hechos_ordenados` |

### Diseño de prompts

Los prompts están diseñados bajo las siguientes premisas:
- Respuesta **solo en JSON válido** (sin markdown, sin texto libre)
- Rol de **"Abogado Experto en Derecho Electoral y Género en la CDMX"**
- Lenguaje **empático y con perspectiva de género**
- Referencias explícitas a instituciones locales: IECM, TECDMX, FEPADE, CNDH

---

## 🌿 Uso de Git y Ramas

### Estructura de ramas

```
main
├── develop              ← Rama de integración general
│   ├── feature/frontend-diagnostico
│   ├── feature/frontend-relato
│   ├── feature/backend-analisis
│   ├── feature/backend-pdf
│   └── feature/ia-prompts
└── hotfix/...
```

### Convenciones de commits

Se utiliza **Conventional Commits**:

```bash
# Nuevas funcionalidades
git commit -m "feat: agregar endpoint POST /analisis con integración Groq"

# Correcciones
git commit -m "fix: corregir validación de path traversal en descarga PDF"

# Documentación
git commit -m "docs: actualizar README con instrucciones de instalación"

# Refactorización
git commit -m "refactor: extraer _llamar_ia como función auxiliar compartida"

# Estilos (no cambia lógica)
git commit -m "style: aplicar formato Prettier al frontend"
```

### Flujo de trabajo

```bash
# Crear rama de feature
git checkout -b feature/nombre-del-modulo

# Trabajar y hacer commits
git add .
git commit -m "feat: descripción del cambio"

# Subir y hacer Pull Request
git push origin feature/nombre-del-modulo
```

---

## 📐 Convenciones del Proyecto

### Backend (Python / FastAPI)

| Convención | Detalle |
|---|---|
| Estilo de código | PEP 8 |
| Nomenclatura de funciones | `snake_case` |
| Nombres de clases Pydantic | `PascalCase` |
| Endpoints REST | Prefijo `/api/v1/` |
| Schemas en | `app/schemas/` |
| Lógica de negocio en | `app/services/` y `app/routers/` |
| Datos estáticos en | `app/data/` (archivos JSON) |

### Frontend (TypeScript / Next.js)

| Convención | Detalle |
|---|---|
| Componentes React | `PascalCase` (`DiagnosticoPage.tsx`) |
| Funciones y variables | `camelCase` |
| Llamadas a API | Centralizadas en `lib/api.ts` |
| Estado global | React Context en `context/` |
| Componentes UI reutilizables | En `components/ui/` |
| Estilos | TailwindCSS utility-first; sin CSS en módulos separados |

---

## 🐛 Problemas Comunes y Soluciones

### Backend

**❌ `ModuleNotFoundError: No module named 'app'`**
```bash
# Asegúrate de ejecutar uvicorn desde el directorio backend/
cd backend
uvicorn app.main:app --reload
```

---

**❌ `Error: GROQ_API_KEY not found`**
```bash
# Verifica que el archivo .env exista en backend/
ls -la backend/.env

# Verifica que la clave tenga el formato correcto
cat backend/.env
# Debe mostrar: GROQ_API_KEY=gsk_...
```

---

**❌ `json.JSONDecodeError` al procesar respuesta de la IA**

Esto ocurre cuando el LLM devuelve texto fuera del JSON. Los prompts incluyen instrucciones explícitas para prevenirlo. Si persiste:

```python
# Alternativa de parsing más robusta en _llamar_ia():
import re
content = response.choices[0].message.content
match = re.search(r'\{.*\}', content, re.DOTALL)
if match:
    return json.loads(match.group())
```

---

**❌ `requirements.txt` no se instala correctamente (error UTF-16)**

```bash
# Instalar dependencias manualmente
pip install fastapi uvicorn groq python-dotenv reportlab pydantic pillow openai
```

---

### Frontend

**❌ `Error: NEXT_PUBLIC_API_URL is not defined`**
```bash
# Verifica que el archivo .env.local exista en frontend/
ls -la frontend/.env.local
# Debe contener: NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

**❌ `CORS error` en el navegador**

El backend ya tiene CORS configurado para `allow_origins=["*"]`. Si persiste:
- Verifica que el backend esté ejecutándose en el puerto 8000.
- Confirma que `NEXT_PUBLIC_API_URL` no tenga barra final (`/`).

---

**❌ `npm install` falla**
```bash
# Limpiar caché de npm y reinstalar
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

**❌ PDF no se descarga / error 404**

El PDF se guarda en el directorio de trabajo donde se ejecuta uvicorn (generalmente `backend/`). Verifica que uvicorn tenga permisos de escritura en ese directorio.

---

## 📊 Estado Actual del Proyecto

| Módulo | Estado | Notas |
|---|---|---|
| 🤖 Diagnóstico VPMRG con IA | ✅ Completo | Integrado con Groq API |
| 🗺️ Ruta institucional | ✅ Completo | Genera pasos con instituciones CDMX |
| 📝 Relato formal jurídico | ✅ Completo | Proemio, antecedentes y hechos |
| 📄 Generación de PDF | ✅ Completo | ReportLab con folio anónimo |
| 📍 Directorio institucional | ✅ Completo | JSON con alcaldías CDMX |
| 🔍 Catálogo de evidencias | ✅ Completo | Catálogo estático en JSON |
| 📚 Biblioteca jurídica | ✅ Completo | Con búsqueda IA |
| 💬 Chat conversacional | 🔄 Parcial | Funcional, pendiente de refinamiento |
| 🔐 Autenticación / Sesiones | ❌ No implementado | Por diseño (plataforma anónima) |
| 🗃️ Base de datos persistente | ❌ No implementado | Almacenamiento en memoria (por sesión) |
| 🧪 Tests unitarios | ❌ Pendiente | — |
| 🌐 Despliegue en producción | ❌ Pendiente | — |

---

## 🚀 Mejoras Futuras

- [ ] **Persistencia de datos** con base de datos segura (PostgreSQL con cifrado en reposo)
- [ ] **Autenticación opcional** con token anónimo para recuperar casos previos
- [ ] **Soporte multiidioma** (español, inglés, lenguas indígenas de la CDMX)
- [ ] **Exportación a Word (.docx)** además del PDF
- [ ] **Modo offline** con Service Worker para zonas de baja conectividad
- [ ] **Integración con WhatsApp API** para reportes rápidos desde móvil
- [ ] **Pruebas unitarias** con pytest (backend) y Jest/Vitest (frontend)
- [ ] **Cobertura de estados** más allá de la CDMX
- [ ] **Panel de estadísticas anónimas** para medir impacto de la plataforma
- [ ] **Asistente de voz** para usuarias con barreras de escritura
- [ ] **Despliegue con Docker** para facilitar instalación
- [ ] **CI/CD con GitHub Actions** para despliegue automático

---

## 👥 Equipo

Este proyecto fue desarrollado como trabajo universitario de desarrollo web.

| Nombre | Rol | Área |
|---|---|---|
| — | Desarrolladora Full Stack | Frontend + Backend |
| — | Desarrolladora Backend | FastAPI + IA |
| — | Desarrolladora Frontend | Next.js + UI/UX |
| — | Investigadora Jurídica | Contenido y prompts |

> Actualiza esta sección con los nombres reales del equipo.

---

## 📜 Licencia

```
MIT License

Copyright (c) 2026 Equipo Plataforma VPMRG

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## ✨ Conclusiones

La **Plataforma VPMRG** demuestra que la tecnología puede ser una herramienta de justicia social cuando se diseña con propósito y empatía. A lo largo del desarrollo de este proyecto universitario se lograron integrar exitosamente:

- Una arquitectura moderna **desacoplada** (Next.js + FastAPI) que permite escalar frontend y backend de forma independiente.
- El uso de **LLMs de última generación** (Llama 3.3 70B vía Groq) para tareas especializadas como el análisis jurídico en español con perspectiva de género.
- **Ingeniería de prompts** cuidadosa para garantizar respuestas JSON estructuradas, empáticas y jurídicamente relevantes.
- Generación automatizada de **documentos PDF con valor jurídico** usando ReportLab.
- Un diseño de **privacidad por defecto**: sin base de datos persistente, sin login requerido, con identificadores anónimos por UUID.

El proyecto sienta las bases para una herramienta que, con mejoras de persistencia, pruebas y despliegue, podría convertirse en un recurso real de apoyo para mujeres que enfrentan violencia política en México.

---

<div align="center">

**Hecho con 💜 por el equipo VPMRG · CDMX, México · 2026**

*"La tecnología al servicio de la justicia y la igualdad de género."*

</div>
