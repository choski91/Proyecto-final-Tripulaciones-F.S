import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, ButtonGroup } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AttackLineChart() {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("7d"); // "7d" o "24h"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = window._env_?.VITE_BACKEND_PYTHON;
        if (!apiUrl) {
          console.error("VITE_BACKEND_PYTHON no está definido en window._env_");
          return;
        }
        let response;
        if (range === "7d") {

          response = await fetch(`${apiUrl}/ataques-ultimos-7-dias`);
        } else {
          response = await fetch(`${apiUrl}/ataques-ultimas-24h`);
        }

        const result = await response.json();

        if (range === "7d") {
          setData({
            labels: result.map((d) => d.fecha),
            datasets: [
              {
                label: "Ataques últimos 7 días",
                data: result.map((d) => d.total),
                borderColor: "#0088FE",
                backgroundColor: "rgba(0, 136, 254, 0.2)",
                tension: 0.4,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#0088FE",
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
              },
            ],
          });
        } else {
          setData({
            labels: result.map((d) => d.hora),
            datasets: [
              {
                label: "Ataques últimas 24h",
                data: result.map((d) => d.total),
                borderColor: "#0088FE",
                backgroundColor: "rgba(0, 136, 254, 0.2)",
                tension: 0.4,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#0088FE",
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
              },
            ],
          });
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    fetchData();
  }, [range]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text:
          range === "7d"
            ? "📊 Ataques en los últimos 7 días"
            : "⏱️ Ataques en las últimas 24 horas",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  if (!data) return <p>Cargando datos…</p>;

  return (
    <div style={{ width: 700, margin: "32px auto", textAlign: "center" }}>
      <ButtonGroup variant="contained" sx={{ mb: 2 }}>
        <Button
          color={range === "7d" ? "primary" : "inherit"}
          onClick={() => setRange("7d")}
        >
          Últimos 7 días
        </Button>
        <Button
          color={range === "24h" ? "primary" : "inherit"}
          onClick={() => setRange("24h")}
        >
          Últimas 24h
        </Button>
      </ButtonGroup>

      <Line data={data} options={options} />
    </div>
  );
}
