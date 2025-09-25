import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./Header.scss";

const Header = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.classList.add('menu-open');
    else document.body.classList.remove('menu-open');
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <header className="header">
      <div className="header__icon">
        <img src="/logotripulacion.png" alt="Logo" />
      </div>
      <button
        className={`header__burger${open ? " header__burger--open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Abrir menú"
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`header__nav${open ? " header__nav--open" : ""}`}>
        <Link to="/historico" className="header__link" onClick={() => setOpen(false)}>Histórico</Link>
        <Link to="/monitor" className="header__link" onClick={() => setOpen(false)}>Monitor</Link>
        <Link to="/simulador" className="header__link" onClick={() => setOpen(false)}>Simulador</Link>
        <Link to="/login" className="header__logout" onClick={() => setOpen(false)}>Log Out</Link>
      </nav>
    </header>
  );
};

export default Header;
