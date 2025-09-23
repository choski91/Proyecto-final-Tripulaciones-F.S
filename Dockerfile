FROM node:18-alpine

WORKDIR /app

# Copiar dependencias del backend
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Build del frontend
WORKDIR /app/client
RUN npm install && npm run build

# Volver al backend
WORKDIR /app
EXPOSE 8080

# Variables por defecto si no se definen en Render
ARG DEFAULT_VITE_BACKEND_PYTHON=https://mi-backend-por-defecto.com
ARG DEFAULT_VITE_BACKEND_URL=https://mi-backend-url-por-defecto.com

ENV VITE_BACKEND_PYTHON=${VITE_BACKEND_PYTHON:-$DEFAULT_VITE_BACKEND_PYTHON}
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL:-$DEFAULT_VITE_BACKEND_URL}

# Reemplazar placeholders en el frontend y arrancar backend
CMD sed -i 's|__VITE_BACKEND_PYTHON__|'"$VITE_BACKEND_PYTHON"'|g; s|__VITE_BACKEND_URL__|'"$VITE_BACKEND_URL"'|g' ./client/dist/env.js && node app.js