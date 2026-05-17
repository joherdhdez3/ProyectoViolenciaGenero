# ProyectoViolenciaGenero

Plataforma web orientada a la atención, orientación y canalización de casos relacionados con violencia de género mediante herramientas de inteligencia artificial y recursos oficiales.

---

# Tecnologías utilizadas

## Frontend
- Next.js
- React
- TypeScript
- TailwindCSS

## Backend
- FastAPI
- Python
- OpenAI API

---

# Estructura del proyecto

```bash
ProyectoViolenciaGenero/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── .env
│
├── .gitignore
└── README.md
```

---

# Instalación

En nuestra terminal del sistema Ubuntu ejecutamos los siguientes comandos:

```bash
sudo apt update
sudo apt install curl
```

`curl` nos servirá para descargar archivos, consumir APIs, etc.

Para nuestro proyecto nos servirá para la instalación de NVM (Node Version Manager), que nos será útil para instalar y administrar múltiples versiones de Node.js.

La versión de NVM utilizada actualmente es:

```bash
0.40.3
```

---

# Instalación de NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Posteriormente cerramos y abrimos nuevamente la terminal o ejecutamos:

```bash
source ~/.bashrc
```

---

# Instalación de Node.js

Nuestro siguiente comando a ejecutar será:

```bash
nvm install --lts
```

---

# Verificación de versiones

```bash
node -v
npm -v
```

Ejemplo de versiones actuales:

```bash
node v24.15.0
npm 11.12.1
```

---

# Clonar el repositorio

Posterior a la instalación y verificación de versiones procedemos a copiar el repositorio en nuestro equipo mediante el siguiente comando:

```bash
git clone https://github.com/joherdhdez3/ProyectoViolenciaGenero.git
```

---

# Frontend

## Entrar a la carpeta frontend

```bash
cd ProyectoViolenciaGenero/frontend
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar servidor de desarrollo

```bash
npm run dev
```

Este comando nos sirve para iniciar el servidor de desarrollo de Next.js.

Con esto ya podemos acceder a:

```bash
http://localhost:3000
```

y visualizar el proyecto.

---

# Backend

## Entrar a la carpeta backend

```bash
cd ../backend
```

---

# Crear entorno virtual

## Ubuntu/Linux

```bash
python3 -m venv venv
```

Activar entorno virtual:

```bash
source venv/bin/activate
```

---

## Windows

```bash
python -m venv venv
```

Activar entorno virtual:

```bash
venv\Scripts\activate
```

---

# Instalar dependencias del backend

```bash
pip install -r requirements.txt
```

---

# Crear archivo `.env`

Dentro de la carpeta `backend/` crear un archivo llamado:

```bash
.env
```

Agregar:

```env
OPENAI_API_KEY=tu_api_key
```

---

# Ejecutar backend

```bash
uvicorn app.main:app --reload
```

Backend disponible en:

```bash
http://localhost:8000
```

Swagger UI:

```bash
http://localhost:8000/docs
```

---

# Flujo de trabajo recomendado

Para modificaciones al frontend o backend se recomienda abrir otra terminal dentro de VS Code para evitar detener los servicios en ejecución.

---

# Flujo Git

- La rama `main` contiene la versión estable del proyecto.
- Cada integrante debe trabajar en ramas secundarias.
- Las modificaciones deben integrarse mediante Pull Requests.

---

# Objetivo del proyecto

Desarrollar una plataforma web que:
- permita orientación inicial
- identifique situaciones de riesgo
- canalice a recursos oficiales
- genere reportes PDF
- utilice IA como apoyo conversacional

---

# Nota importante

Esta plataforma NO sustituye:
- atención psicológica profesional
- asesoría legal
- acompañamiento institucional

Su propósito es brindar orientación inicial y acceso a recursos oficiales.