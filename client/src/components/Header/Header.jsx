import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header__icon">
        <img src="/logotripulacion.jpeg" alt="Logo" />
      </div>
      <nav className="header__nav">
        <a href="#" className="header__link">Dashboard</a>
        <a href="#" className="header__link">Historial</a>
        <a href="#" className="header__link">Registro</a>
        <a href="#" className="header__link">Simulador</a>
      </nav>
      <button className="header__logout">Logout</button>
    </header>
  );
};

export default Header;
