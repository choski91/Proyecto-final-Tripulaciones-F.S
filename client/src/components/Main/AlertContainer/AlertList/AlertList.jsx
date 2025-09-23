import React from "react";
import AlertCard from "./AlertCard/AlertCard";

export default function AlertList({ alerts }) {
  return (
    <div className="alert-list">
      {alerts.map((alert, idx) => (
        <AlertCard key={idx} alert={alert} />
      ))}
    </div>
  );
}
