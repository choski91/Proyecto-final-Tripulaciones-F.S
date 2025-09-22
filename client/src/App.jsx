import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import AlertContainer from "./components/Main/AlertContainer";
// import "./styles/styles.scss";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/alerts" element={<AlertContainer />} />
    </Routes>
  );
}

export default App;













// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
// import SignUp from "./pages/SignUp";
// import LogIn from "./pages/Login";
// import AlertContainer from "./components/Main/AlertContainer";
// import AlertGraph from "./components/Main/AlertContainer/AlertGraph";
// import axios from "axios";

// function App() {
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/alert");
//         setAlerts(response.data);
//       } catch (error) {
//         console.error("Error fetching alerts:", error);
//       }
//     };

//     fetchAlerts();
//   }, []);

//   return (
//     <>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<LogIn />} />
//         <Route path="/alerts" element={<AlertContainer />} />

//       </Routes>
//     </>
//   );
// }

// export default App;
