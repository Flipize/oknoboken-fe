import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (to: string) =>
    `button-font px-4 py-2 rounded-lg text-sm md:text-base font-medium transition duration-200 hover:shadow-lg focus:outline-none focus:ring-0
     ${
       location.pathname === to
         ? "bg-[#a1c563] text-white"
         : "text-gray-800 hover:bg-[#e7f3d4] hover:text-[#3b4d2c]"
     }`;

  return (
    <nav
      id="oknoboken"
      className="hidden md:block bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center space-x-6">
        <Link to="/" className={linkStyle("/")}>
          Oknöboken
        </Link>
        <Link to="/about" className={linkStyle("/about")}>
          Om mig
        </Link>
        <Link to="/gallery" className={linkStyle("/gallery")}>
          Galleri
        </Link>
        <Link to="/contact" className={linkStyle("/contact")}>
          Kontakta mig
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
