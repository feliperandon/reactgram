// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

// Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-black border-b-1 border-gray-800 p-4">
      <Link to="/">ReactGram</Link>
      <form className="relative w-20" onSubmit={handleSearch}>
        <BsSearch className="absolute top-3 left-2.5" />
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar"
          className="pl-10 py-2 border-none rounded w-full m-0 bg-[#3b3b3b]"
        />
      </form>
      <ul id="nav-links" className="flex items-center justify-center">
        {auth ? (
          <>
            <li>
              <NavLink to="/" className="mr-4 flex items-center justify-center">
                <BsHouseDoorFill className="text-2xl" />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to={`/users/${user._id}`}
                  className="mr-4 flex items-center justify-center"
                >
                  <BsFillCameraFill className="text-2xl" />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to={"/profile"}
                className="mr-4 flex items-center justify-center"
              >
                <BsFillPersonFill className="text-2xl" />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className="mr-4">
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="mr-4">
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
