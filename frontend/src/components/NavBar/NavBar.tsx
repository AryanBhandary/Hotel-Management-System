import { useNavigate, useLocation } from "react-router-dom";
import { NavLinks } from "../../constants/NavLinks";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-55 bg-white/50 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="text-[var(--color-secondary)] font-bold text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            Hotel
          </div>

          {/* Full Menu */}
          <div className="flex space-x-6 text-[var(--color-secondary)] font-medium">
            {NavLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className={`transition cursor-pointer ${
                  isActive(link.path) ? "text-[var(--color-primary)]" : ""
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
