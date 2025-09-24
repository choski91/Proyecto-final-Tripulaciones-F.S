# ---------- STAGE 1: BUILD (compila dependencias y genera wheels) ----------
FROM python:3.12-slim AS build

ENV PIP_NO_CACHE_DIR=1     PYTHONDONTWRITEBYTECODE=1     PYTHONUNBUFFERED=1

WORKDIR /app

# Paquetes de compilación para psycopg2 y deps nativas
RUN apt-get update && apt-get install -y --no-install-recommends       build-essential gcc libpq-dev     && rm -rf /var/lib/apt/lists/*

# Instala herramientas de empaquetado y genera wheels reproducibles
COPY requirements.txt .
RUN pip install --upgrade pip wheel  && pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

# Copiamos el código (por si hubiera paquetes locales)
COPY . .
# Si tu proyecto genera wheel propio:
# RUN pip wheel . -w /wheels

# ---------- STAGE 2: RUNTIME (mínimo, sin toolchains) ----------
FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1     PYTHONUNBUFFERED=1     PIP_NO_CACHE_DIR=1     PORT=10000

# Sólo librerías de ejecución (libpq para psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends       libpq5     && rm -rf /var/lib/apt/lists/*

# Usuario/grupo no-root estable
RUN groupadd -g 10001 app && useradd -u 10001 -g 10001 -M -s /usr/sbin/nologin app

WORKDIR /app

# Instala desde wheels precompiladas (evita toolchains en runtime)
COPY --from=build /wheels /wheels
COPY requirements.txt .
RUN pip install --no-index --find-links=/wheels -r requirements.txt  && rm -rf /wheels

# Copia sólo el código necesario, con ownership mínimo
COPY --chown=10001:10001 . .

# Expone el puerto (Render usará $PORT)
EXPOSE 10000
STOPSIGNAL SIGTERM

# Ejecutar como usuario no-root
USER 10001:10001

# Lanza entrypoint dinámico que lee $PORT y arranca Gunicorn
# Asegúrate de tener entrypoint.py en la raíz del proyecto
CMD ["python", "-u", "entrypoint.py"]
