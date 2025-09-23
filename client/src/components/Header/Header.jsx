import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__icon">
        <img src="/logotripulacion.png" alt="Logo" />
      </div>
      <nav className="header__nav">
        <Link to="/tabla" className="header__link">Tabla</Link>
        <Link to="/graficos" className="header__link">Gráfico</Link>
        <Link to="/simulador" className="header__link">Simulador</Link>
      </nav>
      <button className="header__logout">
        <Link to="/login" className="header__logout">Log Out</Link>
      </button>
    </header>
  );
};

export default Header;
