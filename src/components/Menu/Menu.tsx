import { NavLink, useLocation } from "react-router-dom";
import "./Menu.css";
import { useEffect, useRef, useState } from "react";

const pathAndTitles: { [key: string]: string } = {
  "/": "Oknöboken",
  "/gallery": "Galleri",
  "/about": "Om mig",
  "/contact": "Kontakta mig",
};

const Menu = () => {
  const location = useLocation();

  let title = pathAndTitles[location.pathname];

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle clicks outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the menu if clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, [isOpen]);

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

        {/* Mobile hamburger and dropdown */}
        <div className="small-screen-menu">
          <div className="title-mobile">{title}</div>
          <div className="hamburger-mobile">
            {/* Hamburger button that toggles the dropdown */}
            <button
              className="hamburger-button"
              ref={buttonRef}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from bubbling up
                setIsOpen((prev) => !prev); // Toggle dropdown visibility
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Dropdown content (menu) */}
        <div
          className={`dropdown-content ${isOpen ? "show" : ""}`}
          ref={menuRef}
        >
          <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Oknöboken
          </NavLink>
          <NavLink
            to="/gallery"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Galleri
          </NavLink>
          <NavLink
            to="/about"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Om mig
          </NavLink>
          <NavLink
            to="/contact"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Kontakta mig
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
