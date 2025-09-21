import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertGraph from "./AlertGraph";
import AlertList from "./AlertList";
import AlertSearch from "./AlertSearch";
import SimulateAttack from "./SimulateAttack";

export default function AlertContainer() {
  // Tabla 1: alertas del backend local
  const [backendAlerts, setBackendAlerts] = useState([]);
  
  // Tabla 2: alertas simuladas desde API externa
  const [simulatedAlerts, setSimulatedAlerts] = useState([]);

  // Traer alertas del backend local
  useEffect(() => {
    const fetchBackendAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/alert");
        setBackendAlerts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBackendAlerts();
  }, []);

  // Función para agregar alertas simuladas
  const handleSimulate = (newAlert) => {
    console.log("Nueva alerta recibida:", newAlert);
    setSimulatedAlerts(prev => [newAlert, ...prev]);
  };

  return (
    <div className="alerts-container">
      <div className="header">
        <SimulateAttack onSimulate={handleSimulate} />
      </div>

      <h2>Alertas del Backend</h2>
      <AlertSearch />
      <AlertGraph rowData={backendAlerts} />

      <h2>Alertas Simuladas</h2>
      <AlertList alerts={simulatedAlerts} />
    </div>
  );
}
















// import React, { useState } from "react";
// import AlertList from "./AlertList";
// import AlertSearch from "./AlertSearch";
// import AlertGraph from "./AlertGraph";
// import SimulateAttack from "./SimulateAttack"; // tu componente hijo

// export default function AlertContainer() {
//   const [alerts, setAlerts] = useState([]);

//   // Función que pasamos al hijo para agregar la nueva alerta
//   const handleSimulate = (newAlert) => {
//     setAlerts(prev => [newAlert, ...prev]); // agregamos al principio
//   };

//   return (
//     <div className="alerts-container">
//       <div className="header">
//         <SimulateAttack onSimulate={handleSimulate} />
//       </div>
//       <AlertSearch />
//       <AlertGraph rowData={alerts} />
//       <AlertList alerts={alerts} />
//     </div>
//   );
// }







// import React, { useState } from "react";
// import axios from "axios";
// import AlertList from "./AlertList";
// import AlertSearch from "./AlertSearch";
// import AlertGraph from "./AlertGraph";



// const API = "https://desafio-4w98.onrender.com/random-alert";

// export default function AlertContainer() {
//    const [alerts, setAlerts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const simulateAttack = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(`${API}/alerts/simulate`, {
//         withCredentials: true,
//       });
//       setAlerts(data); // suponiendo que data es un array
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="alerts-container">
//       <div className="header">
//         <button onClick={simulateAttack} disabled={loading} className="btn">
//           {loading ? "Cargando..." : "Simular ataque"}
//         </button>
//       </div>
//       <AlertSearch />
//       <AlertGraph rowData={alerts}  />
//       <AlertList alerts={alerts} />
//     </div>
//   );
// }

