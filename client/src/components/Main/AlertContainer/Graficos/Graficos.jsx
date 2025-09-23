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
    <div className="graficos">
      <h1>SIRP Dashboard</h1>
      <div className="grid">
        <KPICards />
        <AttackLineChart />
        <AttackPieChart />
        <AttackHeatmap />
        <TopIPsChart />
        <AttackMap />
      </div>
    </div>
  </>;
};

export default Graficos;
