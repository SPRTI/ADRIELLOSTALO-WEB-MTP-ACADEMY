# ---------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy only dependency manifests first to maximize Docker cache.
COPY package.json package-lock.json ./

# npm ci is faster and more deterministic than npm install when package-lock.json exists.
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---------- Production stage ----------
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
