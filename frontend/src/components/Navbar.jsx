// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

const Navbar = () => {
  return (
    <nav
      id="nav"
      className="flex justify-between items-center bg-black border-b-1 border-gray-800 p-4"
    >
      <Link to="/">ReactGram</Link>
      <form className="relative w-20">
        <BsSearch className="absolute top-2 left-2.5" />
        <input
          type="text"
          placeholder="Pesquisar"
          className="pl-10 border-none rounded w-full m-0"
        />
      </form>
      <ul id="nav-links" className="flex items-center justify-center">
        <li>
          <NavLink to="/" className="mr-4 flex items-center justify-center">
            <BsHouseDoorFill className="text-2xl" />
          </NavLink>
        </li>
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
      </ul>
    </nav>
  );
};

export default Navbar;
