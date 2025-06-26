import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ROUTES } from "./../routes";

const baseButtonClasses =
  "regular-text-font px-4 py-2 text-sm md:text-base font-medium transition duration-200 rounded";
const hoverClasses = "hover:bg-[#e7f3d4] hover:text-[#3b4d2c]";
const mobileButtonBaseClasses =
  "regular-text-font block w-full text-left px-4 py-2 rounded";
const mobileHoverClasses = "hover:bg-[#e7f3d4] hover:text-[#3b4d2c]";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  /* ──────────────────────────
     Shared helper: navigate + scroll
     • path        – route to navigate to
     • anchorId    – element to scroll to after nav (default banner-end)
  ────────────────────────── */
  const handleNavClick = (path: string, anchorId: string = "banner-end") => {
    setIsOpen(false);

    if (location.pathname !== path) {
      navigate(path);
    }

    // Always scroll, even if same path
    setTimeout(() => {
      let el = document.querySelector(`[data-scroll-target="${anchorId}"]`);
      if (!el) el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 250);
  };

  /* ───────── Helpers for active styles ───────── */
  const isActive = (path: string) => location.pathname === path;

  const getButtonClasses = (path: string) =>
    `${baseButtonClasses} ${
      isActive(path)
        ? "bg-[#a1c563] text-white"
        : `text-gray-800 ${hoverClasses}`
    }`;

  const getMobileButtonClasses = (path: string) =>
    `${mobileButtonBaseClasses} ${
      isActive(path)
        ? "bg-[#a1c563] text-white"
        : `text-gray-800 ${mobileHoverClasses}`
    }`;

  /* ───────── Close the drawer on outside click ───────── */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  /* ────────────────────────── RENDER ────────────────────────── */
  return (
    <nav className="sticky top-0 z-50">
      {/* Desktop navbar */}
      <div className="hidden md:flex justify-center gap-6 bg-white/90 backdrop-blur-md shadow-md px-4 py-3">
        <button
          onClick={() => handleNavClick(ROUTES.HOME)}
          className={getButtonClasses(ROUTES.HOME)}
        >
          Oknöboken
        </button>

        <button
          onClick={() => handleNavClick(ROUTES.ORDER)}
          className={getButtonClasses(ROUTES.ORDER)}
        >
          Köp
        </button>

        <button
          onClick={() => handleNavClick(ROUTES.GALLERY)}
          className={getButtonClasses(ROUTES.GALLERY)}
        >
          Galleri
        </button>

        <button
          onClick={() => handleNavClick(ROUTES.ABOUT)}
          className={getButtonClasses(ROUTES.ABOUT)}
        >
          Om mig
        </button>

        <button
          onClick={() => handleNavClick(ROUTES.CONTACT)}
          className={getButtonClasses(ROUTES.CONTACT)}
        >
          Kontakt
        </button>
      </div>

      {/* Mobile hamburger button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="regular-text-font text-white p-2 bg-black/40 rounded-full hover:bg-black/60 transition flex items-center gap-2"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Menu className="w-6 h-6" />
              <span className="text-sm font-medium">Meny</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-16 right-4 bg-white rounded-lg shadow-lg p-4 z-40 space-y-2 md:hidden"
        >
          <button
            onClick={() => handleNavClick(ROUTES.HOME)}
            className={getMobileButtonClasses(ROUTES.HOME)}
          >
            Oknöboken
          </button>

          <button
            onClick={() => handleNavClick(ROUTES.ORDER)}
            className={getMobileButtonClasses(ROUTES.ORDER)}
          >
            Köp
          </button>

          <button
            onClick={() => handleNavClick(ROUTES.GALLERY)}
            className={getMobileButtonClasses(ROUTES.GALLERY)}
          >
            Galleri
          </button>

          <button
            onClick={() => handleNavClick(ROUTES.ABOUT)}
            className={getMobileButtonClasses(ROUTES.ABOUT)}
          >
            Om mig
          </button>

          <button
            onClick={() => handleNavClick(ROUTES.CONTACT)}
            className={getMobileButtonClasses(ROUTES.CONTACT)}
          >
            Kontakt
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
