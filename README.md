🛡️ Defender Monitor

Defender Monitor es una plataforma colaborativa SIRP (Security Incident Response Platform) desarrollada en el marco del Desafío de Tripulaciones de The Bridge junto a Capgemini.
Su objetivo es recibir, enriquecer, gestionar y visualizar alertas de ciberseguridad en tiempo real, integrando scoring de riesgo y sugerencias de respuesta para ayudar a las organizaciones a priorizar y actuar frente a incidentes.

🎯 Propósito

A diferencia de un SIEM clásico, Defender Monitor se centra en la gestión activa y colaborativa de incidentes, proporcionando:

Centralización y enriquecimiento de alertas.

Scoring automático y priorización inteligente.

Dashboards y métricas en tiempo real.

Simulación de incidentes para entrenamiento y pruebas.

Posible generación de informes PDF y playbooks automáticos.

🧠 Funcionalidades principales

Recepción de alertas simuladas (intentos de login sospechoso, phishing, ataques DDoS).

Enriquecimiento automático vía APIs externas (VirusTotal, AbuseIPDB…).

Scoring de riesgo para priorizar incidentes.

Gestión del ciclo de vida de cada alerta/incidente.

Dashboards interactivos con métricas clave.

Interfaz moderna y responsive desarrollada con React + SASS.

Despliegue en contenedores Docker para Render.

🛠️ Tecnologías utilizadas

Frontend: React (SPA, mobile-first) + SASS

Backend: Node.js + Express

Enrichment/API: Integración con servicios externos (VirusTotal, AbuseIPDB, etc.)

Persistencia: Base de datos (SQL/NoSQL según modelo de datos)

Infraestructura: Docker + Render

📂 Estructura del proyecto

Proyecto-final-Tripulaciones-F.S.

├── client/           # Interfaz React + SASS
├── config/         # Node.js + Express
├── controllers
├── models
├── routes
├── utils
├── app.js
├── Dockerfile
└── README.md

⚙️ Instalación y uso en local

Clonar el repositorio

git clone https://github.com/choski91/Proyecto-final-Tripulaciones-F.S.git


Backend

npm install
npm start

Accede desde http://localhost:3000

Frontend

cd client
npm install
npm run dev


Accede desde http://localhost:5173

🐳 Despliegue con Docker

Construir y levantar contenedores:

docker-compose up --build


Esto levanta backend y frontend listos para despliegue en Render.

🤝 Créditos

Desarrollado por el equipo multidisciplinar Ciberseguridad + Data Science + Fullstack dentro del Desafío de Tripulaciones de The Bridge con mentoría de Capgemini.