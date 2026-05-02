# MTP Academy Landing Page

Landing page premium en React + Vite + Tailwind + Framer Motion + Recharts.
Lista para desplegar en Coolify usando Dockerfile.

## 1. Correr localmente

```bash
npm install
npm run dev
```

Abrir:

```txt
http://localhost:5173
```

## 2. Estructura importante

```txt
mtp-academy-coolify/
├─ Dockerfile
├─ nginx.conf
├─ package.json
├─ index.html
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  └─ index.css
└─ public/
   └─ images/
      ├─ logo-mtp.jpg
      ├─ bg-trading.jpg
      ├─ mentor-adriel.png
      └─ resultados/
         ├─ fundingpips-david-1184.png
         ├─ fundingpips-gabriel-1418.png
         ├─ ftmo-anthony-13131.png
         ├─ fundingpips-david-bronze.png
         ├─ fundednext-david-elite.png
         ├─ fundednext-kevin-elite.png
         ├─ ftmo-jose-challenge.png
         └─ ftmo-david-verification.png
```

## 3. Cómo cargar imágenes

En Vite, todo lo que está dentro de `public` queda disponible desde la raíz del sitio.

Ejemplo:

```txt
Archivo real en el proyecto:
public/images/resultados/nuevo-reward.png

Ruta que se usa en el código:
/images/resultados/nuevo-reward.png
```

No se escribe `public` en la ruta del código.

## 4. Cómo agregar un nuevo resultado

Abrir:

```txt
src/App.jsx
```

Buscar:

```js
const RESULT_GALLERY = [
```

Copiar y pegar un nuevo bloque:

```js
{
  id: "reward-nuevo-001",
  category: "rewards",
  badge: "FundingPips",
  title: "Reward procesado",
  student: "Nombre del estudiante",
  amount: "$1,000.00",
  date: "25 Abr 2026",
  meta: "Two Step · ROI 300%",
  image: "/images/resultados/nuevo-reward.png",
},
```

Categorías disponibles:

```txt
rewards
certificates
challenges
```

## 5. Cómo cambiar logo y foto del mentor

Abrir:

```txt
src/App.jsx
```

Buscar:

```js
const SITE = {
```

Editar estas líneas:

```js
assets: {
  logo: "/images/logo-mtp.jpg",
  mentor: "/images/mentor-adriel.png",
  background: "/images/bg-trading.jpg",
},
```

## 6. Deploy en Coolify con Dockerfile

1. Subir esta carpeta a un repositorio de GitHub.
2. En Coolify crear un nuevo recurso desde Git.
3. Seleccionar el repo.
4. Tipo de build: Dockerfile.
5. Puerto interno del contenedor: `80`.
6. Asignar dominio: `www.adriellostalo.com`.
7. Deploy.

## 7. Comandos útiles

Build local:

```bash
npm run build
```

Preview local del build:

```bash
npm run preview
```
