import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

function KPICards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://trabajo-grupal.onrender.com/kpis") // 👈 asegúrate que coincide con tu backend
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error cargando KPIs:", err));
  }, []);

  if (!data) return <p>Cargando KPIs...</p>;

  const kpis = [
    { title: "Total alertas", value: data.total_alertas },
    { title: "Últimas 24h", value: data.ultimas_24h },
    { title: "Media severidad", value: data.nivel_riesgo }, // 👈 cambiado
    { title: "Clientes afectados", value: data.clientes_afectados }
  ];

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {kpis.map((kpi, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ textAlign: "center", p: 2, bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {kpi.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {kpi.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default KPICards;
