# MTP Academy - Deploy Coolify

## Estructura correcta para Coolify

Este repo está preparado para desplegar sin depender de npm dentro de Coolify.
Coolify solo usa Nginx y copia la carpeta `dist/`.

Configuración en Coolify:

- Build type: Dockerfile
- Base Directory: `/`
- Dockerfile Location: `/Dockerfile`
- Ports Exposes: `80`
- Port Mappings: vacío
- Network Aliases: vacío

## Archivos importantes

- `Dockerfile`: producción estática con Nginx. Este es el que usa Coolify.
- `nginx.conf`: configuración para servir React/Vite.
- `dist/`: web ya construida. ESTA CARPETA SÍ DEBE SUBIRSE A GITHUB.
- `src/App.jsx`: código editable de la página.
- `public/images/`: imágenes editables antes de reconstruir.

## Importante

No borres `dist/` y no la pongas en `.gitignore` ni `.dockerignore`.
El error de `COPY dist /usr/share/nginx/html` pasa cuando `dist/` no está en GitHub o cuando `.dockerignore` la excluye.

## Editar resultados

En `src/App.jsx`, busca:

```js
const RESULT_GALLERY = [
```

Agrega más resultados con este formato:

```js
{
  id: "resultado-nuevo-001",
  category: "rewards",
  badge: "FundingPips",
  title: "Reward procesado",
  student: "Nombre del estudiante",
  amount: "$1,000.00",
  date: "25 Abr 2026",
  meta: "Two Step · ROI 300%",
  image: "/images/resultados/mi-imagen.png",
},
```

Luego coloca la imagen en:

```txt
public/images/resultados/mi-imagen.png
```

Después reconstruye localmente:

```bash
npm install
npm run build
```

Y sube a GitHub tanto `src/`, `public/` como `dist/`.

## WhatsApp

Los botones de aplicar apuntan a:

`https://wa.me/50686579544?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20MTP%20Academy`

Se cambia en `src/App.jsx`, dentro de `const SITE`.
