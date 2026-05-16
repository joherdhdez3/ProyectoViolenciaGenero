# Instalación del proyecto

## Requisitos previos

Instalar:

- Node.js
- npm
- Git
- VS Code (opcional)

---

# Instalación en Ubuntu

## 1. Actualizar paquetes del sistema

```bash
sudo apt update
```

---

## 2. Instalar curl y git

```bash
sudo apt install curl git
```

`curl` nos servirá para descargar archivos y realizar peticiones HTTP desde terminal.

---

## 3. Instalar NVM (Node Version Manager)

NVM nos permite instalar y administrar múltiples versiones de Node.js.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Cerrar y volver a abrir la terminal.

---

## 4. Instalar Node.js LTS

```bash
nvm install --lts
```

---

## 5. Verificar instalación

```bash
node -v
npm -v
```

Versiones ocupadas para este proyecto:

```text
v24.15.0
11.12.1
```

---

## 6. Clonar repositorio

```bash
git clone https://github.com/joherdhdez3/ProyectoViolenciaGenero.git
```

---

## 7. Entrar al proyecto desde nuestro vscode

```bash
cd ProyectoViolenciaGenero/frontend
```

---

## 8. Instalar dependencias

```bash
npm install
```

---

## 9. Ejecutar servidor de desarrollo

```bash
npm run dev
```

Este comando inicia el servidor de desarrollo de Next.js.

---

## 10. Abrir proyecto en navegador

```text
http://localhost:3000
```

---

# Notas importantes

- Para realizar modificaciones sin detener el servidor, se recomienda abrir otra terminal en VS Code.
- Next.js actualiza automáticamente los cambios guardados gracias al Hot Reload.
- En este proyecto no se utilizan entornos virtuales como en Python, ya que Node.js administra dependencias mediante `package.json` y `node_modules`.


