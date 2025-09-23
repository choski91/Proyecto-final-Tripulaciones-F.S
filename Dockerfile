FROM node:18-alpine

WORKDIR /app

# Copiar backend
COPY package*.json ./
RUN npm install

# Copiar todo el proyecto
COPY . .

# Build del frontend
WORKDIR /app/client
RUN npm install && npm run build

# Volver al backend
WORKDIR /app
EXPOSE 8080

# Valor por defecto si no se define en Render
ARG DEFAULT_VITE_BACKEND_PYTHON=https://mi-backend-por-defecto.com
ENV VITE_BACKEND_PYTHON=${VITE_BACKEND_PYTHON:-$DEFAULT_VITE_BACKEND_PYTHON}

# Reemplazar placeholder y arrancar Express
CMD sed -i 's|__VITE_BACKEND_PYTHON__|'"$VITE_BACKEND_PYTHON"'|g' ./client/dist/env.js && node app.js