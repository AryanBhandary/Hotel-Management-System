import { NavLinks } from "../../constants/NavLinks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_CHANGE_EVENT, logoutUser } from "../../services/authUser";

type NavUser = {
  name: string;
  email: string;
};

type ResponsiveMenuProps = {
  showMenu: boolean;
  setShowMenu: (val: boolean) => void;
};

const ResponsiveMenu = ({ showMenu, setShowMenu }: ResponsiveMenuProps) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<NavUser | null>(null);

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
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-16 left-0 w-full z-50 bg-[var(--color-secondary-light)] backdrop-blur-md overflow-hidden transform transition-transform duration-300 md:hidden
    ${showMenu ? "scale-y-100" : "scale-y-0"}`}
      style={{ transformOrigin: "top", zIndex: 100 }}
    >
      <div className="flex flex-col p-6 space-y-6 text-[var(--color-secondary)] font-medium">
        {NavLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => {
              navigate(link.path);
              setShowMenu(false);
            }}
            className="transition hover:text-[var(--color-primary)] text-left"
          >
            {link.name}
          </button>
        ))}

        {/* Auth actions */}
        {currentUser ? (
          <div className="pt-4 border-t border-[var(--color-border)] flex flex-col space-y-3">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm hover:bg-[var(--color-primary-dark)] transition"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="pt-4 border-t border-[var(--color-border)] flex flex-col space-y-3">
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] text-sm hover:bg-[var(--color-primary)] hover:text-white transition"
            >
              Log in
            </button>
            <button
              onClick={() => {
                navigate("/signup");
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm hover:bg-[var(--color-primary-dark)] transition"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>

  );
};

export default ResponsiveMenu;
