import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { IoClose } from "react-icons/io5";
import ResponsiveMenu from "./ResponsiveMenu";
import { NavLinks } from "../../constants/NavLinks";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="text-[var(--color-secondary)] font-bold text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            Hotel
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 font-medium text-[var(--color-secondary)]">
            {NavLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="transition hover:text-[var(--color-primary)]"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[var(--color-secondary)] focus:outline-none"
            >
              {menuOpen ? <IoClose size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <ResponsiveMenu showMenu={menuOpen} setShowMenu={setMenuOpen} />
    </nav>
  );
}

export default NavBar;
