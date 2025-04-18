// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, dispatch);

  return (
    <div className="border border-[#363636] bg-black px-6 py-8 max-w-[33%] my-8 mx-auto">
      <h2 className="text-center text-[2.1em] mt-0 font-bold">ReactGram</h2>
      <p className="text-center my-4 text-[#999]">
        Faça o login para ver o que há de novo.
      </p>
      <form
        onSubmit={handleSubmit}
        className="pb-6 mb-6 border-b border-[#363636]"
      >
        <input
          type="text"
          placeholder="Email"
          className="px-2.5 py-2"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          className="px-2.5 py-2"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {!loading && (
          <input type="submit" value="Entrar" className="px-2.5 py-2 mt-5" />
        )}
        {loading && (
          <input
            type="submit"
            value="Aguarde..."
            disabled
            className="px-2.5 py-2 mt-5"
          />
        )}
        {error && <Message msg={error} type="error" />}
      </form>
      <p className="text-center">
        Não tem uma conta?{" "}
        <Link to="/register" className="font-bold text-[#0094f6]">
          Clique aqui
        </Link>
      </p>
    </div>
  );
};

export default Login;
