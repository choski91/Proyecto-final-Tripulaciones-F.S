import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

export default function AttackHeatmap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://trabajo-grupal.onrender.com/ataques-ultimas-24h")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error cargando heatmap:", err));
  }, []);

  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center" }}>Cargando datos...</p>;
  }

  const min = Math.min(...data.map(d => d.total));
  const max = Math.max(...data.map(d => d.total));

  function getColor(value) {
    const ratio = (value - min) / (max - min || 1);
    const red = 255;
    const green = Math.floor(204 - 204 * ratio);
    const blue = Math.floor(204 - 204 * ratio);
    return `rgb(${red},${green},${blue})`;
  }

  return (
    <ResponsiveContainer width="87%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="hora" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" name="Ataques por hora">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.total)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
