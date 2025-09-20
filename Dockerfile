FROM node:18-alpine

WORKDIR /app

# Copia todo el proyecto
COPY . .

# Instala dependencias backend
RUN npm install

# Instala frontend y genera build
WORKDIR /app/client
RUN npm install && npm run build

# Vuelve al root y expone puerto
WORKDIR /app
EXPOSE 8080

# Lanza servidor Express
CMD ["node", "app.js"]
