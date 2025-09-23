import React from "react";
import { Container, Grid } from "@mui/material";
import AttackPieChart from "./AttackPieChart.jsx";
import AttackMap from "./AttackMap.jsx";
import AttackLineChart from "./AttackLineChart.jsx";
import AttackHeatmap from "./AttackHeatmap.jsx";
import TopIPsChart from "./TopIPsChart.jsx";
import KPICards from "./KPICards.jsx";

const Graficos = () => {
  return <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>SIRP Dashboard</h1>

      <Grid container spacing={3}>
        {/* KPIs arriba */}
        <Grid item xs={12}>
          <KPICards />
        </Grid>

        {/* Gráficos en 2 columnas en pantallas grandes, 1 columna en móviles */}
        <Grid item xs={12} md={6}>
          <AttackPieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <AttackLineChart />
        </Grid>

        {/* Heatmap ocupa ancho completo */}
        <Grid item xs={12}>
          <AttackHeatmap />
        </Grid>

        {/* Top IPs atacantes ocupa todo el ancho */}
        <Grid item xs={12}>
          <TopIPsChart />
        </Grid>

        {/* Mapa abajo, ocupa todo */}
        <Grid item xs={12}>
          <AttackMap />
        </Grid>
      </Grid>
    </Container>
  </>;
};

export default Graficos;
