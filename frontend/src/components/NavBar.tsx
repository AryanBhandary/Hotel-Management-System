import { useNavigate, useLocation } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md shadow-md">
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
            <button
              onClick={() => handleNavigate("/")}
              className={`transition cursor-pointer ${
                isActive("/") ? "text-[var(--color-primary)]" : ""
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => handleNavigate("/allRooms")}
              className={`transition cursor-pointer ${
                isActive("/allRooms") ? "text-[var(--color-primary)]" : ""
              }`}
            >
              Book a Room
            </button>
            <button
              onClick={() => handleNavigate("/aboutUs")}
              className={`transition cursor-pointer ${
                isActive("/aboutUs") ? "text-[var(--color-primary)]" : ""
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigate("/contactUs")}
              className={`transition cursor-pointer ${
                isActive("/contactUs") ? "text-[var(--color-primary)]" : ""
              }`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
