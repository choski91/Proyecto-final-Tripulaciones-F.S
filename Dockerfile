# Hardened multi-stage Dockerfile for Node.js (backend + Vite frontend)
# Stage 1: Build (dependencies + frontend build)
FROM node:18-alpine AS build

ENV NODE_ENV=production
WORKDIR /app

# Install backend deps (production only)
COPY package*.json ./
RUN npm ci 

# Copy source
COPY . .

# Build frontend assets
WORKDIR /app/client
RUN npm ci && npm run build

# Stage 2: Runtime (minimal, non-root, no build tools)
FROM node:18-alpine AS runtime

ENV NODE_ENV=production \
    PORT=8080 \
    DEFAULT_VITE_BACKEND_PYTHON=https://mi-backend-por-defecto.com \
    DEFAULT_VITE_BACKEND_URL=https://mi-backend-url-por-defecto.com

WORKDIR /app

# Use the non-root 'node' user provided by the base image
USER node

# Copy only what is needed to run
COPY --chown=node:node --from=build /app/package*.json ./
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app ./

# Create a tiny entrypoint to inject runtime env into built frontend and start backend
# (keeps runtime configurable on Render without rebuilding the image)
RUN printf '%s\n' \
  '#!/bin/sh' \
  'set -eu' \
  'VITE_BACKEND_PYTHON="${VITE_BACKEND_PYTHON:-${DEFAULT_VITE_BACKEND_PYTHON}}"' \
  'VITE_BACKEND_URL="${VITE_BACKEND_URL:-${DEFAULT_VITE_BACKEND_URL}}"' \
  'if [ -f ./client/dist/env.js ]; then' \
  '  sed -i "s|__VITE_BACKEND_PYTHON__|$VITE_BACKEND_PYTHON|g" ./client/dist/env.js' \
  '  sed -i "s|__VITE_BACKEND_URL__|$VITE_BACKEND_URL|g" ./client/dist/env.js' \
  'fi' \
  'exec node app.js' \
  > /usr/local/bin/docker-entrypoint.sh \
  && chmod 0755 /usr/local/bin/docker-entrypoint.sh

EXPOSE 8080
STOPSIGNAL SIGTERM

ENTRYPOINT ["docker-entrypoint.sh"]
