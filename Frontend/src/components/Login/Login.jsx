import React from "react";
import { useState, useEffect } from "react";
import "../../assets/blocks/login.css";
import { Link } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      email,
      password,
    });
  };
  return (
    <div className="login">
      <h1>Entrar</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__button" type="submit">
          Entrar
        </button>
        <p>
          Ainda não é membro?{" "}
          <Link to="/signup" className="signup__link">
            {" "}
            Inscreva-se aqui!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
