import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="regular-text-font bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)] mt-12">
      <div className="max-w-7xl mx-auto px-4 pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Social Links */}
        <div>
          <h3 className="regular-text-font font-semibold mb-4 text-gray-700">
            Följ mig
          </h3>
          <ol className="flex flex-col gap-3 text-sm !pl-0 list-none">
            <li>
              <a
                href="https://www.instagram.com/lizettavonsmil?utm_source=ig_web_button_share_sheet&igsh=MWZ0cDBzN3dxc2NnZw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 py-1"
              >
                <FaInstagram size={20} />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/lizette.nilsson.16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 py-1"
              >
                <FaFacebook size={20} />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lizette-nilsson-5b845453"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:bg-[#e7f3d4] hover:text-[#3b4d2c] transition duration-200 py-1"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </li>
          </ol>
        </div>

        <div>
          <h3 className="regular-text-font font-semibold mb-4 text-gray-700">
            Om mig
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Jag är Lizette Nilsson – författare till boken Oknöboken. Följ mig
            på sociala medier för daglig inspiration!
          </p>
        </div>

        <div>
          <h3 className="regular-text-font font-semibold mb-4 text-gray-700">
            Kontakt
          </h3>
          <p className="text-sm text-gray-600">info@lizettavonsmil.se</p>
          <p className="text-sm text-gray-600">+46 70 525 79 85</p>
        </div>
      </div>

      <div className="mt-2 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Lizette Nilsson. Alla rättigheter
        förbehållna.
      </div>
    </footer>
  );
};

export default Footer;
