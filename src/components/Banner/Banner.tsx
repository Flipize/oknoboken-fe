import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Hero from "../../assets/hero.jpg";
import "./Banner.css";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToOknoboken = () => {
    navigate("/");

    setTimeout(() => {
      const el = document.getElementById("oknoboken");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Hero})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Mobile Hamburger (only on small screens) */}
      <div className="absolute top-4 right-4 z-20 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 bg-black/40 rounded-full hover:bg-black/60 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 z-30 space-y-2 md:hidden">
          <Link
            to="/"
            className="block text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Oknöboken
          </Link>
          <Link
            to="/om-mig"
            className="block text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Om mig
          </Link>
          <Link
            to="/galleri"
            className="block text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Galleri
          </Link>
          <Link
            to="/kontakta-mig"
            className="block text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Kontakta mig
          </Link>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="playfair-display-600 text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Välkommen till Oknö - ostkustens pärla!
        </h1>
        <a
          onClick={scrollToOknoboken}
          className="button-font px-6 py-2 bg-white text-black font-semibold rounded-lg hover:scale-105 hover:text-[#3b4d2c]"
        >
          Oknöboken
        </a>
      </div>
    </div>
  );
};

export default Banner;
