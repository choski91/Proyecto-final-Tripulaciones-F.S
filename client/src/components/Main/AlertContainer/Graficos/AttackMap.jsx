import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { COUNTRY_CODES } from "../../../../data/countryCodes";
import COUNTRY_COORDS from "../../../../data/countryCoords";

const AttackMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    const apiUrl = window._env_?.VITE_BACKEND_PYTHON;
    if (!apiUrl) {
      console.error("VITE_BACKEND_PYTHON no está definido en window._env_");
      return;
    }
    fetch(`${apiUrl}/ataques-por-pais`)

      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching ataques por pais:", err));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Mapa de ataques por país</h2>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {data.map((item, index) => {
          const coords = COUNTRY_COORDS[item.country];

          if (!coords || coords.lat === undefined || coords.lng === undefined) {
            console.warn("Coordenadas faltantes para:", item.country);
            return null;
          }

          return (
            <CircleMarker
              key={index}
              center={[coords.lat, coords.lng]}
              radius={5 + item.count}
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
