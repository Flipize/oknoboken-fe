import { Link } from "react-router-dom";
import Logo from "/assets/images/Logo.svg";

const Banner = () => {
  return (
    <>
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
      <div
  className="absolute top-[20%] w-full flex justify-center z-30"
  style={{ fontFamily: 'Great Vibes' }}
>
  <span
    className="
      text-red-600
      font-bold
      italic
      tracking-wide
      select-none
      text-3xl
      md:text-5xl
      lg:text-6xl
      xl:text-7xl
    "
    style={{
      textShadow: "0 0 8px rgba(255,255,255,0.8)"
    }}
  >
    God Jul!
  </span>
</div>




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
              {/* Bottom Christmas banner */}
        <div
  className="
    absolute bottom-0 left-0 w-full
    bg-red-600/90
    text-white text-center
    py-1 md:py-3
    z-20
    shadow-lg
    backdrop-blur-[1px]
    border-t border-red-300/40
    tracking-wide
  "
  style={{
    textShadow: "0 0 6px rgba(0,0,0,0.6)"
  }}
>
  För beställningar gjorda senast 21 december så ingår fri leverans inom Mönsterås Kommun!
</div>


    </div>
    </>
  );
};

export default Banner;
