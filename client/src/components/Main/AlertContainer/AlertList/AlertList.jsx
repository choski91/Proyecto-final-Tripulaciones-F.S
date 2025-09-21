// AlertList.jsx
import React from "react";
import AlertCard from "./AlertCard";

export default function AlertList({ alerts }) {
  if (!alerts.length) return <p>No hay alertas</p>;

  return (
    <div className="alert-list">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}
