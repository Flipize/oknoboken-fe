const Footer = () => {
  return (
    <footer className="regular-text-font bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)] mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <li>
            <a
              href="http://www.erikagivell.se/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 px-2 py-1"
            >
              Erikas Galleri och Ateljé
            </a>
          </li>
          <li>
            <a
              href="https://www.naturkartan.se/sv/kalmar-lan/okno-vandringsled"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 px-2 py-1"
            >
              Oknöleden
            </a>
          </li>
          <li>
            <a
              href="https://oknostf.se/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 px-2 py-1"
            >
              Oknö Stugförening
            </a>
          </li>
          <li>
            <a
              href="https://www.hembygd.se/stranda/plats/420703/text/71333"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 px-2 py-1"
            >
              Stranda Hembygdsförening
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/oknotradgarden/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 px-2 py-1"
            >
              Oknöträdgårdens Instagramkonto
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/groups/702205247605825/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 px-2 py-1"
            >
              Oknöfestivalens Facebookkonto
            </a>
          </li>
          <li>
            <a
              href="https://kaffetorpetscamping.com/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 px-2 py-1"
            >
              Kaffetorpets Camping
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
