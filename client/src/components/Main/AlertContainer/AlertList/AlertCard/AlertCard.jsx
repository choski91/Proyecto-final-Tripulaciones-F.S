import React from "react";

export default function AlertCard({ alert }) {
  return (
    <div className="alert-card">

      <h3>{alert.abuse_confidence_raw || "Sin dato"}</h3>
      <p>{alert.as_owner || "Sin dato"}</p>
      <p>{alert.codigo_pais || "Sin dato"}</p>
      <p>{alert.fecha || "Sin dato"}</p>
      <p>{alert.hora || "Sin dato"}</p>
      <p>{alert.intentos || "Sin dato"}</p>
      <p>{alert.ip || "Sin dato"}</p>
      <p>{alert.isp || "Sin dato"}</p>
      <p>{alert.ratio || "Sin dato"}</p>
      <p>{alert.riesgo || "Sin dato"}</p>
      <p>{alert.score_final || "Sin dato"}</p>
      <p>{alert.target || "Sin dato"}</p>
      <p>{alert.vpn || "Sin dato"}</p>

    </div>
  );
}