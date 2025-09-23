import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AttackPieChart() {
  const [data, setData] = useState(null);

  useEffect(() => {

    const apiUrl = window._env_?.VITE_BACKEND_PYTHON;
    if (!apiUrl) {
      console.error("VITE_BACKEND_PYTHON no está definido en window._env_");
      return;
    }
    fetch(`${apiUrl}/ataques-por-tipo`)

      .then((res) => res.json())
      .then((json) => {
        setData({
          labels: json.map((d) => d.name),
          datasets: [
            {
              label: "Ataques",
              data: json.map((d) => d.value),
              backgroundColor: [
                "#0088FE",
                "#FF8042",
                "#FFBB28",
                "#00C49F",
                "#A020F0",
              ],
              borderColor: "#fff",
              borderWidth: 2,
              hoverOffset: 15,
            },
          ],
        });
      })
      .catch((e) => console.error("Error cargando ataques por tipo:", e));
  }, []);

  if (!data) return <p>Cargando datos…</p>;

  return (
    <div style={{ width: 420, margin: "32px auto", textAlign: "center" }}>
      <h2>Distribución de ataques por tipo</h2>
      <Pie
        data={data}
        options={{
          layout: { padding: { top: 30, bottom: 20, left: 20, right: 20 } },
          plugins: {
            legend: {
              position: "bottom",
              labels: { font: { size: 14, family: "Arial" }, color: "#333" },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.label}: ${ctx.raw} ataques`,
              },
            },
          },
        }}
      />
    </div>
  );
}
