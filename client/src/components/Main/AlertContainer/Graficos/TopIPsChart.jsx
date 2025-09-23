import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function TopIPsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_PYTHON}/top-ips`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const chartData = {
    labels: data.map((item) => item.ip),
    datasets: [
      {
        label: "Número de ataques",
        data: data.map((item) => item.count),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // barras horizontales
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Top 10 IPs atacantes",
        font: { size: 18 },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
