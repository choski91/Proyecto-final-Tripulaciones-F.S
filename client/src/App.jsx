import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import AlertContainer from "./components/Main/AlertContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Graficos from "./components/Main/AlertContainer/Graficos";
import "normalize.css";
import AlertList from "./components/Main/AlertContainer/AlertList";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot" ||
    location.pathname === "/reset-password";

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogIn />} />
        {/* <Route path="/home" element={<AlertContainer />} /> */}
        <Route path="/historico" element={<AlertContainer />} />
        <Route path="/simulador" element={<AlertList />} />
        <Route path="/monitor" element={<Graficos />} />
      </Routes>
      {!hideHeader && <Footer />}
    </>
  );
}

export default App;