🛡️ Defender Monitor

## 🚀 Introducción  

**Defender Monitor** es una plataforma colaborativa **SIRP (Security Incident Response Platform)** desarrollada en el marco del **Desafío de Tripulaciones** de The Bridge con mentoría de **Capgemini**.  

🔹 Recibe, enriquece, gestiona y visualiza alertas de ciberseguridad.  
🔹 Integra scoring de riesgo y sugerencias de respuesta para ayudar a priorizar incidentes.  
🔹 Desplegada con **Docker** y lista para producción en **Render**.  

---

## 🎯 Propósito  

> A diferencia de un SIEM clásico, **Defender Monitor** se centra en la **gestión activa y colaborativa** de incidentes.

- 📥 Centralización y enriquecimiento de alertas.  
- 🧠 Scoring automático y priorización inteligente.  
- 📊 Dashboards y métricas en tiempo real.  
- 📝 Simulación de incidentes para entrenamiento.  
- 📄 Posible generación de informes PDF y playbooks automáticos.  

---

## 🧠 Funcionalidades principales  

✅ Recepción de alertas simuladas *(login sospechoso, phishing, DDoS)*.  
✅ Enriquecimiento automático vía APIs externas *(VirusTotal, AbuseIPDB…)*.  
✅ Scoring de riesgo para priorizar incidentes.  
✅ Gestión del ciclo de vida de cada alerta/incidente.  
✅ Dashboards interactivos con métricas clave.  
✅ Interfaz moderna y responsive *(React + SASS)*.  
✅ Despliegue en contenedores Docker para Render.  

---

## 🛠️ Tecnologías utilizadas  

| Capa           | Tecnología               |
| -------------- | ------------------------ |
| **Frontend**   | React (SPA, mobile-first) + SASS |
| **Backend**    | Node.js + Express         |
| **Enrichment** | Integración con APIs externas (VirusTotal, AbuseIPDB…) |
| **DB**         | Base de datos SQL         |
| **Infra**      | Docker + Render           |

---

## 📂 Estructura del proyecto  

```bash
defender-monitor/
├── backend/                             # API REST Node.js + Express
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── package.json
├── client/                              # Interfaz React + SASS
│   ├── public/
│   │   └── logotripulacion.png
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Main/
│   │   │   │   ├── AlertContainer/
│   │   │   │   │   ├── AlertGraph/
│   │   │   │   │   │   └── AlertGraph.jsx
│   │   │   │   │   ├── AlertList/
│   │   │   │   │   ├── AlertSearch/
│   │   │   │   │   │   └── AlertSearch.jsx
│   │   │   │   │   └── SimulateAttack/
│   │   │   │   ├── Graficos/
│   │   │   │   ├── KpiCards/
│   │   │   │   └── Header/
│   │   ├── pages/
│   │   │   ├── Login/
│   │   │   │   └── Login.jsx
│   │   │   ├── SignUp/
│   │   │   │   └── SignUp.jsx
│   │   ├── styles/
│   │   │   ├── components/
│   │   │   │   ├── _AlertGraph.scss
│   │   │   │   ├── _AlertSearch.scss
│   │   │   │   ├── _Header.scss
│   │   │   │   ├── _Footer.scss
│   │   │   │   ├── _Login.scss
│   │   │   │   ├── _Signup.scss
│   │   │   └── styles.scss
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── docker-compose.yml
├── Dockerfile
└── README.md
```

⚙️ Instalación y uso en local
1️⃣ Clonar el repositorio

bash
Copiar código
git clone https://github.com/choski91/Proyecto-final-Tripulaciones-F.S.git

2️⃣ Backend

bash
cd client
npm install
npm run dev
3️⃣ Frontend Abrir la app: http://localhost:5173

bash
npm install
npm start
4️⃣ Abrir el back: http://localhost:3000

🐳 Despliegue con Docker
Construir y levantar contenedores:

bash
Copiar código
docker-compose up --build
Esto levanta backend y frontend listos para Render.


🖥️ Producción en Render
Proyecto configurado para Deploy from Docker en Render.

Vincular repositorio y Render se encarga del resto.

📊 Roadmap
 Recepción y enriquecimiento de alertas

 Dashboard inicial con métricas

 Playbooks automáticos de respuesta

 Exportación de informes en PDF

 Métricas avanzadas (MTTR, tendencias)

 Visita la Web del Proyecto:

 https://proyecto-final-tripulaciones-f-s-bpzh.onrender.com/

🤝 Créditos
Desarrollado por el equipo multidisciplinar Ciberseguridad + Data Science + Fullstack dentro del Desafío de Tripulaciones de The Bridge con mentoría de Capgemini.