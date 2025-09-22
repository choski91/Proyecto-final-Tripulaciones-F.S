import React from "react";

const AlertSearch = ({ attackType, setAttackType }) => {
  return (
    <div className="alert-search">
      <label htmlFor="attackType">Tipo de ataque:</label>
      <select
        id="attackType"
        value={attackType}
        onChange={e => setAttackType(e.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="ddos">DDoS</option>
        <option value="dos">DoS</option>
        <option value="fuerzabruta">Fuerza Bruta</option>
        <option value="login">Login Sospechoso</option>
        <option value="phishing">Phishing</option>
        
        {/* para agregar mas */}
      </select>
    </div>
  );
};

export default AlertSearch;
