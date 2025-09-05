import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize"; // adjust import path

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  // Auto-close mobile menu when switching to desktop size
  useEffect(() => {
    if (width >= 768 && isOpen) {
      setIsOpen(false);
    }
  }, [width, isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-51 bg-white/50 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div
            className="text-[var(--color-secondary)] font-bold text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            Hotel
          </div>

          {/* Desktop Menu */}
          {width >= 768 ? (
            <div className="flex space-x-6 text-[var(--color-secondary)] font-medium">
              <button
                onClick={() => handleNavigate("/")}
                className="hover:text-[var(--color-primary)] transition cursor-pointer"
              >
                Explore
              </button>
              <button
                onClick={() => handleNavigate("/allRooms")}
                className="hover:text-[var(--color-primary)] transition cursor-pointer"
              >
                Book a Room
              </button>
              <button
                onClick={() => handleNavigate("/aboutUs")}
                className="hover:text-[var(--color-primary)] transition cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigate("/contactUs")}
                className="hover:text-[var(--color-primary)] transition cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[var(--color-secondary)]"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && width < 768 && (
        <div className="bg-white/50 px-4 pb-4 space-y-2 text-[var(--color-secondary)] font-medium shadow-md">
          <button
            onClick={() => handleNavigate("/")}
            className="block w-full text-left"
          >
            Explore
          </button>
          <button
            onClick={() => handleNavigate("/allRooms")}
            className="block w-full text-left"
          >
            Book a Room
          </button>
          <button
            onClick={() => handleNavigate("/aboutUs")}
            className="block w-full text-left"
          >
            About Us
          </button>
          <button
            onClick={() => handleNavigate("/contactUs")}
            className="block w-full text-left"
          >
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
