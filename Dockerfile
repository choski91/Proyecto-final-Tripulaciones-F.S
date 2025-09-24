# DockerFile-Full — Hardened, single-file build for Vite (SPA) apps on Render
# - Fixes "vite not found" by installing devDependencies during build (npm ci)
# - Multi-stage: build with Node, runtime with NGINX (no toolchains)
# - Non-root runtime (user: nginx) listening on dynamic $PORT (Render)
# - Clean shutdown with SIGTERM, security headers, SPA history fallback

# ---------- BUILD: compile assets with devDependencies (includes Vite) ----------
# Stage 1: Build frontend
FROM node:22-alpine AS build
WORKDIR /app/client

COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client ./
RUN npm run build

# ---------- RUNTIME: NGINX minimal, non-root, dynamic port ----------
# Stage 2: NGINX runtime
FROM nginx:1.27-alpine AS runtime

# Use a non-privileged port by default (Render sets $PORT)
ENV PORT=10000

# We need 'envsubst' to render $PORT into nginx config
USER root
RUN apk add --no-cache gettext

# Copy built static assets
COPY --from=build /app/client/dist /usr/share/nginx/html

# Provide nginx config template (uses $PORT) and a tiny entrypoint to render it
# nginx.conf.template
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

# entrypoint to generate final config with actual $PORT
RUN <<'EOF' /bin/sh -c 'cat > /entrypoint.sh' && chmod +x /entrypoint.sh
#!/bin/sh
set -eu
: "${PORT:=10000}"
# Render the template into NGINX conf.d (overrides default server)
envsubst '$PORT' < /etc/nginx/templates.default.conf.template > /etc/nginx/conf.d/default.conf
exec "$@"
EOF

# Drop privileges for runtime (nginx user exists in this image)
USER nginx

# Expose the dynamic port (informational)
EXPOSE 10000
STOPSIGNAL SIGTERM

# Use our entrypoint to inject $PORT then start NGINX in foreground
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
