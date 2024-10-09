import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="sticky top-0 z-20 flex h-[60px] items-center justify-between border-b border-gray-700 bg-black px-40 py-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-bold transition-all duration-300 ${isActive ? "text-primary hover:text-gray-200" : "hover:text-primary"}`
        }
      >
        For you
      </NavLink>

      <NavLink
        to="/following"
        className={({ isActive }) =>
          `font-bold transition-all duration-300 ${isActive ? "text-primary hover:text-gray-200" : "hover:text-primary"}`
        }
      >
        Following
      </NavLink>
    </nav>
  );
}

export default Nav;
