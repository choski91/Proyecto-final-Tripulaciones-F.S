// AlertContainer.jsx
import React, { useState } from "react";
import axios from "axios";
import AlertList from "./AlertList";
import AlertSearch from "./AlertSearch";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AlertContainer() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const simulateAttack = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/alerts/simulate`, {
        withCredentials: true,
      });
      setAlerts(data); // suponiendo que data es un array
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="alerts-container">
      <div className="header">
        <button onClick={simulateAttack} disabled={loading} className="btn">
          {loading ? "Cargando..." : "Simular ataque"}
        </button>
      </div>
      <AlertSearch /* props de búsqueda si tienes */ />
      <AlertList alerts={alerts} />
    </div>
  );
}
