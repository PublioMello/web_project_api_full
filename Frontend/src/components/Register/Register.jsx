import React from "react";
import { useState, useEffect } from "react";
import "../../assets/blocks/register.css";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    handleRegister({ email, password });
  };
  return (
    <div className="register">
      <h1>Inscrever-se</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register__button">Inscrever-se</button>
        <p className="register__linkToLogin">
          Já é um membro?{" "}
          <Link to={"/signin"} className="signup__link">
            {" "}
            Faça o login aqui!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
