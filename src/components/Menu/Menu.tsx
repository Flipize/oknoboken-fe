import { NavLink, useLocation } from "react-router-dom";
import "./Menu.css";

let pathAndTitles: { [key: string]: string } = {
  "/": "Oknöboken",
  "/about": "Om mig",
};

const Menu = () => {
  const location = useLocation();

  let title = pathAndTitles[location.pathname];

  return (
    <nav className="navbar-expand-lg navbar">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Oknöboken
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/gallery" className="nav-link">
              Galleri
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">
              Om Mig
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">
              Kontakta mig
            </NavLink>
          </li>
        </ul>
        <div className="small-screen-menu">
          <div className="title-mobile">{title}</div>
          <div className="hamburger-mobile">☰</div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
