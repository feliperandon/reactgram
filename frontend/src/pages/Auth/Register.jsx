// Components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  // clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
          className="px-2.5 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
          className="px-2.5 py-2"
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
          className="px-2.5 py-2"
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
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
