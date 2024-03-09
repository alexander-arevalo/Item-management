import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import LogoImg from "../../assets/image/list.png";

const Navbar = () => (
  <div className="nav-bar">
    <Link className="logo" to="/">
      <img src={LogoImg} alt="logo" />
      <span>
        <h2 className="logo-text" style={{ textDecoration: "white" }}>
          Management List
        </h2>
      </span>
    </Link>
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : undefined)}
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/AddItems"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        Added Items
      </NavLink>
    </nav>
  </div>
);

export default Navbar;
