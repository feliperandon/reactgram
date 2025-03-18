// Components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="border border-[#363636] bg-black px-6 py-8 max-w-[33%] my-8 mx-auto">
      <h2 className="text-center text-[2.1em] mt-0 font-bold">ReactGram</h2>
      <p className="text-center my-4 text-[#999]">
        Cadastre-se para ver as fotos dos seus amigos.
      </p>
      <form
        className="pb-6 mb-6 border-b border-[#363636]"
        onSubmit={handleSubmit}
      >
        <input type="text" placeholder="Nome" className="px-2.5 py-2" />
        <input type="email" placeholder="Email" className="px-2.5 py-2" />
        <input type="password" placeholder="Senha" className="px-2.5 py-2" />
        <input
          type="password"
          placeholder="Confirme a senha"
          className="px-2.5 py-2"
        />
        <input type="submit" value="Cadastrar" className="px-2.5 py-2 mt-5" />
      </form>
      <p className="text-center">
        Já tem conta?{" "}
        <Link to="/login" className="font-bold text-[#0094f6]">
          Clique aqui.
        </Link>
      </p>
    </div>
  );
};

export default Register;
