# MTP Academy — Coolify Static Deploy

Esta versión está preparada para Coolify sin correr `npm install` ni `npm run build` dentro del servidor.

## Por qué esta versión existe

Si Coolify se queda pegado en:

```bash
RUN npm ci --no-audit --no-fund
```

normalmente es por conexión del VPS/Coolify con el registry de npm o por el proceso de instalación sin mostrar logs. Esta versión evita ese problema porque el sitio ya viene construido en la carpeta `dist/`.

## Configuración en Coolify

- Build type: Dockerfile
- Base Directory: `/`
- Dockerfile Location: `/Dockerfile`
- Ports Exposes: `80`
- Port Mappings: vacío

## Estructura importante

```txt
Dockerfile
nginx.conf
dist/
public/
src/
package.json
```

El Dockerfile solo copia `dist/` a Nginx. No instala dependencias.

## Cómo editar resultados

Los resultados se editan en:

```txt
src/App.jsx
```

Buscá:

```js
const RESULT_GALLERY = [
```

Agregá nuevos resultados copiando este formato:

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

Y poné la imagen en:

```txt
public/images/resultados/nuevo-reward.png
```

## Importante si editás el código

Como esta versión despliega la carpeta `dist/`, si editás `src/App.jsx` necesitás reconstruir `dist` antes de subir a GitHub:

```bash
npm ci
npm run build
```

Después subís también la carpeta `dist/` actualizada.

Si querés que Coolify construya automáticamente cada cambio, usá la versión normal del proyecto, pero esa sí requiere que `npm ci` funcione en el VPS.
