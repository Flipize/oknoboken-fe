import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ROUTES } from "./../routes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToOknoboken = () => {
    navigate(ROUTES.HOME);
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById("oknoboken");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const isActive = (path: string) =>
    location.pathname === path ? "bg-[#a1c563] text-white" : "text-gray-800";

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-center space-x-6 bg-white/90 backdrop-blur-md shadow-md px-4 py-3">
        <button
          onClick={scrollToOknoboken}
          className={`
          button-font mx-4 px-4 py-2 rounded-lg text-sm md:text-base font-medium transition duration-200
          ${isActive(ROUTES.HOME)}
        `}
        >
          Oknöboken
        </button>
        <button
          onClick={() => navigate(ROUTES.ABOUT)}
          className={`button-font px-4 py-2 rounded-lg text-sm md:text-base font-medium transition duration-200 ${isActive(
            ROUTES.ABOUT
          )} hover:bg-[#e7f3d4] hover:text-[#3b4d2c]`}
        >
          Om mig
        </button>
        <button
          onClick={() => navigate(ROUTES.GALLERY)}
          className={`button-font px-4 py-2 rounded-lg text-sm md:text-base font-medium transition duration-200 ${isActive(
            ROUTES.GALLERY
          )} hover:bg-[#e7f3d4] hover:text-[#3b4d2c]`}
        >
          Galleri
        </button>
        <button
          onClick={() => navigate(ROUTES.CONTACT)}
          className={`button-font px-4 py-2 rounded-lg text-sm md:text-base font-medium transition duration-200 ${isActive(
            ROUTES.CONTACT
          )} hover:bg-[#e7f3d4] hover:text-[#3b4d2c]`}
        >
          Kontakt
        </button>
        <button
          onClick={() => navigate(ROUTES.ORDER)}
          className={`button-font px-4 py-2 rounded-lg text-sm md:text-base font-medium transition duration-200 ${isActive(
            ROUTES.ORDER
          )} hover:bg-[#e7f3d4] hover:text-[#3b4d2c]`}
        >
          Beställa Oknöboken
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="button-font text-white p-2 bg-black/40 rounded-full hover:bg-black/60 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-16 right-4 bg-white rounded-lg shadow-lg p-4 z-40 space-y-2 md:hidden"
        >
          <button
            onClick={scrollToOknoboken}
            className={`button-font block w-full text-left px-4 py-2 rounded ${isActive(
              ROUTES.HOME
            )}`}
          >
            Oknöboken
          </button>
          <button
            onClick={() => {
              navigate(ROUTES.ABOUT);
              setIsOpen(false);
            }}
            className={`button-font block w-full text-left px-4 py-2 rounded ${isActive(
              ROUTES.ABOUT
            )}`}
          >
            Om mig
          </button>
          <button
            onClick={() => {
              navigate(ROUTES.GALLERY);
              setIsOpen(false);
            }}
            className={`button-font block w-full text-left px-4 py-2 rounded ${isActive(
              ROUTES.GALLERY
            )}`}
          >
            Galleri
          </button>
          <button
            onClick={() => {
              navigate(ROUTES.CONTACT);
              setIsOpen(false);
            }}
            className={`button-font block w-full text-left px-4 py-2 rounded ${isActive(
              ROUTES.CONTACT
            )}`}
          >
            Kontakta mig
          </button>
          <button
            onClick={() => {
              navigate(ROUTES.ORDER);
              setIsOpen(false);
            }}
            className={`button-font block w-full text-left px-4 py-2 rounded ${isActive(
              ROUTES.ORDER
            )}`}
          >
            Beställa Oknöboken
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
