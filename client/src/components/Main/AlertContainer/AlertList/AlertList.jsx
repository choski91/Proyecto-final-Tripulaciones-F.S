import React, { useState } from "react";
import axios from "axios";
import AlertCard from "./AlertCard/AlertCard";

export default function AlertList() {
  const [loading, setLoading] = useState(false);
  const [simulateAttack, setSimulateAttack] = useState([]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await axios.get(
        "https://desafio-4w98.onrender.com/random-alert"
      );
      setSimulateAttack(data.data.alerta);
    } catch (err) {
      console.error(err.response || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleClick} disabled={loading} className="btn">
        {loading ? "Cargando…" : "Simular ataque"}
      </button>
      <div className="alert-list">
        {simulateAttack.map((alert, idx) => (
          <AlertCard key={idx} alert={alert} />
        ))}
      </div>
    </>
  );
}
