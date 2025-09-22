import React, { useState } from "react";
import axios from "axios";
// import "../../../styles/views/SimulateAttack.scss";

export default function SimulateAttack({ onSimulate }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await axios.get(
        "https://desafio-4w98.onrender.com/random-alert"
      );
      // Pasamos los datos al padre para que los pinte
      onSimulate(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading} className="btn">
      {loading ? "Cargando…" : "Simular ataque"}
    </button>
  );
}
