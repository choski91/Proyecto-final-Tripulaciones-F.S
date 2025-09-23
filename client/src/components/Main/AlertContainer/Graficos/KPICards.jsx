import React, { useEffect, useState } from "react";

function KPICards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = window._env_?.VITE_BACKEND_PYTHON;
    if (!apiUrl) {
      console.error("VITE_BACKEND_PYTHON no está definido en window._env_");
      return;
    }
    fetch(`${apiUrl}/kpis`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error("Error fetching KPIs:", err));
  }, []);

  if (!data) return <p>Cargando KPIs...</p>;

  const kpis = [
    { title: "Total ataques", value: data.total_alertas },
    { title: "Ataques últimos 24h", value: data.ultimas_24h },
    { title: "Media severidad", value: data.media_riesgo },
    { title: "Usuarios afectados", value: data.clientes_afectados },
    { title: "Tiempo medio resolución", value: data.tiempo_resolucion },
  ];

  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      {kpis.map((kpi, index) => (
        <div
          key={index}
          style={{
            background: "#f8f8f8",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            width: "220px",
          }}
        >
          <h3>{kpi.title}</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{kpi.value}</p>
        </div>
      ))}
    </div>
  );
}

export default KPICards;
