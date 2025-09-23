import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { COUNTRY_CODES } from "../../../../data/countryCodes";
import COUNTRY_COORDS from "../../../../data/countryCoords";

const AttackMap = () => {
  const [data, setData] = useState([]);

  // Llamada al backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_PYTHON}/ataques-por-pais`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching ataques por pais:", err));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Mapa de ataques por país</h2>
      <MapContainer
        center={[20, 0]} // centro del mapa (África para ver todo el mundo)
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Pinta los círculos solo si hay coordenadas */}
        {data.map((item, index) => {
          const coords = COUNTRY_COORDS[item.country];

          if (!coords || coords.lat === undefined || coords.lng === undefined) {
            console.warn("Coordenadas faltantes para:", item.country);
            return null; // salta este país
          }

          return (
            <CircleMarker
              key={index}
              center={[coords.lat, coords.lng]}
              radius={5 + item.count} // tamaño proporcional al número de ataques
              fillOpacity={0.6}
              color="red"
            >
              <Popup>
                <strong>{COUNTRY_CODES[item.country] || item.country}</strong>
                <br />
                Ataques: {item.count}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default AttackMap;
