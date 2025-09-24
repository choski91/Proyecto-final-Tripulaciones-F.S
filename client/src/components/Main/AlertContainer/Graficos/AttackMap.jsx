import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function AttackMap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://trabajo-grupal.onrender.com/ataques-por-pais")
      .then((res) => res.json())
      .then((json) => {
        console.log("📍 Datos mapa:", json);
        setData(json);
      })
      .catch((err) => console.error("Error cargando mapa:", err));
  }, []);

  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center" }}>Cargando mapa...</p>;
  }

  // 🔎 Buscar valores min y max para normalización
  const min = Math.min(...data.map(d => d.count));
  const max = Math.max(...data.map(d => d.count));

  // 🔥 Función para calcular radio proporcional con tope
  function getRadius(value) {
    const minRadius = 20000;   // radio mínimo (20 km)
    const maxRadius = 500000;  // radio máximo (500 km)
    const ratio = (value - min) / (max - min || 1); // normalizar entre 0-1
    return minRadius + ratio * (maxRadius - minRadius);
  }

  // 🌍 Diccionario de países -> coordenadas aproximadas
  const countryCoords = {
    US: [37.0902, -95.7129],
    ES: [40.4637, -3.7492],
    FR: [46.2276, 2.2137],
    DE: [51.1657, 10.4515],
    GB: [55.3781, -3.4360],
    CN: [35.8617, 104.1954],
    IN: [20.5937, 78.9629],
    RU: [61.5240, 105.3188],
    BR: [-14.2350, -51.9253],
    // ⚠️ añade más países según lo que devuelva tu backend
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((item, idx) => {
        const coords = countryCoords[item.country];
        if (!coords) return null; // ignorar si no tenemos coords

        return (
          <Circle
            key={idx}
            center={coords}
            radius={getRadius(item.count)}
            color="red"
            fillColor="red"
            fillOpacity={0.5}
          >
            <Tooltip>
              <strong>{item.country}</strong> <br />
              Ataques: {item.count}
            </Tooltip>
          </Circle>
        );
      })}
    </MapContainer>
  );
}
