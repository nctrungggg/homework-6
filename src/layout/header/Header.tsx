import { NavLink } from "react-router-dom";
import { ROUTES } from "../../configs/routes";

const Header = () => {
  return (
    <ul className="fixed flex gap-4 justify-center items-center top-0 w-full px-[60px] h-[100px] transition-all">
      <NavLink to={ROUTES.home} className="menu-link">
        Home
      </NavLink>
      <NavLink to={ROUTES.product} className="menu-link">
        Product
      </NavLink>
      <NavLink to={ROUTES.profile} className="menu-link">
        Profile
      </NavLink>
    </ul>
  );
};

export default Header;
