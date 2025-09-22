export default function AlertCard({ alert }) {
  return (
    <div className="alert-card">
      <h3>{alert.fecha}</h3>
      <p>{alert.hora}</p>
      <p>{alert.intentos}</p>
      <p>{alert.ip}</p>
      <p>{alert.ratio}</p>
      <p>{alert.riesgo}</p>
      <p>{alert.riesgo}</p>
    </div>
  );
}