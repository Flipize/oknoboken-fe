import { NavLink } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Oknöboken
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about-me" className="nav-link">
              Om Mig
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/gallery" className="nav-link">
              Galleri
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">
              Kontakta mig
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
