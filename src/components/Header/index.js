import { NavLink } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import "./index.css";

const navItems = [
  { id: uuidV4(), itemName: "Home", path: "/" },
  { id: uuidV4(), itemName: "Form", path: "/book/add" },
];

const Header = () => (
  <nav className="p-2 nav_container">
    <div className="nav_width   d-flex justify-content-between">
      <div className="">
        <h1 className="text-light">NowFloats</h1>
      </div>
      <ul className="d-flex justify-content-between  align-items-center list-unstyled m-0">
        {navItems.map((each) => (
          <li key={each.id} className="m-3 mr-md-5">
            <NavLink to={each.path} className="nav-item">
              {each.itemName}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default Header;
