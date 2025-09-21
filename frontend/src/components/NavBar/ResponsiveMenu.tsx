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
      className={`fixed top-0 left-0 h-screen w-[70%] bg-white shadow-md transform transition-transform duration-300 md:hidden ${
        showMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col p-6 space-y-6 text-[var(--color-secondary)] font-medium">
        {NavLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => {
              navigate(link.path);
              setShowMenu(false); // hide menu after click ✅
            }}
            className="transition hover:text-[var(--color-primary)]"
          >
            {link.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveMenu;
