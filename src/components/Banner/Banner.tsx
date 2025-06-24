import { useNavigate } from "react-router-dom";
import Hero from "/assets/images/Hero.jpg";
import Logo from "/assets/images/Logo.svg";

const Banner = () => {
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
      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-top h-full text-white text-center px-4">
        <img src={Logo} alt="Logo" className="h-[300px] w-auto" />
        <h4 className="hero-text-font text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Välkommen till Oknö – ostkustens pärla!
        </h4>
        <button
          onClick={scrollToOknoboken}
          className="regular-text-font px-6 py-2 bg-white text-black font-semibold rounded-lg hover:scale-105 hover:text-[#3b4d2c] transition rounded"
        >
          Oknöboken
        </button>
      </div>
    </div>
  );
};

export default Banner;
