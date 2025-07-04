import { Link } from "react-router-dom";
import Logo from "/assets/images/Logo.svg";

const Banner = () => {
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
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-[250px] md:w-[500px] max-w-full drop-shadow-lg cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
