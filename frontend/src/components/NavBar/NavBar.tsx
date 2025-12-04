import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { IoClose } from "react-icons/io5";
import ResponsiveMenu from "./ResponsiveMenu";
import { NavLinks } from "../../constants/NavLinks";
import { AUTH_CHANGE_EVENT, logoutUser } from "../../services/authUser";

type NavUser = {
  name: string;
  email: string;
};

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<NavUser | null>(null);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Load user from localStorage and listen for auth changes
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem("user");
        setCurrentUser(stored ? JSON.parse(stored) : null);
      } catch {
        setCurrentUser(null);
      }
    };

    loadUser();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "user" || event.key === "token" || event.key === null) {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(AUTH_CHANGE_EVENT, loadUser);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(AUTH_CHANGE_EVENT, loadUser);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    navigate("/login");
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--color-secondary-light)]/80 backdrop-blur-md shadow-md">
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
          <div className="hidden md:flex items-center space-x-6 font-medium text-[var(--color-secondary)]">
            {NavLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="transition hover:text-[var(--color-primary)]"
              >
                {link.name}
              </button>
            ))}

            {/* Auth actions */}
            {currentUser ? (
              <div className="flex items-center space-x-3 ml-4">
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-sm hover:bg-[var(--color-primary-dark)] transition"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-1 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] text-sm hover:bg-[var(--color-primary)] hover:text-white transition"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-sm hover:bg-[var(--color-primary-dark)] transition"
                >
                  Sign up
                </button>
              </div>
            )}
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
      <div ref={menuRef}>
        <ResponsiveMenu showMenu={menuOpen} setShowMenu={setMenuOpen} />
      </div>
    </nav>
  );
}

export default NavBar;
