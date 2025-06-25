import { useNavigate } from "react-router-dom";
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
      data-darkreader-skip
      className="relative h-[300px] md:h-[calc(100vh-80px)] bg-cover bg-center"
      style={{
        backgroundImage: `url(${
          import.meta.env.BASE_URL
        }assets/images/Hero.jpg)`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <img
          src={Logo}
          alt="Logo"
          className="w-[250px] md:w-[500px] max-w-full drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default Banner;
