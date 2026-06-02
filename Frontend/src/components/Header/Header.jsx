import React from "react";
import logo from "../../assets/images/logo.svg";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let text = "";
  let path = "";
  let isHome = location.pathname === "/";
  let email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("email", email);

    navigate("/signin");
  };

  if (location.pathname === "/signup") {
    text = "Faça login";
  } else if (location.pathname === "/signin") {
    text = "Entrar";
  }

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />

      {isHome ? (
        <div className="header__user">
          <span className="header__email">{email}</span>
          <button onClick={handleLogout} className="header__logout">
            Sair
          </button>
        </div>
      ) : (
        text && (
          <p to={path} className="header__link">
            {text}
          </p>
        )
      )}
    </header>
  );
};

export default Header;
