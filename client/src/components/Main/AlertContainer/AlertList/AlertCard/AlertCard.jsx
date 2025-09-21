// AlertCard.jsx
export default function AlertCard({ alert }) {
  return (
    <div className="alert-card">
      <h3>{alert.title}</h3>
      <p>{alert.description}</p>
      {/* más campos */}
    </div>
  );
}