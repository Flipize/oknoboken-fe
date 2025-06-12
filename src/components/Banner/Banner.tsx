import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Hero from "../../assets/hero.jpg";
import Logo from "../../assets/Logo.svg";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToOknoboken = () => {
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollToOknoboken: true } });
    } else {
      const el = document.querySelector('[data-scroll-target="oknoboken"]');
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Hero})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      {/* Mobile Hamburger (top-right) */}
      <div className="absolute top-4 right-4 z-20 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 bg-black/40 rounded-full hover:bg-black/60 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-top h-full text-white text-center px-4">
        <img
          src={Logo}
          alt="Logo"
          className="h-[300px] w-auto"
        />
        <h4 className="hero-text-font text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Välkommen till Oknö – ostkustens pärla!
        </h4>
        <button
          onClick={scrollToOknoboken}
          className="regular-text-font px-6 py-2 bg-white text-black font-semibold rounded-lg hover:scale-105 hover:text-[#3b4d2c] transition"
        >
          Oknöboken
        </button>
      </div>
    </div>
  );
};

export default Banner;
