# DockerFile-Full — Hardened, single-file build for Vite (SPA) apps on Render
# - Multi-stage: build with Node, runtime with NGINX (no toolchains)
# - Non-root runtime (user: nginx) listening on dynamic $PORT (Render)
# - Clean shutdown with SIGTERM, security headers, SPA history fallback

# ---------- BUILD: compile assets with devDependencies (includes Vite) ----------
FROM node:22-alpine AS build
WORKDIR /app/client

# Copia sólo los archivos necesarios para instalar dependencias y hacer el build
COPY client/package.json client/package-lock.json ./
RUN npm ci

# Copia el resto del código fuente del frontend
COPY client ./

# Build de frontend
RUN npm run build

# ---------- RUNTIME: NGINX minimal, non-root, dynamic port ----------
FROM nginx:1.27-alpine AS runtime

# Use a non-privileged port by default (Render sets $PORT)
ENV PORT=10000

# Necesitamos 'envsubst' para renderizar $PORT en la config de nginx
USER root
RUN apk add --no-cache gettext

# Copia los assets estáticos construidos
COPY --from=build /app/client/dist /usr/share/nginx/html

# Plantilla de configuración de nginx
RUN <<'EOF' /bin/sh -c 'cat > /etc/nginx/templates.default.conf.template'
server {
  listen       ${PORT};
  listen       [::]:${PORT};
  server_name  _;
  root   /usr/share/nginx/html;
  index  index.html;

  # Single Page App fallback (history mode)
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Basic security headers
  add_header X-Content-Type-Options nosniff always;
  add_header X-Frame-Options SAMEORIGIN always;
  add_header X-XSS-Protection "1; mode=block" always;
  # Consider adding a strict Content-Security-Policy tailored to your app.
}
EOF

# Entrypoint para generar el config final con $PORT al arrancar el contenedor
RUN <<'EOF' /bin/sh -c 'cat > /entrypoint.sh' && chmod +x /entrypoint.sh
#!/bin/sh
set -eu
: "${PORT:=10000}"
# Renderiza la plantilla en la config de NGINX
envsubst '$PORT' < /etc/nginx/templates.default.conf.template > /etc/nginx/conf.d/default.conf
exec "$@"
EOF

# Da permisos de escritura al usuario nginx sobre la carpeta de config de nginx
RUN chown -R nginx:nginx /etc/nginx/conf.d

# Cambia a usuario nginx para el runtime seguro
USER nginx

# Exponer el puerto dinámico (informativo)
EXPOSE 10000
STOPSIGNAL SIGTERM

# Usa nuestro entrypoint para inyectar $PORT y lanzar nginx
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]