import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertGraph from "./AlertGraph";
import AlertList from "./AlertList";
import AlertSearch from "./AlertSearch";
import SimulateAttack from "./SimulateAttack";
import Graficos from "./Graficos";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

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
      let url = `${import.meta.env.VITE_BACKEND_URL}/alert`;
      if (attackType === "phishing") url = `${import.meta.env.VITE_BACKEND_URL}/alert/phishing`;
      if (attackType === "login") url = `${import.meta.env.VITE_BACKEND_URL}/alert/login`;
      if (attackType === "ddos") url = `${import.meta.env.VITE_BACKEND_URL}/alert/ddos`;
      if (attackType === "dos") url = `${import.meta.env.VITE_BACKEND_URL}/alert/dos`;
      if (attackType === "fuerzabruta") url = `${import.meta.env.VITE_BACKEND_URL}/alert/fuerzabruta`;
      try {
        const res = await axios.get(url);
        setBackendAlerts(res.data); // <-- esto debe cambiar cada vez
      } catch (err) {
        console.error(err);
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
      <AlertSearch attackType={attackType} setAttackType={setAttackType} />
      <AlertGraph rowData={backendAlerts} attackType={attackType} />

      <h2>Alertas Simuladas</h2>
      <div className="header">
        <SimulateAttack onSimulate={handleSimulate} />
      </div>
      <AlertList alerts={simulatedAlerts.filter(alert => 
        attackType === "todos" ? true : alert.tipo === attackType
      )} />
      <article className="graficos">
        <Graficos />

      </article>
    </section>
  );
}

