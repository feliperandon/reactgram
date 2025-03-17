// Components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>ReactGram</h2>
      <p>Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" className="px-2.5 py-2" />
        <input type="email" placeholder="Email" className="px-2.5 py-2" />
        <input type="password" placeholder="Senha" className="px-2.5 py-2" />
        <input
          type="password"
          placeholder="Confirme a senha"
          className="px-2.5 py-2"
        />
        <input type="submit" value="Cadastrar" className="px-2.5 py-2" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </div>
  );
};

export default Register;
