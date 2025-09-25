import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertGraph from "./AlertGraph";
import AlertList from "./AlertList";
import AlertSearch from "./AlertSearch";
import SimulateAttack from "./SimulateAttack";
import Graficos from "./Graficos";

const API_BASE = window._env_.VITE_BACKEND_URL;

export default function AlertContainer() {
  // Tabla 1: alertas del backend local
  const [backendAlerts, setBackendAlerts] = useState([]);
  // Tabla 2: alertas simuladas desde API externa
  const [simulatedAlerts, setSimulatedAlerts] = useState([]);
  // Filtro
  const [attackType, setAttackType] = useState("todos");

  // Traer alertas del backend local
  useEffect(() => {
    const fetchBackendAlerts = async () => {
      if (!API_BASE) {
        console.error("VITE_BACKEND_URL no está definido");
        return;
      }
      let url = `${API_BASE}/alert`;
      if (attackType === "phishing") url = `${API_BASE}/alert/phishing`;
      if (attackType === "login") url = `${API_BASE}/alert/login`;
      if (attackType === "ddos") url = `${API_BASE}/alert/ddos`;
      if (attackType === "dos") url = `${API_BASE}/alert/dos`;
      if (attackType === "fuerzabruta") url = `${API_BASE}/alert/fuerzabruta`;
      try {
        const res = await axios.get(url);
        setBackendAlerts(res.data);
      } catch (err) {
        setBackendAlerts([]);
      }
    };
    fetchBackendAlerts();
  }, [attackType]);

  // Funcion para agregar alertas simuladas
  const handleSimulate = (newAlert) => {
    console.log("Nueva alerta recibida:", newAlert);
    setSimulatedAlerts(prev => [newAlert, ...prev]);
  };

  return (
    <section className="alerts-container">
      <h2>Alertas del Backend</h2>
      <AlertSearch
        attackType={attackType}
        setAttackType={setAttackType}
        tableData={backendAlerts}
      />
      <AlertGraph rowData={backendAlerts} attackType={attackType} />
    </section>
  );
}

