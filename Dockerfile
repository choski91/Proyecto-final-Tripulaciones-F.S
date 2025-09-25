# Hardened Dockerfile for Node backend + Vite frontend (client/)
# - Multi-stage: client build (with devDeps), backend prod deps, minimal runtime
# - Non-root runtime (UID/GID 10001), Alpine base
# - Dynamic $PORT (Render) and clean shutdown (SIGTERM)
# - Robust entrypoint replaces placeholders in ./client/dist/env.js then starts backend
# - NOTE: Ensure your app listens on 0.0.0.0:$PORT (default 8080)

########## STAGE 1: Build frontend (client) ##########
FROM node:22-alpine AS client-build
WORKDIR /app/client

# Install client deps using lockfile if present
COPY client/package*.json ./
RUN npm ci
# Copy client source and build
COPY client/ ./
RUN npm run build

########## STAGE 2: Install backend production deps ##########
FROM node:22-alpine AS backend-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

########## STAGE 3: Runtime ##########
FROM node:22-alpine AS runtime

ENV NODE_ENV=production \
    PORT=8080

WORKDIR /app

# Create stable non-root user/group
RUN addgroup -g 10001 app && adduser -D -u 10001 -G app app

# Copy backend source first (avoid host node_modules)
COPY --chown=10001:10001 . .
# Remove any accidental node_modules brought from the host context
RUN rm -rf node_modules client/node_modules

# Copy production node_modules and built frontend assets
COPY --chown=10001:10001 --from=backend-deps /app/node_modules ./node_modules
COPY --chown=10001:10001 --from=client-build /app/client/dist ./client/dist

# Create an entrypoint to apply runtime env and start the server
# Defaults for VITE_BACKEND_* are applied only if not provided by the platform
RUN <<'SH' /bin/sh -lc 'cat > /entrypoint.sh' && chmod +x /entrypoint.sh
#!/bin/sh
set -eu

: "${PORT:=8080}"
: "${VITE_BACKEND_PYTHON:=https://mi-backend-por-defecto.com}"
: "${VITE_BACKEND_URL:=https://mi-backend-url-por-defecto.com}"

# Replace placeholders in client/dist/env.js if the file exists
if [ -f "./client/dist/env.js" ]; then
  sed -i -e "s|__VITE_BACKEND_PYTHON__|${VITE_BACKEND_PYTHON}|g" \
         -e "s|__VITE_BACKEND_URL__|${VITE_BACKEND_URL}|g" ./client/dist/env.js || true
fi

# Start backend
exec node app.js
SH

EXPOSE 8080
STOPSIGNAL SIGTERM

# Drop privileges for runtime
USER 10001:10001

ENTRYPOINT ["/entrypoint.sh"]