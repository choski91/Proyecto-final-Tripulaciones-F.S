import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertGraph from "./AlertGraph";
import AlertList from "./AlertList";
import AlertSearch from "./AlertSearch";
import SimulateAttack from "./SimulateAttack";
import AlertCard from "./AlertList/AlertCard";


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
      let url = "http://localhost:3000/alert";
      if (attackType === "phishing") url = "http://localhost:3000/alert/phishing";
      if (attackType === "login") url = "http://localhost:3000/alert/login";
      if (attackType === "ddos") url = "http://localhost:3000/alert/ddos";
      if (attackType === "dos") url = "http://localhost:3000/alert/dos";
      if (attackType === "fuerzabruta") url = "http://localhost:3000/alert/fuerzabruta";
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
    setSimulatedAlerts(prev => [newAlert, ...prev]);
  };
  return (
    <section className="alerts-container">
      <div className="header">
        <SimulateAttack onSimulate={handleSimulate} />
      </div>

      <h2>Alertas del Backend</h2>
      <AlertSearch attackType={attackType} setAttackType={setAttackType} />
      <AlertGraph rowData={backendAlerts} attackType={attackType} />

      <h2>Alertas Simuladas</h2>
      <AlertList alerts={simulatedAlerts} />
    </section>
  );
}

