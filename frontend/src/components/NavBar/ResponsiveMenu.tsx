import { NavLinks } from "../../constants/NavLinks";
import { useNavigate } from "react-router-dom";

type ResponsiveMenuProps = {
  showMenu: boolean;
  setShowMenu: (val: boolean) => void;
};

const ResponsiveMenu = ({ showMenu, setShowMenu }: ResponsiveMenuProps) => {
  const navigate = useNavigate();

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
      </div>
    </div>

  );
};

export default ResponsiveMenu;
