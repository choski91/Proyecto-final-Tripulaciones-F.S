import React, { useEffect, useState } from "react";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";

ChartJS.register(MatrixController, MatrixElement, Tooltip, Legend);

export default function AttackHeatmap() {
  const [dataAPI, setDataAPI] = useState([]);

  useEffect(() => {

    const apiUrl = window._env_?.VITE_BACKEND_PYTHON;
    if (!apiUrl) {
      console.error("VITE_BACKEND_PYTHON no está definido en window._env_");
      return;
    }
    fetch(`${apiUrl}/ataques-por-hora`)

      .then((res) => res.json())
      .then((json) => setDataAPI(json))
      .catch((err) => console.error("Error cargando ataques por hora:", err));
  }, []);

  // Aseguramos 24 horas (0–23), con 0 si no hay datos
  const fullHours = Array.from({ length: 24 }, (_, hour) => {
    const found = dataAPI.find((d) => d.hour === hour);
    return { hour, count: found ? found.count : 0 };
  });

  const data = {
    datasets: [
      {
        label: "Ataques por hora",
        data: fullHours.map((d) => ({ x: d.hour, y: 0, v: d.count })),
        backgroundColor(ctx) {
          const value = ctx.dataset.data[ctx.dataIndex].v;
          const alpha = Math.min(0.9, value / 20);
          return `rgba(255, 0, 0, ${alpha})`;
        },
        width: (ctx) => {
          const chart = ctx.chart;
          if (!chart.chartArea) return 20;
          return chart.chartArea.width / 24 - 4;
        },
        height: (ctx) => {
          const chart = ctx.chart;
          if (!chart.chartArea) return 50;
          return chart.chartArea.height - 20;
        },
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 1,
          callback: (val) => `${val}:00`,
        },
        title: { display: true, text: "Hora del día" },
      },
      y: { display: false },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Ataques: ${ctx.raw.v}`,
        },
      },
    },
  };

  return (
    <div style={{ width: 800, margin: "32px auto", textAlign: "center" }}>
      <h2>Mapa de calor: ataques por hora</h2>
      <Chart key="heatmap" type="matrix" data={data} options={options} />
    </div>
  );
}
