import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import AlertContainer from "./components/Main/AlertContainer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/alerts" element={<AlertContainer />} />

      </Routes>
    </>
  );
}

export default App;
